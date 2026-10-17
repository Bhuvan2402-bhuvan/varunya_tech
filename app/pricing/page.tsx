"use client";

import React, { useState } from "react";
import { 
  CheckCircle2, 
  Mail
} from "lucide-react";
import { ConsultationModal } from "@/components/consultation/ConsultationModal";

export default function PricingPage() {
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  const engagementModels = [
    {
      name: "Custom Web Application",
      tagline: "Tailored full-stack platforms engineered from ground up for startups & growing enterprises.",
      duration: "30–40 Days Delivery",
      badge: "FIXED TIMELINE",
      popular: false,
      features: [
        "1-on-1 Technical Architecture Discovery Call",
        "Tailored Next.js & React Frontend Engineering",
        "PostgreSQL / Supabase / Firebase Database Modeling",
        "Role-Based Access Control & Secure Auth",
        "Custom REST API & Webhook Integrations",
        "100% Full Source Code & IP Transfer",
        "30-Day Post-Launch Maintenance & Bug Fixes"
      ]
    },
    {
      name: "Enterprise ERP & Operational Portals",
      tagline: "Comprehensive centralized workflow, multi-role dashboards, and automated business logic.",
      duration: "Custom Sprints (30–60 Days)",
      badge: "PRIMARY DISCIPLINE",
      popular: true,
      features: [
        "Comprehensive 1-on-1 Requirements Workshop",
        "Multi-Tenant Role-Based Management (RBAC)",
        "Automated Invoicing, Financial Reports & Audits",
        "Data Encryption at Rest & in Transit (HTTPS)",
        "Enterprise Production Load Testing & Tuning",
        "Dedicated Staging & Production Cloud Deployment",
        "Continuous Post-Launch SLA & Dedicated Support"
      ]
    },
    {
      name: "Educational & Interactive Platforms",
      tagline: "Interactive learning portals, gamified practice apps, and institutional management systems.",
      duration: "30–40 Days Delivery",
      badge: "SPECIALIZED SUITE",
      popular: false,
      features: [
        "1-on-1 Pedagogy & UX Discovery Session",
        "Student-Friendly Responsive UI/UX Design",
        "Interactive Digital Practice & Exercises",
        "Admin Analytics & Progress Tracking Portal",
        "Real-Time Data Sync & Cloud Backups",
        "Full Documentation & Knowledge Transfer",
        "Ongoing Maintenance & Feature Expansions"
      ]
    }
  ];

  return (
    <div className="py-16 lg:py-24 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans bg-[#FAFAF8] text-[#111215]">
      {/* Header */}
      <div className="border-b border-[#E5E2DB] pb-12 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-full text-[#4A4D54] text-[11px] font-mono uppercase tracking-[0.2em] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]" />
          Commissioning &amp; Sprint Architecture
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#111215] tracking-tight font-display">
          Project Pricing &amp; <span className="font-editorial italic font-light text-[#519DD9]">Engagement</span>
        </h1>
        <p className="text-[#4A4D54] text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Every software system is architected for longevity. We do not offer generic off-the-shelf packages. We conduct a direct discovery consultation to determine your exact technical architecture, data model, and milestone timeline.
        </p>
      </div>

      {/* 3-Step Consultative Process */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#71757E] uppercase tracking-widest font-bold">01 // Engagement Methodology</span>
          <div className="h-px bg-[#E5E2DB] flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs space-y-4">
            <div className="w-10 h-10 bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9] rounded-xl flex items-center justify-center font-bold text-sm">
              01
            </div>
            <h3 className="font-display text-base font-bold text-[#111215] uppercase tracking-wide">Discovery Consultation</h3>
            <p className="text-[#4A4D54] font-sans text-xs leading-relaxed font-light">
              We conduct a technical architecture session to map your core domain models, role boundaries, security posture, and critical milestones.
            </p>
          </div>

          <div className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs space-y-4">
            <div className="w-10 h-10 bg-[#F5F3EF] border border-[#E5E2DB] text-[#53BAC1] rounded-xl flex items-center justify-center font-bold text-sm">
              02
            </div>
            <h3 className="font-display text-base font-bold text-[#111215] uppercase tracking-wide">Milestone Blueprint</h3>
            <p className="text-[#4A4D54] font-sans text-xs leading-relaxed font-light">
              You receive an itemized architectural specification with verified sprint deliverables, strict 30–40 day SLAs, and transparent scope.
            </p>
          </div>

          <div className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs space-y-4">
            <div className="w-10 h-10 bg-[#F5F3EF] border border-[#E5E2DB] text-[#E23B52] rounded-xl flex items-center justify-center font-bold text-sm">
              03
            </div>
            <h3 className="font-display text-base font-bold text-[#111215] uppercase tracking-wide">Engineering &amp; Handoff</h3>
            <p className="text-[#4A4D54] font-sans text-xs leading-relaxed font-light">
              Production engineering ships with continuous staging deployments, automated test suites, complete IP transfer, and dedicated warranty support.
            </p>
          </div>
        </div>
      </div>

      {/* Engagement Models Cards */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#71757E] uppercase tracking-widest font-bold">02 // Commissioning Models</span>
          <div className="h-px bg-[#E5E2DB] flex-1" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {engagementModels.map((model, idx) => (
            <div
              key={idx}
              className={`p-8 rounded-2xl flex flex-col justify-between relative transition-all duration-300 ${
                model.popular 
                  ? "border-2 border-[#111215] bg-[#FFFFFF] shadow-lg" 
                  : "border border-[#E5E2DB] bg-[#FFFFFF] shadow-xs hover:border-[#111215] hover:shadow-md"
              }`}
            >
              {model.popular && (
                <div className="absolute top-0 right-8 -translate-y-1/2 px-3.5 py-1 bg-[#111215] text-[#FFFFFF] text-[10px] font-mono font-bold uppercase tracking-widest rounded-full shadow-sm">
                  {model.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#111215] font-display">{model.name}</h2>
                  <p className="text-xs text-[#4A4D54] mt-2 leading-relaxed">{model.tagline}</p>
                </div>

                <div className="p-3.5 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl flex items-center justify-between text-xs font-mono">
                  <span className="text-[#71757E] uppercase tracking-widest text-[10px]">Sprint Delivery</span>
                  <span className="text-[#111215] font-bold">{model.duration}</span>
                </div>

                <div className="pt-4 border-t border-[#E5E2DB] space-y-3">
                  <div className="text-[10px] font-mono text-[#71757E] uppercase tracking-widest font-bold">Scope Specifications:</div>
                  {model.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-[#4A4D54]">
                      <CheckCircle2 className="w-4 h-4 text-[#519DD9] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <a
                  href={`mailto:varunyatech@gmail.com?subject=Project Inquiry: ${encodeURIComponent(model.name)} - Varunya Technologies`}
                  className={`w-full py-3.5 px-4 font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 rounded-xl transition-all ${
                    model.popular
                      ? "bg-[#111215] text-[#FFFFFF] hover:bg-[#519DD9] shadow-md"
                      : "bg-[#F5F3EF] border border-[#E5E2DB] text-[#111215] hover:bg-[#FFFFFF] hover:border-[#111215]"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Initiate Consultation</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Assurance Card */}
      <div className="p-8 sm:p-12 border border-[#E5E2DB] bg-[#F5F3EF] rounded-2xl text-center space-y-4 max-w-4xl mx-auto shadow-xs">
        <span className="font-mono text-[10px] text-[#519DD9] uppercase tracking-widest font-bold">Custom Architecture</span>
        <h3 className="text-2xl sm:text-3xl font-bold text-[#111215] font-display">Have a Bespoke Enterprise Scope?</h3>
        <p className="text-sm text-[#4A4D54] max-w-2xl mx-auto leading-relaxed">
          Whether you need a legacy architecture overhaul, specialized multi-tenant data synchronization, or an internal operational platform, connect directly with our engineering leadership.
        </p>
        <div className="pt-4">
          <a
            href="mailto:varunyatech@gmail.com?subject=Enterprise Project Inquiry - Pricing"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#111215] text-[#FFFFFF] hover:bg-[#519DD9] rounded-xl font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-sm"
          >
            <Mail className="w-4 h-4" />
            <span>Direct Email Inquiry</span>
          </a>
        </div>
      </div>

      {/* 1-on-1 Consultation Modal */}
      <ConsultationModal isOpen={consultModalOpen} onClose={() => setConsultModalOpen(false)} />
    </div>
  );
}
