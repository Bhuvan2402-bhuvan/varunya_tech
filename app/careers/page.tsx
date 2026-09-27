"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Briefcase, MapPin, CheckCircle2, ArrowRight, Sparkles, Send } from "lucide-react";
import { 
  JobOpening, 
  PerkItem, 
  getStoredCareers, 
  getStoredPerks, 
  submitNewApplication 
} from "@/lib/data/careers-data";

export default function CareersPage() {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [careers, setCareers] = useState<JobOpening[]>([]);
  const [perks, setPerks] = useState<PerkItem[]>([]);

  // Application form fields
  const [applicantName, setApplicantName] = useState("");
  const [applicantEmail, setApplicantEmail] = useState("");
  const [applicantPhone, setApplicantPhone] = useState("");
  const [applicantPortfolio, setApplicantPortfolio] = useState("");
  const [applicantCover, setApplicantCover] = useState("");

  // Synchronize dynamic careers and perks data
  useEffect(() => {
    setCareers(getStoredCareers());
    setPerks(getStoredPerks());

    const handleStorageChange = () => {
      setCareers(getStoredCareers());
      setPerks(getStoredPerks());
    };

    window.addEventListener("velocity_careers_updated", handleStorageChange);
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("velocity_careers_updated", handleStorageChange);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedJob) return;

    submitNewApplication({
      jobId: selectedJob.id,
      jobTitle: selectedJob.title,
      name: applicantName,
      email: applicantEmail,
      phone: applicantPhone,
      portfolioUrl: applicantPortfolio,
      coverNote: applicantCover
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setSelectedJob(null);
      setApplicantName("");
      setApplicantEmail("");
      setApplicantPhone("");
      setApplicantPortfolio("");
      setApplicantCover("");
    }, 2500);
  };

  const getPerkColorClass = (index: number) => {
    const mod = index % 3;
    if (mod === 0) return "text-cyan-400";
    if (mod === 1) return "text-[#FF8A00]";
    return "text-[#7C5CFF]";
  };

  const openPositions = careers.filter(c => c.status === "OPEN");

  return (
    <div className="py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-gradient-to-r from-[#FF6B00]/15 to-[#7C5CFF]/15 border border-[#FF6B00]/30 rounded-full text-xs font-mono text-[#FFB347]">
          JOIN OUR AGILE ENGINEERING TEAM
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display">
          Careers at <span className="gradient-varunya-text">VARUNYA</span>
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Work with high-caliber engineers shipping production software within 30–40 days. Remote flexibility, competitive pay, and direct impact.
        </p>
      </div>

      {/* Dynamic Perks Highlights grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {perks.map((perk, idx) => (
          <GlassCard key={perk.id || idx} className="p-6 text-center space-y-2 border-slate-800 hover:border-purple-500/30 transition duration-300">
            <div className={`text-xl sm:text-2xl font-bold ${getPerkColorClass(idx)} font-display`}>{perk.title}</div>
            <div className="text-xs text-slate-400 leading-relaxed">{perk.description}</div>
          </GlassCard>
        ))}
      </div>

      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold text-white font-display">Open Engineering & Product Positions</h2>
          <p className="text-xs text-slate-400">Discover current openings across our core engineering, design, and operations teams.</p>
        </div>

        <div className="space-y-6">
          {openPositions.map((job) => (
            <GlassCard key={job.id} className="p-8 border-slate-800 space-y-5 hover:border-purple-500/40 transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 flex-wrap">
                    <span className="font-bold">{job.department}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    {job.salaryRange && (
                      <>
                        <span>•</span>
                        <span className="text-[#FFB347] font-semibold">{job.salaryRange}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-white font-display">{job.title}</h3>
                </div>
                <Button 
                  variant="gradient" 
                  size="sm" 
                  onClick={() => {
                    setSelectedJob(job);
                    setSubmitted(false);
                  }} 
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Apply Now
                </Button>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-4xl">{job.summary}</p>

              {job.requirements && job.requirements.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-slate-800/80">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider font-mono">Key Requirements:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {job.requirements.map((req: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00] shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </GlassCard>
          ))}

          {openPositions.length === 0 && (
            <div className="text-center py-20 text-slate-500 text-sm font-mono border border-dashed border-slate-800 rounded-3xl space-y-2">
              <Briefcase className="w-8 h-8 text-slate-600 mx-auto" />
              <div>No open positions currently available. Please check back soon or send your portfolio to info@varunya.com.</div>
            </div>
          )}
        </div>
      </div>

      {/* Modal Application Form */}
      <Modal 
        isOpen={!!selectedJob} 
        onClose={() => setSelectedJob(null)} 
        title={selectedJob ? `Apply for ${selectedJob.title}` : "Job Application"}
      >
        {submitted ? (
          <div className="p-8 text-center text-emerald-300 space-y-3">
            <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-lg font-bold text-white font-display">Application Received!</h3>
            <p className="text-xs text-slate-300">Our engineering lead will review your profile and reach out within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-4 font-sans text-xs">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">Full Name *</label>
              <input 
                required 
                type="text" 
                placeholder="Alex Rivera" 
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">Email Address *</label>
                <input 
                  required 
                  type="email" 
                  placeholder="alex@example.com" 
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" 
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-300">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">GitHub / Portfolio / LinkedIn URL *</label>
              <input 
                required 
                type="url" 
                placeholder="https://github.com/username" 
                value={applicantPortfolio}
                onChange={(e) => setApplicantPortfolio(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" 
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-slate-300">Brief Introduction / Experience Note</label>
              <textarea 
                rows={3}
                placeholder="Tell us about the projects you've built and why you're a great fit..." 
                value={applicantCover}
                onChange={(e) => setApplicantCover(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 resize-none" 
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="gradient" className="w-full" size="md" icon={<Send className="w-4 h-4" />}>
                Submit Application
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
