"use client";

import React, { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { GlassCard } from "@/components/ui/GlassCard";
import { 
  useTimezone, 
  AVAILABLE_TIMEZONES, 
  TimezoneOption, 
  TimeFormatType, 
  DateFormatType 
} from "@/lib/context/TimezoneContext";
import { 
  Globe, 
  Clock, 
  Search, 
  Check, 
  Compass, 
  Sparkles, 
  Sliders, 
  Sun, 
  Moon, 
  Calendar,
  Layers,
  ArrowRightLeft
} from "lucide-react";

export function TimezoneModal() {
  const {
    primaryTimezone,
    secondaryTimezone,
    timeFormat,
    showSeconds,
    dateFormat,
    isModalOpen,
    closeModal,
    setPrimaryTimezone,
    setSecondaryTimezone,
    setTimeFormat,
    setShowSeconds,
    setDateFormat,
    autoDetectTimezone,
    formatTime,
    formatDate,
    getTimezoneDetails,
  } = useTimezone();

  const [search, setSearch] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<string>("All");

  const regions = ["All", "Americas", "Europe", "Asia & Pacific", "Middle East & Africa", "Universal"];

  const filteredTimezones = AVAILABLE_TIMEZONES.filter((tz) => {
    const matchesSearch = 
      tz.label.toLowerCase().includes(search.toLowerCase()) ||
      tz.city.toLowerCase().includes(search.toLowerCase()) ||
      tz.code.toLowerCase().includes(search.toLowerCase()) ||
      tz.utcOffset.toLowerCase().includes(search.toLowerCase()) ||
      tz.id.toLowerCase().includes(search.toLowerCase());
    
    const matchesRegion = selectedRegion === "All" || tz.region === selectedRegion;
    return matchesSearch && matchesRegion;
  });

  const primaryDetails = getTimezoneDetails(primaryTimezone);
  const secondaryDetails = getTimezoneDetails(secondaryTimezone);

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={closeModal}
      title="Global Timezone & Local Time Engine"
    >
      <div className="space-y-6 font-sans text-xs max-h-[80vh] overflow-y-auto pr-1">
        {/* Live Dual World Clocks Preview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Primary Clock */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500/15 via-slate-900 to-slate-950 border border-cyan-500/30 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400">
              <span className="flex items-center gap-1 font-bold">
                <Globe className="w-3.5 h-3.5" /> PRIMARY HQ TIME
              </span>
              <span className="px-2 py-0.5 bg-cyan-500/20 rounded text-[10px]">{primaryDetails.code}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              {formatTime(undefined, primaryTimezone)}
            </div>
            <div className="text-[11px] text-slate-300 font-sans">
              <span className="font-semibold text-white">{primaryDetails.city}</span>
              <span className="text-slate-400 block text-[10px]">{formatDate(undefined, primaryTimezone)} (UTC {primaryDetails.utcOffset})</span>
            </div>
          </div>

          {/* Secondary / Client Clock */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/15 via-slate-900 to-slate-950 border border-purple-500/30 space-y-2">
            <div className="flex items-center justify-between text-[11px] font-mono text-purple-400">
              <span className="flex items-center gap-1 font-bold">
                <ArrowRightLeft className="w-3.5 h-3.5" /> CLIENT / DUAL CLOCK
              </span>
              <span className="px-2 py-0.5 bg-purple-500/20 rounded text-[10px]">{secondaryDetails.code}</span>
            </div>
            <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight">
              {formatTime(undefined, secondaryTimezone)}
            </div>
            <div className="text-[11px] text-slate-300 font-sans">
              <span className="font-semibold text-white">{secondaryDetails.city}</span>
              <span className="text-slate-400 block text-[10px]">{formatDate(undefined, secondaryTimezone)} (UTC {secondaryDetails.utcOffset})</span>
            </div>
          </div>
        </div>

        {/* Quick Presets & Auto-Detect */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Popular Hubs
            </span>
            <button
              onClick={() => autoDetectTimezone()}
              className="text-[11px] text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono transition"
            >
              <Compass className="w-3 h-3" /> Auto-Detect Browser Zone
            </button>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {[
              { id: "America/New_York", name: "New York (EST)" },
              { id: "America/Los_Angeles", name: "San Francisco (PST)" },
              { id: "Europe/London", name: "London (GMT)" },
              { id: "Europe/Paris", name: "Paris / Berlin (CET)" },
              { id: "Asia/Kolkata", name: "India (IST)" },
              { id: "Asia/Dubai", name: "Dubai (GST)" },
              { id: "Asia/Singapore", name: "Singapore (SGT)" },
              { id: "Asia/Tokyo", name: "Tokyo (JST)" },
              { id: "Australia/Sydney", name: "Sydney (AEST)" },
              { id: "UTC", name: "UTC" },
            ].map((p) => {
              const isSelected = primaryTimezone === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setPrimaryTimezone(p.id)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition ${
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
        </div>

        {/* Display Formatting Preferences */}
        <div className="p-4 bg-slate-900/60 rounded-2xl border border-slate-800 space-y-3">
          <div className="text-[11px] font-bold text-slate-200 flex items-center gap-1.5">
            <Sliders className="w-3.5 h-3.5 text-purple-400" /> Clock &amp; Date Formatting
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* 12h vs 24h */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-mono">Time Standard</label>
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
                <button
                  onClick={() => setTimeFormat("12h")}
                  className={`py-1 rounded-lg text-[10px] font-semibold transition ${
                    timeFormat === "12h" ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  12-Hour (AM/PM)
                </button>
                <button
                  onClick={() => setTimeFormat("24h")}
                  className={`py-1 rounded-lg text-[10px] font-semibold transition ${
                    timeFormat === "24h" ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  24-Hour (23:59)
                </button>
              </div>
            </div>

            {/* Seconds Toggle */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-mono">Seconds Accuracy</label>
              <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
                <button
                  onClick={() => setShowSeconds(true)}
                  className={`py-1 rounded-lg text-[10px] font-semibold transition ${
                    showSeconds ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Show Seconds (:SS)
                </button>
                <button
                  onClick={() => setShowSeconds(false)}
                  className={`py-1 rounded-lg text-[10px] font-semibold transition ${
                    !showSeconds ? "bg-cyan-500 text-white" : "text-slate-400 hover:text-white"
                  }`}
                >
                  Hide Seconds
                </button>
              </div>
            </div>

            {/* Secondary Timezone selector */}
            <div className="space-y-1">
              <label className="text-[10px] text-slate-400 font-mono">Secondary Dual Clock</label>
              <select
                value={secondaryTimezone}
                onChange={(e) => setSecondaryTimezone(e.target.value)}
                className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-[11px] text-white focus:outline-none focus:border-purple-500"
              >
                {AVAILABLE_TIMEZONES.map((tz) => (
                  <option key={tz.id} value={tz.id}>
                    {tz.code} - {tz.city}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Search & Region Filter */}
        <div className="space-y-3">
          <div className="text-[11px] font-bold text-slate-200 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-cyan-400" /> Select Primary Timezone ({filteredTimezones.length})
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by city, code (EST, IST), or region..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="flex flex-wrap gap-1">
              {regions.map((r) => (
                <button
                  key={r}
                  onClick={() => setSelectedRegion(r)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-medium transition ${
                    selectedRegion === r
                      ? "bg-slate-800 text-white border border-slate-700 font-semibold"
                      : "bg-slate-950 text-slate-500 hover:text-slate-300"
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Timezone List */}
          <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1 border border-slate-800/80 rounded-2xl p-2 bg-slate-950/60">
            {filteredTimezones.map((tz) => {
              const isSelected = primaryTimezone === tz.id;
              return (
                <button
                  key={tz.id}
                  onClick={() => setPrimaryTimezone(tz.id)}
                  className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between gap-3 transition ${
                    isSelected
                      ? "bg-cyan-500/15 border border-cyan-500/40 text-white"
                      : "hover:bg-slate-900/80 text-slate-300 border border-transparent"
                  }`}
                >
                  <div className="space-y-0.5 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs truncate text-white">{tz.city}</span>
                      <span className="px-1.5 py-0.2 bg-slate-800 rounded text-[9px] font-mono text-cyan-400">
                        {tz.code}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">UTC {tz.utcOffset}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{tz.label}</div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 text-right">
                    <div className="font-mono text-xs font-bold text-slate-200">
                      {formatTime(undefined, tz.id)}
                    </div>
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center border transition ${
                        isSelected
                          ? "bg-cyan-500 border-cyan-500 text-white"
                          : "border-slate-700"
                      }`}
                    >
                      {isSelected && <Check className="w-2.5 h-2.5" />}
                    </div>
                  </div>
                </button>
              );
            })}

            {filteredTimezones.length === 0 && (
              <div className="text-center py-8 text-slate-500 font-mono text-xs">
                No matching timezones found.
              </div>
            )}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-2 flex justify-end">
          <Button variant="gradient" size="sm" onClick={closeModal}>
            Done &amp; Apply Timezone
          </Button>
        </div>
      </div>
    </Modal>
  );
}
