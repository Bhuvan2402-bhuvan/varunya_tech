"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, Plus } from "lucide-react";

export default function ClientSupportPage() {
  const [created, setCreated] = useState(false);
  const [subject, setSubject] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    setCreated(true);
    setSubject("");
  };

  return (
    <div className="space-y-8 max-w-4xl text-[#111215]">
      <div>
        <h2 className="text-2xl font-bold text-[#111215] font-display">Client SLA Support Center</h2>
        <p className="text-xs text-[#4A4D54]">Guaranteed 15-minute response SLA for P1 critical issues during 30-day sprints.</p>
      </div>

      <div className="p-6 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#111215]">Create New Support Ticket</h3>
        {created ? (
          <div className="p-4 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl text-xs text-[#111215] flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-[#519DD9]" />
            Support Ticket #TK-8902 Created! Our engineering team has been notified.
          </div>
        ) : (
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-xs text-[#4A4D54] font-semibold mb-1">Subject / Question</label>
              <input 
                required 
                type="text" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                placeholder="e.g. Requesting API key change for Stripe sandbox..." 
                className="w-full p-2.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-xs text-[#111215] placeholder-[#8C8F98] focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF]" 
              />
            </div>
            <div>
              <label className="block text-xs text-[#4A4D54] font-semibold mb-1">Priority SLA</label>
              <select className="w-full p-2.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-xs text-[#111215] focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF]">
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
      </div>
    </div>
  );
}
