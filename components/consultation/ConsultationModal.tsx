"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { 
  Calendar, 
  Clock, 
  User, 
  Mail, 
  Phone, 
  FileText, 
  CheckCircle2, 
  Building2, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Send,
  Sparkles
} from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form fields
  const [clientName, setClientName] = useState("");
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [projectType, setProjectType] = useState("Custom Web Application");
  const [timeline, setTimeline] = useState("30–40 Days (Standard)");
  const [budgetRange, setBudgetRange] = useState("$5,000 - $15,000");
  const [preferredTime, setPreferredTime] = useState("Morning (9 AM - 12 PM EST)");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const consultationLead = {
      id: `CALL-${Date.now().toString().slice(-4)}`,
      fullName: clientName,
      company: company || "Direct Client",
      email,
      phone,
      serviceNeeded: projectType,
      budgetRange,
      projectScope: `Timeline: ${timeline} | Preferred Call Slot: ${preferredTime} | Details: ${description}`,
      status: "NEW",
      createdAt: new Date().toISOString()
    };

    try {
      const existingLeads = localStorage.getItem("velocity_leads_data");
      const list = existingLeads ? JSON.parse(existingLeads) : [];
      list.unshift(consultationLead);
      localStorage.setItem("velocity_leads_data", JSON.stringify(list));
    } catch (err) {
      console.error("Error storing consultation lead:", err);
    }

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setClientName("");
      setCompany("");
      setEmail("");
      setPhone("");
      setDescription("");
    }, 300);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={handleClose} 
      title={submitted ? "Consultation Scheduled" : "Schedule a 1-on-1 Project Discovery Call"} 
      maxWidth="2xl"
    >
      {submitted ? (
        <div className="text-center py-8 px-4 space-y-5 animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-white font-display">1-on-1 Call Request Received!</h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-white">{clientName}</strong>. Our senior engineering lead will review your project requirements and send a calendar invitation to <strong className="text-cyan-400">{email}</strong> within 2–4 hours.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl max-w-md mx-auto text-left text-xs font-mono space-y-2">
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-500">Service:</span>
              <span className="text-white font-semibold">{projectType}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-1.5">
              <span className="text-slate-500">Target Timeline:</span>
              <span className="text-[#FF6B00] font-semibold">{timeline}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Preferred Slot:</span>
              <span className="text-purple-400 font-semibold">{preferredTime}</span>
            </div>
          </div>

          <div className="pt-2">
            <Button variant="gradient" size="md" onClick={handleClose} className="w-full sm:w-auto px-8">
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs">
          {/* Header Banner */}
          <div className="p-4 bg-gradient-to-r from-[#FF6B00]/10 via-[#7C5CFF]/10 to-transparent border border-[#FF6B00]/20 rounded-2xl flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#FF6B00] shrink-0" />
            <p className="text-xs text-slate-300 leading-relaxed">
              Every project is unique. Schedule a direct 1-on-1 technical discovery call with our engineering team to review your specifications, architecture, and tailored milestones.
            </p>
          </div>

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Your Full Name *</label>
              <input
                required
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Johnathan Davis"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Company / Organization</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Apex Global Solutions"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Email Address *</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johnathan@company.com"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Phone / WhatsApp Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 234-5678"
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#FF6B00]"
              />
            </div>
          </div>

          {/* Project Scoping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Project Type *</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-[#FF6B00]"
              >
                <option value="Custom Web Application">Custom Web Application</option>
                <option value="Enterprise ERP / CRM Portal">Enterprise ERP / CRM Portal</option>
                <option value="Educational & Learning Platform">Educational Platform</option>
                <option value="Full-Stack Re-architecture">Full-Stack Re-architecture</option>
                <option value="UI/UX & Product Design System">UI/UX & Design System</option>
                <option value="Cloud Infrastructure & DevOps">Cloud Deployment & DevOps</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Target Timeline</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-[#FF6B00]"
              >
                <option value="30–40 Days (Standard)">30–40 Days (Standard)</option>
                <option value="Under 30 Days (Accelerated)">Under 30 Days (Accelerated)</option>
                <option value="60+ Days (Multi-Phase)">60+ Days (Multi-Phase)</option>
                <option value="Ongoing Retainer / Support">Ongoing Retainer / Support</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Estimated Budget</label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
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
            <label className="block font-semibold text-slate-300">Preferred Call Time Slot</label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs focus:outline-none focus:border-[#FF6B00]"
            >
              <option value="Morning (9 AM - 12 PM EST)">Morning (9:00 AM - 12:00 PM EST)</option>
              <option value="Afternoon (1 PM - 4 PM EST)">Afternoon (1:00 PM - 4:00 PM EST)</option>
              <option value="Evening (5 PM - 8 PM EST)">Evening (5:00 PM - 8:00 PM EST)</option>
              <option value="Flexible / Anytime this week">Flexible / Anytime this week</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Project Requirements & Deliverables</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about the key features, target users, integrations, or specific challenges for your project..."
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-[#FF6B00] resize-none leading-relaxed"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="gradient"
              size="lg"
              className="w-full"
              loading={loading}
              icon={<Send className="w-4 h-4" />}
            >
              Confirm 1-on-1 Discovery Call Request
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
}
