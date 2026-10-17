"use client";

import React, { use } from "react";
import Link from "next/link";
import { SERVICES_DATA } from "@/lib/data/mock-data";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const service = SERVICES_DATA.find((s) => s.slug === resolvedParams.slug);

  if (!service) {
    return (
      <div className="py-24 text-center text-[#111215] space-y-4 bg-[#FAFAF8]">
        <h1 className="text-3xl font-bold font-display">Engineering Domain Not Found</h1>
        <Link href="/services">
          <Button variant="outline">Back to Services</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-16 lg:py-24 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] text-[#111215]">
      {/* Editorial Header */}
      <div className="border-b border-[#E5E2DB] pb-12 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-full text-[#4A4D54] text-[11px] font-mono uppercase tracking-[0.2em] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]" />
          Discipline SLA // {service.timelineDays} Days
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#111215] tracking-tight font-display">
          {service.title}
        </h1>
        <p className="text-[#4A4D54] text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          {service.overview}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <div className="px-4 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-xs font-mono text-[#4A4D54] shadow-xs">
            Delivery SLA: <span className="text-[#111215] font-bold">{service.timelineDays} Days</span>
          </div>
          <div className="px-4 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-xs font-mono text-[#4A4D54] shadow-xs">
            Milestone Model: <span className="text-[#111215] font-bold">Fixed Scope &amp; IP Transfer</span>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#71757E] uppercase tracking-widest font-bold">01 // Architectural Advantages</span>
          <div className="h-px bg-[#E5E2DB] flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.benefits.map((b, idx) => (
            <div key={idx} className="p-6 rounded-2xl flex items-start gap-4 bg-[#FFFFFF] border border-[#E5E2DB] shadow-xs hover:border-[#111215] hover:shadow-md transition-all">
              <CheckCircle2 className="w-5 h-5 text-[#519DD9] shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-[#111215] font-display mb-1">Architectural Standard 0{idx + 1}</h3>
                <p className="text-xs text-[#4A4D54] leading-relaxed font-light">{b}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#71757E] uppercase tracking-widest font-bold">02 // Technology Matrix</span>
          <div className="h-px bg-[#E5E2DB] flex-1" />
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 max-w-3xl mx-auto">
          {service.techStack.map((tech) => (
            <span key={tech} className="px-4 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-xs font-mono text-[#111215] shadow-xs hover:border-[#111215] transition-colors">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* 4-Week Process Breakdown */}
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#71757E] uppercase tracking-widest font-bold">03 // Sprint Methodology</span>
          <div className="h-px bg-[#E5E2DB] flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {service.process.map((p, idx) => (
            <div key={idx} className="p-6 rounded-2xl space-y-3 bg-[#FFFFFF] border border-[#E5E2DB] shadow-xs hover:border-[#111215] hover:shadow-md transition-all">
              <span className="text-xl font-bold text-[#519DD9] font-mono">{p.step}</span>
              <h3 className="text-sm font-bold text-[#111215] font-display">{p.title}</h3>
              <p className="text-xs text-[#4A4D54] leading-relaxed font-light">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs */}
      <div className="space-y-8 max-w-3xl mx-auto">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#71757E] uppercase tracking-widest font-bold">04 // Architectural Clarifications</span>
          <div className="h-px bg-[#E5E2DB] flex-1" />
        </div>
        <div className="space-y-4">
          {service.faqs.map((faq, idx) => (
            <div key={idx} className="p-6 rounded-2xl space-y-2 bg-[#FFFFFF] border border-[#E5E2DB] shadow-xs">
              <h3 className="text-sm font-bold text-[#111215] font-display">{faq.q}</h3>
              <p className="text-xs text-[#4A4D54] leading-relaxed font-light">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="p-12 bg-[#F5F3EF] border border-[#E5E2DB] rounded-2xl text-center space-y-6 shadow-xs">
        <span className="font-mono text-[10px] text-[#519DD9] tracking-widest uppercase font-bold">Direct Engineering Engagement</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111215] tracking-tight font-display">
          Initiate Engineering for <span className="font-editorial italic font-light text-[#519DD9]">{service.title}</span>
        </h2>
        <p className="text-[#4A4D54] text-sm font-light max-w-xl mx-auto">
          Schedule an architectural scoping consultation with our engineering directors to define milestones and specifications.
        </p>
        <div className="flex justify-center pt-2">
          <Link href="/contact">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Initiate Project Scope
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
