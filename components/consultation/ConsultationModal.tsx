"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { 
  Calendar, 
  CheckCircle2, 
  Send,
  AlertCircle
} from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [serverLeadId, setServerLeadId] = useState<string | null>(null);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!clientName.trim() || !email.trim() || !description.trim()) {
      setErrorMessage("Please fill in your name, email, and project requirements.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/v1/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: clientName.trim(),
          email: email.trim(),
          company: company.trim() || undefined,
          phone: phone.trim() || undefined,
          serviceNeeded: projectType,
          budgetRange,
          projectScope: description.trim(),
          consultationDetails: `Target Timeline: ${timeline} | Preferred Discovery Slot: ${preferredTime}`,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to persist consultation request.");
      }

      setServerLeadId(data.leadId);
      setSubmitted(true);
    } catch (err: any) {
      console.error("Consultation submission error:", err);
      setErrorMessage(
        err.message || "Failed to submit request. Please email varunyatech@gmail.com directly."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setErrorMessage(null);
      setServerLeadId(null);
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
          <div className="w-16 h-16 rounded-2xl bg-[#202329] border border-[#2A2E37] text-[#53BAC1] flex items-center justify-center mx-auto shadow-steel-glow">
            <CheckCircle2 className="w-10 h-10 text-[#53BAC1]" />
          </div>

          <div className="space-y-2">
            <h3 className="text-2xl font-bold text-[#EDEDED] font-display">1-on-1 Discovery Scheduled</h3>
            <p className="text-xs sm:text-sm text-[#A6AFBD] max-w-md mx-auto leading-relaxed">
              Thank you, <strong className="text-[#EDEDED]">{clientName}</strong>. Your consultation request has been securely persisted in our CRM pipeline with reference{" "}
              <strong className="text-[#519DD9] font-mono">{serverLeadId || "ACTIVE"}</strong>. Our lead architect will review your specifications and dispatch a calendar invitation to <strong className="text-[#53BAC1]">{email}</strong>.
            </p>
          </div>

          <div className="p-4 bg-[#202329] border border-[#2A2E37] rounded-xl max-w-md mx-auto text-left text-xs font-mono space-y-2">
            <div className="flex justify-between border-b border-[#2A2E37] pb-1.5">
              <span className="text-[#727C8D]">Service Focus:</span>
              <span className="text-[#EDEDED] font-semibold">{projectType}</span>
            </div>
            <div className="flex justify-between border-b border-[#2A2E37] pb-1.5">
              <span className="text-[#727C8D]">Sprint Timeline:</span>
              <span className="text-[#519DD9] font-semibold">{timeline}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#727C8D]">Target Window:</span>
              <span className="text-[#53BAC1] font-semibold">{preferredTime}</span>
            </div>
          </div>

          <div className="pt-2">
            <Button variant="primary" size="md" onClick={handleClose} className="w-full sm:w-auto px-8 bg-[#519DD9] hover:bg-[#3d8ac4] text-[#17191D] font-bold">
              Done
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5 font-sans text-xs">
          {/* Header Banner */}
          <div className="p-4 bg-[#202329] border border-[#2A2E37] rounded-xl flex items-center gap-3">
            <Calendar className="w-6 h-6 text-[#519DD9] shrink-0" />
            <p className="text-xs text-[#A6AFBD] leading-relaxed">
              Discuss architecture, technical scoping, deliverables, and customized milestone commitments directly with a senior engineer.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 bg-[#DB0038]/10 border border-[#DB0038]/30 rounded-lg flex items-center gap-2.5 text-[#DB0038] text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Contact Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-[#EDEDED]">Your Full Name *</label>
              <input
                required
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="Johnathan Davis"
                className="w-full px-3.5 py-2.5 bg-[#17191D] border border-[#2A2E37] rounded-xl text-[#EDEDED] placeholder-[#727C8D] focus:outline-none focus:border-[#519DD9] focus:bg-[#202329] transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-[#EDEDED]">Company / Organization</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Apex Global Solutions"
                className="w-full px-3.5 py-2.5 bg-[#17191D] border border-[#2A2E37] rounded-xl text-[#EDEDED] placeholder-[#727C8D] focus:outline-none focus:border-[#519DD9] focus:bg-[#202329] transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-[#EDEDED]">Email Address *</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="johnathan@company.com"
                className="w-full px-3.5 py-2.5 bg-[#17191D] border border-[#2A2E37] rounded-xl text-[#EDEDED] placeholder-[#727C8D] focus:outline-none focus:border-[#519DD9] focus:bg-[#202329] transition-all"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-[#EDEDED]">Phone / WhatsApp Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+1 (555) 234-5678"
                className="w-full px-3.5 py-2.5 bg-[#17191D] border border-[#2A2E37] rounded-xl text-[#EDEDED] placeholder-[#727C8D] focus:outline-none focus:border-[#519DD9] focus:bg-[#202329] transition-all"
              />
            </div>
          </div>

          {/* Project Scoping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block font-semibold text-[#EDEDED]">Project Type *</label>
              <select
                value={projectType}
                onChange={(e) => setProjectType(e.target.value)}
                className="w-full px-3 py-2 bg-[#17191D] border border-[#2A2E37] rounded-xl text-[#EDEDED] text-xs focus:outline-none focus:border-[#519DD9] focus:bg-[#202329] transition-all"
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
              <label className="block font-semibold text-[#EDEDED]">Target Timeline</label>
              <select
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                className="w-full px-3 py-2 bg-[#17191D] border border-[#2A2E37] rounded-xl text-[#EDEDED] text-xs focus:outline-none focus:border-[#519DD9] focus:bg-[#202329] transition-all"
              >
                <option value="30–40 Days (Standard)">30–40 Days (Standard)</option>
                <option value="Under 30 Days (Accelerated)">Under 30 Days (Accelerated)</option>
                <option value="60+ Days (Multi-Phase)">60+ Days (Multi-Phase)</option>
                <option value="Ongoing Retainer / Support">Ongoing Retainer / Support</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="block font-semibold text-[#EDEDED]">Estimated Budget</label>
              <select
                value={budgetRange}
                onChange={(e) => setBudgetRange(e.target.value)}
                className="w-full px-3 py-2 bg-[#17191D] border border-[#2A2E37] rounded-xl text-[#EDEDED] text-xs focus:outline-none focus:border-[#519DD9] focus:bg-[#202329] transition-all"
              >
                <option value="$3,000 - $6,000">$3,000 - $6,000</option>
                <option value="$6,000 - $12,000">$6,000 - $12,000</option>
                <option value="$12,000 - $25,000">$12,000 - $25,000</option>
                <option value="$25,000+ (Enterprise)">$25,000+ (Enterprise)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#EDEDED]">Preferred Call Time Slot</label>
            <select
              value={preferredTime}
              onChange={(e) => setPreferredTime(e.target.value)}
              className="w-full px-3 py-2 bg-[#17191D] border border-[#2A2E37] rounded-xl text-[#EDEDED] text-xs focus:outline-none focus:border-[#519DD9] focus:bg-[#202329] transition-all"
            >
              <option value="Morning (9 AM - 12 PM EST)">Morning (9:00 AM - 12:00 PM EST)</option>
              <option value="Afternoon (1 PM - 4 PM EST)">Afternoon (1:00 PM - 4:00 PM EST)</option>
              <option value="Evening (5 PM - 8 PM EST)">Evening (5:00 PM - 8:00 PM EST)</option>
              <option value="Flexible / Anytime this week">Flexible / Anytime this week</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#EDEDED]">Project Requirements &amp; Deliverables *</label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell us about the key features, target users, integrations, or specific challenges for your project (min 10 characters)..."
              className="w-full px-3.5 py-2.5 bg-[#17191D] border border-[#2A2E37] rounded-xl text-[#EDEDED] placeholder-[#727C8D] focus:outline-none focus:border-[#519DD9] focus:bg-[#202329] transition-all resize-none leading-relaxed"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full bg-[#519DD9] hover:bg-[#3d8ac4] text-[#17191D] font-bold"
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
