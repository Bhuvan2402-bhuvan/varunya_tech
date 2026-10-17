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

  React.useEffect(() => {
    try {
      const stored = localStorage.getItem("velocity_leads_data");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const dynamicLeads: LeadItem[] = parsed.map((item: any, i: number) => ({
            id: item.id || `L-DYN-${i}`,
            name: item.fullName ? `${item.fullName} (${item.company || "Direct"})` : (item.company || "Inbound Client"),
            email: item.email || "inquiry@client.com",
            budget: item.budgetRange || "$15,000 - $35,000",
            service: item.serviceNeeded || "Custom Architecture",
            stage: "NEW LEAD",
            score: Math.max(85, 96 - i)
          }));
          setLeads(prev => {
            const existingIds = new Set(prev.map(p => p.id));
            const newOnes = dynamicLeads.filter(d => !existingIds.has(d.id));
            return [...newOnes, ...prev];
          });
        }
      }
    } catch (e) {
      console.error("Failed to load dynamic leads", e);
    }
  }, []);

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
    if (score >= 90) return "text-[#0F766E]";
    if (score >= 80) return "text-[#519DD9]";
    return "text-[#71757E]";
  };

  return (
    <div className="space-y-8 font-sans pb-16">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#111215] font-display uppercase tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-[#519DD9]" /> CRM 1-on-1 Consultation Pipeline
          </h2>
          <p className="text-xs text-[#565961]">Track inbound 1-on-1 discovery calls, review client project requirements, and manage proposal milestones.</p>
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
              <div key={stage} className="flex-1 p-4 border border-[#E5E2DB] bg-[#F5F3EF] space-y-3 min-w-[200px] shrink-0 rounded-2xl shadow-xs">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-[#111215] pb-2 border-b border-[#E5E2DB]">
                  <span>{stage}</span>
                  <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E2DB] text-[10px] text-[#71757E] rounded-md font-bold">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {stageLeads.map((lead) => (
                    <div key={lead.id} className="p-3.5 bg-[#FFFFFF] rounded-xl border border-[#E5E2DB] space-y-2 text-xs shadow-xs hover:border-[#519DD9] transition">
                      <div className="font-bold text-[#111215] text-sm leading-snug">{lead.name}</div>
                      <div className="text-[10px] text-[#71757E] font-mono">{lead.service} • {lead.budget}</div>
                      <div className="flex justify-between items-center pt-2 border-t border-[#E5E2DB] text-[10px]">
                        <span className={`font-mono font-bold ${getScoreColor(lead.score)}`}>Lead Priority: {lead.score}%</span>
                        
                        {stage !== "WON" && stage !== "LOST" && (
                          <button 
                            onClick={() => moveLead(lead.id)}
                            className="text-[10px] text-[#519DD9] hover:text-[#111215] font-bold flex items-center gap-0.5 transition"
                          >
                            Advance <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="text-center py-8 text-[10px] text-[#71757E] font-mono border border-dashed border-[#E5E2DB] rounded-xl bg-[#FFFFFF]/60">
                      No leads in stage
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
