"use client";

import React from "react";
import { clsx } from "clsx";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  hoverGlow?: boolean;
  gradientBorder?: boolean;
}

export function GlassCard({
  children,
  className,
  hoverGlow = true,
  gradientBorder = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={clsx(
        "relative rounded-2xl transition-all duration-300 overflow-hidden",
        "bg-slate-900/60 backdrop-blur-xl border border-white/10",
        hoverGlow && "hover:border-cyan-500/40 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.25)] hover:-translate-y-1",
        gradientBorder && "before:absolute before:inset-0 before:p-[1px] before:bg-gradient-to-r before:from-cyan-500 before:to-purple-600 before:rounded-2xl before:-z-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
