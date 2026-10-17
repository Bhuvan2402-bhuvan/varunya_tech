"use client";

import React, { useState, useEffect } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  Check, 
  Plus, 
  Download,
  AlertCircle,
  FileCheck,
  Briefcase,
  Edit3,
  Trash2,
  Search,
  Filter,
  CreditCard,
  Building2,
  Calendar,
  AlertTriangle,
  Receipt,
  FileText
} from "lucide-react";
import { 
  InvoiceItem, 
  ExpenseItem, 
  ProjectProfitabilityItem,
  getStoredInvoices, 
  saveInvoices, 
  getStoredExpenses, 
  saveExpenses, 
  getStoredProfitability, 
  saveProfitability 
} from "@/lib/data/finance-data";
import { useAdminSession } from "../AdminSessionContext";

const EXPENSE_CATEGORIES = [
  "Hosting & Cloud",
  "Software Licenses",
  "Sales & Marketing",
  "Salaries (Staff)",
  "Legal & Consulting",
  "Office & Hardware",
  "Contractor Stipends",
  "Miscellaneous"
];

export default function AdminFinancePage() {
  const { activeRole } = useAdminSession();
  const [activeView, setActiveView] = useState<"invoices" | "expenses" | "profitability">("invoices");

  // State
  const [invoices, setInvoices] = useState<InvoiceItem[]>([]);
  const [expenses, setExpenses] = useState<ExpenseItem[]>([]);
  const [profitability, setProfitability] = useState<ProjectProfitabilityItem[]>([]);

  // Search and Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [expenseCategoryFilter, setExpenseCategoryFilter] = useState("ALL");

  // Invoices Modals
  const [invoiceModalOpen, setInvoiceModalOpen] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<InvoiceItem | null>(null);
  const [deleteInvoiceConfirm, setDeleteInvoiceConfirm] = useState<InvoiceItem | null>(null);

  // Invoice Form Fields
  const [invNo, setInvNo] = useState("");
  const [invClient, setInvClient] = useState("");
  const [invProject, setInvProject] = useState("");
  const [invAmount, setInvAmount] = useState<number>(10000);
  const [invIssueDate, setInvIssueDate] = useState("");
  const [invDueDate, setInvDueDate] = useState("");
  const [invStatus, setInvStatus] = useState<"PAID" | "PENDING" | "OVERDUE">("PENDING");
  const [invNotes, setInvNotes] = useState("");

  // Expense Modals
  const [expenseModalOpen, setExpenseModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<ExpenseItem | null>(null);
  const [deleteExpenseConfirm, setDeleteExpenseConfirm] = useState<ExpenseItem | null>(null);

  // Expense Form Fields
  const [expCategory, setExpCategory] = useState("Hosting & Cloud");
  const [expDesc, setExpDesc] = useState("");
  const [expAmount, setExpAmount] = useState<number>(1200);
  const [expDate, setExpDate] = useState("");
  const [expVendor, setExpVendor] = useState("");
  const [expStatus, setExpStatus] = useState<"CLEARED" | "PENDING">("CLEARED");

  // Profitability Modals
  const [profitModalOpen, setProfitModalOpen] = useState(false);
  const [editingProfit, setEditingProfit] = useState<ProjectProfitabilityItem | null>(null);
  const [deleteProfitConfirm, setDeleteProfitConfirm] = useState<ProjectProfitabilityItem | null>(null);

  // Profitability Form Fields
  const [profTitle, setProfTitle] = useState("");
  const [profClient, setProfClient] = useState("");
  const [profBudget, setProfBudget] = useState<number>(30000);
  const [profWages, setProfWages] = useState<number>(12000);
  const [profCloud, setProfCloud] = useState<number>(1200);
  const [profTooling, setProfTooling] = useState<number>(400);

  useEffect(() => {
    setInvoices(getStoredInvoices());
    setExpenses(getStoredExpenses());
    setProfitability(getStoredProfitability());
  }, []);

  // ---------------- INVOICE CRUD ----------------
  const handleOpenAddInvoice = () => {
    setEditingInvoice(null);
    setInvNo(`INV-2026-${Math.floor(100 + Math.random() * 900)}`);
    setInvClient("");
    setInvProject("Custom Web Application");
    setInvAmount(12500);
    setInvIssueDate(new Date().toISOString().split("T")[0]);
    
    const due = new Date();
    due.setDate(due.getDate() + 15);
    setInvDueDate(due.toISOString().split("T")[0]);
    setInvStatus("PENDING");
    setInvNotes("Initial milestone deliverable");
    setInvoiceModalOpen(true);
  };

  const handleOpenEditInvoice = (inv: InvoiceItem) => {
    setEditingInvoice(inv);
    setInvNo(inv.invoiceNo);
    setInvClient(inv.client);
    setInvProject(inv.project);
    setInvAmount(inv.amount);
    setInvIssueDate(inv.issueDate || "");
    setInvDueDate(inv.dueDate);
    setInvStatus(inv.status);
    setInvNotes(inv.notes || "");
    setInvoiceModalOpen(true);
  };

  const handleSaveInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: InvoiceItem[] = [];

    if (editingInvoice) {
      updated = invoices.map(inv => {
        if (inv.id === editingInvoice.id) {
          return {
            ...inv,
            invoiceNo: invNo,
            client: invClient,
            project: invProject,
            amount: Number(invAmount),
            issueDate: invIssueDate,
            dueDate: invDueDate,
            status: invStatus,
            notes: invNotes
          };
        }
        return inv;
      });
    } else {
      const newInv: InvoiceItem = {
        id: `INV-${Date.now().toString().slice(-4)}`,
        invoiceNo: invNo,
        client: invClient,
        project: invProject,
        amount: Number(invAmount),
        issueDate: invIssueDate,
        dueDate: invDueDate,
        status: invStatus,
        notes: invNotes
      };
      updated = [newInv, ...invoices];
    }

    setInvoices(updated);
    saveInvoices(updated);
    setInvoiceModalOpen(false);
  };

  const handleDeleteInvoice = (id: string) => {
    const updated = invoices.filter(inv => inv.id !== id);
    setInvoices(updated);
    saveInvoices(updated);
    setDeleteInvoiceConfirm(null);
  };

  const handleToggleInvoiceStatus = (id: string, newStatus: "PAID" | "PENDING" | "OVERDUE") => {
    const updated = invoices.map(inv => {
      if (inv.id === id) {
        return { ...inv, status: newStatus };
      }
      return inv;
    });
    setInvoices(updated);
    saveInvoices(updated);
  };

  // ---------------- EXPENSE CRUD ----------------
  const handleOpenAddExpense = () => {
    setEditingExpense(null);
    setExpCategory("Hosting & Cloud");
    setExpDesc("");
    setExpAmount(1500);
    setExpDate(new Date().toISOString().split("T")[0]);
    setExpVendor("Cloud Infrastructure");
    setExpStatus("CLEARED");
    setExpenseModalOpen(true);
  };

  const handleOpenEditExpense = (exp: ExpenseItem) => {
    setEditingExpense(exp);
    setExpCategory(exp.category);
    setExpDesc(exp.description);
    setExpAmount(exp.amount);
    setExpDate(exp.date);
    setExpVendor(exp.vendor || "");
    setExpStatus(exp.status);
    setExpenseModalOpen(true);
  };

  const handleSaveExpense = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: ExpenseItem[] = [];

    if (editingExpense) {
      updated = expenses.map(exp => {
        if (exp.id === editingExpense.id) {
          return {
            ...exp,
            category: expCategory,
            description: expDesc,
            amount: Number(expAmount),
            date: expDate,
            vendor: expVendor,
            status: expStatus
          };
        }
        return exp;
      });
    } else {
      const newExp: ExpenseItem = {
        id: `E-${Date.now().toString().slice(-4)}`,
        category: expCategory,
        description: expDesc,
        amount: Number(expAmount),
        date: expDate,
        vendor: expVendor,
        status: expStatus
      };
      updated = [newExp, ...expenses];
    }

    setExpenses(updated);
    saveExpenses(updated);
    setExpenseModalOpen(false);
  };

  const handleDeleteExpense = (id: string) => {
    const updated = expenses.filter(exp => exp.id !== id);
    setExpenses(updated);
    saveExpenses(updated);
    setDeleteExpenseConfirm(null);
  };

  const handleClearExpense = (id: string) => {
    const updated = expenses.map(exp => {
      if (exp.id === id) {
        return { ...exp, status: "CLEARED" as const };
      }
      return exp;
    });
    setExpenses(updated);
    saveExpenses(updated);
  };

  // ---------------- PROFITABILITY CRUD ----------------
  const handleOpenAddProfit = () => {
    setEditingProfit(null);
    setProfTitle("New Client Platform");
    setProfClient("Client Corporation");
    setProfBudget(35000);
    setProfWages(14000);
    setProfCloud(1500);
    setProfTooling(500);
    setProfitModalOpen(true);
  };

  const handleOpenEditProfit = (item: ProjectProfitabilityItem) => {
    setEditingProfit(item);
    setProfTitle(item.title);
    setProfClient(item.client);
    setProfBudget(item.budget);
    setProfWages(item.engWages);
    setProfCloud(item.cloudCosts);
    setProfTooling(item.toolingCosts || 0);
    setProfitModalOpen(true);
  };

  const handleSaveProfit = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: ProjectProfitabilityItem[] = [];

    if (editingProfit) {
      updated = profitability.map(p => {
        if (p.id === editingProfit.id) {
          return {
            ...p,
            title: profTitle,
            client: profClient,
            budget: Number(profBudget),
            engWages: Number(profWages),
            cloudCosts: Number(profCloud),
            toolingCosts: Number(profTooling)
          };
        }
        return p;
      });
    } else {
      const newP: ProjectProfitabilityItem = {
        id: `PP-${Date.now().toString().slice(-4)}`,
        title: profTitle,
        client: profClient,
        budget: Number(profBudget),
        engWages: Number(profWages),
        cloudCosts: Number(profCloud),
        toolingCosts: Number(profTooling)
      };
      updated = [newP, ...profitability];
    }

    setProfitability(updated);
    saveProfitability(updated);
    setProfitModalOpen(false);
  };

  const handleDeleteProfit = (id: string) => {
    const updated = profitability.filter(p => p.id !== id);
    setProfitability(updated);
    saveProfitability(updated);
    setDeleteProfitConfirm(null);
  };

  // Export CSV Report
  const handleExportCSV = () => {
    const invoiceRows = invoices.map(i => `"${i.invoiceNo}","${i.client}","${i.project}",${i.amount},"${i.dueDate}","${i.status}"`).join("\n");
    const csvContent = "data:text/csv;charset=utf-8,InvoiceNo,Client,Project,Amount,DueDate,Status\n" + invoiceRows;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Financial_Ledger_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Financial Calculations
  const grossRevenue = invoices.reduce((acc, curr) => acc + curr.amount, 0);
  const totalPaidRevenue = invoices.filter(i => i.status === "PAID").reduce((acc, curr) => acc + curr.amount, 0);
  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const outstandingReceivables = invoices.filter(i => i.status !== "PAID").reduce((acc, curr) => acc + curr.amount, 0);
  const netCashFlow = grossRevenue - totalExpenses;

  // Filtered lists
  const filteredInvoices = invoices.filter(inv => {
    const matchSearch = inv.invoiceNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        inv.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        inv.project.toLowerCase().includes(searchQuery.toLowerCase());
    const matchStatus = statusFilter === "ALL" || inv.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const filteredExpenses = expenses.filter(exp => {
    const matchSearch = exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        (exp.vendor && exp.vendor.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchCategory = expenseCategoryFilter === "ALL" || exp.category === expenseCategoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-8 font-sans pb-16">
      {/* 1. TOP STATS OVERVIEW GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6 border-[#E5E2DB] bg-[#FFFFFF] space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#71757E] uppercase tracking-wider font-mono font-medium">Gross Invoiced Revenue</span>
            <div className="p-2 rounded-lg bg-[#F5F3EF] border border-[#E5E2DB] text-[#0F766E]">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#111215] font-display">${grossRevenue.toLocaleString()}</div>
          <div className="text-[10px] font-mono text-[#0F766E] flex items-center gap-1 font-bold">
            ${totalPaidRevenue.toLocaleString()} Cleared & Paid
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-[#E5E2DB] bg-[#FFFFFF] space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#71757E] uppercase tracking-wider font-mono font-medium">Operating Outflow</span>
            <div className="p-2 rounded-lg bg-[#F5F3EF] border border-[#E5E2DB] text-[#DB0038]">
              <TrendingDown className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#111215] font-display">${totalExpenses.toLocaleString()}</div>
          <div className="text-[10px] font-mono text-[#71757E]">
            {expenses.length} Expense Allocations
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-[#E5E2DB] bg-[#FFFFFF] space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#71757E] uppercase tracking-wider font-mono font-medium">Outstanding Receivables</span>
            <div className="p-2 rounded-lg bg-[#F5F3EF] border border-[#E5E2DB] text-[#C89B3C]">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-[#111215] font-display">${outstandingReceivables.toLocaleString()}</div>
          <div className="text-[10px] font-mono text-[#B45309] font-bold">
            {invoices.filter(i => i.status !== "PAID").length} Invoices Pending Clearance
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-[#E5E2DB] bg-[#FFFFFF] space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs text-[#71757E] uppercase tracking-wider font-mono font-medium">Net Operating Margin</span>
            <div className="p-2 rounded-lg bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9]">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-bold font-display ${netCashFlow >= 0 ? "text-[#0F766E]" : "text-[#DB0038]"}`}>
            ${netCashFlow.toLocaleString()}
          </div>
          <div className="text-[10px] font-mono text-[#71757E]">
            {grossRevenue > 0 ? `${((netCashFlow / grossRevenue) * 100).toFixed(1)}% Operating Margin` : "Healthy SLA Runway"}
          </div>
        </GlassCard>
      </div>

      {/* 2. SECTION TABS & EXPORT ACTION */}
      <div className="flex justify-between items-center flex-wrap gap-4 border-b border-[#E5E2DB] pb-4">
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant={activeView === "invoices" ? "gradient" : "outline"} 
            size="sm"
            onClick={() => { setActiveView("invoices"); setSearchQuery(""); }}
            icon={<FileCheck className="w-3.5 h-3.5" />}
          >
            Client Invoices Registry ({invoices.length})
          </Button>
          <Button 
            variant={activeView === "expenses" ? "gradient" : "outline"} 
            size="sm"
            onClick={() => { setActiveView("expenses"); setSearchQuery(""); }}
            icon={<TrendingDown className="w-3.5 h-3.5" />}
          >
            Operating Expenses ({expenses.length})
          </Button>
          <Button 
            variant={activeView === "profitability" ? "gradient" : "outline"} 
            size="sm"
            onClick={() => { setActiveView("profitability"); setSearchQuery(""); }}
            icon={<Briefcase className="w-3.5 h-3.5" />}
          >
            Project Profitability Margins ({profitability.length})
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={handleExportCSV} icon={<Download className="w-4 h-4" />}>
            Export Financial Report (CSV)
          </Button>
        </div>
      </div>

      {/* 3A. BILLING & INVOICES VIEW */}
      {activeView === "invoices" && (
        <GlassCard className="p-6 border-[#E5E2DB] bg-[#FFFFFF] shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-display">
                <FileCheck className="w-5 h-5 text-[#519DD9]" /> Client Billing & Invoices Customizer
              </h3>
              <p className="text-xs text-[#565961]">Create, edit amounts, update payment statuses, and manage invoice line scopes.</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search invoice, client, project..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-xs text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
                />
                <Search className="w-3.5 h-3.5 text-[#71757E] absolute left-2.5 top-2" />
              </div>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-xs font-mono text-[#111215] focus:outline-none focus:border-[#519DD9] transition shadow-xs cursor-pointer"
              >
                <option value="ALL">All Statuses</option>
                <option value="PAID">PAID</option>
                <option value="PENDING">PENDING</option>
                <option value="OVERDUE">OVERDUE</option>
              </select>

              <Button size="sm" variant="gradient" onClick={handleOpenAddInvoice} icon={<Plus className="w-4 h-4" />}>
                Create Invoice
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E5E2DB]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E2DB] bg-[#F5F3EF] text-[#71757E] font-mono text-[10px] uppercase font-bold">
                  <th className="py-3 px-4">Invoice No</th>
                  <th className="py-3 px-4">Client</th>
                  <th className="py-3 px-4">Project Scope</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4">Due Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2DB] text-[#4A4D54]">
                {filteredInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-[#F5F3EF]/60 transition bg-[#FFFFFF]">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#111215]">{inv.invoiceNo}</td>
                    <td className="py-3.5 px-4 font-bold text-[#111215]">{inv.client}</td>
                    <td className="py-3.5 px-4 text-[#565961]">
                      <div className="font-medium text-[#111215]">{inv.project}</div>
                      {inv.notes && <div className="text-[10px] text-[#71757E] italic">{inv.notes}</div>}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-[#111215] text-sm">
                      ${inv.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#71757E]">{inv.dueDate}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded font-mono text-[9px] font-bold ${
                        inv.status === "PAID" ? "bg-[#53BAC1]/10 text-[#0F766E] border border-[#53BAC1]/30" :
                        inv.status === "PENDING" ? "bg-[#C89B3C]/10 text-[#B45309] border border-[#C89B3C]/30" :
                        "bg-[#DB0038]/10 text-[#DB0038] border border-[#DB0038]/30"
                      }`}>
                        ● {inv.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {inv.status !== "PAID" ? (
                          <button
                            onClick={() => handleToggleInvoiceStatus(inv.id, "PAID")}
                            className="px-2 py-1 bg-[#53BAC1]/10 hover:bg-[#53BAC1]/20 border border-[#53BAC1]/30 text-[#0F766E] rounded text-[10px] font-bold transition"
                          >
                            Mark Paid
                          </button>
                        ) : (
                          <button
                            onClick={() => handleToggleInvoiceStatus(inv.id, "PENDING")}
                            className="px-2 py-1 bg-[#C89B3C]/10 hover:bg-[#C89B3C]/20 border border-[#C89B3C]/30 text-[#B45309] rounded text-[10px] font-bold transition"
                          >
                            Mark Pending
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEditInvoice(inv)}
                          className="p-1.5 bg-[#FFFFFF] hover:bg-[#F5F3EF] border border-[#E5E2DB] text-[#565961] hover:text-[#111215] rounded-lg text-xs transition"
                          title="Edit invoice"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteInvoiceConfirm(inv)}
                          className="p-1.5 bg-[#DB0038]/10 hover:bg-[#DB0038]/20 border border-[#DB0038]/30 text-[#DB0038] rounded-lg text-xs transition"
                          title="Delete invoice"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredInvoices.length === 0 && (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-[#71757E] font-mono text-xs">
                      No invoices found matching your query.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* 3B. OPERATING EXPENSES VIEW */}
      {activeView === "expenses" && (
        <GlassCard className="p-6 border-[#E5E2DB] bg-[#FFFFFF] shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <h3 className="text-base font-bold text-[#111215] flex items-center gap-2 font-display">
                <TrendingDown className="w-5 h-5 text-[#DB0038]" /> Operating Expense Allocations
              </h3>
              <p className="text-xs text-[#565961]">Record overhead expenses, manage vendor disbursements, and approve clearances.</p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div className="relative w-full sm:w-64">
                <input
                  type="text"
                  placeholder="Search expense description, vendor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-xs text-[#111215] placeholder-[#9E9E9E] focus:outline-none focus:border-[#519DD9] transition shadow-xs"
                />
                <Search className="w-3.5 h-3.5 text-[#71757E] absolute left-2.5 top-2" />
              </div>

              <select
                value={expenseCategoryFilter}
                onChange={(e) => setExpenseCategoryFilter(e.target.value)}
                className="px-3 py-1.5 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-xs font-mono text-[#111215] focus:outline-none focus:border-[#519DD9] transition shadow-xs cursor-pointer"
              >
                <option value="ALL">All Categories</option>
                {EXPENSE_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>

              <Button size="sm" variant="gradient" onClick={handleOpenAddExpense} icon={<Plus className="w-4 h-4" />}>
                Record Expense
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#E5E2DB]">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#E5E2DB] bg-[#F5F3EF] text-[#71757E] font-mono text-[10px] uppercase font-bold">
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Description & Vendor</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E5E2DB] text-[#4A4D54]">
                {filteredExpenses.map((exp) => (
                  <tr key={exp.id} className="hover:bg-[#F5F3EF]/60 transition bg-[#FFFFFF]">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#111215]">{exp.category}</td>
                    <td className="py-3.5 px-4 text-[#4A4D54]">
                      <div className="font-medium text-[#111215]">{exp.description}</div>
                      {exp.vendor && <div className="text-[10px] text-[#71757E] font-mono">{exp.vendor}</div>}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-[#111215] text-sm">
                      ${exp.amount.toLocaleString()}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#71757E]">{exp.date}</td>
                    <td className="py-3.5 px-4">
                      <span className={`px-2.5 py-0.5 rounded font-mono text-[9px] font-bold ${
                        exp.status === "CLEARED" ? "bg-[#53BAC1]/10 text-[#0F766E] border border-[#53BAC1]/30" :
                        "bg-[#C89B3C]/10 text-[#B45309] border border-[#C89B3C]/30"
                      }`}>
                        ● {exp.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        {exp.status !== "CLEARED" && (
                          <button
                            onClick={() => handleClearExpense(exp.id)}
                            className="px-2 py-1 bg-[#53BAC1]/10 hover:bg-[#53BAC1]/20 border border-[#53BAC1]/30 text-[#0F766E] rounded text-[10px] font-bold transition"
                          >
                            Clear
                          </button>
                        )}
                        <button
                          onClick={() => handleOpenEditExpense(exp)}
                          className="p-1.5 bg-[#FFFFFF] hover:bg-[#F5F3EF] border border-[#E5E2DB] text-[#565961] hover:text-[#111215] rounded-lg text-xs transition"
                          title="Edit expense"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteExpenseConfirm(exp)}
                          className="p-1.5 bg-[#DB0038]/10 hover:bg-[#DB0038]/20 border border-[#DB0038]/30 text-[#DB0038] rounded-lg text-xs transition"
                          title="Delete expense"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {filteredExpenses.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-[#71757E] font-mono text-xs">
                      No expense records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </GlassCard>
      )}

      {/* 3C. PROJECT PROFITABILITY VIEW */}
      {activeView === "profitability" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FFFFFF] p-5 border border-[#E5E2DB] rounded-2xl shadow-xs flex-wrap">
            <div>
              <h3 className="text-base font-bold text-[#111215] font-display">Project Profitability & Margin Calculator</h3>
              <p className="text-xs text-[#565961]">Track gross SLA budget, engineering wages, and net retained profit margin per project.</p>
            </div>
            <Button size="sm" variant="gradient" onClick={handleOpenAddProfit} icon={<Plus className="w-4 h-4" />}>
              Add Project Ledger
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {profitability.map((p) => {
              const totalCost = p.engWages + p.cloudCosts + (p.toolingCosts || 0);
              const margin = p.budget - totalCost;
              const marginPct = p.budget > 0 ? Math.round((margin / p.budget) * 100) : 0;

              return (
                <GlassCard key={p.id} className="p-6 border-[#E5E2DB] bg-[#FFFFFF] shadow-xs space-y-4 hover:border-[#519DD9] transition flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="text-[10px] font-mono text-[#519DD9] uppercase font-bold">{p.client}</div>
                        <h4 className="text-base font-bold text-[#111215] font-display mt-0.5">{p.title}</h4>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleOpenEditProfit(p)}
                          className="p-1.5 bg-[#FFFFFF] hover:bg-[#F5F3EF] border border-[#E5E2DB] text-[#565961] hover:text-[#111215] rounded-lg text-xs transition"
                          title="Edit project margin"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteProfitConfirm(p)}
                          className="p-1.5 bg-[#DB0038]/10 hover:bg-[#DB0038]/20 border border-[#DB0038]/30 text-[#DB0038] rounded-lg text-xs transition"
                          title="Delete record"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-[#71757E]">Total SLA Budget:</span>
                        <span className="text-[#111215] font-bold">${p.budget.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#71757E]">Eng Wages:</span>
                        <span className="text-[#4A4D54] font-semibold">${p.engWages.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#71757E]">Cloud Costs:</span>
                        <span className="text-[#4A4D54] font-semibold">${p.cloudCosts.toLocaleString()}</span>
                      </div>
                      {p.toolingCosts ? (
                        <div className="flex justify-between">
                          <span className="text-[#71757E]">Tooling & Ops:</span>
                          <span className="text-[#4A4D54] font-semibold">${p.toolingCosts.toLocaleString()}</span>
                        </div>
                      ) : null}
                      <div className="border-t border-[#E5E2DB] pt-2 flex justify-between">
                        <span className="text-[#519DD9] font-bold">Retained Margin:</span>
                        <span className={`font-bold ${margin >= 0 ? "text-[#0F766E]" : "text-[#DB0038]"}`}>
                          ${margin.toLocaleString()} ({marginPct}%)
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1.5 pt-2">
                    <div className="flex justify-between text-[10px] font-mono text-[#71757E]">
                      <span>Margin Health</span>
                      <span className={marginPct >= 40 ? "text-[#0F766E] font-bold" : "text-[#B45309] font-bold"}>
                        {marginPct}% Net
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#E5E2DB] rounded-full overflow-hidden border border-[#E5E2DB]">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          marginPct >= 50 ? "bg-[#0F766E]" : marginPct >= 30 ? "bg-[#519DD9]" : "bg-[#C89B3C]"
                        }`}
                        style={{ width: `${Math.max(0, Math.min(100, marginPct))}%` }}
                      />
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        </div>
      )}

      {/* ------------------ MODALS ------------------ */}

      {/* Add / Edit Invoice Modal */}
      <Modal
        isOpen={invoiceModalOpen}
        onClose={() => setInvoiceModalOpen(false)}
        title={editingInvoice ? `Edit Invoice (${editingInvoice.invoiceNo})` : "Create New Client Invoice"}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveInvoice} className="space-y-4 font-sans text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Invoice Number *</label>
              <input
                required
                type="text"
                value={invNo}
                onChange={(e) => setInvNo(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Client Name *</label>
              <input
                required
                type="text"
                placeholder="ApexPay Inc"
                value={invClient}
                onChange={(e) => setInvClient(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] focus:border-[#519DD9] focus:outline-none transition shadow-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-[#111215]">Project Scope / Title *</label>
            <input
              required
              type="text"
              placeholder="ApexPay FinTech Portal"
              value={invProject}
              onChange={(e) => setInvProject(e.target.value)}
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] focus:border-[#519DD9] focus:outline-none transition shadow-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Amount ($ USD) *</label>
              <input
                required
                type="number"
                min="0"
                step="50"
                value={invAmount}
                onChange={(e) => setInvAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono font-bold focus:border-[#519DD9] focus:outline-none transition shadow-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Due Date *</label>
              <input
                required
                type="date"
                value={invDueDate}
                onChange={(e) => setInvDueDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none transition shadow-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Status</label>
              <select
                value={invStatus}
                onChange={(e) => setInvStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none transition shadow-xs cursor-pointer"
              >
                <option value="PENDING">PENDING</option>
                <option value="PAID">PAID</option>
                <option value="OVERDUE">OVERDUE</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-[#111215]">Invoice Memo / Notes</label>
            <input
              type="text"
              placeholder="Milestone sprint deliverables, payment terms..."
              value={invNotes}
              onChange={(e) => setInvNotes(e.target.value)}
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] focus:border-[#519DD9] focus:outline-none transition shadow-xs"
            />
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setInvoiceModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1" size="sm">
              Save Invoice
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Invoice Confirmation Modal */}
      <Modal
        isOpen={!!deleteInvoiceConfirm}
        onClose={() => setDeleteInvoiceConfirm(null)}
        title="Confirm Invoice Deletion"
        maxWidth="sm"
      >
        <div className="space-y-4 text-xs font-sans">
          <div className="p-3.5 bg-[#DB0038]/10 border border-[#DB0038]/30 rounded-xl text-[#DB0038] flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              Are you sure you want to permanently delete invoice <strong className="text-[#111215] font-bold">{deleteInvoiceConfirm?.invoiceNo}</strong> (${deleteInvoiceConfirm?.amount.toLocaleString()} - {deleteInvoiceConfirm?.client})?
            </div>
          </div>
          <div className="pt-2 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setDeleteInvoiceConfirm(null)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="primary" 
              className="flex-1 bg-[#DB0038] hover:bg-[#DB0038]/90 text-white font-bold" 
              size="sm" 
              onClick={() => deleteInvoiceConfirm && handleDeleteInvoice(deleteInvoiceConfirm.id)}
            >
              Delete Record
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add / Edit Expense Modal */}
      <Modal
        isOpen={expenseModalOpen}
        onClose={() => setExpenseModalOpen(false)}
        title={editingExpense ? "Edit Expense Allocation" : "Record Operating Expense"}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveExpense} className="space-y-4 font-sans text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Expense Category *</label>
              <select
                value={expCategory}
                onChange={(e) => setExpCategory(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] focus:border-[#519DD9] focus:outline-none transition shadow-xs cursor-pointer"
              >
                {EXPENSE_CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Vendor / Payee</label>
              <input
                type="text"
                placeholder="AWS / GitHub / Vercel"
                value={expVendor}
                onChange={(e) => setExpVendor(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] focus:border-[#519DD9] focus:outline-none transition shadow-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-[#111215]">Description *</label>
            <input
              required
              type="text"
              placeholder="Enterprise cloud server cluster hosting..."
              value={expDesc}
              onChange={(e) => setExpDesc(e.target.value)}
              className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] focus:border-[#519DD9] focus:outline-none transition shadow-xs"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Amount ($ USD) *</label>
              <input
                required
                type="number"
                min="0"
                step="50"
                value={expAmount}
                onChange={(e) => setExpAmount(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono font-bold focus:border-[#519DD9] focus:outline-none transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Expense Date *</label>
              <input
                required
                type="date"
                value={expDate}
                onChange={(e) => setExpDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Clearance Status</label>
              <select
                value={expStatus}
                onChange={(e) => setExpStatus(e.target.value as any)}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none transition shadow-xs cursor-pointer"
              >
                <option value="CLEARED">CLEARED</option>
                <option value="PENDING">PENDING</option>
              </select>
            </div>
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setExpenseModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1" size="sm">
              Save Expense
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Expense Confirmation Modal */}
      <Modal
        isOpen={!!deleteExpenseConfirm}
        onClose={() => setDeleteExpenseConfirm(null)}
        title="Confirm Expense Deletion"
        maxWidth="sm"
      >
        <div className="space-y-4 text-xs font-sans">
          <div className="p-3.5 bg-[#DB0038]/10 border border-[#DB0038]/30 rounded-xl text-[#DB0038] flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              Are you sure you want to delete expense record <strong className="text-[#111215] font-bold">{deleteExpenseConfirm?.description}</strong> (${deleteExpenseConfirm?.amount.toLocaleString()})?
            </div>
          </div>
          <div className="pt-2 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setDeleteExpenseConfirm(null)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="primary" 
              className="flex-1 bg-[#DB0038] hover:bg-[#DB0038]/90 text-white font-bold" 
              size="sm" 
              onClick={() => deleteExpenseConfirm && handleDeleteExpense(deleteExpenseConfirm.id)}
            >
              Delete Record
            </Button>
          </div>
        </div>
      </Modal>

      {/* Add / Edit Profitability Modal */}
      <Modal
        isOpen={profitModalOpen}
        onClose={() => setProfitModalOpen(false)}
        title={editingProfit ? `Edit Profitability (${editingProfit.title})` : "Add Project Profitability Ledger"}
        maxWidth="lg"
      >
        <form onSubmit={handleSaveProfit} className="space-y-4 font-sans text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Project Title *</label>
              <input
                required
                type="text"
                value={profTitle}
                onChange={(e) => setProfTitle(e.target.value)}
                placeholder="Enterprise ERP Platform"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] focus:border-[#519DD9] focus:outline-none transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Client *</label>
              <input
                required
                type="text"
                value={profClient}
                onChange={(e) => setProfClient(e.target.value)}
                placeholder="Global Freight Systems"
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] focus:border-[#519DD9] focus:outline-none transition shadow-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Total SLA Budget ($ USD) *</label>
              <input
                required
                type="number"
                min="0"
                step="500"
                value={profBudget}
                onChange={(e) => setProfBudget(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono font-bold focus:border-[#519DD9] focus:outline-none transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Engineering Wages ($ USD) *</label>
              <input
                required
                type="number"
                min="0"
                step="500"
                value={profWages}
                onChange={(e) => setProfWages(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none transition shadow-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Cloud Infrastructure Costs ($ USD)</label>
              <input
                type="number"
                min="0"
                step="100"
                value={profCloud}
                onChange={(e) => setProfCloud(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none transition shadow-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-bold text-[#111215]">Tooling & Ops Costs ($ USD)</label>
              <input
                type="number"
                min="0"
                step="100"
                value={profTooling}
                onChange={(e) => setProfTooling(Number(e.target.value))}
                className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E5E2DB] hover:border-[#111215] rounded-xl text-[#111215] font-mono focus:border-[#519DD9] focus:outline-none transition shadow-xs"
              />
            </div>
          </div>

          <div className="p-3.5 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl text-xs font-mono flex justify-between items-center text-[#111215]">
            <span className="text-[#71757E]">Calculated Net Margin:</span>
            <span className="text-[#0F766E] font-bold">
              ${(profBudget - profWages - profCloud - profTooling).toLocaleString()} ({profBudget > 0 ? Math.round(((profBudget - profWages - profCloud - profTooling) / profBudget) * 100) : 0}%)
            </span>
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setProfitModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1" size="sm">
              Save Project Profitability
            </Button>
          </div>
        </form>
      </Modal>

      {/* Delete Profitability Confirmation Modal */}
      <Modal
        isOpen={!!deleteProfitConfirm}
        onClose={() => setDeleteProfitConfirm(null)}
        title="Confirm Project Margin Deletion"
        maxWidth="sm"
      >
        <div className="space-y-4 text-xs font-sans">
          <div className="p-3.5 bg-[#DB0038]/10 border border-[#DB0038]/30 rounded-xl text-[#DB0038] flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 shrink-0" />
            <div>
              Are you sure you want to delete the financial ledger record for <strong className="text-[#111215] font-bold">{deleteProfitConfirm?.title}</strong>?
            </div>
          </div>
          <div className="pt-2 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setDeleteProfitConfirm(null)}>
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="primary" 
              className="flex-1 bg-[#DB0038] hover:bg-[#DB0038]/90 text-white font-bold" 
              size="sm" 
              onClick={() => deleteProfitConfirm && handleDeleteProfit(deleteProfitConfirm.id)}
            >
              Delete Record
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
