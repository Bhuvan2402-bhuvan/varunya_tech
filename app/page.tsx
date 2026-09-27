"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Zap, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Clock, 
  Code2, 
  ShieldCheck, 
  ExternalLink,
  Cpu,
  Layers,
  Activity,
  ArrowUpRight,
  Check,
  Lock,
  Server,
  Database,
  Cloud,
  FileCode,
  ShieldAlert,
  Users,
  Layout,
  RefreshCw,
  Terminal,
  Globe,
  Award,
  Wrench,
  CheckSquare
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { MarqueeTicker } from "@/components/ui/MarqueeTicker";
import { ConsultationModal } from "@/components/consultation/ConsultationModal";
import { 
  getStoredHomepageConfig, 
  subscribeHomepageUpdates, 
  HomepageConfig, 
  DEFAULT_HOMEPAGE_CONFIG 
} from "@/lib/data/homepage-data";
import { TimezoneClockWidget } from "@/components/timezone/TimezoneClockWidget";

// Helper map for Category Icons
const ICON_MAP: Record<string, any> = {
  Layout,
  Server,
  Database,
  Cloud,
  Cpu,
  Terminal,
  Globe,
  Layers
};

export default function HomePage() {
  const [config, setConfig] = useState<HomepageConfig>(DEFAULT_HOMEPAGE_CONFIG);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  useEffect(() => {
    setConfig(getStoredHomepageConfig());
    const unsubscribe = subscribeHomepageUpdates((updated) => {
      setConfig(updated);
    });
    return () => unsubscribe();
  }, []);

  const visibleProjects = config.projects.projects.filter(p => p.visible !== false);

  return (
    <div className="relative overflow-hidden bg-[#070708] text-white">
      {/* Varunya Linear Gradient Background Accent Orb */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-r from-[#FF6B00]/20 via-[#FF8A00]/15 to-[#7C5CFF]/20 blur-[180px] pointer-events-none -z-10" />
      <div className="absolute top-[1400px] right-0 w-[700px] h-[700px] bg-[#7C5CFF]/15 blur-[200px] pointer-events-none -z-10" />

      {/* 1. Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-28 lg:pb-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-8 max-w-5xl mx-auto">
          
          {/* Company Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0E0E12] border border-white/10 text-xs font-mono tracking-wider shadow-2xl">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
            <span className="text-white font-bold uppercase">{config.hero.badgeSubtitle}</span>
            <span className="text-white/30">•</span>
            <span className="text-[#FFB347] font-semibold">{config.hero.badgeHighlight}</span>
          </div>

          {/* Hero Headline */}
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white leading-[1.08] uppercase">
            {config.hero.headlinePart1} <br />
            <span className="gradient-varunya-text">{config.hero.headlinePart2}</span>
          </h1>

          {/* Subheading */}
          <p className="text-slate-300 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto font-normal">
            {config.hero.subheading}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href={config.hero.primaryCtaLink || "#works"}
              data-cursor="VIEW WORK"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#7C5CFF] text-white font-mono text-sm font-extrabold uppercase tracking-widest hover:opacity-95 transition-all shadow-[0_0_30px_rgba(255,107,0,0.5)] active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{config.hero.primaryCtaText}</span>
              <ArrowDownRight className="w-4 h-4 text-white" />
            </a>

            <button
              onClick={() => setAiModalOpen(true)}
              data-cursor="START"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 border border-white/10 hover:border-[#7C5CFF]/50 text-white font-mono text-sm font-bold uppercase tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#FFB347]" />
              <span>{config.hero.secondaryCtaText}</span>
            </button>
          </div>

          {/* Key Assurance Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-12 max-w-4xl mx-auto font-mono">
            {config.hero.metrics.map((stat, idx) => (
              <div key={stat.id || idx} className="p-4 rounded-2xl bg-[#0E0E12]/80 border border-white/10 backdrop-blur-xl text-center space-y-1">
                <div className={`text-xl sm:text-2xl font-black ${stat.color || "text-[#FF6B00]"}`}>{stat.val}</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Admin Managed Live HQ Time & Agency Operating Status */}
          <TimezoneClockWidget variant="homepage" className="max-w-4xl mx-auto text-left" />

        </div>
      </section>

      {/* 2. Kinetic Infinite Marquee Banner */}
      {config.ticker.enabled !== false && (
        <MarqueeTicker items={config.ticker.items} direction={config.ticker.direction || "left"} />
      )}

      {/* 3. About Us Section */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SpotlightCard spotlightColor="rgba(255, 107, 0, 0.2)" className="p-8 sm:p-14 border-[#FF6B00]/30 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-[#FF6B00] font-mono text-xs font-bold uppercase tracking-widest">
                <Users className="w-4 h-4" /> {config.about.badge}
              </div>
              <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white leading-tight">
                {config.about.titlePart1} <span className="gradient-varunya-text">{config.about.titlePart2}</span>
              </h2>
            </div>
            
            <div className="lg:col-span-2 space-y-6 text-slate-300 text-sm sm:text-base leading-relaxed">
              <p className="border-l-2 border-[#FF6B00] pl-6 text-white font-medium text-base sm:text-lg">
                {config.about.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 font-mono text-xs">
                {config.about.pillars.map((p, idx) => (
                  <div key={p.id || idx} className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-1">
                    <div className={`${p.color || "text-[#FF6B00]"} font-bold uppercase`}>{p.title}</div>
                    <div className="text-slate-400 text-[11px]">{p.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SpotlightCard>
      </section>

      {/* 4. Our Completed Projects Section */}
      <section id="works" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-4 text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#FF8A00] font-mono text-xs uppercase tracking-widest font-bold">
            <CheckCircle2 className="w-4 h-4 text-[#FF8A00]" /> {config.projects.badge}
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            {config.projects.titlePart1} <span className="gradient-varunya-text">{config.projects.titlePart2}</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base">
            {config.projects.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {visibleProjects.map((project) => (
            <SpotlightCard key={project.id} cursorText="LIVE DEMO" className="group p-0 overflow-hidden border border-white/10 flex flex-col justify-between">
              <div>
                {/* Project Image & Badge Header */}
                <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-85 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-[#0E0E12]/30 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] font-bold text-[#FF6B00] uppercase">
                      {project.category}
                    </span>
                    <span className="px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 font-mono text-[10px] font-bold text-emerald-400 uppercase flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      {project.statusBadge || "COMPLETED & LIVE"}
                    </span>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-8 space-y-5 bg-[#0E0E12]">
                  <div className="space-y-2">
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-[#FF6B00] transition-colors flex items-center justify-between">
                      <span>{project.title}</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlight Features List */}
                  {project.features && project.features.length > 0 && (
                    <div className="space-y-2 pt-2 border-t border-white/10">
                      <div className="text-xs font-mono font-bold text-[#FFB347] uppercase">Highlight Features:</div>
                      <div className="grid grid-cols-2 gap-2">
                        {project.features.map((feat, fIdx) => (
                          <div key={fIdx} className="flex items-center gap-2 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tech Stack Pills */}
                  {project.techStack && project.techStack.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.techStack.map((tech, tIdx) => (
                        <span key={tIdx} className="px-2.5 py-1 rounded-md bg-white/5 text-[10px] font-mono text-slate-300 border border-white/5">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Live Demo CTA Link */}
              <div className="p-6 bg-[#0E0E12] border-t border-white/10">
                <a
                  href={project.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="VISIT SITE"
                  className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#7C5CFF] text-white font-mono text-xs font-extrabold uppercase tracking-wider hover:opacity-90 transition-all flex items-center justify-center gap-2 shadow-lg"
                >
                  <span>LIVE DEMO</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 5. Technology Stack Section */}
      <section id="techstack" className="py-24 bg-[#0A0A0C] border-y border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-[#7C5CFF] font-mono text-xs uppercase tracking-widest font-bold">
              <Cpu className="w-4 h-4" /> {config.techStack.badge}
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
              {config.techStack.titlePart1} <span className="gradient-varunya-text">{config.techStack.titlePart2}</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              {config.techStack.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {config.techStack.categories.map((cat, cIdx) => {
              const IconComp = ICON_MAP[cat.iconName] || Cpu;
              return (
                <SpotlightCard key={cat.id || cIdx} spotlightColor="rgba(124, 92, 255, 0.2)" className="p-6 space-y-6 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                      <IconComp className={`w-5 h-5 ${cat.color || "text-[#7C5CFF]"}`} />
                      <h3 className="font-display text-xl font-bold text-white uppercase">{cat.category}</h3>
                    </div>

                    <div className="space-y-3 font-mono text-xs">
                      {cat.items.map((item, iIdx) => (
                        <div key={iIdx} className="p-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/20 transition-colors">
                          <div className="font-bold text-white text-sm">{item.name}</div>
                          <div className="text-[11px] text-slate-400">{item.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. Our Development Process Timeline */}
      <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center space-y-4 max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[#FF6B00] font-mono text-xs uppercase tracking-widest font-bold">
            <Clock className="w-4 h-4" /> {config.process.badge}
          </div>
          <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
            {config.process.titlePart1} <span className="gradient-varunya-text">{config.process.titlePart2}</span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base font-normal max-w-2xl mx-auto">
            {config.process.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {config.process.steps.map((step, idx) => (
            <SpotlightCard
              key={step.id || idx}
              spotlightColor="rgba(255, 107, 0, 0.2)"
              className="p-8 space-y-6"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="px-3 py-1 rounded-full bg-[#FF6B00]/15 text-[#FF6B00] font-bold">
                  STEP {step.stepNumber}
                </span>
                <span className="text-[#FFB347] font-bold uppercase">{step.phaseLabel || `PHASE ${idx + 1}`}</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-xl font-bold text-white">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* 7. Security & Quality Practices Section */}
      <section id="security" className="py-24 bg-[#0A0A0C] border-t border-white/10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-4 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase tracking-widest font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> {config.security.badge}
            </div>
            <h2 className="font-display text-4xl sm:text-6xl font-black uppercase text-white tracking-tight">
              {config.security.titlePart1} <span className="gradient-varunya-text">{config.security.titlePart2}</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-base">
              {config.security.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.security.practices.map((sec, idx) => (
              <SpotlightCard key={sec.id || idx} spotlightColor="rgba(16, 185, 129, 0.2)" className="p-6 flex items-start gap-4">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-display text-base font-bold text-white">{sec.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{sec.desc}</p>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Post-Launch Support & Maintenance Section */}
      <section id="support" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SpotlightCard spotlightColor="rgba(124, 92, 255, 0.25)" className="p-8 sm:p-14 border-[#7C5CFF]/30 shadow-2xl space-y-12">
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#7C5CFF]/15 text-[#7C5CFF] font-mono text-xs uppercase tracking-widest font-bold">
              <RefreshCw className="w-4 h-4" /> {config.support.badge}
            </div>
            <h2 className="font-display text-3xl sm:text-5xl font-black uppercase text-white">
              {config.support.titlePart1} <span className="gradient-varunya-text">{config.support.titlePart2}</span>
            </h2>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto italic font-medium">
              "{config.support.quoteText}"
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {config.support.pillars.map((pillar, idx) => (
              <div key={pillar.id || idx} className="p-6 rounded-2xl bg-[#070708] border border-white/10 space-y-2">
                <div className="flex items-center gap-2 text-[#FF6B00]">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <div className="font-display text-base font-bold text-white">{pillar.title}</div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed pl-6">{pillar.desc}</p>
              </div>
            ))}
          </div>

          <div className="pt-6 border-t border-white/10 text-center space-y-4">
            <h3 className="font-display text-xl font-bold text-white">{config.support.ctaHeading}</h3>
            <button
              onClick={() => setAiModalOpen(true)}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#7C5CFF] text-white font-mono text-xs font-extrabold uppercase tracking-widest hover:opacity-90 transition-opacity shadow-xl"
            >
              {config.support.ctaButtonText}
            </button>
          </div>
        </SpotlightCard>
      </section>

      {/* 1-on-1 Consultation & Discovery Call Modal */}
      <ConsultationModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </div>
  );
}

function ArrowDownRight(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="7" y1="7" x2="17" y2="17" />
      <polyline points="17 7 17 17 7 17" />
    </svg>
  );
}
