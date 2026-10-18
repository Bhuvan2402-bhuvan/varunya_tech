import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { verifyAdminSession } from '@/lib/auth/admin-auth';

export const dynamic = 'force-dynamic';

const NoteCreateSchema = z.object({
  content: z
    .string({ required_error: 'Note content is required.' })
    .trim()
    .min(1, 'Note content cannot be empty.')
    .max(2000, 'Note content cannot exceed 2000 characters.'),
});

/**
 * POST /api/v1/messages/[id]/notes
 * Add internal confidential note to a message
 */
export async function POST(
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

    const parsed = NoteCreateSchema.safeParse(rawBody);
    if (!parsed.success) {
      const fieldErrors = parsed.error.flatten().fieldErrors;
      const firstError = Object.values(fieldErrors).flat()[0] || 'Invalid note content.';
      return NextResponse.json({ success: false, error: firstError }, { status: 400 });
    }

    const { content } = parsed.data;

    // Verify message exists
    const message = await prisma.message.findUnique({
      where: { id },
      select: { id: true },
    });

    if (!message) {
      return NextResponse.json(
        { success: false, error: 'Message not found.' },
        { status: 404 }
      );
    }

    // Create note
    const note = await prisma.messageNote.create({
      data: {
        messageId: id,
        authorName: auth.staff.name,
        authorRole: auth.staff.role,
        content,
      },
    });

    // Record audit log
    try {
      await prisma.auditLog.create({
        data: {
          action: 'MESSAGE_NOTE_ADD',
          details: `Staff ${auth.staff.name} [${auth.staff.role}] appended internal note to message ${id}`,
          ipAddress: request.headers.get('x-forwarded-for') || null,
        },
      });
    } catch (auditErr) {
      console.warn('Audit log notice:', auditErr);
    }

    return NextResponse.json(
      {
        success: true,
        note,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Failed to append message note:', error);
    return NextResponse.json(
      { success: false, error: 'Database failure while creating internal note.' },
      { status: 500 }
    );
  }
}
