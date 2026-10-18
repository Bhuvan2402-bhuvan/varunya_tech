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
  Workflow,
  Play,
  Pause
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
    subMetric: "P95 DISPATCH LATENCY",
    protocol: "TypeScript • Node.js • REST",
    accent: "#519DD9", // Brand Digital Blue
    icon: Cpu,
    description: "Decoupled domain handlers and transactional workflows engineered for sub-25ms response and operational resilience."
  },
  {
    id: "mod-2",
    code: "MOD_02 // VECTOR_RAG",
    title: "Vector Search & Retrieval",
    category: "AI & INTELLIGENCE",
    metric: "1536-Dim",
    subMetric: "HNSW COSINE EMBEDDINGS",
    protocol: "OpenAI • pgvector • Embeddings",
    accent: "#53BAC1", // Brand Aqua Teal
    icon: Sparkles,
    description: "High-dimensional embedding pipelines with isolated tenant schemas, vector indexing, and strict output validation."
  },
  {
    id: "mod-3",
    code: "MOD_03 // EDGE_INGRESS",
    title: "CDN & Edge Routing",
    category: "NETWORK & SECURITY",
    metric: "< 15ms",
    subMetric: "TIME-TO-FIRST-BYTE (TTFB)",
    protocol: "HTTP/3 • TLS 1.3 • Brotli",
    accent: "#519DD9", // Brand Digital Blue
    icon: Globe,
    description: "Modern edge caching points terminating TLS, compressing assets with Brotli, and dispatching requests reliably."
  },
  {
    id: "mod-4",
    code: "MOD_04 // ACID_STORAGE",
    title: "PostgreSQL 16 Storage",
    category: "PERSISTENCE TIER",
    metric: "100% ACID",
    subMetric: "WAL STORAGE RELIABILITY",
    protocol: "PostgreSQL • Prisma • Redis",
    accent: "#DB0038", // Brand Crimson
    icon: Database,
    description: "Multi-tenant relational schemas with row-level security (RLS), connection pooling, and automated point-in-time recovery."
  },
  {
    id: "mod-5",
    code: "MOD_05 // RBAC_ZERO_TRUST",
    title: "Role-Based Access Control",
    category: "AUTHENTICATION & RBAC",
    metric: "< 5ms",
    subMetric: "EDGE SESSION EVALUATION",
    protocol: "JWT • OAuth2 • Middleware",
    accent: "#519DD9", // Brand Digital Blue
    icon: ShieldCheck,
    description: "Cryptographic session evaluation at edge middleware, eliminating unauthorized access vectors before execution."
  },
  {
    id: "mod-6",
    code: "MOD_06 // TELEMETRY_STREAM",
    title: "Telemetry & Observability",
    category: "OBSERVABILITY & AUDIT",
    metric: "100% Traced",
    subMetric: "DISTRIBUTED SPAN COVERAGE",
    protocol: "OpenTelemetry Standards",
    accent: "#F7C200", // Electric Yellow
    icon: Activity,
    description: "Distributed trace spans tracking service boundaries, latency budgets, and structured audit logs across all tiers."
  },
  {
    id: "mod-7",
    code: "MOD_07 // WEBSOCKET_BROKER",
    title: "Real-Time Event Streams",
    category: "REAL-TIME COMM",
    metric: "< 50ms",
    subMetric: "EVENT BUS PROPAGATION",
    protocol: "WebSockets • SSE • Redis Pub/Sub",
    accent: "#53BAC1", // Brand Aqua Teal
    icon: Workflow,
    description: "State synchronization across client sessions with automatic reconnection, deduplication, and stream buffering."
  },
  {
    id: "mod-8",
    code: "MOD_08 // CI_CD_DEPLOY",
    title: "Automated Deployments",
    category: "DEPLOYMENT PIPELINE",
    metric: "0s Downtime",
    subMetric: "BLUE-GREEN ROLLOUT",
    protocol: "Docker • GitHub Actions • CI/CD",
    accent: "#519DD9", // Brand Digital Blue
    icon: GitBranch,
    description: "Automated container builds, health check probes, and canary rollback readiness for zero-downtime production stability."
  }
];

export function ScrollingCapabilitiesBridge() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="relative w-full bg-[#F9FAFB] border-b border-gray-200 py-14 overflow-hidden select-none">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 font-mono text-[10px] tracking-[0.25em] text-[#519DD9] uppercase mb-2 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9] animate-pulse" />
            <span>ARCHITECTURE CAPABILITIES // 01 ➔ 02</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#17191D] uppercase tracking-tight">
            Engineered Capabilities &amp; Software Subsystems
          </h2>
        </div>

        <div className="flex items-center gap-3 font-mono text-[11px]">
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 text-[#17191D] shadow-xs">
            <span className={`w-2 h-2 rounded-full ${isPaused ? "bg-amber-400" : "bg-emerald-500 animate-pulse"}`} />
            <span className="font-bold">{isPaused ? "STREAM PAUSED" : "STREAM ACTIVE"}</span>
            <span className="text-[#6B7280]">| 8 MODULES</span>
          </div>

          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-3 py-1 bg-white hover:bg-gray-100 border border-gray-200 text-[#17191D] transition-colors shadow-xs flex items-center gap-1.5 font-bold"
          >
            {isPaused ? <Play className="w-3 h-3 text-[#519DD9] fill-[#519DD9]" /> : <Pause className="w-3 h-3 text-[#4B5563]" />}
            <span>{isPaused ? "RESUME STREAM" : "PAUSE STREAM"}</span>
          </button>
        </div>
      </div>

      {/* Continuous Scrolling Marquee Track */}
      <div className="relative w-full overflow-hidden flex items-center py-4">
        {/* Soft edge blur overlays */}
        <div className="absolute top-0 left-0 w-16 sm:w-28 h-full bg-gradient-to-r from-[#F9FAFB] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 sm:w-28 h-full bg-gradient-to-l from-[#F9FAFB] to-transparent z-20 pointer-events-none" />

        {/* Animated conveyor */}
        <div 
          className="flex gap-5 whitespace-nowrap will-change-transform animate-marquee"
          style={{
            animationDuration: "36s",
            animationPlayState: isPaused ? "paused" : "running"
          }}
        >
          {/* Render 2 duplicates to create seamless infinite loop */}
          {[...MODULES, ...MODULES].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={`${mod.id}-${idx}`}
                className="w-[330px] sm:w-[370px] p-5 bg-white border border-gray-200 hover:border-[#519DD9] transition-all duration-300 flex-shrink-0 flex flex-col justify-between group shadow-xs hover:shadow-lg rounded-lg"
                style={{
                  borderLeftColor: mod.accent,
                  borderLeftWidth: "4px"
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[#374151] font-bold tracking-widest">{mod.code}</span>
                    <span 
                      className="px-2 py-0.5 border text-[9px] uppercase font-bold tracking-wider rounded-xs"
                      style={{ 
                        color: mod.accent, 
                        borderColor: `${mod.accent}50`,
                        backgroundColor: "#FFFFFF"
                      }}
                    >
                      {mod.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 flex items-center justify-center border shrink-0 bg-[#F9FAFB] rounded"
                      style={{ borderColor: `${mod.accent}50` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: mod.accent }} />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base text-[#17191D] group-hover:text-[#519DD9] transition-colors">
                        {mod.title}
                      </h3>
                      <div className="font-mono text-[10px] text-[#4B5563] font-medium">{mod.protocol}</div>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#374151] font-normal leading-relaxed whitespace-normal line-clamp-2">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[9px] text-[#4B5563] uppercase tracking-wider block font-bold">{mod.subMetric}</span>
                    <span className="text-base sm:text-lg font-black tracking-tight" style={{ color: mod.accent }}>
                      {mod.metric}
                    </span>
                  </div>

                  <a 
                    href="#architecture" 
                    className="text-[10px] text-[#374151] group-hover:text-[#519DD9] flex items-center gap-1 uppercase tracking-wider transition-colors font-bold"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex items-center justify-between font-mono text-[10px] text-[#6B7280] uppercase tracking-[0.2em]">
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
