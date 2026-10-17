"use client";

import React, { useRef, useState, useEffect } from "react";
import { 
  Cpu, 
  Layers, 
  Database, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  Globe, 
  Zap, 
  ArrowRight,
  GitBranch,
  Terminal,
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
    title: "Distributed Microservices",
    category: "COMPUTE RUNTIME",
    metric: "< 12.4ms",
    subMetric: "P99 SLA LATENCY",
    protocol: "TypeScript • Node.js • gRPC",
    accent: "#519DD9",
    icon: Cpu,
    description: "Decoupled domain handlers and transactional workflows engineered for enterprise resilience."
  },
  {
    id: "mod-2",
    code: "MOD_02 // VECTOR_RAG",
    title: "Autonomous Vector Pipelines",
    category: "AI & INTELLIGENCE",
    metric: "1536 DIM",
    subMetric: "pgvector HNSW COSINE",
    protocol: "OpenAI • Ollama • LangChain",
    accent: "#53BAC1",
    icon: Sparkles,
    description: "High-dimensional embedding pipelines with strict tenant isolation and zero hallucination schema guards."
  },
  {
    id: "mod-3",
    code: "MOD_03 // EDGE_INGRESS",
    title: "Anycast Edge Gateway",
    category: "NETWORK & SECURITY",
    metric: "4.8ms",
    subMetric: "GLOBAL FIRST-BYTE",
    protocol: "HTTP/3 • QUIC • TLS 1.3",
    accent: "#519DD9",
    icon: Globe,
    description: "Multi-region edge nodes terminating TLS, caching static assets, and routing traffic with zero cold-starts."
  },
  {
    id: "mod-4",
    code: "MOD_04 // ACID_STORAGE",
    title: "PostgreSQL 16 Cluster",
    category: "PERSISTENCE TIER",
    metric: "100% ACID",
    subMetric: "ZERO-DATA-LOSS WAL",
    protocol: "PostgreSQL • Prisma • Redis",
    accent: "#DB0038",
    icon: Database,
    description: "Multi-tenant relational schemas with row-level security (RLS), connection pooling, and automated replication."
  },
  {
    id: "mod-5",
    code: "MOD_05 // RBAC_ZERO_TRUST",
    title: "Zero-Trust RBAC Identity",
    category: "AUTHORIZATION",
    metric: "< 3.2ms",
    subMetric: "SESSION CRYPTO CHECK",
    protocol: "OAuth2 • mTLS • WebAuthn",
    accent: "#519DD9",
    icon: ShieldCheck,
    description: "Cryptographic session evaluation at edge middleware, eliminating unauthorized access vectors before execution."
  },
  {
    id: "mod-6",
    code: "MOD_06 // TELEMETRY_STREAM",
    title: "Real-Time Observability",
    category: "TELEMETRY & AUDIT",
    metric: "100% COVERAGE",
    subMetric: "CONTINUOUS SPAN TRACING",
    protocol: "OpenTelemetry • Prometheus",
    accent: "#C89B3C", // Luxury emblem gold detail
    icon: Activity,
    description: "Distributed trace spans tracking microservice boundaries, error budgets, and structured audit ledgers."
  },
  {
    id: "mod-7",
    code: "MOD_07 // WEBSOCKET_BROKER",
    title: "Bi-Directional Event Bus",
    category: "REAL-TIME COMM",
    metric: "< 8ms",
    subMetric: "BROADCAST PROPAGATION",
    protocol: "WebSockets • SSE • Redis Pub/Sub",
    accent: "#53BAC1",
    icon: Workflow,
    description: "State synchronization across millions of concurrent browser sessions with instant fallback streaming."
  },
  {
    id: "mod-8",
    code: "MOD_08 // CI_CD_DEPLOY",
    title: "Atomic Global Rollouts",
    category: "DEPLOYMENT PIPELINE",
    metric: "3.1s",
    subMetric: "INSTANT CUTOVER TIME",
    protocol: "Docker • GitHub Actions • Edge",
    accent: "#519DD9",
    icon: GitBranch,
    description: "Zero-downtime automated deployment with synthetic health check probes and instant atomic rollback."
  }
];

export function ScrollingCapabilitiesBridge() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track window scroll progress for interactive visual transition between Scene 1 and Scene 2
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      const rect = scrollRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div 
      ref={scrollRef}
      className="relative w-full bg-[#FAFAF8] border-b border-[#E5E2DB] py-14 overflow-hidden select-none"
    >
      {/* Background Gradient Transition from Scene 1 (#FAFAF8) to Scene 2 (#F0EEE9) */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FAFAF8] via-[#F7F5F1] to-[#F0EEE9] opacity-90 pointer-events-none" />

      {/* Dynamic Scroll-Linked Data Stream Line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full pointer-events-none z-0 hidden lg:block">
        <div 
          className="w-px h-full mx-auto bg-gradient-to-b from-[#519DD9]/30 via-[#53BAC1]/25 to-[#519DD9]/10 relative"
        >
          {/* Traveling packet linked to scroll progress */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 w-2 h-6 bg-[#519DD9] rounded-full shadow-[0_0_12px_#519DD9]"
            style={{ top: `${scrollProgress * 90}%` }}
          />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] font-mono text-[10px] tracking-[0.25em] text-[#519DD9] uppercase mb-2 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9] animate-pulse" />
            <span>TRANSITION BRIDGE // 01 ➔ 02</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-[#111215] uppercase tracking-tight">
            Scrolling Capabilities &amp; Software Modules Stream
          </h2>
        </div>

        <div className="flex items-center gap-4 font-mono text-[11px] text-[#565961]">
          <span className="hidden sm:inline">
            INTERACTIVE STREAM: <strong className="text-[#111215]">8 ENTERPRISE MODULES</strong>
          </span>
          <button
            onClick={() => setIsPaused(!isPaused)}
            className="px-3 py-1 bg-[#FFFFFF] hover:bg-[#F5F3EF] border border-[#E5E2DB] text-[#111215] transition-colors shadow-sm"
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
        <div className="absolute top-0 left-0 w-16 sm:w-28 h-full bg-gradient-to-r from-[#FAFAF8] to-transparent z-20 pointer-events-none" />
        <div className="absolute top-0 right-0 w-16 sm:w-28 h-full bg-gradient-to-l from-[#F0EEE9] to-transparent z-20 pointer-events-none" />

        {/* Animated conveyor */}
        <div 
          className={`flex gap-5 whitespace-nowrap will-change-transform ${
            isPaused ? "" : "animate-marquee"
          }`}
          style={{
            animationDuration: "42s",
            animationPlayState: isPaused ? "paused" : "running"
          }}
        >
          {/* Render 2 duplicates to create seamless infinite loop */}
          {[...MODULES, ...MODULES].map((mod, idx) => {
            const Icon = mod.icon;
            return (
              <div
                key={`${mod.id}-${idx}`}
                className="w-[320px] sm:w-[360px] p-5 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#519DD9] transition-all duration-300 flex-shrink-0 flex flex-col justify-between group shadow-sm hover:shadow-md"
                style={{
                  borderLeftColor: mod.accent,
                  borderLeftWidth: "3px"
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span className="text-[#71757E] tracking-widest">{mod.code}</span>
                    <span 
                      className="px-2 py-0.5 border text-[9px] uppercase font-bold"
                      style={{ 
                        color: mod.accent, 
                        borderColor: `${mod.accent}40`,
                        backgroundColor: "#FDFCFA"
                      }}
                    >
                      {mod.category}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div 
                      className="w-9 h-9 flex items-center justify-center border shrink-0 bg-[#F5F3EF]"
                      style={{ borderColor: `${mod.accent}50` }}
                    >
                      <Icon className="w-4 h-4" style={{ color: mod.accent }} />
                    </div>
                    <div>
                      <h3 className="font-sans font-bold text-base text-[#111215] group-hover:text-[#519DD9] transition-colors">
                        {mod.title}
                      </h3>
                      <div className="font-mono text-[10px] text-[#71757E]">{mod.protocol}</div>
                    </div>
                  </div>

                  <p className="font-sans text-xs text-[#4A4D54] font-normal leading-relaxed whitespace-normal line-clamp-2">
                    {mod.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-[#E5E2DB] flex items-center justify-between font-mono">
                  <div>
                    <span className="text-[9px] text-[#71757E] uppercase block">{mod.subMetric}</span>
                    <span className="text-sm font-extrabold" style={{ color: mod.accent }}>
                      {mod.metric}
                    </span>
                  </div>

                  <a 
                    href="#architecture" 
                    className="text-[10px] text-[#71757E] group-hover:text-[#519DD9] flex items-center gap-1 uppercase tracking-wider transition-colors font-medium"
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4 flex items-center justify-between font-mono text-[10px] text-[#71757E] uppercase tracking-[0.2em]">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-[#519DD9] rounded-full" />
          <span>INDEPENDENT SERVICE MESH ARCHITECTURE</span>
        </div>
        <div className="hidden sm:flex items-center gap-6">
          <span>LATENCY TARGET: &lt; 100MS P95</span>
          <span className="text-[#519DD9] font-semibold">SCROLL DOWN TO INSPECT BLUEPRINTS ↓</span>
        </div>
      </div>
    </div>
  );
}
