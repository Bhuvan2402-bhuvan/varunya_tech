"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { 
  Clock, 
  Download, 
  ExternalLink, 
  CreditCard, 
  FileCode
} from "lucide-react";

export default function ClientDashboardPage() {
  const milestones = [
    { day: "Day 1-5", title: "Domain Model & Architectural Specs", status: "COMPLETED" },
    { day: "Day 6-12", title: "Next.js UI Engine & Auth Tier", status: "COMPLETED" },
    { day: "Day 13-20", title: "Core APIs & Stripe Transactional Layer", status: "IN_PROGRESS" },
    { day: "Day 21-27", title: "Load Testing & Security Audit", status: "UPCOMING" },
    { day: "Day 28-30", title: "Production Deployment & Handoff", status: "UPCOMING" },
  ];

  const deliverables = [
    { title: "Design System Kit & Tokens", type: "Design", size: "Figma Link", date: "Day 5" },
    { title: "Relational Database Schema (.prisma)", type: "Database", size: "14 KB", date: "Day 7" },
    { title: "Staging Preview Server", type: "Deployment", size: "https://apexpay-staging.vercel.app", date: "Day 14" },
  ];

  return (
    <div className="space-y-8 font-sans text-[#111215]">
      {/* 30-Day Progress Header Card */}
      <div className="p-8 border border-[#E5E2DB] bg-[#FFFFFF] rounded-2xl shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9] rounded-full text-[10px] font-mono uppercase tracking-widest font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]" />
              SPRINT STATUS // DAY 18 OF 30
            </div>
            <h2 className="text-2xl font-bold text-[#111215] font-display mt-3">ApexPay Enterprise FinTech Platform</h2>
            <p className="text-xs text-[#4A4D54] font-light">Target Production Launch: August 16, 2026 (Disciplined Milestone SLA)</p>
          </div>
          <a href="https://apexpay-staging.vercel.app" target="_blank" rel="noreferrer">
            <Button variant="outline" size="sm" icon={<ExternalLink className="w-4 h-4" />}>
              Inspect Staging Environment
            </Button>
          </a>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-[#71757E]">Sprint Completion</span>
            <span className="text-[#111215] font-bold">60% Complete</span>
          </div>
          <div className="w-full h-2.5 bg-[#F5F3EF] overflow-hidden border border-[#E5E2DB] rounded-full">
            <div className="h-full bg-[#519DD9] w-[60%] rounded-full transition-all duration-500" />
          </div>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Milestones Timeline */}
        <div className="lg:col-span-7 space-y-6">
          <div className="p-8 border border-[#E5E2DB] bg-[#FFFFFF] rounded-2xl shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#111215] font-display flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#519DD9]" /> 
                <span>Sprint Deliverables Progression</span>
              </h3>
              <span className="font-mono text-[10px] text-[#71757E] uppercase tracking-widest font-bold">5 PHASES</span>
            </div>
            <div className="space-y-3">
              {milestones.map((m, idx) => (
                <div key={idx} className="p-4 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${m.status === "COMPLETED" ? "bg-[#519DD9]" : m.status === "IN_PROGRESS" ? "bg-[#111215] animate-pulse" : "bg-[#DDD9D0]"}`} />
                    <div>
                      <div className="text-xs font-semibold text-[#111215]">{m.title}</div>
                      <div className="text-[10px] font-mono text-[#71757E]">{m.day}</div>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 text-[9px] font-mono uppercase tracking-widest rounded-full ${
                    m.status === "COMPLETED" 
                      ? "bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9] font-bold" 
                      : m.status === "IN_PROGRESS" 
                      ? "bg-[#111215] text-[#FFFFFF] font-bold" 
                      : "text-[#71757E] bg-[#F5F3EF]"
                  }`}>
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Deliverables & Billing */}
        <div className="lg:col-span-5 space-y-6">
          {/* Deliverables */}
          <div className="p-8 border border-[#E5E2DB] bg-[#FFFFFF] rounded-2xl shadow-xs space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-[#111215] font-display flex items-center gap-2">
                <FileCode className="w-4 h-4 text-[#519DD9]" /> 
                <span>Artifact Handoffs</span>
              </h3>
              <span className="font-mono text-[10px] text-[#519DD9] uppercase tracking-widest font-bold">VERIFIED</span>
            </div>
            <div className="space-y-3">
              {deliverables.map((deliv, idx) => (
                <div key={idx} className="p-3.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-[#111215]">{deliv.title}</div>
                    <div className="text-[10px] text-[#71757E] font-mono">{deliv.date} • {deliv.size}</div>
                  </div>
                  <Button size="sm" variant="ghost" icon={<Download className="w-3.5 h-3.5 text-[#519DD9]" />}>
                    Get
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Invoice Card */}
          <div className="p-8 border border-[#E5E2DB] bg-[#FFFFFF] rounded-2xl shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] text-[#71757E] uppercase tracking-widest font-bold">Milestone 2 Invoice</span>
              <span className="px-2 py-0.5 bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9] text-[9px] font-mono font-bold rounded">PENDING DISPATCH</span>
            </div>
            <div>
              <div className="text-3xl font-extrabold text-[#111215] font-display">$4,750.00</div>
              <div className="text-[10px] text-[#71757E] font-mono mt-1">Due August 10, 2026 • Verified Escrow</div>
            </div>
            <div className="pt-2">
              <Link href="/portal/invoices">
                <Button variant="primary" size="sm" className="w-full" icon={<CreditCard className="w-4 h-4" />}>
                  Access Billing Ledger
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
