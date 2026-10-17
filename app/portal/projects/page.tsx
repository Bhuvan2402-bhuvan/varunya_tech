"use client";

import React from "react";

export default function ClientProjectsPage() {
  const sprintDays = Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    status: i < 18 ? "COMPLETED" : i === 18 ? "IN_PROGRESS" : "UPCOMING",
    task: i < 7 ? "Architecture & Schema Lock" : i < 15 ? "Frontend UI & Auth Module" : i < 23 ? "NestJS API & Stripe Gateway" : "QA Audit & Deployment"
  }));

  return (
    <div className="space-y-8 text-[#111215]">
      <div>
        <h2 className="text-2xl font-bold text-[#111215] font-display">30-Day Sprint Tracker</h2>
        <p className="text-xs text-[#4A4D54]">Detailed day-by-day execution tracking for ApexPay Enterprise FinTech Platform.</p>
      </div>

      <div className="p-6 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
        <h3 className="text-base font-bold text-[#111215] mb-4">30-Day Sprint Calendar Grid</h3>
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {sprintDays.map((d) => (
            <div
              key={d.day}
              className={`p-2.5 rounded-xl border text-center font-mono text-xs transition-all ${
                d.status === "COMPLETED"
                  ? "bg-[#F5F3EF] border-[#E5E2DB] text-[#519DD9] font-bold"
                  : d.status === "IN_PROGRESS"
                  ? "bg-[#111215] border-[#111215] text-[#FFFFFF] font-bold shadow-xs animate-pulse"
                  : "bg-[#FAFAF8] border-[#E5E2DB] text-[#8C8F98]"
              }`}
            >
              <div className="font-bold">D{d.day}</div>
              <div className="text-[9px] mt-0.5 opacity-80">{d.status === "COMPLETED" ? "✓ Done" : d.status === "IN_PROGRESS" ? "Active" : "Pending"}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
