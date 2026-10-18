import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminSession } from '@/lib/auth/admin-auth';

export const dynamic = 'force-dynamic';

/**
 * GET /api/v1/messages/unread-count
 * Returns real-time unread messages count for admin navigation badges
 */
export async function GET(request: Request) {
  const auth = verifyAdminSession(request, ['ADMIN', 'MANAGER', 'SALES', 'DEVELOPER', 'DESIGNER', 'HR', 'FINANCE']);
  if (!auth.authenticated) {
    return auth.response;
  }

  try {
    const unreadCount = await prisma.message.count({
      where: {
        isRead: false,
        status: { notIn: ['ARCHIVED', 'SPAM'] },
      },
    });

    return NextResponse.json({
      success: true,
      unreadCount,
    });
  } catch (error) {
    console.error('Failed to get unread message count:', error);
    return NextResponse.json(
      { success: false, unreadCount: 0, error: 'Database query failed' },
      { status: 500 }
    );
  }
}
