"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  CheckCircle2, 
  Calendar, 
  ArrowRight, 
  ShieldCheck, 
  PhoneCall, 
  Layers, 
  Clock, 
  Users, 
  Code2, 
  FileText,
  Sparkles,
  Mail
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { ConsultationModal } from "@/components/consultation/ConsultationModal";

export default function PricingPage() {
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  const engagementModels = [
    {
      name: "Custom Web Application",
      tagline: "Tailored full-stack platforms engineered from ground up for startups & growing businesses.",
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
      badge: "MOST REQUESTED",
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
      badge: "SPECIALIZED",
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
    <div className="py-16 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-gradient-to-r from-[#FF6B00]/15 to-[#7C5CFF]/15 border border-[#FF6B00]/30 rounded-full text-xs font-mono text-[#FFB347]">
          TAILORED ENGAGEMENT • 1-ON-1 CONSULTATIVE SCOPING
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display">
          Project Pricing & <span className="gradient-varunya-text">Engagement</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          Every software platform is unique. We don&apos;t force generic automated packages. Instead, we conduct a direct 1-on-1 discovery call to review your exact requirements, architecture, and timeline.
        </p>
      </div>

      {/* 3-Step Consultative Process */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF6B00]/15 border border-[#FF6B00]/30 text-[#FF6B00] flex items-center justify-center font-bold text-sm">
            01
          </div>
          <h3 className="font-display text-base font-bold text-white uppercase">1-on-1 Discovery Call</h3>
          <p className="text-slate-400 font-sans text-xs leading-relaxed">
            We meet directly over video to map your core user stories, technical architecture, third-party integrations, and target milestones.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF8A00]/15 border border-[#FF8A00]/30 text-[#FF8A00] flex items-center justify-center font-bold text-sm">
            02
          </div>
          <h3 className="font-display text-base font-bold text-white uppercase">Custom Milestone Scope</h3>
          <p className="text-slate-400 font-sans text-xs leading-relaxed">
            You receive a transparent, itemized proposal with clear deliverable milestones, a 30–40 day sprint schedule, and zero hidden fees.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 text-[#7C5CFF] flex items-center justify-center font-bold text-sm">
            03
          </div>
          <h3 className="font-display text-base font-bold text-white uppercase">Production & Support</h3>
          <p className="text-slate-400 font-sans text-xs leading-relaxed">
            Senior full-stack developers ship clean, modular code with staging verification, live production launch, and post-launch support.
          </p>
        </div>
      </div>

      {/* Engagement Models Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
        {engagementModels.map((model, idx) => (
          <GlassCard
            key={idx}
            className={`p-8 flex flex-col justify-between relative ${
              model.popular ? "border-[#FF6B00]/60 shadow-[0_0_30px_rgba(255,107,0,0.15)] bg-slate-900/95" : "border-slate-800"
            }`}
          >
            {model.popular && (
              <div className="absolute top-0 right-8 -translate-y-1/2 px-3 py-1 bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#7C5CFF] rounded-full text-[10px] font-bold text-white uppercase tracking-wider shadow-md">
                {model.badge}
              </div>
            )}

            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white font-display">{model.name}</h2>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">{model.tagline}</p>
              </div>

              <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">Typical Sprint:</span>
                <span className="text-[#FF6B00] font-bold">{model.duration}</span>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">What&apos;s Included:</div>
                {model.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6B00] shrink-0 mt-0.5" />
                    <span className="leading-snug">{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-8">
              <a
                href={`mailto:contact@varunyatech.com?subject=Project Inquiry: ${encodeURIComponent(model.name)} - Varunya Technologies`}
                className={`w-full py-3 px-4 rounded-xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all ${
                  model.popular
                    ? "bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#7C5CFF] text-white shadow-[0_0_20px_rgba(255,107,0,0.35)] hover:opacity-95"
                    : "bg-white/5 border border-white/10 hover:border-white/20 text-white hover:bg-white/10"
                }`}
              >
                <Mail className="w-4 h-4 text-white" />
                <span>Contact Us</span>
              </a>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Assurance Card */}
      <GlassCard className="p-8 sm:p-12 border-slate-800 text-center space-y-4 max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-white font-display">Have a Unique or Complex Software Vision?</h3>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Whether you need a full enterprise replatforming, bespoke portal architecture, or specialized operational workflow, let&apos;s discuss the details directly over a call.
        </p>
        <div className="pt-2">
          <a
            href="mailto:contact@varunyatech.com?subject=Enterprise Project Inquiry - Pricing"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#7C5CFF] text-white font-mono text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_25px_rgba(255,107,0,0.4)]"
          >
            <Mail className="w-4 h-4 text-white" />
            <span>Contact Us via Email</span>
          </a>
        </div>
      </GlassCard>

      {/* 1-on-1 Consultation Modal */}
      <ConsultationModal isOpen={consultModalOpen} onClose={() => setConsultModalOpen(false)} />
    </div>
  );
}
