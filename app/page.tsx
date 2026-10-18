"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ArrowDownRight, 
  ArrowUpRight,
  ExternalLink,
  ShieldCheck, 
  Database, 
  Server, 
  Check, 
  Sparkles, 
  Activity, 
  Lock, 
  School, 
  CheckCircle2, 
  Send, 
  Mail, 
  FileText,
  Clock,
  AlertCircle
} from "lucide-react";
import { ConsultationModal } from "@/components/consultation/ConsultationModal";
import { 
  getStoredHomepageConfig, 
  subscribeHomepageUpdates, 
  HomepageConfig, 
  DEFAULT_HOMEPAGE_CONFIG 
} from "@/lib/data/homepage-data";
import { PORTFOLIO_DATA } from "@/lib/data/mock-data";
import { HeroSystemGraph } from "@/components/engineering/HeroSystemGraph";
import { ScrollingCapabilitiesBridge } from "@/components/engineering/ScrollingCapabilitiesBridge";
import { StageArchitecture } from "@/components/engineering/StageArchitecture";
import { StageAiPipeline } from "@/components/engineering/StageAiPipeline";

export default function HomePage() {
  const [config, setConfig] = useState<HomepageConfig>(DEFAULT_HOMEPAGE_CONFIG);
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  // Direct Enquiry Form State in Section G
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formOrg, setFormOrg] = useState("");
  const [formProjectType, setFormProjectType] = useState("Custom Business Software / ERP");
  const [formProblem, setFormProblem] = useState("");
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formLeadId, setFormLeadId] = useState("");

  useEffect(() => {
    setConfig(getStoredHomepageConfig());
    const unsubscribe = subscribeHomepageUpdates((updated) => {
      setConfig(updated);
    });
    return () => unsubscribe();
  }, []);

  const handleEnquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formName.trim() || !formEmail.trim() || !formProblem.trim()) {
      setFormError("Please fill in your name, work email, and project description.");
      return;
    }

    if (formProblem.trim().length < 10) {
      setFormError("Please provide at least 10 characters describing your project requirements.");
      return;
    }

    setFormSubmitting(true);

    try {
      const response = await fetch("/api/v1/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: formName.trim(),
          email: formEmail.trim(),
          company: formOrg.trim() || undefined,
          serviceNeeded: formProjectType,
          projectScope: formProblem.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to persist project enquiry.");
      }

      setFormLeadId(data.leadId);
      setFormSubmitted(true);
    } catch (err: any) {
      console.error("Enquiry submission error:", err);
      setFormError(
        err.message || "Failed to submit enquiry. Please email varunyatech@gmail.com directly."
      );
    } finally {
      setFormSubmitting(false);
    }
  };

  return (
    <div className="relative bg-white text-[#17191D] overflow-hidden font-sans">
      
      {/* ========================================================
          SECTION A — HERO / PROPOSITION
          "Your challenges. Our engineering."
          White Canvas with Digital Blue & Aqua Accents
          ======================================================== */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between border-b border-gray-200 bg-white">
        {/* Subtle luminous ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-[#519DD9]/10 blur-[180px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#53BAC1]/8 blur-[160px] pointer-events-none" />

        {/* Top Telemetry Header Ribbon */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#4B5563] border-b border-gray-200">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#519DD9] shadow-[0_0_8px_#519DD9] animate-pulse" />
            <span className="text-[#17191D] font-bold">VARUNYA<span className="text-[#519DD9] font-normal">TECH</span></span>
            <span className="text-gray-300">/</span>
            <span className="text-[#519DD9] font-semibold">SOFTWARE ARCHITECTURE &amp; ENGINEERING</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-[#6B7280]">SPRINT CADENCE: <strong className="text-[#17191D]">30–40 DAY MILESTONES</strong></span>
            <span className="text-[#17191D] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F7C200] animate-pulse" />
              <span>[ SYSTEMS OPERATIONAL ]</span>
            </span>
          </div>
        </div>

        {/* Hero Two-Column Layout */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center flex-1">
          
          {/* Left Column: Customer-First Proposition & Call to Action (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F9FAFB] border border-gray-200 font-mono text-[10px] tracking-[0.25em] text-[#519DD9] uppercase shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]" />
              <span>CUSTOM SOFTWARE &amp; DIGITAL SYSTEMS</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-[#17191D] tracking-tight uppercase leading-[0.98]">
              Your challenges. <br />
              Our <span className="font-editorial font-light italic text-[#519DD9] normal-case">engineering.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed max-w-xl font-normal">
              We design and build bespoke software, tailored business platforms, and automated digital systems focused entirely on practical business challenges. Production systems engineered for long-term reliability and complete client ownership.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <button
                onClick={() => setConsultModalOpen(true)}
                className="px-8 py-4 bg-[#DB0038] hover:bg-[#b5002e] text-[#FFFFFF] font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(219,0,56,0.25)] rounded"
              >
                <span>Discuss a project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#works"
                className="px-8 py-4 bg-white text-[#17191D] hover:bg-gray-50 font-mono text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2.5 border border-gray-200 hover:border-[#519DD9] shadow-xs rounded"
              >
                <span>Explore our work</span>
                <ArrowDownRight className="w-4 h-4 text-[#519DD9]" />
              </a>
            </div>

            {/* Credibility Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-gray-200 font-mono text-xs">
              <div className="p-3 bg-[#F9FAFB] border border-gray-200 shadow-xs rounded">
                <div className="text-[10px] text-[#6B7280] uppercase">SPRINT CYCLE</div>
                <div className="text-sm font-bold text-[#17191D] mt-0.5">30–40 DAYS</div>
              </div>
              <div className="p-3 bg-[#F9FAFB] border border-gray-200 shadow-xs rounded">
                <div className="text-[10px] text-[#6B7280] uppercase">PRODUCTION APPS</div>
                <div className="text-sm font-bold text-[#53BAC1] mt-0.5">4 VERIFIED</div>
              </div>
              <div className="p-3 bg-[#F9FAFB] border border-gray-200 shadow-xs rounded">
                <div className="text-[10px] text-[#6B7280] uppercase">IP TRANSFER</div>
                <div className="text-sm font-bold text-[#DB0038] mt-0.5">100% OWNED</div>
              </div>
              <div className="p-3 bg-[#F9FAFB] border border-gray-200 shadow-xs rounded">
                <div className="text-[10px] text-[#6B7280] uppercase">TARGET P95</div>
                <div className="text-sm font-bold text-[#F7C200] mt-0.5">&lt; 100MS SPEC</div>
              </div>
            </div>

          </div>

          {/* Right Column: Software Architecture Visual Simulation (6 cols) */}
          <div className="lg:col-span-6 w-full">
            <HeroSystemGraph />
          </div>

        </div>

        {/* Bottom Ticker Ribbon */}
        <div className="relative z-10 w-full bg-[#F9FAFB] border-t border-gray-200 py-2.5 overflow-hidden font-mono text-[10px] uppercase tracking-[0.25em] text-[#4B5563]">
          <div className="flex whitespace-nowrap gap-12 items-center animate-marquee">
            <span className="text-[#519DD9] font-semibold">• ENTERPRISE ERP ARCHITECTURES</span>
            <span className="text-[#53BAC1] font-semibold">• INTERACTIVE EDTECH PLATFORMS</span>
            <span className="text-[#DB0038] font-semibold">• DETERMINISTIC RAG VECTOR PIPELINES</span>
            <span className="text-[#519DD9] font-semibold">• 100% SOURCE CODE &amp; IP TRANSFER</span>
            <span className="text-[#17191D] font-semibold">• STRICT TYPESCRIPT COMPILATION</span>
            <span className="text-[#53BAC1] font-semibold">• DISCIPLINED 30–40 DAY DELIVERY SPRINTS</span>
            <span className="text-[#F7C200] font-semibold">• GUARANTEED POST-LAUNCH SUPPORT</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          PURPOSEFUL SCROLLING BRIDGE: Capabilities & System Conveyor
          Shows how software components connect & integrate
          ======================================================== */}
      <ScrollingCapabilitiesBridge />

      {/* ========================================================
          SECTION B — CUSTOMER PROBLEMS & SOLUTIONS
          4 Categories: Education, Custom Software/ERP, AI, Infrastructure
          Pure White & Soft Gray Foundation · Accents: Crimson, Aqua, Digital Blue, Electric Yellow
          ======================================================== */}
      <section id="problems" className="py-24 border-b border-gray-200 bg-[#F9FAFB] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.25em] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9] animate-pulse" />
                SECTION B // REAL BUSINESS CHALLENGES
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#17191D] tracking-tight font-sans">
                Customer Problems We Solve <span className="text-[#519DD9]">With Engineering.</span>
              </h2>
              <p className="text-[#4B5563] text-base font-normal leading-relaxed">
                Generic off-the-shelf software locks you into perpetual per-user licensing and rigid templates. We engineer tailored software architectures that solve your actual operational bottlenecks.
              </p>
            </div>

            <div className="font-mono text-xs text-[#4B5563] shrink-0 flex items-center gap-2 bg-white px-3.5 py-2 border border-gray-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#53BAC1]" />
              <span>FIXED SCOPE • NO RUNAWAY BILLING</span>
            </div>
          </div>

          {/* 4 Customer Problem-Solution Visual Compositions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Category 1: Education and Institutional Workflows */}
            <div className="bg-white border border-gray-200 p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-[#53BAC1] hover:shadow-lg transition-all rounded-xl shadow-xs">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F9FAFB] border border-gray-200 font-mono text-[10px] text-[#53BAC1] uppercase tracking-wider font-bold">
                    <School className="w-3.5 h-3.5" />
                    <span>01 // EDUCATION &amp; INSTITUTIONAL WORKFLOWS</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#6B7280] uppercase">PROVEN IN PRODUCTION</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#17191D] font-sans">
                    Digital Learning &amp; Student Operations
                  </h3>
                  <div className="mt-4 p-4 bg-[#F9FAFB] border-l-2 border-[#DB0038] border-r border-t border-b border-gray-200 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#DB0038] font-bold">
                      THE CUSTOMER&apos;S PROBLEM:
                    </span>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      Tutoring academies and educational institutions struggle with disconnected student tracking, manual paper reports, and difficulty teaching foundational hands-on skills (like abacus math) in digital formats.
                    </p>
                  </div>

                  <div className="mt-4 p-4 bg-[#F9FAFB] border-l-2 border-[#53BAC1] border-r border-t border-b border-gray-200 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#53BAC1] font-bold">
                      OUR ENGINEERED SOLUTION:
                    </span>
                    <p className="text-xs text-[#17191D] leading-relaxed">
                      Custom touch-enabled learning platforms with real-time 2D canvas bead interaction, automated skill mastery tracking, and clean student/teacher portals that work across all desktop and mobile devices.
                    </p>
                  </div>
                </div>

                {/* Proof & Verified Implementation */}
                <div className="p-4 bg-[#F9FAFB] border border-gray-200 space-y-2 rounded-lg">
                  <span className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wider font-bold">
                    VERIFIED IMPLEMENTATIONS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-white border border-gray-200 text-xs font-semibold text-[#17191D] shadow-xs">
                      Fun With Abacus (Live Platform)
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-gray-200 text-xs font-semibold text-[#17191D] shadow-xs">
                      Jignasa Knowledge Hub
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#6B7280] uppercase">
                  SCOPE AN EDUCATION PLATFORM
                </span>
                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="font-mono text-xs text-[#53BAC1] hover:text-[#17191D] flex items-center gap-1.5 uppercase font-bold transition-colors"
                >
                  <span>Discuss Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#53BAC1]" />
                </button>
              </div>
            </div>

            {/* Category 2: Custom Business Software & ERP */}
            <div className="bg-white border border-gray-200 p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-[#519DD9] hover:shadow-lg transition-all rounded-xl shadow-xs">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F9FAFB] border border-gray-200 font-mono text-[10px] text-[#519DD9] uppercase tracking-wider font-bold">
                    <Database className="w-3.5 h-3.5" />
                    <span>02 // CUSTOM BUSINESS SOFTWARE &amp; ERP</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#6B7280] uppercase">PROVEN IN PRODUCTION</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#17191D] font-sans">
                    Operational Software &amp; Management Portals
                  </h3>
                  <div className="mt-4 p-4 bg-[#F9FAFB] border-l-2 border-[#DB0038] border-r border-t border-b border-gray-200 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#DB0038] font-bold">
                      THE CUSTOMER&apos;S PROBLEM:
                    </span>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      Off-the-shelf ERP and CRM software is bloated, charges recurring per-seat subscriptions, and forces businesses to modify their proven workflows to fit rigid vendor software models.
                    </p>
                  </div>

                  <div className="mt-4 p-4 bg-[#F9FAFB] border-l-2 border-[#519DD9] border-r border-t border-b border-gray-200 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#519DD9] font-bold">
                      OUR ENGINEERED SOLUTION:
                    </span>
                    <p className="text-xs text-[#17191D] leading-relaxed">
                      Tailored business management systems with granular Role-Based Access Control (RBAC), multi-tenant tenancy, ACID transactional integrity, and custom dashboards. You own 100% of the source code.
                    </p>
                  </div>
                </div>

                {/* Proof & Verified Implementation */}
                <div className="p-4 bg-[#F9FAFB] border border-gray-200 space-y-2 rounded-lg">
                  <span className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wider font-bold">
                    VERIFIED IMPLEMENTATIONS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-white border border-gray-200 text-xs font-semibold text-[#17191D] shadow-xs">
                      Varunya ERP Platform (Live In Production)
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-gray-200 text-xs font-semibold text-[#17191D] shadow-xs">
                      Client Command Center (/portal)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#6B7280] uppercase">
                  REQUEST ERP BLUEPRINT
                </span>
                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="font-mono text-xs text-[#519DD9] hover:text-[#17191D] flex items-center gap-1.5 uppercase font-bold transition-colors"
                >
                  <span>Discuss Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#519DD9]" />
                </button>
              </div>
            </div>

            {/* Category 3: AI and Workflow Automation */}
            <div className="bg-white border border-gray-200 p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-[#53BAC1] hover:shadow-lg transition-all rounded-xl shadow-xs">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F9FAFB] border border-gray-200 font-mono text-[10px] text-[#53BAC1] uppercase tracking-wider font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>03 // AI &amp; WORKFLOW AUTOMATION</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#6B7280] uppercase">DETERMINISTIC VERIFICATION</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#17191D] font-sans">
                    Intelligent Retrieval &amp; Document AI
                  </h3>
                  <div className="mt-4 p-4 bg-[#F9FAFB] border-l-2 border-[#DB0038] border-r border-t border-b border-gray-200 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#DB0038] font-bold">
                      THE CUSTOMER&apos;S PROBLEM:
                    </span>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      Organizations want AI leverage, but public AI interfaces risk exposing proprietary customer data, hallucinate wrong numbers, and fail to integrate with corporate databases or file systems.
                    </p>
                  </div>

                  <div className="mt-4 p-4 bg-[#F9FAFB] border-l-2 border-[#53BAC1] border-r border-t border-b border-gray-200 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#53BAC1] font-bold">
                      OUR ENGINEERED SOLUTION:
                    </span>
                    <p className="text-xs text-[#17191D] leading-relaxed">
                      Enterprise Retrieval-Augmented Generation (RAG) pipelines with isolated vector databases (`pgvector`), strict permission guardrails, deterministic audit logs, and verifiable source citations.
                    </p>
                  </div>
                </div>

                {/* Proof & Verified Implementation */}
                <div className="p-4 bg-[#F9FAFB] border border-gray-200 space-y-2 rounded-lg">
                  <span className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wider font-bold">
                    ARCHITECTURAL CAPABILITIES:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-white border border-gray-200 text-xs font-semibold text-[#17191D] shadow-xs">
                      Semantic Document Ingestion
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-gray-200 text-xs font-semibold text-[#17191D] shadow-xs">
                      Isolated Vector Indexing
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-gray-200 text-xs font-semibold text-[#17191D] shadow-xs">
                      Zod Schema Contracts
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#6B7280] uppercase">
                  SCHEDULE AI FEASIBILITY AUDIT
                </span>
                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="font-mono text-xs text-[#53BAC1] hover:text-[#17191D] flex items-center gap-1.5 uppercase font-bold transition-colors"
                >
                  <span>Discuss Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#53BAC1]" />
                </button>
              </div>
            </div>

            {/* Category 4: Infrastructure & Cloud Scaling */}
            <div className="bg-white border border-gray-200 p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-[#F7C200] hover:shadow-lg transition-all rounded-xl shadow-xs">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F9FAFB] border border-gray-200 font-mono text-[10px] text-[#F7C200] uppercase tracking-wider font-bold">
                    <Server className="w-3.5 h-3.5" />
                    <span>04 // CLOUD INFRASTRUCTURE &amp; SCALING</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#6B7280] uppercase">SUB-100MS TARGET</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#17191D] font-sans">
                    High-Velocity Cloud &amp; Database Architecture
                  </h3>
                  <div className="mt-4 p-4 bg-[#F9FAFB] border-l-2 border-[#DB0038] border-r border-t border-b border-gray-200 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#DB0038] font-bold">
                      THE CUSTOMER&apos;S PROBLEM:
                    </span>
                    <p className="text-xs text-[#4B5563] leading-relaxed">
                      Legacy applications suffer from slow page load times, frequent downtime during traffic spikes, poor mobile performance, and uncontrolled cloud bills from unoptimized queries.
                    </p>
                  </div>

                  <div className="mt-4 p-4 bg-[#F9FAFB] border-l-2 border-[#F7C200] border-r border-t border-b border-gray-200 space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#F7C200] font-bold">
                      OUR ENGINEERED SOLUTION:
                    </span>
                    <p className="text-xs text-[#17191D] leading-relaxed">
                      Next.js 14 App Router server-side rendering, global Edge CDN caching, connection-pooled PostgreSQL databases, and sub-100ms response targets deployed directly to your own cloud infrastructure.
                    </p>
                  </div>
                </div>

                {/* Proof & Verified Implementation */}
                <div className="p-4 bg-[#F9FAFB] border border-gray-200 space-y-2 rounded-lg">
                  <span className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wider font-bold">
                    ARCHITECTURE TARGETS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-white border border-gray-200 text-xs font-semibold text-[#17191D] shadow-xs">
                      High-Availability Edge Routing
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-gray-200 text-xs font-semibold text-[#17191D] shadow-xs">
                      Zero Cold-Start Edge Execution
                    </span>
                    <span className="px-2.5 py-1 bg-white border border-gray-200 text-xs font-semibold text-[#17191D] shadow-xs">
                      Turnkey AWS / GCP / Vercel Deployments
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#6B7280] uppercase">
                  AUDIT YOUR INFRASTRUCTURE
                </span>
                <button
                  onClick={() => setConsultModalOpen(true)}
                  className="font-mono text-xs text-[#F7C200] hover:text-[#17191D] flex items-center gap-1.5 uppercase font-bold transition-colors"
                >
                  <span>Discuss Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#F7C200]" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION C — GENUINE PRODUCTS
          Showcases actual existing products with screenshots, users,
          problems solved, and working live links.
          Pure White Canvas with Elevated Surface Panels
          ======================================================== */}
      <section id="products" className="py-24 border-b border-gray-200 bg-white text-[#17191D] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F9FAFB] border border-gray-200 text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.25em] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9] animate-pulse" />
                SECTION C // GENUINE PRODUCTS &amp; PLATFORMS
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#17191D] tracking-tight font-sans">
                Real Software Products <span className="text-[#519DD9]">Ready to Deploy.</span>
              </h2>
              <p className="text-[#4B5563] text-base font-normal leading-relaxed">
                We do not show speculative design concepts. Below are genuine, fully coded software applications engineered by VarunyaTech with verified live URLs and complete source code ownership.
              </p>
            </div>

            <div className="font-mono text-xs text-[#4B5563] shrink-0 flex items-center gap-2 bg-[#F9FAFB] px-3.5 py-2 border border-gray-200 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#53BAC1]" />
              <span>STATUS: <strong className="text-[#17191D]">LIVE PRODUCTION DEMOS</strong></span>
            </div>
          </div>

          {/* Product 1: Flagship Showcase - Varunya ERP Platform */}
          <div className="p-8 sm:p-12 bg-white border border-gray-200 shadow-lg relative overflow-hidden group rounded-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Image Preview (7 cols) */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 overflow-hidden border border-gray-200 bg-[#F9FAFB] rounded-lg">
                <img
                  src="/images/products/erp-platform.jpg"
                  alt="Varunya ERP Platform Interface"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 bg-white/95 border border-[#519DD9] font-mono text-[10px] text-[#519DD9] uppercase tracking-wider shadow-sm font-bold backdrop-blur">
                  <span className="w-2 h-2 rounded-full bg-[#519DD9] animate-pulse" />
                  RELEASED PRODUCT // LIVE IN PRODUCTION
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-[#17191D] bg-white/95 p-3 border border-gray-200 shadow-sm backdrop-blur rounded">
                  <span>USERS: Enterprise Operations &amp; Warehouse Teams</span>
                  <span className="text-[#519DD9] font-bold">STATUS: OPERATIONAL</span>
                </div>
              </div>

              {/* Product Details (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="font-mono text-[11px] text-[#519DD9] uppercase tracking-widest flex items-center gap-2 font-bold">
                    <Database className="w-3.5 h-3.5" />
                    PRODUCT 01 // ENTERPRISE MANAGEMENT
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#17191D] font-sans mt-2">
                    Varunya ERP Platform
                  </h3>
                  <p className="text-sm text-[#4B5563] font-normal leading-relaxed mt-3">
                    A centralized enterprise operations platform that eliminates fragmented spreadsheets. Provides role-based access control, inventory tracking, and operational analytics.
                  </p>
                </div>

                <div className="space-y-2 border-t border-gray-200 pt-4">
                  <div className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wider font-bold">
                    KEY PRODUCT CAPABILITIES:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#17191D]">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#519DD9] shrink-0 font-bold" />
                      <span>Zero-Trust RBAC</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#519DD9] shrink-0 font-bold" />
                      <span>PostgreSQL 16 ACID</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#519DD9] shrink-0 font-bold" />
                      <span>Order Management</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#519DD9] shrink-0 font-bold" />
                      <span>Multi-Tenant DB</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Next.js 14", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"].map((tech) => (
                    <span key={tech} className="font-mono text-[10px] px-2.5 py-1 bg-[#F9FAFB] border border-gray-200 text-[#17191D] font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-4">
                  <a
                    href="https://erp-tan-six.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#519DD9] text-[#FFFFFF] hover:bg-[#3d8ac4] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-xs rounded"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => setConsultModalOpen(true)}
                    className="font-mono text-xs text-[#519DD9] hover:text-[#17191D] underline font-bold"
                  >
                    Request Custom Deployment →
                  </button>
                </div>
              </div>

            </div>
          </div>

          {/* Products 2, 3, 4: Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Product 2: Fun With Abacus */}
            <div className="bg-white border border-gray-200 p-6 flex flex-col justify-between space-y-6 group hover:border-[#53BAC1] hover:shadow-lg transition-all rounded-xl shadow-xs">
              <div className="space-y-5">
                <div className="relative h-48 overflow-hidden border border-gray-200 bg-[#F9FAFB] rounded-lg">
                  <img
                    src="/images/products/fun-with-abacus.jpg"
                    alt="Fun With Abacus Learning Suite"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-white/95 border border-[#53BAC1] font-mono text-[9px] text-[#53BAC1] font-bold uppercase tracking-wider shadow-xs backdrop-blur">
                    RELEASED PRODUCT // LIVE
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-white/95 border border-gray-200 font-mono text-[9px] text-[#17191D] font-semibold backdrop-blur">
                    EDTECH SUITE
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#53BAC1] font-bold">
                    STUDENTS &amp; TUTORING ACADEMIES
                  </div>
                  <h3 className="text-xl font-bold text-[#17191D] font-sans mt-1">
                    Fun With Abacus
                  </h3>
                  <p className="text-xs text-[#4B5563] font-normal leading-relaxed mt-2">
                    Digital mental math practice suite with responsive 2D canvas bead manipulation. Replaces physical plastic abacus boards with an engaging, interactive web application.
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-gray-200 pt-3">
                  <div className="font-mono text-[9px] text-[#6B7280] uppercase tracking-wider font-bold">
                    CORE HIGHLIGHTS:
                  </div>
                  <div className="space-y-1 text-xs text-[#17191D]">
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 shrink-0 text-[#53BAC1]" />
                      <span>Interactive touch bead canvas</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 shrink-0 text-[#53BAC1]" />
                      <span>Automated skill drill progression</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 shrink-0 text-[#53BAC1]" />
                      <span>Instant student feedback &amp; scoring</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {["React.js", "HTML5 Canvas", "Web Audio API", "Tailwind CSS", "Vercel"].map((tech) => (
                    <span key={tech} className="font-mono text-[8px] px-2 py-0.5 bg-[#F9FAFB] border border-gray-200 text-[#17191D] font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#6B7280]">
                  PUBLIC PLATFORM
                </span>
                <a
                  href="https://funwithabacus.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#53BAC1] text-[#FFFFFF] hover:bg-[#3ca3aa] font-mono text-[10px] uppercase tracking-wider font-bold transition-colors shadow-xs rounded"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Product 3: Jignasa Knowledge Hub */}
            <div className="bg-white border border-gray-200 p-6 flex flex-col justify-between space-y-6 group hover:border-[#519DD9] hover:shadow-lg transition-all rounded-xl shadow-xs">
              <div className="space-y-5">
                <div className="relative h-48 overflow-hidden border border-gray-200 bg-[#F9FAFB] rounded-lg">
                  <img
                    src="/images/products/jignasa.jpg"
                    alt="Jignasa Knowledge Portal"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-white/95 border border-[#519DD9] font-mono text-[9px] text-[#519DD9] font-bold uppercase tracking-wider shadow-xs backdrop-blur">
                    RELEASED PRODUCT // LIVE
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-white/95 border border-gray-200 font-mono text-[9px] text-[#17191D] font-semibold backdrop-blur">
                    KNOWLEDGE HUB
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#519DD9] font-bold">
                    STUDENTS &amp; RESEARCH TEAMS
                  </div>
                  <h3 className="text-xl font-bold text-[#17191D] font-sans mt-1">
                    Jignasa Knowledge Portal
                  </h3>
                  <p className="text-xs text-[#4B5563] font-normal leading-relaxed mt-2">
                    Structured educational platform engineered for sub-second content retrieval, searchable curriculum modules, and distraction-free responsive reading.
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-gray-200 pt-3">
                  <div className="font-mono text-[9px] text-[#6B7280] uppercase tracking-wider font-bold">
                    CORE HIGHLIGHTS:
                  </div>
                  <div className="space-y-1 text-xs text-[#17191D]">
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 shrink-0 text-[#519DD9]" />
                      <span>Instant sub-second search indexing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 shrink-0 text-[#519DD9]" />
                      <span>Optimized reading typography</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 shrink-0 text-[#519DD9]" />
                      <span>Zero layout shift on mobile</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Vercel"].map((tech) => (
                    <span key={tech} className="font-mono text-[8px] px-2 py-0.5 bg-[#F9FAFB] border border-gray-200 text-[#17191D] font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#6B7280]">
                  PUBLIC PLATFORM
                </span>
                <a
                  href="https://jignasa.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#519DD9] text-[#FFFFFF] hover:bg-[#3d8ac4] font-mono text-[10px] uppercase tracking-wider font-bold transition-colors shadow-xs rounded"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Product 4: Client Command Center (Internal Tool & Portal) */}
            <div className="bg-white border border-gray-200 p-6 flex flex-col justify-between space-y-6 group hover:border-[#F7C200] hover:shadow-lg transition-all rounded-xl shadow-xs">
              <div className="space-y-5">
                <div className="relative h-48 overflow-hidden border border-gray-200 bg-[#F9FAFB] p-5 flex flex-col justify-between text-[#17191D] font-mono rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#53BAC1] font-bold">CLIENT_PORTAL // SECURE</span>
                    <span className="w-2 h-2 rounded-full bg-[#53BAC1] animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-[#6B7280]">LIVE MILESTONE TRACKER</div>
                    <div className="text-lg font-bold text-[#17191D]">Sprint 03 / Handover Ready</div>
                    <div className="w-full bg-gray-200 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#53BAC1] h-1.5 w-4/5" />
                    </div>
                  </div>
                  <div className="text-[9px] text-[#6B7280]">
                    ROLE-BASED RBAC ACCESS • ENCRYPTED
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#F7C200] font-bold">
                    COMMISSIONING CLIENTS &amp; PROJECT LEADS
                  </div>
                  <h3 className="text-xl font-bold text-[#17191D] font-sans mt-1">
                    Client Command Center
                  </h3>
                  <p className="text-xs text-[#4B5563] font-normal leading-relaxed mt-2">
                    Our project telemetry portal where clients track sprint progress, review live staging builds, inspect deliverables, and coordinate directly with developers.
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-gray-200 pt-3">
                  <div className="font-mono text-[9px] text-[#6B7280] uppercase tracking-wider font-bold">
                    CLIENT ADVANTAGES:
                  </div>
                  <div className="space-y-1 text-xs text-[#17191D]">
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 shrink-0 text-[#F7C200]" />
                      <span>Live sprint milestone progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 shrink-0 text-[#F7C200]" />
                      <span>Repository credential and handover sharing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 shrink-0 text-[#F7C200]" />
                      <span>Direct developer communication channel</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {["Next.js App Router", "JWT Auth", "RBAC", "Prisma"].map((tech) => (
                    <span key={tech} className="font-mono text-[8px] px-2 py-0.5 bg-[#F9FAFB] border border-gray-200 text-[#17191D] font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200 flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#6B7280]">
                  INTERNAL CLIENT TOOL
                </span>
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 text-[#17191D] border border-gray-300 hover:border-[#F7C200] font-mono text-[10px] uppercase tracking-wider font-bold transition-colors shadow-xs rounded"
                >
                  <span>Open Client Portal</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION D — SELECTED WORK & CASE STUDIES
          Concise, honest case studies highlighting original problems,
          solutions implemented, and verified live outcomes.
          Soft Gray Foundation #F9FAFB
          ======================================================== */}
      <section id="works" className="py-24 border-b border-gray-200 bg-[#F9FAFB] text-[#17191D] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.25em] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9] animate-pulse" />
                SECTION D // VERIFIED CASE STUDIES
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#17191D] tracking-tight font-sans">
                What We Have Actually <span className="text-[#519DD9]">Engineered.</span>
              </h2>
              <p className="text-[#4B5563] text-base font-normal leading-relaxed">
                Case studies of genuine systems engineered by VarunyaTech. Each project outlines the original operational problem, the architecture delivered, and verified live production links.
              </p>
            </div>

            <Link
              href="/portfolio"
              className="font-mono text-xs text-[#519DD9] hover:text-[#17191D] flex items-center gap-2 uppercase tracking-wider shrink-0 font-bold"
            >
              <span>View Portfolio Index</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Case Studies Cards */}
          <div className="space-y-10">
            {PORTFOLIO_DATA.slice(0, 3).map((item, idx) => (
              <div 
                key={item.id}
                className="p-8 sm:p-10 bg-white border border-gray-200 shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center rounded-xl"
              >
                {/* Visual / Screenshot (5 cols) */}
                <div className="lg:col-span-5 relative h-64 sm:h-80 overflow-hidden border border-gray-200 bg-[#F9FAFB] rounded-lg">
                  <img
                    src={item.heroImage}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/95 border border-[#519DD9] font-mono text-[9px] text-[#519DD9] font-bold uppercase backdrop-blur shadow-xs">
                    CASE STUDY // 0{idx + 1}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 bg-white/95 border border-gray-200 font-mono text-[9px] text-[#17191D] flex items-center justify-between backdrop-blur rounded shadow-xs">
                    <span>SECTOR: {item.industry}</span>
                    <span className="text-[#53BAC1] font-bold">SPRINT: {item.durationDays} DAYS</span>
                  </div>
                </div>

                {/* Case Narrative (7 cols) */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <div className="font-mono text-[10px] text-[#519DD9] uppercase tracking-wider font-bold">
                      {item.category} • {item.client}
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] font-sans mt-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* Problem vs Solution breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-[#F9FAFB] border-l-2 border-[#DB0038] border-r border-t border-b border-gray-200 space-y-1 rounded-r-lg">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#DB0038] font-bold">
                        THE ORIGINAL PROBLEM:
                      </span>
                      <p className="text-[#4B5563] leading-relaxed">
                        {item.challenge}
                      </p>
                    </div>

                    <div className="p-4 bg-[#F9FAFB] border-l-2 border-[#519DD9] border-r border-t border-b border-gray-200 space-y-1 rounded-r-lg">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#519DD9] font-bold">
                        THE SOLUTION DELIVERED:
                      </span>
                      <p className="text-[#17191D] leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  </div>

                  {/* Architecture & Tech Stack */}
                  <div className="space-y-2 border-t border-gray-200 pt-3">
                    <div className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wider">
                      ARCHITECTURE: <strong className="text-[#17191D]">{item.architecture}</strong>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.map((tech) => (
                        <span key={tech} className="font-mono text-[9px] px-2 py-0.5 bg-[#F9FAFB] border border-gray-200 text-[#17191D] font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Live Launch Action */}
                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3 font-mono text-[10px] text-[#6B7280]">
                      {item.impactMetrics.slice(0, 2).map((m, i) => (
                        <span key={i}>
                          {m.label}: <strong className="text-[#17191D]">{m.value}</strong>
                        </span>
                      ))}
                    </div>

                    {item.liveDemoUrl && (
                      <a
                        href={item.liveDemoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#519DD9] text-[#FFFFFF] hover:bg-[#3d8ac4] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-xs rounded"
                      >
                        <span>Launch Live Platform</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ========================================================
          PURPOSEFUL ENGINEERING DEEP-DIVE
          Explains how software components connect and how AI workflows operate.
          Integrated cleanly without disrupting customer clarity.
          ======================================================== */}
      <section id="engineering" className="py-24 border-b border-gray-200 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F9FAFB] border border-gray-200 text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.25em] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]" />
              ENGINEERING ARCHITECTURE // HOW COMPONENTS CONNECT
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#17191D] tracking-tight font-sans">
              Purposeful System <span className="text-[#519DD9]">Architecture.</span>
            </h2>
            <p className="text-[#4B5563] text-base font-normal leading-relaxed">
              Inspect how we architect software tier-by-tier: from edge ingress caching and zero-trust authentication to multi-tenant database persistence and deterministic vector AI pipelines.
            </p>
          </div>

          {/* Interactive Tier Architecture Simulation */}
          <StageArchitecture />

          {/* Interactive AI Pipeline Simulation */}
          <div className="pt-10 border-t border-gray-200">
            <StageAiPipeline />
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION E — HOW WE WORK
          Transparent 5-Stage Delivery Process
          Clear expectations, milestones, and timelines.
          ======================================================== */}
      {/* ========================================================
          SECTION E — HOW WE WORK
          Transparent 5-Stage Delivery Process
          Clear expectations, milestones, and timelines.
          ======================================================== */}
      <section id="process" className="py-24 border-b border-gray-200 bg-[#F9FAFB] text-[#17191D] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.25em] shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9] animate-pulse" />
                SECTION E // TRANSPARENT DELIVERY PROCESS
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#17191D] tracking-tight font-sans">
                How We Deliver <span className="text-[#519DD9]">Your Project.</span>
              </h2>
              <p className="text-[#4B5563] text-base font-normal leading-relaxed">
                No speculative time-and-materials billing or endless scope drift. We operate on a disciplined 30–40 day milestone roadmap with continuous client visibility.
              </p>
            </div>

            <div className="font-mono text-xs text-[#4B5563] shrink-0 bg-white px-3.5 py-2 border border-gray-200 shadow-xs">
              TOTAL CYCLE: <strong className="text-[#17191D]">30–40 CALENDAR DAYS</strong>
            </div>
          </div>

          {/* 5-Stage Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            
            {/* Stage 1 */}
            <div className="p-6 bg-white border border-gray-200 flex flex-col justify-between space-y-6 hover:border-[#519DD9] transition-colors shadow-xs rounded-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#519DD9]">STAGE 01</span>
                  <span className="font-mono text-[9px] text-[#6B7280] px-2 py-0.5 bg-[#F9FAFB] border border-gray-200 rounded">
                    DAYS 1–5
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#17191D]">
                  Discovery &amp; Scoping
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Focused scoping discussions auditing your workflows, defining technical deliverables, and locking in acceptance benchmarks.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2 text-[11px] text-[#17191D]">
                <div className="font-mono text-[9px] text-[#6B7280] uppercase font-bold">DELIVERABLES:</div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#519DD9] shrink-0" />
                  <span>Technical Scoping Doc</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#519DD9] shrink-0" />
                  <span>Architecture blueprint</span>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="p-6 bg-white border border-gray-200 flex flex-col justify-between space-y-6 hover:border-[#519DD9] transition-colors shadow-xs rounded-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#519DD9]">STAGE 02</span>
                  <span className="font-mono text-[9px] text-[#6B7280] px-2 py-0.5 bg-[#F9FAFB] border border-gray-200 rounded">
                    DAYS 6–10
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#17191D]">
                  Design &amp; Specifications
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Interactive UI/UX prototypes, database schema modeling, and API contract specifications locked in with fixed milestone pricing.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2 text-[11px] text-[#17191D]">
                <div className="font-mono text-[9px] text-[#6B7280] uppercase font-bold">DELIVERABLES:</div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#519DD9] shrink-0" />
                  <span>Figma UI/UX prototype</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#519DD9] shrink-0" />
                  <span>Fixed milestone contract</span>
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="p-6 bg-white border border-gray-200 flex flex-col justify-between space-y-6 hover:border-[#53BAC1] transition-colors shadow-xs rounded-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#53BAC1]">STAGE 03</span>
                  <span className="font-mono text-[9px] text-[#6B7280] px-2 py-0.5 bg-[#F9FAFB] border border-gray-200 rounded">
                    DAYS 11–30
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#17191D]">
                  Development &amp; Testing
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Fast development sprints with continuous staging access. Strict automated unit, integration, and security checks.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2 text-[11px] text-[#17191D]">
                <div className="font-mono text-[9px] text-[#6B7280] uppercase font-bold">DELIVERABLES:</div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#53BAC1] shrink-0" />
                  <span>Live staging environment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#53BAC1] shrink-0" />
                  <span>Quality test report</span>
                </div>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="p-6 bg-white border border-gray-200 flex flex-col justify-between space-y-6 hover:border-[#DB0038] transition-colors shadow-xs rounded-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#DB0038]">STAGE 04</span>
                  <span className="font-mono text-[9px] text-[#6B7280] px-2 py-0.5 bg-[#F9FAFB] border border-gray-200 rounded">
                    DAYS 31–36
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#17191D]">
                  Deployment &amp; Handover
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  Production cloud deployment directly into your accounts. Complete source code repository and database schema ownership transfer.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2 text-[11px] text-[#17191D]">
                <div className="font-mono text-[9px] text-[#6B7280] uppercase font-bold">DELIVERABLES:</div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#DB0038] shrink-0" />
                  <span>Production cloud release</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#DB0038] shrink-0" />
                  <span>100% Git repo transfer</span>
                </div>
              </div>
            </div>

            {/* Stage 5 */}
            <div className="p-6 bg-white border border-gray-200 flex flex-col justify-between space-y-6 hover:border-[#F7C200] transition-colors shadow-xs rounded-xl">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#F7C200]">STAGE 05</span>
                  <span className="font-mono text-[9px] text-[#6B7280] px-2 py-0.5 bg-[#F9FAFB] border border-gray-200 rounded">
                    POST-LAUNCH
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#17191D]">
                  Maintenance &amp; Support
                </h3>
                <p className="text-xs text-[#4B5563] leading-relaxed">
                  30-day post-launch warranty covering any bug fixes and performance tuning, followed by continuous client support arrangements.
                </p>
              </div>

              <div className="pt-4 border-t border-gray-200 space-y-2 text-[11px] text-[#17191D]">
                <div className="font-mono text-[9px] text-[#6B7280] uppercase font-bold">DELIVERABLES:</div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F7C200] shrink-0" />
                  <span>30-Day warranty coverage</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#F7C200] shrink-0" />
                  <span>Health monitoring &amp; backups</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION F — TRUST AND ENGINEERING PRACTICES
          Accurate, verifiable practices: Security, QA, Data Ownership,
          Flexible Deployment, and Support.
          ======================================================== */}
      <section id="trust" className="py-24 border-b border-gray-200 bg-white text-[#17191D] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F9FAFB] border border-gray-200 text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.25em] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]" />
              SECTION F // CREDIBILITY &amp; ENGINEERING STANDARDS
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#17191D] tracking-tight font-sans">
              Rigorous Standards. <span className="text-[#519DD9]">No Artificial Claims.</span>
            </h2>
            <p className="text-[#4B5563] text-base font-normal leading-relaxed">
              We earn trust through concrete engineering practices: 100% intellectual property ownership, automated testing, zero vendor lock-in, and well-documented code.
            </p>
          </div>

          {/* 6 Trust Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Pillar 1: 100% IP Ownership */}
            <div className="p-8 bg-[#F9FAFB] border border-gray-200 shadow-xs space-y-4 hover:border-[#DB0038] transition-colors rounded-xl">
              <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-[#DB0038] rounded-lg shadow-xs">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#17191D]">
                100% IP &amp; Source Code Rights
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                You own every repository, commit, database migration, and design asset upon handover. There is zero recurring licensing fee or vendor lock-in.
              </p>
            </div>

            {/* Pillar 2: Security & Privacy */}
            <div className="p-8 bg-[#F9FAFB] border border-gray-200 shadow-xs space-y-4 hover:border-[#519DD9] transition-colors rounded-xl">
              <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-[#519DD9] rounded-lg shadow-xs">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#17191D]">
                Security &amp; Privacy by Design
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Hardened with OWASP defenses, zero-trust RBAC authorization, secure session management, and encrypted data at rest and in transit.
              </p>
            </div>

            {/* Pillar 3: Automated Testing & QA */}
            <div className="p-8 bg-[#F9FAFB] border border-gray-200 shadow-xs space-y-4 hover:border-[#53BAC1] transition-colors rounded-xl">
              <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-[#53BAC1] rounded-lg shadow-xs">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#17191D]">
                Automated Testing &amp; Strict Types
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Strict TypeScript compilation with zero-warning build gates. Automated integration checks ensure reliable regression-free releases.
              </p>
            </div>

            {/* Pillar 4: Flexible Cloud Hosting */}
            <div className="p-8 bg-[#F9FAFB] border border-gray-200 shadow-xs space-y-4 hover:border-[#F7C200] transition-colors rounded-xl">
              <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-[#F7C200] rounded-lg shadow-xs">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#17191D]">
                Flexible Hosting &amp; Cloud Options
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                We deploy directly into your cloud accounts—AWS, Google Cloud, Vercel, Supabase, or on-premises servers. You retain administrative control.
              </p>
            </div>

            {/* Pillar 5: Documentation & Turnkey Handover */}
            <div className="p-8 bg-[#F9FAFB] border border-gray-200 shadow-xs space-y-4 hover:border-[#519DD9] transition-colors rounded-xl">
              <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-[#519DD9] rounded-lg shadow-xs">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#17191D]">
                Comprehensive Handover Docs
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Every release includes full API schemas, environment configuration runbooks, database schemas, and guided walkthrough sessions.
              </p>
            </div>

            {/* Pillar 6: Ongoing Support Arrangements */}
            <div className="p-8 bg-[#F9FAFB] border border-gray-200 shadow-xs space-y-4 hover:border-[#53BAC1] transition-colors rounded-xl">
              <div className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 text-[#53BAC1] rounded-lg shadow-xs">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#17191D]">
                Guaranteed Post-Launch Support
              </h3>
              <p className="text-xs text-[#4B5563] leading-relaxed">
                Direct access to the engineers who built your platform. 30-day initial warranty included, with transparent ongoing support SLAs available.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION G — FINAL CTA & FUNCTIONAL ENQUIRY
          "Let's solve something meaningful."
          Functional enquiry form connected to persistent server storage.
          ======================================================== */}
      {/* ========================================================
          SECTION G — FINAL CTA & FUNCTIONAL ENQUIRY
          "Let's solve something meaningful."
          Functional enquiry form connected to persistent server storage.
          ======================================================== */}
      <section id="contact" className="py-24 lg:py-32 bg-[#F9FAFB] border-b border-gray-200 relative overflow-hidden">
        {/* Luminous ambient backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#519DD9]/10 blur-[200px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="bg-white border border-gray-200 shadow-xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start rounded-2xl">
            
            {/* Left Column: Proposition & Next Steps (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F9FAFB] border border-gray-200 font-mono text-[10px] uppercase tracking-[0.25em] text-[#519DD9] shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9] animate-ping" />
                  SECTION G // DIRECT ENGINEERING ENQUIRY
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-[#17191D] uppercase tracking-tight leading-[1]">
                  Let&apos;s solve something <br />
                  <span className="font-editorial italic font-light text-[#519DD9] normal-case">meaningful.</span>
                </h2>

                <p className="text-sm text-[#4B5563] leading-relaxed">
                  Tell us about the software challenge your organization is facing. We will review your requirements and provide an actionable architectural scope within 24 hours.
                </p>
              </div>

              {/* What Happens After An Enquiry */}
              <div className="p-6 bg-[#F9FAFB] border border-gray-200 space-y-4 rounded-xl">
                <div className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wider font-bold">
                  WHAT HAPPENS AFTER YOU ENQUIRE:
                </div>

                <div className="space-y-3 font-sans text-xs">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#519DD9] text-white flex items-center justify-center font-mono text-[10px] shrink-0 font-bold shadow-xs">
                      1
                    </span>
                    <div>
                      <strong className="text-[#17191D] block">Architectural Review (within 24 hours)</strong>
                      <span className="text-[#4B5563]">A principal software engineer reviews your brief for technical feasibility and scope.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#53BAC1] text-white flex items-center justify-center font-mono text-[10px] shrink-0 font-bold shadow-xs">
                      2
                    </span>
                    <div>
                      <strong className="text-[#17191D] block">30-Minute Scoping Discussion</strong>
                      <span className="text-[#4B5563]">No sales pressure. A focused conversation on system requirements, integrations, and milestones.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#DB0038] text-white flex items-center justify-center font-mono text-[10px] shrink-0 font-bold shadow-xs">
                      3
                    </span>
                    <div>
                      <strong className="text-[#17191D] block">Fixed-Scope Proposal &amp; Roadmap</strong>
                      <span className="text-[#4B5563]">You receive an itemized 30–40 day milestone roadmap with guaranteed deliverables and pricing.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Email Fallback */}
              <div className="p-4 bg-[#F9FAFB] border border-gray-200 font-mono text-xs text-[#4B5563] flex items-center justify-between rounded-lg">
                <div>
                  <span className="text-[10px] text-[#6B7280] uppercase block">DIRECT EMAIL:</span>
                  <a href="mailto:varunyatech@gmail.com" className="text-[#17191D] font-bold hover:text-[#519DD9] transition-colors">
                    varunyatech@gmail.com
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setConsultModalOpen(true)}
                  className="px-3 py-1.5 bg-white border border-gray-300 text-[#17191D] hover:border-[#519DD9] text-[10px] uppercase font-bold transition-colors rounded shadow-xs"
                >
                  Schedule Call
                </button>
              </div>

            </div>

            {/* Right Column: Functional Project Enquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#F9FAFB] border border-gray-200 p-8 sm:p-10 shadow-xs rounded-xl">
              
              {formSubmitted ? (
                <div className="p-8 bg-white border border-[#53BAC1] text-center space-y-4 rounded-xl shadow-xs">
                  <div className="w-12 h-12 rounded-full bg-[#53BAC1]/20 text-[#53BAC1] flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle2 className="w-6 h-6 text-[#53BAC1]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#17191D]">
                    Enquiry Persisted Successfully
                  </h3>
                  <p className="text-xs text-[#4B5563] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#17191D]">{formName}</strong>. Your enquiry has been persisted to our engineering CRM with tracking reference <span className="font-mono text-[#519DD9] font-bold">{formLeadId}</span>. A principal software architect will review your project brief and respond to <strong className="text-[#53BAC1]">{formEmail}</strong> within 24 business hours.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setFormProblem("");
                      }}
                      className="px-6 py-2.5 bg-[#519DD9] text-[#FFFFFF] font-mono text-xs uppercase tracking-wider font-bold hover:bg-[#3d8ac4] transition-all rounded shadow-xs"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[#17191D] font-sans">
                      Discuss a Project with Our Engineers
                    </h3>
                    <p className="text-xs text-[#4B5563]">
                      Fill out the brief below to start your 30–40 day development sprint.
                    </p>
                  </div>

                  {formError && (
                    <div className="p-3 bg-[#DB0038]/15 border border-[#DB0038]/30 rounded-lg flex items-center gap-2.5 text-[#DB0038] text-xs">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-[#17191D] uppercase tracking-wider font-bold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 text-xs text-[#17191D] placeholder-[#9CA3AF] focus:outline-none focus:border-[#519DD9] focus:ring-1 focus:ring-[#519DD9] shadow-xs rounded-lg transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-[#17191D] uppercase tracking-wider font-bold">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="elena@company.com"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 text-xs text-[#17191D] placeholder-[#9CA3AF] focus:outline-none focus:border-[#519DD9] focus:ring-1 focus:ring-[#519DD9] shadow-xs rounded-lg transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-[#17191D] uppercase tracking-wider font-bold">
                        Organization / Company
                      </label>
                      <input
                        type="text"
                        value={formOrg}
                        onChange={(e) => setFormOrg(e.target.value)}
                        placeholder="Company or Project Name"
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 text-xs text-[#17191D] placeholder-[#9CA3AF] focus:outline-none focus:border-[#519DD9] focus:ring-1 focus:ring-[#519DD9] shadow-xs rounded-lg transition-colors"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-[#17191D] uppercase tracking-wider font-bold">
                        Type of Requirement
                      </label>
                      <select
                        value={formProjectType}
                        onChange={(e) => setFormProjectType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-white border border-gray-300 text-xs text-[#17191D] focus:outline-none focus:border-[#519DD9] focus:ring-1 focus:ring-[#519DD9] shadow-xs rounded-lg transition-colors"
                      >
                        <option value="Custom Business Software / ERP">Custom Business Software / ERP</option>
                        <option value="Education & Learning Platforms">Education &amp; Learning Platforms</option>
                        <option value="AI & Workflow Automation">AI &amp; Workflow Automation</option>
                        <option value="Cloud Architecture & Migration">Cloud Architecture &amp; Migration</option>
                        <option value="Product Demonstration Request">Product Demonstration Request</option>
                        <option value="Other Architectural Need">Other Architectural Need</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block font-mono text-[10px] text-[#17191D] uppercase tracking-wider font-bold">
                      Brief Description of the Problem / Goals * (Min 10 characters)
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formProblem}
                      onChange={(e) => setFormProblem(e.target.value)}
                      placeholder="Describe the operational challenge you need solved, current bottlenecks, desired timeline, or key feature requirements..."
                      className="w-full px-3.5 py-2.5 bg-white border border-gray-300 text-xs text-[#17191D] placeholder-[#9CA3AF] focus:outline-none focus:border-[#519DD9] focus:ring-1 focus:ring-[#519DD9] shadow-xs leading-relaxed rounded-lg transition-colors"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#DB0038] hover:bg-[#b5002e] text-[#FFFFFF] font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(219,0,56,0.25)] disabled:opacity-50 rounded"
                    >
                      {formSubmitting ? (
                        <span>Persisting To Pipeline...</span>
                      ) : (
                        <>
                          <span>Submit Project Enquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <span className="font-mono text-[10px] text-[#6B7280]">
                      Strict Privacy • 100% IP Transfer
                    </span>
                  </div>
                </form>
              )}

            </div>

          </div>

        </div>
      </section>

      {/* Global 1-on-1 Consultation Modal */}
      <ConsultationModal isOpen={consultModalOpen} onClose={() => setConsultModalOpen(false)} />

    </div>
  );
}
