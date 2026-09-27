"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { 
  getStoredHomepageConfig, 
  saveHomepageConfig, 
  resetHomepageConfig, 
  HomepageConfig, 
  DEFAULT_HOMEPAGE_CONFIG,
  CompletedProjectItem,
  MetricItem,
  TechCategory,
  DevProcessStep,
  SecurityPracticeItem,
  SupportPillarItem,
  PillarCard
} from "@/lib/data/homepage-data";
import { 
  Sparkles, 
  Save, 
  RotateCcw, 
  ExternalLink, 
  Plus, 
  Trash2, 
  Edit3, 
  Layout, 
  Zap, 
  Info, 
  Briefcase, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  Headphones, 
  CheckCircle2, 
  Eye, 
  EyeOff,
  Code,
  ArrowUpRight,
  RefreshCw,
  Copy,
  Check,
  Globe,
  Sliders,
  Sun,
  Moon,
  Compass
} from "lucide-react";
import Link from "next/link";
import { useTimezone, AVAILABLE_TIMEZONES } from "@/lib/context/TimezoneContext";
import { TimezoneClockWidget } from "@/components/timezone/TimezoneClockWidget";

export default function AdminHomepageCustomizer() {
  const [config, setConfig] = useState<HomepageConfig>(DEFAULT_HOMEPAGE_CONFIG);
  const [activeTab, setActiveTab] = useState<
    "hero" | "ticker" | "about" | "projects" | "techStack" | "process" | "security" | "support" | "timezone" | "json"
  >("hero");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  // Modals for complex sub-items
  const [projectModalOpen, setProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<CompletedProjectItem | null>(null);
  const [projForm, setProjForm] = useState<Partial<CompletedProjectItem>>({});
  const [projFeaturesRaw, setProjFeaturesRaw] = useState("");
  const [projTechRaw, setProjTechRaw] = useState("");

  const [metricModalOpen, setMetricModalOpen] = useState(false);
  const [editingMetric, setEditingMetric] = useState<MetricItem | null>(null);
  const [metricForm, setMetricForm] = useState<Partial<MetricItem>>({});

  const [copied, setCopied] = useState(false);
  const [jsonInput, setJsonInput] = useState("");

  // Timezone Context and Form States
  const {
    settings: tzSettings,
    primaryTimezone,
    secondaryTimezone,
    timeFormat,
    showSeconds,
    dateFormat,
    officeHoursStart,
    officeHoursEnd,
    operatingDays,
    headlineBadgeText,
    showOnHomepage,
    updateSettings: updateTzSettings,
    autoDetectTimezone,
    formatTime,
    formatDate,
    getTimezoneDetails,
  } = useTimezone();

  const [tzForm, setTzForm] = useState(tzSettings);
  const [tzSaveSuccess, setTzSaveSuccess] = useState(false);
  const [tzSearch, setTzSearch] = useState("");

  useEffect(() => {
    setTzForm(tzSettings);
  }, [tzSettings]);

  const handleSaveTimezone = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    updateTzSettings(tzForm);
    setTzSaveSuccess(true);
    setTimeout(() => setTzSaveSuccess(false), 3000);
  };

  useEffect(() => {
    const data = getStoredHomepageConfig();
    setConfig(data);
    setJsonInput(JSON.stringify(data, null, 2));
  }, []);

  const handleSave = () => {
    saveHomepageConfig(config);
    setSaveSuccess(true);
    setJsonInput(JSON.stringify(config, null, 2));
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleReset = () => {
    const def = resetHomepageConfig();
    setConfig(def);
    setJsonInput(JSON.stringify(def, null, 2));
    setResetConfirmOpen(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Projects Handlers
  const handleOpenAddProject = () => {
    setEditingProject(null);
    setProjForm({
      id: `p-${Date.now()}`,
      title: "",
      category: "Web Application",
      liveDemoUrl: "https://",
      heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      description: "",
      statusBadge: "COMPLETED & LIVE",
      visible: true
    });
    setProjFeaturesRaw("Responsive Design, Fast Performance, Modern UI");
    setProjTechRaw("Next.js, React, Tailwind CSS, TypeScript");
    setProjectModalOpen(true);
  };

  const handleOpenEditProject = (item: CompletedProjectItem) => {
    setEditingProject(item);
    setProjForm(item);
    setProjFeaturesRaw(item.features ? item.features.join(", ") : "");
    setProjTechRaw(item.techStack ? item.techStack.join(", ") : "");
    setProjectModalOpen(true);
  };

  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    const features = projFeaturesRaw.split(",").map(s => s.trim()).filter(Boolean);
    const techStack = projTechRaw.split(",").map(s => s.trim()).filter(Boolean);
    const updatedItem: CompletedProjectItem = {
      id: projForm.id || `p-${Date.now()}`,
      title: projForm.title || "Untitled Project",
      category: projForm.category || "Web Application",
      liveDemoUrl: projForm.liveDemoUrl || "#",
      heroImage: projForm.heroImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      description: projForm.description || "",
      features,
      techStack,
      statusBadge: projForm.statusBadge || "COMPLETED & LIVE",
      visible: projForm.visible ?? true
    };

    let newProjects = [...config.projects.projects];
    if (editingProject) {
      newProjects = newProjects.map(p => p.id === editingProject.id ? updatedItem : p);
    } else {
      newProjects.push(updatedItem);
    }

    const updatedConfig = {
      ...config,
      projects: { ...config.projects, projects: newProjects }
    };
    setConfig(updatedConfig);
    setProjectModalOpen(false);
  };

  const handleDeleteProject = (id: string) => {
    const newProjects = config.projects.projects.filter(p => p.id !== id);
    setConfig({
      ...config,
      projects: { ...config.projects, projects: newProjects }
    });
  };

  const handleToggleProjectVisibility = (id: string) => {
    const newProjects = config.projects.projects.map(p => {
      if (p.id === id) return { ...p, visible: !p.visible };
      return p;
    });
    setConfig({
      ...config,
      projects: { ...config.projects, projects: newProjects }
    });
  };

  // Metrics handlers
  const handleOpenEditMetric = (metric: MetricItem) => {
    setEditingMetric(metric);
    setMetricForm(metric);
    setMetricModalOpen(true);
  };

  const handleSaveMetric = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMetric) return;
    const newMetrics = config.hero.metrics.map(m => {
      if (m.id === editingMetric.id) {
        return {
          ...m,
          val: metricForm.val || m.val,
          label: metricForm.label || m.label,
          color: metricForm.color || m.color
        };
      }
      return m;
    });
    setConfig({
      ...config,
      hero: { ...config.hero, metrics: newMetrics }
    });
    setMetricModalOpen(false);
  };

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Top Header & Quick Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800 backdrop-blur-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-[11px] font-bold">
            <Layout className="w-3.5 h-3.5" /> HOMEPAGE VISUAL STUDIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Complete Home Page Customization
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            Edit and customize all 8 homepage sections dynamically. Changes reflect instantly on the live site with zero downtime.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link href="/" target="_blank">
            <Button variant="outline" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
              Live Preview
            </Button>
          </Link>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setResetConfirmOpen(true)}
            className="text-slate-400 hover:text-red-400 hover:border-red-500/30"
            icon={<RotateCcw className="w-3.5 h-3.5" />}
          >
            Reset
          </Button>
          <Button 
            variant="gradient" 
            size="sm" 
            onClick={handleSave}
            icon={<Save className="w-3.5 h-3.5" />}
          >
            Save All Changes
          </Button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/40 rounded-2xl text-xs font-mono text-emerald-300 flex items-center justify-between animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Success! Homepage configuration updated and published across all live client sessions.</span>
          </div>
          <Link href="/" target="_blank" className="underline font-bold hover:text-white flex items-center gap-1">
            View Live Site <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs font-semibold scrollbar-none">
        {[
          { id: "hero", label: "1. Hero & Metrics", icon: Zap },
          { id: "ticker", label: "2. Marquee Ticker", icon: Sparkles },
          { id: "about", label: "3. About Story", icon: Info },
          { id: "projects", label: "4. Completed Works", icon: Briefcase },
          { id: "techStack", label: "5. Tech Stack", icon: Cpu },
          { id: "process", label: "6. Process Timeline", icon: Clock },
          { id: "security", label: "7. Security & QA", icon: ShieldCheck },
          { id: "support", label: "8. Support & CTA", icon: Headphones },
          { id: "timezone", label: "9. Timezone & Operations", icon: Globe },
          { id: "json", label: "10. JSON Raw Config", icon: Code },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap transition-all ${
                isActive
                  ? "bg-gradient-to-r from-purple-600/90 to-cyan-600/90 text-white shadow-lg shadow-purple-500/20 font-bold"
                  : "bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 1. HERO & METRICS TAB */}
      {activeTab === "hero" && (
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-6 border-slate-800">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <Zap className="w-4 h-4 text-[#FF6B00]" /> Hero Section Configuration
              </h3>
              <p className="text-xs text-slate-400">Configure the main above-the-fold banner headline, badge, and call-to-action buttons.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Badge Prefix / Brand Name</label>
                <input
                  type="text"
                  value={config.hero.badgeSubtitle}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, badgeSubtitle: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Badge Subtitle / Niche Tag</label>
                <input
                  type="text"
                  value={config.hero.badgeHighlight}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, badgeHighlight: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-slate-300">Headline Line 1 (White Text)</label>
                <input
                  type="text"
                  value={config.hero.headlinePart1}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, headlinePart1: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-display text-sm font-bold focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-slate-300">Headline Line 2 (Gradient Highlight Text)</label>
                <input
                  type="text"
                  value={config.hero.headlinePart2}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, headlinePart2: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-[#FF8A00] font-display text-sm font-bold focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-slate-300">Main Subheading Paragraph</label>
                <textarea
                  rows={3}
                  value={config.hero.subheading}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, subheading: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-300 text-xs leading-relaxed focus:border-purple-500 focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Primary CTA Text</label>
                <input
                  type="text"
                  value={config.hero.primaryCtaText}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, primaryCtaText: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Primary CTA Anchor Link</label>
                <input
                  type="text"
                  value={config.hero.primaryCtaLink}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, primaryCtaLink: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Secondary CTA Text</label>
                <input
                  type="text"
                  value={config.hero.secondaryCtaText}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, secondaryCtaText: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </GlassCard>

          {/* Key Assurance Metrics Grid Editor */}
          <GlassCard className="p-6 space-y-4 border-slate-800">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white font-display">Key Assurance Metrics (4 Cards)</h3>
                <p className="text-xs text-slate-400">Manage the 4 metric cards displayed directly below the hero buttons.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {config.hero.metrics.map((metric) => (
                <div key={metric.id} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1 text-center">
                    <div className={`text-xl font-black font-mono ${metric.color}`}>{metric.val}</div>
                    <div className="text-[10px] text-slate-400 uppercase tracking-wider">{metric.label}</div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full text-[10px] py-1"
                    onClick={() => handleOpenEditMetric(metric)}
                    icon={<Edit3 className="w-3 h-3" />}
                  >
                    Edit Metric
                  </Button>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* 2. MARQUEE TICKER TAB */}
      {activeTab === "ticker" && (
        <GlassCard className="p-6 space-y-6 border-slate-800">
          <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <Sparkles className="w-4 h-4 text-purple-400" /> Kinetic Marquee Ticker
              </h3>
              <p className="text-xs text-slate-400">Configure phrases continuously looping across the ticker banner.</p>
            </div>
            <label className="flex items-center gap-2 text-xs font-mono text-slate-300 cursor-pointer">
              <input
                type="checkbox"
                checked={config.ticker.enabled}
                onChange={(e) => setConfig({ ...config, ticker: { ...config.ticker, enabled: e.target.checked } })}
                className="w-4 h-4 accent-purple-500 rounded"
              />
              <span>Ticker Enabled</span>
            </label>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-slate-300">Marquee Phrases (One per line)</label>
            <textarea
              rows={6}
              value={config.ticker.items.join("\n")}
              onChange={(e) => {
                const items = e.target.value.split("\n").filter(Boolean);
                setConfig({ ...config, ticker: { ...config.ticker, items } });
              }}
              className="w-full p-4 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white leading-relaxed focus:border-purple-500 focus:outline-none"
              placeholder="Enter ticker phrases, one per line..."
            />
          </div>

          <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 flex items-center gap-2">
            <Info className="w-4 h-4 text-cyan-400" />
            <span>Currently rendering {config.ticker.items.length} phrases in smooth hardware-accelerated ticker loop.</span>
          </div>
        </GlassCard>
      )}

      {/* 3. ABOUT STORY TAB */}
      {activeTab === "about" && (
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-6 border-slate-800">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <Info className="w-4 h-4 text-[#FF6B00]" /> About Us Section
              </h3>
              <p className="text-xs text-slate-400">Customize the corporate introduction and company overview.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Section Badge Label</label>
                <input
                  type="text"
                  value={config.about.badge}
                  onChange={(e) => setConfig({ ...config, about: { ...config.about, badge: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 flex gap-2">
                <div className="flex-1 space-y-1.5">
                  <label className="font-semibold text-slate-300">Title Part 1</label>
                  <input
                    type="text"
                    value={config.about.titlePart1}
                    onChange={(e) => setConfig({ ...config, about: { ...config.about, titlePart1: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-display font-bold focus:border-purple-500 focus:outline-none"
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="font-semibold text-slate-300">Title Highlight Part</label>
                  <input
                    type="text"
                    value={config.about.titlePart2}
                    onChange={(e) => setConfig({ ...config, about: { ...config.about, titlePart2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-[#FF6B00] font-display font-bold focus:border-purple-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-slate-300">Company Overview Story (Left border highlight paragraph)</label>
                <textarea
                  rows={4}
                  value={config.about.description}
                  onChange={(e) => setConfig({ ...config, about: { ...config.about, description: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs leading-relaxed focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </GlassCard>

          {/* 3 Value Pillars */}
          <GlassCard className="p-6 space-y-4 border-slate-800">
            <h3 className="text-base font-bold text-white font-display">Core Value Pillars (3 Cards)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {config.about.pillars.map((pillar, idx) => (
                <div key={pillar.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase">Pillar {idx + 1} Title</label>
                    <input
                      type="text"
                      value={pillar.title}
                      onChange={(e) => {
                        const newPillars = [...config.about.pillars];
                        newPillars[idx] = { ...pillar, title: e.target.value };
                        setConfig({ ...config, about: { ...config.about, pillars: newPillars } });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-mono font-bold text-white"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase">Description</label>
                    <textarea
                      rows={2}
                      value={pillar.description}
                      onChange={(e) => {
                        const newPillars = [...config.about.pillars];
                        newPillars[idx] = { ...pillar, description: e.target.value };
                        setConfig({ ...config, about: { ...config.about, pillars: newPillars } });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300 resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* 4. COMPLETED PROJECTS TAB */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-4 border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                  <Briefcase className="w-4 h-4 text-[#FF8A00]" /> Publicly Available Works & Completed Projects
                </h3>
                <p className="text-xs text-slate-400">Add, edit, or toggle visibility for live showcase projects on the homepage.</p>
              </div>
              <Button variant="gradient" size="sm" onClick={handleOpenAddProject} icon={<Plus className="w-4 h-4" />}>
                Add Showcase Project
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Section Badge</label>
                <input
                  type="text"
                  value={config.projects.badge}
                  onChange={(e) => setConfig({ ...config, projects: { ...config.projects, badge: e.target.value } })}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono text-xs"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Section Subtitle</label>
                <input
                  type="text"
                  value={config.projects.subtitle}
                  onChange={(e) => setConfig({ ...config, projects: { ...config.projects, subtitle: e.target.value } })}
                  className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs"
                />
              </div>
            </div>
          </GlassCard>

          {/* Projects Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.projects.projects.map((proj) => (
              <GlassCard key={proj.id} className="p-5 border-slate-800 flex flex-col justify-between gap-4 relative overflow-hidden group">
                <div className="space-y-3">
                  <div className="relative h-44 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
                    <img src={proj.heroImage} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 bg-black/80 backdrop-blur rounded-full text-[10px] font-mono font-bold text-[#FF6B00]">
                        {proj.category}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur rounded-full text-[9px] font-mono font-bold">
                        {proj.statusBadge}
                      </span>
                    </div>
                    {!proj.visible && (
                      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center text-slate-400 font-mono text-xs font-bold gap-1.5">
                        <EyeOff className="w-4 h-4 text-red-400" /> Hidden From Homepage
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-lg text-white">{proj.title}</h4>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">{proj.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.techStack?.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-white/5 rounded text-[10px] font-mono text-slate-300 border border-white/5">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between gap-2">
                  <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="text-[11px] font-mono text-cyan-400 hover:underline flex items-center gap-1">
                    <span>Live Demo Link</span> <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleProjectVisibility(proj.id)}
                      className={`p-1.5 rounded-lg border text-xs transition ${
                        proj.visible
                          ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-white"
                          : "bg-amber-500/10 border-amber-500/30 text-amber-300"
                      }`}
                      title={proj.visible ? "Hide from homepage" : "Show on homepage"}
                    >
                      {proj.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleOpenEditProject(proj)}
                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg text-xs transition"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      )}

      {/* 5. TECH STACK TAB */}
      {activeTab === "techStack" && (
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-4 border-slate-800">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <Cpu className="w-4 h-4 text-[#7C5CFF]" /> Technology Stack Categories
              </h3>
              <p className="text-xs text-slate-400">Edit technologies, descriptions, and frameworks shown across all 4 category cards.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.techStack.categories.map((cat, cIdx) => (
                <div key={cat.id || cIdx} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-purple-400 uppercase font-bold">Category Name</label>
                    <input
                      type="text"
                      value={cat.category}
                      onChange={(e) => {
                        const newCats = [...config.techStack.categories];
                        newCats[cIdx] = { ...cat, category: e.target.value };
                        setConfig({ ...config, techStack: { ...config.techStack, categories: newCats } });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-slate-500 uppercase">Items ({cat.items.length})</label>
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {cat.items.map((item, iIdx) => (
                        <div key={iIdx} className="p-2.5 bg-slate-950 border border-slate-850 rounded-xl space-y-1.5 relative group">
                          <input
                            type="text"
                            placeholder="Tech Name (e.g. React.js)"
                            value={item.name}
                            onChange={(e) => {
                              const newCats = [...config.techStack.categories];
                              const newItems = [...cat.items];
                              newItems[iIdx] = { ...item, name: e.target.value };
                              newCats[cIdx] = { ...cat, items: newItems };
                              setConfig({ ...config, techStack: { ...config.techStack, categories: newCats } });
                            }}
                            className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-xs font-bold text-white"
                          />
                          <input
                            type="text"
                            placeholder="Short Description"
                            value={item.desc}
                            onChange={(e) => {
                              const newCats = [...config.techStack.categories];
                              const newItems = [...cat.items];
                              newItems[iIdx] = { ...item, desc: e.target.value };
                              newCats[cIdx] = { ...cat, items: newItems };
                              setConfig({ ...config, techStack: { ...config.techStack, categories: newCats } });
                            }}
                            className="w-full px-2 py-1 bg-slate-900 border border-slate-800 rounded text-[10px] text-slate-300"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newCats = [...config.techStack.categories];
                              const newItems = cat.items.filter((_, idx) => idx !== iIdx);
                              newCats[cIdx] = { ...cat, items: newItems };
                              setConfig({ ...config, techStack: { ...config.techStack, categories: newCats } });
                            }}
                            className="text-[9px] text-red-400 hover:underline pt-0.5 block"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newCats = [...config.techStack.categories];
                        newCats[cIdx] = {
                          ...cat,
                          items: [...cat.items, { name: "New Tool", desc: "Tool Description" }]
                        };
                        setConfig({ ...config, techStack: { ...config.techStack, categories: newCats } });
                      }}
                      className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-lg text-[10px] font-mono text-cyan-300 flex items-center justify-center gap-1 transition"
                    >
                      <Plus className="w-3 h-3" /> Add Tech Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* 6. PROCESS TIMELINE TAB */}
      {activeTab === "process" && (
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-4 border-slate-800">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <Clock className="w-4 h-4 text-[#FF6B00]" /> 6-Step Strategic Development Timeline
              </h3>
              <p className="text-xs text-slate-400">Configure delivery phases and timelines (30–40 days).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.process.steps.map((step, idx) => (
                <div key={step.id || idx} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-[#FF6B00]/15 text-[#FF6B00] font-bold">
                      STEP {step.stepNumber}
                    </span>
                    <span className="text-[#FFB347] font-bold">{step.phaseLabel}</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase">Phase Title</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const newSteps = [...config.process.steps];
                        newSteps[idx] = { ...step, title: e.target.value };
                        setConfig({ ...config, process: { ...config.process, steps: newSteps } });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-slate-500 uppercase">Phase Description</label>
                    <textarea
                      rows={3}
                      value={step.desc}
                      onChange={(e) => {
                        const newSteps = [...config.process.steps];
                        newSteps[idx] = { ...step, desc: e.target.value };
                        setConfig({ ...config, process: { ...config.process, steps: newSteps } });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300 resize-none leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* 7. SECURITY & QA TAB */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-4 border-slate-800">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Security & Quality Practices
                </h3>
                <p className="text-xs text-slate-400">Manage the 10 security assurance cards.</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const newPractices = [
                    ...config.security.practices,
                    { id: `sec-${Date.now()}`, title: "New Security Standard", desc: "Describe security protection mechanism..." }
                  ];
                  setConfig({ ...config, security: { ...config.security, practices: newPractices } });
                }}
                icon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Practice Card
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.security.practices.map((sec, idx) => (
                <div key={sec.id || idx} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2 relative group">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => {
                        const newPractices = [...config.security.practices];
                        newPractices[idx] = { ...sec, title: e.target.value };
                        setConfig({ ...config, security: { ...config.security, practices: newPractices } });
                      }}
                      className="flex-1 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-white"
                    />
                    <button
                      onClick={() => {
                        const newPractices = config.security.practices.filter((_, i) => i !== idx);
                        setConfig({ ...config, security: { ...config.security, practices: newPractices } });
                      }}
                      className="text-red-400 hover:text-red-300 p-1"
                      title="Delete card"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <textarea
                    rows={2}
                    value={sec.desc}
                    onChange={(e) => {
                      const newPractices = [...config.security.practices];
                      newPractices[idx] = { ...sec, desc: e.target.value };
                      setConfig({ ...config, security: { ...config.security, practices: newPractices } });
                    }}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300 resize-none leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* 8. SUPPORT & CTA TAB */}
      {activeTab === "support" && (
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-6 border-slate-800">
            <div className="border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                <Headphones className="w-4 h-4 text-[#7C5CFF]" /> Post-Launch Support & Final CTA
              </h3>
              <p className="text-xs text-slate-400">Configure ongoing maintenance pillars and closing conversion call-to-action.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-slate-300">Section Quote Statement</label>
                <textarea
                  rows={2}
                  value={config.support.quoteText}
                  onChange={(e) => setConfig({ ...config, support: { ...config.support, quoteText: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs italic"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Bottom CTA Headline</label>
                  <input
                    type="text"
                    value={config.support.ctaHeading}
                    onChange={(e) => setConfig({ ...config, support: { ...config.support, ctaHeading: e.target.value } })}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Bottom CTA Button Label</label>
                  <input
                    type="text"
                    value={config.support.ctaButtonText}
                    onChange={(e) => setConfig({ ...config, support: { ...config.support, ctaButtonText: e.target.value } })}
                    className="w-full px-3.5 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Support Pillars */}
          <GlassCard className="p-6 space-y-4 border-slate-800">
            <h3 className="text-base font-bold text-white font-display">6 Ongoing Support Pillars</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {config.support.pillars.map((pillar, idx) => (
                <div key={pillar.id || idx} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => {
                      const newPillars = [...config.support.pillars];
                      newPillars[idx] = { ...pillar, title: e.target.value };
                      setConfig({ ...config, support: { ...config.support, pillars: newPillars } });
                    }}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs font-bold text-[#FF6B00]"
                  />
                  <textarea
                    rows={2}
                    value={pillar.desc}
                    onChange={(e) => {
                      const newPillars = [...config.support.pillars];
                      newPillars[idx] = { ...pillar, desc: e.target.value };
                      setConfig({ ...config, support: { ...config.support, pillars: newPillars } });
                    }}
                    className="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-[11px] text-slate-300 resize-none"
                  />
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* 9. TIMEZONE & AGENCY CLOCK TAB */}
      {activeTab === "timezone" && (
        <div className="space-y-6">
          {/* Real-time Homepage Card Preview */}
          <GlassCard className="p-6 border-slate-800 space-y-4">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                  <Globe className="w-4 h-4 text-[#FF6B00]" /> Live Homepage Clock &amp; Operating Status Preview
                </h3>
                <p className="text-xs text-slate-400">
                  This card updates in real-time and reflects on the Homepage hero banner for all global visitors.
                </p>
              </div>
              <span className="px-2.5 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full text-[10px] font-mono font-bold">
                REAL-TIME HOMEPAGE WIDGET
              </span>
            </div>

            <TimezoneClockWidget variant="homepage" className="border-cyan-500/30 shadow-2xl" />
          </GlassCard>

          {/* Timezone Configuration Controls */}
          <GlassCard className="p-6 space-y-6 border-slate-800">
            <div className="border-b border-slate-800 pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                  <Sliders className="w-4 h-4 text-purple-400" /> Agency Operating Timezone &amp; Hours
                </h3>
                <p className="text-xs text-slate-400">
                  Configure the primary agency timezone, active delivery sprint hours, and real-time clock formatting.
                </p>
              </div>

              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => autoDetectTimezone()}
                  icon={<Compass className="w-3.5 h-3.5 text-cyan-400" />}
                >
                  Detect Browser Zone
                </Button>
                <Button
                  type="button"
                  variant="gradient"
                  size="sm"
                  onClick={() => handleSaveTimezone()}
                  icon={<Save className="w-3.5 h-3.5" />}
                >
                  {tzSaveSuccess ? "Settings Saved!" : "Save Timezone Settings"}
                </Button>
              </div>
            </div>

            <form onSubmit={handleSaveTimezone} className="space-y-6 text-xs font-sans">
              {/* Primary Timezone & Popular Presets */}
              <div className="space-y-3">
                <label className="block font-semibold text-slate-200">
                  Primary Agency HQ Timezone
                </label>

                {/* Quick Presets */}
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {[
                    { id: "America/New_York", name: "New York (EST)" },
                    { id: "America/Los_Angeles", name: "San Francisco (PST)" },
                    { id: "Europe/London", name: "London (GMT/BST)" },
                    { id: "Europe/Paris", name: "Paris / Berlin (CET)" },
                    { id: "Asia/Kolkata", name: "India / Bangalore (IST)" },
                    { id: "Asia/Dubai", name: "Dubai (GST)" },
                    { id: "Asia/Singapore", name: "Singapore (SGT)" },
                    { id: "Asia/Tokyo", name: "Tokyo (JST)" },
                    { id: "Australia/Sydney", name: "Sydney (AEST)" },
                    { id: "UTC", name: "UTC" },
                  ].map((p) => {
                    const isSelected = tzForm.primaryTimezone === p.id;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setTzForm({ ...tzForm, primaryTimezone: p.id })}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-mono transition ${
                          isSelected
                            ? "bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/20"
                            : "bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
                        }`}
                      >
                        {p.name}
                      </button>
                    );
                  })}
                </div>

                {/* Searchable / Full Dropdown */}
                <select
                  value={tzForm.primaryTimezone}
                  onChange={(e) => setTzForm({ ...tzForm, primaryTimezone: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-cyan-500 focus:outline-none"
                >
                  {AVAILABLE_TIMEZONES.map((tz) => (
                    <option key={tz.id} value={tz.id}>
                      {tz.code} ({tz.city}) — {tz.label} (UTC {tz.utcOffset})
                    </option>
                  ))}
                </select>
              </div>

              {/* Time Standard & Seconds Accuracy */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Time Format Standard</label>
                  <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setTzForm({ ...tzForm, timeFormat: "12h" })}
                      className={`py-1.5 rounded-lg font-semibold transition ${
                        tzForm.timeFormat === "12h" ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      12-Hour (AM/PM)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTzForm({ ...tzForm, timeFormat: "24h" })}
                      className={`py-1.5 rounded-lg font-semibold transition ${
                        tzForm.timeFormat === "24h" ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      24-Hour (23:59)
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Seconds Live Counter</label>
                  <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setTzForm({ ...tzForm, showSeconds: true })}
                      className={`py-1.5 rounded-lg font-semibold transition ${
                        tzForm.showSeconds ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Show (:SS)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTzForm({ ...tzForm, showSeconds: false })}
                      className={`py-1.5 rounded-lg font-semibold transition ${
                        !tzForm.showSeconds ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Hide Seconds
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Homepage Clock Visibility</label>
                  <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setTzForm({ ...tzForm, showOnHomepage: true })}
                      className={`py-1.5 rounded-lg font-semibold transition ${
                        tzForm.showOnHomepage ? "bg-emerald-500 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Visible
                    </button>
                    <button
                      type="button"
                      onClick={() => setTzForm({ ...tzForm, showOnHomepage: false })}
                      className={`py-1.5 rounded-lg font-semibold transition ${
                        !tzForm.showOnHomepage ? "bg-red-500 text-white" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      Hidden
                    </button>
                  </div>
                </div>
              </div>

              {/* Operating Business Hours */}
              <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-3">
                <label className="font-semibold text-slate-200 block">
                  Agency Operational Business Hours (Sprint Availability)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-mono">Operating Days</label>
                    <input
                      type="text"
                      value={tzForm.operatingDays}
                      onChange={(e) => setTzForm({ ...tzForm, operatingDays: e.target.value })}
                      placeholder="e.g. Mon – Fri"
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-mono">Office Start Time</label>
                    <input
                      type="time"
                      value={tzForm.officeHoursStart}
                      onChange={(e) => setTzForm({ ...tzForm, officeHoursStart: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400 font-mono">Office End Time</label>
                    <input
                      type="time"
                      value={tzForm.officeHoursEnd}
                      onChange={(e) => setTzForm({ ...tzForm, officeHoursEnd: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-cyan-500 focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Headline Badge Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Homepage Clock Badge Headline</label>
                  <input
                    type="text"
                    value={tzForm.headlineBadgeText}
                    onChange={(e) => setTzForm({ ...tzForm, headlineBadgeText: e.target.value })}
                    placeholder="e.g. AGENCY HQ LIVE TIME"
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-cyan-500 focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-slate-300">Secondary Dual-Clock Timezone</label>
                  <select
                    value={tzForm.secondaryTimezone}
                    onChange={(e) => setTzForm({ ...tzForm, secondaryTimezone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-cyan-500 focus:outline-none"
                  >
                    {AVAILABLE_TIMEZONES.map((tz) => (
                      <option key={tz.id} value={tz.id}>
                        {tz.code} - {tz.city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  type="submit"
                  variant="gradient"
                  size="sm"
                  icon={<Save className="w-3.5 h-3.5" />}
                >
                  {tzSaveSuccess ? "Timezone Saved & Synced!" : "Save & Broadcast to Homepage"}
                </Button>
              </div>
            </form>
          </GlassCard>
        </div>
      )}

      {/* 10. RAW JSON CONFIG */}
      {activeTab === "json" && (
        <GlassCard className="p-6 space-y-4 border-slate-800">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-base font-bold text-white font-display">Raw JSON Configuration &amp; Backup</h3>
              <p className="text-xs text-slate-400">Export or import full site configuration schema in JSON format.</p>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(jsonInput);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                icon={copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              >
                {copied ? "Copied JSON" : "Copy JSON"}
              </Button>
            </div>
          </div>

          <textarea
            rows={18}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-xs font-mono text-cyan-300 leading-relaxed focus:outline-none focus:border-purple-500"
          />

          <div className="flex justify-end">
            <Button
              variant="gradient"
              size="sm"
              onClick={() => {
                try {
                  const parsed = JSON.parse(jsonInput);
                  setConfig(parsed);
                  saveHomepageConfig(parsed);
                  setSaveSuccess(true);
                  setTimeout(() => setSaveSuccess(false), 3000);
                } catch (err) {
                  alert("Invalid JSON schema. Please check syntax.");
                }
              }}
              icon={<Save className="w-3.5 h-3.5" />}
            >
              Apply & Save JSON
            </Button>
          </div>
        </GlassCard>
      )}

      {/* Add / Edit Project Modal */}
      <Modal
        isOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
        title={editingProject ? "Edit Showcase Project" : "Add New Showcase Project"}
      >
        <form onSubmit={handleSaveProject} className="space-y-4 font-sans text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Project Title</label>
              <input
                required
                type="text"
                value={projForm.title || ""}
                onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                placeholder="e.g. ERP Platform"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Category</label>
              <input
                required
                type="text"
                value={projForm.category || ""}
                onChange={(e) => setProjForm({ ...projForm, category: e.target.value })}
                placeholder="e.g. Enterprise Operations"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Live Demo URL</label>
              <input
                required
                type="url"
                value={projForm.liveDemoUrl || ""}
                onChange={(e) => setProjForm({ ...projForm, liveDemoUrl: e.target.value })}
                placeholder="https://app.vercel.app"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Status Badge</label>
              <input
                required
                type="text"
                value={projForm.statusBadge || ""}
                onChange={(e) => setProjForm({ ...projForm, statusBadge: e.target.value })}
                placeholder="COMPLETED & LIVE"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Hero Image URL</label>
            <input
              required
              type="url"
              value={projForm.heroImage || ""}
              onChange={(e) => setProjForm({ ...projForm, heroImage: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Project Description</label>
            <textarea
              required
              rows={3}
              value={projForm.description || ""}
              onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
              placeholder="Summary of the application, architecture, and value delivered..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Highlight Features (Comma-separated)</label>
            <input
              required
              type="text"
              value={projFeaturesRaw}
              onChange={(e) => setProjFeaturesRaw(e.target.value)}
              placeholder="User Authentication, Dashboard, Role-Based Access"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Tech Stack Tags (Comma-separated)</label>
            <input
              required
              type="text"
              value={projTechRaw}
              onChange={(e) => setProjTechRaw(e.target.value)}
              placeholder="Next.js, React.js, TypeScript, Tailwind CSS, PostgreSQL"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none font-mono"
            />
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setProjectModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1" size="sm">
              Save Project
            </Button>
          </div>
        </form>
      </Modal>

      {/* Edit Metric Modal */}
      <Modal
        isOpen={metricModalOpen}
        onClose={() => setMetricModalOpen(false)}
        title="Edit Hero Metric Card"
      >
        <form onSubmit={handleSaveMetric} className="space-y-4 font-sans text-xs">
          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Metric Value</label>
            <input
              required
              type="text"
              value={metricForm.val || ""}
              onChange={(e) => setMetricForm({ ...metricForm, val: e.target.value })}
              placeholder="e.g. 30–40 DAYS"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono font-bold focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Metric Label</label>
            <input
              required
              type="text"
              value={metricForm.label || ""}
              onChange={(e) => setMetricForm({ ...metricForm, label: e.target.value })}
              placeholder="e.g. AVERAGE DELIVERY"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-cyan-500 focus:outline-none uppercase"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Color Highlight Class</label>
            <select
              value={metricForm.color || "text-[#FF6B00]"}
              onChange={(e) => setMetricForm({ ...metricForm, color: e.target.value })}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-cyan-500 focus:outline-none"
            >
              <option value="text-[#FF6B00]">Orange (text-[#FF6B00])</option>
              <option value="text-[#FF8A00]">Amber (text-[#FF8A00])</option>
              <option value="text-[#FFB347]">Gold (text-[#FFB347])</option>
              <option value="text-[#7C5CFF]">Purple (text-[#7C5CFF])</option>
              <option value="text-emerald-400">Emerald (text-emerald-400)</option>
              <option value="text-cyan-400">Cyan (text-cyan-400)</option>
            </select>
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setMetricModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1" size="sm">
              Save Metric
            </Button>
          </div>
        </form>
      </Modal>

      {/* Reset Confirmation Modal */}
      <Modal
        isOpen={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        title="Reset Homepage to Defaults"
      >
        <div className="space-y-4 text-xs font-sans">
          <p className="text-slate-300">
            Are you sure you want to reset all homepage configuration to original default content? Any custom copy, new showcase projects, or metric changes will be restored to defaults.
          </p>
          <div className="pt-2 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setResetConfirmOpen(false)}>
              Cancel
            </Button>
            <Button type="button" variant="primary" className="flex-1 bg-red-600 hover:bg-red-700" size="sm" onClick={handleReset}>
              Confirm Reset
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
