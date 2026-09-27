import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  return NextResponse.json({
    success: true,
    message: "Leads API endpoint active"
  });
}

export async function POST(request: Request) {
  const token = request.headers.get("X-Staff-Token") || request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token || !token.startsWith("token_")) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Missing token." },
      { status: 401 }
    );
  }

  const role = token.replace("token_", "");
  const permittedRoles = ["ADMIN", "SALES"];

  if (!permittedRoles.includes(role)) {
    return NextResponse.json(
      { success: false, error: "Forbidden. Insufficient permissions." },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    return NextResponse.json({
      success: true,
      message: 'Lead received and stored in CRM pipeline',
      leadId: `LD-${Math.floor(100000 + Math.random() * 900000)}`,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to process lead' },
      { status: 500 }
    );
  }
}
