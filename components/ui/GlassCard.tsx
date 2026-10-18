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
        "relative transition-all duration-300 overflow-hidden",
        "bg-[#202329] border border-[#2A2E37] text-[#EDEDED] shadow-sm",
        hoverGlow && "hover:border-[#519DD9] hover:shadow-steel-glow hover:bg-[#252932]",
        gradientBorder && "border-l-2 border-l-[#519DD9]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
