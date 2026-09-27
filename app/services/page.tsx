"use client";

import React from "react";
import Link from "next/link";
import { SERVICES_DATA } from "@/lib/data/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Code2, ArrowRight, CheckCircle2 } from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-400">
          13 SPECIALIZED ENGINEERING DOMAINS
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display">
          Our 30-Day Engineering Services
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Every service is engineered around our strict 30-day delivery SLA, complete source code transfer, and sub-100ms performance architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES_DATA.map((service) => (
          <GlassCard key={service.id} className="p-8 flex flex-col justify-between group">
            <div>
              <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-cyan-500/20 transition-all">
                <Code2 className="w-6 h-6" />
              </div>

              <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                {service.title}
              </h2>
              <p className="text-xs text-slate-400 leading-relaxed mb-6">
                {service.overview}
              </p>

              <div className="space-y-2 mb-6">
                {service.benefits.slice(0, 3).map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span className="line-clamp-1">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider block font-mono">Starting From</span>
                <span className="text-base font-bold text-white font-mono">{service.startingPrice}</span>
              </div>
              <Link href={`/services/${service.slug}`}>
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
