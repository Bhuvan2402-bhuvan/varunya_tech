export interface Employee {
  id: string;
  name: string;
  title: string;
  role: string;
  department: string;
  email: string;
  phone?: string;
  avatar: string;
  officeLocation: string;
  attendance: string;
  status: "ACTIVE" | "ON_LEAVE" | "PROBATION" | "OFFBOARDED";
  joinedDate: string;
  salary?: string;
}

export interface Candidate {
  id: string;
  name: string;
  role: string;
  stage: string;
  source: string;
  score: number;
  email?: string;
  phone?: string;
  notes?: string;
}

export interface LeaveRequest {
  id: string;
  employeeName: string;
  role: string;
  dates: string;
  reason: string;
  type: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  requestedAt?: string;
}

export const DEFAULT_EMPLOYEES: Employee[] = [
  {
    id: "EMP-001",
    name: "Marcus Vance",
    title: "Chief Executive Admin",
    role: "ADMIN",
    department: "Executive",
    email: "marcus.vance@company.com",
    phone: "+1 (555) 100-2001",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    officeLocation: "Remote (San Francisco)",
    attendance: "99.4%",
    status: "ACTIVE",
    joinedDate: "2024-01-15",
    salary: "$180,000"
  },
  {
    id: "EMP-002",
    name: "Sarah Jenkins",
    title: "Lead Delivery Manager",
    role: "MANAGER",
    department: "Executive",
    email: "sarah.jenkins@company.com",
    phone: "+1 (555) 100-2002",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    officeLocation: "Remote (New York)",
    attendance: "98.8%",
    status: "ACTIVE",
    joinedDate: "2024-03-01",
    salary: "$145,000"
  },
  {
    id: "EMP-003",
    name: "Alex Rivera",
    title: "Chief Systems Architect",
    role: "DEVELOPER",
    department: "Engineering",
    email: "alex.rivera@company.com",
    phone: "+1 (555) 100-2003",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    officeLocation: "Remote (Austin)",
    attendance: "97.5%",
    status: "ACTIVE",
    joinedDate: "2024-02-10",
    salary: "$160,000"
  },
  {
    id: "EMP-004",
    name: "Elena Rostova",
    title: "Creative Design Director",
    role: "DESIGNER",
    department: "Creative Studio",
    email: "elena.rostova@company.com",
    phone: "+1 (555) 100-2004",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80",
    officeLocation: "Remote (London)",
    attendance: "99.1%",
    status: "ACTIVE",
    joinedDate: "2024-04-12",
    salary: "$130,000"
  },
  {
    id: "EMP-005",
    name: "Diana Prince",
    title: "VP of Client Relations",
    role: "SALES",
    department: "Growth",
    email: "diana.prince@company.com",
    phone: "+1 (555) 100-2005",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    officeLocation: "Remote (Chicago)",
    attendance: "96.8%",
    status: "ACTIVE",
    joinedDate: "2024-05-20",
    salary: "$140,000"
  },
  {
    id: "EMP-006",
    name: "Robert Chen",
    title: "Director of Talent Allocation",
    role: "HR",
    department: "Operations",
    email: "robert.chen@company.com",
    phone: "+1 (555) 100-2006",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80",
    officeLocation: "Remote (Seattle)",
    attendance: "98.4%",
    status: "ACTIVE",
    joinedDate: "2024-01-20",
    salary: "$125,000"
  },
  {
    id: "EMP-007",
    name: "Warren Vance",
    title: "Chief Financial Officer",
    role: "FINANCE",
    department: "Finance",
    email: "warren.vance@company.com",
    phone: "+1 (555) 100-2007",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    officeLocation: "Remote (Boston)",
    attendance: "99.7%",
    status: "ACTIVE",
    joinedDate: "2024-01-10",
    salary: "$175,000"
  }
];

export const DEFAULT_CANDIDATES: Candidate[] = [
  { id: "C1", name: "Sarah Connor", role: "Frontend Developer", stage: "INTERVIEW", source: "Referral", score: 92, email: "sarah.connor@example.com" },
  { id: "C2", name: "David Miller", role: "UI/UX Designer", stage: "SCREENING", source: "LinkedIn", score: 85, email: "david.miller@example.com" },
  { id: "C3", name: "James Carter", role: "DevOps Engineer", stage: "JOB OPENING", source: "Direct", score: 78, email: "james.carter@example.com" },
  { id: "C4", name: "Grace Hopper", role: "Fullstack Architect", stage: "HR ROUND", source: "AngelList", score: 96, email: "grace.hopper@example.com" },
  { id: "C5", name: "Alan Turing", role: "AI Research Scientist", stage: "SELECTED", source: "Recruiter", score: 99, email: "alan.turing@example.com" },
];

export const DEFAULT_LEAVES: LeaveRequest[] = [
  { id: "LR1", employeeName: "Alex Rivera", role: "DEVELOPER", dates: "Oct 10 - Oct 14", reason: "Medical leave / Surgery recovery", type: "Medical", status: "PENDING" },
  { id: "LR2", employeeName: "Elena Rostova", role: "DESIGNER", dates: "Nov 01 - Nov 05", reason: "Family vacation to Europe", type: "Vacation", status: "PENDING" },
  { id: "LR3", employeeName: "Sarah Jenkins", role: "MANAGER", dates: "Sep 28 - Sep 29", reason: "Personal family event", type: "Personal", status: "APPROVED" },
];

const EMPLOYEES_STORAGE_KEY = "varunya_employees_data_v1";
const CANDIDATES_STORAGE_KEY = "varunya_candidates_data_v1";
const LEAVES_STORAGE_KEY = "varunya_leaves_data_v1";

export function getStoredEmployees(): Employee[] {
  if (typeof window === "undefined") return DEFAULT_EMPLOYEES;
  try {
    const raw = localStorage.getItem(EMPLOYEES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_EMPLOYEES;
  } catch (e) {
    return DEFAULT_EMPLOYEES;
  }
}

export function saveEmployees(employees: Employee[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(EMPLOYEES_STORAGE_KEY, JSON.stringify(employees));
  } catch (e) {
    console.error("Failed to save employees to localStorage:", e);
  }
}

export function getStoredCandidates(): Candidate[] {
  if (typeof window === "undefined") return DEFAULT_CANDIDATES;
  try {
    const raw = localStorage.getItem(CANDIDATES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_CANDIDATES;
  } catch (e) {
    return DEFAULT_CANDIDATES;
  }
}

export function saveCandidates(candidates: Candidate[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CANDIDATES_STORAGE_KEY, JSON.stringify(candidates));
  } catch (e) {
    console.error("Failed to save candidates to localStorage:", e);
  }
}

export function getStoredLeaves(): LeaveRequest[] {
  if (typeof window === "undefined") return DEFAULT_LEAVES;
  try {
    const raw = localStorage.getItem(LEAVES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_LEAVES;
  } catch (e) {
    return DEFAULT_LEAVES;
  }
}

export function saveLeaves(leaves: LeaveRequest[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(LEAVES_STORAGE_KEY, JSON.stringify(leaves));
  } catch (e) {
    console.error("Failed to save leaves to localStorage:", e);
  }
}
