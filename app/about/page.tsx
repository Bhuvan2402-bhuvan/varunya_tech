"use client";

import React from "react";
import Link from "next/link";
import { Zap, Target, Eye, Award, CheckCircle2, ShieldCheck, ArrowRight, Code2, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";

export default function AboutPage() {
  const leadership = [
    {
      name: "Marcus Vance",
      role: "Founder & CEO / Chief Architect",
      bio: "Former Principal Engineer at Vercel & Stripe. Architected 100+ production platforms handling billions in transaction volume.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "Elena Rostova",
      role: "VP of Engineering",
      bio: "Ex-Google Senior Staff Engineer specializing in high-throughput microservices, NestJS, and Next.js performance tuning.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80"
    },
    {
      name: "David Chen",
      role: "Head of AI Architecture",
      bio: "Pioneer in vector search algorithms, OpenAI function calling, and zero-retention enterprise RAG pipelines.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
    }
  ];

  const values = [
    { title: "Velocity Without Compromise", desc: "Shipping in 30 days means eliminating bureaucracy, not cutting corners on testing or security." },
    { title: "Radical Transparency", desc: "Live project access from Day 1. Clients monitor daily code commits and milestone progress." },
    { title: "100% Client Ownership", desc: "No vendor lock-in. Full source code, IP rights, and cloud accounts belong entirely to you." },
    { title: "AI-Assisted Precision", desc: "We leverage AI code generators to eliminate repetitive boilerplate and focus on business logic." }
  ];

  return (
    <div className="py-16 space-y-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Hero */}
      <div className="text-center space-y-6 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-400">
          OUR STORY &amp; MISSION
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display">
          Reinventing Software Engineering Velocity
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          VELOCITY 30 was founded on a single core belief: building enterprise-grade software shouldn&apos;t take 12 months of endless meetings. We deliver complete, battle-tested software applications in 30 days.
        </p>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <GlassCard className="p-8 border-cyan-500/30">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center mb-5">
            <Target className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Our Mission</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            Help startups, SMEs, and enterprises rapidly transform ambitious business ideas into production-ready software using modern web frameworks, strict agile development, and AI-powered engineering.
          </p>
        </GlassCard>

        <GlassCard className="p-8 border-purple-500/30">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center mb-5">
            <Eye className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3">Our Vision</h2>
          <p className="text-slate-300 text-sm leading-relaxed">
            To become the premier global software development studio recognized for setting the benchmark in speed, aesthetic beauty, and architectural integrity.
          </p>
        </GlassCard>
      </div>

      {/* Core Values */}
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">Core Principles</span>
          <h2 className="text-3xl font-bold text-white font-display">What Drives Us</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v, idx) => (
            <GlassCard key={idx} className="p-6">
              <div className="w-8 h-8 rounded-lg bg-slate-800 text-cyan-400 flex items-center justify-center font-bold text-xs mb-4">
                0{idx + 1}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{v.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Leadership Section */}
      <div className="space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold tracking-widest uppercase text-purple-400">Leadership Team</span>
          <h2 className="text-3xl font-bold text-white font-display">Engineered by Veterans</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {leadership.map((member, idx) => (
            <GlassCard key={idx} className="p-6 text-center space-y-4">
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-cyan-500/40"
              />
              <div>
                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                <p className="text-xs text-cyan-400 font-mono mt-0.5">{member.role}</p>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">{member.bio}</p>
            </GlassCard>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="p-10 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-6">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Ready to Build Your Platform in 30 Days?</h2>
        <div>
          <Link href="/contact">
            <Button variant="gradient" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Start Your 30-Day Project
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
