"use client";

import React from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Clock, CheckCircle2, Code2, ShieldCheck, Terminal, ExternalLink } from "lucide-react";

export default function ClientProjectsPage() {
  const sprintDays = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    status: i < 18 ? "COMPLETED" : i === 18 ? "IN_PROGRESS" : "UPCOMING",
    task: i < 7 ? "Architecture & Schema Lock" : i < 15 ? "Frontend UI & Auth Module" : i < 23 ? "NestJS API & Stripe Gateway" : "QA Audit & Deployment"
  }));

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white font-display">30-Day Sprint Tracker</h2>
        <p className="text-xs text-slate-400">Detailed day-by-day execution tracking for ApexPay Enterprise FinTech Platform.</p>
      </div>

      <GlassCard className="p-6">
        <h3 className="text-base font-bold text-white mb-4">30-Day Sprint Calendar Grid</h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {sprintDays.map((d) => (
            <div
              key={d.day}
              className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-all ${
                d.status === "COMPLETED"
                  ? "bg-cyan-500/20 border-cyan-500/40 text-cyan-300"
                  : d.status === "IN_PROGRESS"
                  ? "bg-purple-500/30 border-purple-500 text-white animate-pulse"
                  : "bg-slate-900 border-slate-800 text-slate-600"
              }`}
            >
              <div className="font-bold">D{d.day}</div>
              <div className="text-[9px] mt-0.5 opacity-80">{d.status === "COMPLETED" ? "✓ Done" : d.status === "IN_PROGRESS" ? "Active" : "Pending"}</div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
