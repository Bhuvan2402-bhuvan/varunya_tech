"use client";

import React from "react";
import { Sparkles, Zap, Shield, Award, Terminal, Code2, Cpu } from "lucide-react";

interface MarqueeProps {
  items?: string[];
  direction?: "left" | "right";
  speed?: "slow" | "normal" | "fast";
  className?: string;
}

const DEFAULT_ITEMS = [
  "BUILD IN 30 DAYS",
  "ENTERPRISE NEXT.JS 15",
  "AI VECTOR AGENTS",
  "AWWWARDS QUALITY",
  "ZERO TECH DEBT",
  "SUB-100MS LATENCY",
  "FULL-STACK SPRINT",
  "MICROSERVICES & REDIS",
];

export function MarqueeTicker({
  items = DEFAULT_ITEMS,
  direction = "left",
  className = "",
}: MarqueeProps) {
  const iconList = [Sparkles, Zap, Shield, Award, Terminal, Code2, Cpu];

  return (
    <div className={`relative overflow-hidden w-full py-4 bg-white/90 border-y border-gray-200 ${className}`}>
      {/* Side Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div
        className={`flex whitespace-nowrap gap-8 w-max ${
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse"
        }`}
      >
        {/* Double the list to ensure seamless looping */}
        {[...items, ...items, ...items, ...items].map((text, idx) => {
          const Icon = iconList[idx % iconList.length];
          return (
            <div
              key={idx}
              className="flex items-center gap-4 text-sm sm:text-base font-mono tracking-widest uppercase font-bold text-[#17191D] hover:text-[#519DD9] transition-colors cursor-default"
            >
              <Icon className="w-4 h-4 text-[#519DD9]" />
              <span>{text}</span>
              <span className="text-[#DB0038] font-black">•</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
