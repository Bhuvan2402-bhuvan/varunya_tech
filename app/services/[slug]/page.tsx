"use client";

import React, { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SERVICES_DATA } from "@/lib/data/mock-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight, Clock, ShieldCheck, HelpCircle } from "lucide-react";

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const service = SERVICES_DATA.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    return (
      <div className="py-24 text-center text-white space-y-4">
        <h1 className="text-3xl font-bold">Service Not Found</h1>
        <Link href="/services">
          <Button variant="outline">Back to Services</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Header */}
      <div className="text-center space-y-6 max-w-4xl mx-auto">
        <span className="px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-400 uppercase tracking-widest">
          30-DAY {service.title.toUpperCase()}
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display">
          {service.title}
        </h1>
        <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
          {service.overview}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-cyan-400">
            Delivery SLA: <span className="text-white font-bold">{service.timelineDays} Days</span>
          </div>
          <div className="px-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-purple-400">
            Investment: <span className="text-white font-bold">{service.startingPrice}</span>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white font-display text-center">Core Benefits</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.benefits.map((b, idx) => (
            <GlassCard key={idx} className="p-6 flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-bold text-white mb-1">Key Advantage 0{idx + 1}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{b}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Tech Stack Pills */}
      <div className="space-y-6 text-center">
        <h2 className="text-2xl font-bold text-white font-display">Technology Stack</h2>
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-2xl mx-auto">
          {service.techStack.map((tech) => (
            <span key={tech} className="px-4 py-2 bg-slate-900 border border-slate-700/80 rounded-xl text-xs font-mono text-cyan-300 shadow-md">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 4-Week Process Breakdown */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-white font-display text-center">30-Day Step-by-Step Sprint Process</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((p, idx) => (
            <GlassCard key={idx} className="p-6 space-y-3">
              <span className="text-2xl font-extrabold text-cyan-400 font-mono">{p.step}</span>
              <h3 className="text-base font-bold text-white">{p.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{p.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-white font-display text-center">Service FAQs</h2>
        <div className="space-y-4">
          {service.faqs.map((faq, idx) => (
            <GlassCard key={idx} className="p-6 space-y-2">
              <h3 className="text-base font-bold text-white">{faq.q}</h3>
              <p className="text-xs text-slate-300 leading-relaxed">{faq.a}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6">
        <h2 className="text-3xl font-extrabold text-white">Get Started with {service.title} in 30 Days</h2>
        <div className="flex justify-center gap-4">
          <Link href="/contact">
            <Button variant="gradient" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Schedule Discovery Call
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
