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
        <span className="text-xs font-mono text-[#71757E]">Verifying session clearance...</span>
      </div>
    );
  }

  const getRoleMetrics = (role: PanelRole) => {
    switch (role) {
      case "ADMIN":
        return [
          { title: "Monthly Recurring Revenue", value: "$148,500", change: "+24.5%", icon: DollarSign, color: "text-[#519DD9]" },
          { title: "Active 30-Day Sprints", value: "8 Active", change: "100% SLA Hit", icon: Clock, color: "text-[#53BAC1]" },
          { title: "Inbound AI Quotes (30d)", value: "142 Leads", change: "+38%", icon: Bot, color: "text-[#0F766E]" },
          { title: "Client Satisfaction (CSAT)", value: "4.96 / 5.0", change: "SLA Certified", icon: ShieldCheck, color: "text-[#F7C200]" },
        ];
      case "MANAGER":
        return [
          { title: "Sprints On Schedule", value: "94.2%", change: "+2.1% SLA", icon: Clock, color: "text-[#519DD9]" },
          { title: "Active Project Count", value: "8 Active", change: "8 Teams Assembled", icon: Briefcase, color: "text-[#53BAC1]" },
          { title: "Task Completion Rate", value: "88.6%", change: "+5.4% this week", icon: CheckCircle, color: "text-[#0F766E]" },
          { title: "Manager CSAT score", value: "4.95 / 5.0", change: "All milestones signed", icon: ShieldCheck, color: "text-[#F7C200]" },
        ];
      case "DEVELOPER":
        return [
          { title: "Avg API Latency", value: "48 ms", change: "Sub-100ms SLA OK", icon: Activity, color: "text-[#519DD9]" },
          { title: "Git Commits (Today)", value: "42 Commits", change: "5 active branches", icon: GitBranch, color: "text-[#53BAC1]" },
          { title: "Build Success Rate", value: "100%", change: "Last compiled: 10m ago", icon: Server, color: "text-[#0F766E]" },
          { title: "Database Connections", value: "23 Active", change: "Connection Pool: 85% free", icon: Database, color: "text-[#F7C200]" },
        ];
      case "DESIGNER":
        return [
          { title: "Figma Files Configured", value: "4 Active", change: "Design system v2.4", icon: Figma, color: "text-[#519DD9]" },
          { title: "Styled Components", value: "48 Tokens", change: "Synced to Tokens", icon: Palette, color: "text-[#53BAC1]" },
          { title: "Asset Exports", value: "120 Shared", change: "SVG Optimized", icon: Download, color: "text-[#0F766E]" },
          { title: "Design CSAT", value: "4.92 / 5.0", change: "Figma Prototypes approved", icon: ShieldCheck, color: "text-[#F7C200]" },
        ];
      case "SALES":
        return [
          { title: "Lead Pipeline Value", value: "$642,000", change: "+18.2% MoM", icon: DollarSign, color: "text-[#519DD9]" },
          { title: "Conversion Rate", value: "14.2%", change: "+1.8% average", icon: Percent, color: "text-[#53BAC1]" },
          { title: "Qualified Hot Leads", value: "18 Leads", change: "Win probability > 85%", icon: Bot, color: "text-[#0F766E]" },
          { title: "Proposals Sent (30d)", value: "8 Sent", change: "SLA Response: < 24h", icon: FileCheck, color: "text-[#F7C200]" },
        ];
      case "HR":
        return [
          { title: "Staff Headcount", value: "14 Staff", change: "+2 hiring", icon: Users2, color: "text-[#519DD9]" },
          { title: "Active Deployments", value: "12 Assembled", change: "86% team allocation", icon: Briefcase, color: "text-[#53BAC1]" },
          { title: "Hiring Pipeline", value: "42 Candidates", change: "Next interviews: 3 today", icon: Users, color: "text-[#0F766E]" },
          { title: "Developer Retention", value: "98.2%", change: "Industry high", icon: ShieldCheck, color: "text-[#F7C200]" },
        ];
      case "FINANCE":
        return [
          { title: "Total MRR", value: "$148,500", change: "+24.5%", icon: DollarSign, color: "text-[#519DD9]" },
          { title: "Outstanding Invoices", value: "3 Pending", change: "SLA Due in 7 days", icon: Clock, color: "text-[#53BAC1]" },
          { title: "Invoiced Volume", value: "$182,000", change: "98% collection rate", icon: FileCheck, color: "text-[#0F766E]" },
          { title: "Stripe Payouts (Est.)", value: "$45,200", change: "Next payout: Tomorrow", icon: DollarSign, color: "text-[#F7C200]" },
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
            <GlassCard key={idx} className="p-6 border-[#E5E2DB] bg-[#FFFFFF] space-y-3 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#71757E] uppercase tracking-wider font-mono font-medium">{s.title}</span>
                <div className={`p-2 rounded-lg bg-[#F5F3EF] border border-[#E5E2DB] ${s.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="text-2xl font-bold text-[#111215] font-display">{s.value}</div>
              <div className="text-[10px] font-mono text-[#0F766E] flex items-center gap-1 font-bold">
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
          <GlassCard className="p-6 border-[#E5E2DB] bg-[#FFFFFF] space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-[#111215] flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[#519DD9]" /> Active Scope & Checklist
            </h3>
            <p className="text-[11px] text-[#565961] font-sans">Your assigned job responsibilities & operational clearance parameters:</p>
            <div className="space-y-2.5 font-mono text-[11px] text-[#4A4D54]">
              {ROLE_RESPONSIBILITIES[activeRole].map((resp, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-[#519DD9] font-bold mt-0.5">•</span>
                  <span>{resp}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Active 30-Day Sprint Health */}
          <GlassCard className="p-6 border-[#E5E2DB] bg-[#FFFFFF] space-y-4 shadow-xs">
            <h3 className="text-base font-bold text-[#111215] flex items-center gap-2">
              <Kanban className="w-5 h-5 text-[#519DD9]" /> Active 30-Day Sprint Health
            </h3>

            <div className="space-y-4">
              <div className="p-3.5 bg-[#F5F3EF] border border-[#E5E2DB] space-y-2 rounded-xl">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#111215]">ApexPay FinTech Portal</span>
                  <span className="text-[#519DD9] font-mono font-bold">Day 18 (60%)</span>
                </div>
                <div className="w-full h-2 bg-[#E5E2DB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#519DD9] rounded-full w-[60%]" />
                </div>
              </div>

              <div className="p-3.5 bg-[#F5F3EF] border border-[#E5E2DB] space-y-2 rounded-xl">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#111215]">PulseHealth MedTech Clinic</span>
                  <span className="text-[#53BAC1] font-mono font-bold">Day 24 (80%)</span>
                </div>
                <div className="w-full h-2 bg-[#E5E2DB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#53BAC1] rounded-full w-[80%]" />
                </div>
              </div>

              <div className="p-3.5 bg-[#F5F3EF] border border-[#E5E2DB] space-y-2 rounded-xl">
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#111215]">Global Freight Logistics ERP</span>
                  <span className="text-[#F7C200] font-mono font-bold">Day 6 (20%)</span>
                </div>
                <div className="w-full h-2 bg-[#E5E2DB] rounded-full overflow-hidden">
                  <div className="h-full bg-[#F7C200] rounded-full w-[20%]" />
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
          <GlassCard className="p-6 space-y-4 border-[#E5E2DB] bg-[#FFFFFF] shadow-xs">
            <div>
              <h3 className="text-base font-bold text-[#111215] flex items-center gap-2">
                <Lock className="w-5 h-5 text-[#519DD9]" /> Security Credentials & Password Manager
              </h3>
              <p className="text-[11px] text-[#565961] mt-1">Review active role clearance keys and reset credentials. Changes persist instantly.</p>
            </div>

            <div className="space-y-3 pt-2">
              {rolesList.map((r) => {
                const isEditing = editingRole === r;
                const isVisible = visiblePasswords[r];
                const pwd = rolePasswords[r] || "";
                return (
                  <div key={r} className="p-3.5 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-3">
                      <img src={STAFF_DETAILS[r].avatar} alt={STAFF_DETAILS[r].name} className="w-8 h-8 rounded-full border border-[#E5E2DB] object-cover" />
                      <div>
                        <div className="font-bold text-[#111215] font-mono">{r} Clearance</div>
                        <div className="text-[10px] text-[#71757E]">{STAFF_DETAILS[r].name}</div>
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
                            className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-[#111215] font-mono text-[10px] rounded-lg focus:outline-none focus:border-[#519DD9]"
                          />
                          <button
                            onClick={() => handleSavePassword(r)}
                            className="px-2.5 py-1.5 bg-[#111215] hover:bg-[#519DD9] hover:text-[#111215] text-white font-bold rounded-lg text-[10px] transition"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => {
                              setEditingRole(null);
                              setNewPasswordVal("");
                            }}
                            className="px-2.5 py-1.5 bg-[#FFFFFF] hover:bg-[#F5F3EF] border border-[#E5E2DB] text-[#565961] font-bold rounded-lg text-[10px] transition"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <>
                          <span className="font-mono text-[11px] text-[#111215] px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] rounded">
                            {isVisible ? pwd : "••••••••"}
                          </span>
                          <button
                            onClick={() => togglePasswordVisible(r)}
                            className="px-2.5 py-1 bg-[#FFFFFF] hover:bg-[#F5F3EF] border border-[#E5E2DB] rounded text-[#565961] hover:text-[#111215] font-bold font-sans text-[10px] transition"
                          >
                            {isVisible ? "Hide" : "Reveal"}
                          </button>
                          <button
                            onClick={() => {
                              setEditingRole(r);
                              setNewPasswordVal(pwd);
                            }}
                            className="px-2.5 py-1.5 bg-[#519DD9]/10 border border-[#519DD9]/30 hover:bg-[#519DD9]/20 text-[#0284C7] rounded-lg text-[10px] font-bold transition"
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
          <GlassCard className="p-6 space-y-4 border-[#E5E2DB] bg-[#FFFFFF] shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-[#111215] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#519DD9]" /> Security & Audit Logs (Real-time)
              </h3>
              <span className="text-[10px] bg-[#53BAC1]/10 border border-[#53BAC1]/30 text-[#0F766E] font-mono px-2 py-0.5 rounded font-bold">
                IP CLEARANCE SECURE
              </span>
            </div>

            <div className="space-y-2.5 font-mono text-[10px]">
              <div className="p-2.5 bg-[#F5F3EF] rounded-lg border border-[#E5E2DB] flex justify-between text-[#4A4D54]">
                <span>[05:42:01] USER ADMIN logged in from 192.168.1.42</span>
                <span className="text-[#0F766E] font-bold">SUCCESS</span>
              </div>
              <div className="p-2.5 bg-[#F5F3EF] rounded-lg border border-[#E5E2DB] flex justify-between text-[#4A4D54]">
                <span>[05:30:15] Vercel staging deployment webhook triggered</span>
                <span className="text-[#519DD9] font-bold">PENDING</span>
              </div>
              <div className="p-2.5 bg-[#F5F3EF] rounded-lg border border-[#E5E2DB] flex justify-between text-[#4A4D54]">
                <span>[04:15:32] SQLite database automatic backup executed</span>
                <span className="text-[#0F766E] font-bold">COMPLETED</span>
              </div>
              <div className="p-2.5 bg-[#F5F3EF] rounded-lg border border-[#E5E2DB] flex justify-between text-[#4A4D54]">
                <span>[02:00:10] API keys rotated automatically</span>
                <span className="text-[#0F766E] font-bold">COMPLETED</span>
              </div>
            </div>
          </GlassCard>
        </div>
      );

    case "MANAGER":
      return (
        <GlassCard className="p-6 space-y-4 border-[#E5E2DB] bg-[#FFFFFF] shadow-xs h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111215] flex items-center gap-2">
              <Clock className="w-5 h-5 text-[#519DD9]" /> Milestone SLA Tracking
            </h3>
            <span className="text-[10px] bg-[#53BAC1]/10 border border-[#53BAC1]/30 text-[#0F766E] font-mono px-2 py-0.5 rounded font-bold">
              SLA OK
            </span>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-[#71757E]">
                <span className="text-[#111215] font-semibold">ApexPay: Scope Lock</span>
                <span className="text-[#0F766E] font-bold">Day 7 Milestone Completed</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E2DB] rounded-full"><div className="h-full bg-[#53BAC1] w-full rounded-full" /></div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-[#71757E]">
                <span className="text-[#111215] font-semibold">ApexPay: Frontend & Auth</span>
                <span className="text-[#0F766E] font-bold">Day 15 Milestone Completed</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E2DB] rounded-full"><div className="h-full bg-[#53BAC1] w-full rounded-full" /></div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-[11px] font-mono text-[#71757E]">
                <span className="text-[#111215] font-semibold">ApexPay: APIs & Stripe integration</span>
                <span className="text-[#519DD9] font-bold">Day 23 In Progress (Due in 5 days)</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E2DB] rounded-full"><div className="h-full bg-[#519DD9] w-[50%] rounded-full" /></div>
            </div>
          </div>
        </GlassCard>
      );

    case "DEVELOPER":
      return (
        <GlassCard className="p-6 space-y-4 border-[#E5E2DB] bg-[#FFFFFF] shadow-xs h-full font-mono text-xs">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-sans">
              <Terminal className="w-5 h-5 text-[#519DD9]" /> Systems Command Console
            </h3>
            <span className="text-[10px] bg-[#53BAC1]/10 border border-[#53BAC1]/30 text-[#0F766E] px-2 py-0.5 rounded font-bold">
              VERCEL OK
            </span>
          </div>

          <div className="space-y-3.5 bg-[#F5F3EF] p-4 border border-[#E5E2DB] rounded-xl">
            <div className="space-y-1 text-[#4A4D54]">
              <div className="text-[#71757E] font-bold">// Database Health Check</div>
              <div className="flex justify-between">
                <span>SQLite connection:</span>
                <span className="text-[#0F766E] font-bold">CONNECTED</span>
              </div>
              <div className="flex justify-between">
                <span>Prisma client status:</span>
                <span className="text-[#0F766E] font-bold">INITIALIZED</span>
              </div>
            </div>

            <div className="space-y-1 text-[#4A4D54] border-t border-[#E5E2DB] pt-2.5">
              <div className="text-[#71757E] font-bold">// Development Links</div>
              <div className="flex justify-between items-center text-[10px]">
                <span>Staging Deployment:</span>
                <span className="text-[#519DD9] font-bold">staging.varunyatech.com</span>
              </div>
              <div className="flex justify-between items-center text-[10px]">
                <span>GitHub Repositories:</span>
                <span className="text-[#111215] font-bold">github.com/varunyatech/core</span>
              </div>
            </div>
          </div>
        </GlassCard>
      );

    case "DESIGNER":
      return (
        <GlassCard className="p-6 space-y-4 border-[#E5E2DB] bg-[#FFFFFF] shadow-xs h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111215] flex items-center gap-2">
              <Palette className="w-5 h-5 text-[#519DD9]" /> Design Tokens Sandbox
            </h3>
            <span className="text-[10px] bg-[#53BAC1]/10 border border-[#53BAC1]/30 text-[#0F766E] font-mono px-2 py-0.5 rounded font-bold">
              FIGMA SYNCED
            </span>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-2.5 text-[10px] font-mono">
              <div className="p-2.5 bg-[#F5F3EF] rounded-lg border border-[#E5E2DB] text-center">
                <div className="w-full h-8 bg-[#DB0038] rounded mb-1.5 shadow-xs" />
                <span className="text-[#111215] block font-bold text-[9px]">Crimson Accent</span>
              </div>
              <div className="p-2.5 bg-[#F5F3EF] rounded-lg border border-[#E5E2DB] text-center">
                <div className="w-full h-8 bg-[#519DD9] rounded mb-1.5 shadow-xs" />
                <span className="text-[#111215] block font-bold text-[9px]">Digital Blue</span>
              </div>
              <div className="p-2.5 bg-[#F5F3EF] rounded-lg border border-[#E5E2DB] text-center">
                <div className="w-full h-8 bg-[#53BAC1] rounded mb-1.5 shadow-xs" />
                <span className="text-[#111215] block font-bold text-[9px]">Aqua Teal</span>
              </div>
            </div>
          </div>
        </GlassCard>
      );

    case "SALES":
      const [quoteSliderVal, setQuoteSliderVal] = useState(14500);
      return (
        <GlassCard className="p-6 space-y-4 border-[#E5E2DB] bg-[#FFFFFF] shadow-xs h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111215] flex items-center gap-2">
              <Users className="w-5 h-5 text-[#519DD9]" /> Inbound Lead Pipeline
            </h3>
            <span className="text-[10px] bg-[#53BAC1]/10 border border-[#53BAC1]/30 text-[#0F766E] font-mono px-2 py-0.5 rounded font-bold">
              18 HOT LEADS
            </span>
          </div>

          <div className="space-y-3">
            <div className="p-4 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl space-y-3 mt-4">
              <div className="text-[10px] font-mono text-[#71757E] font-bold uppercase tracking-wider">Fast Proposal Estimator</div>
              <div className="space-y-1.5">
                <label className="text-[10px] text-[#565961] flex justify-between font-mono">
                  <span>Target SLA Budget:</span>
                  <span className="text-[#519DD9] font-bold">${quoteSliderVal.toLocaleString()}</span>
                </label>
                <input 
                  type="range" 
                  min="10000" 
                  max="50000" 
                  step="500" 
                  value={quoteSliderVal}
                  onChange={(e) => setQuoteSliderVal(Number(e.target.value))}
                  className="w-full accent-[#519DD9] bg-[#E5E2DB] h-1.5 rounded-lg cursor-pointer" 
                />
              </div>
              <div className="flex justify-between items-center text-[10px] font-mono text-[#565961] pt-1">
                <span>Est Delivery: <strong className="text-[#111215]">30 Days</strong></span>
                <span>Margin Allocation: <strong className="text-[#111215]">{Math.round((quoteSliderVal - 6000) / quoteSliderVal * 100)}%</strong></span>
              </div>
            </div>
          </div>
        </GlassCard>
      );

    case "HR":
      return (
        <GlassCard className="p-6 space-y-4 border-[#E5E2DB] bg-[#FFFFFF] shadow-xs h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111215] flex items-center gap-2">
              <Users2 className="w-5 h-5 text-[#519DD9]" /> Team Allocation Board
            </h3>
            <span className="text-[10px] bg-[#53BAC1]/10 border border-[#53BAC1]/30 text-[#0F766E] font-mono px-2 py-0.5 rounded font-bold">
              ALLOCATION: 86%
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-[#111215]">Alex Rivera (Chief Architect)</div>
                <div className="text-[10px] text-[#71757E]">Assigned: ApexPay FinTech Portal</div>
              </div>
              <span className="px-2 py-0.5 bg-[#53BAC1]/15 text-[#0F766E] font-mono text-[9px] font-bold rounded">
                100% CAP
              </span>
            </div>

            <div className="p-3 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl flex justify-between items-center">
              <div>
                <div className="font-bold text-[#111215]">Elena Rostova (Designer)</div>
                <div className="text-[10px] text-[#71757E]">Assigned: PulseHealth, ApexPay</div>
              </div>
              <span className="px-2 py-0.5 bg-[#53BAC1]/15 text-[#0F766E] font-mono text-[9px] font-bold rounded">
                90% CAP
              </span>
            </div>
          </div>
        </GlassCard>
      );

    case "FINANCE":
      return (
        <GlassCard className="p-6 space-y-4 border-[#E5E2DB] bg-[#FFFFFF] shadow-xs h-full">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-[#111215] flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#519DD9]" /> Stripe Transaction Streams
            </h3>
            <span className="text-[10px] bg-[#53BAC1]/10 border border-[#53BAC1]/30 text-[#0F766E] font-mono px-2 py-0.5 rounded font-bold">
              STRIPE CLEAR
            </span>
          </div>

          <div className="space-y-3 font-mono text-[10px]">
            <div className="p-3 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[#71757E]">Invoice: #INV-2026-081</span>
                <div className="text-[#111215] font-bold text-xs mt-0.5">$14,500 (ApexPay Mil. 2)</div>
              </div>
              <span className="px-2.5 py-0.5 bg-[#53BAC1]/15 text-[#0F766E] border border-[#53BAC1]/30 rounded text-[9px] font-bold">
                PAID VIA STRIPE
              </span>
            </div>

            <div className="p-3 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl flex items-center justify-between">
              <div>
                <span className="text-[#71757E]">Invoice: #INV-2026-082</span>
                <div className="text-[#111215] font-bold text-xs mt-0.5">$9,250 (PulseHealth Mil. 3)</div>
              </div>
              <span className="px-2.5 py-0.5 bg-[#53BAC1]/15 text-[#0F766E] border border-[#53BAC1]/30 rounded text-[9px] font-bold">
                PAID VIA STRIPE
              </span>
            </div>
          </div>
        </GlassCard>
      );
  }
}
