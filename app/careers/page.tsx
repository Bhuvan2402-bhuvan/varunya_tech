"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Briefcase, MapPin, CheckCircle2, ArrowRight, Send } from "lucide-react";
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
    if (mod === 0) return "text-[#519DD9]";
    if (mod === 1) return "text-[#53BAC1]";
    return "text-[#E23B52]";
  };

  const openPositions = careers.filter(c => c.status === "OPEN");

  return (
    <div className="py-16 lg:py-24 space-y-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 font-sans bg-white text-[#111215]">
      <div className="border-b border-[#E5E2DB] pb-12 max-w-4xl mx-auto text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] rounded-full text-[#4A4D54] text-[11px] font-mono uppercase tracking-[0.2em] shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-[#519DD9]" />
          Talent &amp; Engineering Practice
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-[#111215] tracking-tight font-display">
          Careers at <span className="font-editorial italic font-light text-[#519DD9]">VarunyaTech</span>
        </h1>
        <p className="text-[#4A4D54] text-base sm:text-lg font-light leading-relaxed max-w-2xl mx-auto">
          Collaborate with disciplined systems engineers, technical architects, and product designers shipping enterprise production software within structured milestone sprints.
        </p>
      </div>

      {/* Dynamic Perks Highlights grid */}
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#71757E] uppercase tracking-widest font-bold">01 // Cultural &amp; Practice Tenets</span>
          <div className="h-px bg-[#E5E2DB] flex-1" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {perks.map((perk, idx) => (
            <div key={perk.id || idx} className="p-8 text-center space-y-3 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs hover:border-[#111215] hover:shadow-md transition duration-300">
              <div className={`text-xl sm:text-2xl font-bold ${getPerkColorClass(idx)} font-display`}>{perk.title}</div>
              <div className="text-xs text-[#4A4D54] font-light leading-relaxed">{perk.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs text-[#71757E] uppercase tracking-widest font-bold">02 // Open Engineering Appointments</span>
          <div className="h-px bg-[#E5E2DB] flex-1" />
        </div>

        <div className="space-y-6">
          {openPositions.map((job) => (
            <div key={job.id} className="p-8 border border-[#E5E2DB] bg-[#FFFFFF] rounded-2xl shadow-xs space-y-5 hover:border-[#111215] hover:shadow-md transition">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#71757E] flex-wrap">
                    <span className="font-bold text-[#519DD9]">{job.department}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-[#519DD9]" /> {job.location}</span>
                    <span>•</span>
                    <span>{job.type}</span>
                    {job.salaryRange && (
                      <>
                        <span>•</span>
                        <span className="text-[#111215] font-semibold">{job.salaryRange}</span>
                      </>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold text-[#111215] font-display">{job.title}</h3>
                </div>
                <Button 
                  variant="primary" 
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

              <p className="text-xs sm:text-sm text-[#4A4D54] font-light leading-relaxed max-w-4xl">{job.summary}</p>

              {job.requirements && job.requirements.length > 0 && (
                <div className="space-y-2 pt-4 border-t border-[#E5E2DB]">
                  <h4 className="text-[10px] font-bold text-[#71757E] uppercase tracking-widest font-mono">Discipline Requirements:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {job.requirements.map((req: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-[#4A4D54] font-light">
                        <CheckCircle2 className="w-4 h-4 text-[#519DD9] shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {openPositions.length === 0 && (
            <div className="text-center py-20 text-[#71757E] text-sm font-mono border border-[#E5E2DB] bg-[#FFFFFF] rounded-2xl space-y-2">
              <Briefcase className="w-8 h-8 text-[#71757E] mx-auto" />
              <div>No open positions currently available. Please check back soon or submit your credentials to varunyatech@gmail.com.</div>
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
          <div className="p-8 text-center text-[#111215] space-y-3">
            <CheckCircle2 className="w-12 h-12 text-[#519DD9] mx-auto" />
            <h3 className="text-lg font-bold text-[#111215] font-display">Application Logged</h3>
            <p className="text-xs text-[#4A4D54]">Our engineering directors will review your credentials and reply within 48 hours.</p>
          </div>
        ) : (
          <form onSubmit={handleApply} className="space-y-4 font-sans text-xs">
            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#111215]">Full Name *</label>
              <input 
                required 
                type="text" 
                placeholder="Alex Rivera" 
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-sm text-[#111215] placeholder-[#8C8F98] focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all" 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#111215]">Email Address *</label>
                <input 
                  required 
                  type="email" 
                  placeholder="alex@example.com" 
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-sm text-[#111215] placeholder-[#8C8F98] focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all" 
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-[#111215]">Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-sm text-[#111215] placeholder-[#8C8F98] focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all" 
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#111215]">GitHub / Portfolio / LinkedIn URL *</label>
              <input 
                required 
                type="url" 
                placeholder="https://github.com/username" 
                value={applicantPortfolio}
                onChange={(e) => setApplicantPortfolio(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-sm text-[#111215] placeholder-[#8C8F98] focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all" 
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-semibold text-[#111215]">Brief Introduction / Experience Note</label>
              <textarea 
                rows={3}
                placeholder="Tell us about the systems you've engineered..." 
                value={applicantCover}
                onChange={(e) => setApplicantCover(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-xs text-[#111215] placeholder-[#8C8F98] focus:outline-none focus:border-[#111215] focus:bg-[#FFFFFF] transition-all resize-none" 
              />
            </div>

            <div className="pt-2">
              <Button type="submit" variant="primary" className="w-full" size="md" icon={<Send className="w-4 h-4" />}>
                Submit Application
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
