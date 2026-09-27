"use client";

import React from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  CheckCircle2, 
  Clock, 
  Download, 
  ExternalLink, 
  CreditCard, 
  LifeBuoy, 
  Calendar,
  FileCode,
  ArrowRight
} from "lucide-react";

export default function ClientDashboardPage() {
  const milestones = [
    { day: "Day 1-5", title: "Scope & Figma Specs", status: "COMPLETED" },
    { day: "Day 6-12", title: "Next.js UI & Auth Engine", status: "COMPLETED" },
    { day: "Day 13-20", title: "NestJS APIs & Stripe Integrations", status: "IN_PROGRESS" },
    { day: "Day 21-27", title: "Load Testing & QA Audit", status: "UPCOMING" },
    { day: "Day 28-30", title: "Production Deploy to Vercel", status: "UPCOMING" },
  ];

  const deliverables = [
    { title: "Figma UI Kit & Design Tokens", type: "Design", size: "Figma Link", date: "Day 5" },
    { title: "Prisma Database Schema (.prisma)", type: "Database", size: "14 KB", date: "Day 7" },
    { title: "Staging Preview Server", type: "Deployment", size: "https://apexpay-staging.vercel.app", date: "Day 14" },
  ];

  return (
    <div className="space-y-8">
      {/* 30-Day Progress Header Card */}
      <GlassCard className="p-6 sm:p-8 border-cyan-500/40 bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <span className="px-2.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-400">
              CURRENT SPRINT: DAY 18 OF 30
            </span>
            <h2 className="text-2xl font-bold text-white mt-2">ApexPay Enterprise FinTech Platform</h2>
            <p className="text-xs text-slate-400">Target Production Launch: August 16, 2026 (Guaranteed 30-Day SLA)</p>
          </div>
          <a href="https://apexpay-staging.vercel.app" target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
              Open Staging Environment
            </Button>
          </a>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-400">Sprint Completion</span>
            <span className="text-cyan-400 font-bold">60% Complete</span>
          </div>
          <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
            <div className="h-full bg-gradient-to-r from-purple-600 via-cyan-500 to-blue-500 rounded-full w-[60%] transition-all duration-500" />
          </div>
        </div>
      </GlassCard>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Milestones Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-cyan-400" /> 30-Day Sprint Milestones
            </h3>
            <div className="space-y-3">
              {milestones.map((m, idx) => (
                <div key={idx} className="p-3.5 bg-slate-800/60 rounded-xl border border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${m.status === "COMPLETED" ? "bg-emerald-400" : m.status === "IN_PROGRESS" ? "bg-cyan-400 animate-ping" : "bg-slate-600"}`} />
                    <div>
                      <div className="text-xs font-bold text-white">{m.title}</div>
                      <div className="text-[10px] font-mono text-slate-400">{m.day}</div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                    m.status === "COMPLETED" ? "bg-emerald-500/20 text-emerald-300" : m.status === "IN_PROGRESS" ? "bg-cyan-500/20 text-cyan-300" : "bg-slate-800 text-slate-500"
                  }`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right: Deliverables & Billing */}
        <div className="lg:col-span-5 space-y-6">
          {/* Deliverables */}
          <GlassCard className="p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <FileCode className="w-5 h-5 text-purple-400" /> Project Deliverables
            </h3>
            <div className="space-y-2.5">
              {deliverables.map((deliv, idx) => (
                <div key={idx} className="p-3 bg-slate-800/40 rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-white">{deliv.title}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{deliv.date} • {deliv.size}</div>
                  </div>
                  <Button size="sm" variant="ghost" icon={<Download className="w-3.5 h-3.5" />}>
                    Get
                  </Button>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Quick Invoice Card */}
          <GlassCard className="p-6 border-cyan-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Milestone 2 Invoice</h3>
              <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-300 text-[10px] font-mono rounded">PENDING</span>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">$4,750.00</div>
              <div className="text-[10px] text-slate-400">Due August 10, 2026 (Stripe Payment Gateway)</div>
            </div>
            <Link href="/portal/invoices">
              <Button variant="primary" size="sm" className="w-full" icon={<CreditCard className="w-4 h-4" />}>
                Pay Invoice Online
              </Button>
            </Link>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
