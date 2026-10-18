"use client";

import React, { useState } from "react";
import { Play, CheckCircle2, RefreshCw, Info } from "lucide-react";

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
    description: "Inbound prompt tokenization, input validation, and rate quota verification.",
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
    description: "Generates high-dimensional vector embeddings with normalized distance across 1,536 dimensions.",
    payloadSnippet: `{\n  "vectorDim": 1536,\n  "embeddingSample": [0.0142, -0.0891, 0.0521, ...],\n  "normScore": 1.000\n}`
  },
  {
    id: 3,
    label: "PHASE 03",
    name: "Vector Cosine Retrieval",
    subsystem: "pgvector Index",
    latencyMs: 16.8,
    accentColor: "#53BAC1", // Aqua Teal
    glowColor: "rgba(83, 186, 193, 0.25)",
    description: "Nearest-neighbor search querying isolated client documents with cosine threshold >= 0.82.",
    payloadSnippet: `{\n  "matchedChunks": 4,\n  "topSimilarity": 0.941,\n  "sourceTable": "EnterpriseDocEmbeddings",\n  "hnswScanMs": 16.8\n}`
  },
  {
    id: 4,
    label: "PHASE 04",
    name: "Context Compaction & Formatting",
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
    <section id="intelligence" className="py-24 border-b border-gray-200 bg-[#F9FAFB] relative overflow-hidden">
      {/* Ambient digital glow */}
      <div 
        className="absolute top-1/2 -right-32 w-96 h-96 rounded-full blur-[160px] pointer-events-none opacity-15 transition-all duration-700"
        style={{ backgroundColor: activeStep.accentColor }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 font-mono text-[10px] uppercase tracking-[0.25em] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#53BAC1] shadow-[0_0_8px_#53BAC1] animate-pulse" />
              <span className="text-[#0F766E] font-bold">SCENE 03 // AI &amp; AUTOMATION SYSTEMS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-[#17191D] tracking-tight font-sans">
              Autonomous, Structured, <span className="text-[#0F766E]">Deterministic.</span>
            </h2>
            <p className="text-[#4B5563] text-base font-normal leading-relaxed">
              Interactive simulation demonstrating how our retrieval-augmented generation pipelines enforce Zod schema validation and eliminate hallucinated data structures.
            </p>
          </div>

          <div className="font-mono text-xs text-[#4B5563] shrink-0 flex items-center gap-2 bg-white px-3.5 py-2 border border-gray-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#53BAC1]" />
            <span>DESIGN TARGET: <strong className="text-[#17191D]">&lt; 100MS BENCHMARK</strong></span>
          </div>
        </div>

        {/* Interactive Pipeline Visualizer Box */}
        <div 
          className="bg-white border p-8 lg:p-12 space-y-10 shadow-md transition-all duration-300 rounded-xl"
          style={{ borderColor: activeStep.accentColor }}
        >
          
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-200 pb-6">
            <div>
              <span 
                className="font-mono text-[10px] uppercase tracking-widest block mb-1 font-bold"
                style={{ color: activeStep.accentColor }}
              >
                INTERACTIVE PIPELINE SIMULATION
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#17191D] font-sans">
                Neural Inference &amp; Vector Trace
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={runSimulation}
                disabled={isRunningSimulation}
                className={`px-5 py-2.5 font-mono text-xs uppercase tracking-wider font-extrabold transition-all flex items-center gap-2 border shadow-xs rounded-lg ${
                  isRunningSimulation
                    ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                    : "bg-[#0F766E] text-white hover:bg-[#0d655e] border-[#0F766E] font-bold"
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
                  className={`p-5 border transition-all duration-300 cursor-pointer flex flex-col justify-between space-y-3 relative rounded-lg ${
                    isActive
                      ? "bg-white scale-[1.03] shadow-md"
                      : isPast
                      ? "bg-[#F9FAFB] border-gray-200 text-[#4B5563]"
                      : "bg-white border-gray-200 text-[#6B7280] hover:border-gray-400"
                  }`}
                  style={{
                    borderColor: isActive ? s.accentColor : undefined,
                    boxShadow: isActive ? `0 10px 25px ${s.glowColor}` : undefined
                  }}
                >
                  <div className="flex items-center justify-between font-mono text-[10px]">
                    <span 
                      className="font-bold tracking-wider"
                      style={{ color: isActive ? s.accentColor : "#6B7280" }}
                    >
                      {s.label}
                    </span>
                    <span className="font-semibold text-[#17191D]">{s.latencyMs}ms</span>
                  </div>

                  <div>
                    <div 
                      className="font-mono text-[9px] uppercase tracking-wider font-semibold"
                      style={{ color: isActive ? s.accentColor : "#6B7280" }}
                    >
                      {s.subsystem}
                    </div>
                    <div className="font-sans font-bold text-xs text-[#17191D] mt-0.5 line-clamp-2">
                      {s.name}
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-[10px] font-mono">
                    <span 
                      className="font-bold"
                      style={{ color: isActive ? s.accentColor : isPast ? "#0F766E" : "#6B7280" }}
                    >
                      {isPast ? "COMPLETED" : isActive ? "ACTIVE" : "STANDBY"}
                    </span>
                    {isPast && <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E]" />}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Step Detail & Payload Inspector */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start bg-[#F9FAFB] border border-gray-200 p-6 sm:p-8 rounded-lg">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-gray-200 font-mono text-[10px] uppercase shadow-xs">
                <span className="font-bold" style={{ color: activeStep.accentColor }}>STAGE // {activeStep.label}</span>
                <span className="text-gray-300">|</span>
                <span className="text-[#17191D] font-semibold">{activeStep.subsystem}</span>
              </div>

              <h4 className="text-xl sm:text-2xl font-extrabold text-[#17191D] font-sans">
                {activeStep.name}
              </h4>

              <p className="text-xs text-[#4B5563] font-normal leading-relaxed">
                {activeStep.description}
              </p>

              <div className="grid grid-cols-2 gap-4 pt-2 font-mono text-xs">
                <div className="p-3.5 bg-white border border-gray-200 shadow-xs rounded-lg">
                  <div className="text-[10px] text-[#6B7280]">STEP EXECUTION TIME</div>
                  <div className="text-base font-extrabold" style={{ color: activeStep.accentColor }}>
                    {activeStep.latencyMs} ms
                  </div>
                </div>
                <div className="p-3.5 bg-white border border-gray-200 shadow-xs rounded-lg">
                  <div className="text-[10px] text-[#6B7280]">CUMULATIVE TRACE</div>
                  <div className="text-base font-extrabold text-[#519DD9]">
                    {accumulatedLatency.toFixed(1)} ms
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Simulated JSON Payload inside clean developer code terminal */}
            <div className="lg:col-span-5 space-y-2">
              <div className="flex items-center justify-between font-mono text-[10px] text-[#6B7280] uppercase">
                <span className="text-[#0F766E] font-bold">SIMULATED PAYLOAD SCHEMA</span>
                <span className="text-[#17191D] font-semibold">JSON CONTRACT</span>
              </div>
              <pre 
                className="p-4 bg-[#1E293B] border border-slate-700 font-mono text-xs text-slate-100 overflow-x-auto leading-relaxed shadow-sm rounded-lg"
              >
                <code>{activeStep.payloadSnippet}</code>
              </pre>
            </div>
          </div>

          <div className="pt-2 flex items-center gap-2 text-[10px] font-mono text-[#6B7280]">
            <Info className="w-3.5 h-3.5 text-[#0F766E] shrink-0" />
            <span>Simulation illustrates example RAG execution pipeline. Production latencies vary with model parameter size and vector index volume.</span>
          </div>

        </div>
      </div>
    </section>
  );
}
