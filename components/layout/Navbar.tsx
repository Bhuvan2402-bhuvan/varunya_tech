"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Layers, 
  ArrowUpRight,
  Mail
} from "lucide-react";
import { ConsultationModal } from "@/components/consultation/ConsultationModal";
import { SERVICES_DATA, INDUSTRIES_DATA } from "@/lib/data/mock-data";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [industriesOpen, setIndustriesOpen] = useState(false);
  const [aiModalOpen, setAiModalOpen] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesOpen(false);
    setIndustriesOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#FAFAF8]/95 backdrop-blur-md border-b border-[#E5E2DB] transition-colors duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.03)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo / Official Dimensional Emblem */}
          <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Varunya Technologies Home">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-105">
              <img 
                src="/images/varunya-emblem.png" 
                alt="Varunya Technologies" 
                className="w-full h-full object-contain filter drop-shadow-[0_2px_8px_rgba(200,155,60,0.25)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-sm sm:text-base tracking-[0.16em] text-[#111215] uppercase">
                VARUNYA<span className="text-[#519DD9] font-normal">TECH</span>
              </span>
              <span className="text-[8px] font-mono tracking-[0.22em] text-[#C89B3C] uppercase -mt-0.5 font-bold">
                IDEAS • TECHNOLOGY • IMPACT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Customer-Centred Hierarchy */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-[#565961]">
            <Link
              href="/#products"
              className="px-3 py-1.5 transition-colors hover:text-[#111215]"
            >
              Products
            </Link>

            <span className="text-[#D4D0C5] select-none">/</span>

            <Link
              href="/#problems"
              className="px-3 py-1.5 transition-colors hover:text-[#111215]"
            >
              Solutions
            </Link>

            <span className="text-[#D4D0C5] select-none">/</span>

            <Link
              href="/#works"
              className="px-3 py-1.5 transition-colors hover:text-[#111215]"
            >
              Our Work
            </Link>

            <span className="text-[#D4D0C5] select-none">/</span>

            <Link
              href="/#engineering"
              className="px-3 py-1.5 transition-colors hover:text-[#111215]"
            >
              Engineering
            </Link>

            <span className="text-[#D4D0C5] select-none">/</span>

            <Link
              href="/about"
              className={`px-3 py-1.5 transition-colors ${
                pathname === "/about" 
                  ? "text-[#111215] font-bold" 
                  : "hover:text-[#111215]"
              }`}
            >
              About
            </Link>

            <span className="text-[#D4D0C5] select-none">/</span>

            <Link
              href="/#contact"
              className="px-3 py-1.5 transition-colors hover:text-[#111215]"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action: Direct Email & Primary CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="mailto:varunyatech@gmail.com"
              className="hidden xl:inline-flex items-center gap-1.5 font-mono text-[11px] text-[#565961] hover:text-[#111215] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#519DD9]" />
              <span>varunyatech@gmail.com</span>
            </a>
            <a
              href="/#contact"
              className="px-5 py-2.5 bg-[#111215] text-[#FFFFFF] hover:bg-[#519DD9] hover:text-[#111215] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-sm"
            >
              Discuss a Project
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 bg-[#FFFFFF] border border-[#E5E2DB] text-[#111215] hover:border-[#111215] transition-colors shadow-sm"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden p-6 bg-[#FFFFFF] border-b border-[#E5E2DB] space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-xl">
            <div className="grid grid-cols-2 gap-2 font-mono text-xs uppercase tracking-wider">
              <Link href="/#products" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#F5F3EF] border border-[#E5E2DB] text-[#111215] hover:border-[#111215]">Products</Link>
              <Link href="/#problems" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#F5F3EF] border border-[#E5E2DB] text-[#111215] hover:border-[#111215]">Solutions</Link>
              <Link href="/#works" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#F5F3EF] border border-[#E5E2DB] text-[#111215] hover:border-[#111215]">Our Work</Link>
              <Link href="/#engineering" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#F5F3EF] border border-[#E5E2DB] text-[#111215] hover:border-[#111215]">Engineering</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#F5F3EF] border border-[#E5E2DB] text-[#111215] hover:border-[#111215]">About</Link>
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#F5F3EF] border border-[#E5E2DB] text-[#111215] hover:border-[#111215]">Contact</Link>
            </div>
            <a
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full py-3 bg-[#111215] text-[#FFFFFF] text-center font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#519DD9] hover:text-[#111215]"
            >
              Discuss a Project
            </a>
          </div>
        )}
      </header>

      {/* Global 1-on-1 Consultation Modal */}
      <ConsultationModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </>
  );
}
