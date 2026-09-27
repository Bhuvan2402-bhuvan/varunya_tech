"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Users, Filter, Plus, ChevronRight, TrendingUp } from "lucide-react";

interface LeadItem {
  id: string;
  name: string;
  email: string;
  budget: string;
  service: string;
  stage: string;
  score: number;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<LeadItem[]>([
    { id: "L1", name: "Acme FinTech Corp", email: "sarah@acme.com", budget: "$18,500", service: "Custom Software", stage: "PROPOSAL", score: 94 },
    { id: "L2", name: "PulseHealth MedTech", email: "david@pulsehealth.com", budget: "$14,500", service: "AI Solution", stage: "QUALIFIED", score: 91 },
    { id: "L3", name: "Global Freight Systems", email: "tom@freight.io", budget: "$22,000", service: "ERP Portal", stage: "NEW LEAD", score: 88 },
    { id: "L4", name: "Alpha Finance Portal", email: "dean@alpha.com", budget: "$35,000", service: "FinTech Platform", stage: "NEGOTIATION", score: 95 },
    { id: "L5", name: "ApexPay Inc", email: "ceo@apexpay.com", budget: "$30,000", service: "Custom SaaS", stage: "WON", score: 98 },
  ]);

  const salesWorkflow = [
    "NEW LEAD",
    "CONTACTED",
    "QUALIFIED",
    "PROPOSAL",
    "NEGOTIATION",
    "WON",
    "LOST"
  ];

  const moveLead = (id: string) => {
    setLeads(prev => prev.map(l => {
      if (l.id === id) {
        const currentIdx = salesWorkflow.indexOf(l.stage);
        const nextStage = salesWorkflow[(currentIdx + 1) % salesWorkflow.length];
        return { ...l, stage: nextStage };
      }
      return l;
    }));
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-emerald-400";
    if (score >= 80) return "text-cyan-400";
    return "text-slate-405";
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-display uppercase tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-cyan-400" /> CRM 1-on-1 Consultation Pipeline
          </h2>
          <p className="text-xs text-slate-400">Track inbound 1-on-1 discovery calls, review client project requirements, and manage proposal milestones.</p>
        </div>
        <Button variant="gradient" size="sm" icon={<Plus className="w-4 h-4" />}>
          Add Consultation Lead
        </Button>
      </div>

      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1300px]">
          {salesWorkflow.map((stage) => {
            const stageLeads = leads.filter((l) => l.stage === stage);
            return (
              <GlassCard key={stage} className="flex-1 p-4 border-slate-800 bg-slate-900/40 space-y-3 min-w-[180px] shrink-0">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300 pb-2 border-b border-slate-800">
                  <span>{stage}</span>
                  <span className="px-2 py-0.5 bg-slate-800 text-[10px] text-slate-400 rounded-md">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {stageLeads.map((lead) => (
                    <div key={lead.id} className="p-3.5 bg-slate-855 rounded-xl border border-slate-700/60 space-y-2 text-xs">
                      <div className="font-bold text-white text-sm leading-snug">{lead.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{lead.service} • {lead.budget}</div>
                      <div className="flex justify-between items-center pt-2 border-t border-slate-700/60 text-[10px]">
                        <span className={`font-mono font-bold ${getScoreColor(lead.score)}`}>Lead Priority: {lead.score}%</span>
                        
                        {stage !== "WON" && stage !== "LOST" && (
                          <button 
                            onClick={() => moveLead(lead.id)}
                            className="text-[10px] text-cyan-400 hover:text-cyan-300 font-bold flex items-center gap-0.5 hover:underline transition"
                          >
                            Advance <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="text-center py-8 text-[9px] text-slate-605 font-mono border border-dashed border-slate-850 rounded-xl">
                      No leads in stage
                    </div>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
