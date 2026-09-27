export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience?: string;
  salaryRange?: string;
  summary: string;
  responsibilities?: string[];
  requirements: string[];
  status: "OPEN" | "PAUSED" | "CLOSED";
  postedAt?: string;
}

export interface PerkItem {
  id: string;
  title: string;
  description: string;
  iconName?: string;
}

export interface JobApplicant {
  id: string;
  jobId?: string;
  jobTitle: string;
  name: string;
  email: string;
  phone?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  coverNote?: string;
  status: "NEW" | "REVIEWING" | "SHORTLISTED" | "INTERVIEWED" | "HIRED" | "REJECTED";
  submittedAt: string;
}

export const DEFAULT_CAREERS: JobOpening[] = [
  {
    id: "J-1",
    title: "Senior Full-Stack Architect",
    department: "Engineering",
    location: "Remote / Hybrid",
    type: "Full-time",
    experience: "4+ Years",
    salaryRange: "$90,000 - $130,000",
    summary: "Lead end-to-end architecture and rapid 30-day production deployments for enterprise custom web platforms using Next.js, Node.js, and scalable cloud databases.",
    requirements: [
      "Next.js App Router & TypeScript",
      "Tailwind CSS & Modern UI Architecture",
      "PostgreSQL, Supabase or Firebase",
      "REST & GraphQL API Design",
      "Production deployment on Vercel/Cloud"
    ],
    responsibilities: [
      "Architect and build client web applications within agile 30–40 day delivery cycles.",
      "Ensure adherence to strict security standards, input sanitization, and OAuth authentication.",
      "Conduct code quality reviews and mentor junior developers."
    ],
    status: "OPEN",
    postedAt: "2026-09-01"
  },
  {
    id: "J-2",
    title: "UI/UX & Product Designer",
    department: "Creative Studio",
    location: "Remote",
    type: "Full-time",
    experience: "2+ Years",
    salaryRange: "$70,000 - $95,000",
    summary: "Design state-of-the-art web interfaces, interactive prototypes, and design systems with high aesthetic value and optimal user conversion.",
    requirements: [
      "Figma & Prototyping Tools",
      "Design Systems & Token Standards",
      "Responsive Web & Mobile Layouts",
      "Basic HTML/CSS understanding"
    ],
    responsibilities: [
      "Translate client requirements into high-fidelity UI designs and interactive mockups.",
      "Collaborate directly with frontend engineers to guarantee design fidelity.",
      "Refine typography, micro-interactions, and visual storytelling."
    ],
    status: "OPEN",
    postedAt: "2026-09-05"
  },
  {
    id: "J-3",
    title: "Full-Stack Development Intern",
    department: "Engineering",
    location: "Remote",
    type: "Internship",
    experience: "0-1 Years",
    salaryRange: "$2,000 - $3,500/mo",
    summary: "Work alongside senior engineers to ship features, build responsive UI components, write tests, and gain hands-on experience in production environments.",
    requirements: [
      "Proficiency in JavaScript/TypeScript",
      "Familiarity with React.js or Next.js",
      "Eagerness to learn and move fast"
    ],
    responsibilities: [
      "Assist in building and testing modular UI components.",
      "Implement REST API endpoints and database queries.",
      "Participate in daily standups and sprint planning."
    ],
    status: "OPEN",
    postedAt: "2026-09-10"
  }
];

export const DEFAULT_PERKS: PerkItem[] = [
  { id: "p1", title: "100% Remote Flexibility", description: "Work comfortably from anywhere in the world with flexible hours." },
  { id: "p2", title: "$2,500/yr Tech Stipend", description: "Top-tier hardware, MacBook Pro, and AI tooling subscriptions." },
  { id: "p3", title: "Performance Sprint Bonuses", description: "Quarterly profit-sharing upon hitting 30-day delivery milestones." }
];

export const DEFAULT_APPLICANTS: JobApplicant[] = [
  {
    id: "APP-101",
    jobTitle: "Senior Full-Stack Architect",
    name: "Alex Rivera",
    email: "alex.rivera@example.com",
    phone: "+1 (555) 234-5678",
    portfolioUrl: "https://github.com/alexrivera-dev",
    coverNote: "5 years building high performance SaaS apps with Next.js and Tailwind.",
    status: "SHORTLISTED",
    submittedAt: "2026-09-18T10:30:00Z"
  },
  {
    id: "APP-102",
    jobTitle: "UI/UX & Product Designer",
    name: "Sarah Chen",
    email: "sarah.chen@designstudio.io",
    phone: "+1 (555) 876-5432",
    portfolioUrl: "https://dribbble.com/sarahchen",
    coverNote: "Specialized in dark-mode enterprise UI and interactive prototyping in Figma.",
    status: "REVIEWING",
    submittedAt: "2026-09-20T14:15:00Z"
  }
];

const CAREERS_STORAGE_KEY = "velocity_careers_data";
const PERKS_STORAGE_KEY = "velocity_careers_perks";
const APPLICANTS_STORAGE_KEY = "velocity_careers_applicants";
const CAREERS_EVENT_NAME = "velocity_careers_updated";

export function getStoredCareers(): JobOpening[] {
  if (typeof window === "undefined") return DEFAULT_CAREERS;
  try {
    const raw = localStorage.getItem(CAREERS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_CAREERS;
  } catch (e) {
    return DEFAULT_CAREERS;
  }
}

export function saveCareers(careers: JobOpening[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CAREERS_STORAGE_KEY, JSON.stringify(careers));
    window.dispatchEvent(new CustomEvent(CAREERS_EVENT_NAME, { detail: { type: "careers", data: careers } }));
  } catch (e) {
    console.error("Failed to save careers:", e);
  }
}

export function getStoredPerks(): PerkItem[] {
  if (typeof window === "undefined") return DEFAULT_PERKS;
  try {
    const raw = localStorage.getItem(PERKS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_PERKS;
  } catch (e) {
    return DEFAULT_PERKS;
  }
}

export function savePerks(perks: PerkItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PERKS_STORAGE_KEY, JSON.stringify(perks));
    window.dispatchEvent(new CustomEvent(CAREERS_EVENT_NAME, { detail: { type: "perks", data: perks } }));
  } catch (e) {
    console.error("Failed to save perks:", e);
  }
}

export function getStoredApplicants(): JobApplicant[] {
  if (typeof window === "undefined") return DEFAULT_APPLICANTS;
  try {
    const raw = localStorage.getItem(APPLICANTS_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_APPLICANTS;
  } catch (e) {
    return DEFAULT_APPLICANTS;
  }
}

export function saveApplicants(applicants: JobApplicant[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(APPLICANTS_STORAGE_KEY, JSON.stringify(applicants));
    window.dispatchEvent(new CustomEvent(CAREERS_EVENT_NAME, { detail: { type: "applicants", data: applicants } }));
  } catch (e) {
    console.error("Failed to save applicants:", e);
  }
}

export function submitNewApplication(applicant: Omit<JobApplicant, "id" | "submittedAt" | "status">): JobApplicant {
  const current = getStoredApplicants();
  const newApp: JobApplicant = {
    ...applicant,
    id: `APP-${Date.now().toString().slice(-4)}`,
    status: "NEW",
    submittedAt: new Date().toISOString()
  };
  const updated = [newApp, ...current];
  saveApplicants(updated);
  return newApp;
}
