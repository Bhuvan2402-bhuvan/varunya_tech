"use client";

import React, { useState } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useAdminSession, PanelRole, STAFF_DETAILS } from "./AdminSessionContext";
import { 
  TrendingUp, 
  Users, 
  Clock, 
  DollarSign, 
  Kanban, 
  Bot, 
  ArrowUpRight, 
  ShieldCheck,
  Activity,
  Terminal,
  Palette,
  Briefcase,
  Users2,
  FileCheck,
  Database,
  GitBranch,
  Figma,
  CheckCircle,
  AlertTriangle,
  Server,
  Download,
  Percent,
  Lock
} from "lucide-react";

const ROLE_RESPONSIBILITIES: Record<PanelRole, string[]> = {
  ADMIN: [
    "Manage employees and accounts",
    "Create departments",
    "Assign roles and permissions",
    "Manage company settings",
    "Monitor all departments",
    "View company-wide reports",
    "Manage projects and clients",
    "Access audit logs",
  ],
  MANAGER: [
    "Create and manage projects",
    "Assign tasks to developers/designers",
    "Set deadlines",
    "Track project progress",
    "Manage team workload",
    "Conduct team reviews",
    "Approve team requests",
    "Coordinate between departments",
    "Report project status to Admin",
  ],
  DEVELOPER: [
    "Build software features",
    "Write and maintain code",
    "Fix bugs",
    "Develop APIs",
    "Work with databases",
    "Perform testing",
    "Review code",
    "Manage Git branches/commits",
    "Update technical documentation",
  ],
  DESIGNER: [
    "Design website/app interfaces",
    "Create wireframes",
    "Create prototypes",
    "Design UI/UX",
    "Maintain design systems",
    "Create graphics/assets",
    "Review usability",
    "Work with developers",
    "Handle design revisions",
  ],
  SALES: [
    "Find potential customers",
    "Manage leads",
    "Contact prospects",
    "Schedule meetings",
    "Prepare proposals",
    "Negotiate with clients",
    "Convert leads into customers",
    "Maintain client relationships",
    "Track sales targets",
  ],
  HR: [
    "Recruit employees",
    "Post job openings",
    "Manage candidates",
    "Schedule interviews",
    "Handle onboarding",
    "Maintain employee records",
    "Manage attendance",
    "Manage leave",
    "Conduct performance reviews",
    "Handle employee policies",
  ],
  FINANCE: [
    "Create and manage invoices",
    "Track customer payments",
    "Record expenses",
    "Manage company budgets",
    "Process salary-related financial data",
    "Track outstanding payments",
    "Monitor cash flow",
    "Prepare financial reports",
    "Track project profitability",
    "Handle tax/accounting records",
  ],
};

export default function AdminDashboardPage() {
  const { activeRole } = useAdminSession();

  if (!activeRole) {
    return (
      <div className="flex items-center justify-center py-20">
        <span className="text-xs font-mono text-slate-400">Verifying session clearance...</span>
      </div>
    );
  }

  const getRoleMetrics = (role: PanelRole) => {
    switch (role) {
      case "ADMIN":
        return [
          { title: "Monthly Recurring Revenue", value: "$148,500", change: "+24.5%", icon: DollarSign, color: "text-cyan-400" },
          { title: "Active 30-Day Sprints", value: "8 Active", change: "100% SLA Hit", icon: Clock, color: "text-purple-400" },
          { title: "Inbound AI Quotes (30d)", value: "142 Leads", change: "+38%", icon: Bot, color: "text-emerald-400" },
          { title: "Client Satisfaction (CSAT)", value: "4.96 / 5.0", change: "SLA Certified", icon: ShieldCheck, color: "text-yellow-400" },
        ];
      case "MANAGER":
        return [
          { title: "Sprints On Schedule", value: "94.2%", change: "+2.1% SLA", icon: Clock, color: "text-purple-400" },
          { title: "Active Project Count", value: "8 Active", change: "8 Teams Assembled", icon: Briefcase, color: "text-cyan-400" },
          { title: "Task Completion Rate", value: "88.6%", change: "+5.4% this week", icon: CheckCircle, color: "text-emerald-400" },
          { title: "Manager CSAT score", value: "4.95 / 5.0", change: "All milestones signed", icon: ShieldCheck, color: "text-yellow-400" },
        ];
      case "DEVELOPER":
        return [
          { title: "Avg API Latency", value: "48 ms", change: "Sub-100ms SLA OK", icon: Activity, color: "text-cyan-400" },
          { title: "Git Commits (Today)", value: "42 Commits", change: "5 active branches", icon: GitBranch, color: "text-purple-400" },
          { title: "Build Success Rate", value: "100%", change: "Last compiled: 10m ago", icon: Server, color: "text-emerald-400" },
          { title: "Database Connections", value: "23 Active", change: "Connection Pool: 85% free", icon: Database, color: "text-yellow-400" },
        ];
      case "DESIGNER":
        return [
          { title: "Figma Files Configured", value: "4 Active", change: "Design system v2.4", icon: Figma, color: "text-purple-400" },
          { title: "Styled Components", value: "48 Tokens", change: "Synced to Tailwind", icon: Palette, color: "text-cyan-400" },
          { title: "Asset Exports", value: "120 Shared", change: "SVG Optimized", icon: Download, color: "text-emerald-400" },
          { title: "Design CSAT", value: "4.92 / 5.0", change: "Figma Prototypes approved", icon: ShieldCheck, color: "text-yellow-400" },
        ];
      case "SALES":
        return [
          { title: "Lead Pipeline Value", value: "$642,000", change: "+18.2% MoM", icon: DollarSign, color: "text-cyan-400" },
          { title: "Conversion Rate", value: "14.2%", change: "+1.8% average", icon: Percent, color: "text-purple-400" },
          { title: "Qualified Hot Leads", value: "18 Leads", change: "Win probability > 85%", icon: Bot, color: "text-emerald-400" },
          { title: "Proposals Sent (30d)", value: "8 Sent", change: "SLA Response: < 24h", icon: FileCheck, color: "text-yellow-400" },
        ];
      case "HR":
        return [
          { title: "Staff Headcount", value: "14 Staff", change: "+2 hiring", icon: Users2, color: "text-cyan-400" },
          { title: "Active Deployments", value: "12 Assembled", change: "86% team allocation", icon: Briefcase, color: "text-purple-400" },
          { title: "Hiring Pipeline", value: "42 Candidates", change: "Next interviews: 3 today", icon: Users, color: "text-emerald-400" },
          { title: "Developer Retention", value: "98.2%", change: "Industry high", icon: ShieldCheck, color: "text-yellow-400" },
        ];
      case "FINANCE":
        return [
          { title: "Total MRR", value: "$148,500", change: "+24.5%", icon: DollarSign, color: "text-cyan-400" },
          { title: "Outstanding Invoices", value: "3 Pending", change: "SLA Due in 7 days", icon: Clock, color: "text-purple-400" },
          { title: "Invoiced Volume", value: "$182,000", change: "98% collection rate", icon: FileCheck, color: "text-emerald-400" },
          { title: "Stripe Payouts (Est.)", value: "$45,200", change: "Next payout: Tomorrow", icon: DollarSign, color: "text-yellow-400" },
        ];
    }
  };

  const metrics = getRoleMetrics(activeRole);

  return (
    <div className="space-y-8 font-sans">
      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((s, idx) => {
          const Icon = s.icon;
          return (
            <GlassCard key={idx} className="p-6 border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-mono">{s.title}</span>
                <div className={`p-2 rounded-lg bg-slate-800 ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-white font-display">{s.value}</div>
              <div className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" /> {s.change}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Main Grid: Custom Role-Based Widget & Active Sprint Tracker */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Dynamic Column: Specific Role Widget */}
        <div className="lg:col-span-7">
          <RoleSpecificWidget role={activeRole} />
        </div>

        {/* Column: Checklist & Sprint Health */}
        <div className="lg:col-span-5 space-y-8">
          {/* Active Scope & Responsibilities Checklist */}
          <GlassCard className="p-6 border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-cyan-400" /> Active Scope & Checklist
            </h3>
            <p className="text-[11px] text-slate-400 font-sans">Your assigned job responsibilities & operational clearance parameters:</p>
            <div className="space-y-2.5 font-mono text-[11px] text-slate-350">
              {ROLE_RESPONSIBILITIES[activeRole].map((resp, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-cyan-400 font-bold mt-0.5">•</span>
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Active 30-Day Sprint Health */}
          <GlassCard className="p-6 border-slate-800 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Kanban className="w-5 h-5 text-purple-400" /> Active 30-Day Sprint Health
            </h3>

            <div className="space-y-4">
              <div className="p-3.5 bg-slate-800/40 border border-slate-700/60 space-y-2 rounded-xl">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">ApexPay FinTech Portal</span>
                  <span className="text-cyan-400 font-mono font-bold">Day 18 (60%)</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400 rounded-full w-[60%]" />
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/40 border border-slate-700/60 space-y-2 rounded-xl">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">PulseHealth MedTech Clinic</span>
                  <span className="text-purple-400 font-mono font-bold">Day 24 (80%)</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-purple-400 rounded-full w-[80%]" />
                </div>
              </div>

              <div className="p-3.5 bg-slate-800/40 border border-slate-700/60 space-y-2 rounded-xl">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-white">Global Freight Logistics ERP</span>
                  <span className="text-yellow-400 font-mono font-bold">Day 6 (20%)</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 rounded-full w-[20%]" />
                </div>
              </div>
            </div>

            <Link href="/admin/projects" className="block">
              <Button size="sm" variant="outline" className="w-full mt-2 text-xs">
                Manage Kanban Board
              </Button>
            </Link>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}

// --- CUSTOM ACTION/INFORMATION WIDGETS BY ROLE ---
function RoleSpecificWidget({ role }: { role: PanelRole }) {
  const { rolePasswords, updatePassword } = useAdminSession();
  const [editingRole, setEditingRole] = useState<PanelRole | null>(null);
  const [newPasswordVal, setNewPasswordVal] = useState("");
  const [visiblePasswords, setVisiblePasswords] = useState<Record<PanelRole, boolean>>({
    ADMIN: false,
    MANAGER: false,
    DEVELOPER: false,
    DESIGNER: false,
    SALES: false,
    HR: false,
    FINANCE: false,
  });

  const togglePasswordVisible = (r: PanelRole) => {
    setVisiblePasswords(prev => ({ ...prev, [r]: !prev[r] }));
  };

  const handleSavePassword = (r: PanelRole) => {
    if (!newPasswordVal.trim()) return;
    updatePassword(r, newPasswordVal.trim());
    setEditingRole(null);
    setNewPasswordVal("");
  };

  switch (role) {
    case "ADMIN":
      const rolesList = Object.keys(STAFF_DETAILS) as PanelRole[];
      return (
        <div className="space-y-8">
          {/* Security Credentials & Password Reset Manager */}
          <GlassCard className="p-6 space-y-4 border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Lock className="w-5 h-5 text-purple-400" /> Security Credentials & Password Manager
              </h3>
              <p className="text-[11px] text-slate-400 mt-1">Review active role clearance keys and reset credentials. Changes persist instantly.</p>
            </div>

            <div className="space-y-3 pt-2">
              {rolesList.map((r) => {
                const isEditing = editingRole === r;
                const isVisible = visiblePasswords[r];
                const pwd = rolePasswords[r] || "";
                return (
                  <div key={r} className="p-3.5 bg-slate-900/60 border border-slate-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={STAFF_DETAILS[r].avatar} alt={STAFF_DETAILS[r].name} className="w-8 h-8 rounded-full border border-slate-800 object-cover" />
                      <div>
                        <div className="font-bold text-white font-mono">{r} Clearance</div>
                        <div className="text-[10px] text-slate-500">{STAFF_DETAILS[r].name}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {isEditing ? (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="New Password"
                            value={newPasswordVal}
                            onChange={(e) => setNewPasswordVal(e.target.value)}
                            className="px-2.5 py-1 bg-slate-950 border border-slate-850 hover:border-slate-800 text-white font-mono text-[10px] rounded-lg focus:outline-none focus:border-purple-500/50"
                          />
                          <button
                            onClick={() => handleSavePassword(r)}
                            className="px-2.5 py-1.5 bg-purple-600 hover:bg-purple-750 text-white font-bold rounded-lg text-[10px] transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingRole(null);
                              setNewPasswordVal("");
                            }}
                            className="px-2.5 py-1.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-405 font-bold rounded-lg text-[10px] transition"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="font-mono text-[11px] text-slate-400 px-2 py-1 bg-slate-950 border border-slate-850 rounded">
                            {isVisible ? pwd : "••••••••"}
                          </span>
                          <button
                            onClick={() => togglePasswordVisible(r)}
                            className="px-2 py-1 bg-slate-950 hover:bg-slate-900 border border-slate-850 rounded text-slate-400 hover:text-white font-bold font-sans text-[10px] transition"
                          >
                            {isVisible ? "Hide" : "Reveal"}
                          </button>
                          <button
                            onClick={() => {
                              setEditingRole(r);
                              setNewPasswordVal(pwd);
                            }}
                            className="px-2.5 py-1.5 bg-purple-600/10 border border-purple-500/20 hover:bg-purple-600/25 text-purple-300 rounded-lg text-[10px] font-bold transition"
                          >
                            Reset Password
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </GlassCard>

          {/* Security & Audit Logs */}
          <GlassCard className="p-6 space-y-4 border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" /> Security & Audit Logs (Real-time)
              </h3>
              <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono px-2 py-0.5 rounded">
                IP CLEARANCE SECURE
              </span>
            </div>

            <div className="space-y-3 font-mono text-[10px]">
              <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-800 flex justify-between text-slate-300">
                <span>[05:42:01] USER ADMIN logged in from 192.168.1.42</span>
                <span className="text-cyan-400">SUCCESS</span>
              </div>
              <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-800 flex justify-between text-slate-300">
                <span>[05:30:15] Vercel staging deployment webhook triggered</span>
                <span className="text-purple-400">PENDING</span>
              </div>
              <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-800 flex justify-between text-slate-300">
                <span>[04:15:32] SQLite database automatic backup executed</span>
                <span className="text-emerald-400">COMPLETED</span>
              </div>
              <div className="p-2.5 bg-slate-800/50 rounded-lg border border-slate-800 flex justify-between text-slate-300">
                <span>[02:00:10] API keys rotated automatically</span>
                <span className="text-emerald-400">COMPLETED</span>
              </div>
            </div>
          </GlassCard>
        </div>
      );

    case "MANAGER":
      return (
        <GlassCard className="p-6 space-y-4 border-slate-800 h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-purple-400" /> Milestone SLA Tracking
            </h3>
            <span className="text-[10px] bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono px-2 py-0.5 rounded">
              SLA OK
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>ApexPay: Scope Lock</span>
                <span className="text-emerald-400">Day 7 Milestone Completed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full"><div className="h-full bg-emerald-400 w-full rounded-full" /></div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>ApexPay: Frontend & Auth</span>
                <span className="text-emerald-400">Day 15 Milestone Completed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full"><div className="h-full bg-emerald-400 w-full rounded-full" /></div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-slate-400">
                <span>ApexPay: APIs & Stripe integration</span>
                <span className="text-purple-400">Day 23 In Progress (Due in 5 days)</span>
              </div>
              <div className="w-full h-1.5 bg-slate-900 rounded-full"><div className="h-full bg-purple-400 w-[50%] rounded-full" /></div>
            </div>
          </div>
        </GlassCard>
      );

    case "DEVELOPER":
      return (
        <GlassCard className="p-6 space-y-4 border-slate-800 h-full font-mono text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2 font-sans">
              <Terminal className="w-5 h-5 text-emerald-400" /> Systems Command Console
            </h3>
            <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded">
              VERCEL OK
            </span>
          </div>

          <div className="space-y-3.5 bg-slate-950 p-4 border border-slate-800/80 rounded-xl">
            <div className="space-y-1 text-slate-300">
              <div className="text-slate-500 font-bold">// Database Health Check</div>
              <div className="flex justify-between">
                <span>SQLite connection:</span>
                <span className="text-emerald-400 font-bold">CONNECTED</span>
              </div>
              <div className="flex justify-between">
                <span>Prisma client status:</span>
                <span className="text-emerald-400">INITIALIZED</span>
              </div>
            </div>

            <div className="space-y-1 text-slate-300 border-t border-slate-900 pt-2.5">
              <div className="text-slate-500 font-bold">// Development Links</div>
              <div className="flex justify-between items-center text-[10px]">
                <span>Staging Deployment:</span>
                <span className="text-cyan-400">staging.velocity30.app</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span>GitHub Repositories:</span>
                <span className="text-slate-400">github.com/velocity30/core</span>
              </div>
            </div>
          </div>
        </GlassCard>
      );

    case "DESIGNER":
      return (
        <GlassCard className="p-6 space-y-4 border-slate-800 h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Palette className="w-5 h-5 text-cyan-400" /> Design Tokens Sandbox
            </h3>
            <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono px-2 py-0.5 rounded">
              FIGMA SYNCED
            </span>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2.5 text-[10px] font-mono">
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <div className="w-full h-8 bg-[#FF5500] rounded mb-1.5 shadow" />
                <span className="text-white block font-bold text-[9px]">Brand Orange</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <div className="w-full h-8 bg-cyan-400 rounded mb-1.5 shadow" />
                <span className="text-white block font-bold text-[9px]">Cyan glow</span>
              </div>
              <div className="p-2 bg-slate-900 rounded-lg border border-slate-800 text-center">
                <div className="w-full h-8 bg-purple-500 rounded mb-1.5 shadow" />
                <span className="text-white block font-bold text-[9px]">Purple brand</span>
              </div>
            </div>
          </div>
        </GlassCard>
      );

    case "SALES":
      const [quoteSliderVal, setQuoteSliderVal] = useState(14500);
      return (
        <GlassCard className="p-6 space-y-4 border-slate-800 h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-400" /> Inbound Lead Pipeline
            </h3>
            <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono px-2 py-0.5 rounded">
              18 HOT LEADS
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-slate-955 border border-slate-900 rounded-xl space-y-3 mt-4">
              <div className="text-[10px] font-mono text-slate-400 font-bold uppercase tracking-wider">Fast Proposal Estimator</div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-slate-400 flex justify-between font-mono">
                  <span>Target SLA Budget:</span>
                  <span className="text-cyan-400 font-bold">${quoteSliderVal.toLocaleString()}</span>
                </label>
                <input 
                  type="range" 
                  min="10000" 
                  max="50000" 
                  step="500" 
                  value={quoteSliderVal}
                  onChange={(e) => setQuoteSliderVal(Number(e.target.value))}
                  className="w-full accent-cyan-400 bg-slate-900 h-1 rounded-lg" 
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-1">
                <span>Est Delivery: <strong className="text-white">30 Days</strong></span>
                <span>Margin Allocation: <strong className="text-white">{Math.round((quoteSliderVal - 6000) / quoteSliderVal * 100)}%</strong></span>
              </div>
            </div>
          </div>
        </GlassCard>
      );

    case "HR":
      return (
        <GlassCard className="p-6 space-y-4 border-slate-800 h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Users2 className="w-5 h-5 text-purple-400" /> Team Allocation Board
            </h3>
            <span className="text-[10px] bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono px-2 py-0.5 rounded">
              ALLOCATION: 86%
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-white">Alex Rivera (Chief Architect)</div>
                <div className="text-[10px] text-slate-400">Assigned: ApexPay FinTech Portal</div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] rounded">
                100% CAP
              </span>
            </div>

            <div className="p-3 bg-slate-800/40 border border-slate-800 rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-white">Elena Rostova (Designer)</div>
                <div className="text-[10px] text-slate-400">Assigned: PulseHealth, ApexPay</div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 font-mono text-[9px] rounded">
                90% CAP
              </span>
            </div>
          </div>
        </GlassCard>
      );

    case "FINANCE":
      return (
        <GlassCard className="p-6 space-y-4 border-slate-800 h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-cyan-400" /> Stripe Transaction Streams
            </h3>
            <span className="text-[10px] bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-mono px-2 py-0.5 rounded">
              STRIPE CLEAR
            </span>
          </div>

          <div className="space-y-3 font-mono text-[10px]">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-slate-400">Invoice: #INV-2026-081</span>
                <div className="text-white font-bold text-xs mt-0.5">$14,500 (ApexPay Mil. 2)</div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[9px] font-bold">
                PAID VIA STRIPE
              </span>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
              <div>
                <span className="text-slate-400">Invoice: #INV-2026-082</span>
                <div className="text-white font-bold text-xs mt-0.5">$9,250 (PulseHealth Mil. 3)</div>
              </div>
              <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded text-[9px] font-bold">
                PAID VIA STRIPE
              </span>
            </div>
          </div>
        </GlassCard>
      );
  }
}
