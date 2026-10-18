"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { 
  Inbox, 
  Search, 
  RefreshCw, 
  Mail, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Tag, 
  Filter, 
  ChevronLeft, 
  ChevronRight, 
  ExternalLink, 
  Copy, 
  Check, 
  Archive, 
  Trash2, 
  AlertTriangle, 
  UserCheck, 
  Send, 
  MessageSquare, 
  ShieldCheck, 
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { useAdminSession } from "@/app/admin/AdminSessionContext";

interface LeadSummary {
  id: string;
  status: string;
  aiLeadScore: number;
  serviceNeeded?: string;
}

interface MessageNote {
  id: string;
  authorName: string;
  authorRole: string;
  content: string;
  createdAt: string;
}

interface InboxMessage {
  id: string;
  name: string;
  email: string;
  company?: string | null;
  phone?: string | null;
  subject: string;
  content: string;
  source: string;
  category: string;
  status: "NEW" | "IN_PROGRESS" | "RESOLVED" | "ARCHIVED" | "SPAM";
  isRead: boolean;
  readAt?: string | null;
  readBy?: string | null;
  assignedTo?: string | null;
  leadId?: string | null;
  lead?: LeadSummary | null;
  metadata?: string | null;
  notes?: MessageNote[];
  _count?: { notes: number };
  createdAt: string;
  updatedAt?: string;
}

interface Counts {
  all: number;
  unread: number;
  new: number;
  inProgress: number;
  resolved: number;
  archived: number;
  spam: number;
}

const STAFF_MEMBERS = [
  "Marcus Vance (ADMIN)",
  "Sarah Jenkins (MANAGER)",
  "Alex Rivera (DEVELOPER)",
  "Elena Rostova (DESIGNER)",
  "Diana Prince (SALES)",
  "Robert Chen (HR)",
  "Warren Vance (FINANCE)",
];

export default function AdminMessagesPage() {
  const { activeRole, staff } = useAdminSession();

  // Data states
  const [messages, setMessages] = useState<InboxMessage[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<InboxMessage | null>(null);
  const [counts, setCounts] = useState<Counts>({
    all: 0,
    unread: 0,
    new: 0,
    inProgress: 0,
    resolved: 0,
    archived: 0,
    spam: 0,
  });

  // Query & Filter states
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [sourceFilter, setSourceFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<string>("newest");
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Status & Interaction states
  const [loading, setLoading] = useState<boolean>(true);
  const [detailLoading, setDetailLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);

  // Note composer states
  const [newNote, setNewNote] = useState<string>("");
  const [isSubmittingNote, setIsSubmittingNote] = useState<boolean>(false);

  // Delete modal state
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  // Mobile detail view toggle
  const [mobileDetailOpen, setMobileDetailOpen] = useState<boolean>(false);

  const getAuthToken = useCallback(() => {
    return localStorage.getItem("velocity_panel_token") || `token_${activeRole || "ADMIN"}`;
  }, [activeRole]);

  // Fetch Inbox messages list
  const fetchMessages = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getAuthToken();
      const params = new URLSearchParams({
        status: statusFilter,
        category: categoryFilter,
        source: sourceFilter,
        search: searchQuery,
        sort: sortOrder,
        page: page.toString(),
        limit: "15",
      });

      const res = await fetch(`/api/v1/messages?${params.toString()}`, {
        headers: { "X-Staff-Token": token },
      });

      if (!res.ok) {
        if (res.status === 401 || res.status === 403) {
          throw new Error("Access forbidden. Your active role lacks clearance for Messages & Inbox.");
        }
        throw new Error("Failed to load inbox messages from server.");
      }

      const data = await res.json();
      if (data.success) {
        setMessages(data.messages || []);
        setCounts(data.counts || {
          all: 0,
          unread: 0,
          new: 0,
          inProgress: 0,
          resolved: 0,
          archived: 0,
          spam: 0,
        });
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalItems(data.pagination?.totalItems || 0);

        // Keep selected message in sync if it's currently selected
        if (selectedMessage) {
          const updatedSelected = (data.messages || []).find((m: InboxMessage) => m.id === selectedMessage.id);
          if (updatedSelected) {
            setSelectedMessage(prev => ({ ...prev, ...updatedSelected }));
          }
        }
      } else {
        throw new Error(data.error || "Server returned error status.");
      }
    } catch (err: any) {
      console.error("Messages fetch error:", err);
      setError(err.message || "Failed to retrieve messages.");
    } finally {
      setLoading(false);
    }
  }, [statusFilter, categoryFilter, sourceFilter, searchQuery, sortOrder, page, getAuthToken, selectedMessage?.id]);

  useEffect(() => {
    fetchMessages();
  }, [statusFilter, categoryFilter, sourceFilter, searchQuery, sortOrder, page]);

  // Load message detail with full notes thread
  const selectMessage = async (msg: InboxMessage) => {
    setSelectedMessage(msg);
    setMobileDetailOpen(true);
    setDetailLoading(true);

    // Auto mark as read if currently unread
    if (!msg.isRead) {
      updateMessageStatus(msg.id, { isRead: true }, false);
    }

    try {
      const token = getAuthToken();
      const res = await fetch(`/api/v1/messages/${msg.id}`, {
        headers: { "X-Staff-Token": token },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.success && data.message) {
          setSelectedMessage(data.message);
        }
      }
    } catch (err) {
      console.error("Failed to load message detail:", err);
    } finally {
      setDetailLoading(false);
    }
  };

  // Update read status, workflow status, or assignment
  const updateMessageStatus = async (
    id: string,
    updates: { isRead?: boolean; status?: string; assignedTo?: string | null },
    showToast = true
  ) => {
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/v1/messages/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-Staff-Token": token,
        },
        body: JSON.stringify(updates),
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      if (data.success && data.message) {
        // Update local selected
        setSelectedMessage(prev => (prev?.id === id ? { ...prev, ...data.message } : prev));

        // Update list view
        setMessages(prev => prev.map(m => (m.id === id ? { ...m, ...data.message } : m)));

        // Recalculate counts locally
        if (updates.isRead !== undefined) {
          setCounts(prev => ({
            ...prev,
            unread: updates.isRead ? Math.max(0, prev.unread - 1) : prev.unread + 1,
          }));
        }

        if (showToast) {
          setActionSuccess("Status updated successfully.");
          setTimeout(() => setActionSuccess(null), 3000);
        }
      }
    } catch (err) {
      console.error("Failed to update message status:", err);
      setError("Failed to update message state.");
    }
  };

  // Add an internal staff note
  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMessage || !newNote.trim()) return;

    setIsSubmittingNote(true);
    try {
      const token = getAuthToken();
      const res = await fetch(`/api/v1/messages/${selectedMessage.id}/notes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Staff-Token": token,
        },
        body: JSON.stringify({ content: newNote.trim() }),
      });

      if (!res.ok) throw new Error("Failed to add note.");

      const data = await res.json();
      if (data.success && data.note) {
        setSelectedMessage(prev => {
          if (!prev) return null;
          return {
            ...prev,
            notes: [data.note, ...(prev.notes || [])],
            _count: { notes: (prev._count?.notes || 0) + 1 },
          };
        });
        setNewNote("");
        setActionSuccess("Internal confidential note appended.");
        setTimeout(() => setActionSuccess(null), 3000);
      }
    } catch (err: any) {
      console.error("Add note error:", err);
      setError(err.message || "Failed to append internal note.");
    } finally {
      setIsSubmittingNote(false);
    }
  };

  // Delete message permanently
  const handleDeleteMessage = async () => {
    if (!selectedMessage) return;

    try {
      const token = getAuthToken();
      const res = await fetch(`/api/v1/messages/${selectedMessage.id}`, {
        method: "DELETE",
        headers: { "X-Staff-Token": token },
      });

      if (!res.ok) throw new Error("Deletion failed or unauthorized.");

      // Remove from state
      setMessages(prev => prev.filter(m => m.id !== selectedMessage.id));
      setSelectedMessage(null);
      setMobileDetailOpen(false);
      setShowDeleteModal(false);
      setActionSuccess("Message permanently removed.");
      setTimeout(() => setActionSuccess(null), 3000);
      fetchMessages();
    } catch (err: any) {
      console.error("Deletion error:", err);
      setError(err.message || "Failed to remove message.");
    }
  };

  // Copy email helper
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const formatTimestamp = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  const getSourceBadge = (source: string) => {
    switch (source) {
      case "CONSULTATION_MODAL":
        return <span className="px-2 py-0.5 bg-[#53BAC1]/15 text-[#0F766E] border border-[#53BAC1]/30 font-mono text-[9px] uppercase font-bold rounded">Discovery Call</span>;
      case "CONTACT_FORM":
        return <span className="px-2 py-0.5 bg-[#519DD9]/15 text-[#519DD9] border border-[#519DD9]/30 font-mono text-[9px] uppercase font-bold rounded">Contact Form</span>;
      case "HOMEPAGE_ENQUIRY":
        return <span className="px-2 py-0.5 bg-[#F7C200]/15 text-[#B45309] border border-[#F7C200]/30 font-mono text-[9px] uppercase font-bold rounded">Homepage Brief</span>;
      default:
        return <span className="px-2 py-0.5 bg-gray-100 text-[#4B5563] border border-gray-300 font-mono text-[9px] uppercase font-bold rounded">{source}</span>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "NEW":
        return <span className="px-2 py-0.5 bg-[#DB0038]/15 text-[#DB0038] border border-[#DB0038]/30 font-mono text-[9px] uppercase font-bold rounded">New</span>;
      case "IN_PROGRESS":
        return <span className="px-2 py-0.5 bg-[#519DD9]/15 text-[#519DD9] border border-[#519DD9]/30 font-mono text-[9px] uppercase font-bold rounded">In Progress</span>;
      case "RESOLVED":
        return <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-300 font-mono text-[9px] uppercase font-bold rounded">Resolved</span>;
      case "ARCHIVED":
        return <span className="px-2 py-0.5 bg-gray-100 text-gray-600 border border-gray-300 font-mono text-[9px] uppercase font-bold rounded">Archived</span>;
      case "SPAM":
        return <span className="px-2 py-0.5 bg-red-100 text-red-700 border border-red-300 font-mono text-[9px] uppercase font-bold rounded">Spam</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 font-sans text-[#111215]">
      {/* Top Banner / Metrics Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E2DB]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#519DD9] animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#519DD9] font-bold">
              COMMUNICATIONS HQ // INBOUND GATEWAY
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#111215] tracking-tight uppercase font-display">
            Messages &amp; Inbound Inbox
          </h2>
          <p className="text-xs text-[#71757E] mt-0.5">
            Unified communications stream from Contact Form, Consultation Scheduler, and Homepage Briefs.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => fetchMessages()}
            disabled={loading}
            className="px-3.5 py-2 bg-white hover:bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl text-xs font-mono text-[#111215] flex items-center gap-2 shadow-xs transition disabled:opacity-50"
            title="Refresh inbox"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#519DD9] ${loading ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>
        </div>
      </div>

      {/* Global Alerts / Toasts */}
      {error && (
        <div className="p-3.5 bg-[#DB0038]/10 border border-[#DB0038]/30 rounded-xl text-xs text-[#DB0038] font-mono flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
          <button onClick={() => setError(null)} className="text-[#DB0038] font-bold hover:underline">Dismiss</button>
        </div>
      )}

      {actionSuccess && (
        <div className="p-3.5 bg-emerald-50 border border-emerald-300 rounded-xl text-xs text-emerald-800 font-mono flex items-center justify-between shadow-xs animate-in fade-in duration-150">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess(null)} className="text-emerald-800 font-bold hover:underline">Dismiss</button>
        </div>
      )}

      {/* Metric Counters Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
        <button
          onClick={() => { setStatusFilter("ALL"); setPage(1); }}
          className={`p-3.5 bg-white border text-left transition rounded-xl shadow-xs ${
            statusFilter === "ALL" ? "border-[#111215] ring-1 ring-[#111215]" : "border-[#E5E2DB] hover:border-gray-400"
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-[#71757E] font-bold">Total Inbox</div>
          <div className="text-xl font-black text-[#111215] mt-1">{counts.all}</div>
        </button>

        <button
          onClick={() => { setStatusFilter("UNREAD"); setPage(1); }}
          className={`p-3.5 bg-white border text-left transition rounded-xl shadow-xs ${
            statusFilter === "UNREAD" ? "border-[#DB0038] ring-1 ring-[#DB0038]" : "border-[#E5E2DB] hover:border-gray-400"
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-[#DB0038] font-bold flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#DB0038]" />
            Unread
          </div>
          <div className="text-xl font-black text-[#DB0038] mt-1">{counts.unread}</div>
        </button>

        <button
          onClick={() => { setStatusFilter("NEW"); setPage(1); }}
          className={`p-3.5 bg-white border text-left transition rounded-xl shadow-xs ${
            statusFilter === "NEW" ? "border-[#519DD9] ring-1 ring-[#519DD9]" : "border-[#E5E2DB] hover:border-gray-400"
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-[#519DD9] font-bold">New Submissions</div>
          <div className="text-xl font-black text-[#111215] mt-1">{counts.new}</div>
        </button>

        <button
          onClick={() => { setStatusFilter("IN_PROGRESS"); setPage(1); }}
          className={`p-3.5 bg-white border text-left transition rounded-xl shadow-xs ${
            statusFilter === "IN_PROGRESS" ? "border-[#53BAC1] ring-1 ring-[#53BAC1]" : "border-[#E5E2DB] hover:border-gray-400"
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-[#0F766E] font-bold">In Progress</div>
          <div className="text-xl font-black text-[#111215] mt-1">{counts.inProgress}</div>
        </button>

        <button
          onClick={() => { setStatusFilter("RESOLVED"); setPage(1); }}
          className={`p-3.5 bg-white border text-left transition rounded-xl shadow-xs ${
            statusFilter === "RESOLVED" ? "border-emerald-600 ring-1 ring-emerald-600" : "border-[#E5E2DB] hover:border-gray-400"
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-emerald-700 font-bold">Resolved</div>
          <div className="text-xl font-black text-[#111215] mt-1">{counts.resolved}</div>
        </button>

        <button
          onClick={() => { setStatusFilter("ARCHIVED"); setPage(1); }}
          className={`p-3.5 bg-white border text-left transition rounded-xl shadow-xs ${
            statusFilter === "ARCHIVED" ? "border-gray-500 ring-1 ring-gray-500" : "border-[#E5E2DB] hover:border-gray-400"
          }`}
        >
          <div className="text-[10px] font-mono uppercase text-gray-500 font-bold">Archived / Spam</div>
          <div className="text-xl font-black text-gray-600 mt-1">{counts.archived + counts.spam}</div>
        </button>
      </div>

      {/* Main Inbox Workspace (Master-Detail Dual Pane) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Pane: Message Stream & Filters (5 cols on lg) */}
        <div className={`lg:col-span-5 space-y-4 ${mobileDetailOpen ? "hidden lg:block" : "block"}`}>
          
          {/* Search & Filter Toolbar */}
          <div className="p-4 bg-white border border-[#E5E2DB] rounded-2xl shadow-xs space-y-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSearchQuery(searchInput);
                setPage(1);
              }}
              className="relative"
            >
              <input
                type="text"
                placeholder="Search sender, email, subject, keyword..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="w-full pl-9 pr-8 py-2 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-xs text-[#111215] placeholder-[#8C8F98] font-mono focus:outline-none focus:border-[#519DD9] focus:bg-white transition"
              />
              <Search className="w-4 h-4 text-[#8C8F98] absolute left-3 top-2.5" />
              {searchInput && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchInput("");
                    setSearchQuery("");
                    setPage(1);
                  }}
                  className="absolute right-2.5 top-2 text-xs font-mono text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </form>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-[10px]">
              <select
                value={sourceFilter}
                onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }}
                className="px-2.5 py-1.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-lg text-[#111215] focus:outline-none cursor-pointer"
              >
                <option value="ALL">Source: All Forms</option>
                <option value="CONTACT_FORM">Contact Form</option>
                <option value="CONSULTATION_MODAL">Discovery Calls</option>
                <option value="HOMEPAGE_ENQUIRY">Homepage Briefs</option>
              </select>

              <select
                value={sortOrder}
                onChange={(e) => { setSortOrder(e.target.value); setPage(1); }}
                className="px-2.5 py-1.5 bg-[#FAFAF8] border border-[#E5E2DB] rounded-lg text-[#111215] focus:outline-none cursor-pointer"
              >
                <option value="newest">Sort: Newest First</option>
                <option value="oldest">Sort: Oldest First</option>
                <option value="status">Sort: By Status</option>
              </select>

              {searchQuery && (
                <span className="px-2 py-1 bg-amber-50 border border-amber-200 text-amber-800 rounded text-[9px] flex items-center gap-1">
                  Query: &quot;{searchQuery}&quot;
                </span>
              )}
            </div>
          </div>

          {/* Messages List Container */}
          <div className="bg-white border border-[#E5E2DB] rounded-2xl shadow-xs overflow-hidden divide-y divide-[#E5E2DB]">
            {loading && messages.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <div className="w-8 h-8 rounded-full border-t-2 border-[#519DD9] border-r-2 border-transparent animate-spin mx-auto" />
                <span className="text-xs font-mono text-[#71757E]">Fetching messages...</span>
              </div>
            ) : messages.length === 0 ? (
              <div className="py-20 px-6 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F5F3EF] border border-[#E5E2DB] text-[#71757E] flex items-center justify-center mx-auto">
                  <Inbox className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-sm text-[#111215]">No Messages Found</h4>
                <p className="text-xs text-[#71757E] max-w-xs mx-auto">
                  {searchQuery || statusFilter !== "ALL" || sourceFilter !== "ALL"
                    ? "Try adjusting your search criteria or resetting filters."
                    : "Your inbox is clear. Incoming visitor submissions will appear here automatically."}
                </p>
              </div>
            ) : (
              messages.map((msg) => {
                const isSelected = selectedMessage?.id === msg.id;
                return (
                  <div
                    key={msg.id}
                    onClick={() => selectMessage(msg)}
                    className={`p-4 cursor-pointer transition relative group ${
                      isSelected
                        ? "bg-[#F5F3EF] border-l-4 border-l-[#519DD9]"
                        : msg.isRead
                        ? "bg-white hover:bg-gray-50/80"
                        : "bg-blue-50/20 hover:bg-blue-50/40 border-l-4 border-l-[#DB0038]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-2 truncate">
                        {!msg.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#DB0038] shrink-0" title="Unread" />
                        )}
                        <span className={`text-xs font-bold truncate ${!msg.isRead ? "text-[#111215]" : "text-[#4A4D54]"}`}>
                          {msg.name}
                        </span>
                        {msg.company && (
                          <span className="text-[10px] text-[#71757E] truncate font-mono">
                            • {msg.company}
                          </span>
                        )}
                      </div>

                      <span className="text-[10px] font-mono text-[#71757E] shrink-0">
                        {formatTimestamp(msg.createdAt).split(",")[0]}
                      </span>
                    </div>

                    <h4 className={`text-xs font-semibold mb-1 truncate ${!msg.isRead ? "text-[#111215] font-bold" : "text-[#111215]"}`}>
                      {msg.subject}
                    </h4>

                    <p className="text-xs text-[#565961] line-clamp-2 leading-relaxed mb-2.5">
                      {msg.content}
                    </p>

                    <div className="flex items-center justify-between gap-2 font-mono text-[10px]">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {getSourceBadge(msg.source)}
                        {getStatusBadge(msg.status)}
                      </div>

                      <div className="flex items-center gap-2 text-[#71757E]">
                        {msg._count?.notes && msg._count.notes > 0 ? (
                          <span className="flex items-center gap-1 text-[#519DD9] font-bold" title="Internal staff notes">
                            <MessageSquare className="w-3 h-3" />
                            <span>{msg._count.notes}</span>
                          </span>
                        ) : null}

                        {msg.assignedTo && (
                          <span className="text-[9px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 truncate max-w-[100px]" title={`Assigned to ${msg.assignedTo}`}>
                            {msg.assignedTo.split(" ")[0]}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between p-3 bg-white border border-[#E5E2DB] rounded-xl font-mono text-xs shadow-xs">
              <span className="text-[#71757E] text-[11px]">
                Showing page <strong className="text-[#111215]">{page}</strong> of <strong className="text-[#111215]">{totalPages}</strong> ({totalItems} total)
              </span>

              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className="px-2.5 py-1 bg-[#FAFAF8] hover:bg-gray-100 border border-[#E5E2DB] rounded text-xs disabled:opacity-30"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className="px-2.5 py-1 bg-[#FAFAF8] hover:bg-gray-100 border border-[#E5E2DB] rounded text-xs disabled:opacity-30"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right Pane: Message Detail Inspector (7 cols on lg) */}
        <div className={`lg:col-span-7 ${!mobileDetailOpen ? "hidden lg:block" : "block"}`}>
          {selectedMessage ? (
            <div className="bg-white border border-[#E5E2DB] rounded-2xl shadow-sm overflow-hidden divide-y divide-[#E5E2DB] space-y-0">
              
              {/* Detail Action Bar */}
              <div className="p-4 sm:p-5 bg-[#FAFAF8] flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setMobileDetailOpen(false)}
                    className="lg:hidden p-2 bg-white border border-[#E5E2DB] rounded-lg text-[#111215] hover:bg-gray-100"
                    title="Back to message list"
                  >
                    <ArrowLeft className="w-4 h-4" />
                  </button>

                  {/* Mark Read/Unread Toggle */}
                  <button
                    onClick={() => updateMessageStatus(selectedMessage.id, { isRead: !selectedMessage.isRead })}
                    className={`px-3 py-1.5 border rounded-xl text-xs font-mono font-bold transition flex items-center gap-1.5 shadow-xs ${
                      selectedMessage.isRead
                        ? "bg-white hover:bg-gray-100 border-[#E5E2DB] text-[#4A4D54]"
                        : "bg-[#DB0038] hover:bg-[#b5002e] border-[#DB0038] text-white"
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedMessage.isRead ? "Mark Unread" : "Mark Read"}</span>
                  </button>

                  {/* Status Dropdown */}
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => updateMessageStatus(selectedMessage.id, { status: e.target.value })}
                    className="px-3 py-1.5 bg-white border border-[#E5E2DB] hover:border-gray-400 rounded-xl text-xs font-mono font-bold text-[#111215] focus:outline-none cursor-pointer shadow-xs"
                  >
                    <option value="NEW">Status: NEW</option>
                    <option value="IN_PROGRESS">Status: IN PROGRESS</option>
                    <option value="RESOLVED">Status: RESOLVED</option>
                    <option value="ARCHIVED">Status: ARCHIVED</option>
                    <option value="SPAM">Status: SPAM</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  {/* Quick Assign Dropdown */}
                  <select
                    value={selectedMessage.assignedTo || ""}
                    onChange={(e) => updateMessageStatus(selectedMessage.id, { assignedTo: e.target.value || null })}
                    className="px-2.5 py-1.5 bg-white border border-[#E5E2DB] rounded-xl text-xs font-mono text-[#111215] focus:outline-none cursor-pointer shadow-xs max-w-[140px] truncate"
                    title="Assign to staff member"
                  >
                    <option value="">Unassigned</option>
                    {STAFF_MEMBERS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>

                  {/* Delete / Archive Button */}
                  <button
                    onClick={() => setShowDeleteModal(true)}
                    className="p-2 bg-white hover:bg-red-50 border border-[#E5E2DB] hover:border-red-300 text-gray-500 hover:text-red-600 rounded-xl transition shadow-xs"
                    title="Remove or delete message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Message Header & Sender Profile */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-[10px]">
                      {getSourceBadge(selectedMessage.source)}
                      {getStatusBadge(selectedMessage.status)}
                      <span className="text-[#71757E]">•</span>
                      <span className="text-[#71757E]">{formatTimestamp(selectedMessage.createdAt)}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#111215] tracking-tight">
                      {selectedMessage.subject}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                      className="px-3 py-1.5 bg-[#111215] hover:bg-[#519DD9] text-white hover:text-[#111215] rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 shadow-sm"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Reply via Mail</span>
                    </a>
                  </div>
                </div>

                {/* Sender Card */}
                <div className="p-4 bg-[#F5F3EF] border border-[#E5E2DB] rounded-xl flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#111215] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                      {selectedMessage.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-bold text-sm text-[#111215]">
                        {selectedMessage.name}
                        {selectedMessage.company && (
                          <span className="font-normal text-[#565961]"> ({selectedMessage.company})</span>
                        )}
                      </div>
                      <div className="text-xs font-mono text-[#519DD9] flex items-center gap-2">
                        <span>{selectedMessage.email}</span>
                        {selectedMessage.phone && (
                          <span className="text-[#71757E]">• Tel: {selectedMessage.phone}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => copyToClipboard(selectedMessage.email)}
                    className="px-2.5 py-1 bg-white hover:bg-gray-100 border border-[#E5E2DB] rounded-lg text-[11px] font-mono text-[#111215] flex items-center gap-1.5 transition shadow-xs"
                    title="Copy email to clipboard"
                  >
                    {copiedEmail ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedEmail ? "Copied" : "Copy Email"}</span>
                  </button>
                </div>
              </div>

              {/* Message Body Content (Protected against HTML injection) */}
              <div className="p-6 sm:p-8 space-y-4">
                <div className="font-mono text-[10px] text-[#71757E] uppercase tracking-wider font-bold">
                  ORIGINAL INBOUND MESSAGE SPECIFICATION:
                </div>

                <div className="p-6 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-xs sm:text-sm text-[#111215] leading-relaxed whitespace-pre-wrap font-sans select-text">
                  {selectedMessage.content}
                </div>

                {/* Metadata details if parsed */}
                {selectedMessage.metadata && (
                  <div className="p-4 bg-white border border-[#E5E2DB] rounded-xl text-xs font-mono space-y-1.5">
                    <div className="text-[10px] text-[#71757E] uppercase font-bold mb-1">Session Context &amp; Scope Details:</div>
                    {(() => {
                      try {
                        const meta = JSON.parse(selectedMessage.metadata);
                        return Object.entries(meta).map(([key, val]) => (
                          val ? (
                            <div key={key} className="flex justify-between text-[11px]">
                              <span className="text-[#71757E] capitalize">{key.replace(/([A-Z])/g, " $1")}:</span>
                              <span className="font-bold text-[#111215]">{String(val)}</span>
                            </div>
                          ) : null
                        ));
                      } catch {
                        return <span className="text-gray-400">{selectedMessage.metadata}</span>;
                      }
                    })()}
                  </div>
                )}
              </div>

              {/* Linked CRM Lead Integration */}
              {selectedMessage.lead && (
                <div className="p-6 sm:p-8 bg-[#F9FAFB] space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-[10px] text-[#519DD9] uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>LINKED CRM LEAD PIPELINE RECORD</span>
                    </div>

                    <Link
                      href="/admin/leads"
                      className="text-xs font-mono font-bold text-[#519DD9] hover:underline flex items-center gap-1"
                    >
                      <span>Open CRM Pipeline</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="p-4 bg-white border border-[#E5E2DB] rounded-xl flex items-center justify-between flex-wrap gap-4 text-xs font-mono">
                    <div>
                      <span className="text-[#71757E] block text-[10px] uppercase">LEAD ID</span>
                      <span className="font-bold text-[#111215]">{selectedMessage.lead.id}</span>
                    </div>

                    <div>
                      <span className="text-[#71757E] block text-[10px] uppercase">CRM STAGE</span>
                      <span className="px-2 py-0.5 bg-[#519DD9]/15 text-[#519DD9] font-bold rounded">
                        {selectedMessage.lead.status}
                      </span>
                    </div>

                    <div>
                      <span className="text-[#71757E] block text-[10px] uppercase">AI LEAD SCORE</span>
                      <span className="font-bold text-emerald-600 text-sm">
                        {selectedMessage.lead.aiLeadScore} / 100
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Internal Confidential Staff Notes Thread */}
              <div className="p-6 sm:p-8 space-y-4 bg-white">
                <div className="flex items-center justify-between">
                  <div className="font-mono text-[10px] text-[#71757E] uppercase tracking-wider font-bold flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
                    <span>CONFIDENTIAL INTERNAL STAFF NOTES ({selectedMessage.notes?.length || 0})</span>
                  </div>
                  <span className="text-[10px] font-mono text-[#0F766E] font-semibold">🔒 Never visible to visitors</span>
                </div>

                {/* Add Note Form */}
                <form onSubmit={handleAddNote} className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder={`Add confidential engineering note as ${staff?.name || "Staff"} [${activeRole}]...`}
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    className="w-full p-3 bg-[#FAFAF8] border border-[#E5E2DB] rounded-xl text-xs text-[#111215] font-mono focus:outline-none focus:border-[#111215] focus:bg-white transition leading-relaxed"
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={isSubmittingNote || !newNote.trim()}
                      className="px-4 py-2 bg-[#111215] hover:bg-[#519DD9] hover:text-[#111215] text-white rounded-xl font-mono text-xs font-bold transition flex items-center gap-2 disabled:opacity-50 shadow-xs"
                    >
                      {isSubmittingNote ? (
                        <>
                          <div className="w-3 h-3 rounded-full border-t border-current animate-spin" />
                          <span>Appending Note...</span>
                        </>
                      ) : (
                        <>
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Append Staff Note</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Notes List */}
                <div className="space-y-3 pt-2 divide-y divide-gray-100">
                  {selectedMessage.notes && selectedMessage.notes.length > 0 ? (
                    selectedMessage.notes.map((note) => (
                      <div key={note.id} className="pt-3 space-y-1">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="font-bold text-[#111215]">
                            {note.authorName} <span className="text-[#519DD9]">[{note.authorRole}]</span>
                          </span>
                          <span className="text-[#71757E] text-[10px]">
                            {formatTimestamp(note.createdAt)}
                          </span>
                        </div>
                        <p className="text-xs text-[#4A4D54] leading-relaxed whitespace-pre-wrap font-sans bg-[#F9FAFB] p-3 rounded-lg border border-gray-100">
                          {note.content}
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-6 text-xs text-[#71757E] font-mono">
                      No internal notes attached yet. Use the field above to record discovery call outcomes or dispatch instructions.
                    </div>
                  )}
                </div>
              </div>

            </div>
          ) : (
            /* Empty selection state */
            <div className="bg-white border border-[#E5E2DB] rounded-2xl p-16 text-center space-y-4 shadow-xs">
              <div className="w-16 h-16 rounded-3xl bg-[#F5F3EF] border border-[#E5E2DB] text-[#519DD9] flex items-center justify-center mx-auto shadow-xs">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-[#111215]">No Message Selected</h3>
              <p className="text-xs text-[#71757E] max-w-sm mx-auto leading-relaxed">
                Select an inbound communication from the stream on the left to inspect specifications, change workflow status, or record internal notes.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Confirmation Dialog for Destructive Actions */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white border border-[#E5E2DB] rounded-2xl p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1">
              <h4 className="text-base font-bold text-[#111215]">Permanently Delete Message?</h4>
              <p className="text-xs text-[#71757E] leading-relaxed">
                Are you sure you want to permanently remove this message from <strong className="text-[#111215]">{selectedMessage?.name}</strong>? This action will also delete all associated internal staff notes.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-[#111215] rounded-xl text-xs font-mono font-semibold transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteMessage}
                className="px-4 py-2 bg-[#DB0038] hover:bg-[#b5002e] text-white rounded-xl text-xs font-mono font-bold transition shadow-xs"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
