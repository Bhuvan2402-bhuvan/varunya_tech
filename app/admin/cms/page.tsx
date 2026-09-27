"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { 
  FileEdit, Plus, Trash2, Edit3, Briefcase, MapPin, Search, 
  Gift, Edit, ExternalLink, BookOpen, Layers, CheckCircle2, 
  Globe, Sparkles, Clock, Calendar, User, Tag, Image as ImageIcon,
  Upload, ArrowUpRight, Check, X, Star, FileCode, Github, Eye
} from "lucide-react";
import { useAdminSession } from "../AdminSessionContext";
import { Modal } from "@/components/ui/Modal";
import { 
  PortfolioItem, BlogItem, 
  getStoredPortfolio, savePortfolio, 
  getStoredBlogPosts, saveBlogPosts 
} from "@/lib/data/cms-data";
import { 
  JobOpening, PerkItem, 
  getStoredCareers, saveCareers, 
  getStoredPerks, savePerks, DEFAULT_PERKS 
} from "@/lib/data/careers-data";

export default function AdminCMSPage() {
  const { activeRole } = useAdminSession();
  const [activeTab, setActiveTab] = useState<"portfolio" | "blog" | "careers">("portfolio");
  const [notification, setNotification] = useState<{ message: string; type: "success" | "info" } | null>(null);

  const showToast = (message: string) => {
    setNotification({ message, type: "success" });
    setTimeout(() => setNotification(null), 4000);
  };

  // -------------------------------------------------------------
  // 1. WORKS / PORTFOLIO STATE & HANDLERS
  // -------------------------------------------------------------
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [portfolioSearch, setPortfolioSearch] = useState("");
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [editingPortfolio, setEditingPortfolio] = useState<PortfolioItem | null>(null);

  // Works / Portfolio Form State
  const [pfTitle, setPfTitle] = useState("");
  const [pfSlug, setPfSlug] = useState("");
  const [pfClient, setPfClient] = useState("");
  const [pfCategory, setPfCategory] = useState("Web Application");
  const [pfIndustry, setPfIndustry] = useState("Enterprise Operations");
  const [pfDuration, setPfDuration] = useState(30);
  const [pfHeroImage, setPfHeroImage] = useState("");
  const [pfSummary, setPfSummary] = useState("");
  const [pfChallenge, setPfChallenge] = useState("");
  const [pfSolution, setPfSolution] = useState("");
  const [pfArchitecture, setPfArchitecture] = useState("");
  const [pfMetric1Label, setPfMetric1Label] = useState("Operational Speed");
  const [pfMetric1Value, setPfMetric1Value] = useState("Real-Time");
  const [pfMetric2Label, setPfMetric2Label] = useState("Security & RBAC");
  const [pfMetric2Value, setPfMetric2Value] = useState("100% Granular");
  const [pfMetric3Label, setPfMetric3Label] = useState("Lighthouse Score");
  const [pfMetric3Value, setPfMetric3Value] = useState("99+");
  const [pfTechStack, setPfTechStack] = useState("Next.js, React, TypeScript, Tailwind CSS");
  const [pfLiveDemoUrl, setPfLiveDemoUrl] = useState("");
  const [pfFeatures, setPfFeatures] = useState("Responsive Design, Role-Based Access, Real-Time Sync");

  // File Upload Dropzone State
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const PRESET_TEMPLATES = [
    {
      name: "ERP & Management",
      url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      category: "ERP & Management",
      industry: "Enterprise Operations"
    },
    {
      name: "FinTech Platform",
      url: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=1200&q=80",
      category: "Web Application",
      industry: "Finance"
    },
    {
      name: "EdTech & Learning",
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      category: "EdTech Platform",
      industry: "Education & Learning"
    },
    {
      name: "Modern Web App",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      category: "Web Application",
      industry: "Personal & Business Branding"
    },
    {
      name: "HealthTech Portal",
      url: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      category: "Custom Software",
      industry: "Healthcare"
    }
  ];

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (PNG, JPG, WebP, SVG, GIF).");
      return;
    }
    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert("File size exceeds 5MB. Please choose a smaller image.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPfHeroImage(e.target.result as string);
        showToast("Work cover image uploaded successfully!");
      }
    };
    reader.readAsDataURL(file);
  };

  const handleOpenAddPortfolio = () => {
    setEditingPortfolio(null);
    setPfTitle("");
    setPfSlug("");
    setPfClient("");
    setPfCategory("Web Application");
    setPfIndustry("Enterprise Operations");
    setPfDuration(30);
    setPfHeroImage("https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80");
    setPfSummary("");
    setPfChallenge("");
    setPfSolution("");
    setPfArchitecture("Next.js 15 -> Node.js -> PostgreSQL -> Vercel Edge");
    setPfMetric1Label("Operational Speed");
    setPfMetric1Value("Real-Time");
    setPfMetric2Label("Security & RBAC");
    setPfMetric2Value("100% Granular");
    setPfMetric3Label("Lighthouse Score");
    setPfMetric3Value("99+");
    setPfTechStack("Next.js, TypeScript, Tailwind CSS, PostgreSQL");
    setPfLiveDemoUrl("");
    setPfFeatures("Modern UI/UX, Cloud Sync, Sub-second Speeds");
    setIsPortfolioModalOpen(true);
  };

  const handleOpenEditPortfolio = (item: PortfolioItem) => {
    setEditingPortfolio(item);
    setPfTitle(item.title);
    setPfSlug(item.slug);
    setPfClient(item.client);
    setPfCategory(item.category);
    setPfIndustry(item.industry);
    setPfDuration(item.durationDays || 30);
    setPfHeroImage(item.heroImage || "");
    setPfSummary(item.summary);
    setPfChallenge(item.challenge);
    setPfSolution(item.solution);
    setPfArchitecture(item.architecture || "");
    setPfMetric1Label(item.impactMetrics?.[0]?.label || "Metric 1");
    setPfMetric1Value(item.impactMetrics?.[0]?.value || "100%");
    setPfMetric2Label(item.impactMetrics?.[1]?.label || "Metric 2");
    setPfMetric2Value(item.impactMetrics?.[1]?.value || "Real-Time");
    setPfMetric3Label(item.impactMetrics?.[2]?.label || "Metric 3");
    setPfMetric3Value(item.impactMetrics?.[2]?.value || "Sub-Second");
    setPfTechStack(item.techStack.join(", "));
    setPfLiveDemoUrl(item.liveDemoUrl || "");
    setPfFeatures((item.features || []).join(", "));
    setIsPortfolioModalOpen(true);
  };

  const handleSavePortfolio = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = pfSlug.trim() || pfTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const techStackArray = pfTechStack.split(",").map(t => t.trim()).filter(Boolean);
    const featuresArray = pfFeatures.split(",").map(f => f.trim()).filter(Boolean);
    const impactMetrics = [
      { label: pfMetric1Label.trim(), value: pfMetric1Value.trim() },
      { label: pfMetric2Label.trim(), value: pfMetric2Value.trim() },
      { label: pfMetric3Label.trim(), value: pfMetric3Value.trim() },
    ].filter(m => m.label && m.value);

    let updatedList: PortfolioItem[] = [];

    if (editingPortfolio) {
      updatedList = portfolio.map(item => {
        if (item.id === editingPortfolio.id) {
          return {
            ...item,
            title: pfTitle,
            slug: generatedSlug,
            client: pfClient,
            category: pfCategory,
            industry: pfIndustry,
            durationDays: Number(pfDuration) || 30,
            heroImage: pfHeroImage,
            summary: pfSummary,
            challenge: pfChallenge,
            solution: pfSolution,
            architecture: pfArchitecture,
            impactMetrics,
            techStack: techStackArray,
            liveDemoUrl: pfLiveDemoUrl,
            features: featuresArray,
          };
        }
        return item;
      });
      showToast(`Updated work "${pfTitle}" successfully.`);
    } else {
      const newItem: PortfolioItem = {
        id: `p-${Date.now()}`,
        slug: generatedSlug,
        title: pfTitle,
        client: pfClient,
        category: pfCategory,
        industry: pfIndustry,
        durationDays: Number(pfDuration) || 30,
        heroImage: pfHeroImage || "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
        summary: pfSummary,
        challenge: pfChallenge,
        solution: pfSolution,
        architecture: pfArchitecture,
        impactMetrics,
        techStack: techStackArray,
        liveDemoUrl: pfLiveDemoUrl,
        features: featuresArray,
      };
      updatedList = [newItem, ...portfolio];
      showToast(`Uploaded new work "${pfTitle}" to Portfolio & Works.`);
    }

    setPortfolio(updatedList);
    savePortfolio(updatedList);
    setIsPortfolioModalOpen(false);
  };

  const handleDeletePortfolio = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete work project "${title}"?`)) {
      const updated = portfolio.filter(p => p.id !== id);
      setPortfolio(updated);
      savePortfolio(updated);
      showToast(`Deleted work "${title}".`);
    }
  };

  // -------------------------------------------------------------
  // 2. BLOG POSTS STATE & HANDLERS
  // -------------------------------------------------------------
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [blogSearch, setBlogSearch] = useState("");
  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);

  // Blog Form State
  const [blogTitle, setBlogTitle] = useState("");
  const [blogSlug, setBlogSlug] = useState("");
  const [blogExcerpt, setBlogExcerpt] = useState("");
  const [blogContent, setBlogContent] = useState("");
  const [blogCategory, setBlogCategory] = useState("Engineering Strategy");
  const [blogReadTime, setBlogReadTime] = useState("5 min read");
  const [blogPublishedAt, setBlogPublishedAt] = useState(new Date().toISOString().split("T")[0]);
  const [blogAuthorName, setBlogAuthorName] = useState("Marcus Vance");
  const [blogAuthorRole, setBlogAuthorRole] = useState("Chief Technology Officer");
  const [blogAuthorAvatar, setBlogAuthorAvatar] = useState("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80");
  const [blogCoverImage, setBlogCoverImage] = useState("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80");
  const [blogTags, setBlogTags] = useState("Next.js, Agile, Software Delivery");

  const handleOpenAddBlog = () => {
    setEditingBlog(null);
    setBlogTitle("");
    setBlogSlug("");
    setBlogExcerpt("");
    setBlogContent("");
    setBlogCategory("Engineering Strategy");
    setBlogReadTime("5 min read");
    setBlogPublishedAt(new Date().toISOString().split("T")[0]);
    setBlogAuthorName("Marcus Vance");
    setBlogAuthorRole("Chief Technology Officer");
    setBlogAuthorAvatar("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80");
    setBlogCoverImage("https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80");
    setBlogTags("Next.js, Agile, Web Development");
    setIsBlogModalOpen(true);
  };

  const handleOpenEditBlog = (item: BlogItem) => {
    setEditingBlog(item);
    setBlogTitle(item.title);
    setBlogSlug(item.slug);
    setBlogExcerpt(item.excerpt);
    setBlogContent(item.content);
    setBlogCategory(item.category);
    setBlogReadTime(item.readTime);
    setBlogPublishedAt(item.publishedAt);
    setBlogAuthorName(item.author?.name || "Marcus Vance");
    setBlogAuthorRole(item.author?.role || "CTO");
    setBlogAuthorAvatar(item.author?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80");
    setBlogCoverImage(item.coverImage || "");
    setBlogTags(item.tags.join(", "));
    setIsBlogModalOpen(true);
  };

  const handleSaveBlog = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedSlug = blogSlug.trim() || blogTitle.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    const tagsArray = blogTags.split(",").map(t => t.trim()).filter(Boolean);

    let updatedList: BlogItem[] = [];

    if (editingBlog) {
      updatedList = blogs.map(item => {
        if (item.id === editingBlog.id) {
          return {
            ...item,
            title: blogTitle,
            slug: generatedSlug,
            excerpt: blogExcerpt,
            content: blogContent,
            category: blogCategory,
            readTime: blogReadTime,
            publishedAt: blogPublishedAt,
            author: {
              name: blogAuthorName,
              role: blogAuthorRole,
              avatar: blogAuthorAvatar,
            },
            coverImage: blogCoverImage,
            tags: tagsArray,
          };
        }
        return item;
      });
      showToast(`Updated article "${blogTitle}" successfully.`);
    } else {
      const newPost: BlogItem = {
        id: `b-${Date.now()}`,
        slug: generatedSlug,
        title: blogTitle,
        excerpt: blogExcerpt,
        content: blogContent,
        category: blogCategory,
        readTime: blogReadTime,
        publishedAt: blogPublishedAt,
        author: {
          name: blogAuthorName,
          role: blogAuthorRole,
          avatar: blogAuthorAvatar,
        },
        coverImage: blogCoverImage,
        tags: tagsArray,
      };
      updatedList = [newPost, ...blogs];
      showToast(`Published article "${blogTitle}" to Blog.`);
    }

    setBlogs(updatedList);
    saveBlogPosts(updatedList);
    setIsBlogModalOpen(false);
  };

  const handleDeleteBlog = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete blog article "${title}"?`)) {
      const updated = blogs.filter(b => b.id !== id);
      setBlogs(updated);
      saveBlogPosts(updated);
      showToast(`Deleted blog article "${title}".`);
    }
  };

  // -------------------------------------------------------------
  // 3. CAREERS STATE & HANDLERS
  // -------------------------------------------------------------
  const [careers, setCareers] = useState<JobOpening[]>([]);
  const [isCareerModalOpen, setIsCareerModalOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<JobOpening | null>(null);

  const [formTitle, setFormTitle] = useState("");
  const [formDept, setFormDept] = useState("Engineering");
  const [formLoc, setFormLoc] = useState("Remote");
  const [formType, setFormType] = useState("Full-time");
  const [formSummary, setFormSummary] = useState("");
  const [formReqs, setFormReqs] = useState("");

  const [perks, setPerks] = useState<PerkItem[]>([]);
  const [editingPerk, setEditingPerk] = useState<PerkItem | null>(null);
  const [perkTitle, setPerkTitle] = useState("");
  const [perkDesc, setPerkDesc] = useState("");

  // Initial Data Load
  useEffect(() => {
    setPortfolio(getStoredPortfolio());
    setBlogs(getStoredBlogPosts());
    setCareers(getStoredCareers());
    setPerks(getStoredPerks());
  }, []);

  // Force HR to Careers CMS tab only
  useEffect(() => {
    if (activeRole === "HR") {
      setActiveTab("careers");
    }
  }, [activeRole]);

  const handleOpenAddCareer = () => {
    setEditingJob(null);
    setFormTitle("");
    setFormDept("Engineering");
    setFormLoc("Remote / Hybrid");
    setFormType("Full-time");
    setFormSummary("");
    setFormReqs("React.js, Next.js, TypeScript, Tailwind CSS");
    setIsCareerModalOpen(true);
  };

  const handleOpenEditCareer = (job: JobOpening) => {
    setEditingJob(job);
    setFormTitle(job.title);
    setFormDept(job.department);
    setFormLoc(job.location);
    setFormType(job.type);
    setFormSummary(job.summary);
    setFormReqs(job.requirements.join(", "));
    setIsCareerModalOpen(true);
  };

  const handleSaveCareer = (e: React.FormEvent) => {
    e.preventDefault();
    const requirements = formReqs.split(",").map(r => r.trim()).filter(Boolean);
    let updatedCareers: JobOpening[] = [];

    if (editingJob) {
      updatedCareers = careers.map(c => {
        if (c.id === editingJob.id) {
          return {
            ...c,
            title: formTitle,
            department: formDept,
            location: formLoc,
            type: formType,
            summary: formSummary,
            requirements
          };
        }
        return c;
      });
      showToast(`Updated career listing "${formTitle}".`);
    } else {
      const newJob: JobOpening = {
        id: `J-${Date.now()}`,
        title: formTitle,
        department: formDept,
        location: formLoc,
        type: formType,
        summary: formSummary,
        requirements,
        status: "OPEN",
        postedAt: new Date().toISOString().split("T")[0]
      };
      updatedCareers = [newJob, ...careers];
      showToast(`Created new career listing "${formTitle}".`);
    }

    setCareers(updatedCareers);
    saveCareers(updatedCareers);
    setIsCareerModalOpen(false);
  };

  const handleDeleteCareer = (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete career listing "${title}"?`)) {
      const updated = careers.filter(c => c.id !== id);
      setCareers(updated);
      saveCareers(updated);
      showToast(`Deleted career listing "${title}".`);
    }
  };

  // Perks handlers
  const handleOpenEditPerk = (perk: PerkItem) => {
    setEditingPerk(perk);
    setPerkTitle(perk.title);
    setPerkDesc(perk.description);
  };

  const handleSavePerk = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPerk) return;
    const updated = perks.map(p => {
      if (p.id === editingPerk.id) {
        return { ...p, title: perkTitle, description: perkDesc };
      }
      return p;
    });
    setPerks(updated);
    savePerks(updated);
    setEditingPerk(null);
    showToast("Updated Careers benefit highlight card.");
  };

  // Filtered Items
  const filteredPortfolio = portfolio.filter(p => 
    p.title.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
    p.client.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
    p.category.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
    p.industry.toLowerCase().includes(portfolioSearch.toLowerCase()) ||
    p.techStack.some(t => t.toLowerCase().includes(portfolioSearch.toLowerCase()))
  );

  const filteredBlogs = blogs.filter(b => 
    b.title.toLowerCase().includes(blogSearch.toLowerCase()) ||
    b.category.toLowerCase().includes(blogSearch.toLowerCase()) ||
    b.excerpt.toLowerCase().includes(blogSearch.toLowerCase()) ||
    b.tags.some(t => t.toLowerCase().includes(blogSearch.toLowerCase()))
  );

  return (
    <div className="space-y-8 font-sans">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-500/20 border border-cyan-500/50 text-cyan-200 px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 animate-fade-in text-xs font-semibold">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>{notification.message}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[11px] font-mono text-cyan-400 mb-1">
            <Sparkles className="w-3 h-3" /> LIVE CONTENT MANAGEMENT &amp; WORKS ENGINE
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-white font-display">
            {activeRole === "HR" ? "Careers CMS Hub" : "Central Content Management System (CMS)"}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {activeRole === "HR" 
              ? "Publish and edit career opportunities, highlight benefit cards, and active team opening details." 
              : "Upload and publish new portfolio works, author engineering blog posts, and manage career postings with instant real-time sync."}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <Link href="/admin/homepage">
            <Button variant="outline" size="sm" icon={<FileEdit className="w-3.5 h-3.5 text-purple-400" />}>
              Homepage Customizer
            </Button>
          </Link>
          <Link href="/admin/careers">
            <Button variant="outline" size="sm" icon={<Briefcase className="w-3.5 h-3.5 text-cyan-400" />}>
              Careers & Applicants Hub
            </Button>
          </Link>

          {/* Dynamic Add / Upload Content CTA */}
          {activeTab === "portfolio" && activeRole !== "HR" && (
            <Button 
              variant="gradient" 
              size="sm" 
              icon={<Upload className="w-4 h-4" />}
              onClick={handleOpenAddPortfolio}
            >
              Upload New Work
            </Button>
          )}

          {activeTab === "blog" && activeRole !== "HR" && (
            <Button 
              variant="gradient" 
              size="sm" 
              icon={<Plus className="w-4 h-4" />}
              onClick={handleOpenAddBlog}
            >
              Write Blog Article
            </Button>
          )}

          {activeTab === "careers" && (
            <Button 
              variant="gradient" 
              size="sm" 
              icon={<Plus className="w-4 h-4" />}
              onClick={handleOpenAddCareer}
            >
              Create Career Listing
            </Button>
          )}
        </div>
      </div>

      {/* Tabs list (Hidden if user is HR to lock access to careers only) */}
      {activeRole !== "HR" && (
        <div className="flex gap-2 border-b border-slate-800 pb-3">
          <button 
            onClick={() => setActiveTab("portfolio")} 
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
              activeTab === "portfolio" 
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" 
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Layers className="w-3.5 h-3.5" /> Works &amp; Portfolio ({portfolio.length})
          </button>
          <button 
            onClick={() => setActiveTab("blog")} 
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
              activeTab === "blog" 
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" 
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5" /> Blog Articles ({blogs.length})
          </button>
          <button 
            onClick={() => setActiveTab("careers")} 
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold transition flex items-center gap-2 ${
              activeTab === "careers" 
                ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" 
                : "bg-slate-900/80 text-slate-400 hover:text-white border border-slate-800"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" /> Career Job Openings ({careers.length})
          </button>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 1: WORKS & PORTFOLIO CASE STUDIES
          ------------------------------------------------------------- */}
      {activeTab === "portfolio" && (
        <div className="space-y-6">
          {/* Quick Upload Action Banner */}
          <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-slate-900 to-purple-500/10 border border-cyan-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 font-mono text-[10px] font-bold rounded">
                  PORTFOLIO SHOWCASE
                </span>
                <span className="text-white font-bold text-sm">Upload New Works &amp; Case Studies</span>
              </div>
              <p className="text-xs text-slate-400 max-w-xl">
                Upload screenshots, specify client deliverables, SLA metrics, tech stack tags, and live deployment links to showcase on the public Works page.
              </p>
            </div>
            <Button 
              variant="gradient" 
              size="sm" 
              icon={<Upload className="w-4 h-4" />}
              onClick={handleOpenAddPortfolio}
              className="shrink-0"
            >
              Upload New Work
            </Button>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search works by title, client, or tech..."
                value={portfolioSearch}
                onChange={(e) => setPortfolioSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>Showing {filteredPortfolio.length} of {portfolio.length} Works</span>
              <Link href="/portfolio" target="_blank">
                <Button size="sm" variant="ghost" className="text-cyan-400" icon={<ExternalLink className="w-3 h-3" />}>
                  View Public Works Page
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredPortfolio.map((item) => (
              <GlassCard key={item.id} className="p-5 border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {item.heroImage && (
                    <img 
                      src={item.heroImage} 
                      alt={item.title} 
                      className="w-24 h-20 rounded-xl object-cover border border-slate-800 shrink-0 hidden sm:block shadow-md" 
                    />
                  )}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-white text-base font-display">{item.title}</h4>
                      <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] font-mono text-cyan-400">
                        {item.category}
                      </span>
                      <span className="px-2 py-0.5 bg-purple-500/10 border border-purple-500/30 rounded-full text-[10px] font-mono text-purple-400">
                        {item.durationDays || 30} Days Delivery
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                      <span className="text-slate-300 font-semibold">{item.client}</span> • <span>{item.industry}</span>
                    </div>

                    <p className="text-xs text-slate-400 max-w-2xl line-clamp-2">{item.summary}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.techStack.map((tech) => (
                        <span key={tech} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[9px] font-mono">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {item.liveDemoUrl && (
                    <a 
                      href={item.liveDemoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-cyan-400 rounded-xl transition flex items-center gap-1.5 text-xs font-mono"
                      title="Open Live Project"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Demo</span>
                    </a>
                  )}
                  <Button 
                    size="sm" 
                    variant="outline" 
                    icon={<Edit3 className="w-3.5 h-3.5 text-cyan-400" />}
                    onClick={() => handleOpenEditPortfolio(item)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-red-400 hover:bg-red-500/10" 
                    icon={<Trash2 className="w-3.5 h-3.5" />}
                    onClick={() => handleDeletePortfolio(item.id, item.title)}
                  >
                    Delete
                  </Button>
                </div>
              </GlassCard>
            ))}

            {filteredPortfolio.length === 0 && (
              <div className="text-center py-16 text-slate-500 text-xs font-mono border border-dashed border-slate-800 rounded-2xl">
                No works found matching your search. Click "Upload New Work" above to add one.
              </div>
            )}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 2: BLOG ARTICLES
          ------------------------------------------------------------- */}
      {activeTab === "blog" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search blog articles by title, tags, or topic..."
                value={blogSearch}
                onChange={(e) => setBlogSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span>Showing {filteredBlogs.length} of {blogs.length} Articles</span>
              <Link href="/blog" target="_blank">
                <Button size="sm" variant="ghost" className="text-cyan-400" icon={<ExternalLink className="w-3 h-3" />}>
                  View Public Blog
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {filteredBlogs.map((post) => (
              <GlassCard key={post.id} className="p-5 border-slate-800 hover:border-slate-700 transition flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  {post.coverImage && (
                    <img 
                      src={post.coverImage} 
                      alt={post.title} 
                      className="w-20 h-20 rounded-xl object-cover border border-slate-800 shrink-0 hidden sm:block" 
                    />
                  )}
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-bold text-white text-base font-display">{post.title}</h4>
                      <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-[10px] font-mono text-cyan-400">
                        {post.category}
                      </span>
                    </div>

                    <div className="text-xs text-slate-400 font-mono flex items-center gap-3">
                      <span>By {post.author?.name || "Marcus Vance"} ({post.author?.role})</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-cyan-400" /> {post.readTime}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3 text-slate-500" /> {post.publishedAt}</span>
                    </div>

                    <p className="text-xs text-slate-400 max-w-2xl line-clamp-2">{post.excerpt}</p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {post.tags.map((tag) => (
                        <span key={tag} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[9px] font-mono">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  <Link href={`/blog/${post.slug}`} target="_blank">
                    <Button size="sm" variant="ghost" className="text-cyan-400" icon={<ExternalLink className="w-3.5 h-3.5" />}>
                      Read
                    </Button>
                  </Link>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    icon={<Edit3 className="w-3.5 h-3.5 text-cyan-400" />}
                    onClick={() => handleOpenEditBlog(post)}
                  >
                    Edit
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    className="text-red-400 hover:bg-red-500/10" 
                    icon={<Trash2 className="w-3.5 h-3.5" />}
                    onClick={() => handleDeleteBlog(post.id, post.title)}
                  >
                    Delete
                  </Button>
                </div>
              </GlassCard>
            ))}

            {filteredBlogs.length === 0 && (
              <div className="text-center py-16 text-slate-500 text-xs font-mono border border-dashed border-slate-800 rounded-2xl">
                No blog articles matching your search.
              </div>
            )}
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          TAB 3: CAREER OPENINGS & BENEFIT HIGHLIGHTS
          ------------------------------------------------------------- */}
      {activeTab === "careers" && (
        <div className="space-y-8">
          {/* Benefits & Perks Customizer Section */}
          <div className="space-y-4">
            <div className="border-b border-slate-850 pb-2">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Gift className="w-4 h-4 text-cyan-400" /> Careers Benefits &amp; Highlights
              </h3>
              <p className="text-[10px] text-slate-500 mt-0.5">Customize the highlight perk boxes rendered at the top of the careers page.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {perks.map((perk) => (
                <GlassCard key={perk.id} className="p-4 border-slate-800 flex flex-col justify-between gap-3 bg-slate-900/30">
                  <div className="space-y-1">
                    <div className="font-bold text-white text-[11px] font-mono uppercase tracking-wider">{perk.title}</div>
                    <div className="text-[10px] text-slate-400">{perk.description}</div>
                  </div>
                  <button
                    onClick={() => handleOpenEditPerk(perk)}
                    className="w-full py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/20 rounded-xl font-semibold text-[10px] flex items-center justify-center gap-1.5 transition"
                  >
                    <Edit className="w-3 h-3" /> Edit Benefit Highlight
                  </button>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* Open Job Listings Section */}
          <div className="space-y-4">
            <div className="border-b border-slate-850 pb-2 flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-purple-400" /> Active Job Listings ({careers.length})
                </h3>
                <p className="text-[10px] text-slate-500 mt-0.5">Manage positions open for recruitment and publicly visible on /careers.</p>
              </div>
              <Link href="/careers" target="_blank">
                <Button size="sm" variant="ghost" className="text-cyan-400" icon={<ExternalLink className="w-3 h-3" />}>
                  View Careers Page
                </Button>
              </Link>
            </div>

            <div className="space-y-3">
              {careers.map((item) => (
                <GlassCard key={item.id} className="p-4 flex items-center justify-between gap-4 text-xs border-slate-800">
                  <div className="space-y-1">
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-purple-400" /> {item.title}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono flex items-center gap-1.5">
                      <MapPin className="w-3 h-3 text-slate-500" /> {item.department} • {item.location} • {item.type}
                    </div>
                    <p className="text-[10px] text-slate-500 font-sans max-w-xl leading-relaxed">{item.summary}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {item.requirements.slice(0, 4).map((r, i) => (
                        <span key={i} className="px-2 py-0.5 bg-slate-800/80 rounded text-[9px] text-slate-300 font-mono">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => handleOpenEditCareer(item)}
                      className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 rounded-lg text-xs font-semibold transition"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteCareer(item.id, item.title)}
                      className="px-3 py-1.5 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 rounded-lg text-xs font-semibold transition"
                    >
                      Delete
                    </button>
                  </div>
                </GlassCard>
              ))}

              {careers.length === 0 && (
                <div className="text-center py-12 text-slate-500 text-xs font-mono border border-dashed border-slate-800 rounded-2xl">
                  No active job openings in the registry.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* -------------------------------------------------------------
          UPLOAD / EDIT WORK PROJECT MODAL
          ------------------------------------------------------------- */}
      <Modal 
        isOpen={isPortfolioModalOpen} 
        onClose={() => setIsPortfolioModalOpen(false)} 
        title={editingPortfolio ? "Edit Work / Case Study" : "Upload New Work / Project Showcase"}
      >
        <form onSubmit={handleSavePortfolio} className="space-y-4 font-sans text-xs max-h-[78vh] overflow-y-auto pr-1">
          {/* Work Title & URL Slug */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Work / Project Title</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. Enterprise Logistics & Fleet Dispatch Engine" 
                value={pfTitle}
                onChange={(e) => setPfTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">URL Slug (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. enterprise-logistics-engine" 
                value={pfSlug}
                onChange={(e) => setPfSlug(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono" 
              />
            </div>
          </div>

          {/* Client, Category & Industry */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Client / Brand Name</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. Global Fleet Co" 
                value={pfClient}
                onChange={(e) => setPfClient(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Category</label>
              <select 
                value={pfCategory}
                onChange={(e) => setPfCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Web Application">Web Application</option>
                <option value="ERP & Management">ERP & Management</option>
                <option value="EdTech Platform">EdTech Platform</option>
                <option value="Custom Software">Custom Software</option>
                <option value="AI Engine">AI Engine</option>
                <option value="Mobile Application">Mobile Application</option>
                <option value="E-Commerce & Storefront">E-Commerce & Storefront</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Industry</label>
              <select 
                value={pfIndustry}
                onChange={(e) => setPfIndustry(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Enterprise Operations">Enterprise Operations</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Logistics">Logistics</option>
                <option value="Education & Learning">Education & Learning</option>
                <option value="Personal & Business Branding">Personal & Business Branding</option>
                <option value="Legal & Corporate">Legal & Corporate</option>
              </select>
            </div>
          </div>

          {/* SPRINT DURATION & LIVE URL */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Delivery Sprint Duration (Days)</label>
              <input 
                required 
                type="number" 
                min={1} 
                max={90}
                value={pfDuration}
                onChange={(e) => setPfDuration(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono" 
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Live Demo / Project URL</label>
              <input 
                type="url" 
                placeholder="https://..." 
                value={pfLiveDemoUrl}
                onChange={(e) => setPfLiveDemoUrl(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono" 
              />
            </div>
          </div>

          {/* DRAG-AND-DROP ASSET UPLOAD DROPZONE */}
          <div className="space-y-2 p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Upload className="w-3.5 h-3.5 text-cyan-400" /> Work Screenshot / Cover Image
              </label>
              <span className="text-[10px] text-slate-500 font-mono">PNG, JPG, WebP up to 5MB</span>
            </div>

            {/* Hidden native input */}
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="image/*" 
              className="hidden"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  handleFileUpload(e.target.files[0]);
                }
              }}
            />

            {/* Dropzone Box */}
            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setIsDragging(false);
                if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                  handleFileUpload(e.dataTransfer.files[0]);
                }
              }}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-5 text-center cursor-pointer transition flex flex-col items-center justify-center gap-2 ${
                isDragging 
                  ? "border-cyan-400 bg-cyan-500/10" 
                  : "border-slate-800 hover:border-slate-700 bg-slate-900/40 hover:bg-slate-900/80"
              }`}
            >
              {pfHeroImage ? (
                <div className="relative w-full max-h-48 overflow-hidden rounded-lg group">
                  <img 
                    src={pfHeroImage} 
                    alt="Preview" 
                    className="w-full h-36 object-cover rounded-lg border border-slate-700" 
                  />
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                    <span className="px-3 py-1.5 rounded-lg bg-cyan-500 text-white font-bold text-[10px] flex items-center gap-1">
                      <Upload className="w-3 h-3" /> Change Image
                    </span>
                  </div>
                </div>
              ) : (
                <>
                  <div className="p-3 rounded-full bg-cyan-500/10 text-cyan-400">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs">Click to browse file or drag &amp; drop here</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">High-resolution mockup, Figma export or live screenshot</div>
                  </div>
                </>
              )}
            </div>

            {/* Image URL fallback & presets */}
            <div className="space-y-1.5 pt-2">
              <label className="block text-[10px] text-slate-400 font-mono">Or paste direct image URL</label>
              <input 
                type="url" 
                placeholder="https://images.unsplash.com/..." 
                value={pfHeroImage}
                onChange={(e) => setPfHeroImage(e.target.value)}
                className="w-full px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono" 
              />
            </div>

            {/* Template Presets Picker */}
            <div className="pt-2">
              <div className="text-[10px] text-slate-400 font-mono mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-purple-400" /> Or select from stock showcase presets:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.name}
                    type="button"
                    onClick={() => {
                      setPfHeroImage(tpl.url);
                      setPfCategory(tpl.category);
                      setPfIndustry(tpl.industry);
                      showToast(`Applied "${tpl.name}" stock template image.`);
                    }}
                    className="px-2 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-[10px] text-slate-300 hover:text-cyan-300 font-mono transition"
                  >
                    {tpl.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Overview Summary */}
          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Work Overview &amp; Summary</label>
            <textarea 
              required 
              rows={2}
              placeholder="A concise summary of the client's business challenge, the engineered solution, and deliverables..." 
              value={pfSummary}
              onChange={(e) => setPfSummary(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 resize-none" 
            />
          </div>

          {/* Challenge & Solution */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Client Challenge</label>
              <textarea 
                rows={2}
                placeholder="The core problem, inefficiency, or technical limitation faced..." 
                value={pfChallenge}
                onChange={(e) => setPfChallenge(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 resize-none" 
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Engineered Solution</label>
              <textarea 
                rows={2}
                placeholder="What we architected, built, tested, and deployed..." 
                value={pfSolution}
                onChange={(e) => setPfSolution(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 resize-none" 
              />
            </div>
          </div>

          {/* Architecture Pipeline */}
          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">System Architecture Flow</label>
            <input 
              type="text" 
              placeholder="e.g. Next.js 15 -> Node.js -> PostgreSQL -> Vercel Edge" 
              value={pfArchitecture}
              onChange={(e) => setPfArchitecture(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono" 
            />
          </div>

          {/* Impact Metrics */}
          <div className="space-y-2 p-3 bg-slate-900/40 rounded-xl border border-slate-800/80">
            <label className="block font-semibold text-slate-200">Key Deliverable Metrics (Highlights)</label>
            <div className="grid grid-cols-3 gap-2">
              <div>
                <input 
                  type="text" 
                  placeholder="Metric 1 Label" 
                  value={pfMetric1Label} 
                  onChange={(e) => setPfMetric1Label(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-[11px] text-white" 
                />
                <input 
                  type="text" 
                  placeholder="Value (e.g. Real-Time)" 
                  value={pfMetric1Value} 
                  onChange={(e) => setPfMetric1Value(e.target.value)}
                  className="w-full px-2 py-1.5 mt-1 bg-slate-900 border border-cyan-500/30 rounded-lg text-[11px] text-cyan-300 font-bold font-mono" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Metric 2 Label" 
                  value={pfMetric2Label} 
                  onChange={(e) => setPfMetric2Label(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-[11px] text-white" 
                />
                <input 
                  type="text" 
                  placeholder="Value (e.g. 100% RBAC)" 
                  value={pfMetric2Value} 
                  onChange={(e) => setPfMetric2Value(e.target.value)}
                  className="w-full px-2 py-1.5 mt-1 bg-slate-900 border border-purple-500/30 rounded-lg text-[11px] text-purple-300 font-bold font-mono" 
                />
              </div>
              <div>
                <input 
                  type="text" 
                  placeholder="Metric 3 Label" 
                  value={pfMetric3Label} 
                  onChange={(e) => setPfMetric3Label(e.target.value)}
                  className="w-full px-2 py-1.5 bg-slate-900 border border-slate-800 rounded-lg text-[11px] text-white" 
                />
                <input 
                  type="text" 
                  placeholder="Value (e.g. 99+ Score)" 
                  value={pfMetric3Value} 
                  onChange={(e) => setPfMetric3Value(e.target.value)}
                  className="w-full px-2 py-1.5 mt-1 bg-slate-900 border border-emerald-500/30 rounded-lg text-[11px] text-emerald-300 font-bold font-mono" 
                />
              </div>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Tech Stack Tags (Comma Separated)</label>
            <input 
              required 
              type="text" 
              placeholder="e.g. Next.js, React, TypeScript, Tailwind CSS, PostgreSQL" 
              value={pfTechStack}
              onChange={(e) => setPfTechStack(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
            />
          </div>

          {/* Features Highlights */}
          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Feature Highlights (Comma Separated)</label>
            <input 
              type="text" 
              placeholder="e.g. Modern UI, Role-Based Access, Real-Time Sync" 
              value={pfFeatures}
              onChange={(e) => setPfFeatures(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
            />
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setIsPortfolioModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1" size="sm" icon={<Upload className="w-3.5 h-3.5" />}>
              {editingPortfolio ? "Save Work Changes" : "Upload & Publish Work"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* -------------------------------------------------------------
          BLOG ADD/EDIT MODAL
          ------------------------------------------------------------- */}
      <Modal 
        isOpen={isBlogModalOpen} 
        onClose={() => setIsBlogModalOpen(false)} 
        title={editingBlog ? "Edit Blog Article" : "Write New Blog Article"}
      >
        <form onSubmit={handleSaveBlog} className="space-y-4 font-sans text-xs max-h-[75vh] overflow-y-auto pr-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Article Title</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. How We Ship Enterprise Software in 30 Days" 
                value={blogTitle}
                onChange={(e) => setBlogTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">URL Slug (Optional)</label>
              <input 
                type="text" 
                placeholder="e.g. how-we-ship-production-apps" 
                value={blogSlug}
                onChange={(e) => setBlogSlug(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Category</label>
              <select 
                value={blogCategory}
                onChange={(e) => setBlogCategory(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Engineering Strategy">Engineering Strategy</option>
                <option value="Frontend Development">Frontend Development</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Backend Architecture">Backend Architecture</option>
                <option value="Security & Compliance">Security & Compliance</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Reading Time</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. 6 min read" 
                value={blogReadTime}
                onChange={(e) => setBlogReadTime(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Publish Date</label>
              <input 
                required 
                type="date" 
                value={blogPublishedAt}
                onChange={(e) => setBlogPublishedAt(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Author Name</label>
              <input 
                required 
                type="text" 
                placeholder="Marcus Vance" 
                value={blogAuthorName}
                onChange={(e) => setBlogAuthorName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Author Role</label>
              <input 
                required 
                type="text" 
                placeholder="Chief Technology Officer" 
                value={blogAuthorRole}
                onChange={(e) => setBlogAuthorRole(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Author Avatar URL</label>
              <input 
                type="url" 
                value={blogAuthorAvatar}
                onChange={(e) => setBlogAuthorAvatar(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Cover Image URL</label>
            <input 
              required 
              type="url" 
              placeholder="https://images.unsplash.com/..." 
              value={blogCoverImage}
              onChange={(e) => setBlogCoverImage(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono" 
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Short Excerpt (Teaser)</label>
            <textarea 
              required 
              rows={2}
              placeholder="Brief 1-2 sentence teaser summary shown on blog grid cards..." 
              value={blogExcerpt}
              onChange={(e) => setBlogExcerpt(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 resize-none" 
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Full Article Content (Markdown / Text)</label>
            <textarea 
              required 
              rows={6}
              placeholder="Write the full technical article text, subheadings, and analysis..." 
              value={blogContent}
              onChange={(e) => setBlogContent(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono leading-relaxed" 
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Article Tags (Comma Separated)</label>
            <input 
              required 
              type="text" 
              placeholder="Next.js, Agile, Web Development, Architecture" 
              value={blogTags}
              onChange={(e) => setBlogTags(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
            />
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setIsBlogModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1" size="sm">
              {editingBlog ? "Update Article" : "Publish Blog Article"}
            </Button>
          </div>
        </form>
      </Modal>

      {/* -------------------------------------------------------------
          CAREERS ADD/EDIT MODAL
          ------------------------------------------------------------- */}
      <Modal 
        isOpen={isCareerModalOpen} 
        onClose={() => setIsCareerModalOpen(false)} 
        title={editingJob ? "Edit Job Opening" : "Create New Job Opening"}
      >
        <form onSubmit={handleSaveCareer} className="space-y-4 font-sans text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Job Title</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. Senior Full-Stack Architect" 
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Department</label>
              <select 
                value={formDept}
                onChange={(e) => setFormDept(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="Engineering">Engineering</option>
                <option value="Creative Studio">Creative Studio</option>
                <option value="Operations">Operations</option>
                <option value="Growth">Growth</option>
                <option value="Finance">Finance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Location</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. Remote / Hybrid" 
                value={formLoc}
                onChange={(e) => setFormLoc(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
              />
            </div>
            <div className="space-y-1">
              <label className="block font-semibold text-slate-300">Job Type</label>
              <input 
                required 
                type="text" 
                placeholder="e.g. Full-time" 
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Job Summary</label>
            <textarea 
              required 
              rows={3}
              placeholder="Provide a brief summary of the role and responsibilities..." 
              value={formSummary}
              onChange={(e) => setFormSummary(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 resize-none" 
            />
          </div>

          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Key Requirements (Comma Separated)</label>
            <input 
              required 
              type="text" 
              placeholder="e.g. Next.js, TypeScript, Tailwind CSS, 3+ years experience" 
              value={formReqs}
              onChange={(e) => setFormReqs(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
            />
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setIsCareerModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1" size="sm">
              Save Job Opening
            </Button>
          </div>
        </form>
      </Modal>

      {/* -------------------------------------------------------------
          PERK EDIT MODAL
          ------------------------------------------------------------- */}
      <Modal
        isOpen={!!editingPerk}
        onClose={() => setEditingPerk(null)}
        title="Edit Benefit Highlight"
      >
        <form onSubmit={handleSavePerk} className="space-y-4 font-sans text-xs">
          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Benefit Title</label>
            <input 
              required 
              type="text" 
              value={perkTitle}
              onChange={(e) => setPerkTitle(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500 font-mono" 
            />
          </div>
          <div className="space-y-1">
            <label className="block font-semibold text-slate-300">Description</label>
            <input 
              required 
              type="text" 
              value={perkDesc}
              onChange={(e) => setPerkDesc(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-cyan-500" 
            />
          </div>

          <div className="pt-3 flex gap-2">
            <Button type="button" variant="outline" className="flex-1" size="sm" onClick={() => setEditingPerk(null)}>
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
