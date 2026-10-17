"use client";

import React from "react";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "steel" | "gradient";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
}

export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  loading = false,
  icon,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "inline-flex items-center justify-center font-mono text-xs uppercase tracking-wider transition-all duration-200 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const variants = {
    primary: "bg-[#111215] text-[#FFFFFF] hover:bg-[#519DD9] font-bold shadow-sm",
    gradient: "bg-[#111215] text-[#FFFFFF] hover:bg-[#519DD9] font-bold shadow-sm",
    secondary: "bg-[#F5F3EF] text-[#111215] hover:bg-[#EBE8E1] border border-[#E5E2DB]",
    outline: "bg-transparent border border-[#E5E2DB] text-[#111215] hover:border-[#111215] hover:bg-[#F5F3EF]",
    ghost: "bg-transparent text-[#565961] hover:text-[#111215] hover:bg-[#F5F3EF]",
    steel: "bg-[#519DD9] text-[#111215] hover:bg-[#53BAC1] font-bold",
  };

  const sizes = {
    sm: "px-3.5 py-1.5 text-[11px] gap-1.5",
    md: "px-5 py-2.5 text-xs gap-2",
    lg: "px-7 py-3 text-xs gap-2.5 font-semibold",
  };

  const activeVariant = variants[variant as keyof typeof variants] || variants.primary;

  return (
    <button
      className={clsx(baseStyles, activeVariant, sizes[size], className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin text-current" />
      ) : icon ? (
        <span className="shrink-0">{icon}</span>
      ) : null}
      {children}
    </button>
  );
}
