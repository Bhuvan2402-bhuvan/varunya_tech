"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { TimezoneProvider } from "@/lib/context/TimezoneContext";
import { TimezoneModal } from "@/components/timezone/TimezoneModal";

export function ClientLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isDashboardRoute = pathname.startsWith("/admin") || pathname.startsWith("/portal");

  return (
    <TimezoneProvider>
      <TimezoneModal />
      {isDashboardRoute ? (
        children
      ) : (
        <>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </>
      )}
    </TimezoneProvider>
  );
}
