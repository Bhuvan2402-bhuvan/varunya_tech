"use client";

import React, { useState } from "react";
import { 
  Layers, 
  ShieldCheck, 
  Database, 
  Cpu, 
  Workflow, 
  Lock, 
  CheckCircle2, 
  ArrowRight,
  Server,
  Zap,
  Sparkles
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
    badge: "PATTERN 01 // ENTERPRISE",
    tagline: "Strict tenant data isolation, role-based access control, and dynamic subdomain routing.",
    description: "Designed for SaaS platforms handling enterprise customers where compliance, auditability, and zero cross-tenant data leakage are mandatory requirements.",
    accentColor: "#519DD9", // Brand Digital Blue
    glowColor: "rgba(81, 157, 217, 0.2)",
    badgeBg: "rgba(81, 157, 217, 0.1)",
    topology: [
      { tier: "CLIENT LAYER", tech: "Next.js 14 App Router • React 18", role: "Server-side streaming, zero-layout-shift UI, tenant-aware routing", accent: "#519DD9" },
      { tier: "INGRESS & AUTH", tech: "Edge Middleware • JWT / RBAC", role: "Sub-5ms tenant resolution, cryptographic session validation", accent: "#519DD9" },
      { tier: "APPLICATION CORE", tech: "TypeScript Services • Zod Schemas", role: "Decoupled domain handlers, transactional workflows, event emitters", accent: "#53BAC1" },
      { tier: "PERSISTENCE TIER", tech: "PostgreSQL Multi-Schema / RLS", role: "Row-level security enforcement, connection pooling, automated backups", accent: "#DB0038" }
    ],
    benchmarks: [
      { label: "EDGE RESOLUTION", val: "< 4.2ms" },
      { label: "TENANT LEAK RISK", val: "0.00% (RLS Verified)" },
      { label: "P99 API RESPONSE", val: "48ms" }
    ]
  },
  {
    id: "fintech-core",
    name: "High-Throughput Operational ERP",
    badge: "PATTERN 02 // FINANCIAL & OPS",
    tagline: "ACID-compliant ledger, double-entry accounting records, and idempotent payment processing.",
    description: "Engineered for organizations with zero tolerance for financial discrepancies or missed transactional events. Every mutation is immutable and auditable.",
    accentColor: "#519DD9", // Brand Digital Blue
    glowColor: "rgba(81, 157, 217, 0.2)",
    badgeBg: "rgba(81, 157, 217, 0.1)",
    topology: [
      { tier: "INGRESS TIER", tech: "Anycast Edge • mTLS Gateway", role: "End-to-end TLS 1.3 encryption with cryptographic signature checks", accent: "#519DD9" },
      { tier: "TRANSACTION BUS", tech: "Idempotent Queue • Distributed Locks", role: "Prevents double-charging, ensures strict serializability", accent: "#519DD9" },
      { tier: "ACCOUNTING ENGINE", tech: "Double-Entry Ledger Engine", role: "Dual debit/credit verification with point-in-time state reconstruction", accent: "#53BAC1" },
      { tier: "AUDIT STORAGE", tech: "Append-Only PostgreSQL Tables", role: "Cryptographic hash chaining on all critical ledger events", accent: "#DB0038" }
    ],
    benchmarks: [
      { label: "TRANSACTION INTEGRITY", val: "100% ACID" },
      { label: "LEDGER AUDIT SPEED", val: "< 12ms / block" },
      { label: "IDEMPOTENCY GUARANTEE", val: "Enforced" }
    ]
  },
  {
    id: "ai-retrieval",
    name: "Hybrid AI Vector & RAG Engine",
    badge: "PATTERN 03 // INTELLIGENCE",
    tagline: "Sub-100ms vector search, context augmentation, and dynamic tool orchestration.",
    description: "Scalable RAG infrastructure connecting proprietary enterprise data stores to frontier AI models with strict semantic guardrails and zero hallucinated schema outputs.",
    accentColor: "#53BAC1", // Brand Aqua Teal
    glowColor: "rgba(83, 186, 193, 0.2)",
    badgeBg: "rgba(83, 186, 193, 0.1)",
    topology: [
      { tier: "SEMANTIC INGEST", tech: "Chunking Pipeline • Tokenizer", role: "Intelligent document parsing, markdown decomposition, token optimization", accent: "#53BAC1" },
      { tier: "VECTOR DATABASE", tech: "pgvector • Hierarchical HNSW Index", role: "Sub-20ms cosine similarity search across millions of high-dim vectors", accent: "#519DD9" },
      { tier: "RAG ORCHESTRATOR", tech: "Re-ranker • Prompt Synthesizer", role: "Hybrid dense/sparse scoring, context compaction, prompt guardrails", accent: "#53BAC1" },
      { tier: "INFERENCE STREAM", tech: "Edge SSE • Streaming Response", role: "Immediate first-token delivery with JSON schema verification", accent: "#519DD9" }
    ],
    benchmarks: [
      { label: "VECTOR RETRIEVAL", val: "16.4ms P95" },
      { label: "TOKEN FIRST-BYTE", val: "< 240ms" },
      { label: "SCHEMA ACCURACY", val: "99.98%" }
    ]
  }
];

export function StageArchitecture() {
  const [selectedPattern, setSelectedPattern] = useState<ArchitecturePattern>(PATTERNS[0]);

  return (
    <section id="architecture" className="py-24 border-b border-[#E5E2DB] bg-[#F0EEE9] relative overflow-hidden">
      {/* Dimensional Ambient Backlight */}
      <div 
        className="absolute top-1/4 -right-40 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: selectedPattern.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E2DB] pb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] font-mono text-[10px] uppercase tracking-[0.25em] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#519DD9] shadow-[0_0_8px_#519DD9] animate-pulse" />
              <span className="text-[#519DD9] font-bold">SCENE 02 // TECHNOLOGY &amp; CAPABILITIES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111215] tracking-tight font-sans">
              Decoupled, Resilient, <span className="text-[#519DD9]">Battle-Tested.</span>
            </h2>
            <p className="text-[#4A4D54] text-base font-normal leading-relaxed">
              Digital blue for software modules, interactive architectural diagrams, and capability highlights balanced with ivory and crisp white surfaces.
            </p>
          </div>

          <div className="font-mono text-xs text-[#71757E] shrink-0 flex items-center gap-2 bg-[#FFFFFF] px-3.5 py-2 border border-[#E5E2DB] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#519DD9]" />
            <span>DISCIPLINE: <strong className="text-[#111215]">PRODUCTION ARCHITECTURE</strong></span>
          </div>
        </div>

        {/* Pattern Selector Tabs with Electric Highlight */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PATTERNS.map((p) => {
            const isSelected = selectedPattern.id === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPattern(p)}
                className={`p-6 text-left border transition-all duration-300 flex flex-col justify-between relative group ${
                  isSelected
                    ? "bg-[#FFFFFF] shadow-xl scale-[1.02]"
                    : "bg-[#FFFFFF] border-[#E5E2DB] hover:border-[#111215] shadow-sm"
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

                  <h3 className="font-sans font-extrabold text-xl text-[#111215] group-hover:text-[#519DD9] transition-colors">
                    {p.name}
                  </h3>
                  <p className="font-sans text-xs text-[#4A4D54] font-normal line-clamp-2 leading-relaxed">
                    {p.tagline}
                  </p>
                </div>

                <div className="pt-4 mt-6 border-t border-[#E5E2DB] flex items-center justify-between text-xs font-mono">
                  <span 
                    className="font-bold tracking-wider"
                    style={{ color: isSelected ? p.accentColor : "#71757E" }}
                  >
                    {isSelected ? "[ ACTIVE BLUEPRINT ]" : "INSPECT TOPOLOGY"}
                  </span>
                  <ArrowRight 
                    className={`w-4 h-4 transition-transform ${isSelected ? "translate-x-1" : "text-[#71757E]"}`} 
                    style={{ color: isSelected ? p.accentColor : undefined }}
                  />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Blueprint Detail Display */}
        <div 
          className="bg-[#FFFFFF] border p-8 lg:p-12 space-y-10 shadow-xl transition-all duration-300"
          style={{ borderColor: selectedPattern.accentColor }}
        >
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 border-b border-[#E5E2DB] pb-6">
            <div>
              <span 
                className="font-mono text-[10px] uppercase tracking-widest block mb-1 font-bold"
                style={{ color: selectedPattern.accentColor }}
              >
                TOPOLOGY BLUEPRINT // {selectedPattern.id.toUpperCase()}
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#111215] font-sans">
                {selectedPattern.name}
              </h3>
              <p className="text-sm text-[#4A4D54] font-normal mt-2 max-w-2xl leading-relaxed">
                {selectedPattern.description}
              </p>
            </div>

            {/* Benchmarks Pill Grid */}
            <div className="flex flex-wrap items-center gap-4">
              {selectedPattern.benchmarks.map((b, idx) => (
                <div key={idx} className="p-3.5 bg-[#F5F3EF] border border-[#E5E2DB] font-mono text-center min-w-[130px] shadow-sm">
                  <div className="text-[9px] text-[#71757E] uppercase tracking-wider">{b.label}</div>
                  <div className="text-sm font-extrabold mt-0.5" style={{ color: selectedPattern.accentColor }}>
                    {b.val}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 4-Tier Visual Architecture Stack */}
          <div className="space-y-4">
            <div className="font-mono text-xs text-[#111215] uppercase tracking-widest flex items-center gap-2 font-bold">
              <Layers className="w-4 h-4 text-[#519DD9]" />
              <span>LAYER-BY-LAYER SUBSYSTEM SPECIFICATIONS</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {selectedPattern.topology.map((layer, idx) => (
                <div 
                  key={idx} 
                  className="p-6 bg-[#F5F3EF] border border-[#E5E2DB] flex flex-col justify-between space-y-4 relative group hover:border-[#111215] transition-all hover:bg-[#FFFFFF] shadow-sm hover:shadow-md"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between font-mono text-[10px] text-[#71757E]">
                      <span className="font-bold" style={{ color: layer.accent }}>TIER 0{idx + 1}</span>
                      <span className="w-2 h-2 rounded-full" style={{ backgroundColor: layer.accent }} />
                    </div>
                    <div className="font-mono text-xs font-extrabold text-[#111215] tracking-wider uppercase">
                      {layer.tier}
                    </div>
                    <div 
                      className="text-[11px] font-mono px-2.5 py-1 border font-semibold truncate bg-[#FFFFFF]"
                      style={{ 
                        color: layer.accent,
                        borderColor: `${layer.accent}40`,
                      }}
                    >
                      {layer.tech}
                    </div>
                  </div>

                  <p className="text-xs text-[#4A4D54] font-normal leading-relaxed pt-2 border-t border-[#E5E2DB]">
                    {layer.role}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
