import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { verifyAdminSession } from '@/lib/auth/admin-auth';

export const dynamic = 'force-dynamic';

const MessageUpdateSchema = z.object({
  isRead: z.boolean().optional(),
  status: z.enum(['NEW', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED', 'SPAM']).optional(),
  assignedTo: z.string().trim().max(100).nullable().optional(),
});

/**
 * GET /api/v1/messages/[id]
 * Fetch message detail, linked CRM lead, and internal notes thread
 */
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const auth = verifyAdminSession(request, ['ADMIN', 'MANAGER', 'SALES']);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const { id } = params;

    const message = await prisma.message.findUnique({
      where: { id },
      include: {
        lead: true,
        notes: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (error) {
    console.error('Failed to retrieve message detail:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve message detail from database.' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/v1/messages/[id]
 * Update workflow status, read state, or staff assignment
 */
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const auth = verifyAdminSession(request, ['ADMIN', 'MANAGER', 'SALES']);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const { id } = params;
    const rawBody = await request.json();

    const parsed = MessageUpdateSchema.safeParse(rawBody);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors).flat()[0] || 'Invalid update payload.';
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const { isRead, status, assignedTo } = parsed.data;

    // Verify message exists
    const existing = await prisma.message.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Message not found.' },
        { status: 404 }
      );
    }

    const updateData: any = {};

    if (typeof isRead === 'boolean') {
      updateData.isRead = isRead;
      if (isRead) {
        updateData.readAt = new Date();
        updateData.readBy = `${auth.staff.name} (${auth.staff.role})`;
      } else {
        updateData.readAt = null;
        updateData.readBy = null;
      }
    }

    if (status) {
      updateData.status = status;
    }

    if (assignedTo !== undefined) {
      updateData.assignedTo = assignedTo;
    }

    const updatedMessage = await prisma.message.update({
      where: { id },
      data: updateData,
      include: {
        lead: true,
        notes: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    // Audit log state modification
    try {
      await prisma.auditLog.create({
        data: {
          action: 'MESSAGE_UPDATE',
          details: `Staff ${auth.staff.name} [${auth.staff.role}] updated message ${id}: ${JSON.stringify(updateData)}`,
          ipAddress: request.headers.get('x-forwarded-for') || null,
        },
      });
    } catch (auditErr) {
      // Non-blocking audit failure
      console.warn('Audit logging warning:', auditErr);
    }

    return NextResponse.json({
      success: true,
      message: updatedMessage,
    });
  } catch (error) {
    console.error('Failed to update message:', error);
    return NextResponse.json(
      { success: false, error: 'Database update failed.' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/v1/messages/[id]
 * Remove or archive message
 */
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const auth = verifyAdminSession(request, ['ADMIN', 'MANAGER']);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const { id } = params;

    const existing = await prisma.message.findUnique({
      where: { id },
    });

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Message not found.' },
        { status: 404 }
      );
    }

    // Delete message (cascades to MessageNote)
    await prisma.message.delete({
      where: { id },
    });

    // Audit log deletion
    try {
      await prisma.auditLog.create({
        data: {
          action: 'MESSAGE_DELETE',
          details: `Staff ${auth.staff.name} [${auth.staff.role}] deleted message ${id} from ${existing.email}`,
          ipAddress: request.headers.get('x-forwarded-for') || null,
        },
      });
    } catch (auditErr) {
      console.warn('Audit logging warning:', auditErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Message permanently removed.',
    });
  } catch (error) {
    console.error('Failed to delete message:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete message from database.' },
      { status: 500 }
    );
  }
}
