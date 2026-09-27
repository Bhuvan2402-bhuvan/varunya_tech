"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredPortfolio, PortfolioItem } from "@/lib/data/cms-data";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Search, ExternalLink, ArrowRight, Layers, Clock } from "lucide-react";

export default function PortfolioPage() {
  const [items, setItems] = useState<PortfolioItem[]>([]);
  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("All");

  useEffect(() => {
    setItems(getStoredPortfolio());

    const handleUpdate = () => {
      setItems(getStoredPortfolio());
    };
    window.addEventListener("portfolio-updated", handleUpdate);
    return () => window.removeEventListener("portfolio-updated", handleUpdate);
  }, []);

  const categories = ["All", "Enterprise Operations", "Finance", "Healthcare", "Logistics", "Education & Learning", "Legal & Corporate"];

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCat === "All" || item.industry === selectedCat || item.category === selectedCat;
    const matchesSearch =
      item.title.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase()) ||
      item.techStack.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="py-16 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-400">
          PROVEN 30-DAY DELIVERIES
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display">
          Portfolio &amp; Case Studies
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Explore real production platforms built and deployed for global enterprise clients within strict 30-day timelines.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-900/80 border border-slate-800 rounded-2xl">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCat === cat
                  ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20"
                  : "bg-slate-800 text-slate-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by tech or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <GlassCard key={item.id} className="p-8 border-slate-800 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-cyan-400 font-bold">{item.category}</span>
                <span className="px-2.5 py-1 bg-slate-800 border border-slate-700 rounded-lg text-slate-300 flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" /> {item.durationDays || 30} Days SLA
                </span>
              </div>

              <h2 className="text-2xl font-bold text-white">{item.title}</h2>
              <div className="text-xs text-slate-400 font-mono">
                <span className="text-slate-300 font-semibold">{item.client}</span> • <span>{item.industry}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">{item.summary}</p>

              {/* Impact metrics grid */}
              {item.impactMetrics && item.impactMetrics.length > 0 && (
                <div className="grid grid-cols-3 gap-3 p-4 bg-slate-950/80 rounded-xl border border-slate-800/80">
                  {item.impactMetrics.map((m, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-base sm:text-lg font-bold text-cyan-400 font-mono">{m.value}</div>
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Architecture Snippet */}
              {item.architecture && (
                <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400">
                  <span className="text-cyan-400 font-bold block mb-1">Architecture Pipeline:</span>
                  {item.architecture}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between flex-wrap gap-3">
              <div className="flex flex-wrap gap-1.5">
                {item.techStack.map((t) => (
                  <span key={t} className="px-2 py-0.5 bg-slate-800 rounded text-[10px] font-mono text-slate-300">
                    {t}
                  </span>
                ))}
              </div>

              {item.liveDemoUrl && (
                <a href={item.liveDemoUrl} target="_blank" rel="noreferrer">
                  <Button size="sm" variant="outline" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                    Live Preview
                  </Button>
                </a>
              )}
            </div>
          </GlassCard>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-20 text-slate-500 font-mono text-sm border border-dashed border-slate-800 rounded-2xl">
            No portfolio case studies found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
