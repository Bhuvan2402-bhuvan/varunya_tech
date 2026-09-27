"use client";

import React, { useState, useEffect } from "react";
import { useTimezone } from "@/lib/context/TimezoneContext";
import { Clock, Globe, ChevronDown, Activity, Sparkles, Sun, Moon } from "lucide-react";

interface TimezoneClockWidgetProps {
  variant?: "compact" | "detailed" | "navbar" | "pill" | "homepage";
  className?: string;
}

export function TimezoneClockWidget({ variant = "compact", className = "" }: TimezoneClockWidgetProps) {
  const { 
    primaryTimezone, 
    formatTime, 
    formatDate, 
    getTimezoneDetails, 
    openModal, 
    isAgencyOnline,
    operatingDays,
    officeHoursStart,
    officeHoursEnd,
    headlineBadgeText,
    showOnHomepage
  } = useTimezone();
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-400 ${className}`}>
        <Clock className="w-3.5 h-3.5 text-[#FF5500]" />
        <span>Loading clock...</span>
      </div>
    );
  }

  const details = getTimezoneDetails(primaryTimezone);
  const timeString = formatTime(undefined, primaryTimezone);
  const dateString = formatDate(undefined, primaryTimezone);

  // Homepage Rich Hero / Operational Status Card
  if (variant === "homepage") {
    if (!showOnHomepage) return null;

    return (
      <div className={`relative overflow-hidden p-5 rounded-2xl bg-[#0E0E12]/90 border border-white/10 shadow-2xl backdrop-blur-xl ${className}`}>
        {/* Glow Accent */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none ${isAgencyOnline ? "bg-emerald-500/10" : "bg-amber-500/10"}`} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: Clock & Timezone */}
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-2xl border ${
              isAgencyOnline 
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-lg shadow-emerald-500/10" 
                : "bg-amber-500/10 border-amber-500/30 text-amber-400"
            }`}>
              <Clock className="w-6 h-6 animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#FFB347] font-bold">
                  {headlineBadgeText || "AGENCY HQ LIVE TIME"}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-white/10 text-white font-mono text-[10px] font-bold">
                  {details.code} (UTC {details.utcOffset})
                </span>
              </div>
              <div className="text-2xl sm:text-3xl font-black text-white font-mono tracking-tight flex items-baseline gap-2 mt-0.5">
                <span>{timeString}</span>
                <span className="text-xs text-slate-400 font-sans font-normal">{details.city}</span>
              </div>
            </div>
          </div>

          {/* Right: Operational Status & Office Hours */}
          <div className="flex items-center gap-3 sm:border-l sm:border-white/10 sm:pl-5 self-stretch sm:self-auto justify-between sm:justify-start">
            <div className="space-y-0.5 text-left">
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isAgencyOnline ? "bg-emerald-400 animate-ping" : "bg-amber-400"}`} />
                <span className={`text-xs font-mono font-bold uppercase tracking-wider ${isAgencyOnline ? "text-emerald-400" : "text-amber-300"}`}>
                  {isAgencyOnline ? "SPRINT AGENTS ONLINE" : "AFTER HOURS • ASYNC READY"}
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-sans">
                {operatingDays || "Mon – Fri"} ({officeHoursStart || "09:00"} – {officeHoursEnd || "18:00"})
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Public Navbar Variant: Clean live agency time badge (Admin configured)
  if (variant === "navbar") {
    return (
      <div
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#0E0E12]/90 border border-white/10 text-xs font-mono text-slate-300 shadow-sm ${className}`}
        title={`Agency HQ Time: ${details.city} (${details.code} UTC ${details.utcOffset})`}
      >
        <span className={`w-2 h-2 rounded-full ${isAgencyOnline ? "bg-emerald-400 animate-pulse" : "bg-amber-400"}`} />
        <Clock className="w-3.5 h-3.5 text-[#FF5500]" />
        <span className="font-bold text-white tracking-tight">{timeString}</span>
        <span className="px-1.5 py-0.5 bg-white/10 text-[#FFB347] rounded text-[10px] font-semibold">
          {details.code}
        </span>
      </div>
    );
  }

  // Admin / Portal Detailed Variant: Interactive with openModal()
  if (variant === "detailed") {
    return (
      <button
        onClick={openModal}
        className={`group flex items-center gap-3 px-3.5 py-2 rounded-2xl bg-slate-900/80 hover:bg-slate-850 border border-slate-800 hover:border-purple-500/40 transition-all text-left ${className}`}
        title="Admin: Click to customize agency timezones, operating hours, and clock format"
      >
        <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:scale-105 transition-transform">
          <Globe className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-white font-mono">{timeString}</span>
            <span className="px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded text-[9px] font-mono font-bold">
              {details.code}
            </span>
          </div>
          <div className="text-[10px] text-slate-400 font-sans truncate max-w-[150px]">
            {details.city} • <span className="text-slate-500 font-mono">{details.utcOffset}</span>
          </div>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition ml-auto" />
      </button>
    );
  }

  // Default compact / pill
  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300 ${className}`}
    >
      <Clock className="w-3.5 h-3.5 text-cyan-400" />
      <span className="font-bold text-white">{timeString}</span>
      <span className="text-[10px] text-slate-400">{details.code}</span>
    </div>
  );
}
