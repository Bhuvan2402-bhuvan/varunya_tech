"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Clock, 
  CreditCard, 
  LifeBuoy, 
  Bell, 
  LogOut
} from "lucide-react";
import { TimezoneClockWidget } from "@/components/timezone/TimezoneClockWidget";

export default function ClientPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [notificationCount] = useState(3);

  const navItems = [
    { name: "Overview Dashboard", href: "/portal", icon: LayoutDashboard },
    { name: "Sprint Milestone Tracker", href: "/portal/projects", icon: Clock },
    { name: "Invoices & Ledger", href: "/portal/invoices", icon: CreditCard },
    { name: "Architecture Support", href: "/portal/support", icon: LifeBuoy },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAF8] flex flex-col md:flex-row text-[#111215] font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#FFFFFF] border-r border-[#E5E2DB] p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="w-7 h-7 bg-[#111215] text-[#FFFFFF] font-bold font-mono text-xs flex items-center justify-center rounded-lg">
              VT
            </span>
            <span className="font-display font-bold text-xs tracking-wider text-[#111215] uppercase">
              Client<span className="text-[#519DD9] font-light">Portal</span>
            </span>
          </Link>

          {/* Active Project Card */}
          <div className="p-4 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl space-y-1.5">
            <div className="text-[9px] font-mono text-[#71757E] uppercase tracking-widest font-bold">Active Sprint Phase</div>
            <div className="text-xs font-bold text-[#111215] truncate">ApexPay Enterprise Portal</div>
            <div className="text-[10px] text-[#4A4D54] flex items-center justify-between pt-1 font-mono">
              <span>Day 18 // 30</span>
              <span className="text-[#519DD9] font-bold">60% Delivered</span>
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
                  className={`flex items-center gap-3 px-3.5 py-2.5 text-xs font-mono rounded-xl transition-all ${
                    active
                      ? "bg-[#F5F3EF] border border-[#111215] text-[#111215] font-bold shadow-xs"
                      : "text-[#4A4D54] hover:text-[#111215] hover:bg-[#F5F3EF] border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${active ? "text-[#519DD9]" : "text-[#71757E]"}`} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Info Bottom */}
        <div className="pt-6 border-t border-[#E5E2DB] flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 bg-[#F5F3EF] border border-[#E5E2DB] text-[#111215] rounded-lg flex items-center justify-center font-bold text-xs shrink-0 font-mono">
              AP
            </div>
            <div className="truncate">
              <div className="text-[#111215] font-bold truncate">ApexPay Inc</div>
              <div className="text-[10px] text-[#71757E] font-mono">Enterprise SLA</div>
            </div>
          </div>
          <Link href="/" className="p-1.5 text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF] rounded-lg transition-colors">
            <LogOut className="w-4 h-4" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        <header className="flex items-center justify-between pb-6 mb-8 border-b border-[#E5E2DB] flex-wrap gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#111215] font-display">Client Command Center</h1>
            <p className="text-xs text-[#4A4D54] font-light">Monitor live milestone progress, review architecture deliverables, and access documentation.</p>
          </div>

          <div className="flex items-center gap-3">
            <TimezoneClockWidget variant="detailed" />

            <button className="relative p-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#4A4D54] hover:text-[#111215] transition-colors shadow-xs">
              <Bell className="w-4 h-4" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#519DD9] rounded-full" />
              )}
            </button>
            <Link href="/" className="text-xs font-mono font-semibold text-[#111215] hover:text-[#519DD9] transition-colors">
              Exit Portal →
            </Link>
          </div>
        </header>

        {children}
      </main>
    </div>
  );
}
