"use client";

import React from "react";
import Link from "next/link";
import { INDUSTRIES_DATA } from "@/lib/data/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Building2, ArrowRight, ShieldCheck } from "lucide-react";

export default function IndustriesPage() {
  return (
    <div className="py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full text-xs font-mono text-purple-400">
          10 SECTOR SPECIALIZATIONS
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display">
          Industry-Specific Solutions
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          We build tailored software solving domain-specific challenges, compliance standards (HIPAA, PCI-DSS, SOC2), and workflow bottlenecks.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {INDUSTRIES_DATA.map((ind) => (
          <GlassCard key={ind.id} className="p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-purple-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-500/20 transition-all">
                <Building2 className="w-6 h-6" />
              </div>

              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                {ind.title}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {ind.tagline}
              </p>

              <div className="space-y-1.5 mb-6">
                {ind.compliance.map((c, i) => (
                  <span key={i} className="inline-block mr-2 mb-1 px-2.5 py-0.5 bg-slate-800 rounded text-[10px] text-cyan-300 font-mono">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <span className="text-xs text-purple-400 font-mono">30-Day Deployment</span>
              <Link href={`/industries/${ind.slug}`}>
                <Button size="sm" variant="outline" icon={<ArrowRight className="w-4 h-4" />}>
                  Explore
                </Button>
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
