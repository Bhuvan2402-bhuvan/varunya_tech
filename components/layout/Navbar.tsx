"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Zap, 
  ChevronDown, 
  Menu, 
  X, 
  Code2, 
  Building2, 
  ArrowUpRight,
  Calendar,
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
      <header className="sticky top-4 z-50 w-full px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-all duration-300">
        <div className="w-full glass-nav rounded-2xl border border-white/10 px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group shrink-0" data-cursor="VARUNYA">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] via-[#FF8A00] to-[#7C5CFF] p-[1px] shadow-lg shadow-[#FF6B00]/30 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#070708] rounded-[11px] flex items-center justify-center">
                <Zap className="w-5 h-5 text-[#FF6B00] fill-[#FF6B00]/20" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-base sm:text-lg tracking-tight text-white flex items-center gap-1.5 uppercase">
                VARUNYA <span className="text-[#FF6B00]">TECH</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-[#FFB347] uppercase -mt-1 font-semibold flex items-center gap-1">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#7C5CFF] animate-pulse" />
                CUSTOM SOFTWARE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-[#0A0A0C]/80 px-3 py-1.5 rounded-full border border-white/5">
            <Link
              href="/"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                pathname === "/" 
                  ? "text-[#FF5500] bg-white/10 font-bold" 
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Home
            </Link>

            <Link
              href="/about"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                pathname === "/about" 
                  ? "text-[#FF5500] bg-white/10 font-bold" 
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              About
            </Link>

            {/* Services Link & Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <div className="flex items-center">
                <Link
                  href="/services"
                  className={`pl-3.5 pr-1.5 py-1.5 rounded-l-full text-xs font-mono tracking-wider uppercase transition-all ${
                    pathname.startsWith("/services") 
                      ? "text-[#FF5500] bg-white/10 font-bold" 
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Services
                </Link>
                <button
                  type="button"
                  onClick={() => setServicesOpen(!servicesOpen)}
                  aria-label="Toggle Services menu"
                  className={`pr-2.5 pl-0.5 py-1.5 rounded-r-full text-xs transition-all ${
                    pathname.startsWith("/services") 
                      ? "text-[#FF5500] bg-white/10" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesOpen ? "rotate-180 text-[#FF5500]" : ""}`} />
                </button>
              </div>

              {servicesOpen && (
                <div className="absolute top-full left-0 w-80 p-3 mt-2 bg-[#0E0E12]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl grid grid-cols-1 gap-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF5500]">
                    Custom Engineering Solutions
                  </div>
                  {SERVICES_DATA.slice(0, 6).map((service) => (
                    <Link
                      key={service.id}
                      href={`/services/${service.slug}`}
                      className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                      onClick={() => setServicesOpen(false)}
                    >
                      <div className="p-2 rounded-lg bg-white/5 text-[#FF5500] group-hover:bg-[#FF5500]/20 transition-colors">
                        <Code2 className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-[#FF5500]">{service.title}</div>
                        <div className="text-[11px] text-slate-400 line-clamp-1">{service.shortDesc}</div>
                      </div>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-white/10 text-center">
                    <Link 
                      href="/services" 
                      onClick={() => setServicesOpen(false)}
                      className="text-xs font-mono font-semibold text-[#FF5500] hover:underline flex items-center justify-center gap-1"
                    >
                      View All 13 Services <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Industries Link & Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIndustriesOpen(true)}
              onMouseLeave={() => setIndustriesOpen(false)}
            >
              <div className="flex items-center">
                <Link
                  href="/industries"
                  className={`pl-3.5 pr-1.5 py-1.5 rounded-l-full text-xs font-mono tracking-wider uppercase transition-all ${
                    pathname.startsWith("/industries") 
                      ? "text-[#FF5500] bg-white/10 font-bold" 
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  Industries
                </Link>
                <button
                  type="button"
                  onClick={() => setIndustriesOpen(!industriesOpen)}
                  aria-label="Toggle Industries menu"
                  className={`pr-2.5 pl-0.5 py-1.5 rounded-r-full text-xs transition-all ${
                    pathname.startsWith("/industries") 
                      ? "text-[#FF5500] bg-white/10" 
                      : "text-slate-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${industriesOpen ? "rotate-180 text-[#FF5500]" : ""}`} />
                </button>
              </div>

              {industriesOpen && (
                <div className="absolute top-full left-0 w-80 p-3 mt-2 bg-[#0E0E12]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl grid grid-cols-1 gap-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <div className="px-3 py-1.5 text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF5500]">
                    Industry Specific Solutions
                  </div>
                  {INDUSTRIES_DATA.slice(0, 6).map((ind) => (
                    <Link
                      key={ind.id}
                      href={`/industries/${ind.slug}`}
                      className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/5 transition-colors group"
                      onClick={() => setIndustriesOpen(false)}
                    >
                      <div className="p-2 rounded-lg bg-white/5 text-[#FF5500] group-hover:bg-[#FF5500]/20 transition-colors">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div className="text-xs font-bold text-white group-hover:text-[#FF5500]">{ind.title}</div>
                    </Link>
                  ))}
                  <div className="pt-2 border-t border-white/10 text-center">
                    <Link 
                      href="/industries" 
                      onClick={() => setIndustriesOpen(false)}
                      className="text-xs font-mono font-semibold text-[#FF5500] hover:underline flex items-center justify-center gap-1"
                    >
                      Explore All 10 Industry Hubs <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/portfolio"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                pathname === "/portfolio" 
                  ? "text-[#FF5500] bg-white/10 font-bold" 
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Works
            </Link>

            <Link
              href="/pricing"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                pathname === "/pricing" 
                  ? "text-[#FF5500] bg-white/10 font-bold" 
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Pricing
            </Link>

            <Link
              href="/blog"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                pathname.startsWith("/blog") 
                  ? "text-[#FF5500] bg-white/10 font-bold" 
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Blog
            </Link>

            <Link
              href="/careers"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                pathname === "/careers" 
                  ? "text-[#FF5500] bg-white/10 font-bold" 
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Careers
            </Link>

            <Link
              href="/contact"
              className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider uppercase transition-all ${
                pathname === "/contact" 
                  ? "text-[#FF5500] bg-white/10 font-bold" 
                  : "text-slate-300 hover:text-white hover:bg-white/5"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Right Action CTA Button (Contact Us redirecting to email) */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="mailto:contact@varunyatech.com?subject=Project Inquiry - Varunya Technologies"
              data-cursor="CONTACT"
              className="relative group overflow-hidden px-5 py-2.5 rounded-full bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#7C5CFF] text-white font-mono text-xs font-extrabold uppercase tracking-wider hover:opacity-95 transition-all shadow-[0_0_25px_rgba(255,107,0,0.4)] active:scale-95 flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5 text-white" />
              <span>Contact Us</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 text-slate-300 hover:text-white border border-white/10"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-2 p-6 bg-[#0E0E12]/95 border border-white/10 rounded-2xl shadow-2xl backdrop-blur-2xl space-y-4 animate-in slide-in-from-top-4 duration-200">
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-xl text-white hover:text-[#FF5500]">Home</Link>
              <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-xl text-white hover:text-[#FF5500]">About</Link>
              <Link href="/services" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-xl text-white hover:text-[#FF5500]">Services</Link>
              <Link href="/industries" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-xl text-white hover:text-[#FF5500]">Industries</Link>
              <Link href="/portfolio" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-xl text-white hover:text-[#FF5500]">Works</Link>
              <Link href="/pricing" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-xl text-white hover:text-[#FF5500]">Pricing</Link>
              <Link href="/blog" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-xl text-white hover:text-[#FF5500]">Blog</Link>
              <Link href="/careers" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-xl text-white hover:text-[#FF5500]">Careers</Link>
              <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="p-3 bg-white/5 rounded-xl text-white hover:text-[#FF5500]">Contact</Link>
            </div>
            <a
              href="mailto:contact@varunyatech.com?subject=Project Inquiry - Varunya Technologies"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#7C5CFF] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-[#FF6B00]/30"
            >
              <Mail className="w-4 h-4 text-white" />
              Contact Us
            </a>
          </div>
        )}
      </header>

      {/* Global 1-on-1 Consultation Modal */}
      <ConsultationModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </>
  );
}
