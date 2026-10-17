"use client";

import React, { useState, useEffect } from "react";
import { getStoredPortfolio, PortfolioItem } from "@/lib/data/cms-data";
import { Search, ExternalLink, Clock } from "lucide-react";

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
    <div className="py-16 lg:py-24 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#FAFAF8] text-[#111215]">
      {/* Header */}
      <div className="space-y-4 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-full font-mono text-[11px] uppercase tracking-[0.2em] text-[#4A4D54] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]"></span>
          Selected Works &amp; Case Studies
        </div>
        <h1 className="text-4xl sm:text-6xl font-black text-[#111215] uppercase tracking-tight leading-[1]">
          Selected Work &amp; <br />
          <span className="font-editorial italic font-light text-[#519DD9] normal-case">Architectural Case Studies.</span>
        </h1>
        <p className="text-[#4A4D54] text-base sm:text-lg leading-relaxed">
          Explore production platforms and web applications engineered by VarunyaTech and deployed into active live service.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
        <div className="flex flex-wrap gap-2 font-mono text-xs">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-3 py-1.5 rounded-lg transition-all uppercase tracking-wider text-[11px] ${
                selectedCat === cat
                  ? "bg-[#111215] text-[#FFFFFF] font-bold shadow-xs"
                  : "bg-[#F5F3EF] text-[#4A4D54] hover:bg-[#FFFFFF] hover:text-[#111215] border border-[#E5E2DB]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#8C8F98] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by tech or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-xs text-[#111215] placeholder:text-[#8C8F98] focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] font-mono transition-all"
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filteredItems.map((item) => (
          <div key={item.id} className="p-8 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs hover:border-[#111215] hover:shadow-md transition-all flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-mono">
                <span className="text-[#519DD9] font-bold uppercase tracking-wider">{item.category}</span>
                <span className="px-2.5 py-1 bg-[#F5F3EF] border border-[#E5E2DB] rounded-full text-[#4A4D54] font-medium flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#519DD9]" /> {item.durationDays || "30–40"} Days SLA
                </span>
              </div>

              <h2 className="text-2xl font-black text-[#111215] uppercase tracking-tight">{item.title}</h2>
              <div className="text-xs text-[#71757E] font-mono">
                <span className="text-[#111215] font-semibold">{item.client}</span> • <span>{item.industry}</span>
              </div>
              <p className="text-sm text-[#4A4D54] leading-relaxed">{item.summary}</p>

              {/* Impact metrics grid */}
              {item.impactMetrics && item.impactMetrics.length > 0 && (
                <div className="grid grid-cols-3 gap-2 bg-[#F5F3EF] p-2 rounded-xl border border-[#E5E2DB] font-mono">
                  {item.impactMetrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 bg-[#FFFFFF] rounded-lg border border-[#E5E2DB] text-center">
                      <div className="text-sm sm:text-base font-bold text-[#111215]">{m.value}</div>
                      <div className="text-[10px] text-[#71757E] uppercase tracking-wider">{m.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Architecture Snippet */}
              {item.architecture && (
                <div className="p-3 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl text-[11px] font-mono text-[#4A4D54]">
                  <span className="text-[#111215] font-bold block mb-1">Architecture Pipeline:</span>
                  {item.architecture}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-[#E5E2DB] flex items-center justify-between flex-wrap gap-3">
              <div className="flex flex-wrap gap-1.5">
                {item.techStack.map((t) => (
                  <span key={t} className="px-2.5 py-1 bg-[#F5F3EF] border border-[#E5E2DB] rounded-md text-[11px] font-mono text-[#4A4D54]">
                    {t}
                  </span>
                ))}
              </div>

              {item.liveDemoUrl && (
                <a
                  href={item.liveDemoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111215] text-[#FFFFFF] hover:bg-[#519DD9] font-mono text-xs uppercase tracking-widest font-semibold transition-colors rounded-xl shadow-xs"
                >
                  <span>Launch Live App</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        ))}

        {filteredItems.length === 0 && (
          <div className="col-span-full text-center py-20 text-[#71757E] font-mono text-sm border border-dashed border-[#E5E2DB] rounded-2xl bg-[#FFFFFF]">
            No portfolio case studies found matching your criteria.
          </div>
        )}
      </div>
    </div>
  );
}
