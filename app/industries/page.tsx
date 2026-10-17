"use client";

import React from "react";
import Link from "next/link";
import { INDUSTRIES_DATA } from "@/lib/data/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Building2, ArrowRight, ShieldCheck } from "lucide-react";

export default function IndustriesPage() {
  return (
    <div className="py-20 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="border-b border-[#E5E2DB] pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] text-[#519DD9] text-[10px] font-mono uppercase tracking-[0.2em] shadow-sm font-semibold">
              <span className="w-1.5 h-1.5 bg-[#519DD9] rounded-full" />
              INDUSTRY SECTOR ARCHITECTURES
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#111215] tracking-tight font-display">
              Vertical Sector <span className="font-editorial italic font-light text-[#519DD9]">Specializations</span>
            </h1>
            <p className="text-[#4A4D54] text-base sm:text-lg font-normal leading-relaxed">
              Domain-specific platforms engineered for strict regulatory compliance, encrypted multi-tenant data isolation, and mission-critical workflows.
            </p>
          </div>
          <div className="font-mono text-xs text-[#71757E] shrink-0 bg-[#FFFFFF] px-3.5 py-2 border border-[#E5E2DB] shadow-sm">
            TOTAL SECTORS: <span className="text-[#111215] font-bold">{INDUSTRIES_DATA.length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {INDUSTRIES_DATA.map((ind, index) => (
          <GlassCard key={ind.id} className="p-8 flex flex-col justify-between group transition-all duration-300">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9] flex items-center justify-center group-hover:bg-[#111215] group-hover:text-[#FFFFFF] group-hover:border-[#111215] transition-all">
                  <Building2 className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] text-[#71757E] tracking-widest uppercase font-semibold">
                  SECTOR // {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#111215] font-display mb-2 group-hover:text-[#519DD9] transition-colors">
                {ind.title}
              </h2>
              <p className="text-xs text-[#4A4D54] font-normal leading-relaxed mb-6">
                {ind.tagline}
              </p>

              <div className="space-y-1.5 mb-6">
                {ind.compliance.map((c, i) => (
                  <span key={i} className="inline-block mr-2 mb-1 px-2.5 py-0.5 bg-[#F5F3EF] border border-[#E5E2DB] text-[10px] text-[#4A4D54] font-mono">
                    ✓ {c}
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-between">
              <span className="text-xs text-[#71757E] font-mono">Sprint SLA: 30–40 Days</span>
              <Link href={`/industries/${ind.slug}`}>
                <Button size="sm" variant="outline" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Inspect
                </Button>
              </Link>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
