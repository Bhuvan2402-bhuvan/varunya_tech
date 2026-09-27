import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  const token = request.headers.get("X-Staff-Token") || request.headers.get("Authorization")?.replace("Bearer ", "");

  if (!token || !token.startsWith("token_")) {
    return NextResponse.json(
      { success: false, error: "Unauthorized. Missing token." },
      { status: 401 }
    );
  }

  const role = token.replace("token_", "");
  const permittedRoles = ["ADMIN", "MANAGER", "DEVELOPER", "DESIGNER"];

  if (!permittedRoles.includes(role)) {
    return NextResponse.json(
      { success: false, error: "Forbidden. Insufficient permissions." },
      { status: 403 }
    );
  }

  return NextResponse.json({
    success: true,
    projects: [
      {
        id: "p-01",
        title: "ApexPay Enterprise FinTech Platform",
        client: "ApexPay Inc",
        status: "IN_PROGRESS",
        currentDay: 18,
        totalDays: 30,
        progressPct: 60,
        targetDeadline: "2026-08-16",
        milestones: [
          { title: "Scope & Figma Specs", status: "COMPLETED" },
          { title: "Next.js UI & Auth Engine", status: "COMPLETED" },
          { title: "NestJS APIs & Stripe Integrations", status: "IN_PROGRESS" },
          { title: "QA Load Testing & Security Audit", status: "UPCOMING" },
          { title: "Production Launch", status: "UPCOMING" }
        ]
      }
    ]
  });
}
