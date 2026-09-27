"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Zap, 
  LayoutDashboard, 
  Clock, 
  FileCheck, 
  CreditCard, 
  FileText, 
  LifeBuoy, 
  MessageSquare, 
  Calendar, 
  Bell, 
  User, 
  LogOut,
  ChevronRight
} from "lucide-react";
import { TimezoneClockWidget } from "@/components/timezone/TimezoneClockWidget";

export default function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [notificationCount] = useState(3);

  const navItems = [
    { name: "Overview Dashboard", href: "/portal", icon: LayoutDashboard },
    { name: "30-Day Sprint Progress", href: "/portal/projects", icon: Clock },
    { name: "Invoices & Payments", href: "/portal/invoices", icon: CreditCard },
    { name: "Support Tickets", href: "/portal/support", icon: LifeBuoy },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 border-r border-slate-800 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-slate-950 rounded-[7px] flex items-center justify-center">
                <Zap className="w-4 h-4 text-cyan-400" />
              </div>
            </div>
            <span className="font-display font-bold text-sm tracking-tight text-white">
              CLIENT<span className="text-cyan-400">PORTAL</span>
            </span>
          </Link>

          {/* Active Project Card */}
          <div className="p-3.5 bg-slate-950 border border-cyan-500/30 rounded-xl space-y-1">
            <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">Active 30-Day Sprint</div>
            <div className="text-xs font-bold text-white truncate">ApexPay FinTech Portal</div>
            <div className="text-[10px] text-slate-400 flex items-center justify-between pt-1">
              <span>Day 18 of 30</span>
              <span className="text-emerald-400 font-bold">60% Complete</span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    active
                      ? "bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-semibold"
                      : "text-slate-400 hover:text-white hover:bg-slate-800/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-cyan-400" : "text-slate-500"}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info Bottom */}
        <div className="pt-6 border-t border-slate-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold text-xs shrink-0">
              AP
            </div>
            <div className="truncate">
              <div className="text-white font-bold truncate">ApexPay Inc</div>
              <div className="text-[10px] text-slate-400 font-mono">Enterprise Tier</div>
            </div>
          </div>
          <Link href="/" className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <header className="flex items-center justify-between pb-6 mb-8 border-b border-slate-800 flex-wrap gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white font-display">Client Command Center</h1>
            <p className="text-xs text-slate-400">Monitor live 30-day milestone progress, review invoices, and download deliverables.</p>
          </div>

          <div className="flex items-center gap-3">
            <TimezoneClockWidget variant="detailed" />

            <button className="relative p-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-white">
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              )}
            </button>
            <Link href="/" className="text-xs font-medium text-cyan-400 hover:underline">
              Exit Portal →
            </Link>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
