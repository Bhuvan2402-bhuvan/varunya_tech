"use client";

import React, { useState } from "react";
import { 
  Cpu, 
  Database, 
  Server, 
  Globe, 
  ShieldCheck, 
  Terminal, 
  Layers, 
  Activity, 
  Zap, 
  ArrowUpRight,
  Sparkles,
  CheckCircle2,
  Lock,
  GitBranch
} from "lucide-react";

interface SystemNode {
  id: string;
  name: string;
  type: string;
  category: "edge" | "gateway" | "compute" | "ai" | "database" | "telemetry";
  x: number; // percentage
  y: number; // percentage
  protocol: string;
  latency: string;
  throughput: string;
  status: "ONLINE" | "OPTIMAL" | "SYNCING";
  accentColor: string;
  glowColor: string;
  badgeBg: string;
  details: string;
  specs: string[];
  connectedTo: string[];
}

const NODES: SystemNode[] = [
  {
    id: "node-edge",
    name: "Edge CDN & Anycast",
    type: "GLOBAL INGRESS",
    category: "edge",
    x: 18,
    y: 26,
    protocol: "HTTP/3 • QUIC",
    latency: "4.8ms",
    throughput: "48.2k req/s",
    status: "OPTIMAL",
    accentColor: "#519DD9", // Brand Digital Blue
    glowColor: "rgba(81, 157, 217, 0.25)",
    badgeBg: "rgba(81, 157, 217, 0.12)",
    details: "Multi-region edge points of presence terminating TLS, caching static assets, and routing traffic with zero cold-starts.",
    specs: ["DDoS Shield Active", "Brotli Compression", "Edge V8 Workers"],
    connectedTo: ["node-gateway", "node-db"]
  },
  {
    id: "node-gateway",
    name: "API Gateway & Router",
    type: "TRAFFIC ROUTER",
    category: "gateway",
    x: 50,
    y: 18,
    protocol: "gRPC • REST • GraphQL",
    latency: "7.2ms",
    throughput: "34.1k ops/s",
    status: "ONLINE",
    accentColor: "#519DD9", // Brand Digital Blue
    glowColor: "rgba(81, 157, 217, 0.25)",
    badgeBg: "rgba(81, 157, 217, 0.12)",
    details: "Sub-10ms reverse proxy validating JWT/OAuth2 tokens, enforcing rate limits, and managing schema stitching.",
    specs: ["Zero-Trust RBAC", "Adaptive Rate Limiting", "mTLS Encryption"],
    connectedTo: ["node-edge", "node-compute", "node-ai"]
  },
  {
    id: "node-compute",
    name: "Microservices Core",
    type: "DISTRIBUTED COMPUTE",
    category: "compute",
    x: 50,
    y: 54,
    protocol: "TypeScript • Node.js",
    latency: "12.4ms",
    throughput: "22.8k jobs/m",
    status: "OPTIMAL",
    accentColor: "#53BAC1", // Brand Aqua Teal
    glowColor: "rgba(83, 186, 193, 0.25)",
    badgeBg: "rgba(83, 186, 193, 0.12)",
    details: "Modular backend services executing core business logic, background transactional workflows, and stateful synchronization.",
    specs: ["Idempotent Execution", "Distributed Locks", "Event-Driven Queues"],
    connectedTo: ["node-gateway", "node-ai", "node-db", "node-telemetry"]
  },
  {
    id: "node-ai",
    name: "AI & Vector Retrieval",
    type: "NEURAL INFERENCE",
    category: "ai",
    x: 82,
    y: 30,
    protocol: "pgvector • Embeddings",
    latency: "34.2ms",
    throughput: "6.8k tokens/s",
    status: "ONLINE",
    accentColor: "#53BAC1", // Brand Aqua Teal
    glowColor: "rgba(83, 186, 193, 0.25)",
    badgeBg: "rgba(83, 186, 193, 0.12)",
    details: "High-dimensional embedding pipelines, RAG context synthesis, and autonomous LLM tool calling in sandboxed runtimes.",
    specs: ["Dense/Sparse Hybrid", "Semantic Caching", "Streaming Synthesis"],
    connectedTo: ["node-gateway", "node-compute", "node-telemetry"]
  },
  {
    id: "node-db",
    name: "Relational DB Cluster",
    type: "PERSISTENCE TIER",
    category: "database",
    x: 22,
    y: 78,
    protocol: "PostgreSQL 16 • ACID",
    latency: "1.6ms",
    throughput: "14.2k iops",
    status: "OPTIMAL",
    accentColor: "#DB0038", // Brand Crimson
    glowColor: "rgba(219, 0, 56, 0.25)",
    badgeBg: "rgba(219, 0, 56, 0.12)",
    details: "Enterprise PostgreSQL cluster with connection pooling, automated replicas, point-in-time recovery, and Prisma ORM schemas.",
    specs: ["WAL Replication", "Encrypted at Rest", "Connection Pooling"],
    connectedTo: ["node-edge", "node-compute"]
  },
  {
    id: "node-telemetry",
    name: "Real-Time Telemetry",
    type: "OBSERVABILITY ENGINE",
    category: "telemetry",
    x: 80,
    y: 78,
    protocol: "OpenTelemetry • Spans",
    latency: "2.1ms",
    throughput: "100% Coverage",
    status: "OPTIMAL",
    accentColor: "#F7C200", // Single High-Impact Detail: Electric Yellow
    glowColor: "rgba(247, 194, 0, 0.35)",
    badgeBg: "rgba(247, 194, 0, 0.15)",
    details: "Continuous tracing across all distributed boundaries, tracking P99 latencies, error budgets, and structured audit logs.",
    specs: ["Distributed Traces", "P99 SLA Tracking", "Real-Time Alerts"],
    connectedTo: ["node-compute", "node-ai"]
  }
];

export function HeroSystemGraph() {
  const [activeNode, setActiveNode] = useState<SystemNode>(NODES[2]); // Start with Microservices Core
  const [hoveredNode, setHoveredNode] = useState<SystemNode | null>(null);
  const [simulationSpeed, setSimulationSpeed] = useState<"normal" | "boost">("normal");

  const effectiveNode = hoveredNode || activeNode;

  const getNodeIcon = (node: SystemNode) => {
    const color = node.accentColor;
    switch (node.category) {
      case "edge":
        return <Globe className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color }} />;
      case "gateway":
        return <Layers className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color }} />;
      case "compute":
        return <Cpu className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color }} />;
      case "ai":
        return <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color }} />;
      case "database":
        return <Database className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color }} />;
      case "telemetry":
        return <Activity className="w-3.5 h-3.5 sm:w-4 sm:h-4" style={{ color }} />;
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E5E2DB] relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.06)] flex flex-col group">
      
      {/* Dimensional Ambient Backlight Layer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-20"
        style={{
          background: `radial-gradient(circle at ${effectiveNode.x}% ${effectiveNode.y}%, ${effectiveNode.glowColor}, transparent 65%)`
        }}
      />

      {/* Top Console Bar */}
      <div className="px-4 sm:px-5 py-3 bg-[#F5F3EF] border-b border-[#E5E2DB] flex items-center justify-between font-mono text-[11px] text-[#565961] select-none z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#519DD9] shadow-[0_0_8px_#519DD9] animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-[#53BAC1]" />
            <span className="w-2 h-2 rounded-full bg-[#DB0038]" />
            <span className="w-2 h-2 rounded-full bg-[#F7C200]" />
          </div>
          <span className="text-[#111215] font-bold tracking-wider">ARCHITECTURE TOPOLOGY // INTERACTIVE SYSTEM</span>
          <span className="hidden sm:inline text-[#D4D0C5]">|</span>
          <span className="hidden sm:inline text-[#519DD9] font-semibold">CLICK NODES TO INSPECT</span>
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <span className="hidden md:flex items-center gap-1.5 text-[#53BAC1] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#53BAC1]" />
            <span>6/6 NODES SYNCHRONIZED</span>
          </span>
          <button
            onClick={() => setSimulationSpeed(prev => prev === "normal" ? "boost" : "normal")}
            className="px-2.5 py-1 bg-[#FFFFFF] hover:bg-[#F5F3EF] border border-[#E5E2DB] text-[#111215] transition-all font-mono shadow-sm"
          >
            RATE: {simulationSpeed === "boost" ? "⚡ 2.0x TELEMETRY" : "● 1.0x NOMINAL"}
          </button>
        </div>
      </div>

      {/* Interactive Visual Graph Canvas */}
      <div className="relative w-full h-[340px] sm:h-[380px] lg:h-[400px] bg-[#FDFCFA] bg-digital-mesh overflow-hidden">
        
        {/* SVG Interconnecting Vector Paths */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="grad-blue-teal" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#519DD9" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#53BAC1" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="grad-teal-crimson" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#53BAC1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#DB0038" stopOpacity="0.9" />
            </linearGradient>

            <linearGradient id="grad-teal-yellow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#53BAC1" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#F7C200" stopOpacity="0.95" />
            </linearGradient>

            <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Connection Lines with Dynamic Active Highlighting */}
          {/* Edge -> Gateway (Blue) */}
          <line 
            x1="18%" y1="26%" x2="50%" y2="18%" 
            stroke={effectiveNode.id === "node-edge" || effectiveNode.id === "node-gateway" ? "#519DD9" : "#DDD9D0"} 
            strokeWidth={effectiveNode.id === "node-edge" || effectiveNode.id === "node-gateway" ? 2.5 : 1.2} 
            strokeDasharray={effectiveNode.id === "node-edge" || effectiveNode.id === "node-gateway" ? "none" : "6 4"} 
          />

          {/* Edge -> DB (Crimson) */}
          <line 
            x1="18%" y1="26%" x2="22%" y2="78%" 
            stroke={effectiveNode.id === "node-edge" || effectiveNode.id === "node-db" ? "#DB0038" : "#DDD9D0"} 
            strokeWidth={effectiveNode.id === "node-edge" || effectiveNode.id === "node-db" ? 2 : 1} 
            strokeDasharray="4 4" 
          />

          {/* Gateway -> Compute (Blue to Teal) */}
          <line 
            x1="50%" y1="18%" x2="50%" y2="54%" 
            stroke={effectiveNode.id === "node-gateway" || effectiveNode.id === "node-compute" ? "#519DD9" : "#DDD9D0"} 
            strokeWidth={effectiveNode.id === "node-gateway" || effectiveNode.id === "node-compute" ? 2.5 : 1.5} 
          />

          {/* Gateway -> AI (Teal) */}
          <line 
            x1="50%" y1="18%" x2="82%" y2="30%" 
            stroke={effectiveNode.id === "node-gateway" || effectiveNode.id === "node-ai" ? "#53BAC1" : "#DDD9D0"} 
            strokeWidth={effectiveNode.id === "node-gateway" || effectiveNode.id === "node-ai" ? 2 : 1.2} 
            strokeDasharray="4 4" 
          />

          {/* Compute -> DB (Teal to Crimson) */}
          <line 
            x1="50%" y1="54%" x2="22%" y2="78%" 
            stroke={effectiveNode.id === "node-compute" || effectiveNode.id === "node-db" ? "url(#grad-teal-crimson)" : "#DDD9D0"} 
            strokeWidth={effectiveNode.id === "node-compute" || effectiveNode.id === "node-db" ? 2.5 : 1.5} 
          />

          {/* Compute -> AI (Primary Intelligence Bus - Blue/Teal) */}
          <line 
            x1="50%" y1="54%" x2="82%" y2="30%" 
            stroke={effectiveNode.id === "node-compute" || effectiveNode.id === "node-ai" ? "url(#grad-blue-teal)" : "#53BAC1"} 
            strokeWidth={effectiveNode.id === "node-compute" || effectiveNode.id === "node-ai" ? 3 : 1.8} 
            filter="url(#neon-glow)" 
          />

          {/* Compute -> Telemetry (Single High-Impact Detail - Electric Yellow) */}
          <line 
            x1="50%" y1="54%" x2="80%" y2="78%" 
            stroke={effectiveNode.id === "node-telemetry" || effectiveNode.id === "node-compute" ? "url(#grad-teal-yellow)" : "#F7C200"} 
            strokeWidth={effectiveNode.id === "node-telemetry" ? 2.5 : 1.5} 
            strokeDasharray="5 3" 
          />

          {/* AI -> Telemetry (Teal/Yellow) */}
          <line 
            x1="82%" y1="30%" x2="80%" y2="78%" 
            stroke={effectiveNode.id === "node-ai" || effectiveNode.id === "node-telemetry" ? "#53BAC1" : "#DDD9D0"} 
            strokeWidth={effectiveNode.id === "node-ai" || effectiveNode.id === "node-telemetry" ? 2 : 1} 
            strokeDasharray="4 4" 
          />

          {/* Purposeful Data Pulses */}
          {/* Pulse 1: Edge Ingress -> Compute (Digital Blue) */}
          <circle cx="18%" cy="26%" r="3.5" fill="#519DD9" filter="url(#neon-glow)">
            <animate attributeName="cx" values="18%;50%;50%;18%" dur={simulationSpeed === "boost" ? "1.6s" : "3.2s"} repeatCount="indefinite" />
            <animate attributeName="cy" values="26%;18%;54%;26%" dur={simulationSpeed === "boost" ? "1.6s" : "3.2s"} repeatCount="indefinite" />
          </circle>

          {/* Pulse 2: Compute -> Neural Inference (Aqua Teal) */}
          <circle cx="50%" cy="54%" r="4" fill="#53BAC1" filter="url(#neon-glow)">
            <animate attributeName="cx" values="50%;82%;50%" dur={simulationSpeed === "boost" ? "1.4s" : "2.8s"} repeatCount="indefinite" />
            <animate attributeName="cy" values="54%;30%;54%" dur={simulationSpeed === "boost" ? "1.4s" : "2.8s"} repeatCount="indefinite" />
          </circle>

          {/* Single High-Impact Detail Pulse 3: Compute -> Telemetry (Electric Yellow) */}
          <circle cx="50%" cy="54%" r="3.5" fill="#F7C200" filter="url(#neon-glow)">
            <animate attributeName="cx" values="50%;80%;50%" dur={simulationSpeed === "boost" ? "2s" : "4s"} repeatCount="indefinite" />
            <animate attributeName="cy" values="54%;78%;54%" dur={simulationSpeed === "boost" ? "2s" : "4s"} repeatCount="indefinite" />
          </circle>
        </svg>

        {/* Node Interactive Elements */}
        {NODES.map((node) => {
          const isSelected = activeNode.id === node.id;
          const isHovered = hoveredNode?.id === node.id;
          const isActive = isSelected || isHovered;

          return (
            <div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group/node z-20"
              onClick={() => setActiveNode(node)}
              onMouseEnter={() => setHoveredNode(node)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Pulsing halo for active node */}
              {isActive && (
                <div 
                  className="absolute -inset-2.5 sm:-inset-3.5 border-2 animate-ping rounded-none pointer-events-none opacity-40"
                  style={{ borderColor: node.accentColor }}
                />
              )}

              {/* Node Card Button in Crisp White with Ivory Framing */}
              <div
                className={`flex items-center gap-2 sm:gap-3 px-2.5 py-1.5 sm:px-3.5 sm:py-2 transition-all duration-300 border ${
                  isActive
                    ? "bg-[#FFFFFF] shadow-xl scale-105"
                    : "bg-[#FFFFFF] border-[#E5E2DB] hover:border-[#111215] shadow-sm hover:bg-[#FAF9F6]"
                }`}
                style={{
                  borderColor: isActive ? node.accentColor : undefined,
                  boxShadow: isActive ? `0 10px 25px ${node.glowColor}` : undefined
                }}
              >
                <div 
                  className="w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 border"
                  style={{
                    backgroundColor: node.badgeBg,
                    borderColor: node.accentColor
                  }}
                >
                  {getNodeIcon(node)}
                </div>

                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <span 
                      className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider font-bold"
                      style={{ color: node.accentColor }}
                    >
                      {node.type}
                    </span>
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full" style={{ backgroundColor: node.accentColor }} />
                  </div>
                  <span className="font-sans font-bold text-[11px] sm:text-xs text-[#111215] whitespace-nowrap">
                    {node.name}
                  </span>
                </div>
              </div>

              {/* Latency Pill */}
              <div className="mt-1 flex items-center justify-center">
                <span 
                  className="font-mono text-[8px] sm:text-[9px] px-1.5 py-0.5 bg-[#FFFFFF] border text-[#111215] font-semibold shadow-sm"
                  style={{ borderColor: node.accentColor }}
                >
                  {node.latency}
                </span>
              </div>
            </div>
          );
        })}

        {/* Dynamic Watermark Badge */}
        <div className="absolute bottom-2.5 left-3 sm:left-4 pointer-events-none font-mono text-[9px] text-[#519DD9] uppercase tracking-[0.25em] flex items-center gap-2 font-semibold">
          <span className="w-1.5 h-1.5 bg-[#519DD9] rounded-full animate-pulse" />
          <span>REAL-TIME MULTI-TIER TOPOLOGY • CLICK NODE TO INSPECT</span>
        </div>
      </div>

      {/* Active Node Detail Inspector Drawer */}
      <div 
        className="p-4 sm:p-6 bg-[#F5F3EF] border-t border-[#E5E2DB] grid grid-cols-1 md:grid-cols-12 gap-5 items-center relative transition-all duration-300"
        style={{
          borderTopColor: activeNode.accentColor
        }}
      >
        {/* Left Column: Node Summary (5 cols) */}
        <div className="md:col-span-5 space-y-2">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
            <span 
              className="px-2.5 py-0.5 border font-bold text-[#FFFFFF]"
              style={{
                backgroundColor: activeNode.accentColor,
                borderColor: activeNode.accentColor
              }}
            >
              NODE: {activeNode.type}
            </span>
            <span style={{ color: activeNode.accentColor }}>●</span>
            <span className="text-[#111215] font-bold">{activeNode.status}</span>
          </div>

          <h3 className="font-sans text-lg sm:text-xl font-extrabold text-[#111215] tracking-tight">
            {activeNode.name}
          </h3>

          <p className="font-sans text-xs text-[#4A4D54] leading-relaxed">
            {activeNode.details}
          </p>
        </div>

        {/* Center: Live Metrics Telemetry (4 cols) */}
        <div className="md:col-span-4 grid grid-cols-2 gap-3 font-mono text-xs">
          <div className="p-3 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm space-y-1">
            <div className="text-[9px] sm:text-[10px] text-[#71757E] uppercase">TRANSMISSION LATENCY</div>
            <div className="text-base sm:text-lg font-extrabold" style={{ color: activeNode.accentColor }}>
              {activeNode.latency}
            </div>
            <div className="text-[8px] sm:text-[9px] text-[#71757E]">P99 SLA BENCHMARK</div>
          </div>

          <div className="p-3 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm space-y-1">
            <div className="text-[9px] sm:text-[10px] text-[#71757E] uppercase">THROUGHPUT CAPACITY</div>
            <div className="text-base sm:text-lg font-extrabold text-[#111215]">
              {activeNode.throughput}
            </div>
            <div className="text-[8px] sm:text-[9px] text-[#71757E]">LOAD TEST VERIFIED</div>
          </div>
        </div>

        {/* Right: Technical Protocol Specs (3 cols) */}
        <div className="md:col-span-3 space-y-2 border-l md:border-[#E5E2DB] md:pl-5">
          <div className="font-mono text-[10px] text-[#71757E] uppercase tracking-wider font-bold">
            PROTOCOL &amp; SECURITY:
          </div>
          <div 
            className="font-mono text-xs text-[#111215] bg-[#FFFFFF] px-2.5 py-1.5 border font-semibold shadow-sm"
            style={{ borderColor: activeNode.accentColor }}
          >
            {activeNode.protocol}
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {activeNode.specs.map((spec, i) => (
              <span 
                key={i} 
                className="font-mono text-[8px] sm:text-[9px] px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E2DB] text-[#4A4D54]"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
