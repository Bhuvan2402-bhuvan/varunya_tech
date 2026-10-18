"use client";

import React, { useState } from "react";
import { Mail, Clock, Check, ShieldCheck } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 lg:py-24 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-[#111215]">
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-full font-mono text-[11px] uppercase tracking-[0.2em] text-[#4A4D54] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]"></span>
          Direct Engineering Inquiry
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#111215] uppercase tracking-tight leading-[1]">
          Initiate <br />
          <span className="font-editorial italic font-light text-[#519DD9] normal-case">Architectural Project.</span>
        </h1>
        <p className="text-[#4A4D54] text-base sm:text-lg leading-relaxed">
          Ready to engineer your custom software platform or web application? Send your system specifications directly to our engineering architect.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact info cards */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#519DD9] font-bold">
              STUDIO EMAIL
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-[#519DD9]" />
              <a 
                href="mailto:varunyatech@gmail.com" 
                className="font-mono text-sm font-semibold text-[#111215] hover:text-[#519DD9] transition-colors"
              >
                varunyatech@gmail.com
              </a>
            </div>
            <p className="text-xs text-[#4A4D54] leading-relaxed">
              We respond to all technical inquiries and architectural scopes within 4 business hours.
            </p>
          </div>

          <div className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#53BAC1] font-bold">
              DELIVERY STANDARD
            </div>
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#53BAC1]" />
              <span className="font-mono text-sm font-bold text-[#111215]">30–40 Day Sprints</span>
            </div>
            <p className="text-xs text-[#4A4D54] leading-relaxed">
              Strict delivery timelines with continuous client demo access and post-launch maintenance SLA.
            </p>
          </div>

          <div className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs space-y-4">
            <div className="font-mono text-[10px] uppercase tracking-widest text-[#E23B52] font-bold">
              IP OWNERSHIP
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-[#E23B52]" />
              <span className="font-mono text-sm font-bold text-[#111215]">100% Repository Transfer</span>
            </div>
            <p className="text-xs text-[#4A4D54] leading-relaxed">
              You own all source code repositories, cloud infrastructure configs, and database schemas.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <div className="p-8 lg:p-12 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-sm">
            {submitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-14 h-14 bg-[#F5F3EF] border border-[#E5E2DB] rounded-full flex items-center justify-center mx-auto text-[#111215]">
                  <Check className="w-6 h-6 text-[#519DD9]" />
                </div>
                <h2 className="text-2xl font-black uppercase text-[#111215]">Specification Received</h2>
                <p className="text-sm text-[#4A4D54] max-w-md mx-auto">
                  Our engineering team has received your inquiry. We will contact you at your email address to coordinate an initial technical discovery call.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4D54] font-semibold">Your Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="e.g. Alexander Vance" 
                      className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-xs text-[#111215] font-mono focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4D54] font-semibold">Work Email</label>
                    <input 
                      required 
                      type="email" 
                      placeholder="e.g. alex@company.com" 
                      className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-xs text-[#111215] font-mono focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all" 
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4D54] font-semibold">Organization</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Enterprise Systems" 
                      className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-xs text-[#111215] font-mono focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4D54] font-semibold">Timeline Target</label>
                    <select className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-xs text-[#111215] font-mono focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all">
                      <option>30–40 Days (Standard Sprint)</option>
                      <option>Under 30 Days (Expedited)</option>
                      <option>Ongoing Engineering Retainer</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-mono uppercase tracking-wider text-[#4A4D54] font-semibold">Project Scope & Architecture Requirements</label>
                  <textarea 
                    required 
                    rows={5} 
                    placeholder="Describe the software application, target features, and any required database/API integrations..." 
                    className="w-full px-4 py-3 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-xs text-[#111215] font-mono focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all leading-relaxed" 
                  />
                </div>

                <button 
                  type="submit" 
                  className="w-full py-4 bg-[#111215] text-[#FFFFFF] hover:bg-[#519DD9] font-mono text-xs uppercase tracking-widest font-semibold transition-colors rounded-xl shadow-sm"
                >
                  Submit Project Specification
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
