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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FFFFFF] p-6 rounded-3xl border border-[#E5E2DB] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#519DD9]/10 border border-[#519DD9]/25 text-[#1D6FA5] font-mono text-[11px] font-bold">
            <Layout className="w-3.5 h-3.5" /> HOMEPAGE VISUAL STUDIO
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111215] font-display tracking-tight">
            Complete Home Page Customization
          </h2>
          <p className="text-xs text-[#71757E] max-w-2xl">
            Edit and customize all 8 homepage sections dynamically. Changes reflect instantly on the live site with zero downtime.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link href="/" target="_blank">
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FFFFFF] border border-[#E5E2DB] text-[#4A4D54] hover:bg-[#F5F3EF] transition">
              <ExternalLink className="w-3.5 h-3.5 text-[#1D6FA5]" />
              <span>Live Preview</span>
            </button>
          </Link>
          <button 
            onClick={() => setResetConfirmOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FFFFFF] border border-[#E5E2DB] text-[#71757E] hover:text-[#DB0038] hover:border-rose-200 hover:bg-rose-50 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
          <button 
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#111215] text-[#FAFAF8] hover:bg-[#23252B] shadow-sm transition"
          >
            <Save className="w-3.5 h-3.5 text-[#519DD9]" />
            <span>Save All Changes</span>
          </button>
        </div>
      </div>

      {saveSuccess && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs font-mono text-emerald-800 flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Success! Homepage configuration updated and published across all live client sessions.</span>
          </div>
          <Link href="/" target="_blank" className="underline font-bold hover:text-emerald-950 flex items-center gap-1">
            View Live Site <ArrowUpRight className="w-3 h-3" />
          </Link>
        </div>
      )}

      {/* Tabs Selector */}
      <div className="flex items-center gap-2 border-b border-[#E5E2DB] pb-3 overflow-x-auto text-xs font-semibold scrollbar-none">
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
                  ? "bg-[#111215] text-[#FAFAF8] shadow-sm font-bold"
                  : "bg-[#FFFFFF] border border-[#E5E2DB] text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF]"
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
          <div className="p-6 space-y-6 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
            <div className="border-b border-[#E5E2DB] pb-3">
              <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-display">
                <Zap className="w-4 h-4 text-[#1D6FA5]" /> Hero Section Configuration
              </h3>
              <p className="text-xs text-[#71757E]">Configure the main above-the-fold banner headline, badge, and call-to-action buttons.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#111215]">Badge Prefix / Brand Name</label>
                <input
                  type="text"
                  value={config.hero.badgeSubtitle}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, badgeSubtitle: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#111215]">Badge Subtitle / Niche Tag</label>
                <input
                  type="text"
                  value={config.hero.badgeHighlight}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, badgeHighlight: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-[#111215]">Headline Line 1 (Main Text)</label>
                <input
                  type="text"
                  value={config.hero.headlinePart1}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, headlinePart1: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-display text-sm font-bold focus:border-[#519DD9] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-[#111215]">Headline Line 2 (Highlight Text)</label>
                <input
                  type="text"
                  value={config.hero.headlinePart2}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, headlinePart2: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#1D6FA5] font-display text-sm font-bold focus:border-[#519DD9] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-[#111215]">Main Subheading Paragraph</label>
                <textarea
                  rows={3}
                  value={config.hero.subheading}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, subheading: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#4A4D54] text-xs leading-relaxed focus:border-[#519DD9] focus:outline-none resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#111215]">Primary CTA Text</label>
                <input
                  type="text"
                  value={config.hero.primaryCtaText}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, primaryCtaText: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#111215]">Primary CTA Anchor Link</label>
                <input
                  type="text"
                  value={config.hero.primaryCtaLink}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, primaryCtaLink: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="font-semibold text-[#111215]">Secondary CTA Text</label>
                <input
                  type="text"
                  value={config.hero.secondaryCtaText}
                  onChange={(e) => setConfig({ ...config, hero: { ...config.hero, secondaryCtaText: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Key Assurance Metrics Grid Editor */}
          <div className="p-6 space-y-4 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
            <div className="border-b border-[#E5E2DB] pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#111215] font-display">Key Assurance Metrics (4 Cards)</h3>
                <p className="text-xs text-[#71757E]">Manage the 4 metric cards displayed directly below the hero buttons.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {config.hero.metrics.map((metric) => (
                <div key={metric.id} className="p-4 rounded-2xl bg-[#F5F3EF] border border-[#E5E2DB] space-y-2 flex flex-col justify-between">
                  <div className="space-y-1 text-center">
                    <div className="text-xl font-black font-mono text-[#111215]">{metric.val}</div>
                    <div className="text-[10px] text-[#71757E] uppercase tracking-wider">{metric.label}</div>
                  </div>
                  <button
                    onClick={() => handleOpenEditMetric(metric)}
                    className="w-full py-1.5 bg-[#FFFFFF] hover:bg-[#E5E2DB] border border-[#E5E2DB] text-[#111215] rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition"
                  >
                    <Edit3 className="w-3 h-3 text-[#1D6FA5]" />
                    <span>Edit Metric</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. MARQUEE TICKER TAB */}
      {activeTab === "ticker" && (
        <div className="p-6 space-y-6 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
          <div className="border-b border-[#E5E2DB] pb-3 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-display">
                <Sparkles className="w-4 h-4 text-[#1D6FA5]" /> Kinetic Marquee Ticker
              </h3>
              <p className="text-xs text-[#71757E]">Configure phrases continuously looping across the ticker banner.</p>
            </div>
            <label className="flex items-center gap-2 text-xs font-mono text-[#4A4D54] cursor-pointer">
              <input
                type="checkbox"
                checked={config.ticker.enabled}
                onChange={(e) => setConfig({ ...config, ticker: { ...config.ticker, enabled: e.target.checked } })}
                className="w-4 h-4 accent-[#111215] rounded"
              />
              <span>Ticker Enabled</span>
            </label>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-semibold text-[#111215]">Marquee Phrases (One per line)</label>
            <textarea
              rows={6}
              value={config.ticker.items.join("\n")}
              onChange={(e) => {
                const items = e.target.value.split("\n").filter(Boolean);
                setConfig({ ...config, ticker: { ...config.ticker, items } });
              }}
              className="w-full p-4 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-xs font-mono text-[#111215] leading-relaxed focus:border-[#519DD9] focus:outline-none"
              placeholder="Enter ticker phrases, one per line..."
            />
          </div>

          <div className="p-3 bg-[#F5F3EF] rounded-xl border border-[#E5E2DB] text-xs font-mono text-[#565961] flex items-center gap-2">
            <Info className="w-4 h-4 text-[#1D6FA5]" />
            <span>Currently rendering {config.ticker.items.length} phrases in smooth hardware-accelerated ticker loop.</span>
          </div>
        </div>
      )}

      {/* 3. ABOUT STORY TAB */}
      {activeTab === "about" && (
        <div className="space-y-6">
          <div className="p-6 space-y-6 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
            <div className="border-b border-[#E5E2DB] pb-3">
              <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-display">
                <Info className="w-4 h-4 text-[#1D6FA5]" /> About Us Section
              </h3>
              <p className="text-xs text-[#71757E]">Customize the corporate introduction and company overview.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#111215]">Section Badge Label</label>
                <input
                  type="text"
                  value={config.about.badge}
                  onChange={(e) => setConfig({ ...config, about: { ...config.about, badge: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
                />
              </div>

              <div className="space-y-1.5 flex gap-2">
                <div className="flex-1 space-y-1.5">
                  <label className="font-semibold text-[#111215]">Title Part 1</label>
                  <input
                    type="text"
                    value={config.about.titlePart1}
                    onChange={(e) => setConfig({ ...config, about: { ...config.about, titlePart1: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-display font-bold focus:border-[#519DD9] focus:outline-none"
                  />
                </div>
                <div className="flex-1 space-y-1.5">
                  <label className="font-semibold text-[#111215]">Title Highlight Part</label>
                  <input
                    type="text"
                    value={config.about.titlePart2}
                    onChange={(e) => setConfig({ ...config, about: { ...config.about, titlePart2: e.target.value } })}
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#1D6FA5] font-display font-bold focus:border-[#519DD9] focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1.5 md:col-span-2">
                <label className="font-semibold text-[#111215]">Company Overview Story (Left border highlight paragraph)</label>
                <textarea
                  rows={4}
                  value={config.about.description}
                  onChange={(e) => setConfig({ ...config, about: { ...config.about, description: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#4A4D54] text-xs leading-relaxed focus:border-[#519DD9] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* 3 Value Pillars */}
          <div className="p-6 space-y-4 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
            <h3 className="text-base font-bold text-[#111215] font-display">Core Value Pillars (3 Cards)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {config.about.pillars.map((pillar, idx) => (
                <div key={pillar.id} className="p-4 bg-[#F5F3EF] border border-[#E5E2DB] rounded-2xl space-y-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#71757E] uppercase">Pillar {idx + 1} Title</label>
                    <input
                      type="text"
                      value={pillar.title}
                      onChange={(e) => {
                        const newPillars = [...config.about.pillars];
                        newPillars[idx] = { ...pillar, title: e.target.value };
                        setConfig({ ...config, about: { ...config.about, pillars: newPillars } });
                      }}
                      className="w-full px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-lg text-xs font-mono font-bold text-[#111215]"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#71757E] uppercase">Description</label>
                    <textarea
                      rows={2}
                      value={pillar.description}
                      onChange={(e) => {
                        const newPillars = [...config.about.pillars];
                        newPillars[idx] = { ...pillar, description: e.target.value };
                        setConfig({ ...config, about: { ...config.about, pillars: newPillars } });
                      }}
                      className="w-full px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-lg text-[11px] text-[#565961] resize-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 4. COMPLETED PROJECTS TAB */}
      {activeTab === "projects" && (
        <div className="space-y-6">
          <div className="p-6 space-y-4 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2DB] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-display">
                  <Briefcase className="w-4 h-4 text-[#1D6FA5]" /> Publicly Available Works &amp; Completed Projects
                </h3>
                <p className="text-xs text-[#71757E]">Add, edit, or toggle visibility for live showcase projects on the homepage.</p>
              </div>
              <button 
                onClick={handleOpenAddProject} 
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#111215] text-[#FAFAF8] hover:bg-[#23252B] shadow-sm transition"
              >
                <Plus className="w-4 h-4 text-[#519DD9]" />
                <span>Add Showcase Project</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs pt-2">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#111215]">Section Badge</label>
                <input
                  type="text"
                  value={config.projects.badge}
                  onChange={(e) => setConfig({ ...config, projects: { ...config.projects, badge: e.target.value } })}
                  className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono text-xs focus:border-[#519DD9] focus:outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="font-semibold text-[#111215]">Section Subtitle</label>
                <input
                  type="text"
                  value={config.projects.subtitle}
                  onChange={(e) => setConfig({ ...config, projects: { ...config.projects, subtitle: e.target.value } })}
                  className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] text-xs focus:border-[#519DD9] focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Projects Cards List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {config.projects.projects.map((proj) => (
              <div key={proj.id} className="p-5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs flex flex-col justify-between gap-4 relative overflow-hidden group hover:border-[#D0C9BE] transition">
                <div className="space-y-3">
                  <div className="relative h-44 rounded-xl overflow-hidden bg-[#F5F3EF] border border-[#E5E2DB]">
                    <img src={proj.heroImage} alt={proj.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                      <span className="px-2.5 py-1 bg-[#111215]/80 text-[#FAFAF8] backdrop-blur rounded-full text-[10px] font-mono font-bold">
                        {proj.category}
                      </span>
                      <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 backdrop-blur rounded-full text-[9px] font-mono font-bold">
                        {proj.statusBadge}
                      </span>
                    </div>
                    {!proj.visible && (
                      <div className="absolute inset-0 bg-[#111215]/80 backdrop-blur-sm flex items-center justify-center text-[#FAFAF8] font-mono text-xs font-bold gap-1.5">
                        <EyeOff className="w-4 h-4 text-rose-400" /> Hidden From Homepage
                      </div>
                    )}
                  </div>

                  <div>
                    <h4 className="font-display font-bold text-lg text-[#111215]">{proj.title}</h4>
                    <p className="text-xs text-[#565961] mt-1 line-clamp-2">{proj.description}</p>
                  </div>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {proj.techStack?.map((t, idx) => (
                      <span key={idx} className="px-2 py-0.5 bg-[#F5F3EF] rounded text-[10px] font-mono text-[#4A4D54] border border-[#E5E2DB]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#E5E2DB] flex items-center justify-between gap-2">
                  <a href={proj.liveDemoUrl} target="_blank" rel="noreferrer" className="text-[11px] font-mono text-[#1D6FA5] hover:underline flex items-center gap-1">
                    <span>Live Demo Link</span> <ExternalLink className="w-3 h-3" />
                  </a>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => handleToggleProjectVisibility(proj.id)}
                      className={`p-1.5 rounded-lg border text-xs transition ${
                        proj.visible
                          ? "bg-[#FFFFFF] border-[#E5E2DB] text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF]"
                          : "bg-amber-50 border-amber-200 text-amber-700"
                      }`}
                      title={proj.visible ? "Hide from homepage" : "Show on homepage"}
                    >
                      {proj.visible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleOpenEditProject(proj)}
                      className="px-2.5 py-1.5 bg-[#F5F3EF] hover:bg-[#E5E2DB] border border-[#E5E2DB] text-[#111215] rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <Edit3 className="w-3 h-3 text-[#1D6FA5]" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(proj.id)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-[#DB0038] rounded-lg text-xs transition"
                      title="Delete project"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. TECH STACK TAB */}
      {activeTab === "techStack" && (
        <div className="space-y-6">
          <div className="p-6 space-y-4 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
            <div className="border-b border-[#E5E2DB] pb-3">
              <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-display">
                <Cpu className="w-4 h-4 text-[#1D6FA5]" /> Technology Stack Categories
              </h3>
              <p className="text-xs text-[#71757E]">Edit technologies, descriptions, and frameworks shown across all 4 category cards.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {config.techStack.categories.map((cat, cIdx) => (
                <div key={cat.id || cIdx} className="p-4 bg-[#F5F3EF] border border-[#E5E2DB] rounded-2xl space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#1D6FA5] uppercase font-bold">Category Name</label>
                    <input
                      type="text"
                      value={cat.category}
                      onChange={(e) => {
                        const newCats = [...config.techStack.categories];
                        newCats[cIdx] = { ...cat, category: e.target.value };
                        setConfig({ ...config, techStack: { ...config.techStack, categories: newCats } });
                      }}
                      className="w-full px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-lg text-xs font-bold text-[#111215]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] font-mono text-[#71757E] uppercase">Items ({cat.items.length})</label>
                    <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                      {cat.items.map((item, iIdx) => (
                        <div key={iIdx} className="p-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl space-y-1.5 relative group">
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
                            className="w-full px-2 py-1 bg-[#F5F3EF] border border-[#E5E2DB] rounded text-xs font-bold text-[#111215]"
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
                            className="w-full px-2 py-1 bg-[#F5F3EF] border border-[#E5E2DB] rounded text-[10px] text-[#565961]"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newCats = [...config.techStack.categories];
                              const newItems = cat.items.filter((_, idx) => idx !== iIdx);
                              newCats[cIdx] = { ...cat, items: newItems };
                              setConfig({ ...config, techStack: { ...config.techStack, categories: newCats } });
                            }}
                            className="text-[9px] text-[#DB0038] hover:underline pt-0.5 block"
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
                      className="w-full py-1.5 bg-[#FFFFFF] hover:bg-[#E5E2DB] border border-[#E5E2DB] rounded-lg text-[10px] font-mono text-[#111215] flex items-center justify-center gap-1 transition"
                    >
                      <Plus className="w-3 h-3 text-[#1D6FA5]" /> Add Tech Item
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. PROCESS TIMELINE TAB */}
      {activeTab === "process" && (
        <div className="space-y-6">
          <div className="p-6 space-y-4 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
            <div className="border-b border-[#E5E2DB] pb-3">
              <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-display">
                <Clock className="w-4 h-4 text-[#1D6FA5]" /> 6-Step Strategic Development Timeline
              </h3>
              <p className="text-xs text-[#71757E]">Configure delivery phases and timelines (30–40 days).</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {config.process.steps.map((step, idx) => (
                <div key={step.id || idx} className="p-4 bg-[#F5F3EF] border border-[#E5E2DB] rounded-2xl space-y-3">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="px-2 py-0.5 rounded bg-[#519DD9]/15 text-[#1D6FA5] font-bold">
                      STEP {step.stepNumber}
                    </span>
                    <span className="text-[#B45309] font-bold">{step.phaseLabel}</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#71757E] uppercase">Phase Title</label>
                    <input
                      type="text"
                      value={step.title}
                      onChange={(e) => {
                        const newSteps = [...config.process.steps];
                        newSteps[idx] = { ...step, title: e.target.value };
                        setConfig({ ...config, process: { ...config.process, steps: newSteps } });
                      }}
                      className="w-full px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-lg text-xs font-bold text-[#111215]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-mono text-[#71757E] uppercase">Phase Description</label>
                    <textarea
                      rows={3}
                      value={step.desc}
                      onChange={(e) => {
                        const newSteps = [...config.process.steps];
                        newSteps[idx] = { ...step, desc: e.target.value };
                        setConfig({ ...config, process: { ...config.process, steps: newSteps } });
                      }}
                      className="w-full px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-lg text-[11px] text-[#565961] resize-none leading-relaxed"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 7. SECURITY & QA TAB */}
      {activeTab === "security" && (
        <div className="space-y-6">
          <div className="p-6 space-y-4 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
            <div className="border-b border-[#E5E2DB] pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-display">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" /> Security &amp; Quality Practices
                </h3>
                <p className="text-xs text-[#71757E]">Manage the 10 security assurance cards.</p>
              </div>
              <button
                onClick={() => {
                  const newPractices = [
                    ...config.security.practices,
                    { id: `sec-${Date.now()}`, title: "New Security Standard", desc: "Describe security protection mechanism..." }
                  ];
                  setConfig({ ...config, security: { ...config.security, practices: newPractices } });
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FFFFFF] border border-[#E5E2DB] text-[#111215] hover:bg-[#F5F3EF] transition"
              >
                <Plus className="w-3.5 h-3.5 text-[#1D6FA5]" />
                <span>Add Practice Card</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {config.security.practices.map((sec, idx) => (
                <div key={sec.id || idx} className="p-4 bg-[#F5F3EF] border border-[#E5E2DB] rounded-2xl space-y-2 relative group">
                  <div className="flex items-center justify-between gap-2">
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) => {
                        const newPractices = [...config.security.practices];
                        newPractices[idx] = { ...sec, title: e.target.value };
                        setConfig({ ...config, security: { ...config.security, practices: newPractices } });
                      }}
                      className="flex-1 px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-lg text-xs font-bold text-[#111215]"
                    />
                    <button
                      onClick={() => {
                        const newPractices = config.security.practices.filter((_, i) => i !== idx);
                        setConfig({ ...config, security: { ...config.security, practices: newPractices } });
                      }}
                      className="text-[#DB0038] hover:bg-rose-50 p-1 rounded-lg transition"
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
                    className="w-full px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-lg text-[11px] text-[#565961] resize-none leading-relaxed"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 8. SUPPORT & CTA TAB */}
      {activeTab === "support" && (
        <div className="space-y-6">
          <div className="p-6 space-y-6 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
            <div className="border-b border-[#E5E2DB] pb-3">
              <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-display">
                <Headphones className="w-4 h-4 text-[#1D6FA5]" /> Post-Launch Support &amp; Final CTA
              </h3>
              <p className="text-xs text-[#71757E]">Configure ongoing maintenance pillars and closing conversion call-to-action.</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="space-y-1.5">
                <label className="font-semibold text-[#111215]">Section Quote Statement</label>
                <textarea
                  rows={2}
                  value={config.support.quoteText}
                  onChange={(e) => setConfig({ ...config, support: { ...config.support, quoteText: e.target.value } })}
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#4A4D54] text-xs italic"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#111215]">Bottom CTA Headline</label>
                  <input
                    type="text"
                    value={config.support.ctaHeading}
                    onChange={(e) => setConfig({ ...config, support: { ...config.support, ctaHeading: e.target.value } })}
                    className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] text-xs font-bold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#111215]">Bottom CTA Button Label</label>
                  <input
                    type="text"
                    value={config.support.ctaButtonText}
                    onChange={(e) => setConfig({ ...config, support: { ...config.support, ctaButtonText: e.target.value } })}
                    className="w-full px-3.5 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] text-xs font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Support Pillars */}
          <div className="p-6 space-y-4 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
            <h3 className="text-base font-bold text-[#111215] font-display">6 Ongoing Support Pillars</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {config.support.pillars.map((pillar, idx) => (
                <div key={pillar.id || idx} className="p-4 bg-[#F5F3EF] border border-[#E5E2DB] rounded-2xl space-y-2">
                  <input
                    type="text"
                    value={pillar.title}
                    onChange={(e) => {
                      const newPillars = [...config.support.pillars];
                      newPillars[idx] = { ...pillar, title: e.target.value };
                      setConfig({ ...config, support: { ...config.support, pillars: newPillars } });
                    }}
                    className="w-full px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-lg text-xs font-bold text-[#111215]"
                  />
                  <textarea
                    rows={2}
                    value={pillar.desc}
                    onChange={(e) => {
                      const newPillars = [...config.support.pillars];
                      newPillars[idx] = { ...pillar, desc: e.target.value };
                      setConfig({ ...config, support: { ...config.support, pillars: newPillars } });
                    }}
                    className="w-full px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-lg text-[11px] text-[#565961] resize-none"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 9. TIMEZONE & AGENCY CLOCK TAB */}
      {activeTab === "timezone" && (
        <div className="space-y-6">
          {/* Real-time Homepage Card Preview */}
          <div className="p-6 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs space-y-4">
            <div className="border-b border-[#E5E2DB] pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-display">
                  <Globe className="w-4 h-4 text-[#1D6FA5]" /> Live Homepage Clock &amp; Operating Status Preview
                </h3>
                <p className="text-xs text-[#71757E]">
                  This card updates in real-time and reflects on the Homepage hero banner for all global visitors.
                </p>
              </div>
              <span className="px-2.5 py-1 bg-[#519DD9]/10 text-[#1D6FA5] border border-[#519DD9]/25 rounded-full text-[10px] font-mono font-bold">
                REAL-TIME HOMEPAGE WIDGET
              </span>
            </div>

            <TimezoneClockWidget variant="homepage" className="border-[#E5E2DB] shadow-sm" />
          </div>

          {/* Timezone Configuration Controls */}
          <div className="p-6 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs space-y-6">
            <div className="border-b border-[#E5E2DB] pb-3 flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-display">
                  <Sliders className="w-4 h-4 text-[#1D6FA5]" /> Agency Operating Timezone &amp; Hours
                </h3>
                <p className="text-xs text-[#71757E]">
                  Configure the primary agency timezone, active delivery sprint hours, and real-time clock formatting.
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => autoDetectTimezone()}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FFFFFF] border border-[#E5E2DB] text-[#4A4D54] hover:bg-[#F5F3EF] transition"
                >
                  <Compass className="w-3.5 h-3.5 text-[#1D6FA5]" />
                  <span>Detect Browser Zone</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveTimezone()}
                  className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-bold bg-[#111215] text-[#FAFAF8] hover:bg-[#23252B] shadow-sm transition"
                >
                  <Save className="w-3.5 h-3.5 text-[#519DD9]" />
                  <span>{tzSaveSuccess ? "Settings Saved!" : "Save Timezone Settings"}</span>
                </button>
              </div>
            </div>

            <form onSubmit={handleSaveTimezone} className="space-y-6 text-xs font-sans">
              {/* Primary Timezone & Popular Presets */}
              <div className="space-y-3">
                <label className="block font-semibold text-[#111215]">
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
                            ? "bg-[#111215] text-[#FAFAF8] font-bold shadow-sm"
                            : "bg-[#FFFFFF] text-[#71757E] hover:text-[#111215] border border-[#E5E2DB] hover:bg-[#F5F3EF]"
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
                  className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
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
                  <label className="font-semibold text-[#111215]">Time Format Standard</label>
                  <div className="grid grid-cols-2 gap-1 p-1 bg-[#F5F3EF] rounded-xl border border-[#E5E2DB]">
                    <button
                      type="button"
                      onClick={() => setTzForm({ ...tzForm, timeFormat: "12h" })}
                      className={`py-1.5 rounded-lg font-semibold transition ${
                        tzForm.timeFormat === "12h" ? "bg-[#111215] text-[#FAFAF8] shadow-xs" : "text-[#71757E] hover:text-[#111215]"
                      }`}
                    >
                      12-Hour (AM/PM)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTzForm({ ...tzForm, timeFormat: "24h" })}
                      className={`py-1.5 rounded-lg font-semibold transition ${
                        tzForm.timeFormat === "24h" ? "bg-[#111215] text-[#FAFAF8] shadow-xs" : "text-[#71757E] hover:text-[#111215]"
                      }`}
                    >
                      24-Hour (23:59)
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#111215]">Seconds Live Counter</label>
                  <div className="grid grid-cols-2 gap-1 p-1 bg-[#F5F3EF] rounded-xl border border-[#E5E2DB]">
                    <button
                      type="button"
                      onClick={() => setTzForm({ ...tzForm, showSeconds: true })}
                      className={`py-1.5 rounded-lg font-semibold transition ${
                        tzForm.showSeconds ? "bg-[#111215] text-[#FAFAF8] shadow-xs" : "text-[#71757E] hover:text-[#111215]"
                      }`}
                    >
                      Show (:SS)
                    </button>
                    <button
                      type="button"
                      onClick={() => setTzForm({ ...tzForm, showSeconds: false })}
                      className={`py-1.5 rounded-lg font-semibold transition ${
                        !tzForm.showSeconds ? "bg-[#111215] text-[#FAFAF8] shadow-xs" : "text-[#71757E] hover:text-[#111215]"
                      }`}
                    >
                      Hide Seconds
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#111215]">Homepage Clock Visibility</label>
                  <div className="grid grid-cols-2 gap-1 p-1 bg-[#F5F3EF] rounded-xl border border-[#E5E2DB]">
                    <button
                      type="button"
                      onClick={() => setTzForm({ ...tzForm, showOnHomepage: true })}
                      className={`py-1.5 rounded-lg font-semibold transition ${
                        tzForm.showOnHomepage ? "bg-emerald-600 text-white shadow-xs" : "text-[#71757E] hover:text-[#111215]"
                      }`}
                    >
                      Visible
                    </button>
                    <button
                      type="button"
                      onClick={() => setTzForm({ ...tzForm, showOnHomepage: false })}
                      className={`py-1.5 rounded-lg font-semibold transition ${
                        !tzForm.showOnHomepage ? "bg-rose-600 text-white shadow-xs" : "text-[#71757E] hover:text-[#111215]"
                      }`}
                    >
                      Hidden
                    </button>
                  </div>
                </div>
              </div>

              {/* Operating Business Hours */}
              <div className="p-4 rounded-2xl bg-[#F5F3EF] border border-[#E5E2DB] space-y-3">
                <label className="font-semibold text-[#111215] block">
                  Agency Operational Business Hours (Sprint Availability)
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <label className="text-[11px] text-[#71757E] font-mono">Operating Days</label>
                    <input
                      type="text"
                      value={tzForm.operatingDays}
                      onChange={(e) => setTzForm({ ...tzForm, operatingDays: e.target.value })}
                      placeholder="e.g. Mon – Fri"
                      className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#71757E] font-mono">Office Start Time</label>
                    <input
                      type="time"
                      value={tzForm.officeHoursStart}
                      onChange={(e) => setTzForm({ ...tzForm, officeHoursStart: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] text-[#71757E] font-mono">Office End Time</label>
                    <input
                      type="time"
                      value={tzForm.officeHoursEnd}
                      onChange={(e) => setTzForm({ ...tzForm, officeHoursEnd: e.target.value })}
                      className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Headline Badge Text */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#111215]">Homepage Clock Badge Headline</label>
                  <input
                    type="text"
                    value={tzForm.headlineBadgeText}
                    onChange={(e) => setTzForm({ ...tzForm, headlineBadgeText: e.target.value })}
                    placeholder="e.g. AGENCY HQ LIVE TIME"
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#111215]">Secondary Dual-Clock Timezone</label>
                  <select
                    value={tzForm.secondaryTimezone}
                    onChange={(e) => setTzForm({ ...tzForm, secondaryTimezone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
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
                <button
                  type="submit"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#111215] text-[#FAFAF8] hover:bg-[#23252B] shadow-sm transition"
                >
                  <Save className="w-3.5 h-3.5 text-[#519DD9]" />
                  <span>{tzSaveSuccess ? "Timezone Saved & Synced!" : "Save & Broadcast to Homepage"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 10. RAW JSON CONFIG */}
      {activeTab === "json" && (
        <div className="p-6 space-y-4 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
          <div className="flex items-center justify-between border-b border-[#E5E2DB] pb-3">
            <div>
              <h3 className="text-base font-bold text-[#111215] font-display">Raw JSON Configuration &amp; Backup</h3>
              <p className="text-xs text-[#71757E]">Export or import full site configuration schema in JSON format.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(jsonInput);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#FFFFFF] border border-[#E5E2DB] text-[#111215] hover:bg-[#F5F3EF] transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#1D6FA5]" />}
                <span>{copied ? "Copied JSON" : "Copy JSON"}</span>
              </button>
            </div>
          </div>

          <textarea
            rows={18}
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
            className="w-full p-4 bg-[#111215] border border-[#E5E2DB] rounded-2xl text-xs font-mono text-[#53BAC1] leading-relaxed focus:outline-none focus:ring-1 focus:ring-[#519DD9]"
          />

          <div className="flex justify-end">
            <button
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
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#111215] text-[#FAFAF8] hover:bg-[#23252B] shadow-sm transition"
            >
              <Save className="w-3.5 h-3.5 text-[#519DD9]" />
              <span>Apply &amp; Save JSON</span>
            </button>
          </div>
        </div>
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
              <label className="block font-semibold text-[#111215]">Project Title</label>
              <input
                required
                type="text"
                value={projForm.title || ""}
                onChange={(e) => setProjForm({ ...projForm, title: e.target.value })}
                placeholder="e.g. ERP Platform"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-[#111215]">Category</label>
              <input
                required
                type="text"
                value={projForm.category || ""}
                onChange={(e) => setProjForm({ ...projForm, category: e.target.value })}
                placeholder="e.g. Enterprise Operations"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-[#111215]">Live Demo URL</label>
              <input
                required
                type="url"
                value={projForm.liveDemoUrl || ""}
                onChange={(e) => setProjForm({ ...projForm, liveDemoUrl: e.target.value })}
                placeholder="https://app.vercel.app"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-[#111215]">Status Badge</label>
              <input
                required
                type="text"
                value={projForm.statusBadge || ""}
                onChange={(e) => setProjForm({ ...projForm, statusBadge: e.target.value })}
                placeholder="COMPLETED & LIVE"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#111215]">Hero Image URL</label>
            <input
              required
              type="url"
              value={projForm.heroImage || ""}
              onChange={(e) => setProjForm({ ...projForm, heroImage: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#111215]">Project Description</label>
            <textarea
              required
              rows={3}
              value={projForm.description || ""}
              onChange={(e) => setProjForm({ ...projForm, description: e.target.value })}
              placeholder="Summary of the application, architecture, and value delivered..."
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#111215]">Highlight Features (Comma-separated)</label>
            <input
              required
              type="text"
              value={projFeaturesRaw}
              onChange={(e) => setProjFeaturesRaw(e.target.value)}
              placeholder="User Authentication, Dashboard, Role-Based Access"
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#111215]">Tech Stack Tags (Comma-separated)</label>
            <input
              required
              type="text"
              value={projTechRaw}
              onChange={(e) => setProjTechRaw(e.target.value)}
              placeholder="Next.js, React.js, TypeScript, Tailwind CSS, PostgreSQL"
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none font-mono"
            />
          </div>

          <div className="pt-3 flex gap-2">
            <button 
              type="button" 
              className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#FFFFFF] border border-[#E5E2DB] text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF] transition"
              onClick={() => setProjectModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#111215] text-[#FAFAF8] hover:bg-[#23252B] shadow-sm transition"
            >
              Save Project
            </button>
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
            <label className="block font-semibold text-[#111215]">Metric Value</label>
            <input
              required
              type="text"
              value={metricForm.val || ""}
              onChange={(e) => setMetricForm({ ...metricForm, val: e.target.value })}
              placeholder="e.g. 30–40 DAYS"
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono font-bold focus:border-[#519DD9] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#111215]">Metric Label</label>
            <input
              required
              type="text"
              value={metricForm.label || ""}
              onChange={(e) => setMetricForm({ ...metricForm, label: e.target.value })}
              placeholder="e.g. AVERAGE DELIVERY"
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none uppercase"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#111215]">Color Highlight Class</label>
            <select
              value={metricForm.color || "text-[#111215]"}
              onChange={(e) => setMetricForm({ ...metricForm, color: e.target.value })}
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
            >
              <option value="text-[#111215]">Obsidian (text-[#111215])</option>
              <option value="text-[#1D6FA5]">Digital Blue (text-[#1D6FA5])</option>
              <option value="text-[#0F766E]">Teal (text-[#0F766E])</option>
              <option value="text-[#B45309]">Amber (text-[#B45309])</option>
              <option value="text-[#DB0038]">Crimson (text-[#DB0038])</option>
            </select>
          </div>

          <div className="pt-3 flex gap-2">
            <button 
              type="button" 
              className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#FFFFFF] border border-[#E5E2DB] text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF] transition"
              onClick={() => setMetricModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#111215] text-[#FAFAF8] hover:bg-[#23252B] shadow-sm transition"
            >
              Save Metric
            </button>
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
          <p className="text-[#565961]">
            Are you sure you want to reset all homepage configuration to original default content? Any custom copy, new showcase projects, or metric changes will be restored to defaults.
          </p>
          <div className="pt-2 flex gap-2">
            <button 
              type="button" 
              className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#FFFFFF] border border-[#E5E2DB] text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF] transition"
              onClick={() => setResetConfirmOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="button" 
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#DB0038] text-white hover:bg-rose-700 shadow-sm transition"
              onClick={handleReset}
            >
              Confirm Reset
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
