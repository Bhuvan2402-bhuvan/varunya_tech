"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Github, Twitter, Linkedin, Mail, Clock } from "lucide-react";
import { ConsultationModal } from "@/components/consultation/ConsultationModal";

export function Footer() {
  const [consultModalOpen, setConsultModalOpen] = useState(false);
  const [times, setTimes] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      const getFormatted = (timeZone: string) => {
        return new Intl.DateTimeFormat("en-US", {
          timeZone,
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(now);
      };

      setTimes({
        london: getFormatted("Europe/London"),
        ny: getFormatted("America/New_York"),
        sf: getFormatted("America/Los_Angeles"),
        tokyo: getFormatted("Asia/Tokyo"),
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <footer className="relative bg-[#191C21] border-t border-[#2A2E37] text-[#A6AFBD] text-xs font-mono overflow-hidden pt-20 pb-12 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Global Operations Time Index */}
          <div className="mb-16 p-4 bg-[#202329] border border-[#2A2E37] shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#519DD9]" />
              <span className="text-[#727C8D]">LONDON</span>
              <span className="text-[#EDEDED] font-bold">{times.london || "12:00 PM"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#519DD9]" />
              <span className="text-[#727C8D]">NEW YORK</span>
              <span className="text-[#EDEDED] font-bold">{times.ny || "07:00 AM"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#519DD9]" />
              <span className="text-[#727C8D]">SAN FRANCISCO</span>
              <span className="text-[#EDEDED] font-bold">{times.sf || "04:00 AM"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#519DD9]" />
              <span className="text-[#727C8D]">TOKYO</span>
              <span className="text-[#EDEDED] font-bold">{times.tokyo || "08:00 PM"}</span>
            </div>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Col 1: Identity & Description */}
            <div className="lg:col-span-2 space-y-5">
              <Link href="/" className="inline-flex items-center gap-3">
                <img 
                  src="/images/varunya-emblem.png" 
                  alt="Varunya Technologies" 
                  className="w-8 h-8 object-contain filter drop-shadow-[0_2px_8px_rgba(81,157,217,0.35)]"
                />
                <div className="flex flex-col">
                  <span className="font-sans font-black text-lg tracking-[0.15em] text-[#EDEDED] uppercase">
                    VARUNYA<span className="text-[#519DD9] font-normal">TECH</span>
                  </span>
                  <span className="text-[8px] font-mono tracking-[0.2em] text-[#519DD9] uppercase -mt-0.5 font-bold">
                    IDEAS • TECHNOLOGY • IMPACT
                  </span>
                </div>
              </Link>

              <p className="font-sans text-xs text-[#A6AFBD] leading-relaxed max-w-sm">
                We design and engineer bespoke software platforms, enterprise portals, and modern web architectures. Delivering production-grade systems within disciplined 30–40 day sprint cycles with continuous post-launch support.
              </p>

              <div className="flex items-center gap-3 pt-2">
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:varunyatech@gmail.com", label: "Email" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="p-2.5 bg-[#202329] border border-[#2A2E37] text-[#A6AFBD] hover:text-[#EDEDED] hover:border-[#519DD9] transition-colors shadow-sm"
                  >
                    <item.icon className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Capabilities */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#EDEDED] font-bold">Capabilities</h4>
              <ul className="space-y-2 text-[#A6AFBD]">
                <li><Link href="/services/custom-software" className="hover:text-[#519DD9] transition-colors">Custom Software</Link></li>
                <li><Link href="/services/erp-development" className="hover:text-[#519DD9] transition-colors">ERP Platforms</Link></li>
                <li><Link href="/services/web-development" className="hover:text-[#519DD9] transition-colors">Web Applications</Link></li>
                <li><Link href="/services/ai-solutions" className="hover:text-[#519DD9] transition-colors">AI &amp; Automation</Link></li>
                <li><Link href="/services/cloud-devops" className="hover:text-[#519DD9] transition-colors">Cloud &amp; DevOps</Link></li>
              </ul>
            </div>

            {/* Col 3: Studio */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#EDEDED] font-bold">Studio</h4>
              <ul className="space-y-2 text-[#A6AFBD]">
                <li><Link href="/about" className="hover:text-[#519DD9] transition-colors">About Studio</Link></li>
                <li><Link href="/portfolio" className="hover:text-[#519DD9] transition-colors">Selected Work</Link></li>
                <li><Link href="/pricing" className="hover:text-[#519DD9] transition-colors">Engagement Models</Link></li>
                <li><Link href="/careers" className="hover:text-[#519DD9] transition-colors">Careers</Link></li>
                <li><Link href="/industries" className="hover:text-[#519DD9] transition-colors">Industry Sectors</Link></li>
              </ul>
            </div>

            {/* Col 4: Inquiry */}
            <div className="space-y-4">
              <h4 className="text-[10px] uppercase tracking-[0.2em] text-[#EDEDED] font-bold">Direct Inquiry</h4>
              <p className="font-sans text-xs text-[#A6AFBD]">
                Inquire directly regarding your engineering roadmap: <br />
                <strong className="text-[#EDEDED] font-mono">varunyatech@gmail.com</strong>
              </p>

              <a
                href="mailto:varunyatech@gmail.com?subject=Project%20Inquiry%20-%20Varunya%20Technologies"
                className="w-full py-3 bg-[#202329] border border-[#2A2E37] text-[#EDEDED] hover:border-[#519DD9] hover:bg-[#252830] text-center flex items-center justify-center gap-2 transition-colors uppercase tracking-wider text-[11px] font-semibold shadow-sm"
              >
                <Mail className="w-3.5 h-3.5 text-[#519DD9]" />
                <span>varunyatech@gmail.com</span>
              </a>

              <div className="pt-1">
                <Link href="/contact" className="text-[#A6AFBD] hover:text-[#EDEDED] flex items-center gap-1 transition-colors">
                  Contact Office <ArrowUpRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-[#2A2E37] flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#727C8D]">
            <div>
              © {new Date().getFullYear()} Varunya Technologies. All rights reserved.
            </div>
            <div className="flex items-center gap-4 text-[10px] tracking-wider uppercase">
              <span className="text-[#EDEDED] font-medium">30–40 DAY ARCHITECTURAL DELIVERY</span>
              <span className="text-[#3B414E]">•</span>
              <span>CONTINUOUS CLIENT SUPPORT</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global 1-on-1 Consultation Modal */}
      <ConsultationModal isOpen={consultModalOpen} onClose={() => setConsultModalOpen(false)} />
    </>
  );
}
