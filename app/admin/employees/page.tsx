"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { 
  Users, 
  Briefcase, 
  Calendar, 
  Check, 
  X, 
  UserPlus, 
  Search,
  ChevronRight,
  TrendingUp,
  MapPin,
  Clock,
  ShieldCheck,
  Edit3,
  Trash2,
  Phone,
  Mail,
  Filter,
  Plus,
  AlertTriangle,
  UserCheck,
  Award,
  DollarSign
} from "lucide-react";
import { 
  Employee, 
  Candidate, 
  LeaveRequest,
  getStoredEmployees, 
  saveEmployees, 
  getStoredCandidates, 
  saveCandidates, 
  getStoredLeaves, 
  saveLeaves,
  DEFAULT_EMPLOYEES
} from "@/lib/data/employees-data";

const AVATAR_PRESETS = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
];

export default function AdminEmployeesPage() {
  const [activeTab, setActiveTab] = useState<"directory" | "recruitment" | "leaves">("directory");

  // State
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDept, setSelectedDept] = useState("ALL");
  const [selectedStatus, setSelectedStatus] = useState("ALL");

  // Employee Modals
  const [employeeModalOpen, setEmployeeModalOpen] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [empDeleteConfirm, setEmpDeleteConfirm] = useState<Employee | null>(null);

  // Employee Form fields
  const [empName, setEmpName] = useState("");
  const [empTitle, setEmpTitle] = useState("");
  const [empRole, setEmpRole] = useState("DEVELOPER");
  const [empDept, setEmpDept] = useState("Engineering");
  const [empEmail, setEmpEmail] = useState("");
  const [empPhone, setEmpPhone] = useState("");
  const [empAvatar, setEmpAvatar] = useState(AVATAR_PRESETS[0]);
  const [empLocation, setEmpLocation] = useState("Remote");
  const [empAttendance, setEmpAttendance] = useState("99.0%");
  const [empStatus, setEmpStatus] = useState<"ACTIVE" | "ON_LEAVE" | "PROBATION" | "OFFBOARDED">("ACTIVE");
  const [empSalary, setEmpSalary] = useState("$120,000");

  // Candidate Modals
  const [candidateModalOpen, setCandidateModalOpen] = useState(false);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const [candName, setCandName] = useState("");
  const [candRole, setCandRole] = useState("Fullstack Engineer");
  const [candStage, setCandStage] = useState("SCREENING");
  const [candSource, setCandSource] = useState("LinkedIn");
  const [candScore, setCandScore] = useState(90);
  const [candEmail, setCandEmail] = useState("");

  // Leave Modals
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [editingLeave, setEditingLeave] = useState<LeaveRequest | null>(null);
  const [leaveEmpName, setLeaveEmpName] = useState("");
  const [leaveRole, setLeaveRole] = useState("DEVELOPER");
  const [leaveDates, setLeaveDates] = useState("");
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveType, setLeaveType] = useState("Vacation");
  const [leaveStatus, setLeaveStatus] = useState<"PENDING" | "APPROVED" | "REJECTED">("PENDING");

  const recruitmentStages = [
    "JOB OPENING",
    "APPLICATION",
    "SCREENING",
    "INTERVIEW",
    "HR ROUND",
    "SELECTED",
    "ONBOARDING"
  ];

  useEffect(() => {
    setEmployees(getStoredEmployees());
    setCandidates(getStoredCandidates());
    setLeaveRequests(getStoredLeaves());
  }, []);

  // ---------------- EMPLOYEES CRUD ----------------
  const handleOpenAddEmployee = () => {
    setEditingEmployee(null);
    setEmpName("");
    setEmpTitle("Senior Software Engineer");
    setEmpRole("DEVELOPER");
    setEmpDept("Engineering");
    setEmpEmail("");
    setEmpPhone("+1 (555) 000-0000");
    setEmpAvatar(AVATAR_PRESETS[Math.floor(Math.random() * AVATAR_PRESETS.length)]);
    setEmpLocation("Remote");
    setEmpAttendance("99.0%");
    setEmpStatus("ACTIVE");
    setEmpSalary("$135,000");
    setEmployeeModalOpen(true);
  };

  const handleOpenEditEmployee = (emp: Employee) => {
    setEditingEmployee(emp);
    setEmpName(emp.name);
    setEmpTitle(emp.title);
    setEmpRole(emp.role);
    setEmpDept(emp.department);
    setEmpEmail(emp.email);
    setEmpPhone(emp.phone || "");
    setEmpAvatar(emp.avatar);
    setEmpLocation(emp.officeLocation);
    setEmpAttendance(emp.attendance);
    setEmpStatus(emp.status);
    setEmpSalary(emp.salary || "$120,000");
    setEmployeeModalOpen(true);
  };

  const handleSaveEmployee = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Employee[] = [];

    if (editingEmployee) {
      updated = employees.map(emp => {
        if (emp.id === editingEmployee.id) {
          return {
            ...emp,
            name: empName,
            title: empTitle,
            role: empRole,
            department: empDept,
            email: empEmail,
            phone: empPhone,
            avatar: empAvatar,
            officeLocation: empLocation,
            attendance: empAttendance,
            status: empStatus,
            salary: empSalary
          };
        }
        return emp;
      });
    } else {
      const newEmp: Employee = {
        id: `EMP-${Date.now().toString().slice(-4)}`,
        name: empName,
        title: empTitle,
        role: empRole,
        department: empDept,
        email: empEmail || `${empName.toLowerCase().replace(/\s+/g, ".")}@company.com`,
        phone: empPhone,
        avatar: empAvatar,
        officeLocation: empLocation,
        attendance: empAttendance,
        status: empStatus,
        joinedDate: new Date().toISOString().split("T")[0],
        salary: empSalary
      };
      updated = [newEmp, ...employees];
    }

    setEmployees(updated);
    saveEmployees(updated);
    setEmployeeModalOpen(false);
  };

  const handleDeleteEmployee = (id: string) => {
    const updated = employees.filter(emp => emp.id !== id);
    setEmployees(updated);
    saveEmployees(updated);
    setEmpDeleteConfirm(null);
  };

  // ---------------- CANDIDATES CRUD ----------------
  const handleOpenAddCandidate = () => {
    setEditingCandidate(null);
    setCandName("");
    setCandRole("Frontend Engineer");
    setCandStage("SCREENING");
    setCandSource("LinkedIn");
    setCandScore(88);
    setCandEmail("");
    setCandidateModalOpen(true);
  };

  const handleOpenEditCandidate = (cand: Candidate) => {
    setEditingCandidate(cand);
    setCandName(cand.name);
    setCandRole(cand.role);
    setCandStage(cand.stage);
    setCandSource(cand.source);
    setCandScore(cand.score);
    setCandEmail(cand.email || "");
    setCandidateModalOpen(true);
  };

  const handleSaveCandidate = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: Candidate[] = [];

    if (editingCandidate) {
      updated = candidates.map(c => {
        if (c.id === editingCandidate.id) {
          return {
            ...c,
            name: candName,
            role: candRole,
            stage: candStage,
            source: candSource,
            score: Number(candScore),
            email: candEmail
          };
        }
        return c;
      });
    } else {
      const newCand: Candidate = {
        id: `C-${Date.now().toString().slice(-4)}`,
        name: candName,
        role: candRole,
        stage: candStage,
        source: candSource,
        score: Number(candScore),
        email: candEmail
      };
      updated = [...candidates, newCand];
    }

    setCandidates(updated);
    saveCandidates(updated);
    setCandidateModalOpen(false);
  };

  const handleDeleteCandidate = (id: string) => {
    const updated = candidates.filter(c => c.id !== id);
    setCandidates(updated);
    saveCandidates(updated);
  };

  const moveCandidate = (id: string) => {
    const updated = candidates.map(c => {
      if (c.id === id) {
        const currentIdx = recruitmentStages.indexOf(c.stage);
        const nextStage = recruitmentStages[(currentIdx + 1) % recruitmentStages.length];
        return { ...c, stage: nextStage };
      }
      return c;
    });
    setCandidates(updated);
    saveCandidates(updated);
  };

  // ---------------- LEAVES CRUD ----------------
  const handleOpenAddLeave = () => {
    setEditingLeave(null);
    setLeaveEmpName(employees[0]?.name || "Alex Rivera");
    setLeaveRole(employees[0]?.role || "DEVELOPER");
    setLeaveDates("Oct 15 - Oct 18");
    setLeaveReason("Personal time off");
    setLeaveType("Personal");
    setLeaveStatus("PENDING");
    setLeaveModalOpen(true);
  };

  const handleOpenEditLeave = (lr: LeaveRequest) => {
    setEditingLeave(lr);
    setLeaveEmpName(lr.employeeName);
    setLeaveRole(lr.role);
    setLeaveDates(lr.dates);
    setLeaveReason(lr.reason);
    setLeaveType(lr.type || "Vacation");
    setLeaveStatus(lr.status);
    setLeaveModalOpen(true);
  };

  const handleSaveLeave = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: LeaveRequest[] = [];

    if (editingLeave) {
      updated = leaveRequests.map(lr => {
        if (lr.id === editingLeave.id) {
          return {
            ...lr,
            employeeName: leaveEmpName,
            role: leaveRole,
            dates: leaveDates,
            reason: leaveReason,
            type: leaveType,
            status: leaveStatus
          };
        }
        return lr;
      });
    } else {
      const newLeave: LeaveRequest = {
        id: `LR-${Date.now().toString().slice(-4)}`,
        employeeName: leaveEmpName,
        role: leaveRole,
        dates: leaveDates,
        reason: leaveReason,
        type: leaveType,
        status: leaveStatus,
        requestedAt: new Date().toISOString()
      };
      updated = [newLeave, ...leaveRequests];
    }

    setLeaveRequests(updated);
    saveLeaves(updated);
    setLeaveModalOpen(false);
  };

  const handleDeleteLeave = (id: string) => {
    const updated = leaveRequests.filter(lr => lr.id !== id);
    setLeaveRequests(updated);
    saveLeaves(updated);
  };

  const handleLeaveAction = (id: string, action: "APPROVED" | "REJECTED") => {
    const updated = leaveRequests.map(lr => {
      if (lr.id === id) {
        return { ...lr, status: action };
      }
      return lr;
    });
    setLeaveRequests(updated);
    saveLeaves(updated);
  };

  // Filtered staff list
  const filteredEmployees = employees.filter(emp => {
    const matchSearch = emp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        emp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        emp.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        emp.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDept = selectedDept === "ALL" || emp.department.toLowerCase() === selectedDept.toLowerCase();
    const matchStatus = selectedStatus === "ALL" || emp.status === selectedStatus;
    return matchSearch && matchDept && matchStatus;
  });

  const activeCount = employees.filter(e => e.status === "ACTIVE").length;
  const leaveCount = employees.filter(e => e.status === "ON_LEAVE").length;
  const pendingLeaves = leaveRequests.filter(l => l.status === "PENDING").length;

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#FFFFFF] p-6 rounded-2xl border border-[#E5E2DB] shadow-xs">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#519DD9]/10 border border-[#519DD9]/30 text-[#0284C7] font-mono text-[11px] font-bold">
            <Users className="w-3.5 h-3.5" /> WORKFORCE & TALENT MANAGEMENT
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111215] font-display tracking-tight">
            Employee & HR Workspace
          </h2>
          <p className="text-xs text-[#565961] max-w-2xl">
            Complete management for staff directory records, candidate recruitment pipeline, and leave approval workflows.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Button 
            variant={activeTab === "directory" ? "gradient" : "outline"} 
            size="sm"
            onClick={() => setActiveTab("directory")}
            icon={<Users className="w-3.5 h-3.5" />}
          >
            Staff Directory ({employees.length})
          </Button>
          <Button 
            variant={activeTab === "recruitment" ? "gradient" : "outline"} 
            size="sm"
            onClick={() => setActiveTab("recruitment")}
            icon={<Briefcase className="w-3.5 h-3.5" />}
          >
            Recruitment Pipeline ({candidates.length})
          </Button>
          <Button 
            variant={activeTab === "leaves" ? "gradient" : "outline"} 
            size="sm"
            onClick={() => setActiveTab("leaves")}
            icon={<Clock className="w-3.5 h-3.5" />}
          >
            Leaves ({pendingLeaves} Pending)
          </Button>
        </div>
      </div>

      {/* Overview Stats Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E2DB] space-y-1 shadow-xs">
          <div className="text-[#71757E] uppercase text-[10px] font-medium">Total Staff Members</div>
          <div className="text-xl font-bold text-[#111215]">{employees.length} Active Profiles</div>
        </div>
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E2DB] space-y-1 shadow-xs">
          <div className="text-[#71757E] uppercase text-[10px] font-medium">On-Duty Deployment</div>
          <div className="text-xl font-bold text-[#0F766E]">{activeCount} Employees</div>
        </div>
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E2DB] space-y-1 shadow-xs">
          <div className="text-[#71757E] uppercase text-[10px] font-medium">Talent Candidates</div>
          <div className="text-xl font-bold text-[#519DD9]">{candidates.length} in Pipeline</div>
        </div>
        <div className="p-4 rounded-xl bg-[#FFFFFF] border border-[#E5E2DB] space-y-1 shadow-xs">
          <div className="text-[#71757E] uppercase text-[10px] font-medium">Pending Leave Approvals</div>
          <div className="text-xl font-bold text-[#B45309]">{pendingLeaves} Requests</div>
        </div>
      </div>

      {/* 1. STAFF DIRECTORY VIEW */}
      {activeTab === "directory" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#FFFFFF] p-4 border border-[#E5E2DB] rounded-2xl shadow-xs flex-wrap">
            <div className="relative flex-1 w-full sm:max-w-xs">
              <input 
                type="text" 
                placeholder="Search staff by name, title, email..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-xs text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-[#71757E]" />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                className="px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-xs font-mono text-[#111215] focus:outline-none focus:border-[#519DD9] transition shadow-xs cursor-pointer"
              >
                <option value="ALL">All Departments</option>
                <option value="Executive">Executive</option>
                <option value="Engineering">Engineering</option>
                <option value="Creative Studio">Creative Studio</option>
                <option value="Growth">Growth</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
              </select>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-xs font-mono text-[#111215] focus:outline-none focus:border-[#519DD9] transition shadow-xs cursor-pointer"
              >
                <option value="ALL">All Status</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="ON_LEAVE">ON LEAVE</option>
                <option value="PROBATION">PROBATION</option>
                <option value="OFFBOARDED">OFFBOARDED</option>
              </select>

              <Button 
                variant="gradient" 
                size="sm" 
                onClick={handleOpenAddEmployee} 
                icon={<UserPlus className="w-4 h-4" />}
              >
                Add Employee
              </Button>
            </div>
          </div>

          {/* Employees Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEmployees.map((employee) => (
              <GlassCard key={employee.id} className="p-5 border-[#E5E2DB] bg-[#FFFFFF] shadow-xs space-y-4 hover:border-[#519DD9] transition group flex flex-col justify-between">
                <div className="space-y-4">
                  {/* Top Bar with Avatar & Actions */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <img 
                        src={employee.avatar} 
                        alt={employee.name} 
                        className="w-12 h-12 rounded-full border border-[#E5E2DB] object-cover shrink-0" 
                      />
                      <div>
                        <div className="font-bold text-[#111215] text-sm flex items-center gap-1.5">
                          <span>{employee.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-mono font-bold ${
                            employee.status === "ACTIVE" ? "bg-[#53BAC1]/10 text-[#0F766E] border border-[#53BAC1]/30" :
                            employee.status === "ON_LEAVE" ? "bg-[#F7C200]/15 text-[#B45309] border border-[#F7C200]/40" :
                            "bg-[#F5F3EF] border border-[#E5E2DB] text-[#71757E]"
                          }`}>
                            {employee.status}
                          </span>
                        </div>
                        <div className="text-[10px] text-[#71757E] font-mono mt-0.5">{employee.title}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleOpenEditEmployee(employee)}
                        className="p-1.5 bg-[#FFFFFF] hover:bg-[#F5F3EF] border border-[#E5E2DB] text-[#565961] hover:text-[#111215] rounded-lg text-xs transition"
                        title="Edit employee record"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setEmpDeleteConfirm(employee)}
                        className="p-1.5 bg-[#DB0038]/10 hover:bg-[#DB0038]/20 border border-[#DB0038]/30 text-[#DB0038] rounded-lg text-xs transition"
                        title="Delete employee record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="border-t border-[#E5E2DB] pt-3 space-y-2 text-xs font-mono">
                    <div className="flex justify-between">
                      <span className="text-[#71757E]">Security Clearance:</span>
                      <span className="text-[#519DD9] font-bold">{employee.role}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#71757E]">Department:</span>
                      <span className="text-[#111215] font-semibold">{employee.department}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#71757E]">Attendance:</span>
                      <span className="text-[#0F766E] font-bold">{employee.attendance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#71757E]">Location:</span>
                      <span className="text-[#4A4D54] flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[#71757E]" /> {employee.officeLocation}
                      </span>
                    </div>
                    {employee.salary && (
                      <div className="flex justify-between">
                        <span className="text-[#71757E]">Comp Package:</span>
                        <span className="text-[#B45309] font-bold">{employee.salary}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Contact Footer */}
                <div className="pt-3 border-t border-[#E5E2DB] flex items-center justify-between text-[11px] font-mono text-[#71757E]">
                  <span className="truncate">{employee.email}</span>
                  {employee.phone && <span className="shrink-0">{employee.phone}</span>}
                </div>
              </GlassCard>
            ))}

            {filteredEmployees.length === 0 && (
              <div className="col-span-full text-center py-16 text-[#71757E] text-xs font-mono border border-dashed border-[#E5E2DB] rounded-3xl space-y-2 bg-[#FFFFFF]">
                <Users className="w-8 h-8 text-[#71757E] mx-auto" />
                <div>No employee profiles found matching your search and filter criteria.</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. RECRUITMENT KANBAN WORKFLOW VIEW */}
      {activeTab === "recruitment" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between gap-4 bg-[#FFFFFF] p-4 border border-[#E5E2DB] rounded-2xl shadow-xs flex-wrap">
            <div>
              <h3 className="text-sm font-bold text-[#111215] font-display">Candidate Recruitment Workflow</h3>
              <p className="text-[11px] text-[#565961]">Manage applicants across all recruitment stages.</p>
            </div>
            <Button size="sm" variant="gradient" onClick={handleOpenAddCandidate} icon={<Plus className="w-4 h-4" />}>
              Add Candidate
            </Button>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-[1300px]">
              {recruitmentStages.map((stage) => {
                const stageCandidates = candidates.filter(c => c.stage === stage);
                return (
                  <div key={stage} className="flex-1 p-4 border border-[#E5E2DB] bg-[#F5F3EF] space-y-3 min-w-[210px] shrink-0 rounded-2xl shadow-xs">
                    <div className="flex items-center justify-between text-xs font-mono font-bold text-[#111215] pb-2 border-b border-[#E5E2DB]">
                      <span>{stage}</span>
                      <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E2DB] text-[10px] text-[#71757E] rounded font-bold">{stageCandidates.length}</span>
                    </div>

                    <div className="space-y-3">
                      {stageCandidates.map((candidate) => (
                        <div key={candidate.id} className="p-3 bg-[#FFFFFF] rounded-xl border border-[#E5E2DB] space-y-2 text-[11px] shadow-xs hover:border-[#519DD9] transition">
                          <div className="flex items-start justify-between gap-1">
                            <div>
                              <div className="font-bold text-[#111215] text-xs">{candidate.name}</div>
                              <div className="text-[10px] text-[#71757E] font-mono">{candidate.role}</div>
                            </div>
                            <div className="flex items-center gap-1">
                              <button 
                                onClick={() => handleOpenEditCandidate(candidate)}
                                className="p-1 hover:text-[#111215] text-[#71757E]"
                                title="Edit candidate"
                              >
                                <Edit3 className="w-3 h-3" />
                              </button>
                              <button 
                                onClick={() => handleDeleteCandidate(candidate.id)}
                                className="p-1 hover:text-[#DB0038] text-[#DB0038]"
                                title="Delete candidate"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[9px] text-[#71757E] pt-1.5 border-t border-[#E5E2DB] font-mono">
                            <span>Score: <strong className="text-[#0F766E]">{candidate.score}%</strong></span>
                            <span>{candidate.source}</span>
                          </div>

                          <button
                            onClick={() => moveCandidate(candidate.id)}
                            className="w-full mt-2 py-1 bg-[#519DD9]/10 hover:bg-[#519DD9]/20 text-[#0284C7] border border-[#519DD9]/30 rounded font-semibold text-[9px] flex items-center justify-center gap-1 transition"
                          >
                            Advance Stage <ChevronRight className="w-3 h-3" />
                          </button>
                        </div>
                      ))}

                      {stageCandidates.length === 0 && (
                        <div className="text-center py-6 text-[10px] text-[#71757E] font-mono border border-dashed border-[#E5E2DB] rounded-xl bg-[#FFFFFF]/60">
                          No applicants
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 3. LEAVE APPROVALS VIEW */}
      {activeTab === "leaves" && (
        <GlassCard className="p-6 border-[#E5E2DB] bg-[#FFFFFF] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E5E2DB] pb-4">
            <div>
              <h3 className="text-base font-bold text-[#111215] flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#519DD9]" /> Employee Leave Requests & SLA Approvals
              </h3>
              <p className="text-xs text-[#565961]">Review, approve, reject, or schedule workforce leave requests.</p>
            </div>
            <Button size="sm" variant="gradient" onClick={handleOpenAddLeave} icon={<Plus className="w-4 h-4" />}>
              Submit Leave Request
            </Button>
          </div>

          <div className="space-y-4">
            {leaveRequests.map((request) => (
              <div key={request.id} className="p-4 bg-[#F5F3EF] border border-[#E5E2DB] rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[#111215] text-sm">{request.employeeName}</span>
                    <span className="px-2 py-0.5 bg-[#519DD9]/10 text-[#0284C7] border border-[#519DD9]/30 rounded font-mono text-[9px] font-bold">{request.role}</span>
                    <span className="px-2 py-0.5 bg-[#FFFFFF] border border-[#E5E2DB] text-[#4A4D54] rounded font-mono text-[9px]">{request.type}</span>
                  </div>
                  <div className="text-[#71757E] font-mono">Date Range: <span className="text-[#111215] font-semibold">{request.dates}</span></div>
                  <div className="text-[#565961] font-sans">Reason: &ldquo;{request.reason}&rdquo;</div>
                </div>

                <div className="flex items-center gap-2">
                  {request.status === "PENDING" ? (
                    <>
                      <button
                        onClick={() => handleLeaveAction(request.id, "APPROVED")}
                        className="px-3 py-1.5 bg-[#53BAC1]/15 border border-[#53BAC1]/30 hover:bg-[#53BAC1]/25 text-[#0F766E] rounded-xl flex items-center gap-1 font-bold font-sans transition text-[11px]"
                      >
                        <Check className="w-3.5 h-3.5" /> Approve
                      </button>
                      <button
                        onClick={() => handleLeaveAction(request.id, "REJECTED")}
                        className="px-3 py-1.5 bg-[#DB0038]/15 border border-[#DB0038]/30 hover:bg-[#DB0038]/25 text-[#DB0038] rounded-xl flex items-center gap-1 font-bold font-sans transition text-[11px]"
                      >
                        <X className="w-3.5 h-3.5" /> Reject
                      </button>
                    </>
                  ) : (
                    <span className={`px-3 py-1 rounded-xl font-mono text-[10px] font-bold ${
                      request.status === "APPROVED" 
                        ? "bg-[#53BAC1]/10 text-[#0F766E] border border-[#53BAC1]/30" 
                        : "bg-[#DB0038]/10 text-[#DB0038] border border-[#DB0038]/30"
                    }`}>
                      ● {request.status}
                    </span>
                  )}

                  <button
                    onClick={() => handleOpenEditLeave(request)}
                    className="p-1.5 bg-[#FFFFFF] hover:bg-[#F5F3EF] border border-[#E5E2DB] text-[#565961] hover:text-[#111215] rounded-lg text-xs transition"
                    title="Edit request"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteLeave(request.id)}
                    className="p-1.5 bg-[#DB0038]/10 hover:bg-[#DB0038]/20 border border-[#DB0038]/30 text-[#DB0038] rounded-lg text-xs transition"
                    title="Delete request"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {leaveRequests.length === 0 && (
              <div className="text-center py-10 text-[#71757E] text-xs font-mono border border-dashed border-[#E5E2DB] rounded-2xl bg-[#FFFFFF]">
                No leave requests found.
              </div>
            )}
          </div>
        </GlassCard>
      )}

      {/* ----------------- MODALS ----------------- */}

      {/* Add / Edit Employee Modal */}
      <Modal
        isOpen={employeeModalOpen}
        onClose={() => setEmployeeModalOpen(false)}
        title={editingEmployee ? "Edit Employee Profile" : "Add New Employee Profile"}
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveEmployee} className="space-y-4 font-sans text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Full Name *</label>
              <input 
                required
                type="text"
                value={empName}
                onChange={(e) => setEmpName(e.target.value)}
                placeholder="Marcus Vance"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Job Title *</label>
              <input 
                required
                type="text"
                value={empTitle}
                onChange={(e) => setEmpTitle(e.target.value)}
                placeholder="Lead Delivery Manager"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Security Clearance (Role)</label>
              <select
                value={empRole}
                onChange={(e) => setEmpRole(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono focus:outline-none focus:border-[#519DD9] transition shadow-xs cursor-pointer"
              >
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="DEVELOPER">DEVELOPER</option>
                <option value="DESIGNER">DESIGNER</option>
                <option value="SALES">SALES</option>
                <option value="HR">HR</option>
                <option value="FINANCE">FINANCE</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Department</label>
              <select
                value={empDept}
                onChange={(e) => setEmpDept(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] focus:outline-none focus:border-[#519DD9] transition shadow-xs cursor-pointer"
              >
                <option value="Executive">Executive</option>
                <option value="Engineering">Engineering</option>
                <option value="Creative Studio">Creative Studio</option>
                <option value="Growth">Growth</option>
                <option value="Operations">Operations</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Status</label>
              <select
                value={empStatus}
                onChange={(e) => setEmpStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono focus:outline-none focus:border-[#519DD9] transition shadow-xs cursor-pointer"
              >
                <option value="ACTIVE">ACTIVE</option>
                <option value="ON_LEAVE">ON_LEAVE</option>
                <option value="PROBATION">PROBATION</option>
                <option value="OFFBOARDED">OFFBOARDED</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Email Address *</label>
              <input 
                required
                type="email"
                value={empEmail}
                onChange={(e) => setEmpEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Phone Number</label>
              <input 
                type="text"
                value={empPhone}
                onChange={(e) => setEmpPhone(e.target.value)}
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Office Location</label>
              <input 
                type="text"
                value={empLocation}
                onChange={(e) => setEmpLocation(e.target.value)}
                placeholder="Remote / Austin"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Attendance Score</label>
              <input 
                type="text"
                value={empAttendance}
                onChange={(e) => setEmpAttendance(e.target.value)}
                placeholder="98.5%"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Annual Salary / Package</label>
              <input 
                type="text"
                value={empSalary}
                onChange={(e) => setEmpSalary(e.target.value)}
                placeholder="$140,000"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
          </div>

          {/* Avatar Presets */}
          <div className="space-y-2">
            <label className="block font-bold text-[#111215]">Avatar Photo</label>
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {AVATAR_PRESETS.map((preset, idx) => (
                <img
                  key={idx}
                  src={preset}
                  alt={`Preset ${idx}`}
                  onClick={() => setEmpAvatar(preset)}
                  className={`w-10 h-10 rounded-full cursor-pointer object-cover border-2 transition ${
                    empAvatar === preset ? "border-[#519DD9] scale-110 shadow-md" : "border-[#E5E2DB] opacity-70 hover:opacity-100"
                  }`}
                />
              ))}
            </div>
            <input 
              type="url"
              value={empAvatar}
              onChange={(e) => setEmpAvatar(e.target.value)}
              placeholder="Or enter custom image URL..."
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] text-[11px] font-mono focus:outline-none focus:border-[#519DD9] transition shadow-xs"
            />
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setEmployeeModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1" size="sm">
              Save Employee
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Employee Confirmation Modal */}
      <Modal
        isOpen={!!empDeleteConfirm}
        onClose={() => setEmpDeleteConfirm(null)}
        title="Confirm Employee Profile Deletion"
        maxWidth="sm"
      >
        <div className="space-y-4 text-xs font-sans">
          <div className="p-3.5 bg-[#DB0038]/10 border border-[#DB0038]/30 rounded-xl text-[#DB0038] flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              Are you sure you want to delete <strong className="text-[#111215] font-bold">{empDeleteConfirm?.name}</strong> ({empDeleteConfirm?.title}) from the company staff registry?
            </div>
          </div>
          <div className="pt-2 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setEmpDeleteConfirm(null)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="primary" 
              className="flex-1 bg-[#DB0038] hover:bg-[#DB0038]/90 text-white font-bold" 
              size="sm" 
              onClick={() => empDeleteConfirm && handleDeleteEmployee(empDeleteConfirm.id)}
            >
              Delete Record
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add / Edit Candidate Modal */}
      <Modal
        isOpen={candidateModalOpen}
        onClose={() => setCandidateModalOpen(false)}
        title={editingCandidate ? "Edit Candidate Dossier" : "Add New Candidate"}
      >
        <form onSubmit={handleSaveCandidate} className="space-y-4 font-sans text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Candidate Name *</label>
              <input 
                required
                type="text"
                value={candName}
                onChange={(e) => setCandName(e.target.value)}
                placeholder="Sarah Connor"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Target Role *</label>
              <input 
                required
                type="text"
                value={candRole}
                onChange={(e) => setCandRole(e.target.value)}
                placeholder="Frontend Developer"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Stage</label>
              <select
                value={candStage}
                onChange={(e) => setCandStage(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] focus:outline-none focus:border-[#519DD9] transition shadow-xs cursor-pointer"
              >
                {recruitmentStages.map(st => (
                  <option key={st} value={st}>{st}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Source</label>
              <input 
                type="text"
                value={candSource}
                onChange={(e) => setCandSource(e.target.value)}
                placeholder="LinkedIn / Referral"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Score (%)</label>
              <input 
                type="number"
                min="0"
                max="100"
                value={candScore}
                onChange={(e) => setCandScore(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-[#111215]">Email Address</label>
            <input 
              type="email"
              value={candEmail}
              onChange={(e) => setCandEmail(e.target.value)}
              placeholder="candidate@example.com"
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
            />
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setCandidateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1" size="sm">
              Save Candidate
            </Button>
          </div>
        </form>
      </Modal>

      {/* Add / Edit Leave Request Modal */}
      <Modal
        isOpen={leaveModalOpen}
        onClose={() => setLeaveModalOpen(false)}
        title={editingLeave ? "Edit Leave Request" : "Submit Leave Request"}
      >
        <form onSubmit={handleSaveLeave} className="space-y-4 font-sans text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Employee Name *</label>
              <input 
                required
                type="text"
                value={leaveEmpName}
                onChange={(e) => setLeaveEmpName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Role</label>
              <input 
                required
                type="text"
                value={leaveRole}
                onChange={(e) => setLeaveRole(e.target.value)}
                placeholder="DEVELOPER"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Date Range *</label>
              <input 
                required
                type="text"
                value={leaveDates}
                onChange={(e) => setLeaveDates(e.target.value)}
                placeholder="Oct 10 - Oct 14"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Leave Type</label>
              <select
                value={leaveType}
                onChange={(e) => setLeaveType(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] focus:outline-none focus:border-[#519DD9] transition shadow-xs cursor-pointer"
              >
                <option value="Vacation">Vacation</option>
                <option value="Medical">Medical</option>
                <option value="Personal">Personal</option>
                <option value="Maternity / Paternity">Maternity / Paternity</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-[#111215]">Reason / Details *</label>
            <textarea 
              required
              rows={3}
              value={leaveReason}
              onChange={(e) => setLeaveReason(e.target.value)}
              placeholder="Brief explanation of the leave request..."
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs resize-none"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-[#111215]">Status</label>
            <select
              value={leaveStatus}
              onChange={(e) => setLeaveStatus(e.target.value as any)}
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono focus:outline-none focus:border-[#519DD9] transition shadow-xs cursor-pointer"
            >
              <option value="PENDING">PENDING</option>
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setLeaveModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1" size="sm">
              Save Leave Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
