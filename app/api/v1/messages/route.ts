import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { verifyAdminSession } from '@/lib/auth/admin-auth';

export const dynamic = 'force-dynamic';

// Rate limiting map for direct public message submissions
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 6;

const DirectMessageSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(120),
  email: z.string().trim().email('Valid email address required').max(140),
  company: z.string().trim().max(140).optional().nullable(),
  phone: z.string().trim().max(40).optional().nullable(),
  subject: z.string().trim().min(2, 'Subject must be at least 2 characters').max(200),
  content: z.string().trim().min(10, 'Message must be at least 10 characters').max(5000),
  source: z.string().trim().max(80).optional().default('CONTACT_FORM'),
  category: z.string().trim().max(80).optional().default('GENERAL'),
});

/**
 * GET /api/v1/messages
 * List, filter, search, and paginate inbox messages
 * Requires staff authentication (ADMIN, MANAGER, SALES)
 */
export async function GET(request: Request) {
  const auth = verifyAdminSession(request, ['ADMIN', 'MANAGER', 'SALES']);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const { searchParams } = new URL(request.url);
    const statusParam = searchParams.get('status') || 'ALL';
    const categoryParam = searchParams.get('category') || 'ALL';
    const sourceParam = searchParams.get('source') || 'ALL';
    const searchParam = searchParams.get('search')?.trim() || '';
    const sortParam = searchParams.get('sort') || 'newest';
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const limit = Math.min(50, Math.max(1, parseInt(searchParams.get('limit') || '15', 10)));
    const skip = (page - 1) * limit;

    // Build Prisma query filter
    const where: any = {};

    // Status filter
    if (statusParam === 'UNREAD') {
      where.isRead = false;
      where.status = { notIn: ['ARCHIVED', 'SPAM'] };
    } else if (statusParam === 'READ') {
      where.isRead = true;
      where.status = { notIn: ['ARCHIVED', 'SPAM'] };
    } else if (['NEW', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED', 'SPAM'].includes(statusParam)) {
      where.status = statusParam;
    } else if (statusParam === 'ALL') {
      // By default, ALL inbox shows non-archived, non-spam items
      where.status = { notIn: ['ARCHIVED', 'SPAM'] };
    }

    // Category filter
    if (categoryParam !== 'ALL') {
      where.category = categoryParam;
    }

    // Source filter
    if (sourceParam !== 'ALL') {
      where.source = sourceParam;
    }

    // Keyword Search
    if (searchParam) {
      where.OR = [
        { name: { contains: searchParam } },
        { email: { contains: searchParam } },
        { company: { contains: searchParam } },
        { subject: { contains: searchParam } },
        { content: { contains: searchParam } },
      ];
    }

    // Sort Order
    let orderBy: any = { createdAt: 'desc' };
    if (sortParam === 'oldest') {
      orderBy = { createdAt: 'asc' };
    } else if (sortParam === 'status') {
      orderBy = [{ status: 'asc' }, { createdAt: 'desc' }];
    }

    // Execute queries in parallel
    const [messages, totalFiltered, unreadCount, allActiveCount, newCount, inProgressCount, resolvedCount, archivedCount, spamCount] =
      await Promise.all([
        prisma.message.findMany({
          where,
          orderBy,
          skip,
          take: limit,
          include: {
            lead: {
              select: {
                id: true,
                status: true,
                aiLeadScore: true,
                serviceNeeded: true,
              },
            },
            _count: {
              select: { notes: true },
            },
          },
        }),
        prisma.message.count({ where }),
        prisma.message.count({ where: { isRead: false, status: { notIn: ['ARCHIVED', 'SPAM'] } } }),
        prisma.message.count({ where: { status: { notIn: ['ARCHIVED', 'SPAM'] } } }),
        prisma.message.count({ where: { status: 'NEW' } }),
        prisma.message.count({ where: { status: 'IN_PROGRESS' } }),
        prisma.message.count({ where: { status: 'RESOLVED' } }),
        prisma.message.count({ where: { status: 'ARCHIVED' } }),
        prisma.message.count({ where: { status: 'SPAM' } }),
      ]);

    const totalPages = Math.ceil(totalFiltered / limit) || 1;

    return NextResponse.json({
      success: true,
      messages,
      pagination: {
        page,
        limit,
        totalItems: totalFiltered,
        totalPages,
        hasMore: page < totalPages,
      },
      counts: {
        all: allActiveCount,
        unread: unreadCount,
        new: newCount,
        inProgress: inProgressCount,
        resolved: resolvedCount,
        archived: archivedCount,
        spam: spamCount,
      },
    });
  } catch (error) {
    console.error('Failed to retrieve messages from database:', error);
    return NextResponse.json(
      { success: false, error: 'Database query failure while retrieving messages.' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/v1/messages
 * Direct public inbound message submission
 */
export async function POST(request: Request) {
  try {
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0].trim() ||
      request.headers.get('x-real-ip') ||
      'anonymous-client';

    const now = Date.now();
    const rateRecord = rateLimitMap.get(ip);
    if (rateRecord && now < rateRecord.resetAt && rateRecord.count >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        { success: false, error: 'Too many messages sent. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    const rawBody = await request.json();
    const parsed = DirectMessageSchema.safeParse(rawBody);

    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors).flat()[0] || 'Invalid input data';
      return NextResponse.json({ success: false, error: firstError, fieldErrors }, { status: 400 });
    }

    const { name, email, company, phone, subject, content, source, category } = parsed.data;

    // Atomically create Lead and Message
    const [savedLead, savedMessage] = await prisma.$transaction(async (tx: any) => {
      const lead = await tx.lead.create({
        data: {
          fullName: name,
          email: email.toLowerCase(),
          company: company || 'Direct Client',
          phone: phone || null,
          serviceNeeded: subject,
          budgetRange: 'Flexible',
          projectScope: content,
          aiLeadScore: 85,
          status: 'NEW',
        },
      });

      const message = await tx.message.create({
        data: {
          name,
          email: email.toLowerCase(),
          company: company || null,
          phone: phone || null,
          subject,
          content,
          source: source || 'DIRECT_MESSAGE',
          category: category || 'GENERAL',
          status: 'NEW',
          isRead: false,
          leadId: lead.id,
          metadata: JSON.stringify({ clientIp: ip }),
        },
      });

      return [lead, message];
    });

    // Update rate limiter
    rateLimitMap.set(ip, {
      count: (rateRecord?.count || 0) + 1,
      resetAt: rateRecord ? rateRecord.resetAt : now + RATE_LIMIT_WINDOW_MS,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Message received successfully.',
        messageId: savedMessage.id,
        leadId: savedLead.id,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to persist direct message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process message. Please try again later.' },
      { status: 500 }
    );
  }
}
