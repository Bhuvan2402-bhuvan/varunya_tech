"use client";

import React, { useRef } from "react";

interface SpotlightCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  spotlightColor?: string;
  className?: string;
  cursorText?: string;
}

export function SpotlightCard({
  children,
  spotlightColor = "rgba(255, 85, 0, 0.2)",
  className = "",
  cursorText = "",
  ...props
}: SpotlightCardProps) {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    divRef.current.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    divRef.current.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  const handleMouseEnter = () => {
    if (!divRef.current) return;
    divRef.current.style.setProperty("--mouse-opacity", "1");
  };

  const handleMouseLeave = () => {
    if (!divRef.current) return;
    divRef.current.style.setProperty("--mouse-opacity", "0");
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor={cursorText}
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-[#0E0E12]/80 backdrop-blur-xl transition-all duration-300 hover:border-[#FF5500]/40 ${className}`}
      {...props}
    >
      {/* Spotlight Radial Background */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-0"
        style={{
          opacity: "var(--mouse-opacity, 0)" as any,
          background: `radial-gradient(600px circle at var(--mouse-x, -9999px) var(--mouse-y, -9999px), ${spotlightColor}, transparent 40%)`,
        }}
      />

      {/* Subtle Border Spotlight Glow */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          boxShadow: `inset 0 0 20px ${spotlightColor}`,
        }}
      />

      <div className="relative z-10">{children}</div>
    </div>
  );
}
