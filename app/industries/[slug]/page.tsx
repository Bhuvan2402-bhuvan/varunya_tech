"use client";

import React from "react";
import Link from "next/link";
import { INDUSTRIES_DATA } from "@/lib/data/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Mail } from "lucide-react";

export default function IndustryDetailPage({ params }: { params: { slug: string } }) {
  const ind = INDUSTRIES_DATA.find((item) => item.slug === params.slug);

  if (!ind) {
    return (
      <div className="py-24 text-center text-[#111215] space-y-4">
        <h1 className="text-3xl font-bold font-display">Sector Not Found</h1>
        <Link href="/industries">
          <Button variant="outline">Back to Industries</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-20 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="border-b border-[#E5E2DB] pb-12 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.2em] shadow-sm font-semibold">
          <span className="w-1.5 h-1.5 bg-[#519DD9] rounded-full" />
          SECTOR ARCHITECTURE: {ind.title.toUpperCase()}
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#111215] tracking-tight font-display">
          {ind.title}
        </h1>
        <p className="text-[#4A4D54] text-base sm:text-lg font-normal leading-relaxed max-w-2xl mx-auto">
          {ind.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {ind.compliance.map((c) => (
            <span key={c} className="px-3 py-1 bg-[#F5F3EF] border border-[#E5E2DB] text-xs font-mono text-[#111215] font-medium shadow-sm">
              🛡️ {c}
            </span>
          ))}
        </div>
      </div>

      {/* Industry Challenges vs Our Solutions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="p-8 border-[#E5E2DB] bg-[#FFFFFF] space-y-6 shadow-sm">
          <div className="flex items-center gap-3 text-[#111215]">
            <AlertTriangle className="w-5 h-5 text-[#DB0038]" />
            <h2 className="text-lg font-bold text-[#111215] font-display">Structural Sector Bottlenecks</h2>
          </div>
          <div className="space-y-3">
            {ind.challenges.map((c, idx) => (
              <div key={idx} className="p-4 bg-[#F5F3EF] border border-[#E5E2DB] text-xs text-[#4A4D54] leading-relaxed font-normal">
                • {c}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-8 border-[#E5E2DB] bg-[#FFFFFF] space-y-6 shadow-sm">
          <div className="flex items-center gap-3 text-[#111215]">
            <CheckCircle2 className="w-5 h-5 text-[#519DD9]" />
            <h2 className="text-lg font-bold text-[#111215] font-display">Engineered Architectural Solutions</h2>
          </div>
          <div className="space-y-3">
            {ind.solutions.map((s, idx) => (
              <div key={idx} className="p-4 bg-[#F5F3EF] border border-[#E5E2DB] text-xs text-[#111215] leading-relaxed font-medium">
                ✓ {s}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Business Metrics Impact */}
      <div className="space-y-8 text-center">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#71757E] uppercase tracking-widest font-semibold">Benchmark Verification Metrics</span>
          <div className="h-px bg-[#E5E2DB] flex-1" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {ind.metrics.map((metric, idx) => (
            <GlassCard key={idx} className="p-8 text-center bg-[#FFFFFF] border-[#E5E2DB] shadow-sm">
              <div className="text-2xl font-bold text-[#111215] font-display mb-1">{metric}</div>
              <div className="text-[10px] text-[#71757E] font-mono uppercase tracking-widest">Operational SLA</div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-12 bg-[#F5F3EF] border border-[#E5E2DB] text-center space-y-6 shadow-sm">
        <span className="font-mono text-[10px] text-[#71757E] tracking-widest uppercase font-semibold">Direct Engagement</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111215] tracking-tight font-display">
          Engineer Your {ind.title} Platform
        </h2>
        <p className="text-[#4A4D54] text-sm font-normal max-w-xl mx-auto">
          Connect directly with our solutions engineering team to evaluate regulatory requirements and technical specifications.
        </p>
        <div className="pt-2">
          <a
            href={`mailto:varunyatech@gmail.com?subject=Industry Solution Inquiry: ${encodeURIComponent(ind.title)} - Varunya Technologies`}
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-[#111215] text-[#FFFFFF] hover:bg-[#519DD9] font-mono text-xs font-bold uppercase tracking-widest transition-all shadow-md"
          >
            <Mail className="w-4 h-4" />
            <span>Direct Email Inquiry</span>
          </a>
        </div>
      </div>
    </div>
  );
}
