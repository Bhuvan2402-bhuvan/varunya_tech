import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const uptimeSeconds = Math.floor(process.uptime());

  return NextResponse.json(
    {
      status: 'healthy',
      service: 'varunyatech-web',
      timestamp: new Date().toISOString(),
      uptime: `${uptimeSeconds}s`,
      environment: process.env.NODE_ENV || 'production',
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}
