"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  ArrowRight, 
  ArrowDownRight, 
  ArrowUpRight,
  ExternalLink,
  ShieldCheck, 
  Cpu, 
  Layers, 
  Terminal, 
  Globe, 
  Database, 
  Server, 
  Check, 
  Clock,
  Sparkles,
  Activity,
  Code2,
  Workflow,
  Lock,
  GitBranch,
  Zap,
  BookOpen,
  School,
  FileCode2,
  AlertCircle,
  CheckCircle2,
  Send,
  Mail,
  Building2,
  ChevronRight,
  Shield,
  FileText
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
  const [formLeadId, setFormLeadId] = useState("");

  useEffect(() => {
    setConfig(getStoredHomepageConfig());
    const unsubscribe = subscribeHomepageUpdates((updated) => {
      setConfig(updated);
    });
    return () => unsubscribe();
  }, []);

  const handleEnquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formProblem) return;

    setFormSubmitting(true);
    const leadId = `ENG-${Date.now().toString().slice(-4)}`;

    const newLead = {
      id: leadId,
      fullName: formName,
      company: formOrg || "Independent Client",
      email: formEmail,
      serviceNeeded: formProjectType,
      projectScope: formProblem,
      status: "NEW",
      createdAt: new Date().toISOString()
    };

    try {
      const existing = localStorage.getItem("velocity_leads_data");
      const list = existing ? JSON.parse(existing) : [];
      list.unshift(newLead);
      localStorage.setItem("velocity_leads_data", JSON.stringify(list));
    } catch (err) {
      console.error("Error saving enquiry lead:", err);
    }

    setTimeout(() => {
      setFormLeadId(leadId);
      setFormSubmitting(false);
      setFormSubmitted(true);
    }, 600);
  };

  const visibleProjects = config.projects.projects.filter(p => p.visible !== false);
  const flagshipProject = visibleProjects.find(p => p.id === "p1") || visibleProjects[0];
  const secondaryProjects = visibleProjects.filter(p => p.id !== flagshipProject?.id);

  return (
    <div className="relative bg-[#FAFAF8] text-[#111215] overflow-hidden font-sans">
      
      {/* ========================================================
          SECTION A — HERO / PROPOSITION
          "Your challenges. Our engineering."
          Ivory Canvas with Digital Blue & Aqua Accents
          ======================================================== */}
      <section id="hero" className="relative min-h-[90vh] flex flex-col justify-between border-b border-[#E5E2DB] bg-[#FAFAF8]">
        {/* Subtle luminous ambient glow */}
        <div className="absolute top-1/4 left-1/4 w-[450px] h-[450px] rounded-full bg-[#519DD9]/8 blur-[160px] pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-[#C89B3C]/8 blur-[150px] pointer-events-none" />

        {/* Top Telemetry Header Ribbon */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-6 pb-4 flex flex-wrap items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#565961] border-b border-[#E5E2DB]">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#519DD9] shadow-[0_0_8px_#519DD9] animate-pulse" />
            <span className="text-[#111215] font-bold">VARUNYA<span className="text-[#519DD9] font-normal">TECH</span></span>
            <span className="text-[#D4D0C5]">/</span>
            <span className="text-[#519DD9] font-semibold">ENGINEERING &amp; SOFTWARE ARCHITECTURE</span>
          </div>

          <div className="flex items-center gap-6">
            <span className="hidden md:inline text-[#565961]">DELIVERY SLA: <strong className="text-[#111215]">30–40 DAY SPRINTS</strong></span>
            <span className="text-[#111215] font-semibold flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#F7C200] animate-pulse" />
              <span>[ SYSTEMS OPERATIONAL ]</span>
            </span>
          </div>
        </div>

        {/* Hero Two-Column Layout */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center flex-1">
          
          {/* Left Column: Customer-First Proposition & Call to Action (6 cols) */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] font-mono text-[10px] tracking-[0.25em] text-[#519DD9] uppercase shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]" />
              <span>CUSTOM SOFTWARE &amp; AI ENGINEERING</span>
            </div>

            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-extrabold text-[#111215] tracking-tight uppercase leading-[0.98]">
              Your challenges. <br />
              Our <span className="font-editorial font-light italic text-[#519DD9] normal-case">engineering.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#4A4D54] leading-relaxed max-w-xl font-normal">
              We build software, AI solutions, and digital systems designed around real business problems. From custom ERP engines and interactive education platforms to autonomous AI workflows, we engineer production systems that drive measurable operations.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <a
                href="#contact"
                className="px-8 py-4 bg-[#111215] text-[#FFFFFF] hover:bg-[#519DD9] hover:text-[#111215] font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2.5 shadow-md"
              >
                <span>Discuss a project</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#works"
                className="px-8 py-4 bg-[#FFFFFF] text-[#111215] hover:bg-[#F5F3EF] font-mono text-xs uppercase tracking-widest font-semibold transition-all flex items-center justify-center gap-2.5 border border-[#E5E2DB] hover:border-[#111215] shadow-sm"
              >
                <span>Explore our work</span>
                <ArrowDownRight className="w-4 h-4 text-[#519DD9]" />
              </a>
            </div>

            {/* Credibility Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#E5E2DB] font-mono text-xs">
              <div className="p-3 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm">
                <div className="text-[10px] text-[#71757E] uppercase">SPRINT CYCLE</div>
                <div className="text-sm font-bold text-[#111215] mt-0.5">30–40 DAYS</div>
              </div>
              <div className="p-3 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm">
                <div className="text-[10px] text-[#71757E] uppercase">PRODUCTION APPS</div>
                <div className="text-sm font-bold text-[#53BAC1] mt-0.5">4 VERIFIED</div>
              </div>
              <div className="p-3 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm">
                <div className="text-[10px] text-[#71757E] uppercase">IP TRANSFER</div>
                <div className="text-sm font-bold text-[#DB0038] mt-0.5">100% OWNED</div>
              </div>
              <div className="p-3 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm">
                <div className="text-[10px] text-[#71757E] uppercase">LATENCY SLA</div>
                <div className="text-sm font-bold text-[#C89B3C] mt-0.5">&lt; 100MS P95</div>
              </div>
            </div>

          </div>

          {/* Right Column: Software Architecture Visual Simulation (6 cols) */}
          <div className="lg:col-span-6 w-full">
            <HeroSystemGraph />
          </div>

        </div>

        {/* Bottom Ticker Ribbon */}
        <div className="relative z-10 w-full bg-[#F5F3EF] border-t border-[#E5E2DB] py-2.5 overflow-hidden font-mono text-[10px] uppercase tracking-[0.25em] text-[#565961]">
          <div className="flex whitespace-nowrap gap-12 items-center animate-marquee">
            <span className="text-[#519DD9] font-semibold">• ENTERPRISE ERP ARCHITECTURES</span>
            <span className="text-[#53BAC1] font-semibold">• INTERACTIVE EDTECH PLATFORMS</span>
            <span className="text-[#DB0038] font-semibold">• PRIVATE VECTOR AI RETRIEVAL</span>
            <span className="text-[#519DD9] font-semibold">• 100% INTELLECTUAL PROPERTY TRANSFER</span>
            <span className="text-[#111215] font-semibold">• STRICT TYPESCRIPT 5.7 COMPILATION</span>
            <span className="text-[#53BAC1] font-semibold">• DISCIPLINED 30–40 DAY DELIVERY SPRINTS</span>
            <span className="text-[#C89B3C] font-semibold">• CONTINUOUS POST-LAUNCH SUPPORT</span>
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
          Warm Ivory Surface #F0EEE9 · Accent #519DD9 · Cards #FFFFFF
          ======================================================== */}
      <section id="problems" className="py-24 border-b border-[#E5E2DB] bg-[#F0EEE9] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E2DB] pb-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.25em] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9] animate-pulse" />
                SECTION B // REAL BUSINESS CHALLENGES
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111215] tracking-tight font-sans">
                Customer Problems We Solve <span className="text-[#519DD9]">With Engineering.</span>
              </h2>
              <p className="text-[#4A4D54] text-base font-normal leading-relaxed">
                Generic SaaS software locks you into perpetual subscriptions and rigid templates. We engineer tailored software architectures that address your company&apos;s actual operational bottlenecks.
              </p>
            </div>

            <div className="font-mono text-xs text-[#565961] shrink-0 flex items-center gap-2 bg-[#FFFFFF] px-3.5 py-2 border border-[#E5E2DB] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#53BAC1]" />
              <span>FIXED SCOPE • NO RUNAWAY BILLING</span>
            </div>
          </div>

          {/* 4 Customer Problem-Solution Visual Compositions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* Category 1: Education and Institutional Workflows */}
            <div className="bg-[#FFFFFF] border border-[#E5E2DB] p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-[#111215] hover:shadow-xl transition-all">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F5F3EF] border border-[#E5E2DB] font-mono text-[10px] text-[#53BAC1] uppercase tracking-wider font-bold">
                    <School className="w-3.5 h-3.5" />
                    <span>01 // EDUCATION &amp; INSTITUTIONAL WORKFLOWS</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#71757E] uppercase">PROVEN IN PRODUCTION</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#111215] font-sans">
                    Digital Learning &amp; Student Operations
                  </h3>
                  <div className="mt-4 p-4 bg-[#FDFCFA] border-l-2 border-[#DB0038] space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#DB0038] font-bold">
                      THE CUSTOMER&apos;S PROBLEM:
                    </span>
                    <p className="text-xs text-[#565961] leading-relaxed">
                      Tutoring academies and educational institutions struggle with disconnected student tracking, manual paper reports, and difficulty teaching foundational hands-on skills (like abacus math) in digital formats.
                    </p>
                  </div>

                  <div className="mt-4 p-4 bg-[#FDFCFA] border-l-2 border-[#53BAC1] space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#53BAC1] font-bold">
                      OUR ENGINEERED SOLUTION:
                    </span>
                    <p className="text-xs text-[#4A4D54] leading-relaxed">
                      Custom touch-enabled learning platforms with real-time 2D canvas bead interaction, automated skill mastery tracking, and clean student/teacher portals that work across all desktop and mobile devices.
                    </p>
                  </div>
                </div>

                {/* Proof & Verified Implementation */}
                <div className="p-4 bg-[#FAFAF8] border border-[#E5E2DB] space-y-2">
                  <span className="font-mono text-[10px] text-[#71757E] uppercase tracking-wider font-bold">
                    VERIFIED IMPLEMENTATIONS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-xs font-semibold text-[#111215]">
                      Fun With Abacus (Live Platform)
                    </span>
                    <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-xs font-semibold text-[#111215]">
                      Jignasa Knowledge Hub
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#71757E] uppercase">
                  NEXT STEP: SCOPE AN EDUCATION PLATFORM
                </span>
                <a
                  href="#contact"
                  className="font-mono text-xs text-[#111215] hover:text-[#53BAC1] flex items-center gap-1.5 uppercase font-bold transition-colors"
                >
                  <span>Discuss Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#53BAC1]" />
                </a>
              </div>
            </div>

            {/* Category 2: Custom Business Software & ERP */}
            <div className="bg-[#FFFFFF] border border-[#E5E2DB] p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-[#111215] hover:shadow-xl transition-all">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F5F3EF] border border-[#E5E2DB] font-mono text-[10px] text-[#519DD9] uppercase tracking-wider font-bold">
                    <Database className="w-3.5 h-3.5" />
                    <span>02 // CUSTOM BUSINESS SOFTWARE &amp; ERP</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#71757E] uppercase">PROVEN IN PRODUCTION</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#111215] font-sans">
                    Operational Software &amp; Management Portals
                  </h3>
                  <div className="mt-4 p-4 bg-[#FDFCFA] border-l-2 border-[#DB0038] space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#DB0038] font-bold">
                      THE CUSTOMER&apos;S PROBLEM:
                    </span>
                    <p className="text-xs text-[#565961] leading-relaxed">
                      Off-the-shelf ERP and CRM software is bloated, charges recurring per-user license fees, and forces businesses to change their proven workflows to fit inflexible software templates.
                    </p>
                  </div>

                  <div className="mt-4 p-4 bg-[#FDFCFA] border-l-2 border-[#519DD9] space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#519DD9] font-bold">
                      OUR ENGINEERED SOLUTION:
                    </span>
                    <p className="text-xs text-[#4A4D54] leading-relaxed">
                      Tailored business management systems with granular Role-Based Access Control (RBAC), multi-tenant tenancy, ACID transactional integrity, and custom dashboards. You own 100% of the source code.
                    </p>
                  </div>
                </div>

                {/* Proof & Verified Implementation */}
                <div className="p-4 bg-[#FAFAF8] border border-[#E5E2DB] space-y-2">
                  <span className="font-mono text-[10px] text-[#71757E] uppercase tracking-wider font-bold">
                    VERIFIED IMPLEMENTATIONS:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-xs font-semibold text-[#111215]">
                      Varunya ERP Platform (Live In Production)
                    </span>
                    <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-xs font-semibold text-[#111215]">
                      Client Command Center (/portal)
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#71757E] uppercase">
                  NEXT STEP: REQUEST ERP BLUEPRINT
                </span>
                <a
                  href="#contact"
                  className="font-mono text-xs text-[#111215] hover:text-[#519DD9] flex items-center gap-1.5 uppercase font-bold transition-colors"
                >
                  <span>Discuss Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#519DD9]" />
                </a>
              </div>
            </div>

            {/* Category 3: AI and Workflow Automation */}
            <div className="bg-[#FFFFFF] border border-[#E5E2DB] p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-[#111215] hover:shadow-xl transition-all">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F5F3EF] border border-[#E5E2DB] font-mono text-[10px] text-[#53BAC1] uppercase tracking-wider font-bold">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>03 // AI &amp; WORKFLOW AUTOMATION</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#71757E] uppercase">ZERO HALLUCINATION</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#111215] font-sans">
                    Intelligent Pipelines &amp; Document AI
                  </h3>
                  <div className="mt-4 p-4 bg-[#FDFCFA] border-l-2 border-[#DB0038] space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#DB0038] font-bold">
                      THE CUSTOMER&apos;S PROBLEM:
                    </span>
                    <p className="text-xs text-[#565961] leading-relaxed">
                      Organizations want AI leverage, but generic chatbots leak confidential data, hallucinate wrong answers, and fail to connect with private corporate databases or file systems.
                    </p>
                  </div>

                  <div className="mt-4 p-4 bg-[#FDFCFA] border-l-2 border-[#53BAC1] space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#53BAC1] font-bold">
                      OUR ENGINEERED SOLUTION:
                    </span>
                    <p className="text-xs text-[#4A4D54] leading-relaxed">
                      Enterprise Retrieval-Augmented Generation (RAG) pipelines with local or isolated vector databases (`pgvector`), strict permission guardrails, deterministic audit logs, and verifiable source citations.
                    </p>
                  </div>
                </div>

                {/* Proof & Verified Implementation */}
                <div className="p-4 bg-[#FAFAF8] border border-[#E5E2DB] space-y-2">
                  <span className="font-mono text-[10px] text-[#71757E] uppercase tracking-wider font-bold">
                    ARCHITECTURAL CAPABILITIES:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-xs font-semibold text-[#111215]">
                      Semantic Document Ingestion
                    </span>
                    <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-xs font-semibold text-[#111215]">
                      Private Vector Indexing
                    </span>
                    <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-xs font-semibold text-[#111215]">
                      Zero-Data-Retention APIs
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#71757E] uppercase">
                  NEXT STEP: SCHEDULE AI FEASIBILITY AUDIT
                </span>
                <a
                  href="#contact"
                  className="font-mono text-xs text-[#111215] hover:text-[#53BAC1] flex items-center gap-1.5 uppercase font-bold transition-colors"
                >
                  <span>Discuss Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#53BAC1]" />
                </a>
              </div>
            </div>

            {/* Category 4: Infrastructure & Cloud Scaling */}
            <div className="bg-[#FFFFFF] border border-[#E5E2DB] p-8 sm:p-10 flex flex-col justify-between space-y-8 hover:border-[#111215] hover:shadow-xl transition-all">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 bg-[#F5F3EF] border border-[#E5E2DB] font-mono text-[10px] text-[#C89B3C] uppercase tracking-wider font-bold">
                    <Server className="w-3.5 h-3.5" />
                    <span>04 // CLOUD INFRASTRUCTURE &amp; SCALING</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#71757E] uppercase">SUB-100MS P95</span>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-[#111215] font-sans">
                    High-Velocity Cloud &amp; Database Architecture
                  </h3>
                  <div className="mt-4 p-4 bg-[#FDFCFA] border-l-2 border-[#DB0038] space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#DB0038] font-bold">
                      THE CUSTOMER&apos;S PROBLEM:
                    </span>
                    <p className="text-xs text-[#565961] leading-relaxed">
                      Legacy applications suffer from slow page load times, frequent downtime during traffic spikes, poor mobile performance, and skyrocketing cloud bills from unoptimized queries.
                    </p>
                  </div>

                  <div className="mt-4 p-4 bg-[#FDFCFA] border-l-2 border-[#C89B3C] space-y-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#C89B3C] font-bold">
                      OUR ENGINEERED SOLUTION:
                    </span>
                    <p className="text-xs text-[#4A4D54] leading-relaxed">
                      Next.js 14 App Router server-side rendering, global Edge CDN caching, connection-pooled PostgreSQL databases, and sub-100ms response targets deployed directly to your own cloud infrastructure.
                    </p>
                  </div>
                </div>

                {/* Proof & Verified Implementation */}
                <div className="p-4 bg-[#FAFAF8] border border-[#E5E2DB] space-y-2">
                  <span className="font-mono text-[10px] text-[#71757E] uppercase tracking-wider font-bold">
                    TELEMETRY GUARANTEES:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-xs font-semibold text-[#111215]">
                      99.95%+ Production Uptime
                    </span>
                    <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-xs font-semibold text-[#111215]">
                      Zero Cold-Start Edge Execution
                    </span>
                    <span className="px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-xs font-semibold text-[#111215]">
                      Turnkey AWS / GCP / Vercel Setup
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#71757E] uppercase">
                  NEXT STEP: AUDIT YOUR INFRASTRUCTURE
                </span>
                <a
                  href="#contact"
                  className="font-mono text-xs text-[#111215] hover:text-[#C89B3C] flex items-center gap-1.5 uppercase font-bold transition-colors"
                >
                  <span>Discuss Requirements</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C89B3C]" />
                </a>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION C — GENUINE PRODUCTS
          Showcases actual existing products with screenshots, users,
          problems solved, and working live links.
          Soft Ivory Canvas with High-Contrast Editorial Panels
          ======================================================== */}
      <section id="products" className="py-24 border-b border-[#E5E2DB] bg-[#FFFFFF] text-[#111215] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E2DB] pb-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.25em] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9] animate-pulse" />
                SECTION C // GENUINE PRODUCTS &amp; PLATFORMS
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111215] tracking-tight font-sans">
                Real Software Products <span className="text-[#519DD9]">Ready to Deploy.</span>
              </h2>
              <p className="text-[#4A4D54] text-base font-normal leading-relaxed">
                We do not show speculative design concepts. Below are genuine, fully coded software applications and platforms engineered by VarunyaTech with verified live URLs and complete source code ownership.
              </p>
            </div>

            <div className="font-mono text-xs text-[#565961] shrink-0 flex items-center gap-2 bg-[#F5F3EF] px-3.5 py-2 border border-[#E5E2DB] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#53BAC1]" />
              <span>STATUS: <strong className="text-[#111215]">ALL DEMOS OPERATIONAL</strong></span>
            </div>
          </div>

          {/* Product 1: Flagship Showcase - Varunya ERP Platform */}
          <div className="p-8 sm:p-12 bg-[#FAFAF8] border border-[#E5E2DB] shadow-md relative overflow-hidden group">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Image Preview (7 cols) */}
              <div className="lg:col-span-7 relative h-72 sm:h-96 overflow-hidden border border-[#E5E2DB] bg-[#111215] shadow-inner">
                <img
                  src="/images/products/erp-platform.jpg"
                  alt="Varunya ERP Platform Interface"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF]/95 border border-[#519DD9] font-mono text-[10px] text-[#519DD9] uppercase tracking-wider shadow-md font-bold">
                  <span className="w-2 h-2 rounded-full bg-[#519DD9] animate-pulse" />
                  RELEASED PRODUCT // LIVE IN PRODUCTION
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-[#111215] bg-[#FFFFFF]/95 p-3 border border-[#E5E2DB] shadow-md backdrop-blur">
                  <span>USERS: Enterprise Ops &amp; Warehouse Teams</span>
                  <span className="text-[#519DD9] font-bold">LATENCY: &lt; 32ms P95</span>
                </div>
              </div>

              {/* Product Details (5 cols) */}
              <div className="lg:col-span-5 space-y-6">
                <div>
                  <div className="font-mono text-[11px] text-[#519DD9] uppercase tracking-widest flex items-center gap-2 font-bold">
                    <Database className="w-3.5 h-3.5" />
                    PRODUCT 01 // ENTERPRISE MANAGEMENT
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-extrabold text-[#111215] font-sans mt-2">
                    Varunya ERP Platform
                  </h3>
                  <p className="text-sm text-[#4A4D54] font-normal leading-relaxed mt-3">
                    A centralized enterprise operations engine that eliminates fragmented spreadsheets. Provides role-based access, automated inventory reconciliation, and real-time operational analytics.
                  </p>
                </div>

                <div className="space-y-2 border-t border-[#E5E2DB] pt-4">
                  <div className="font-mono text-[10px] text-[#71757E] uppercase tracking-wider font-bold">
                    KEY PRODUCT CAPABILITIES:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs text-[#111215]">
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
                      <span>Live Order Pipeline</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#519DD9] shrink-0 font-bold" />
                      <span>Multi-Tenant DB</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {["Next.js 14", "React", "TypeScript", "Node.js", "PostgreSQL", "Tailwind CSS"].map((tech) => (
                    <span key={tech} className="font-mono text-[10px] px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-[#111215] font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E5E2DB] flex flex-wrap items-center justify-between gap-4">
                  <a
                    href="https://erp-tan-six.vercel.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#111215] text-[#FFFFFF] hover:bg-[#519DD9] hover:text-[#111215] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-sm"
                  >
                    <span>Launch Live Demo</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <a
                    href="#contact"
                    className="font-mono text-xs text-[#519DD9] hover:text-[#111215] underline font-bold"
                  >
                    Request Custom Deployment →
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Products 2, 3, 4: Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Product 2: Fun With Abacus */}
            <div className="bg-[#FAFAF8] border border-[#E5E2DB] p-6 flex flex-col justify-between space-y-6 group hover:border-[#111215] hover:shadow-xl transition-all">
              <div className="space-y-5">
                <div className="relative h-48 overflow-hidden border border-[#E5E2DB] bg-[#111215]">
                  <img
                    src="/images/products/fun-with-abacus.jpg"
                    alt="Fun With Abacus Learning Suite"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#FFFFFF]/95 border border-[#53BAC1] font-mono text-[9px] text-[#53BAC1] font-bold uppercase tracking-wider shadow-sm">
                    RELEASED PRODUCT // LIVE
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#FFFFFF]/95 border border-[#E5E2DB] font-mono text-[9px] text-[#111215] font-semibold">
                    EDTECH SUITE
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#53BAC1] font-bold">
                    STUDENTS &amp; TUTORING ACADEMIES
                  </div>
                  <h3 className="text-xl font-bold text-[#111215] font-sans mt-1">
                    Fun With Abacus
                  </h3>
                  <p className="text-xs text-[#4A4D54] font-normal leading-relaxed mt-2">
                    Digital mental math practice suite with responsive 2D canvas bead manipulation. Replaces physical plastic abacus boards with an engaging, lag-free web application.
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-[#E5E2DB] pt-3">
                  <div className="font-mono text-[9px] text-[#71757E] uppercase tracking-wider font-bold">
                    CORE HIGHLIGHTS:
                  </div>
                  <div className="space-y-1 text-xs text-[#111215]">
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
                    <span key={tech} className="font-mono text-[8px] px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E2DB] text-[#111215] font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#71757E]">
                  PUBLIC INSTANCE
                </span>
                <a
                  href="https://funwithabacus.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111215] text-[#FFFFFF] hover:bg-[#53BAC1] hover:text-[#111215] font-mono text-[10px] uppercase tracking-wider font-bold transition-colors shadow-sm"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Product 3: Jignasa Knowledge Hub */}
            <div className="bg-[#FAFAF8] border border-[#E5E2DB] p-6 flex flex-col justify-between space-y-6 group hover:border-[#111215] hover:shadow-xl transition-all">
              <div className="space-y-5">
                <div className="relative h-48 overflow-hidden border border-[#E5E2DB] bg-[#111215]">
                  <img
                    src="/images/products/jignasa.jpg"
                    alt="Jignasa Knowledge Portal"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-[#FFFFFF]/95 border border-[#519DD9] font-mono text-[9px] text-[#519DD9] font-bold uppercase tracking-wider shadow-sm">
                    RELEASED PRODUCT // LIVE
                  </div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 bg-[#FFFFFF]/95 border border-[#E5E2DB] font-mono text-[9px] text-[#111215] font-semibold">
                    KNOWLEDGE HUB
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#519DD9] font-bold">
                    STUDENTS &amp; RESEARCH TEAMS
                  </div>
                  <h3 className="text-xl font-bold text-[#111215] font-sans mt-1">
                    Jignasa Knowledge Portal
                  </h3>
                  <p className="text-xs text-[#4A4D54] font-normal leading-relaxed mt-2">
                    Structured educational platform engineered for sub-second content retrieval, searchable curriculum modules, and distraction-free responsive reading.
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-[#E5E2DB] pt-3">
                  <div className="font-mono text-[9px] text-[#71757E] uppercase tracking-wider font-bold">
                    CORE HIGHLIGHTS:
                  </div>
                  <div className="space-y-1 text-xs text-[#111215]">
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
                    <span key={tech} className="font-mono text-[8px] px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E2DB] text-[#111215] font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#71757E]">
                  PUBLIC INSTANCE
                </span>
                <a
                  href="https://jignasa.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111215] text-[#FFFFFF] hover:bg-[#519DD9] hover:text-[#111215] font-mono text-[10px] uppercase tracking-wider font-bold transition-colors shadow-sm"
                >
                  <span>Launch Live Platform</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Product 4: Client Command Center (Internal Tool & Portal) */}
            <div className="bg-[#FAFAF8] border border-[#E5E2DB] p-6 flex flex-col justify-between space-y-6 group hover:border-[#111215] hover:shadow-xl transition-all">
              <div className="space-y-5">
                <div className="relative h-48 overflow-hidden border border-[#E5E2DB] bg-[#111215] p-5 flex flex-col justify-between text-white font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-[#53BAC1] font-bold">CLIENT_PORTAL // SECURE</span>
                    <span className="w-2 h-2 rounded-full bg-[#53BAC1] animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <div className="text-xs text-[#E5E2DB]">LIVE MILESTONE TRACKER</div>
                    <div className="text-lg font-bold text-white">Sprint 03 / Handover Ready</div>
                    <div className="w-full bg-[#2A2D35] h-1.5">
                      <div className="bg-[#53BAC1] h-1.5 w-4/5" />
                    </div>
                  </div>
                  <div className="text-[9px] text-[#9299A3]">
                    REAL-TIME UPTIME: 99.98% • ENCRYPTED
                  </div>
                </div>

                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-[#C89B3C] font-bold">
                    COMMISSIONING CLIENTS &amp; PROJECT LEADS
                  </div>
                  <h3 className="text-xl font-bold text-[#111215] font-sans mt-1">
                    Client Command Center
                  </h3>
                  <p className="text-xs text-[#4A4D54] font-normal leading-relaxed mt-2">
                    Our proprietary project telemetry portal where clients track sprint progress, review live staging builds, inspect test passes, and access encrypted deliverables.
                  </p>
                </div>

                <div className="space-y-1.5 border-t border-[#E5E2DB] pt-3">
                  <div className="font-mono text-[9px] text-[#71757E] uppercase tracking-wider font-bold">
                    CLIENT ADVANTAGES:
                  </div>
                  <div className="space-y-1 text-xs text-[#111215]">
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 shrink-0 text-[#C89B3C]" />
                      <span>Live sprint milestone progress</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 shrink-0 text-[#C89B3C]" />
                      <span>Encrypted repository credential sharing</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-3 h-3 shrink-0 text-[#C89B3C]" />
                      <span>Direct architect escalation route</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {["Next.js App Router", "JWT Auth", "RBAC", "WebSockets", "Prisma"].map((tech) => (
                    <span key={tech} className="font-mono text-[8px] px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E2DB] text-[#111215] font-semibold">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-between">
                <span className="font-mono text-[9px] text-[#71757E]">
                  INTERNAL CLIENT TOOL
                </span>
                <Link
                  href="/portal"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#111215] text-[#FFFFFF] hover:bg-[#C89B3C] hover:text-[#111215] font-mono text-[10px] uppercase tracking-wider font-bold transition-colors shadow-sm"
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
          ======================================================== */}
      <section id="works" className="py-24 border-b border-[#E5E2DB] bg-[#FAFAF8] text-[#111215] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E2DB] pb-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.25em] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9] animate-pulse" />
                SECTION D // VERIFIED CASE STUDIES
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111215] tracking-tight font-sans">
                What We Have Actually <span className="text-[#519DD9]">Engineered.</span>
              </h2>
              <p className="text-[#4A4D54] text-base font-normal leading-relaxed">
                Case studies of genuine systems engineered by VarunyaTech. Each project outlines the original operational problem, the architecture delivered, and verified live production links.
              </p>
            </div>

            <Link
              href="/portfolio"
              className="font-mono text-xs text-[#519DD9] hover:text-[#111215] flex items-center gap-2 uppercase tracking-wider shrink-0 font-bold"
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
                className="p-8 sm:p-10 bg-[#FFFFFF] border border-[#E5E2DB] shadow-md grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Visual / Screenshot (5 cols) */}
                <div className="lg:col-span-5 relative h-64 sm:h-80 overflow-hidden border border-[#E5E2DB] bg-[#111215]">
                  <img
                    src={item.heroImage}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#FFFFFF]/95 border border-[#519DD9] font-mono text-[9px] text-[#519DD9] font-bold uppercase">
                    CASE STUDY // 0{idx + 1}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 px-3 py-1.5 bg-[#FFFFFF]/95 border border-[#E5E2DB] font-mono text-[9px] text-[#111215] flex items-center justify-between">
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
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111215] font-sans mt-1">
                      {item.title}
                    </h3>
                  </div>

                  {/* Problem vs Solution breakdown */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-[#FDFCFA] border-l-2 border-[#DB0038] space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#DB0038] font-bold">
                        THE ORIGINAL PROBLEM:
                      </span>
                      <p className="text-[#565961] leading-relaxed">
                        {item.challenge}
                      </p>
                    </div>

                    <div className="p-4 bg-[#FDFCFA] border-l-2 border-[#519DD9] space-y-1">
                      <span className="font-mono text-[9px] uppercase tracking-wider text-[#519DD9] font-bold">
                        THE SOLUTION DELIVERED:
                      </span>
                      <p className="text-[#4A4D54] leading-relaxed">
                        {item.solution}
                      </p>
                    </div>
                  </div>

                  {/* Architecture & Tech Stack */}
                  <div className="space-y-2 border-t border-[#E5E2DB] pt-3">
                    <div className="font-mono text-[10px] text-[#71757E] uppercase tracking-wider">
                      ARCHITECTURE: <strong className="text-[#111215]">{item.architecture}</strong>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {item.techStack.map((tech) => (
                        <span key={tech} className="font-mono text-[9px] px-2 py-0.5 bg-[#F5F3EF] border border-[#E5E2DB] text-[#111215] font-semibold">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Live Launch Action */}
                  <div className="pt-3 border-t border-[#E5E2DB] flex items-center justify-between">
                    <div className="flex items-center gap-3 font-mono text-[10px] text-[#71757E]">
                      {item.impactMetrics.slice(0, 2).map((m, i) => (
                        <span key={i}>
                          {m.label}: <strong className="text-[#111215]">{m.value}</strong>
                        </span>
                      ))}
                    </div>

                    <a
                      href={item.liveDemoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111215] text-[#FFFFFF] hover:bg-[#519DD9] hover:text-[#111215] font-mono text-xs uppercase tracking-wider font-bold transition-all shadow-sm"
                    >
                      <span>Launch Live Platform</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
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
      <section id="engineering" className="py-24 border-b border-[#E5E2DB] bg-[#F0EEE9] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.25em] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]" />
              ENGINEERING ARCHITECTURE // HOW COMPONENTS CONNECT
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111215] tracking-tight font-sans">
              Purposeful System <span className="text-[#519DD9]">Architecture.</span>
            </h2>
            <p className="text-[#4A4D54] text-base font-normal leading-relaxed">
              Inspect how we architect your software tier-by-tier: from edge ingress caching and zero-trust authentication to multi-tenant database persistence and autonomous vector AI pipelines.
            </p>
          </div>

          {/* Interactive Tier Architecture Simulation */}
          <StageArchitecture />

          {/* Interactive AI Pipeline Simulation */}
          <div className="pt-10 border-t border-[#E5E2DB]">
            <StageAiPipeline />
          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION E — HOW WE WORK
          Transparent 5-Stage Delivery Process
          Clear expectations, milestones, and timelines.
          ======================================================== */}
      <section id="process" className="py-24 border-b border-[#E5E2DB] bg-[#FFFFFF] text-[#111215] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E2DB] pb-8">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.25em] shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9] animate-pulse" />
                SECTION E // TRANSPARENT DELIVERY PROCESS
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111215] tracking-tight font-sans">
                How We Deliver <span className="text-[#519DD9]">Your Project.</span>
              </h2>
              <p className="text-[#4A4D54] text-base font-normal leading-relaxed">
                No speculative time-and-materials billing or endless scope drift. We operate on a disciplined 30–40 day milestone roadmap with continuous client visibility.
              </p>
            </div>

            <div className="font-mono text-xs text-[#565961] shrink-0 bg-[#F5F3EF] px-3.5 py-2 border border-[#E5E2DB] shadow-sm">
              TOTAL CYCLE: <strong className="text-[#111215]">30–40 CALENDAR DAYS</strong>
            </div>
          </div>

          {/* 5-Stage Process Cards */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            
            {/* Stage 1 */}
            <div className="p-6 bg-[#FAFAF8] border border-[#E5E2DB] flex flex-col justify-between space-y-6 hover:border-[#111215] transition-colors shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#519DD9]">STAGE 01</span>
                  <span className="font-mono text-[9px] text-[#71757E] px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E2DB]">
                    DAYS 1–5
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#111215]">
                  Discovery &amp; Requirements
                </h3>
                <p className="text-xs text-[#4A4D54] leading-relaxed">
                  We conduct focused scoping interviews to audit your business workflows, define technical requirements, and establish acceptance benchmarks.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] space-y-2 text-[11px] text-[#111215]">
                <div className="font-mono text-[9px] text-[#71757E] uppercase font-bold">DELIVERABLES:</div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#519DD9] shrink-0" />
                  <span>Technical Requirements Doc</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#519DD9] shrink-0" />
                  <span>Architecture blueprint</span>
                </div>
              </div>
            </div>

            {/* Stage 2 */}
            <div className="p-6 bg-[#FAFAF8] border border-[#E5E2DB] flex flex-col justify-between space-y-6 hover:border-[#111215] transition-colors shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#519DD9]">STAGE 02</span>
                  <span className="font-mono text-[9px] text-[#71757E] px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E2DB]">
                    DAYS 6–10
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#111215]">
                  Solution Design &amp; Scope
                </h3>
                <p className="text-xs text-[#4A4D54] leading-relaxed">
                  Interactive UI/UX prototypes, database schema modeling, and API contract specifications locked in with fixed milestone pricing.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] space-y-2 text-[11px] text-[#111215]">
                <div className="font-mono text-[9px] text-[#71757E] uppercase font-bold">DELIVERABLES:</div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#519DD9] shrink-0" />
                  <span>Interactive Figma prototype</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#519DD9] shrink-0" />
                  <span>Fixed-scope contract</span>
                </div>
              </div>
            </div>

            {/* Stage 3 */}
            <div className="p-6 bg-[#FAFAF8] border border-[#E5E2DB] flex flex-col justify-between space-y-6 hover:border-[#111215] transition-colors shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#53BAC1]">STAGE 03</span>
                  <span className="font-mono text-[9px] text-[#71757E] px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E2DB]">
                    DAYS 11–30
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#111215]">
                  Development &amp; Testing
                </h3>
                <p className="text-xs text-[#4A4D54] leading-relaxed">
                  Fast bi-weekly development sprints with continuous live staging access. Strict automated unit, integration, and security testing.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] space-y-2 text-[11px] text-[#111215]">
                <div className="font-mono text-[9px] text-[#71757E] uppercase font-bold">DELIVERABLES:</div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#53BAC1] shrink-0" />
                  <span>Live staging environment</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#53BAC1] shrink-0" />
                  <span>Automated test report</span>
                </div>
              </div>
            </div>

            {/* Stage 4 */}
            <div className="p-6 bg-[#FAFAF8] border border-[#E5E2DB] flex flex-col justify-between space-y-6 hover:border-[#111215] transition-colors shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#DB0038]">STAGE 04</span>
                  <span className="font-mono text-[9px] text-[#71757E] px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E2DB]">
                    DAYS 31–36
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#111215]">
                  Deployment &amp; Handover
                </h3>
                <p className="text-xs text-[#4A4D54] leading-relaxed">
                  Production cloud deployment directly to your infrastructure (AWS/GCP/Vercel). 100% source code repository and database schema transfer.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] space-y-2 text-[11px] text-[#111215]">
                <div className="font-mono text-[9px] text-[#71757E] uppercase font-bold">DELIVERABLES:</div>
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
            <div className="p-6 bg-[#FAFAF8] border border-[#E5E2DB] flex flex-col justify-between space-y-6 hover:border-[#111215] transition-colors shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-[#C89B3C]">STAGE 05</span>
                  <span className="font-mono text-[9px] text-[#71757E] px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E2DB]">
                    POST-LAUNCH
                  </span>
                </div>
                <h3 className="text-lg font-bold text-[#111215]">
                  Maintenance &amp; Support
                </h3>
                <p className="text-xs text-[#4A4D54] leading-relaxed">
                  30-day initial warranty SLA covering bug fixes and performance tuning, followed by agreed ongoing support retainers.
                </p>
              </div>

              <div className="pt-4 border-t border-[#E5E2DB] space-y-2 text-[11px] text-[#111215]">
                <div className="font-mono text-[9px] text-[#71757E] uppercase font-bold">DELIVERABLES:</div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                  <span>30-Day warranty SLA</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#C89B3C] shrink-0" />
                  <span>Telemetry &amp; backups setup</span>
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
      <section id="trust" className="py-24 border-b border-[#E5E2DB] bg-[#FAFAF8] text-[#111215] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
          
          {/* Header */}
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.25em] shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]" />
              SECTION F // CREDIBILITY &amp; ENGINEERING STANDARDS
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111215] tracking-tight font-sans">
              Rigorous Standards. <span className="text-[#519DD9]">No Artificial Claims.</span>
            </h2>
            <p className="text-[#4A4D54] text-base font-normal leading-relaxed">
              We do not invent certifications or vanity awards. We earn trust through concrete engineering guarantees: 100% IP ownership, automated testing, zero vendor lock-in, and documented code.
            </p>
          </div>

          {/* 6 Trust Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Pillar 1: 100% IP Ownership */}
            <div className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm space-y-4 hover:border-[#111215] transition-colors">
              <div className="w-10 h-10 flex items-center justify-center bg-[#F5F3EF] border border-[#E5E2DB] text-[#DB0038]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111215]">
                100% IP &amp; Source Code Rights
              </h3>
              <p className="text-xs text-[#4A4D54] leading-relaxed">
                You own every repository, commit, database migration, and design asset upon handover. There is zero recurring licensing fee or vendor lock-in.
              </p>
            </div>

            {/* Pillar 2: Security & Privacy */}
            <div className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm space-y-4 hover:border-[#111215] transition-colors">
              <div className="w-10 h-10 flex items-center justify-center bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9]">
                <Lock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111215]">
                Security &amp; Privacy by Design
              </h3>
              <p className="text-xs text-[#4A4D54] leading-relaxed">
                Hardened with OWASP Top 10 defenses, zero-trust RBAC authentication, bcrypt/Argon2 password hashing, and encrypted data at rest and in transit.
              </p>
            </div>

            {/* Pillar 3: Automated Testing & QA */}
            <div className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm space-y-4 hover:border-[#111215] transition-colors">
              <div className="w-10 h-10 flex items-center justify-center bg-[#F5F3EF] border border-[#E5E2DB] text-[#53BAC1]">
                <Activity className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111215]">
                Automated Testing &amp; Strict Types
              </h3>
              <p className="text-xs text-[#4A4D54] leading-relaxed">
                Strict TypeScript 5.7 compilation with zero-warning build gates. Vitest unit tests and Playwright end-to-end flows ensure production reliability.
              </p>
            </div>

            {/* Pillar 4: Flexible Cloud Hosting */}
            <div className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm space-y-4 hover:border-[#111215] transition-colors">
              <div className="w-10 h-10 flex items-center justify-center bg-[#F5F3EF] border border-[#E5E2DB] text-[#C89B3C]">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111215]">
                Flexible Hosting &amp; Cloud Options
              </h3>
              <p className="text-xs text-[#4A4D54] leading-relaxed">
                We deploy directly into your cloud accounts—AWS, Google Cloud, Vercel, Supabase, or on-premises servers. You retain administrative root control.
              </p>
            </div>

            {/* Pillar 5: Documentation & Turnkey Handover */}
            <div className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm space-y-4 hover:border-[#111215] transition-colors">
              <div className="w-10 h-10 flex items-center justify-center bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9]">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111215]">
                Comprehensive Handover Docs
              </h3>
              <p className="text-xs text-[#4A4D54] leading-relaxed">
                Every release includes full API schemas, environment configuration runbooks, database ERDs, and guided walkthrough sessions for your team.
              </p>
            </div>

            {/* Pillar 6: Ongoing Support Arrangements */}
            <div className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm space-y-4 hover:border-[#111215] transition-colors">
              <div className="w-10 h-10 flex items-center justify-center bg-[#F5F3EF] border border-[#E5E2DB] text-[#53BAC1]">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#111215]">
                Guaranteed Post-Launch Support
              </h3>
              <p className="text-xs text-[#4A4D54] leading-relaxed">
                Direct access to the engineers who built your platform. 30-day initial warranty included, with transparent ongoing support SLAs available.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================================
          SECTION G — FINAL CTA & FUNCTIONAL ENQUIRY
          "Let's solve something meaningful."
          Functional enquiry form with clear next-steps explanation.
          ======================================================== */}
      <section id="contact" className="py-24 lg:py-32 bg-[#F5F3EF] border-b border-[#E5E2DB] relative overflow-hidden">
        {/* Luminous ambient backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#519DD9]/8 blur-[180px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="bg-[#FFFFFF] border border-[#E5E2DB] shadow-2xl p-8 sm:p-12 lg:p-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left Column: Proposition & Next Steps (5 cols) */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F5F3EF] border border-[#E5E2DB] font-mono text-[10px] uppercase tracking-[0.25em] text-[#519DD9] shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9] animate-ping" />
                  SECTION G // DIRECT ENGINEERING ENQUIRY
                </div>

                <h2 className="text-3xl sm:text-5xl font-black text-[#111215] uppercase tracking-tight leading-[1]">
                  Let&apos;s solve something <br />
                  <span className="font-editorial italic font-light text-[#519DD9] normal-case">meaningful.</span>
                </h2>

                <p className="text-sm text-[#4A4D54] leading-relaxed">
                  Tell us about the software challenge your organization is facing. We will review your requirements and provide an actionable architectural scope within 24 hours.
                </p>
              </div>

              {/* What Happens After An Enquiry */}
              <div className="p-6 bg-[#FAFAF8] border border-[#E5E2DB] space-y-4">
                <div className="font-mono text-[10px] text-[#71757E] uppercase tracking-wider font-bold">
                  WHAT HAPPENS AFTER YOU ENQUIRE:
                </div>

                <div className="space-y-3 font-sans text-xs">
                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#111215] text-white flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                      1
                    </span>
                    <div>
                      <strong className="text-[#111215] block">Architectural Review (within 24 hours)</strong>
                      <span className="text-[#565961]">A principal software engineer reviews your brief for technical feasibility and scope.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#519DD9] text-white flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                      2
                    </span>
                    <div>
                      <strong className="text-[#111215] block">30-Minute Scoping Discussion</strong>
                      <span className="text-[#565961]">No sales pressure. A focused conversation on system requirements, integrations, and timelines.</span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <span className="w-5 h-5 rounded-full bg-[#53BAC1] text-white flex items-center justify-center font-mono text-[10px] shrink-0 font-bold">
                      3
                    </span>
                    <div>
                      <strong className="text-[#111215] block">Fixed-Scope Proposal &amp; Roadmap</strong>
                      <span className="text-[#565961]">You receive an itemized 30–40 day milestone roadmap with guaranteed deliverables and pricing.</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Email Fallback */}
              <div className="p-4 bg-[#F5F3EF] border border-[#E5E2DB] font-mono text-xs text-[#565961] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#71757E] uppercase block">DIRECT EMAIL:</span>
                  <a href="mailto:varunyatech@gmail.com" className="text-[#111215] font-bold hover:underline">
                    varunyatech@gmail.com
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => setConsultModalOpen(true)}
                  className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] text-[#111215] hover:border-[#111215] text-[10px] uppercase font-bold"
                >
                  Schedule Call
                </button>
              </div>

            </div>

            {/* Right Column: Functional Project Enquiry Form (7 cols) */}
            <div className="lg:col-span-7 bg-[#FAFAF8] border border-[#E5E2DB] p-8 sm:p-10 shadow-sm">
              
              {formSubmitted ? (
                <div className="p-8 bg-[#FFFFFF] border border-[#53BAC1] text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-[#53BAC1]/10 text-[#53BAC1] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-[#111215]">
                    Enquiry Received Successfully
                  </h3>
                  <p className="text-xs text-[#4A4D54] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong className="text-[#111215]">{formName}</strong>. Your reference ID is <span className="font-mono text-[#519DD9] font-bold">{formLeadId}</span>. A principal software architect will review your project brief and respond to <strong className="text-[#111215]">{formEmail}</strong> within 24 business hours.
                  </p>
                  <div className="pt-2">
                    <button
                      onClick={() => setFormSubmitted(false)}
                      className="px-6 py-2.5 bg-[#111215] text-[#FFFFFF] font-mono text-xs uppercase tracking-wider hover:bg-[#519DD9] hover:text-[#111215]"
                    >
                      Submit Another Enquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleEnquirySubmit} className="space-y-5">
                  <div className="space-y-1">
                    <h3 className="text-xl font-bold text-[#111215] font-sans">
                      Discuss a Project with Our Engineers
                    </h3>
                    <p className="text-xs text-[#565961]">
                      Fill out the brief below to start your 30–40 day development sprint.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-[#111215] uppercase tracking-wider font-bold">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formName}
                        onChange={(e) => setFormName(e.target.value)}
                        placeholder="e.g. Elena Rostova"
                        className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] text-xs text-[#111215] focus:outline-none focus:border-[#519DD9] shadow-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-[#111215] uppercase tracking-wider font-bold">
                        Work Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formEmail}
                        onChange={(e) => setFormEmail(e.target.value)}
                        placeholder="elena@company.com"
                        className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] text-xs text-[#111215] focus:outline-none focus:border-[#519DD9] shadow-xs"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-[#111215] uppercase tracking-wider font-bold">
                        Organization / Company
                      </label>
                      <input
                        type="text"
                        value={formOrg}
                        onChange={(e) => setFormOrg(e.target.value)}
                        placeholder="Company or Project Name"
                        className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] text-xs text-[#111215] focus:outline-none focus:border-[#519DD9] shadow-xs"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="block font-mono text-[10px] text-[#111215] uppercase tracking-wider font-bold">
                        Type of Requirement
                      </label>
                      <select
                        value={formProjectType}
                        onChange={(e) => setFormProjectType(e.target.value)}
                        className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] text-xs text-[#111215] focus:outline-none focus:border-[#519DD9] shadow-xs"
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
                    <label className="block font-mono text-[10px] text-[#111215] uppercase tracking-wider font-bold">
                      Brief Description of the Problem / Goals *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formProblem}
                      onChange={(e) => setFormProblem(e.target.value)}
                      placeholder="Describe what operational problem you need to solve, current bottlenecks, desired timeline, or key feature requirements..."
                      className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] text-xs text-[#111215] focus:outline-none focus:border-[#519DD9] shadow-xs leading-relaxed"
                    />
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={formSubmitting}
                      className="w-full sm:w-auto px-8 py-3.5 bg-[#111215] text-[#FFFFFF] hover:bg-[#519DD9] hover:text-[#111215] font-mono text-xs uppercase tracking-widest font-bold transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
                    >
                      {formSubmitting ? (
                        <span>Transmitting Scope...</span>
                      ) : (
                        <>
                          <span>Submit Project Enquiry</span>
                          <Send className="w-3.5 h-3.5" />
                        </>
                      )}
                    </button>

                    <span className="font-mono text-[10px] text-[#71757E]">
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
