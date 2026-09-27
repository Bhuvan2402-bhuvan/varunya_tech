"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { CreditCard, Download, CheckCircle2, ShieldCheck } from "lucide-react";

export default function ClientInvoicesPage() {
  const [paid, setPaid] = useState(false);

  const invoices = [
    { id: "INV-2026-001", description: "Deposit & Sprint Kickoff (Milestone 1)", amount: "$4,750.00", status: "PAID", date: "July 17, 2026" },
    { id: "INV-2026-002", description: "Mid-Sprint Core APIs & UI (Milestone 2)", amount: "$4,750.00", status: paid ? "PAID" : "PENDING", date: "August 4, 2026" },
    { id: "INV-2026-003", description: "Final Production Launch & IP Transfer (Milestone 3)", amount: "$5,000.00", status: "UPCOMING", date: "August 16, 2026" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white font-display">Invoices &amp; Billing</h2>
        <p className="text-xs text-slate-400">View payment history, download itemized PDF invoices, or make online credit card/Stripe payments.</p>
      </div>

      <div className="space-y-4">
        {invoices.map((inv) => (
          <GlassCard key={inv.id} className="p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 mb-1">
                <span>{inv.id}</span> • <span>{inv.date}</span>
              </div>
              <h3 className="text-base font-bold text-white">{inv.description}</h3>
              <div className="text-sm font-mono text-slate-300 font-bold mt-1">{inv.amount}</div>
            </div>

            <div className="flex items-center gap-3">
              <span className={`px-3 py-1 rounded text-xs font-mono font-bold ${
                inv.status === "PAID" ? "bg-emerald-500/20 text-emerald-300" : inv.status === "PENDING" ? "bg-yellow-500/20 text-yellow-300" : "bg-slate-800 text-slate-500"
              }`}>
                {inv.status}
              </span>

              {inv.status === "PENDING" && (
                <Button size="sm" variant="gradient" onClick={() => setPaid(true)} icon={<CreditCard className="w-4 h-4" />}>
                  Pay Now (Stripe)
                </Button>
              )}

              <Button size="sm" variant="secondary" icon={<Download className="w-4 h-4" />}>
                PDF
              </Button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
