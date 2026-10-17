"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Play, CheckCircle2, RefreshCw, Cpu, Database, Shield, Zap } from "lucide-react";

interface PipelineStep {
  id: number;
  label: string;
  name: string;
  subsystem: string;
  latencyMs: number;
  accentColor: string;
  glowColor: string;
  description: string;
  payloadSnippet: string;
}

const STEPS: PipelineStep[] = [
  {
    id: 1,
    label: "PHASE 01",
    name: "Semantic Gateway & Guardrails",
    subsystem: "Ingress Filter",
    latencyMs: 1.2,
    accentColor: "#519DD9", // Digital Blue
    glowColor: "rgba(81, 157, 217, 0.2)",
    description: "Inbound prompt tokenization, regex injection detection, and rate quota verification.",
    payloadSnippet: `{\n  "tenantId": "org_enterprise_91",\n  "intent": "FINANCIAL_AUDIT_QUERY",\n  "safetyPassed": true,\n  "sanitizedTokens": 142\n}`
  },
  {
    id: 2,
    label: "PHASE 02",
    name: "Vector Embedding Generation",
    subsystem: "Embedding Engine",
    latencyMs: 14.6,
    accentColor: "#53BAC1", // Aqua Teal
    glowColor: "rgba(83, 186, 193, 0.2)",
    description: "Generates high-dimensional vector embeddings with normalized L2 distance across 1,536 dimensions.",
    payloadSnippet: `{\n  "vectorDim": 1536,\n  "embeddingSample": [0.0142, -0.0891, 0.0521, ...],\n  "normScore": 1.000\n}`
  },
  {
    id: 3,
    label: "PHASE 03",
    name: "HNSW Vector Cosine Retrieval",
    subsystem: "pgvector Index",
    latencyMs: 16.8,
    accentColor: "#53BAC1", // Aqua Teal
    glowColor: "rgba(83, 186, 193, 0.25)",
    description: "Sub-20ms nearest-neighbor search querying isolated tenant documents with cosine threshold >= 0.82.",
    payloadSnippet: `{\n  "matchedChunks": 4,\n  "topSimilarity": 0.941,\n  "sourceTable": "EnterpriseDocEmbeddings",\n  "hnswScanMs": 16.8\n}`
  },
  {
    id: 4,
    label: "PHASE 04",
    name: "Context Compaction & Re-ranking",
    subsystem: "RAG Synthesizer",
    latencyMs: 3.4,
    accentColor: "#519DD9", // Digital Blue
    glowColor: "rgba(81, 157, 217, 0.2)",
    description: "De-duplicates retrieved paragraphs, injects system prompt constraints, and formats verified context.",
    payloadSnippet: `{\n  "contextTokens": 1420,\n  "dedupRatio": 0.88,\n  "promptSchema": "STRICT_JSON_V2",\n  "reRankConfidence": 0.96\n}`
  },
  {
    id: 5,
    label: "PHASE 05",
    name: "Sandboxed Execution & Streaming",
    subsystem: "Inference Engine",
    latencyMs: 46.2,
    accentColor: "#53BAC1", // Aqua Teal
    glowColor: "rgba(83, 186, 193, 0.25)",
    description: "Invokes tool-calling schema, verifies JSON output against Zod contracts, and streams response to client.",
    payloadSnippet: `{\n  "status": "SUCCESS",\n  "schemaValidated": true,\n  "outputFormat": "STREAMED_SSE",\n  "totalPipelineLatency": "82.2ms"\n}`
  }
];

export function StageAiPipeline() {
  const [activeStepIndex, setActiveStepIndex] = useState(2); // Start on vector retrieval
  const [isRunningSimulation, setIsRunningSimulation] = useState(false);

  const runSimulation = () => {
    if (isRunningSimulation) return;
    setIsRunningSimulation(true);
    let step = 0;
    setActiveStepIndex(0);

    const interval = setInterval(() => {
      step++;
      if (step < STEPS.length) {
        setActiveStepIndex(step);
      } else {
        clearInterval(interval);
        setIsRunningSimulation(false);
      }
    }, 650);
  };

  const activeStep = STEPS[activeStepIndex];
  const accumulatedLatency = STEPS.slice(0, activeStepIndex + 1).reduce((acc, curr) => acc + curr.latencyMs, 0);

  return (
    <section id="intelligence" className="py-24 border-b border-[#E5E2DB] bg-[#FAFAF8] relative overflow-hidden">
      {/* Ambient digital glow */}
      <div 
        className="absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-[140px] pointer-events-none opacity-20 transition-all duration-700"
        style={{ backgroundColor: activeStep.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#E5E2DB] pb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] font-mono text-[10px] uppercase tracking-[0.25em] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#53BAC1] shadow-[0_0_8px_#53BAC1] animate-pulse" />
              <span className="text-[#53BAC1] font-bold">SCENE 03 // AI &amp; AUTOMATION SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111215] tracking-tight font-sans">
              Autonomous, Structured, <span className="text-[#53BAC1]">Sub-100ms.</span>
            </h2>
            <p className="text-[#4A4D54] text-base font-normal leading-relaxed">
              Aqua teal for connected nodes, data pathways, intelligent automation, and model visualizations engineered to eliminate hallucinated schema outputs.
            </p>
          </div>

          <div className="font-mono text-xs text-[#71757E] shrink-0 flex items-center gap-2 bg-[#FFFFFF] px-3.5 py-2 border border-[#E5E2DB] shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#53BAC1]" />
            <span>LATENCY SLA: <strong className="text-[#111215]">&lt; 100MS END-TO-END</strong></span>
          </div>
        </div>

        {/* Interactive Pipeline Visualizer Box with Glow */}
        <div 
          className="bg-[#FFFFFF] border p-8 lg:p-12 space-y-10 shadow-xl transition-all duration-300"
          style={{ borderColor: activeStep.accentColor }}
        >
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E5E2DB] pb-6">
            <div>
              <span 
                className="font-mono text-[10px] uppercase tracking-widest block mb-1 font-bold"
                style={{ color: activeStep.accentColor }}
              >
                PIPELINE EXECUTION SIMULATION
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#111215] font-sans">
                Neural Inference &amp; Vector Trace
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={runSimulation}
                disabled={isRunningSimulation}
                className={`px-5 py-2.5 font-mono text-xs uppercase tracking-wider font-extrabold transition-all flex items-center gap-2 border shadow-sm ${
                  isRunningSimulation
                    ? "bg-[#F5F3EF] text-[#71757E] border-[#E5E2DB] cursor-not-allowed"
                    : "bg-[#111215] text-[#FFFFFF] hover:bg-[#53BAC1] hover:text-[#111215] border-[#111215]"
                }`}
              >
                {isRunningSimulation ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>EXECUTING TRACE...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>RUN INFERENCE TRACE</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 5 Sequential Phase Steps */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {STEPS.map((s, idx) => {
              const isActive = activeStepIndex === idx;
              const isPast = activeStepIndex > idx;
              return (
                <div
                  key={s.id}
                  onClick={() => setActiveStepIndex(idx)}
                  className={`p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 relative ${
                    isActive
                      ? "bg-[#FFFFFF] scale-[1.03] shadow-lg"
                      : isPast
                      ? "bg-[#F5F3EF] border-[#E5E2DB] text-[#4A4D54]"
                      : "bg-[#FAFAF8] border-[#E5E2DB] text-[#71757E] hover:border-[#111215]"
                  }`}
                  style={{
                    borderColor: isActive ? s.accentColor : undefined,
                    boxShadow: isActive ? `0 10px 25px ${s.glowColor}` : undefined
                  }}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span 
                      className="font-bold tracking-wider"
                      style={{ color: isActive ? s.accentColor : "#71757E" }}
                    >
                      {s.label}
                    </span>
                    <span className="font-semibold text-[#111215]">{s.latencyMs}ms</span>
                  </div>

                  <div>
                    <div 
                      className="font-mono text-[9px] uppercase tracking-wider font-semibold"
                      style={{ color: isActive ? s.accentColor : "#71757E" }}
                    >
                      {s.subsystem}
                    </div>
                    <div className="font-sans font-bold text-xs text-[#111215] mt-0.5 line-clamp-2">
                      {s.name}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[#E5E2DB] flex items-center justify-between text-[10px] font-mono">
                    <span 
                      className="font-bold"
                      style={{ color: isActive ? s.accentColor : isPast ? "#53BAC1" : "#71757E" }}
                    >
                      {isPast ? "COMPLETED" : isActive ? "ACTIVE" : "STANDBY"}
                    </span>
                    {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-[#53BAC1]" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Detail & Payload Inspector with White & Ivory Styling */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#F5F3EF] border border-[#E5E2DB] p-6 sm:p-8">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] font-mono text-[10px] uppercase shadow-sm">
                <span className="font-bold" style={{ color: activeStep.accentColor }}>STAGE // {activeStep.label}</span>
                <span className="text-[#D4D0C5]">|</span>
                <span className="text-[#111215] font-semibold">{activeStep.subsystem}</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-extrabold text-[#111215] font-sans">
                {activeStep.name}
              </h4>

              <p className="text-xs text-[#4A4D54] font-normal leading-relaxed">
                {activeStep.description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
                <div className="p-3.5 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm">
                  <div className="text-[10px] text-[#71757E]">STEP EXECUTION TIME</div>
                  <div className="text-base font-extrabold" style={{ color: activeStep.accentColor }}>
                    {activeStep.latencyMs} ms
                  </div>
                </div>
                <div className="p-3.5 bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm">
                  <div className="text-[10px] text-[#71757E]">CUMULATIVE PIPELINE</div>
                  <div className="text-base font-extrabold text-[#519DD9]">
                    {accumulatedLatency.toFixed(1)} ms
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Simulated JSON Payload inside clean dark terminal for high code contrast */}
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center justify-between font-mono text-[10px] text-[#71757E] uppercase">
                <span className="text-[#53BAC1] font-bold">INTERMEDIATE TELEMETRY STREAM</span>
                <span className="text-[#111215] font-semibold">JSON V2.1</span>
              </div>
              <pre 
                className="p-4 bg-[#181A20] border font-mono text-xs text-[#F2F4F6] overflow-x-auto leading-relaxed shadow-md"
                style={{ borderColor: activeStep.accentColor }}
              >
                <code>{activeStep.payloadSnippet}</code>
              </pre>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
