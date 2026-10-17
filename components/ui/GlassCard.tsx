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
        "bg-[#FFFFFF] border border-[#E5E2DB] shadow-sm",
        hoverGlow && "hover:border-[#111215] hover:shadow-md hover:bg-[#FAFAF8]",
        gradientBorder && "border-l-2 border-l-[#519DD9]",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
