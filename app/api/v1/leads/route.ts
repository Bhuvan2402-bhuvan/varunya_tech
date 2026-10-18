import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { verifyAdminSession } from '@/lib/auth/admin-auth';

export const dynamic = 'force-dynamic';

// In-memory rate limiting and abuse prevention store
interface RateLimitRecord {
  count: number;
  resetAt: number;
  lastSubmissionTimestamp: number;
  lastSubmissionHash?: string;
}

const rateLimitMap = new Map<string, RateLimitRecord>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 6;
const DUPLICATE_COOLDOWN_MS = 60 * 1000; // 60 seconds

function cleanOldRateLimits() {
  const now = Date.now();
  for (const [key, record] of rateLimitMap.entries()) {
    if (now > record.resetAt) {
      rateLimitMap.delete(key);
    }
  }
}

// Zod validation schema for inbound enquiries
const InboundLeadSchema = z.object({
  fullName: z
    .string({ required_error: 'Full name is required' })
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(120, 'Name cannot exceed 120 characters'),
  email: z
    .string({ required_error: 'Email address is required' })
    .trim()
    .email('Please provide a valid email address')
    .max(140, 'Email cannot exceed 140 characters'),
  company: z
    .string()
    .trim()
    .max(140, 'Organization name cannot exceed 140 characters')
    .optional()
    .nullable(),
  phone: z
    .string()
    .trim()
    .max(40, 'Phone number cannot exceed 40 characters')
    .optional()
    .nullable(),
  serviceNeeded: z
    .string()
    .trim()
    .min(2, 'Project type / service needed is required')
    .max(120)
    .default('Custom Software Architecture'),
  budgetRange: z
    .string()
    .trim()
    .max(80)
    .optional()
    .nullable()
    .default('Standard Tier ($5,000 - $15,000)'),
  projectScope: z
    .string({ required_error: 'Project requirements / description is required' })
    .trim()
    .min(10, 'Project description must be at least 10 characters')
    .max(5000, 'Project description cannot exceed 5000 characters'),
  consultationDetails: z
    .string()
    .trim()
    .max(500)
    .optional()
    .nullable(),
  subject: z
    .string()
    .trim()
    .max(200)
    .optional()
    .nullable(),
  source: z
    .string()
    .trim()
    .max(80)
    .optional()
    .nullable(),
  category: z
    .string()
    .trim()
    .max(80)
    .optional()
    .nullable(),
});

/**
 * Public Inbound Enquiry & Consultation Submission
 */
export async function POST(request: Request) {
  try {
    cleanOldRateLimits();

    // Determine client identifier for rate limiting
    const ip = 
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      request.headers.get('cf-connecting-ip') ||
      'anonymous-client';

    const now = Date.now();
    const rateRecord = rateLimitMap.get(ip);

    if (rateRecord) {
      if (now < rateRecord.resetAt && rateRecord.count >= MAX_REQUESTS_PER_WINDOW) {
        const remainingMinutes = Math.ceil((rateRecord.resetAt - now) / 60000);
        return NextResponse.json(
          {
            success: false,
            error: `Submission rate limit exceeded. Please try again in ${remainingMinutes} minute(s) or reach out directly to varunyatech@gmail.com.`,
          },
          { status: 429 }
        );
      }
    }

    const rawBody = await request.json();

    // Validate incoming payload
    const parsed = InboundLeadSchema.safeParse(rawBody);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstErrorMessage = Object.values(fieldErrors).flat()[0] || 'Invalid input data';
      return NextResponse.json(
        {
          success: false,
          error: firstErrorMessage,
          fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      company,
      phone,
      serviceNeeded,
      budgetRange,
      projectScope,
      consultationDetails,
      subject,
      source,
      category,
    } = parsed.data;

    // Check for duplicate spam submissions within cooldown window
    const submissionHash = `${email.toLowerCase()}|${serviceNeeded.toLowerCase()}`;
    if (
      rateRecord &&
      rateRecord.lastSubmissionHash === submissionHash &&
      now - rateRecord.lastSubmissionTimestamp < DUPLICATE_COOLDOWN_MS
    ) {
      return NextResponse.json(
        {
          success: false,
          error: 'An identical enquiry was recently submitted. Our engineering team is currently reviewing it.',
        },
        { status: 429 }
      );
    }

    // Combine consultation preferences cleanly with project scope if provided
    let combinedScope = projectScope;
    if (consultationDetails && !combinedScope.includes(consultationDetails)) {
      combinedScope = `${combinedScope}\n\n[Consultation Preferences]: ${consultationDetails}`;
    }

    // Calculate initial AI Lead Score based on completeness of requirements
    let leadScore = 85;
    if (company && company.trim().length > 2) leadScore += 4;
    if (phone && phone.trim().length > 6) leadScore += 3;
    if (combinedScope.length > 100) leadScore += 4;
    if (email.includes('@') && !email.endsWith('@gmail.com') && !email.endsWith('@yahoo.com')) {
      leadScore += 3; // Corporate domain indicator
    }
    leadScore = Math.min(leadScore, 98);

    // Atomically persist both CRM Lead and Inbox Message in a single transaction
    const [savedLead, savedMessage] = await prisma.$transaction(async (tx: any) => {
      const lead = await tx.lead.create({
        data: {
          fullName,
          email: email.toLowerCase(),
          company: company || 'Direct Client',
          phone: phone || null,
          serviceNeeded,
          budgetRange: budgetRange || 'Flexible',
          projectScope: combinedScope,
          aiLeadScore: leadScore,
          status: 'NEW',
        },
      });

      const messageSubject =
        subject ||
        (consultationDetails
          ? '1-on-1 Discovery Call Request'
          : `Engineering Project: ${serviceNeeded}`);

      const messageSource =
        source ||
        (consultationDetails ? 'CONSULTATION_MODAL' : 'HOMEPAGE_ENQUIRY');

      const messageCategory =
        category || (consultationDetails ? 'CONSULTATION' : 'SALES');

      const message = await tx.message.create({
        data: {
          name: fullName,
          email: email.toLowerCase(),
          company: company || null,
          phone: phone || null,
          subject: messageSubject,
          content: projectScope,
          source: messageSource,
          category: messageCategory,
          status: 'NEW',
          isRead: false,
          leadId: lead.id,
          metadata: JSON.stringify({
            budgetRange: budgetRange || 'Flexible',
            serviceNeeded,
            consultationDetails: consultationDetails || null,
            clientIp: ip,
          }),
        },
      });

      return [lead, message];
    });

    // Update rate limit tracking
    rateLimitMap.set(ip, {
      count: (rateRecord?.count || 0) + 1,
      resetAt: rateRecord ? rateRecord.resetAt : now + RATE_LIMIT_WINDOW_MS,
      lastSubmissionTimestamp: now,
      lastSubmissionHash: submissionHash,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Enquiry received and successfully registered with senior engineering staff.',
        leadId: savedLead.id,
        messageId: savedMessage.id,
        createdAt: savedLead.createdAt,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to persist inbound lead:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to process enquiry at this moment. Please email varunyatech@gmail.com directly.',
      },
      { status: 500 }
    );
  }
}

/**
 * Admin Lead Management Workflow
 * Requires valid X-Staff-Token or Authorization Bearer header
 */
export async function GET(request: Request) {
  const auth = verifyAdminSession(request, ['ADMIN', 'MANAGER', 'SALES']);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const leads = await prisma.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({
      success: true,
      count: leads.length,
      leads,
    });
  } catch (error) {
    console.error('Failed to retrieve leads from database:', error);
    return NextResponse.json(
      { success: false, error: 'Database query failure while retrieving CRM leads.' },
      { status: 500 }
    );
  }
}

/**
 * Admin Lead Status Mutation
 */
export async function PATCH(request: Request) {
  const auth = verifyAdminSession(request, ['ADMIN', 'MANAGER', 'SALES']);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { success: false, error: 'Lead ID and target status are required.' },
        { status: 400 }
      );
    }

    const validStatuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
        { status: 400 }
      );
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({
      success: true,
      lead: updatedLead,
    });
  } catch (error) {
    console.error('Failed to update lead status:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update lead status in database.' },
      { status: 500 }
    );
  }
}
