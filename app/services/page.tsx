"use client";

import React from "react";
import Link from "next/link";
import { SERVICES_DATA } from "@/lib/data/mock-data";
import { Button } from "@/components/ui/Button";
import { Code2, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="py-16 lg:py-24 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white text-[#111215]">
      {/* Editorial Header */}
      <div className="border-b border-[#E5E2DB] pb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-full text-[#4A4D54] text-[11px] font-mono uppercase tracking-[0.2em] shadow-xs">
              <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]" />
              Engineering Disciplines • Capabilities
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#111215] tracking-tight font-display">
              Enterprise Engineering <span className="font-editorial italic font-light text-[#519DD9]">Catalog</span>
            </h1>
            <p className="text-[#4A4D54] text-base sm:text-lg font-light leading-relaxed">
              Every system is engineered around disciplined 30–40 day production milestones, full source code and IP transfer, and enterprise sub-100ms architectural benchmarks.
            </p>
          </div>
          <div className="font-mono text-xs text-[#71757E] shrink-0">
            TOTAL DOMAINS: <span className="text-[#111215] font-bold">{SERVICES_DATA.length}</span>
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICES_DATA.map((service, index) => (
          <div 
            key={service.id} 
            className="p-8 rounded-2xl flex flex-col justify-between group bg-[#FFFFFF] border border-[#E5E2DB] shadow-xs hover:border-[#111215] hover:shadow-md transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-10 h-10 bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9] rounded-xl flex items-center justify-center group-hover:border-[#111215] group-hover:text-[#111215] transition-all">
                  <Code2 className="w-5 h-5" />
                </div>
                <span className="font-mono text-[11px] font-bold text-[#71757E] tracking-widest uppercase">
                  ARCH // {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <h2 className="text-xl font-bold text-[#111215] mb-3 font-display group-hover:text-[#519DD9] transition-colors">
                {service.title}
              </h2>
              <p className="text-xs text-[#4A4D54] leading-relaxed mb-6 font-light">
                {service.overview}
              </p>

              <div className="space-y-2.5 mb-8 border-t border-[#E5E2DB] pt-4">
                {service.benefits.slice(0, 3).map((benefit, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#4A4D54]">
                    <CheckCircle2 className="w-4 h-4 text-[#519DD9] shrink-0 mt-0.5" />
                    <span className="line-clamp-1 font-light">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-between">
              <div>
                <span className="text-[10px] text-[#71757E] uppercase tracking-widest block font-mono font-bold">Benchmark SLA</span>
                <span className="text-xs font-bold text-[#111215] font-mono">{service.timelineDays} Days Delivery</span>
              </div>
              <Link href={`/services/${service.slug}`}>
                <Button size="sm" variant="outline" icon={<ArrowRight className="w-3.5 h-3.5" />}>
                  Inspect
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
