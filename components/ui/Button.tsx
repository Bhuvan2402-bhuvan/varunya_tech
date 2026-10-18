"use client";

import React from "react";
import { clsx } from "clsx";
import { Loader2 } from "lucide-react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "steel" | "gradient" | "crimson";
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
    primary: "bg-[#519DD9] text-[#FFFFFF] hover:bg-[#3d8ac4] font-bold shadow-xs",
    crimson: "bg-[#DB0038] text-[#FFFFFF] hover:bg-[#b5002e] font-bold shadow-xs",
    gradient: "bg-gradient-to-r from-[#519DD9] to-[#53BAC1] text-[#FFFFFF] hover:opacity-95 font-bold shadow-xs",
    secondary: "bg-white text-[#17191D] hover:bg-gray-50 border border-gray-300 shadow-xs",
    outline: "bg-transparent border border-gray-300 text-[#17191D] hover:border-[#519DD9] hover:bg-gray-50",
    ghost: "bg-transparent text-[#4B5563] hover:text-[#17191D] hover:bg-gray-100",
    steel: "bg-[#519DD9]/10 text-[#0066AA] hover:bg-[#519DD9]/20 border border-[#519DD9]/30 font-bold",
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
