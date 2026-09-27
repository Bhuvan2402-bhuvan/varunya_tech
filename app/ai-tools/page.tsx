"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  Calendar, 
  PhoneCall, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  FileText, 
  Send,
  Users,
  Code2,
  Layers,
  ArrowRight
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
    <div className="py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-gradient-to-r from-[#FF6B00]/15 to-[#7C5CFF]/15 border border-[#FF6B00]/30 rounded-full text-xs font-mono text-[#FFB347]">
          DIRECT CLIENT CONSULTATION
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display">
          1-on-1 Project <span className="gradient-varunya-text">Discovery & Scoping</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Skip generic automated estimates. Speak directly with our senior software architects to review your custom requirements, system architecture, and milestone delivery plan.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: What to expect in 1-on-1 call */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-8 border-slate-800 space-y-6">
            <h3 className="text-xl font-bold text-white font-display flex items-center gap-2">
              <PhoneCall className="w-5 h-5 text-[#FF6B00]" /> What Happens on the Call
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                <div className="text-[#FF6B00] font-bold">1. Requirements & User Story Mapping</div>
                <div className="text-slate-400 text-[11px] font-sans">
                  We review your business goals, target user workflows, and core feature requirements.
                </div>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                <div className="text-[#FF8A00] font-bold">2. Architecture & Tech Stack Selection</div>
                <div className="text-slate-400 text-[11px] font-sans">
                  We determine the ideal database models, frontend frameworks, and cloud hosting architecture.
                </div>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                <div className="text-[#7C5CFF] font-bold">3. 30–40 Day Delivery Roadmap</div>
                <div className="text-slate-400 text-[11px] font-sans">
                  You receive an itemized milestone schedule with fixed deadlines and post-launch maintenance terms.
                </div>
              </div>
            </div>

            <div className="p-4 bg-white/5 border border-white/10 rounded-2xl space-y-2 text-xs">
              <div className="font-bold text-white flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Confidential & Free Consultation
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                Zero sales pressure. Direct developer-to-client consultation focused purely on technical feasibility and optimal architecture.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* Right Column: Direct Booking Form */}
        <div className="lg:col-span-7">
          <GlassCard className="p-8 border-slate-800">
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-white font-display">Discovery Call Requested!</h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-white">{fullName}</strong>. Our engineering lead will review your project scope and email you a calendar booking link shortly.
                </p>
                <div className="pt-4">
                  <Button variant="outline" size="sm" onClick={() => setSubmitted(false)}>
                    Submit Another Request
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                <div className="border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white font-display">Schedule Your Project Discovery Call</h3>
                  <p className="text-slate-400 text-[11px]">Fill in your project details to schedule a 1-on-1 consultation.</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Your Full Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Alex Morgan"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Company / Organization</label>
                    <input
                      type="text"
                      placeholder="Acme Labs"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Email Address *</label>
                    <input
                      required
                      type="email"
                      placeholder="alex@acme.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#FF6B00]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Service Category</label>
                    <select
                      value={serviceNeeded}
                      onChange={(e) => setServiceNeeded(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                    >
                      <option value="Custom Web Application">Custom Web Application</option>
                      <option value="ERP / Operational Portal">ERP / Operational Portal</option>
                      <option value="Educational Platform">Educational Platform</option>
                      <option value="Full-Stack Re-architecture">Full-Stack Re-architecture</option>
                      <option value="UI/UX Design System">UI/UX Design System</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Timeline</label>
                    <select
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                    >
                      <option value="30–40 Days (Standard)">30–40 Days (Standard)</option>
                      <option value="Under 30 Days">Under 30 Days</option>
                      <option value="60+ Days (Phased)">60+ Days (Phased)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-300">Budget Range</label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-[#FF6B00]"
                    >
                      <option value="$3,000 - $6,000">$3,000 - $6,000</option>
                      <option value="$6,000 - $12,000">$6,000 - $12,000</option>
                      <option value="$12,000 - $25,000">$12,000 - $25,000</option>
                      <option value="$25,000+ (Enterprise)">$25,000+ (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-300">Project Scope & Requirements</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe what you're building, target users, or key functionalities required..."
                    value={scopeDetails}
                    onChange={(e) => setScopeDetails(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#FF6B00] resize-none"
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="gradient" size="lg" className="w-full" icon={<Send className="w-4 h-4" />}>
                    Request 1-on-1 Consultation
                  </Button>
                </div>
              </form>
            )}
          </GlassCard>
        </div>
      </div>

      <ConsultationModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
