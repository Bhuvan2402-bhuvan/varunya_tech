"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AboutPage() {
  const values = [
    { 
      number: "01",
      title: "Velocity Without Compromise", 
      desc: "Delivering in 30–40 days means eliminating bureaucracy, not cutting corners on testing, data integrity, or security." 
    },
    { 
      number: "02",
      title: "Radical Transparency", 
      desc: "Live project access from sprint initiation. Clients monitor milestone progress, architectural diagrams, and code deployments." 
    },
    { 
      number: "03",
      title: "100% Client IP Ownership", 
      desc: "No proprietary vendor lock-in. Full repository source code, architecture assets, and cloud deployment pipelines belong to you." 
    },
    { 
      number: "04",
      title: "Architectural Precision", 
      desc: "We leverage modern web primitives, strict typing, and automated CI/CD to eliminate runtime vulnerabilities and tech debt." 
    }
  ];

  return (
    <div className="py-16 lg:py-24 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] text-[#111215]">
      
      {/* Header Hero */}
      <div className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-full font-mono text-[11px] uppercase tracking-[0.2em] text-[#4A4D54] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]"></span>
          Studio Mission & Principles
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#111215] uppercase tracking-tight leading-[1]">
          Reinventing Software <br />
          <span className="font-editorial italic font-light text-[#519DD9] normal-case">Engineering Velocity.</span>
        </h1>
        <p className="text-[#4A4D54] text-base sm:text-lg leading-relaxed">
          VarunyaTech was founded on a core principle: building enterprise-grade custom software platforms shouldn&apos;t require a year of bureaucratic delay. We engineer complete, battle-tested software applications within disciplined 30–40 day sprint cycles, backed by continuous client partnership.
        </p>
      </div>

      {/* Mission & Vision Split Panes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 lg:p-10 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs space-y-4">
          <div className="font-mono text-xs uppercase tracking-widest text-[#519DD9] font-bold">
            [ OUR MISSION ]
          </div>
          <h2 className="text-2xl font-bold text-[#111215] uppercase">High-Velocity Digital Engineering</h2>
          <p className="text-sm text-[#4A4D54] leading-relaxed">
            Help ambitious founders, institutions, and growing enterprises rapidly transform complex requirements into production-ready software systems using modern web frameworks, strict agile development, and architectural discipline.
          </p>
        </div>

        <div className="p-8 lg:p-10 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs space-y-4">
          <div className="font-mono text-xs uppercase tracking-widest text-[#53BAC1] font-bold">
            [ OUR VISION ]
          </div>
          <h2 className="text-2xl font-bold text-[#111215] uppercase">Enduring Technological Integrity</h2>
          <p className="text-sm text-[#4A4D54] leading-relaxed">
            To serve as the benchmark digital engineering studio recognized for combining world-class architectural aesthetics with rock-solid reliability, sub-second latency, and long-term client success.
          </p>
        </div>
      </div>

      {/* Core Principles */}
      <div className="space-y-10">
        <div className="space-y-3 pb-6 border-b border-[#E5E2DB]">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#71757E]">
            [ CORE VALUES ]
          </div>
          <h2 className="text-3xl font-black text-[#111215] uppercase tracking-tight">What Governs Our Work</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <div key={idx} className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs hover:border-[#111215] hover:shadow-md transition-all space-y-4">
              <div className="font-mono text-sm font-bold text-[#519DD9]">
                {v.number}
              </div>
              <h3 className="text-base font-bold text-[#111215] uppercase">{v.title}</h3>
              <p className="text-xs text-[#4A4D54] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Architectural Image Feature */}
      <div className="p-8 lg:p-12 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-5 aspect-[4/3] overflow-hidden rounded-xl border border-[#E5E2DB] bg-[#F5F3EF]">
          <img
            src="/images/architecture/editorial-pavilion.jpg"
            alt="VarunyaTech Architecture Philosophy"
            className="w-full h-full object-cover filter contrast-105"
            loading="lazy"
          />
        </div>
        <div className="lg:col-span-7 space-y-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#519DD9] font-bold">
            LONG-TERM COMMITMENT
          </div>
          <h3 className="text-2xl font-black text-[#111215] uppercase">
            Client Partnership Does Not End At Launch.
          </h3>
          <p className="text-sm text-[#4A4D54] leading-relaxed">
            &ldquo;We believe in building long-term relationships with our clients. Our support continues after deployment to ensure every application remains secure, reliable, and up to date.&rdquo;
          </p>
          <div className="pt-2 font-mono text-xs text-[#71757E]">
            — VarunyaTech Architectural Engineering Standard
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-10 lg:p-14 bg-[#F5F3EF] border border-[#E5E2DB] rounded-2xl text-center space-y-6">
        <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#111215]">
          Ready to Build Your Custom Software Platform?
        </h2>
        <p className="text-sm text-[#4A4D54] max-w-xl mx-auto">
          Contact our engineering architect directly to review your system requirements and project timeline.
        </p>
        <div>
          <Link href="/contact">
            <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Initiate Project
            </Button>
          </Link>
        </div>
      </div>

    </div>
  );
}
