export interface InvoiceItem {
  id: string;
  invoiceNo: string;
  client: string;
  project: string;
  amount: number;
  issueDate?: string;
  dueDate: string;
  status: "PAID" | "PENDING" | "OVERDUE";
  notes?: string;
}

export interface ExpenseItem {
  id: string;
  category: string;
  description: string;
  amount: number;
  date: string;
  vendor?: string;
  status: "CLEARED" | "PENDING";
}

export interface ProjectProfitabilityItem {
  id: string;
  title: string;
  client: string;
  budget: number;
  engWages: number;
  cloudCosts: number;
  toolingCosts?: number;
}

export const DEFAULT_INVOICES: InvoiceItem[] = [
  { id: "I1", invoiceNo: "INV-2026-081", client: "ApexPay Inc", project: "ApexPay FinTech Portal", amount: 14500, issueDate: "2026-07-25", dueDate: "2026-08-10", status: "PAID", notes: "Milestone 1 & 2 Delivery" },
  { id: "I2", invoiceNo: "INV-2026-082", client: "PulseHealth", project: "PulseHealth MedTech Clinic", amount: 9250, issueDate: "2026-08-01", dueDate: "2026-08-18", status: "PAID", notes: "Sprint Final Cutover" },
  { id: "I3", invoiceNo: "INV-2026-083", client: "Velocita Logistics", project: "Velocita Fleet Control", amount: 18500, issueDate: "2026-08-10", dueDate: "2026-08-25", status: "PENDING", notes: "Phase 1 Staging Milestone" },
  { id: "I4", invoiceNo: "INV-2026-084", client: "Acme FinTech Corp", project: "Custom Software", amount: 8000, issueDate: "2026-07-15", dueDate: "2026-08-01", status: "OVERDUE", notes: "Initial Architecture Sprint" },
];

export const DEFAULT_EXPENSES: ExpenseItem[] = [
  { id: "E1", category: "Hosting & Cloud", description: "AWS + Vercel Enterprise cloud edge servers", amount: 2400, date: "2026-08-01", vendor: "Vercel / AWS", status: "CLEARED" },
  { id: "E2", category: "Software Licenses", description: "Figma, Slack, GitHub Enterprise, Sentry", amount: 800, date: "2026-08-05", vendor: "GitHub & SaaS", status: "CLEARED" },
  { id: "E3", category: "Sales & Marketing", description: "Google Ads + LinkedIn corporate promotions", amount: 1200, date: "2026-08-10", vendor: "Google / LinkedIn", status: "CLEARED" },
  { id: "E4", category: "Salaries (Staff)", description: "Monthly engineering & design payroll", amount: 84000, date: "2026-08-15", vendor: "Payroll Gateway", status: "CLEARED" },
  { id: "E5", category: "Legal & Consulting", description: "Contract drafting and IP trademark review", amount: 3500, date: "2026-08-19", vendor: "Corporate Legal Counsel", status: "PENDING" },
];

export const DEFAULT_PROFITABILITY: ProjectProfitabilityItem[] = [
  { id: "PP1", title: "ApexPay FinTech Portal", client: "ApexPay Inc", budget: 30000, engWages: 12000, cloudCosts: 1200, toolingCosts: 400 },
  { id: "PP2", title: "PulseHealth MedTech Clinic", client: "PulseHealth", budget: 25000, engWages: 14500, cloudCosts: 800, toolingCosts: 300 },
  { id: "PP3", title: "Global Freight Logistics ERP", client: "Global Freight Systems", budget: 45000, engWages: 20000, cloudCosts: 2400, toolingCosts: 600 },
];

const INVOICES_STORAGE_KEY = "varunya_finance_invoices_v1";
const EXPENSES_STORAGE_KEY = "varunya_finance_expenses_v1";
const PROFITABILITY_STORAGE_KEY = "varunya_finance_profitability_v1";

export function getStoredInvoices(): InvoiceItem[] {
  if (typeof window === "undefined") return DEFAULT_INVOICES;
  try {
    const raw = localStorage.getItem(INVOICES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_INVOICES;
  } catch (e) {
    return DEFAULT_INVOICES;
  }
}

export function saveInvoices(invoices: InvoiceItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(INVOICES_STORAGE_KEY, JSON.stringify(invoices));
  } catch (e) {
    console.error("Failed to save invoices:", e);
  }
}

export function getStoredExpenses(): ExpenseItem[] {
  if (typeof window === "undefined") return DEFAULT_EXPENSES;
  try {
    const raw = localStorage.getItem(EXPENSES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_EXPENSES;
  } catch (e) {
    return DEFAULT_EXPENSES;
  }
}

export function saveExpenses(expenses: ExpenseItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(expenses));
  } catch (e) {
    console.error("Failed to save expenses:", e);
  }
}

export function getStoredProfitability(): ProjectProfitabilityItem[] {
  if (typeof window === "undefined") return DEFAULT_PROFITABILITY;
  try {
    const raw = localStorage.getItem(PROFITABILITY_STORAGE_KEY);
    return raw ? JSON.parse(raw) : DEFAULT_PROFITABILITY;
  } catch (e) {
    return DEFAULT_PROFITABILITY;
  }
}

export function saveProfitability(profitability: ProjectProfitabilityItem[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PROFITABILITY_STORAGE_KEY, JSON.stringify(profitability));
  } catch (e) {
    console.error("Failed to save profitability:", e);
  }
}
