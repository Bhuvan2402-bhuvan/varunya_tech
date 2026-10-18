"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Users, Plus, ChevronRight, RefreshCw, CheckCircle2 } from "lucide-react";
import { useAdminSession } from "@/app/admin/AdminSessionContext";

interface LeadItem {
  id: string;
  name: string;
  email: string;
  budget: string;
  service: string;
  stage: string;
  score: number;
  phone?: string | null;
  projectScope?: string;
  isDb?: boolean;
}

export default function AdminLeadsPage() {
  const { activeRole } = useAdminSession();
  const [loading, setLoading] = useState(false);
  const [dbConnected, setDbConnected] = useState(false);
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

  // Map database status string ("NEW", "CONTACTED", etc.) to UI stage
  const normalizeStatusToStage = (status: string): string => {
    const upper = status.toUpperCase();
    if (upper === "NEW") return "NEW LEAD";
    if (salesWorkflow.includes(upper)) return upper;
    return "NEW LEAD";
  };

  const normalizeStageToDbStatus = (stage: string): string => {
    if (stage === "NEW LEAD") return "NEW";
    return stage;
  };

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("velocity_panel_token") || `token_${activeRole || "ADMIN"}`;
      const res = await fetch("/api/v1/leads", {
        headers: {
          "X-Staff-Token": token,
        },
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.leads)) {
          setDbConnected(true);
          const dbLeads: LeadItem[] = data.leads.map((l: any) => ({
            id: l.id,
            name: l.fullName ? `${l.fullName} (${l.company || "Direct"})` : (l.company || "Direct Client"),
            email: l.email,
            budget: l.budgetRange || "Standard Tier",
            service: l.serviceNeeded || "Custom Architecture",
            stage: normalizeStatusToStage(l.status),
            score: l.aiLeadScore || 85,
            phone: l.phone,
            projectScope: l.projectScope,
            isDb: true,
          }));

          setLeads(prev => {
            const dbIds = new Set(dbLeads.map(d => d.id));
            const nonDbSeeds = prev.filter(p => !p.isDb && !dbIds.has(p.id));
            return [...dbLeads, ...nonDbSeeds];
          });
        }
      }
    } catch (err) {
      console.error("Failed to load leads from database:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [activeRole]);

  const moveLead = async (id: string) => {
    const lead = leads.find(l => l.id === id);
    if (!lead) return;

    const currentIdx = salesWorkflow.indexOf(lead.stage);
    const nextStage = salesWorkflow[(currentIdx + 1) % salesWorkflow.length];

    // Optimistically update UI
    setLeads(prev => prev.map(l => (l.id === id ? { ...l, stage: nextStage } : l)));

    // If it's a database-backed lead, persist to server
    if (lead.isDb) {
      try {
        const token = localStorage.getItem("velocity_panel_token") || `token_${activeRole || "ADMIN"}`;
        await fetch("/api/v1/leads", {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "X-Staff-Token": token,
          },
          body: JSON.stringify({
            id,
            status: normalizeStageToDbStatus(nextStage),
          }),
        });
      } catch (err) {
        console.error("Failed to persist lead status mutation:", err);
      }
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-[#53BAC1]";
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
          <p className="text-xs text-[#565961]">
            Track inbound discovery enquiries, review project specifications, and manage client proposal milestones.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] font-mono text-[10px] text-[#565961] rounded-lg">
            <CheckCircle2 className={`w-3.5 h-3.5 ${dbConnected ? "text-[#53BAC1]" : "text-[#71757E]"}`} />
            <span>DB PERSISTENCE: {dbConnected ? "ACTIVE" : "STANDBY"}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchLeads} 
            loading={loading}
            icon={<RefreshCw className="w-3.5 h-3.5" />}
          >
            Refresh Pipeline
          </Button>
          <Button variant="gradient" size="sm" icon={<Plus className="w-4 h-4" />}>
            Add Consultation Lead
          </Button>
        </div>
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
                      <div className="flex items-center justify-between">
                        <div className="font-bold text-[#111215] text-sm leading-snug">{lead.name}</div>
                        {lead.isDb && (
                          <span className="font-mono text-[8px] px-1.5 py-0.2 bg-[#519DD9]/10 text-[#519DD9] border border-[#519DD9]/20 font-bold rounded">
                            DB PERSISTED
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-[#71757E] font-mono">{lead.service} • {lead.budget}</div>
                      <div className="text-[10px] text-[#565961]">{lead.email}</div>
                      {lead.projectScope && (
                        <p className="text-[10px] text-[#71757E] line-clamp-2 italic pt-1 border-t border-[#E5E2DB]">
                          &quot;{lead.projectScope}&quot;
                        </p>
                      )}
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
