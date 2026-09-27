"use client";

import React, { useState } from "react";
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
  Sparkles
} from "lucide-react";
import { AdminSessionProvider, useAdminSession, PanelRole } from "./AdminSessionContext";
import { Button } from "@/components/ui/Button";
import { TimezoneClockWidget } from "@/components/timezone/TimezoneClockWidget";

const ROLE_PERMISSIONS: Record<PanelRole, string[]> = {
  ADMIN: ["/admin", "/admin/homepage", "/admin/careers", "/admin/leads", "/admin/projects", "/admin/employees", "/admin/finance", "/admin/cms"],
  MANAGER: ["/admin", "/admin/homepage", "/admin/careers", "/admin/projects", "/admin/employees", "/admin/cms"],
  DEVELOPER: ["/admin", "/admin/projects"],
  DESIGNER: ["/admin", "/admin/homepage", "/admin/projects"],
  SALES: ["/admin", "/admin/leads"],
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
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center space-y-4">
        <div className="w-12 h-12 rounded-full border-t-2 border-purple-500 animate-spin" />
        <span className="text-xs font-mono text-slate-400">Loading secure terminal session...</span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">
        {/* Background Decorative Gradients */}
        <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-purple-600/10 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md bg-[#0F111A]/80 border border-slate-800 rounded-3xl p-8 backdrop-blur-2xl shadow-2xl relative z-10 space-y-6">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center p-3.5 bg-purple-500/10 border border-purple-500/30 rounded-2xl text-purple-400 mb-2">
              <ShieldCheck className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight font-display">Staff Command Portal</h2>
            <p className="text-xs text-slate-400 max-w-xs mx-auto">
              Please enter security credentials for your authorized staff role to access Velocity 30 monitoring services.
            </p>
          </div>

          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-400 font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Authorized Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as PanelRole)}
                className="w-full px-3 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-purple-500/50 transition cursor-pointer"
              >
                <option value="ADMIN">Role: ADMIN (CTO)</option>
                <option value="MANAGER">Role: MANAGER (Delivery)</option>
                <option value="DEVELOPER">Role: DEVELOPER (Architect)</option>
                <option value="DESIGNER">Role: DESIGNER (Creative)</option>
                <option value="SALES">Role: SALES (VP Client Rel)</option>
                <option value="HR">Role: HR (Director)</option>
                <option value="FINANCE">Role: FINANCE (CFO)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Security Password</label>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/50 transition font-mono"
                />
                <Lock className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[10px] font-mono text-slate-400 uppercase tracking-wider">Security Token / 2FA Key (Optional)</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="e.g. 123456"
                  value={securityKey}
                  onChange={(e) => setSecurityKey(e.target.value)}
                  className="w-full pl-3 pr-10 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/50 transition font-mono"
                />
                <Key className="absolute right-3 top-3 w-4 h-4 text-slate-500" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-90 active:scale-[0.99] transition rounded-xl font-bold text-xs text-white shadow-lg shadow-purple-500/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-3.5 h-3.5 rounded-full border-t border-white animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <span>Access Dashboard</span>
              )}
            </button>
          </form>

          {/* Cheatsheet Toggle */}
          <div className="border-t border-slate-800 pt-4 flex flex-col items-center">
            <button
              onClick={() => setShowCheatsheet(!showCheatsheet)}
              className="text-[10px] text-slate-500 font-mono hover:text-slate-300 transition underline"
            >
              {showCheatsheet ? "Hide Testing Credentials" : "Show Testing Credentials"}
            </button>

            {showCheatsheet && (
              <div className="mt-3 w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-[10px] font-mono text-slate-400 space-y-1">
                <div className="font-bold text-slate-300 pb-1 border-b border-slate-800 mb-1">Developer Credentials:</div>
                <div className="flex justify-between"><span>ADMIN:</span> <span className="text-purple-400">admin2026</span></div>
                <div className="flex justify-between"><span>MANAGER:</span> <span className="text-purple-400">manager2026</span></div>
                <div className="flex justify-between"><span>DEVELOPER:</span> <span className="text-purple-400">dev2026</span></div>
                <div className="flex justify-between"><span>DESIGNER:</span> <span className="text-purple-400">design2026</span></div>
                <div className="flex justify-between"><span>SALES:</span> <span className="text-purple-400">sales2026</span></div>
                <div className="flex justify-between"><span>HR:</span> <span className="text-purple-400">hr2026</span></div>
                <div className="flex justify-between"><span>FINANCE:</span> <span className="text-purple-400">finance2026</span></div>
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
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0 font-sans">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-cyan-500 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Zap className="w-4 h-4 text-purple-400" />
              </div>
            </div>
            <span className="font-display font-bold text-sm tracking-tight text-white">
              ADMIN<span className="text-purple-400">HQ</span>
            </span>
          </Link>

          {/* Role Switcher */}
          <div className="space-y-1.5">
            <label className="block text-[10px] font-mono text-purple-400 uppercase tracking-wider">Role-Based Access (RBAC)</label>
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
              className="w-full px-3 py-2 bg-slate-950 border border-purple-500/40 rounded-xl text-xs font-mono text-white focus:outline-none cursor-pointer"
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? "bg-purple-500/15 border border-purple-500/40 text-purple-300 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-purple-400" : "text-slate-500"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Admin Footer */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs gap-2">
          <div className="flex items-center gap-2.5 overflow-hidden">
            {staff?.avatar && (
              <img 
                src={staff.avatar} 
                alt={staff.name} 
                className="w-8 h-8 rounded-full border border-purple-500/40 shrink-0 object-cover" 
              />
            )}
            <div className="truncate">
              <div className="text-white font-bold truncate leading-tight">{staff?.name}</div>
              <div className="text-[10px] text-purple-400 font-mono truncate leading-none mt-0.5">{staff?.title}</div>
            </div>
          </div>
          <button 
            onClick={() => logout()} 
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 shrink-0 transition"
            title="Secure Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <header className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800 font-sans flex-wrap gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-display">Executive Management HQ</h1>
            <p className="text-xs text-slate-400">Role active: <span className="text-purple-400 font-mono font-bold">{activeRole}</span> • 30-Day Delivery Velocity Monitoring.</p>
          </div>

          <div className="flex items-center gap-3">
            <TimezoneClockWidget variant="detailed" />

            <Link href="/" className="text-xs font-medium text-purple-400 hover:text-purple-300 hover:underline px-3 py-2 rounded-xl bg-purple-500/10 border border-purple-500/20 transition">
              Exit Admin →
            </Link>
          </div>
        </header>

        {hasAccess ? (
          children
        ) : (
          /* Access Denied (RBAC Gated) screen */
          <div className="flex flex-col items-center justify-center py-16 px-4 max-w-lg mx-auto text-center space-y-6 font-sans">
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 rounded-3xl inline-flex animate-pulse">
              <ShieldAlert className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight font-display uppercase text-red-400">
                RBAC Security Lock
              </h2>
              <p className="text-xs text-slate-450">
                Access to this module has been blocked by the corporate Role-Based Access Control (RBAC) security policy.
              </p>
            </div>

            <div className="w-full p-4 bg-slate-900 border border-slate-800 rounded-2xl text-left space-y-2 text-xs font-mono">
              <div className="flex justify-between border-b border-slate-850 pb-1.5 mb-1.5">
                <span className="text-slate-500">Attempted Path:</span>
                <span className="text-white font-semibold">{pathname}</span>
              </div>
              <div className="flex justify-between border-b border-slate-850 pb-1.5 mb-1.5">
                <span className="text-slate-500">Active Role:</span>
                <span className="text-purple-450 font-bold uppercase">{activeRole}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Required Clearance:</span>
                <span className="text-cyan-400 font-bold">
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
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-slate-955/80 backdrop-blur-md font-sans">
          <div className="w-full max-w-sm bg-[#0F111A] border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-purple-400" /> Security Switch Authorization
              </h3>
              <p className="text-[11px] text-slate-400">
                You are switching session clearance from <strong className="text-purple-455">{activeRole}</strong> to <strong className="text-cyan-400">{targetRole}</strong>. Enter the password for <strong className="text-cyan-400">{targetRole}</strong> to proceed.
              </p>
            </div>

            {confirmError && (
              <div className="p-2 bg-red-500/10 border border-red-500/30 rounded-xl text-[10px] text-red-400 font-mono">
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
                <label className="block text-[9px] font-mono text-slate-550 uppercase tracking-wider">Password for {targetRole}</label>
                <input
                  type="password"
                  required
                  autoFocus
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full pl-3 pr-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/50 transition font-mono"
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
                  className="flex-1 py-2 bg-slate-900 border border-slate-800 rounded-xl font-bold text-[10px] text-slate-350 hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-xl font-bold text-[10px] text-white hover:opacity-90 transition"
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
