"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/Button";
import { 
  PhoneCall, 
  CheckCircle2, 
  ShieldCheck, 
  Send
} from "lucide-react";
import { ConsultationModal } from "@/components/consultation/ConsultationModal";

export default function ConsultationServicesPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form fields for inline booking
  const [fullName, setFullName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [serviceNeeded, setServiceNeeded] = useState("Custom Web Application");
  const [timeline, setTimeline] = useState("30–40 Days (Standard)");
  const [budget, setBudget] = useState("$6,000 - $12,000");
  const [scopeDetails, setScopeDetails] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lead = {
      id: `CALL-${Date.now().toString().slice(-4)}`,
      fullName,
      company: company || "Direct Client",
      email,
      phone,
      serviceNeeded,
      budgetRange: budget,
      projectScope: `Timeline: ${timeline} | Details: ${scopeDetails}`,
      status: "NEW",
      createdAt: new Date().toISOString()
    };

    try {
      const existing = localStorage.getItem("velocity_leads_data");
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(lead);
      localStorage.setItem("velocity_leads_data", JSON.stringify(list));
    } catch (e) {
      console.error(e);
    }

    setSubmitted(true);
  };

  return (
    <div className="py-16 lg:py-24 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans bg-[#FAFAF8] text-[#111215]">
      {/* Header */}
      <div className="border-b border-[#E5E2DB] pb-12 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-full text-[#4A4D54] text-[11px] font-mono uppercase tracking-[0.2em] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]" />
          Technical Architecture &amp; Scoping
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#111215] tracking-tight font-display">
          Direct Project <span className="font-editorial italic font-light text-[#519DD9]">Discovery &amp; Scoping</span>
        </h1>
        <p className="text-[#4A4D54] text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Engage directly with senior systems architects to evaluate technical feasibility, database models, cloud topology, and disciplined milestone sprints.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: What to expect in 1-on-1 call */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 border border-[#E5E2DB] bg-[#FFFFFF] rounded-2xl shadow-xs space-y-6">
            <h3 className="text-xl font-bold text-[#111215] font-display flex items-center gap-2.5">
              <PhoneCall className="w-5 h-5 text-[#519DD9]" /> 
              <span>Consultation Protocol</span>
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-5 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl space-y-1.5">
                <div className="text-[#111215] font-bold">01 // Domain &amp; Entity Mapping</div>
                <div className="text-[#4A4D54] text-[11px] font-sans font-light leading-relaxed">
                  We analyze core business logic, user permission tiers, and integration dependencies.
                </div>
              </div>

              <div className="p-5 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl space-y-1.5">
                <div className="text-[#111215] font-bold">02 // Architectural Topology</div>
                <div className="text-[#4A4D54] text-[11px] font-sans font-light leading-relaxed">
                  We determine the data store architecture, API latency targets, and deployment environments.
                </div>
              </div>

              <div className="p-5 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl space-y-1.5">
                <div className="text-[#111215] font-bold">03 // Milestone Delivery Plan</div>
                <div className="text-[#4A4D54] text-[11px] font-sans font-light leading-relaxed">
                  You receive an itemized milestone schedule with fixed 30–40 day delivery terms and warranty SLA.
                </div>
              </div>
            </div>

            <div className="p-5 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl space-y-2 text-xs">
              <div className="font-bold text-[#111215] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#519DD9]" /> 
                <span>Confidential Architecture Review</span>
              </div>
              <p className="text-[#4A4D54] text-[11px] leading-relaxed font-light">
                Direct engineer-to-client consultation focused strictly on technical execution, system integrity, and delivery timeline.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Booking Form */}
        <div className="lg:col-span-7">
          <div className="p-8 border border-[#E5E2DB] bg-[#FFFFFF] rounded-2xl shadow-xs">
            {submitted ? (
              <div className="text-center py-16 space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 bg-[#F5F3EF] border border-[#E5E2DB] rounded-2xl text-[#519DD9] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8 text-[#519DD9]" />
                </div>
                <h3 className="text-2xl font-bold text-[#111215] font-display">Discovery Session Logged</h3>
                <p className="text-xs text-[#4A4D54] max-w-md mx-auto leading-relaxed font-light">
                  Thank you, <strong className="text-[#111215]">{fullName}</strong>. Our engineering director will inspect your specifications and forward an architectural calendar link shortly.
                </p>
                <div className="pt-4">
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Submit Another Request
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
                <div className="border-b border-[#E5E2DB] pb-4">
                  <h3 className="text-lg font-bold text-[#111215] font-display">Initiate Architecture Consultation</h3>
                  <p className="text-[#71757E] text-[11px] font-light">Specify system parameters to prepare discovery documentation.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#111215]">Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Alex Morgan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder-[#8C8F98] focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#111215]">Company / Entity</label>
                    <input
                      type="text"
                      placeholder="Acme Systems"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder-[#8C8F98] focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#111215]">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="alex@acme.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder-[#8C8F98] focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#111215]">Phone / Direct Line</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder-[#8C8F98] focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#111215]">Service Category</label>
                    <select
                      value={serviceNeeded}
                      onChange={(e) => setServiceNeeded(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-[#111215] text-xs focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all"
                    >
                      <option value="Custom Web Application">Custom Web Application</option>
                      <option value="ERP / Operational Portal">ERP / Operational Portal</option>
                      <option value="Educational Platform">Educational Platform</option>
                      <option value="Full-Stack Re-architecture">Full-Stack Re-architecture</option>
                      <option value="UI/UX Design System">UI/UX Design System</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#111215]">Timeline Expectation</label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-[#111215] text-xs focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all"
                    >
                      <option value="30–40 Days (Standard)">30–40 Days (Standard)</option>
                      <option value="Under 30 Days">Under 30 Days</option>
                      <option value="60+ Days (Phased)">60+ Days (Phased)</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-semibold text-[#111215]">Budget Scope</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-[#111215] text-xs focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all"
                    >
                      <option value="$3,000 - $6,000">$3,000 - $6,000</option>
                      <option value="$6,000 - $12,000">$6,000 - $12,000</option>
                      <option value="$12,000 - $25,000">$12,000 - $25,000</option>
                      <option value="$25,000+ (Enterprise)">$25,000+ (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#111215]">Project Scope &amp; Architecture Notes</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe target system requirements, expected user volume, or critical integrations..."
                    value={scopeDetails}
                    onChange={(e) => setScopeDetails(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder-[#8C8F98] focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all resize-none leading-relaxed"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="primary" size="lg" className="w-full" icon={<Send className="w-4 h-4" />}>
                    Submit Scoping Request
                  </Button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
