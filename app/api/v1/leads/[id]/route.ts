import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
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
    const { id } = params;
    const body = await request.json();
    const { status, aiLeadScore } = body;

    const data: Record<string, any> = {};
    if (status) {
      const validStatuses = ['NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL', 'NEGOTIATION', 'WON', 'LOST'];
      if (!validStatuses.includes(status)) {
        return NextResponse.json(
          { success: false, error: `Invalid status. Must be one of: ${validStatuses.join(', ')}` },
          { status: 400 }
        );
      }
      data.status = status;
    }

    if (typeof aiLeadScore === 'number') {
      data.aiLeadScore = aiLeadScore;
    }

    const updatedLead = await prisma.lead.update({
      where: { id },
      data,
    });

    return NextResponse.json({
      success: true,
      lead: updatedLead,
    });
  } catch (error) {
    console.error('Failed to update lead:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update lead in database.' },
      { status: 500 }
    );
  }
}
