"use client";

import React, { use } from "react";
import Link from "next/link";
import { INDUSTRIES_DATA } from "@/lib/data/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight, Mail } from "lucide-react";

export default function IndustryDetailPage({ params }: { params: { slug: string } }) {
  const ind = INDUSTRIES_DATA.find((item) => item.slug === params.slug);

  if (!ind) {
    return (
      <div className="py-24 text-center text-white space-y-4">
        <h1 className="text-3xl font-bold">Industry Not Found</h1>
        <Link href="/industries">
          <Button variant="outline">Back to Industries</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <span className="px-3.5 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-mono text-purple-400 uppercase tracking-widest">
          INDUSTRY SOLUTIONS: {ind.title.toUpperCase()}
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display">
          {ind.title}
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
          {ind.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          {ind.compliance.map((c) => (
            <span key={c} className="px-3 py-1 bg-slate-900 border border-slate-700 rounded-lg text-xs font-mono text-cyan-300">
              🛡️ {c}
            </span>
          ))}
        </div>
      </div>

      {/* Industry Challenges vs Our 30-Day Solutions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="p-8 border-red-500/30 bg-slate-950/80 space-y-6">
          <div className="flex items-center gap-3 text-red-400">
            <AlertTriangle className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Common Industry Challenges</h2>
          </div>
          <div className="space-y-4">
            {ind.challenges.map((c, idx) => (
              <div key={idx} className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                • {c}
              </div>
            ))}
          </div>
        </GlassCard>

        <GlassCard className="p-8 border-cyan-500/30 bg-slate-950/80 space-y-6">
          <div className="flex items-center gap-3 text-cyan-400">
            <CheckCircle2 className="w-6 h-6" />
            <h2 className="text-xl font-bold text-white">Our 30-Day Engineered Solutions</h2>
          </div>
          <div className="space-y-4">
            {ind.solutions.map((s, idx) => (
              <div key={idx} className="p-4 bg-slate-900/60 rounded-xl border border-cyan-500/20 text-xs text-cyan-200 leading-relaxed">
                ✓ {s}
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Business Metrics Impact */}
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-bold text-white font-display">Proven Client Impact Metrics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {ind.metrics.map((metric, idx) => (
            <GlassCard key={idx} className="p-6 text-center">
              <div className="text-2xl font-bold text-cyan-400 font-display mb-1">{metric}</div>
              <div className="text-xs text-slate-400 font-mono uppercase tracking-wider">Benchmark SLA</div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">Build Your {ind.title} Platform in 30 Days</h2>
        <div>
          <a
            href={`mailto:contact@varunyatech.com?subject=Industry Solution Inquiry: ${encodeURIComponent(ind.title)} - Varunya Technologies`}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#7C5CFF] text-white font-mono text-xs font-bold uppercase tracking-wider hover:opacity-95 transition-all shadow-lg"
          >
            <Mail className="w-4 h-4 text-white" />
            <span>Contact Us via Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
