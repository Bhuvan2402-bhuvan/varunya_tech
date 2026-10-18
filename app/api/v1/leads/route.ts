import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

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

    // Persist into database using Prisma Lead model
    const savedLead = await prisma.lead.create({
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
  const token =
    request.headers.get('X-Staff-Token') ||
    request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token || !token.startsWith('token_')) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Staff session token required.' },
      { status: 401 }
    );
  }

  const role = token.replace('token_', '');
  const permittedRoles = ['ADMIN', 'MANAGER', 'SALES'];

  if (!permittedRoles.includes(role)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden. Role lacks lead pipeline access.' },
      { status: 403 }
    );
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
  const token =
    request.headers.get('X-Staff-Token') ||
    request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token || !token.startsWith('token_')) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized. Staff session token required.' },
      { status: 401 }
    );
  }

  const role = token.replace('token_', '');
  const permittedRoles = ['ADMIN', 'SALES', 'MANAGER'];

  if (!permittedRoles.includes(role)) {
    return NextResponse.json(
      { success: false, error: 'Forbidden. Role lacks lead update permissions.' },
      { status: 403 }
    );
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
