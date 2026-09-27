"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { LifeBuoy, CheckCircle2, MessageSquare, Plus } from "lucide-react";

export default function ClientSupportPage() {
  const [created, setCreated] = useState(false);
  const [subject, setSubject] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setCreated(true);
    setSubject("");
  };

  return (
    <div className="space-y-8 max-w-4xl">
      <div>
        <h2 className="text-2xl font-bold text-white font-display">Client SLA Support Center</h2>
        <p className="text-xs text-slate-400">Guaranteed 15-minute response SLA for P1 critical issues during 30-day sprints.</p>
      </div>

      <GlassCard className="p-6 border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white">Create New Support Ticket</h3>
        {created ? (
          <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 rounded-xl text-xs text-cyan-300 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400" />
            Support Ticket #TK-8902 Created! Our engineering team has been notified.
          </div>
        ) : (
          <form onSubmit={handleCreate} className="space-y-3">
            <div>
              <label className="block text-xs text-slate-400 mb-1">Subject / Question</label>
              <input required type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Requesting API key change for Stripe sandbox..." className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white" />
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1">Priority SLA</label>
              <select className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white">
                <option>Medium (Standard 2-Hour Response)</option>
                <option>High (1-Hour SLA)</option>
                <option>P1 Critical (15-Minute Emergency SLA)</option>
              </select>
            </div>
            <Button type="submit" variant="primary" size="sm" icon={<Plus className="w-4 h-4" />}>
              Submit Support Ticket
            </Button>
          </form>
        )}
      </GlassCard>
    </div>
  );
}
