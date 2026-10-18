"use client";

import React, { useState } from "react";
import { 
  Layers, 
  ArrowRight,
  Info
} from "lucide-react";

interface ArchitecturePattern {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  accentColor: string;
  glowColor: string;
  badgeBg: string;
  topology: {
    tier: string;
    tech: string;
    role: string;
    accent: string;
  }[];
  benchmarks: {
    label: string;
    val: string;
  }[];
}

const PATTERNS: ArchitecturePattern[] = [
  {
    id: "multi-tenant",
    name: "Enterprise Multi-Tenant SaaS",
    badge: "PATTERN 01 // ENTERPRISE BLUEPRINT",
    tagline: "Strict tenant data isolation, role-based access control, and dynamic subdomain routing.",
    description: "Designed for SaaS platforms handling business customers where compliance, auditability, and zero cross-tenant data leakage are mandatory requirements.",
    accentColor: "#519DD9", // Brand Digital Blue
    glowColor: "rgba(81, 157, 217, 0.2)",
    badgeBg: "rgba(81, 157, 217, 0.15)",
    topology: [
      { tier: "CLIENT LAYER", tech: "Next.js 14 App Router • React 18", role: "Server-side streaming, responsive interface, tenant-aware routing", accent: "#519DD9" },
      { tier: "INGRESS & AUTH", tech: "Edge Middleware • JWT / RBAC", role: "Sub-15ms tenant resolution, cryptographic session validation", accent: "#519DD9" },
      { tier: "APPLICATION CORE", tech: "TypeScript Services • Zod Schemas", role: "Decoupled domain handlers, transactional workflows, event emitters", accent: "#53BAC1" },
      { tier: "PERSISTENCE TIER", tech: "PostgreSQL Multi-Schema / RLS", role: "Row-level security enforcement, connection pooling, automated backups", accent: "#DB0038" }
    ],
    benchmarks: [
      { label: "TARGET INGRESS", val: "< 15ms" },
      { label: "TENANT ISOLATION", val: "RLS Enforced" },
      { label: "TARGET API P95", val: "< 80ms" }
    ]
  },
  {
    id: "fintech-core",
    name: "Operational ERP & Ledger Engine",
    badge: "PATTERN 02 // OPERATIONS BLUEPRINT",
    tagline: "ACID-compliant ledger, double-entry records, and idempotent transactional processing.",
    description: "Engineered for organizations requiring reliable operational records and auditable transactional flows. Every state mutation is traceable.",
    accentColor: "#519DD9", // Brand Digital Blue
    glowColor: "rgba(81, 157, 217, 0.2)",
    badgeBg: "rgba(81, 157, 217, 0.15)",
    topology: [
      { tier: "INGRESS TIER", tech: "Edge Proxy • TLS 1.3 Gateway", role: "End-to-end TLS 1.3 encryption with request signature verification", accent: "#519DD9" },
      { tier: "TRANSACTION BUS", tech: "Idempotent Queue • Locks", role: "Prevents double-mutations, ensures consistent state updates", accent: "#519DD9" },
      { tier: "OPERATIONS ENGINE", tech: "Double-Entry Audit System", role: "Dual validation with point-in-time state reconciliation", accent: "#53BAC1" },
      { tier: "AUDIT STORAGE", tech: "Relational PostgreSQL Tables", role: "Structured audit trails and immutable change records", accent: "#DB0038" }
    ],
    benchmarks: [
      { label: "INTEGRITY", val: "100% ACID" },
      { label: "AUDIT LOGGING", val: "Continuous" },
      { label: "IDEMPOTENCY", val: "Enforced" }
    ]
  },
  {
    id: "ai-retrieval",
    name: "AI Vector Retrieval & RAG Pipeline",
    badge: "PATTERN 03 // INTELLIGENCE BLUEPRINT",
    tagline: "Vector indexing, context augmentation, and dynamic schema-validated tool invocation.",
    description: "RAG infrastructure connecting proprietary company data stores to AI models with strict semantic guardrails and structured JSON schema verification.",
    accentColor: "#53BAC1", // Brand Aqua Teal
    glowColor: "rgba(83, 186, 193, 0.2)",
    badgeBg: "rgba(83, 186, 193, 0.15)",
    topology: [
      { tier: "DOCUMENT INGEST", tech: "Chunking Pipeline • Tokenizer", role: "Document parsing, markdown decomposition, token budget management", accent: "#53BAC1" },
      { tier: "VECTOR DATABASE", tech: "pgvector • HNSW Index", role: "Nearest-neighbor similarity search across high-dimensional vector embeddings", accent: "#519DD9" },
      { tier: "RAG ORCHESTRATOR", tech: "Re-ranker • Prompt Synthesizer", role: "Context compaction, semantic filtering, prompt safety guardrails", accent: "#53BAC1" },
      { tier: "INFERENCE STREAM", tech: "SSE • Streaming Response", role: "First-token streaming delivery with strict Zod schema validation", accent: "#519DD9" }
    ],
    benchmarks: [
      { label: "TARGET VECTOR SCAN", val: "< 25ms" },
      { label: "OUTPUT FORMAT", val: "Zod Verified" },
      { label: "STREAM PROTOCOL", val: "Edge SSE" }
    ]
  }
];

export function StageArchitecture() {
  const [selectedPattern, setSelectedPattern] = useState<ArchitecturePattern>(PATTERNS[0]);

  return (
    <section id="architecture" className="py-24 border-b border-gray-200 bg-white relative overflow-hidden">
      {/* Dimensional Ambient Backlight */}
      <div 
        className="absolute top-1/4 -right-40 w-96 h-96 rounded-full blur-[160px] pointer-events-none opacity-15 transition-all duration-700"
        style={{ backgroundColor: selectedPattern.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#F9FAFB] border border-gray-200 font-mono text-[10px] uppercase tracking-[0.25em] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#519DD9] shadow-[0_0_8px_#519DD9] animate-pulse" />
              <span className="text-[#519DD9] font-bold">SCENE 02 // TECHNOLOGY &amp; CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#17191D] tracking-tight font-sans">
              Decoupled, Resilient, <span className="text-[#519DD9]">Engineered to Last.</span>
            </h2>
            <p className="text-[#4B5563] text-base font-normal leading-relaxed">
              Explore the architectural patterns VarunyaTech designs and delivers for client systems, balancing modularity, security, and performance.
            </p>
          </div>

          <div className="font-mono text-xs text-[#4B5563] shrink-0 flex items-center gap-2 bg-[#F9FAFB] px-3.5 py-2 border border-gray-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#519DD9]" />
            <span>DISCIPLINE: <strong className="text-[#17191D]">ARCHITECTURE BLUEPRINTS</strong></span>
          </div>
        </div>

        {/* Pattern Selector Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PATTERNS.map((p) => {
            const isSelected = selectedPattern.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPattern(p)}
                className={`p-6 text-left border transition-all duration-300 flex flex-col justify-between relative group rounded-xl ${
                  isSelected
                    ? "bg-white shadow-xl scale-[1.02]"
                    : "bg-white border-gray-200 hover:border-gray-400 shadow-xs hover:bg-[#F9FAFB]"
                }`}
                style={{
                  borderColor: isSelected ? p.accentColor : undefined,
                  boxShadow: isSelected ? `0 10px 30px ${p.glowColor}` : undefined
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span 
                      className="font-mono text-[10px] tracking-widest uppercase font-bold"
                      style={{ color: p.accentColor }}
                    >
                      {p.badge}
                    </span>
                    <span 
                      className="w-2 h-2 rounded-full" 
                      style={{ backgroundColor: p.accentColor }} 
                    />
                  </div>

                  <h3 className="font-sans font-extrabold text-xl text-[#17191D] group-hover:text-[#519DD9] transition-colors">
                    {p.name}
                  </h3>
                  <p className="font-sans text-xs text-[#4B5563] font-normal line-clamp-2 leading-relaxed">
                    {p.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-between text-xs font-mono">
                  <span 
                    className="font-bold tracking-wider"
                    style={{ color: isSelected ? p.accentColor : "#6B7280" }}
                  >
                    {isSelected ? "[ ACTIVE BLUEPRINT ]" : "INSPECT TOPOLOGY"}
                  </span>
                  <ArrowRight 
                    className={`w-4 h-4 transition-transform ${isSelected ? "translate-x-1" : "text-[#6B7280]"}`} 
                    style={{ color: isSelected ? p.accentColor : undefined }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Blueprint Detail Display */}
        <div 
          className="bg-[#F9FAFB] border p-8 lg:p-12 space-y-10 shadow-md transition-all duration-300 rounded-xl"
          style={{ borderColor: selectedPattern.accentColor }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-gray-200 pb-6">
            <div>
              <span 
                className="font-mono text-[10px] uppercase tracking-widest block mb-1 font-bold"
                style={{ color: selectedPattern.accentColor }}
              >
                TOPOLOGY SPECIFICATION // {selectedPattern.id.toUpperCase()}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#17191D] font-sans">
                {selectedPattern.name}
              </h3>
              <p className="text-sm text-[#4B5563] font-normal mt-2 max-w-2xl leading-relaxed">
                {selectedPattern.description}
              </p>
            </div>

            {/* Benchmarks Pill Grid */}
            <div className="flex flex-wrap items-center gap-4">
              {selectedPattern.benchmarks.map((b, idx) => (
                <div key={idx} className="p-3.5 bg-white border border-gray-200 font-mono text-center min-w-[130px] shadow-xs rounded-lg">
                  <div className="text-[9px] text-[#6B7280] uppercase tracking-wider">{b.label}</div>
                  <div className="text-sm font-extrabold mt-0.5" style={{ color: selectedPattern.accentColor }}>
                    {b.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Tier Visual Architecture Stack */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-[#17191D] uppercase tracking-widest flex items-center gap-2 font-bold">
              <Layers className="w-4 h-4 text-[#519DD9]" />
              <span>LAYER-BY-LAYER SUBSYSTEM SPECIFICATIONS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedPattern.topology.map((layer, idx) => (
                <div 
                  key={idx} 
                  className="p-6 bg-white border border-gray-200 flex flex-col justify-between space-y-4 relative group hover:border-[#519DD9] transition-all hover:bg-gray-50 shadow-xs rounded-lg"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#6B7280]">
                      <span className="font-bold" style={{ color: layer.accent }}>TIER 0{idx + 1}</span>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.accent }} />
                    </div>
                    <div className="font-mono text-xs font-extrabold text-[#17191D] tracking-wider uppercase">
                      {layer.tier}
                    </div>
                    <div 
                      className="text-[11px] font-mono px-2.5 py-1 border font-semibold truncate bg-[#F9FAFB]"
                      style={{ 
                        color: layer.accent,
                        borderColor: `${layer.accent}40`,
                      }}
                    >
                      {layer.tech}
                    </div>
                  </div>

                  <p className="text-xs text-[#4B5563] font-normal leading-relaxed pt-2 border-t border-gray-100">
                    {layer.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-[#6B7280]">
            <Info className="w-3.5 h-3.5 text-[#519DD9] shrink-0" />
            <span>Specifications represent architecture design targets. Actual implementation is configured per customer SLA and hosting environment.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
