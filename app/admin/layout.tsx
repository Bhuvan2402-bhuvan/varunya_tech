"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Zap, 
  LayoutDashboard, 
  Users2, 
  Kanban, 
  FileEdit, 
  LogOut,
  ShieldAlert,
  ShieldCheck,
  Lock,
  Key,
  CreditCard,
  Briefcase,
  Sparkles,
  Inbox
} from "lucide-react";
import { AdminSessionProvider, useAdminSession, PanelRole } from "./AdminSessionContext";
import { Button } from "@/components/ui/Button";
import { TimezoneClockWidget } from "@/components/timezone/TimezoneClockWidget";

const ROLE_PERMISSIONS: Record<PanelRole, string[]> = {
  ADMIN: ["/admin", "/admin/messages", "/admin/homepage", "/admin/careers", "/admin/leads", "/admin/projects", "/admin/employees", "/admin/finance", "/admin/cms"],
  MANAGER: ["/admin", "/admin/messages", "/admin/homepage", "/admin/careers", "/admin/projects", "/admin/employees", "/admin/cms"],
  DEVELOPER: ["/admin", "/admin/projects"],
  DESIGNER: ["/admin", "/admin/homepage", "/admin/projects"],
  SALES: ["/admin", "/admin/messages", "/admin/leads"],
  HR: ["/admin", "/admin/careers", "/admin/employees", "/admin/cms"],
  FINANCE: ["/admin", "/admin/finance"],
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminSessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </AdminSessionProvider>
  );
}

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const { activeRole, staff, isAuthenticated, isLoading, login, logout, switchRole, verifyPassword } = useAdminSession();
  const pathname = usePathname();

  // Login form local states
  const [selectedRole, setSelectedRole] = useState<PanelRole>("ADMIN");
  const [password, setPassword] = useState("");
  const [securityKey, setSecurityKey] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCheatsheet, setShowCheatsheet] = useState(false);

  // Switch role verification states
  const [showSwitchConfirm, setShowSwitchConfirm] = useState(false);
  const [targetRole, setTargetRole] = useState<PanelRole | null>(null);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState<string | null>(null);

  // Live unread message count
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchUnread = async () => {
      try {
        const token = localStorage.getItem("velocity_panel_token") || `token_${activeRole || "ADMIN"}`;
        const res = await fetch("/api/v1/messages/unread-count", {
          headers: { "X-Staff-Token": token },
        });
        if (res.ok) {
          const data = await res.json();
          if (data.success && typeof data.unreadCount === "number") {
            setUnreadCount(data.unreadCount);
          }
        }
      } catch (err) {
        // Silently handle polling errors
      }
    };

    fetchUnread();
    const interval = setInterval(fetchUnread, 15000); // Poll every 15s
    return () => clearInterval(interval);
  }, [isAuthenticated, activeRole, pathname]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    try {
      const success = await login(selectedRole, password);
      if (!success) {
        setError("Invalid security credentials. Access denied.");
      }
    } catch (err) {
      setError("An error occurred during verification.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex flex-col items-center justify-center space-y-4 font-sans text-[#111215]">
        <div className="w-10 h-10 rounded-full border-t-2 border-[#519DD9] border-r-2 border-[#519DD9]/20 animate-spin" />
        <span className="text-xs font-mono text-[#71757E] uppercase tracking-wider">Initializing secure session...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAFAF8] flex items-center justify-center p-4 relative overflow-hidden font-sans text-[#111215]">
        {/* Luminous Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#519DD9]/8 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-[#53BAC1]/8 blur-[140px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#FFFFFF] border border-[#E5E2DB] shadow-2xl p-8 sm:p-10 relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-3 bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9] mb-1 shadow-xs">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div className="font-mono text-[10px] tracking-[0.25em] text-[#519DD9] uppercase font-bold">
              VARUNYATECH // ADMINHQ
            </div>
            <h2 className="text-2xl font-black text-[#111215] tracking-tight uppercase">Staff Command Access</h2>
            <p className="text-xs text-[#565961] max-w-xs mx-auto leading-relaxed">
              Select your authorized corporate role and enter clearance credentials to access internal systems.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-[#DB0038]/10 border border-[#DB0038]/30 text-xs text-[#DB0038] font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-[#111215] uppercase tracking-wider font-bold">Authorized Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as PanelRole)}
                className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] text-xs font-mono text-[#111215] focus:outline-none focus:border-[#519DD9] transition cursor-pointer shadow-xs"
              >
                <option value="ADMIN">Role: ADMIN (CTO / Executive)</option>
                <option value="MANAGER">Role: MANAGER (Delivery Lead)</option>
                <option value="DEVELOPER">Role: DEVELOPER (Architect)</option>
                <option value="DESIGNER">Role: DESIGNER (Creative)</option>
                <option value="SALES">Role: SALES (Client Relations)</option>
                <option value="HR">Role: HR (Talent Director)</option>
                <option value="FINANCE">Role: FINANCE (CFO)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-[#111215] uppercase tracking-wider font-bold">Security Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] text-xs text-[#111215] focus:outline-none focus:border-[#519DD9] transition font-mono shadow-xs"
                />
                <Lock className="absolute right-3 top-3 w-4 h-4 text-[#71757E]" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-[#71757E] uppercase tracking-wider">Security Token / 2FA Key (Optional)</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 123456"
                  value={securityKey}
                  onChange={(e) => setSecurityKey(e.target.value)}
                  className="w-full pl-3.5 pr-10 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] text-xs text-[#111215] focus:outline-none focus:border-[#519DD9] transition font-mono shadow-xs"
                />
                <Key className="absolute right-3 top-3 w-4 h-4 text-[#71757E]" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 bg-[#111215] hover:bg-[#519DD9] hover:text-[#111215] active:scale-[0.99] transition font-mono text-xs uppercase tracking-widest font-bold text-white shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-t border-current animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <span>Unlock Console Access</span>
              )}
            </button>
          </form>

          {/* Cheatsheet Toggle */}
          <div className="border-t border-[#E5E2DB] pt-4 flex flex-col items-center">
            <button
              onClick={() => setShowCheatsheet(!showCheatsheet)}
              className="text-[10px] text-[#71757E] font-mono hover:text-[#111215] transition underline uppercase tracking-wider"
            >
              {showCheatsheet ? "Hide Testing Credentials" : "Show Testing Credentials"}
            </button>

            {showCheatsheet && (
              <div className="mt-3 w-full bg-[#F5F3EF] border border-[#E5E2DB] p-3 text-[10px] font-mono text-[#4A4D54] space-y-1.5 shadow-xs">
                <div className="font-bold text-[#111215] pb-1 border-b border-[#E5E2DB] uppercase tracking-wider">Authorized Role Passwords:</div>
                <div className="flex justify-between"><span>ADMIN:</span> <strong className="text-[#519DD9]">admin2026</strong></div>
                <div className="flex justify-between"><span>MANAGER:</span> <strong className="text-[#519DD9]">manager2026</strong></div>
                <div className="flex justify-between"><span>DEVELOPER:</span> <strong className="text-[#519DD9]">dev2026</strong></div>
                <div className="flex justify-between"><span>DESIGNER:</span> <strong className="text-[#519DD9]">design2026</strong></div>
                <div className="flex justify-between"><span>SALES:</span> <strong className="text-[#519DD9]">sales2026</strong></div>
                <div className="flex justify-between"><span>HR:</span> <strong className="text-[#519DD9]">hr2026</strong></div>
                <div className="flex justify-between"><span>FINANCE:</span> <strong className="text-[#519DD9]">finance2026</strong></div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const roles: PanelRole[] = ["ADMIN", "MANAGER", "DEVELOPER", "DESIGNER", "SALES", "HR", "FINANCE"];

  const navItems = [
    { name: "Executive Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Messages & Inbox", href: "/admin/messages", icon: Inbox, badge: unreadCount },
    { name: "Homepage Customizer", href: "/admin/homepage", icon: Sparkles },
    { name: "Careers & Jobs", href: "/admin/careers", icon: Briefcase },
    { name: "CRM Lead Pipeline", href: "/admin/leads", icon: Users2 },
    { name: "Sprint Kanban", href: "/admin/projects", icon: Kanban },
    { name: "Employee Directory", href: "/admin/employees", icon: Briefcase },
    { name: "Financial Ledger", href: "/admin/finance", icon: CreditCard },
    { name: "Central CMS Hub", href: "/admin/cms", icon: FileEdit },
  ];

  // RBAC Gating Check
  const hasAccess = activeRole ? ROLE_PERMISSIONS[activeRole].includes(pathname) : false;

  // Filter allowed navigation items
  const allowedNavItems = navItems.filter((item) =>
    activeRole ? ROLE_PERMISSIONS[activeRole].includes(item.href) : false
  );

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col md:flex-row text-[#111215]">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-[#FFFFFF] border-r border-[#E5E2DB] p-6 flex flex-col justify-between shrink-0 font-sans shadow-xs">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#111215] flex items-center justify-center text-[#FFFFFF]">
              <Zap className="w-4 h-4 text-[#519DD9]" />
            </div>
            <span className="font-display font-bold text-sm tracking-tight text-[#111215]">
              ADMIN<span className="text-[#519DD9]">HQ</span>
            </span>
          </Link>

          {/* Role Switcher */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono text-[#71757E] uppercase tracking-wider font-bold">Role-Based Access (RBAC)</label>
            <select
              value={activeRole || "ADMIN"}
              onChange={(e) => {
                const newRole = e.target.value as PanelRole;
                if (newRole !== activeRole) {
                  setTargetRole(newRole);
                  setShowSwitchConfirm(true);
                  setConfirmPassword("");
                  setConfirmError(null);
                }
              }}
              className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-xs font-mono text-[#111215] focus:outline-none cursor-pointer"
            >
              {roles.map((r) => (
                <option key={r} value={r}>Role: {r}</option>
              ))}
            </select>
          </div>

          <nav className="space-y-1">
            {allowedNavItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? "bg-[#F5F3EF] border border-[#111215] text-[#111215] font-semibold shadow-xs"
                      : "text-[#4A4D54] hover:text-[#111215] hover:bg-[#F5F3EF]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${active ? "text-[#519DD9]" : "text-[#71757E]"}`} />
                    <span>{item.name}</span>
                  </div>
                  {typeof item.badge === "number" && item.badge > 0 && (
                    <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-[#DB0038] text-white rounded-full leading-none shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin Footer */}
        <div className="pt-6 border-t border-[#E5E2DB] flex items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {staff?.avatar && (
              <img 
                src={staff.avatar} 
                alt={staff.name} 
                className="w-8 h-8 rounded-full border border-[#E5E2DB] shrink-0 object-cover" 
              />
            )}
            <div className="truncate">
              <div className="text-[#111215] font-bold truncate leading-tight">{staff?.name}</div>
              <div className="text-[10px] text-[#519DD9] font-mono truncate leading-none mt-0.5">{staff?.title}</div>
            </div>
          </div>
          <button 
            onClick={() => logout()} 
            className="p-2 rounded-lg text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF] shrink-0 transition"
            title="Secure Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto bg-[#FAFAF8]">
        <header className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5E2DB] font-sans flex-wrap gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111215] font-display">Executive Management HQ</h1>
            <p className="text-xs text-[#71757E]">Role active: <span className="text-[#519DD9] font-mono font-bold">{activeRole}</span> • 30-Day Delivery Velocity Monitoring.</p>
          </div>

          <div className="flex items-center gap-3">
            <TimezoneClockWidget variant="detailed" />

            <Link href="/" className="text-xs font-medium text-[#111215] hover:text-[#519DD9] px-3.5 py-2 rounded-xl bg-[#FFFFFF] border border-[#E5E2DB] shadow-xs transition">
              Exit Admin →
            </Link>
          </div>
        </header>

        {hasAccess ? (
          children
        ) : (
          /* Access Denied (RBAC Gated) screen */
          <div className="flex flex-col items-center justify-center py-16 px-4 max-w-lg mx-auto text-center space-y-6 font-sans">
            <div className="p-4 bg-[#DB0038]/10 border border-[#DB0038]/30 text-[#DB0038] rounded-2xl inline-flex animate-pulse">
              <ShieldAlert className="w-10 h-10" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#111215] tracking-tight font-display uppercase">
                RBAC Security Lock
              </h2>
              <p className="text-xs text-[#565961] max-w-md mx-auto">
                Access to this module has been restricted by your corporate Role-Based Access Control (RBAC) security policy.
              </p>
            </div>

            <div className="w-full p-5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl text-left space-y-2.5 text-xs font-mono shadow-sm">
              <div className="flex justify-between border-b border-[#E5E2DB] pb-2">
                <span className="text-[#71757E]">Attempted Path:</span>
                <span className="text-[#111215] font-semibold">{pathname}</span>
              </div>
              <div className="flex justify-between border-b border-[#E5E2DB] pb-2">
                <span className="text-[#71757E]">Active Role:</span>
                <span className="text-[#519DD9] font-bold uppercase">{activeRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#71757E]">Required Clearance:</span>
                <span className="text-[#111215] font-bold">
                  {pathname.includes("leads") ? "SALES or ADMIN" :
                   pathname.includes("employees") ? "HR, MANAGER or ADMIN" :
                   pathname.includes("finance") ? "FINANCE or ADMIN" :
                   pathname.includes("projects") ? "ADMIN, MANAGER, DEVELOPER, or DESIGNER" :
                   pathname.includes("homepage") ? "ADMIN, MANAGER, or DESIGNER" :
                   pathname.includes("careers") ? "HR, MANAGER, or ADMIN" :
                   pathname.includes("cms") ? "ADMIN, MANAGER, or HR" : "ADMIN"}
                </span>
              </div>
            </div>

            <Link href="/admin">
              <Button variant="outline" size="sm" className="text-xs">
                Return to Dashboard Safe Zone
              </Button>
            </Link>
          </div>
        )}
      </main>

      {/* Role Switch Security Confirmation Modal */}
      {showSwitchConfirm && targetRole && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-[#111215]/40 backdrop-blur-sm font-sans">
          <div className="w-full max-w-sm bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl p-6 shadow-2xl space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-[#111215] flex items-center gap-2">
                <Lock className="w-4 h-4 text-[#519DD9]" /> Security Switch Authorization
              </h3>
              <p className="text-[11px] text-[#565961]">
                You are switching session clearance from <strong className="text-[#111215]">{activeRole}</strong> to <strong className="text-[#519DD9]">{targetRole}</strong>. Enter the password for <strong className="text-[#519DD9]">{targetRole}</strong> to proceed.
              </p>
            </div>

            {confirmError && (
              <div className="p-2.5 bg-[#DB0038]/10 border border-[#DB0038]/30 rounded-xl text-[10px] text-[#DB0038] font-mono">
                {confirmError}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const isValid = verifyPassword(targetRole, confirmPassword);
                if (isValid) {
                  switchRole(targetRole);
                  setShowSwitchConfirm(false);
                  setTargetRole(null);
                  setConfirmPassword("");
                } else {
                  setConfirmError("Authentication failed. Incorrect password.");
                }
              }}
              className="space-y-3"
            >
              <div className="space-y-1">
                <label className="block text-[10px] font-mono text-[#111215] uppercase tracking-wider font-bold">Password for {targetRole}</label>
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-3 pr-4 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-xs text-[#111215] focus:outline-none focus:border-[#519DD9] transition font-mono shadow-xs"
                />
              </div>

              <div className="flex gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowSwitchConfirm(false);
                    setTargetRole(null);
                    setConfirmPassword("");
                  }}
                  className="flex-1 py-2.5 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl font-bold text-[10px] text-[#565961] hover:text-[#111215] transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#111215] hover:bg-[#519DD9] hover:text-[#111215] rounded-xl font-bold text-[10px] text-white shadow-xs transition"
                >
                  Authorize Switch
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
