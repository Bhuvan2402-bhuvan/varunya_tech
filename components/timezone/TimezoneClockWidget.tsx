"use client";

import React, { useState, useEffect } from "react";
import { useTimezone } from "@/lib/context/TimezoneContext";
import { Clock, Globe, ChevronDown } from "lucide-react";

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
      <div className={`inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] rounded-full text-xs font-mono text-[#71757E] shadow-xs ${className}`}>
        <Clock className="w-3.5 h-3.5 text-[#519DD9]" />
        <span>Syncing studio clock...</span>
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
      <div className={`relative overflow-hidden p-5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs ${className}`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Left: Clock & Timezone */}
          <div className="flex items-center gap-4">
            <div className="p-2.5 bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9] rounded-xl">
              <Clock className="w-5 h-5 text-[#519DD9]" />
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#71757E] font-bold">
                  {headlineBadgeText || "STUDIO HEADQUARTERS"}
                </span>
                <span className="px-1.5 py-0.5 bg-[#F5F3EF] border border-[#E5E2DB] rounded text-[#111215] font-mono text-[10px] font-bold">
                  {details.code} (UTC {details.utcOffset})
                </span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#111215] font-mono tracking-tight flex items-baseline gap-2 mt-0.5">
                <span>{timeString}</span>
                <span className="text-xs text-[#71757E] font-sans font-normal">{details.city}</span>
              </div>
            </div>
          </div>

          {/* Right: Operational Status & Office Hours */}
          <div className="flex items-center gap-3 sm:border-l sm:border-[#E5E2DB] sm:pl-5 self-stretch sm:self-auto justify-between sm:justify-start">
            <div className="space-y-0.5 text-left">
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isAgencyOnline ? "bg-[#519DD9] animate-pulse" : "bg-[#71757E]"}`} />
                <span className="text-xs font-mono uppercase tracking-wider text-[#111215] font-bold">
                  {isAgencyOnline ? "STUDIO ACTIVE • IN-SESSION" : "STANDBY • ASYNC READY"}
                </span>
              </div>
              <div className="text-[11px] text-[#71757E] font-mono">
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
        className={`inline-flex items-center gap-2 px-3 py-1 bg-[#FFFFFF] border border-[#E5E2DB] rounded-full text-xs font-mono text-[#111215] shadow-xs cursor-pointer hover:border-[#111215] transition-all ${className}`}
        onClick={openModal}
        title={`Studio HQ Time: ${details.city} (${details.code} UTC ${details.utcOffset}) — Click to customize`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${isAgencyOnline ? "bg-[#519DD9]" : "bg-[#71757E]"}`} />
        <Clock className="w-3.5 h-3.5 text-[#519DD9]" />
        <span className="text-[#111215] font-bold tracking-tight">{timeString}</span>
        <span className="px-1.5 py-0.2 bg-[#F5F3EF] text-[#71757E] rounded text-[10px] font-bold">
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
        className={`group flex items-center gap-3 px-3.5 py-2 bg-[#FFFFFF] hover:bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl hover:border-[#111215] transition-all text-left shadow-xs ${className}`}
        title="Admin: Click to customize agency timezones, operating hours, and clock format"
      >
        <div className="p-2 bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9] rounded-lg group-hover:scale-105 transition-transform">
          <Globe className="w-4 h-4" />
        </div>
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-[#111215] font-mono">{timeString}</span>
            <span className="px-1.5 py-0.2 bg-[#F5F3EF] border border-[#E5E2DB] text-[#111215] rounded text-[9px] font-mono font-bold">
              {details.code}
            </span>
          </div>
          <div className="text-[10px] text-[#71757E] font-sans truncate max-w-[150px]">
            {details.city} • <span className="text-[#71757E] font-mono">{details.utcOffset}</span>
          </div>
        </div>
        <ChevronDown className="w-3.5 h-3.5 text-[#71757E] group-hover:text-[#111215] transition ml-auto" />
      </button>
    );
  }

  // Default compact / pill
  return (
    <div
      className={`inline-flex items-center gap-2 px-2.5 py-1 bg-[#FFFFFF] border border-[#E5E2DB] rounded-full text-xs font-mono text-[#111215] shadow-xs ${className}`}
    >
      <Clock className="w-3.5 h-3.5 text-[#519DD9]" />
      <span className="font-bold text-[#111215]">{timeString}</span>
      <span className="text-[10px] text-[#71757E] font-bold">{details.code}</span>
    </div>
  );
}
