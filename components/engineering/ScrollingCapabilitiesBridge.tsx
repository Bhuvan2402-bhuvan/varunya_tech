"use client";

import React, { useState } from "react";
import { 
  Cpu, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Globe, 
  ArrowRight,
  GitBranch,
  Workflow
} from "lucide-react";

interface CapabilityModule {
  id: string;
  code: string;
  title: string;
  category: string;
  metric: string;
  subMetric: string;
  protocol: string;
  accent: string;
  icon: React.ElementType;
  description: string;
}

const MODULES: CapabilityModule[] = [
  {
    id: "mod-1",
    code: "MOD_01 // DISTRIBUTED_CORE",
    title: "Modular Backend Services",
    category: "COMPUTE RUNTIME",
    metric: "< 25ms",
    subMetric: "TARGET P95 LATENCY",
    protocol: "TypeScript • Node.js • REST",
    accent: "#519DD9",
    icon: Cpu,
    description: "Decoupled domain handlers and transactional workflows engineered for operational resilience."
  },
  {
    id: "mod-2",
    code: "MOD_02 // VECTOR_RAG",
    title: "Vector Search & Retrieval",
    category: "AI & INTELLIGENCE",
    metric: "1536 DIM",
    subMetric: "pgvector HNSW COSINE",
    protocol: "OpenAI • pgvector • Embeddings",
    accent: "#53BAC1",
    icon: Sparkles,
    description: "High-dimensional embedding pipelines with isolated tenant schemas and strict output validation."
  },
  {
    id: "mod-3",
    code: "MOD_03 // EDGE_INGRESS",
    title: "CDN & Edge Routing",
    category: "NETWORK & SECURITY",
    metric: "< 15ms",
    subMetric: "TARGET FIRST-BYTE",
    protocol: "HTTP/3 • TLS 1.3 • Brotli",
    accent: "#519DD9",
    icon: Globe,
    description: "Modern edge caching points terminating TLS, compressing assets, and dispatching requests reliably."
  },
  {
    id: "mod-4",
    code: "MOD_04 // ACID_STORAGE",
    title: "PostgreSQL 16 Storage",
    category: "PERSISTENCE TIER",
    metric: "100% ACID",
    subMetric: "WAL RELIABILITY",
    protocol: "PostgreSQL • Prisma • Redis",
    accent: "#DB0038",
    icon: Database,
    description: "Multi-tenant relational schemas with row-level security (RLS), connection pooling, and automated backups."
  },
  {
    id: "mod-5",
    code: "MOD_05 // RBAC_ZERO_TRUST",
    title: "Role-Based Access Control",
    category: "AUTHORIZATION",
    metric: "Cryptographic",
    subMetric: "SESSION EVALUATION",
    protocol: "JWT • OAuth2 • Middleware",
    accent: "#519DD9",
    icon: ShieldCheck,
    description: "Session evaluation at edge middleware, eliminating unauthorized access vectors before execution."
  },
  {
    id: "mod-6",
    code: "MOD_06 // TELEMETRY_STREAM",
    title: "Telemetry & Observability",
    category: "TELEMETRY & AUDIT",
    metric: "Trace Spans",
    subMetric: "SPAN OBSERVABILITY",
    protocol: "OpenTelemetry Standards",
    accent: "#F7C200", // Electric Yellow
    icon: Activity,
    description: "Distributed trace spans tracking service boundaries, error budgets, and structured audit logs."
  },
  {
    id: "mod-7",
    code: "MOD_07 // WEBSOCKET_BROKER",
    title: "Real-Time Event Streams",
    category: "REAL-TIME COMM",
    metric: "Sub-Second",
    subMetric: "EVENT PROPAGATION",
    protocol: "WebSockets • SSE • Redis",
    accent: "#53BAC1",
    icon: Workflow,
    description: "State synchronization across client sessions with automatic reconnection and stream buffering."
  },
  {
    id: "mod-8",
    code: "MOD_08 // CI_CD_DEPLOY",
    title: "Automated Deployments",
    category: "DEPLOYMENT PIPELINE",
    metric: "Automated",
    subMetric: "STAGING TO PRODUCTION",
    protocol: "Docker • GitHub Actions",
    accent: "#519DD9",
    icon: GitBranch,
    description: "Automated container builds, health check probes, and rollback readiness for production stability."
  }
];

export function ScrollingCapabilitiesBridge() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative w-full bg-[#191C21] border-b border-[#2A2E37] py-14 overflow-hidden select-none">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#17191D] via-[#191C21] to-[#17191D] opacity-90 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#202329] border border-[#2A2E37] font-mono text-[10px] tracking-[0.25em] text-[#519DD9] uppercase mb-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9] animate-pulse" />
            <span>ARCHITECTURE CAPABILITIES // 01 ➔ 02</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#EDEDED] uppercase tracking-tight">
            Engineered Capabilities &amp; Software Subsystems
          </h2>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px] text-[#A6AFBD]">
          <span className="hidden sm:inline">
            CAPABILITY STREAM: <strong className="text-[#EDEDED]">8 ARCHITECTURE MODULES</strong>
          </span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-3 py-1 bg-[#202329] hover:bg-[#282C34] border border-[#2A2E37] text-[#EDEDED] transition-colors shadow-sm"
          >
            {isPaused ? "▶ RESUME STREAM" : "⏸ PAUSE STREAM"}
          </button>
        </div>
      </div>

      {/* Continuous Scrolling Marquee Track */}
      <div 
        className="relative w-full overflow-hidden flex items-center py-4"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Soft edge blur overlays */}
        <div className="absolute top-0 left-0 w-16 sm:w-28 h-full bg-gradient-to-r from-[#191C21] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 sm:w-28 h-full bg-gradient-to-l from-[#191C21] to-transparent z-20 pointer-events-none" />

        {/* Animated conveyor */}
        <div 
          className={`flex gap-5 whitespace-nowrap will-change-transform ${
            isPaused ? "" : "animate-marquee"
          }`}
          style={{
            animationDuration: "44s",
            animationPlayState: isPaused ? "paused" : "running"
          }}
        >
          {/* Render 2 duplicates to create seamless infinite loop */}
          {[...MODULES, ...MODULES].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={`${mod.id}-${idx}`}
                className="w-[320px] sm:w-[360px] p-5 bg-[#202329] border border-[#2A2E37] hover:border-[#519DD9] transition-all duration-300 flex-shrink-0 flex flex-col justify-between group shadow-card hover:shadow-steel-glow rounded-lg"
                style={{
                  borderLeftColor: mod.accent,
                  borderLeftWidth: "3px"
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[#727C8D] tracking-widest">{mod.code}</span>
                    <span 
                      className="px-2 py-0.5 border text-[9px] uppercase font-bold"
                      style={{ 
                        color: mod.accent, 
                        borderColor: `${mod.accent}40`,
                        backgroundColor: "#17191D"
                      }}
                    >
                      {mod.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 flex items-center justify-center border shrink-0 bg-[#17191D]"
                      style={{ borderColor: `${mod.accent}50` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: mod.accent }} />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base text-[#EDEDED] group-hover:text-[#519DD9] transition-colors">
                        {mod.title}
                      </h3>
                      <div className="font-mono text-[10px] text-[#727C8D]">{mod.protocol}</div>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#A6AFBD] font-normal leading-relaxed whitespace-normal line-clamp-2">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#2A2E37] flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[9px] text-[#727C8D] uppercase block">{mod.subMetric}</span>
                    <span className="text-sm font-extrabold" style={{ color: mod.accent }}>
                      {mod.metric}
                    </span>
                  </div>

                  <a 
                    href="#architecture" 
                    className="text-[10px] text-[#727C8D] group-hover:text-[#519DD9] flex items-center gap-1 uppercase tracking-wider transition-colors font-medium"
                  >
                    <span>Blueprint</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Sub-Ticker Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex items-center justify-between font-mono text-[10px] text-[#727C8D] uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#519DD9] rounded-full" />
          <span>MODULAR ARCHITECTURE BLUEPRINTS</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>SPECIFICATIONS CONFIGURED PER APPLICATION REQUIREMENTS</span>
          <a href="#architecture" className="text-[#519DD9] font-semibold hover:underline">
            INSPECT BLUEPRINTS ↓
          </a>
        </div>
      </div>
    </div>
  );
}
