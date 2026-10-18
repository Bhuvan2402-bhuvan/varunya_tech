"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Menu, 
  X, 
  Mail
} from "lucide-react";
import { ConsultationModal } from "@/components/consultation/ConsultationModal";

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [consultModalOpen, setConsultModalOpen] = useState(false);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 w-full bg-[#17191D]/92 backdrop-blur-md border-b border-[#2A2E37] transition-colors duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo / Official Dimensional Emblem */}
          <Link href="/" className="flex items-center gap-3 group shrink-0" aria-label="Varunya Technologies Home">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-transform group-hover:scale-105">
              <img 
                src="/images/varunya-emblem.png" 
                alt="Varunya Technologies" 
                className="w-full h-full object-contain filter drop-shadow-[0_2px_10px_rgba(81,157,217,0.35)]"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-sans font-black text-sm sm:text-base tracking-[0.16em] text-[#EDEDED] uppercase">
                VARUNYA<span className="text-[#519DD9] font-normal">TECH</span>
              </span>
              <span className="text-[8px] font-mono tracking-[0.22em] text-[#519DD9] uppercase -mt-0.5 font-bold">
                IDEAS • TECHNOLOGY • IMPACT
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links - Customer-Centred Hierarchy */}
          <nav className="hidden lg:flex items-center gap-1 font-mono text-[11px] uppercase tracking-widest text-[#A6AFBD]">
            <Link
              href="/#products"
              className="px-3 py-1.5 transition-colors hover:text-[#EDEDED]"
            >
              Products
            </Link>

            <span className="text-[#323742] select-none">/</span>

            <Link
              href="/#problems"
              className="px-3 py-1.5 transition-colors hover:text-[#EDEDED]"
            >
              Solutions
            </Link>

            <span className="text-[#323742] select-none">/</span>

            <Link
              href="/#works"
              className="px-3 py-1.5 transition-colors hover:text-[#EDEDED]"
            >
              Our Work
            </Link>

            <span className="text-[#323742] select-none">/</span>

            <Link
              href="/#engineering"
              className="px-3 py-1.5 transition-colors hover:text-[#EDEDED]"
            >
              Engineering
            </Link>

            <span className="text-[#323742] select-none">/</span>

            <Link
              href="/about"
              className={`px-3 py-1.5 transition-colors ${
                pathname === "/about" 
                  ? "text-[#519DD9] font-bold" 
                  : "hover:text-[#EDEDED]"
              }`}
            >
              About
            </Link>

            <span className="text-[#323742] select-none">/</span>

            <Link
              href="/#contact"
              className="px-3 py-1.5 transition-colors hover:text-[#EDEDED]"
            >
              Contact
            </Link>
          </nav>

          {/* Right Action: Direct Email & Primary CTA */}
          <div className="hidden sm:flex items-center gap-4">
            <a
              href="mailto:varunyatech@gmail.com"
              className="hidden xl:inline-flex items-center gap-1.5 font-mono text-[11px] text-[#A6AFBD] hover:text-[#EDEDED] transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#519DD9]" />
              <span>varunyatech@gmail.com</span>
            </a>
            <button
              onClick={() => setConsultModalOpen(true)}
              className="px-5 py-2.5 bg-[#DB0038] hover:bg-[#b5002e] text-[#FFFFFF] font-mono text-xs uppercase tracking-widest font-bold transition-all shadow-[0_2px_12px_rgba(219,0,56,0.35)]"
            >
              Discuss a Project
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 bg-[#202329] border border-[#2A2E37] text-[#EDEDED] hover:border-[#519DD9] transition-colors shadow-sm"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden p-6 bg-[#191C21] border-b border-[#2A2E37] space-y-4 animate-in slide-in-from-top-2 duration-200 shadow-2xl">
            <div className="grid grid-cols-2 gap-2 font-mono text-xs uppercase tracking-wider">
              <Link href="/#products" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#202329] border border-[#2A2E37] text-[#EDEDED] hover:border-[#519DD9]">Products</Link>
              <Link href="/#problems" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#202329] border border-[#2A2E37] text-[#EDEDED] hover:border-[#519DD9]">Solutions</Link>
              <Link href="/#works" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#202329] border border-[#2A2E37] text-[#EDEDED] hover:border-[#519DD9]">Our Work</Link>
              <Link href="/#engineering" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#202329] border border-[#2A2E37] text-[#EDEDED] hover:border-[#519DD9]">Engineering</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#202329] border border-[#2A2E37] text-[#EDEDED] hover:border-[#519DD9]">About</Link>
              <Link href="/#contact" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-[#202329] border border-[#2A2E37] text-[#EDEDED] hover:border-[#519DD9]">Contact</Link>
            </div>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setConsultModalOpen(true);
              }}
              className="block w-full py-3 bg-[#DB0038] text-[#FFFFFF] text-center font-mono text-xs uppercase tracking-widest font-semibold hover:bg-[#b5002e] transition-all"
            >
              Discuss a Project
            </button>
          </div>
        )}
      </header>

      {/* Global 1-on-1 Consultation Modal */}
      <ConsultationModal isOpen={consultModalOpen} onClose={() => setConsultModalOpen(false)} />
    </>
  );
}
