"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Zap, ShieldCheck, CheckCircle2, ArrowUpRight, Github, Twitter, Linkedin, Mail, Clock, Globe } from "lucide-react";
import { ConsultationModal } from "@/components/consultation/ConsultationModal";

export function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState("");
  const [aiModalOpen, setAiModalOpen] = useState(false);
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

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setSubscribed(true);
  };

  return (
    <>
      <footer className="relative bg-[#070708] border-t border-white/10 text-slate-300 text-sm overflow-hidden pt-20 pb-12">
        {/* Giant Ambient Glow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[350px] bg-gradient-to-t from-[#FF6B00]/15 via-[#7C5CFF]/10 to-transparent blur-[140px] pointer-events-none z-0" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Varunya Technologies Signature Callout Statement */}
          <div className="mb-20 pb-16 border-b border-white/10 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-xs text-[#FF6B00] tracking-widest uppercase">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                NEED CUSTOM SOFTWARE?
              </div>
              <h2 className="font-display text-4xl sm:text-6xl font-black text-white tracking-tight uppercase leading-none">
                BUILDING SECURE & SCALABLE <br />
                <span className="gradient-varunya-text">DIGITAL SOLUTIONS TOGETHER.</span>
              </h2>
              <p className="text-slate-400 text-xs sm:text-sm font-mono max-w-2xl leading-relaxed">
                "We believe in building long-term relationships with our clients. Our support continues after deployment to ensure every application remains secure, reliable, and up to date."
              </p>
            </div>

            <button
              onClick={() => setAiModalOpen(true)}
              data-cursor="START"
              className="group relative overflow-hidden px-8 py-5 rounded-full bg-gradient-to-r from-[#FF6B00] via-[#FF8A00] to-[#7C5CFF] text-white font-mono text-sm font-extrabold uppercase tracking-widest hover:opacity-90 transition-all shadow-[0_0_40px_rgba(255,107,0,0.5)] active:scale-95 flex items-center gap-3 shrink-0"
            >
              <span>START YOUR PROJECT</span>
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
          </div>

          {/* Live World Clocks Bar */}
          <div className="mb-16 p-4 rounded-2xl bg-[#0E0E12]/80 border border-white/10 flex flex-wrap items-center justify-around gap-6 font-mono text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#FF6B00]" />
              <span className="font-bold text-white uppercase">LONDON</span>
              <span className="text-[#FF6B00]">{times.london || "12:30 PM"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#FF8A00]" />
              <span className="font-bold text-white uppercase">NEW YORK</span>
              <span className="text-[#FF8A00]">{times.ny || "07:30 AM"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#7C5CFF]" />
              <span className="font-bold text-white uppercase">SAN FRANCISCO</span>
              <span className="text-[#7C5CFF]">{times.sf || "04:30 AM"}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-[#FFB347]" />
              <span className="font-bold text-white uppercase">TOKYO</span>
              <span className="text-[#FFB347]">{times.tokyo || "08:30 PM"}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-2 space-y-6">
              <Link href="/" className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF6B00] via-[#FF8A00] to-[#7C5CFF] p-[1px]">
                  <div className="w-full h-full bg-[#070708] rounded-[11px] flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#FF6B00]" />
                  </div>
                </div>
                <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-white uppercase">
                  VARUNYA <span className="text-[#FF6B00]">TECHNOLOGIES</span>
                </span>
              </Link>

              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                We specialize in building custom web applications that solve real-world problems. From requirement gathering and UI/UX design to development, deployment, and post-launch support, we work closely with clients to deliver reliable, secure, and scalable digital solutions.
              </p>

              <div className="flex items-center gap-3">
                {[
                  { icon: Github, href: "https://github.com", label: "GitHub" },
                  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                  { icon: Mail, href: "mailto:contact@varunyatech.com", label: "Email" },
                ].map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor={item.label}
                    className="p-2.5 rounded-full bg-white/5 border border-white/10 text-slate-300 hover:text-[#FF6B00] hover:border-[#FF6B00]/50 hover:bg-white/10 transition-all"
                  >
                    <item.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Col 2: Services */}
            <div className="space-y-4 font-mono text-xs">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#FF6B00]">Services</h4>
              <ul className="space-y-2.5">
                <li><Link href="/services/custom-software" className="hover:text-[#FF6B00] transition-colors">Custom Web Applications</Link></li>
                <li><Link href="/services/erp-development" className="hover:text-[#FF6B00] transition-colors">ERP Platforms & Portals</Link></li>
                <li><Link href="/services/web-development" className="hover:text-[#FF6B00] transition-colors">Educational Platforms</Link></li>
                <li><Link href="/services/ui-ux-design" className="hover:text-[#FF6B00] transition-colors">UI/UX Design & Systems</Link></li>
                <li><Link href="/services/devops" className="hover:text-[#FF6B00] transition-colors">Deployment & Hosting</Link></li>
                <li><Link href="/services/maintenance-support" className="hover:text-[#FF6B00] transition-colors">Post-Launch Support & Maintenance</Link></li>
              </ul>
            </div>

            {/* Col 3: Navigation */}
            <div className="space-y-4 font-mono text-xs">
              <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#7C5CFF]">Company</h4>
              <ul className="space-y-2.5">
                <li><a href="#about" className="hover:text-[#7C5CFF] transition-colors">About Varunya Technologies</a></li>
                <li><a href="#works" className="hover:text-[#7C5CFF] transition-colors">Completed Projects</a></li>
                <li><a href="#techstack" className="hover:text-[#7C5CFF] transition-colors">Technology Stack</a></li>
                <li><a href="#process" className="hover:text-[#7C5CFF] transition-colors">Development Process (30–40 Days)</a></li>
                <li><a href="#security" className="hover:text-[#7C5CFF] transition-colors">Security & Quality</a></li>
                <li><a href="#support" className="hover:text-[#7C5CFF] transition-colors">Post-Launch Support</a></li>
              </ul>
            </div>

            {/* Col 4: Newsletter */}
            <div className="space-y-4">
              <h4 className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#FF8A00]">Get in Touch</h4>
              <p className="text-xs text-slate-400">
                Ready to build your custom software? Let's discuss your project scope.
              </p>

              <a
                href="mailto:contact@varunyatech.com?subject=Project Inquiry - Varunya Technologies"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF6B00] to-[#7C5CFF] text-white font-mono text-xs font-bold uppercase tracking-wider hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contact Us</span>
              </a>

              <div className="pt-2 space-y-1.5 text-xs font-mono">
                <div><Link href="/contact" className="text-slate-400 hover:text-[#7C5CFF] flex items-center gap-1">Contact Team <ArrowUpRight className="w-3 h-3" /></Link></div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-slate-400">
            <div>
              © {new Date().getFullYear()} Varunya Technologies. All rights reserved.
            </div>
            <div className="flex items-center gap-2 text-[#FF6B00]">
              <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" />
              <span>30–40 DAY CUSTOM DELIVERY MODEL • CONTINUOUS CLIENT SUPPORT</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Global 1-on-1 Consultation Modal */}
      <ConsultationModal isOpen={aiModalOpen} onClose={() => setAiModalOpen(false)} />
    </>
  );
}

