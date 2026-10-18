"use client";

import React, { useState } from "react";
import { 
  Cpu, 
  Database, 
  Globe, 
  Layers, 
  Activity, 
  Sparkles, 
  CheckCircle2, 
  Info
} from "lucide-react";

interface SystemNode {
  id: string;
  name: string;
  type: string;
  category: "edge" | "gateway" | "compute" | "ai" | "database" | "telemetry";
  x: number; // percentage
  y: number; // percentage
  protocol: string;
  latencyTarget: string;
  capacitySpec: string;
  patternStatus: "PRODUCTION PATTERN" | "ARCHITECTURE TARGET" | "CAPABILITY BLUEPRINT";
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
    name: "Edge Ingress & Caching",
    type: "INGRESS & CDN LAYER",
    category: "edge",
    x: 18,
    y: 26,
    protocol: "HTTP/3 • TLS 1.3 • CDN",
    latencyTarget: "< 10ms P95",
    capacitySpec: "Auto-Scaled Edge",
    patternStatus: "ARCHITECTURE TARGET",
    accentColor: "#519DD9", // Brand Digital Blue
    glowColor: "rgba(81, 157, 217, 0.25)",
    badgeBg: "rgba(81, 157, 217, 0.15)",
    details: "Architecture pattern leveraging edge CDN points of presence, modern TLS 1.3 termination, Brotli compression, and static asset caching.",
    specs: ["DDoS Mitigation Pattern", "Brotli Compression", "Regional Asset Caching"],
    connectedTo: ["node-gateway", "node-db"]
  },
  {
    id: "node-gateway",
    name: "API Gateway & Router",
    type: "TRAFFIC ORCHESTRATION",
    category: "gateway",
    x: 50,
    y: 18,
    protocol: "REST • GraphQL • JSON",
    latencyTarget: "< 15ms P95",
    capacitySpec: "Rate-Guarded Ingress",
    patternStatus: "PRODUCTION PATTERN",
    accentColor: "#519DD9", // Brand Digital Blue
    glowColor: "rgba(81, 157, 217, 0.25)",
    badgeBg: "rgba(81, 157, 217, 0.15)",
    details: "Reverse proxy layer enforcing cryptographic session validation, role-based authorization, rate limiting, and route dispatching.",
    specs: ["RBAC Access Control", "Rate Quota Guards", "Cryptographic Session Check"],
    connectedTo: ["node-edge", "node-compute", "node-ai"]
  },
  {
    id: "node-compute",
    name: "Modular Core Services",
    type: "APPLICATION RUNTIME",
    category: "compute",
    x: 50,
    y: 54,
    protocol: "TypeScript • Node.js",
    latencyTarget: "< 25ms P95",
    capacitySpec: "Stateless Cluster",
    patternStatus: "PRODUCTION PATTERN",
    accentColor: "#53BAC1", // Brand Aqua Teal
    glowColor: "rgba(83, 186, 193, 0.25)",
    badgeBg: "rgba(83, 186, 193, 0.15)",
    details: "Modular backend services executing business logic, transactional mutations, and asynchronous jobs with strict schema validation.",
    specs: ["Type-Safe Zod Contracts", "Idempotent Handlers", "Decoupled Domain Services"],
    connectedTo: ["node-gateway", "node-ai", "node-db", "node-telemetry"]
  },
  {
    id: "node-ai",
    name: "AI & Vector Retrieval",
    type: "NEURAL RETRIEVAL PIPELINE",
    category: "ai",
    x: 82,
    y: 30,
    protocol: "pgvector • Embeddings",
    latencyTarget: "< 100ms P95",
    capacitySpec: "Streaming Vectors",
    patternStatus: "CAPABILITY BLUEPRINT",
    accentColor: "#53BAC1", // Brand Aqua Teal
    glowColor: "rgba(83, 186, 193, 0.25)",
    badgeBg: "rgba(83, 186, 193, 0.15)",
    details: "Vector retrieval pipeline connecting isolated client data stores to AI models with semantic caching and structured output validation.",
    specs: ["pgvector Cosine Search", "Context Compaction", "Zod Schema Verification"],
    connectedTo: ["node-gateway", "node-compute", "node-telemetry"]
  },
  {
    id: "node-db",
    name: "Relational Persistence",
    type: "PERSISTENCE TIER",
    category: "database",
    x: 22,
    y: 78,
    protocol: "PostgreSQL 16 • ACID",
    latencyTarget: "< 5ms P95",
    capacitySpec: "Pooled 100% ACID",
    patternStatus: "PRODUCTION PATTERN",
    accentColor: "#DB0038", // Brand Crimson
    glowColor: "rgba(219, 0, 56, 0.25)",
    badgeBg: "rgba(219, 0, 56, 0.15)",
    details: "ACID-compliant relational database schemas with connection pooling, multi-tenant row-level security, and point-in-time recovery.",
    specs: ["ACID Compliance", "Connection Pooling", "Row-Level Security (RLS)"],
    connectedTo: ["node-edge", "node-compute"]
  },
  {
    id: "node-telemetry",
    name: "Observability & Tracing",
    type: "OBSERVABILITY ENGINE",
    category: "telemetry",
    x: 80,
    y: 78,
    protocol: "OpenTelemetry Standards",
    latencyTarget: "< 5ms Ingest",
    capacitySpec: "Distributed Spans",
    patternStatus: "PRODUCTION PATTERN",
    accentColor: "#F7C200", // Electric Yellow
    glowColor: "rgba(247, 194, 0, 0.3)",
    badgeBg: "rgba(247, 194, 0, 0.15)",
    details: "Continuous observability capturing application spans, health probe evaluations, and structured audit logs across service boundaries.",
    specs: ["Structured Logging", "Synthetic Health Probes", "Error Budget Tracking"],
    connectedTo: ["node-compute", "node-ai"]
  }
];

export function HeroSystemGraph() {
  const [activeNode, setActiveNode] = useState<SystemNode>(NODES[2]); // Start on Modular Core Services
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
    <div className="w-full bg-white border border-gray-200 relative overflow-hidden shadow-sm flex flex-col group rounded-xl">
      
      {/* Dimensional Ambient Backlight Layer */}
      <div 
        className="absolute inset-0 pointer-events-none transition-all duration-700 opacity-20"
        style={{
          background: `radial-gradient(circle at ${effectiveNode.x}% ${effectiveNode.y}%, ${effectiveNode.glowColor}, transparent 65%)`
        }}
      />

      {/* Top Console Bar */}
      <div className="px-4 sm:px-5 py-3 bg-[#F9FAFB] border-b border-gray-200 flex items-center justify-between font-mono text-[11px] text-[#4B5563] select-none z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#519DD9] shadow-[0_0_8px_#519DD9] animate-pulse" />
            <span className="w-2 h-2 rounded-full bg-[#53BAC1]" />
            <span className="w-2 h-2 rounded-full bg-[#DB0038]" />
            <span className="w-2 h-2 rounded-full bg-[#F7C200]" />
          </div>
          <span className="text-[#17191D] font-bold tracking-wider">SYSTEM ARCHITECTURE // BLUEPRINT TOPOLOGY</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span className="hidden sm:inline text-[#519DD9] font-semibold">CLICK NODES TO INSPECT</span>
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <span className="hidden md:flex items-center gap-1.5 text-[#0F766E] font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#53BAC1]" />
            <span>REPRESENTATIVE BLUEPRINT</span>
          </span>
          <button
            onClick={() => setSimulationSpeed(prev => prev === "normal" ? "boost" : "normal")}
            className="px-2.5 py-1 bg-white hover:bg-gray-50 border border-gray-200 text-[#17191D] transition-all font-mono shadow-xs"
          >
            DATA FLOW: {simulationSpeed === "boost" ? "⚡ 2.0x FLOW" : "● 1.0x NOMINAL"}
          </button>
        </div>
      </div>

      {/* Interactive Visual Graph Canvas */}
      <div className="relative w-full h-[340px] sm:h-[380px] lg:h-[400px] bg-white bg-digital-mesh overflow-hidden">
        
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
            stroke={effectiveNode.id === "node-edge" || effectiveNode.id === "node-gateway" ? "#519DD9" : "#E5E7EB"} 
            strokeWidth={effectiveNode.id === "node-edge" || effectiveNode.id === "node-gateway" ? 2.5 : 1.2} 
            strokeDasharray={effectiveNode.id === "node-edge" || effectiveNode.id === "node-gateway" ? "none" : "6 4"} 
          />

          {/* Edge -> DB (Crimson) */}
          <line 
            x1="18%" y1="26%" x2="22%" y2="78%" 
            stroke={effectiveNode.id === "node-edge" || effectiveNode.id === "node-db" ? "#DB0038" : "#E5E7EB"} 
            strokeWidth={effectiveNode.id === "node-edge" || effectiveNode.id === "node-db" ? 2 : 1} 
            strokeDasharray="4 4" 
          />

          {/* Gateway -> Compute (Blue to Teal) */}
          <line 
            x1="50%" y1="18%" x2="50%" y2="54%" 
            stroke={effectiveNode.id === "node-gateway" || effectiveNode.id === "node-compute" ? "#519DD9" : "#E5E7EB"} 
            strokeWidth={effectiveNode.id === "node-gateway" || effectiveNode.id === "node-compute" ? 2.5 : 1.5} 
          />

          {/* Gateway -> AI (Teal) */}
          <line 
            x1="50%" y1="18%" x2="82%" y2="30%" 
            stroke={effectiveNode.id === "node-gateway" || effectiveNode.id === "node-ai" ? "#53BAC1" : "#E5E7EB"} 
            strokeWidth={effectiveNode.id === "node-gateway" || effectiveNode.id === "node-ai" ? 2 : 1.2} 
            strokeDasharray="4 4" 
          />

          {/* Compute -> DB (Teal to Crimson) */}
          <line 
            x1="50%" y1="54%" x2="22%" y2="78%" 
            stroke={effectiveNode.id === "node-compute" || effectiveNode.id === "node-db" ? "url(#grad-teal-crimson)" : "#E5E7EB"} 
            strokeWidth={effectiveNode.id === "node-compute" || effectiveNode.id === "node-db" ? 2.5 : 1.5} 
          />

          {/* Compute -> AI (Primary Intelligence Bus - Blue/Teal) */}
          <line 
            x1="50%" y1="54%" x2="82%" y2="30%" 
            stroke={effectiveNode.id === "node-compute" || effectiveNode.id === "node-ai" ? "url(#grad-blue-teal)" : "#53BAC1"} 
            strokeWidth={effectiveNode.id === "node-compute" || effectiveNode.id === "node-ai" ? 3 : 1.8} 
            filter="url(#neon-glow)" 
          />

          {/* Compute -> Telemetry (Electric Yellow) */}
          <line 
            x1="50%" y1="54%" x2="80%" y2="78%" 
            stroke={effectiveNode.id === "node-telemetry" || effectiveNode.id === "node-compute" ? "url(#grad-teal-yellow)" : "#F7C200"} 
            strokeWidth={effectiveNode.id === "node-telemetry" ? 2.5 : 1.5} 
            strokeDasharray="5 3" 
          />

          {/* AI -> Telemetry (Teal/Yellow) */}
          <line 
            x1="82%" y1="30%" x2="80%" y2="78%" 
            stroke={effectiveNode.id === "node-ai" || effectiveNode.id === "node-telemetry" ? "#53BAC1" : "#E5E7EB"} 
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

          {/* Pulse 3: Compute -> Telemetry (Electric Yellow) */}
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
                  className="absolute -inset-2.5 sm:-inset-3.5 border-2 animate-ping rounded-none pointer-events-none opacity-30"
                  style={{ borderColor: node.accentColor }}
                />
              )}

              {/* Node Card Button in Clean Light Surface */}
              <div
                className={`flex items-center gap-2 sm:gap-3 px-2.5 py-1.5 sm:px-3.5 sm:py-2 transition-all duration-300 border ${
                  isActive
                    ? "bg-white shadow-xl scale-105"
                    : "bg-white border-gray-200 hover:border-gray-400 shadow-xs hover:bg-gray-50"
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
                  <span className="font-sans font-bold text-[11px] sm:text-xs text-[#17191D] whitespace-nowrap">
                    {node.name}
                  </span>
                </div>
              </div>

              {/* Latency / Spec Pill */}
              <div className="mt-1 flex items-center justify-center">
                <span 
                  className="font-mono text-[8px] sm:text-[9px] px-1.5 py-0.5 bg-white border text-[#17191D] font-bold shadow-xs whitespace-nowrap"
                  style={{ borderColor: node.accentColor }}
                >
                  {node.latencyTarget}
                </span>
              </div>
            </div>
          );
        })}

        {/* Dynamic Watermark Badge */}
        <div className="absolute bottom-2.5 left-3 sm:left-4 pointer-events-none font-mono text-[9px] text-[#519DD9] uppercase tracking-[0.25em] flex items-center gap-2 font-semibold">
          <span className="w-1.5 h-1.5 bg-[#519DD9] rounded-full animate-pulse" />
          <span>REPRESENTATIVE MULTI-TIER ARCHITECTURE • CLICK NODE TO INSPECT</span>
        </div>
      </div>

      {/* Active Node Detail Inspector Drawer */}
      <div 
        className="p-4 sm:p-6 bg-[#F9FAFB] border-t border-gray-200 grid grid-cols-1 md:grid-cols-12 gap-5 items-center relative transition-all duration-300"
        style={{
          borderTopColor: activeNode.accentColor
        }}
      >
        {/* Left Column: Node Summary (5 cols) */}
        <div className="md:col-span-5 space-y-2">
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest">
            <span 
              className="px-2.5 py-0.5 border font-bold text-white"
              style={{
                backgroundColor: activeNode.accentColor,
                borderColor: activeNode.accentColor
              }}
            >
              TIER: {activeNode.type}
            </span>
            <span style={{ color: activeNode.accentColor }}>●</span>
            <span className="text-[#17191D] font-bold">{activeNode.patternStatus}</span>
          </div>

          <h3 className="font-sans text-lg sm:text-xl font-extrabold text-[#17191D] tracking-tight">
            {activeNode.name}
          </h3>

          <p className="font-sans text-xs text-[#4B5563] leading-relaxed">
            {activeNode.details}
          </p>
        </div>

        {/* Center: Design Metrics Telemetry (4 cols) */}
        <div className="md:col-span-4 grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono">
          <div className="p-3 bg-white border border-gray-200 shadow-xs flex flex-col justify-between min-w-0">
            <div className="text-[9px] text-[#6B7280] uppercase font-bold tracking-wider">LATENCY TARGET</div>
            <div 
              className="text-base sm:text-lg font-black tracking-tight whitespace-nowrap truncate py-0.5" 
              style={{ color: activeNode.accentColor }}
              title={activeNode.latencyTarget}
            >
              {activeNode.latencyTarget}
            </div>
            <div className="text-[8px] text-[#6B7280] uppercase font-medium">DESIGN SPECIFICATION</div>
          </div>

          <div className="p-3 bg-white border border-gray-200 shadow-xs flex flex-col justify-between min-w-0">
            <div className="text-[9px] text-[#6B7280] uppercase font-bold tracking-wider">CAPACITY MODEL</div>
            <div 
              className="text-sm sm:text-base font-bold text-[#17191D] tracking-tight whitespace-nowrap truncate py-0.5"
              title={activeNode.capacitySpec}
            >
              {activeNode.capacitySpec}
            </div>
            <div className="text-[8px] text-[#6B7280] uppercase font-medium">CONFIGURED PER TIER</div>
          </div>
        </div>

        {/* Right: Technical Protocol Specs (3 cols) */}
        <div className="md:col-span-3 space-y-2 border-l md:border-gray-200 md:pl-5">
          <div className="font-mono text-[10px] text-[#6B7280] uppercase tracking-wider font-bold">
            PROTOCOL &amp; STANDARDS:
          </div>
          <div 
            className="font-mono text-xs text-[#17191D] bg-white px-2.5 py-1.5 border font-semibold shadow-xs"
            style={{ borderColor: activeNode.accentColor }}
          >
            {activeNode.protocol}
          </div>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {activeNode.specs.map((spec, i) => (
              <span 
                key={i} 
                className="font-mono text-[8px] sm:text-[9px] px-2 py-0.5 bg-white border border-gray-200 text-[#4B5563]"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Credibility Footer Bar */}
      <div className="px-4 py-2 bg-white border-t border-gray-200 flex items-center justify-between text-[10px] font-mono text-[#6B7280]">
        <div className="flex items-center gap-1.5">
          <Info className="w-3 h-3 text-[#519DD9]" />
          <span>Diagram illustrates representative architecture patterns engineered for client projects. Performance targets depend on infrastructure sizing.</span>
        </div>
      </div>
    </div>
  );
}
