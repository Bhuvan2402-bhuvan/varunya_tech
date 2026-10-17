"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { 
  JobOpening, 
  PerkItem, 
  JobApplicant,
  getStoredCareers, 
  saveCareers, 
  getStoredPerks, 
  savePerks, 
  getStoredApplicants, 
  saveApplicants 
} from "@/lib/data/careers-data";
import { 
  Briefcase, 
  Plus, 
  Trash2, 
  Edit3, 
  Gift, 
  MapPin, 
  Users2, 
  Search, 
  CheckCircle2, 
  Clock, 
  ExternalLink, 
  Mail, 
  Phone, 
  FileText,
  Filter,
  ArrowUpRight,
  UserCheck,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function AdminCareersPage() {
  const [activeTab, setActiveTab] = useState<"jobs" | "perks" | "applicants">("jobs");
  
  // Jobs State
  const [careers, setCareers] = useState<JobOpening[]>([]);
  const [selectedDept, setSelectedDept] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobModalOpen, setJobModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);

  // Job Form States
  const [title, setTitle] = useState("");
  const [department, setDepartment] = useState("Engineering");
  const [location, setLocation] = useState("Remote / Hybrid");
  const [type, setType] = useState("Full-time");
  const [experience, setExperience] = useState("2+ Years");
  const [salaryRange, setSalaryRange] = useState("$80,000 - $110,000");
  const [summary, setSummary] = useState("");
  const [requirements, setRequirements] = useState("");
  const [responsibilities, setResponsibilities] = useState("");
  const [status, setStatus] = useState<"OPEN" | "PAUSED" | "CLOSED">("OPEN");

  // Perks State
  const [perks, setPerks] = useState<PerkItem[]>([]);
  const [perkModalOpen, setPerkModalOpen] = useState(false);
  const [editingPerk, setEditingPerk] = useState<PerkItem | null>(null);
  const [perkTitle, setPerkTitle] = useState("");
  const [perkDesc, setPerkDesc] = useState("");

  // Applicants State
  const [applicants, setApplicants] = useState<JobApplicant[]>([]);
  const [applicantFilter, setApplicantFilter] = useState<string>("ALL");
  const [selectedApplicant, setSelectedApplicant] = useState<JobApplicant | null>(null);

  useEffect(() => {
    setCareers(getStoredCareers());
    setPerks(getStoredPerks());
    setApplicants(getStoredApplicants());
  }, []);

  // Job CRUD
  const handleOpenAddJob = () => {
    setEditingJob(null);
    setTitle("");
    setDepartment("Engineering");
    setLocation("Remote / Hybrid");
    setType("Full-time");
    setExperience("2+ Years");
    setSalaryRange("$80,000 - $110,000");
    setSummary("");
    setRequirements("Next.js, React.js, TypeScript, Tailwind CSS");
    setResponsibilities("Architect scalable web applications, conduct code reviews, collaborate with UI designers");
    setStatus("OPEN");
    setJobModalOpen(true);
  };

  const handleOpenEditJob = (job: JobOpening) => {
    setEditingJob(job);
    setTitle(job.title);
    setDepartment(job.department);
    setLocation(job.location);
    setType(job.type);
    setExperience(job.experience || "2+ Years");
    setSalaryRange(job.salaryRange || "$80,000 - $110,000");
    setSummary(job.summary);
    setRequirements(job.requirements.join(", "));
    setResponsibilities(job.responsibilities ? job.responsibilities.join(", ") : "");
    setStatus(job.status);
    setJobModalOpen(true);
  };

  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    const reqList = requirements.split(",").map(r => r.trim()).filter(Boolean);
    const respList = responsibilities.split(",").map(r => r.trim()).filter(Boolean);

    let updated: JobOpening[] = [];
    if (editingJob) {
      updated = careers.map(c => {
        if (c.id === editingJob.id) {
          return {
            ...c,
            title,
            department,
            location,
            type,
            experience,
            salaryRange,
            summary,
            requirements: reqList,
            responsibilities: respList,
            status
          };
        }
        return c;
      });
    } else {
      const newJob: JobOpening = {
        id: `J-${Date.now()}`,
        title,
        department,
        location,
        type,
        experience,
        salaryRange,
        summary,
        requirements: reqList,
        responsibilities: respList,
        status,
        postedAt: new Date().toISOString().split("T")[0]
      };
      updated = [newJob, ...careers];
    }

    setCareers(updated);
    saveCareers(updated);
    setJobModalOpen(false);
  };

  const handleDeleteJob = (id: string) => {
    const updated = careers.filter(c => c.id !== id);
    setCareers(updated);
    saveCareers(updated);
  };

  const handleToggleJobStatus = (id: string) => {
    const updated = careers.map(c => {
      if (c.id === id) {
        const nextStatus: "OPEN" | "PAUSED" | "CLOSED" = 
          c.status === "OPEN" ? "PAUSED" : c.status === "PAUSED" ? "CLOSED" : "OPEN";
        return { ...c, status: nextStatus };
      }
      return c;
    });
    setCareers(updated);
    saveCareers(updated);
  };

  // Perks CRUD
  const handleOpenEditPerk = (perk: PerkItem) => {
    setEditingPerk(perk);
    setPerkTitle(perk.title);
    setPerkDesc(perk.description);
    setPerkModalOpen(true);
  };

  const handleSavePerk = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: PerkItem[] = [];
    if (editingPerk) {
      updated = perks.map(p => p.id === editingPerk.id ? { ...p, title: perkTitle, description: perkDesc } : p);
    } else {
      updated = [...perks, { id: `p-${Date.now()}`, title: perkTitle, description: perkDesc }];
    }
    setPerks(updated);
    savePerks(updated);
    setPerkModalOpen(false);
  };

  // Applicant Status Update
  const handleUpdateApplicantStatus = (applicantId: string, newStatus: JobApplicant["status"]) => {
    const updated = applicants.map(a => a.id === applicantId ? { ...a, status: newStatus } : a);
    setApplicants(updated);
    saveApplicants(updated);
    if (selectedApplicant?.id === applicantId) {
      setSelectedApplicant({ ...selectedApplicant, status: newStatus });
    }
  };

  const filteredCareers = careers.filter(c => {
    const matchDept = selectedDept === "ALL" || c.department.toLowerCase() === selectedDept.toLowerCase();
    const matchQuery = c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       c.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchDept && matchQuery;
  });

  const filteredApplicants = applicants.filter(a => {
    if (applicantFilter === "ALL") return true;
    return a.status === applicantFilter;
  });

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FFFFFF] p-6 rounded-3xl border border-[#E5E2DB] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#519DD9]/10 border border-[#519DD9]/25 text-[#1D6FA5] font-mono text-[11px] font-bold">
            <Briefcase className="w-3.5 h-3.5" /> RECRUITMENT &amp; TALENT MANAGEMENT
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111215] font-display tracking-tight">
            Careers &amp; Job Postings Hub
          </h2>
          <p className="text-xs text-[#71757E] max-w-2xl">
            Publish and manage open engineering &amp; creative roles, customize applicant perks, and review incoming candidate submissions.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link href="/careers" target="_blank">
            <button className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FFFFFF] border border-[#E5E2DB] text-[#4A4D54] hover:bg-[#F5F3EF] transition">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Careers Page</span>
            </button>
          </Link>
          <button 
            onClick={handleOpenAddJob}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-[#111215] text-[#FAFAF8] hover:bg-[#23252B] shadow-sm transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create Career Listing</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-[#E5E2DB] pb-3 overflow-x-auto text-xs font-semibold scrollbar-none">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${
            activeTab === "jobs"
              ? "bg-[#111215] text-[#FAFAF8] shadow-sm font-bold"
              : "bg-[#FFFFFF] border border-[#E5E2DB] text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF]"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Active Job Listings ({careers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("perks")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${
            activeTab === "perks"
              ? "bg-[#111215] text-[#FAFAF8] shadow-sm font-bold"
              : "bg-[#FFFFFF] border border-[#E5E2DB] text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF]"
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Benefits &amp; Perks Highlights ({perks.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("applicants")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${
            activeTab === "applicants"
              ? "bg-[#111215] text-[#FAFAF8] shadow-sm font-bold"
              : "bg-[#FFFFFF] border border-[#E5E2DB] text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF]"
          }`}
        >
          <Users2 className="w-3.5 h-3.5" />
          <span>Applicant Inbox ({applicants.length})</span>
        </button>
      </div>

      {/* 1. JOB OPENINGS TAB */}
      {activeTab === "jobs" && (
        <div className="space-y-6">
          {/* Filters Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search job titles, skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-xs text-[#111215] placeholder:text-[#9E9E9E] focus:outline-none focus:border-[#519DD9] focus:ring-1 focus:ring-[#519DD9]"
              />
              <Search className="w-4 h-4 text-[#9E9E9E] absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              {["ALL", "Engineering", "Creative Studio", "Operations", "Growth"].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                    selectedDept === dept
                      ? "bg-[#519DD9]/15 border border-[#519DD9]/30 text-[#1D6FA5] font-bold"
                      : "bg-[#FFFFFF] border border-[#E5E2DB] text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF]"
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          {/* Job Listings Grid */}
          <div className="space-y-4">
            {filteredCareers.map((job) => (
              <div key={job.id} className="bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs p-6 space-y-4 hover:border-[#D0C9BE] transition">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-[#111215] font-display flex items-center gap-2">
                        {job.title}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        job.status === "OPEN" 
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : job.status === "PAUSED"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-rose-50 text-rose-700 border border-rose-200"
                      }`}>
                        ● {job.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-[#1D6FA5] pt-1 flex-wrap">
                      <span>{job.department}</span>
                      <span className="text-[#9E9E9E]">•</span>
                      <span className="flex items-center gap-1 text-[#565961]"><MapPin className="w-3 h-3 text-[#1D6FA5]" /> {job.location}</span>
                      <span className="text-[#9E9E9E]">•</span>
                      <span className="text-[#565961]">{job.type}</span>
                      {job.salaryRange && (
                        <>
                          <span className="text-[#9E9E9E]">•</span>
                          <span className="text-[#B45309] font-bold">{job.salaryRange}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleJobStatus(job.id)}
                      className="px-2.5 py-1.5 bg-[#F5F3EF] hover:bg-[#E5E2DB] border border-[#E5E2DB] text-[#111215] rounded-lg text-xs font-semibold transition"
                    >
                      Status: {job.status}
                    </button>
                    <button
                      onClick={() => handleOpenEditJob(job)}
                      className="px-2.5 py-1.5 bg-[#F5F3EF] hover:bg-[#E5E2DB] border border-[#E5E2DB] text-[#111215] rounded-lg text-xs font-semibold flex items-center gap-1 transition"
                    >
                      <Edit3 className="w-3 h-3 text-[#1D6FA5]" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-1.5 bg-rose-50 hover:bg-rose-100 border border-rose-200 text-[#DB0038] rounded-lg text-xs transition"
                      title="Delete listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-[#565961] leading-relaxed max-w-4xl">{job.summary}</p>

                {job.requirements && job.requirements.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-[#E5E2DB]">
                    <div className="text-[10px] font-mono text-[#71757E] uppercase font-bold">Key Requirements:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.requirements.map((req, rIdx) => (
                        <span key={rIdx} className="px-2.5 py-1 rounded-md bg-[#F5F3EF] border border-[#E5E2DB] text-[11px] text-[#4A4D54] font-mono">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {filteredCareers.length === 0 && (
              <div className="text-center py-16 text-[#71757E] text-xs font-mono border border-dashed border-[#E5E2DB] rounded-3xl space-y-2 bg-[#FFFFFF]">
                <Briefcase className="w-8 h-8 text-[#9E9E9E] mx-auto" />
                <div>No job listings found matching your search.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. BENEFITS & PERKS TAB */}
      {activeTab === "perks" && (
        <div className="space-y-6">
          <div className="p-6 space-y-4 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2DB] pb-4">
              <div>
                <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-display">
                  <Gift className="w-4 h-4 text-[#1D6FA5]" /> Careers Perks &amp; Benefit Cards
                </h3>
                <p className="text-xs text-[#71757E]">Manage the 3 highlight perk cards displayed prominently at the top of the careers page.</p>
              </div>
              <button 
                onClick={() => {
                  setEditingPerk(null);
                  setPerkTitle("New Perk Title");
                  setPerkDesc("Perk description...");
                  setPerkModalOpen(true);
                }}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#FFFFFF] border border-[#E5E2DB] text-[#111215] hover:bg-[#F5F3EF] transition"
              >
                <Plus className="w-4 h-4 text-[#1D6FA5]" />
                <span>Add Perk Card</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {perks.map((perk, idx) => (
                <div key={perk.id || idx} className="p-5 bg-[#F5F3EF] border border-[#E5E2DB] rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-bold text-[#111215] font-display">{perk.title}</div>
                    <div className="text-xs text-[#565961] leading-relaxed">{perk.description}</div>
                  </div>
                  <div className="pt-3 border-t border-[#E5E2DB] flex items-center justify-between">
                    <button
                      onClick={() => handleOpenEditPerk(perk)}
                      className="px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#E5E2DB] border border-[#E5E2DB] text-[#111215] rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Edit3 className="w-3 h-3 text-[#1D6FA5]" /> Edit Card
                    </button>
                    <button
                      onClick={() => {
                        const updated = perks.filter(p => p.id !== perk.id);
                        setPerks(updated);
                        savePerks(updated);
                      }}
                      className="p-1.5 text-[#DB0038] hover:bg-rose-50 border border-transparent hover:border-rose-200 rounded-lg text-xs transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 3. APPLICANTS INBOX TAB */}
      {activeTab === "applicants" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-[#71757E]">
              Total <strong className="text-[#111215] font-bold">{applicants.length}</strong> candidates submitted applications.
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-mono text-[#71757E]">Filter:</span>
              {["ALL", "NEW", "REVIEWING", "SHORTLISTED", "INTERVIEWED", "HIRED", "REJECTED"].map((st) => (
                <button
                  key={st}
                  onClick={() => setApplicantFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition ${
                    applicantFilter === st
                      ? "bg-[#519DD9]/15 border border-[#519DD9]/30 text-[#1D6FA5] font-bold"
                      : "bg-[#FFFFFF] border border-[#E5E2DB] text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF]"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-3">
              {filteredApplicants.map((app) => (
                <div 
                  key={app.id} 
                  className={`p-4 bg-[#FFFFFF] border rounded-xl cursor-pointer transition flex items-center justify-between gap-4 shadow-xs ${
                    selectedApplicant?.id === app.id ? "border-[#519DD9] ring-2 ring-[#519DD9]/20" : "border-[#E5E2DB] hover:border-[#D0C9BE]"
                  }`}
                  onClick={() => setSelectedApplicant(app)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#111215] text-sm">{app.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                        app.status === "NEW" ? "bg-blue-50 text-[#1D6FA5] border border-blue-200" :
                        app.status === "SHORTLISTED" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                        app.status === "INTERVIEWED" ? "bg-purple-50 text-purple-700 border border-purple-200" :
                        app.status === "HIRED" ? "bg-green-100 text-green-800 border border-green-300" :
                        "bg-[#F5F3EF] text-[#71757E] border border-[#E5E2DB]"
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="text-xs text-[#1D6FA5] font-mono">{app.jobTitle}</div>
                    <div className="text-[10px] text-[#71757E] font-mono">
                      {app.email} • Submitted {new Date(app.submittedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-[#1D6FA5] hover:underline shrink-0">
                    View Dossier →
                  </span>
                </div>
              ))}

              {filteredApplicants.length === 0 && (
                <div className="text-center py-16 text-[#71757E] text-xs font-mono border border-dashed border-[#E5E2DB] rounded-3xl bg-[#FFFFFF]">
                  No applicant dossiers match the selected filter.
                </div>
              )}
            </div>

            {/* Candidate Dossier Detail Drawer */}
            <div className="lg:col-span-1">
              {selectedApplicant ? (
                <div className="p-6 bg-[#FFFFFF] border border-[#E5E2DB] rounded-2xl shadow-xs space-y-5 sticky top-6">
                  <div className="border-b border-[#E5E2DB] pb-3 space-y-1">
                    <div className="text-[10px] font-mono text-[#1D6FA5] uppercase font-bold">Candidate Details</div>
                    <h3 className="text-xl font-bold text-[#111215] font-display">{selectedApplicant.name}</h3>
                    <p className="text-xs text-[#71757E] font-mono">Role: {selectedApplicant.jobTitle}</p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-2 text-[#4A4D54]">
                      <Mail className="w-4 h-4 text-[#1D6FA5] shrink-0" />
                      <a href={`mailto:${selectedApplicant.email}`} className="hover:underline truncate">{selectedApplicant.email}</a>
                    </div>
                    {selectedApplicant.phone && (
                      <div className="flex items-center gap-2 text-[#4A4D54]">
                        <Phone className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{selectedApplicant.phone}</span>
                      </div>
                    )}
                    {selectedApplicant.portfolioUrl && (
                      <div className="flex items-center gap-2 text-[#4A4D54]">
                        <ExternalLink className="w-4 h-4 text-[#B45309] shrink-0" />
                        <a href={selectedApplicant.portfolioUrl} target="_blank" rel="noreferrer" className="text-[#1D6FA5] hover:underline truncate">
                          Portfolio / GitHub Profile
                        </a>
                      </div>
                    )}
                  </div>

                  {selectedApplicant.coverNote && (
                    <div className="space-y-1 bg-[#F5F3EF] p-3 rounded-xl border border-[#E5E2DB]">
                      <div className="text-[10px] font-mono text-[#71757E] uppercase">Cover Summary:</div>
                      <p className="text-xs text-[#4A4D54] leading-relaxed italic">{selectedApplicant.coverNote}</p>
                    </div>
                  )}

                  {/* Status Decision Changer */}
                  <div className="space-y-2 pt-2 border-t border-[#E5E2DB]">
                    <label className="text-[10px] font-mono text-[#71757E] uppercase font-bold">Update Candidate Status</label>
                    <select
                      value={selectedApplicant.status}
                      onChange={(e) => handleUpdateApplicantStatus(selectedApplicant.id, e.target.value as any)}
                      className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-xs font-mono text-[#111215] focus:outline-none focus:border-[#519DD9]"
                    >
                      <option value="NEW">NEW</option>
                      <option value="REVIEWING">REVIEWING</option>
                      <option value="SHORTLISTED">SHORTLISTED</option>
                      <option value="INTERVIEWED">INTERVIEWED</option>
                      <option value="HIRED">HIRED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </div>
                </div>
              ) : (
                <div className="p-8 border border-dashed border-[#E5E2DB] rounded-3xl text-center text-xs font-mono text-[#71757E] space-y-2 bg-[#FFFFFF]">
                  <UserCheck className="w-8 h-8 text-[#9E9E9E] mx-auto" />
                  <div>Select any applicant on the left to inspect candidate dossier and update recruitment status.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Job Modal */}
      <Modal
        isOpen={jobModalOpen}
        onClose={() => setJobModalOpen(false)}
        title={editingJob ? "Edit Job Opening" : "Create Career Listing"}
      >
        <form onSubmit={handleSaveJob} className="space-y-4 font-sans text-xs max-h-[80vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-[#111215]">Job Title</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Full-Stack Architect"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-[#111215]">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] focus:border-[#519DD9] focus:outline-none"
              >
                <option value="Engineering">Engineering</option>
                <option value="Creative Studio">Creative Studio</option>
                <option value="Operations">Operations</option>
                <option value="Growth">Growth</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block font-semibold text-[#111215]">Location</label>
              <input
                required
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Remote / Hybrid"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-[#111215]">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] focus:border-[#519DD9] focus:outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-[#111215]">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none"
              >
                <option value="OPEN">OPEN</option>
                <option value="PAUSED">PAUSED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-[#111215]">Experience Level</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="2+ Years"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-[#111215]">Salary / Stipend Range</label>
              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                placeholder="$80,000 - $110,000"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#111215]">Job Summary</label>
            <textarea
              required
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Detailed description of the role and key deliverables..."
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#111215]">Key Requirements (Comma-separated)</label>
            <input
              required
              type="text"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Next.js, TypeScript, PostgreSQL, REST APIs"
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-[#111215]">Key Responsibilities (Comma-separated)</label>
            <input
              type="text"
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="Lead rapid sprints, conduct peer code reviews, build reusable modules"
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none"
            />
          </div>

          <div className="pt-3 flex gap-2">
            <button 
              type="button" 
              className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#FFFFFF] border border-[#E5E2DB] text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF] transition"
              onClick={() => setJobModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#111215] text-[#FAFAF8] hover:bg-[#23252B] shadow-sm transition"
            >
              Save Job Listing
            </button>
          </div>
        </form>
      </Modal>

      {/* Perk Edit Modal */}
      <Modal
        isOpen={perkModalOpen}
        onClose={() => setPerkModalOpen(false)}
        title={editingPerk ? "Edit Benefit Highlight" : "Create Benefit Card"}
      >
        <form onSubmit={handleSavePerk} className="space-y-4 font-sans text-xs">
          <div className="space-y-1">
            <label className="block font-semibold text-[#111215]">Benefit Title</label>
            <input
              required
              type="text"
              value={perkTitle}
              onChange={(e) => setPerkTitle(e.target.value)}
              placeholder="100% Remote Flexibility"
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-semibold text-[#111215]">Description</label>
            <input
              required
              type="text"
              value={perkDesc}
              onChange={(e) => setPerkDesc(e.target.value)}
              placeholder="Work comfortably from anywhere in the world..."
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] rounded-xl text-[#111215] placeholder:text-[#9E9E9E] focus:border-[#519DD9] focus:outline-none"
            />
          </div>

          <div className="pt-3 flex gap-2">
            <button 
              type="button" 
              className="flex-1 py-2 rounded-xl text-xs font-semibold bg-[#FFFFFF] border border-[#E5E2DB] text-[#71757E] hover:text-[#111215] hover:bg-[#F5F3EF] transition"
              onClick={() => setPerkModalOpen(false)}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="flex-1 py-2 rounded-xl text-xs font-bold bg-[#111215] text-[#FAFAF8] hover:bg-[#23252B] shadow-sm transition"
            >
              Save Highlight Card
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
