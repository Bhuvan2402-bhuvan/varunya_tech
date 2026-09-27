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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900/60 p-6 rounded-3xl border border-slate-800 backdrop-blur-xl">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-[11px] font-bold">
            <Briefcase className="w-3.5 h-3.5" /> RECRUITMENT & TALENT MANAGEMENT
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display tracking-tight">
            Careers & Job Postings Hub
          </h2>
          <p className="text-xs text-slate-400 max-w-2xl">
            Publish and manage open engineering & creative roles, customize applicant perks, and review incoming candidate submissions.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link href="/careers" target="_blank">
            <Button variant="outline" size="sm" icon={<ExternalLink className="w-3.5 h-3.5" />}>
              Live Careers Page
            </Button>
          </Link>
          <Button 
            variant="gradient" 
            size="sm" 
            onClick={handleOpenAddJob}
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            Create Career Listing
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto text-xs font-semibold">
        <button
          onClick={() => setActiveTab("jobs")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${
            activeTab === "jobs"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20 font-bold"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          <Briefcase className="w-3.5 h-3.5" />
          <span>Active Job Listings ({careers.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("perks")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${
            activeTab === "perks"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20 font-bold"
              : "bg-slate-900 text-slate-400 hover:text-white"
          }`}
        >
          <Gift className="w-3.5 h-3.5" />
          <span>Benefits & Perks Highlights ({perks.length})</span>
        </button>
        <button
          onClick={() => setActiveTab("applicants")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition ${
            activeTab === "applicants"
              ? "bg-purple-600 text-white shadow-lg shadow-purple-500/20 font-bold"
              : "bg-slate-900 text-slate-400 hover:text-white"
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
                className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              {["ALL", "Engineering", "Creative Studio", "Operations", "Growth"].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition ${
                    selectedDept === dept
                      ? "bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold"
                      : "bg-slate-900 text-slate-400 hover:text-white"
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
              <GlassCard key={job.id} className="p-6 border-slate-800 space-y-4 hover:border-purple-500/30 transition">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-lg font-bold text-white font-display flex items-center gap-2">
                        {job.title}
                      </h3>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        job.status === "OPEN" 
                          ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                          : job.status === "PAUSED"
                          ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                          : "bg-red-500/15 text-red-400 border border-red-500/30"
                      }`}>
                        ● {job.status}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 pt-1 flex-wrap">
                      <span>{job.department}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                      <span>•</span>
                      <span>{job.type}</span>
                      {job.salaryRange && (
                        <>
                          <span>•</span>
                          <span className="text-[#FFB347] font-bold">{job.salaryRange}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => handleToggleJobStatus(job.id)}
                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold"
                    >
                      Status: {job.status}
                    </button>
                    <button
                      onClick={() => handleOpenEditJob(job)}
                      className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteJob(job.id)}
                      className="p-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg text-xs"
                      title="Delete listing"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">{job.summary}</p>

                {job.requirements && job.requirements.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-850">
                    <div className="text-[10px] font-mono text-slate-400 uppercase font-bold">Key Requirements:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {job.requirements.map((req, rIdx) => (
                        <span key={rIdx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-[11px] text-slate-300 font-mono">
                          {req}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </GlassCard>
            ))}

            {filteredCareers.length === 0 && (
              <div className="text-center py-16 text-slate-500 text-xs font-mono border border-dashed border-slate-800 rounded-3xl space-y-2">
                <Briefcase className="w-8 h-8 text-slate-600 mx-auto" />
                <div>No job listings found matching your search.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. BENEFITS & PERKS TAB */}
      {activeTab === "perks" && (
        <div className="space-y-6">
          <GlassCard className="p-6 space-y-4 border-slate-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2 font-display">
                  <Gift className="w-4 h-4 text-cyan-400" /> Careers Perks & Benefit Cards
                </h3>
                <p className="text-xs text-slate-400">Manage the 3 highlight perk cards displayed prominently at the top of the careers page.</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => {
                  setEditingPerk(null);
                  setPerkTitle("New Perk Title");
                  setPerkDesc("Perk description...");
                  setPerkModalOpen(true);
                }}
                icon={<Plus className="w-4 h-4" />}
              >
                Add Perk Card
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {perks.map((perk, idx) => (
                <div key={perk.id || idx} className="p-5 bg-slate-900 border border-slate-800 rounded-2xl flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="text-sm font-bold text-cyan-400 font-display">{perk.title}</div>
                    <div className="text-xs text-slate-300 leading-relaxed">{perk.description}</div>
                  </div>
                  <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenEditPerk(perk)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Edit3 className="w-3 h-3" /> Edit Card
                    </button>
                    <button
                      onClick={() => {
                        const updated = perks.filter(p => p.id !== perk.id);
                        setPerks(updated);
                        savePerks(updated);
                      }}
                      className="p-1.5 text-red-400 hover:bg-red-500/10 rounded-lg text-xs"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {/* 3. APPLICANTS INBOX TAB */}
      {activeTab === "applicants" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="text-xs text-slate-400">
              Total <strong className="text-white">{applicants.length}</strong> candidates submitted applications.
            </div>

            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-mono text-slate-500">Filter:</span>
              {["ALL", "NEW", "REVIEWING", "SHORTLISTED", "INTERVIEWED", "HIRED", "REJECTED"].map((st) => (
                <button
                  key={st}
                  onClick={() => setApplicantFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition ${
                    applicantFilter === st
                      ? "bg-purple-500/20 border border-purple-500/40 text-purple-300 font-bold"
                      : "bg-slate-900 text-slate-400 hover:text-white"
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
                <GlassCard 
                  key={app.id} 
                  className={`p-4 border-slate-800 cursor-pointer transition flex items-center justify-between gap-4 ${
                    selectedApplicant?.id === app.id ? "border-purple-500/60 bg-purple-500/5" : "hover:border-slate-700"
                  }`}
                  onClick={() => setSelectedApplicant(app)}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{app.name}</span>
                      <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${
                        app.status === "NEW" ? "bg-cyan-500/20 text-cyan-300" :
                        app.status === "SHORTLISTED" ? "bg-emerald-500/20 text-emerald-300" :
                        app.status === "INTERVIEWED" ? "bg-purple-500/20 text-purple-300" :
                        app.status === "HIRED" ? "bg-green-500/30 text-green-200" :
                        "bg-slate-800 text-slate-400"
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="text-xs text-purple-400 font-mono">{app.jobTitle}</div>
                    <div className="text-[10px] text-slate-500 font-mono">
                      {app.email} • Submitted {new Date(app.submittedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <Button size="sm" variant="ghost" className="text-xs shrink-0">
                    View Dossier →
                  </Button>
                </GlassCard>
              ))}

              {filteredApplicants.length === 0 && (
                <div className="text-center py-16 text-slate-500 text-xs font-mono border border-dashed border-slate-800 rounded-3xl">
                  No applicant dossiers match the selected filter.
                </div>
              )}
            </div>

            {/* Candidate Dossier Detail Drawer */}
            <div className="lg:col-span-1">
              {selectedApplicant ? (
                <GlassCard className="p-6 border-slate-800 space-y-5 sticky top-6">
                  <div className="border-b border-slate-800 pb-3 space-y-1">
                    <div className="text-[10px] font-mono text-purple-400 uppercase font-bold">Candidate Details</div>
                    <h3 className="text-xl font-bold text-white font-display">{selectedApplicant.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">Role: {selectedApplicant.jobTitle}</p>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="flex items-center gap-2 text-slate-300">
                      <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                      <a href={`mailto:${selectedApplicant.email}`} className="hover:underline truncate">{selectedApplicant.email}</a>
                    </div>
                    {selectedApplicant.phone && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span>{selectedApplicant.phone}</span>
                      </div>
                    )}
                    {selectedApplicant.portfolioUrl && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <ExternalLink className="w-4 h-4 text-[#FFB347] shrink-0" />
                        <a href={selectedApplicant.portfolioUrl} target="_blank" rel="noreferrer" className="text-cyan-400 hover:underline truncate">
                          Portfolio / GitHub Profile
                        </a>
                      </div>
                    )}
                  </div>

                  {selectedApplicant.coverNote && (
                    <div className="space-y-1 bg-slate-900 p-3 rounded-xl border border-slate-800">
                      <div className="text-[10px] font-mono text-slate-400 uppercase">Cover Summary:</div>
                      <p className="text-xs text-slate-200 leading-relaxed italic">{selectedApplicant.coverNote}</p>
                    </div>
                  )}

                  {/* Status Decision Changer */}
                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <label className="text-[10px] font-mono text-slate-400 uppercase font-bold">Update Candidate Status</label>
                    <select
                      value={selectedApplicant.status}
                      onChange={(e) => handleUpdateApplicantStatus(selectedApplicant.id, e.target.value as any)}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-white focus:outline-none focus:border-purple-500"
                    >
                      <option value="NEW">NEW</option>
                      <option value="REVIEWING">REVIEWING</option>
                      <option value="SHORTLISTED">SHORTLISTED</option>
                      <option value="INTERVIEWED">INTERVIEWED</option>
                      <option value="HIRED">HIRED</option>
                      <option value="REJECTED">REJECTED</option>
                    </select>
                  </div>
                </GlassCard>
              ) : (
                <div className="p-8 border border-dashed border-slate-800 rounded-3xl text-center text-xs font-mono text-slate-500 space-y-2">
                  <UserCheck className="w-8 h-8 text-slate-600 mx-auto" />
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
              <label className="block font-semibold text-slate-300">Job Title</label>
              <input
                required
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Senior Full-Stack Architect"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Department</label>
              <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
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
              <label className="block font-semibold text-slate-300">Location</label>
              <input
                required
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Remote / Hybrid"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white font-mono focus:border-cyan-500 focus:outline-none"
              >
                <option value="OPEN">OPEN</option>
                <option value="PAUSED">PAUSED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Experience Level</label>
              <input
                type="text"
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="2+ Years"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Salary / Stipend Range</label>
              <input
                type="text"
                value={salaryRange}
                onChange={(e) => setSalaryRange(e.target.value)}
                placeholder="$80,000 - $110,000"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Job Summary</label>
            <textarea
              required
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Detailed description of the role and key deliverables..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Key Requirements (Comma-separated)</label>
            <input
              required
              type="text"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="Next.js, TypeScript, PostgreSQL, REST APIs"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Key Responsibilities (Comma-separated)</label>
            <input
              type="text"
              value={responsibilities}
              onChange={(e) => setResponsibilities(e.target.value)}
              placeholder="Lead rapid sprints, conduct peer code reviews, build reusable modules"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setJobModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1" size="sm">
              Save Job Listing
            </Button>
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
            <label className="block font-semibold text-slate-300">Benefit Title</label>
            <input
              required
              type="text"
              value={perkTitle}
              onChange={(e) => setPerkTitle(e.target.value)}
              placeholder="100% Remote Flexibility"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Description</label>
            <input
              required
              type="text"
              value={perkDesc}
              onChange={(e) => setPerkDesc(e.target.value)}
              placeholder="Work comfortably from anywhere in the world..."
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-white focus:border-cyan-500 focus:outline-none"
            />
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setPerkModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1" size="sm">
              Save Highlight Card
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
