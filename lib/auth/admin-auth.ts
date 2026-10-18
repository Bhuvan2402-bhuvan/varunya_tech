import { NextResponse } from 'next/server';

export type PanelRole = 'ADMIN' | 'MANAGER' | 'DEVELOPER' | 'DESIGNER' | 'SALES' | 'HR' | 'FINANCE';

export interface AuthenticatedStaff {
  role: PanelRole;
  name: string;
  title: string;
}

export const STAFF_MAP: Record<PanelRole, { name: string; title: string }> = {
  ADMIN: { name: 'Marcus Vance', title: 'Chief Executive Admin' },
  MANAGER: { name: 'Sarah Jenkins', title: 'Lead Delivery Manager' },
  DEVELOPER: { name: 'Alex Rivera', title: 'Chief Systems Architect' },
  DESIGNER: { name: 'Elena Rostova', title: 'Creative Design Director' },
  SALES: { name: 'Diana Prince', title: 'VP of Client Relations' },
  HR: { name: 'Robert Chen', title: 'Director of Talent Allocation' },
  FINANCE: { name: 'Warren Vance', title: 'Chief Financial Officer' },
};

export const VALID_ROLES = Object.keys(STAFF_MAP) as PanelRole[];

/**
 * Server-side Admin & Staff Authentication Verifier
 * Checks X-Staff-Token or Authorization Bearer header.
 * Gated by allowed roles.
 */
export function verifyAdminSession(
  request: Request,
  allowedRoles: PanelRole[] = ['ADMIN', 'MANAGER', 'SALES']
): { authenticated: true; staff: AuthenticatedStaff } | { authenticated: false; response: NextResponse } {
  const token =
    request.headers.get('X-Staff-Token') ||
    request.headers.get('Authorization')?.replace('Bearer ', '');

  if (!token || !token.startsWith('token_')) {
    return {
      authenticated: false,
      response: NextResponse.json(
        {
          success: false,
          error: 'Unauthorized. Valid staff session token required.',
        },
        { status: 401 }
      ),
    };
  }

  const role = token.replace('token_', '').toUpperCase() as PanelRole;

  if (!VALID_ROLES.includes(role)) {
    return {
      authenticated: false,
      response: NextResponse.json(
        {
          success: false,
          error: 'Invalid session credentials. Role identifier unrecognized.',
        },
        { status: 401 }
      ),
    };
  }

  if (!allowedRoles.includes(role)) {
    return {
      authenticated: false,
      response: NextResponse.json(
        {
          success: false,
          error: `Forbidden. Role '${role}' lacks clearance for this operation. Permitted roles: ${allowedRoles.join(', ')}.`,
        },
        { status: 403 }
      ),
    };
  }

  const staffDetails = STAFF_MAP[role];

  return {
    authenticated: true,
    staff: {
      role,
      name: staffDetails.name,
      title: staffDetails.title,
    },
  };
}
