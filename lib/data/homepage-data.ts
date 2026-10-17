export interface MetricItem {
  id: string;
  val: string;
  label: string;
  color: string;
}

export interface HeroSectionConfig {
  badgeSubtitle: string;
  badgeHighlight: string;
  headlinePart1: string;
  headlinePart2: string;
  subheading: string;
  highlightDeliveryText: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  metrics: MetricItem[];
}

export interface TickerSectionConfig {
  items: string[];
  direction: "left" | "right";
  enabled: boolean;
}

export interface PillarCard {
  id: string;
  title: string;
  description: string;
  color: string;
}

export interface AboutSectionConfig {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  description: string;
  pillars: PillarCard[];
}

export interface CompletedProjectItem {
  id: string;
  title: string;
  category: string;
  liveDemoUrl: string;
  heroImage: string;
  description: string;
  features: string[];
  techStack: string[];
  statusBadge: string;
  visible: boolean;
}

export interface ProjectsSectionConfig {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
  projects: CompletedProjectItem[];
}

export interface TechItem {
  name: string;
  desc: string;
}

export interface TechCategory {
  id: string;
  category: string;
  iconName: string;
  color: string;
  items: TechItem[];
}

export interface TechStackSectionConfig {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
  categories: TechCategory[];
}

export interface DevProcessStep {
  id: string;
  stepNumber: string;
  phaseLabel: string;
  title: string;
  desc: string;
}

export interface ProcessSectionConfig {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
  highlightDays: string;
  steps: DevProcessStep[];
}

export interface SecurityPracticeItem {
  id: string;
  title: string;
  desc: string;
  iconName?: string;
}

export interface SecuritySectionConfig {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  subtitle: string;
  practices: SecurityPracticeItem[];
}

export interface SupportPillarItem {
  id: string;
  title: string;
  desc: string;
}

export interface SupportSectionConfig {
  badge: string;
  titlePart1: string;
  titlePart2: string;
  quoteText: string;
  ctaHeading: string;
  ctaButtonText: string;
  pillars: SupportPillarItem[];
}

export interface HomepageConfig {
  hero: HeroSectionConfig;
  ticker: TickerSectionConfig;
  about: AboutSectionConfig;
  projects: ProjectsSectionConfig;
  techStack: TechStackSectionConfig;
  process: ProcessSectionConfig;
  security: SecuritySectionConfig;
  support: SupportSectionConfig;
  lastUpdated?: string;
}

export const DEFAULT_HOMEPAGE_CONFIG: HomepageConfig = {
  hero: {
    badgeSubtitle: "VARUNYA TECHNOLOGIES",
    badgeHighlight: "ARCHITECTURAL DIGITAL SYSTEMS",
    headlinePart1: "BUILD WHAT",
    headlinePart2: "COMES NEXT.",
    subheading: "VarunyaTech designs and architects custom software platforms, high-velocity web applications, and autonomous digital systems built for enterprise scale and operational resilience.",
    highlightDeliveryText: "30–40 days",
    primaryCtaText: "EXPLORE OUR WORK",
    primaryCtaLink: "#works",
    secondaryCtaText: "OUR APPROACH",
    metrics: [
      { id: "m1", val: "30–40 DAYS", label: "DELIVERY CYCLE", color: "text-[#F2F4F6]" },
      { id: "m2", val: "4 COMPLETED", label: "LIVE PUBLIC APPS", color: "text-[#D6D8DC]" },
      { id: "m3", val: "ENTERPRISE", label: "SOLID ARCHITECTURE", color: "text-[#C8CDD4]" },
      { id: "m4", val: "CONTINUOUS", label: "POST-LAUNCH PARTNERSHIP", color: "text-[#9299A3]" }
    ]
  },
  ticker: {
    enabled: true,
    direction: "left",
    items: [
      "VARUNYA TECHNOLOGIES",
      "ARCHITECTURAL DIGITAL SYSTEMS",
      "CUSTOM SOFTWARE PLATFORMS",
      "30–40 DAY SPRINT CYCLES",
      "CONTINUOUS CLIENT PARTNERSHIP",
      "FULL-STACK RESILIENCE"
    ]
  },
  about: {
    badge: "ABOUT VARUNYA TECHNOLOGIES",
    titlePart1: "WHO WE",
    titlePart2: "ARE",
    description: "We specialize in building custom web applications that solve real-world problems. From requirement gathering and UI/UX design to development, deployment, and post-launch support, we work closely with clients to deliver reliable, secure, and scalable digital solutions. Our focus is on quality, transparent communication, and long-term partnerships.",
    pillars: [
      { id: "p1", title: "QUALITY FIRST", description: "Clean, maintainable & secure code architecture", color: "text-[#F2F4F6]" },
      { id: "p2", title: "TRANSPARENT", description: "Clear communication & continuous progress updates", color: "text-[#D6D8DC]" },
      { id: "p3", title: "LONG-TERM", description: "Ongoing post-launch client partnership", color: "text-[#9299A3]" }
    ]
  },
  projects: {
    badge: "OUR COMPLETED PROJECTS",
    titlePart1: "PUBLICLY",
    titlePart2: "AVAILABLE WORKS",
    subtitle: "Explore our successfully completed custom software applications currently live in production.",
    projects: [
      {
        id: "p1",
        title: "ERP Platform",
        category: "Enterprise Operations",
        liveDemoUrl: "https://erp-tan-six.vercel.app/",
        heroImage: "/images/products/erp-platform.jpg",
        description: "A modern ERP platform designed to streamline organizational operations with role-based access, centralized management, and an intuitive dashboard.",
        features: [
          "User Authentication",
          "Dashboard",
          "Role-Based Access",
          "Responsive Interface",
          "Modern UI",
          "Secure Data Handling"
        ],
        techStack: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
        statusBadge: "RELEASED & LIVE",
        visible: true
      },
      {
        id: "p2",
        title: "Personal Portfolio Website",
        category: "Web Application",
        liveDemoUrl: "https://bhuvanamohanchowdary.vercel.app/",
        heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
        description: "A professional portfolio showcasing skills, projects, technical expertise, and experience through a clean, responsive, and modern design.",
        features: [
          "Responsive Design",
          "Project Showcase",
          "Skills Section",
          "Contact Integration",
          "Performance Optimized"
        ],
        techStack: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vercel"],
        statusBadge: "LIVE DEPLOYED",
        visible: true
      },
      {
        id: "p3",
        title: "Fun With Abacus",
        category: "Educational Platform",
        liveDemoUrl: "https://funwithabacus.vercel.app/",
        heroImage: "/images/products/fun-with-abacus.jpg",
        description: "An interactive educational platform designed to make learning abacus engaging and accessible through digital practice and intuitive user interfaces.",
        features: [
          "Interactive Learning",
          "Educational UI",
          "Student-Friendly Design",
          "Responsive Layout",
          "Smooth User Experience"
        ],
        techStack: ["Next.js", "React.js", "JavaScript", "HTML5", "Tailwind CSS", "Firebase"],
        statusBadge: "RELEASED & LIVE",
        visible: true
      },
      {
        id: "p4",
        title: "Jignasa",
        category: "Web Application",
        liveDemoUrl: "https://jignasa.vercel.app/",
        heroImage: "/images/products/jignasa.jpg",
        description: "A modern web application built with a focus on usability, responsive design, and an engaging user experience.",
        features: [
          "Modern UI/UX",
          "Responsive Design",
          "Optimized Performance",
          "Clean Navigation"
        ],
        techStack: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Vercel"],
        statusBadge: "LIVE DEPLOYED",
        visible: true
      }
    ]
  },
  techStack: {
    badge: "TECHNOLOGY STACK",
    titlePart1: "PROVEN",
    titlePart2: "DEVELOPMENT STACK",
    subtitle: "We leverage modern, industry-standard tools to build fast, maintainable, and secure web applications.",
    categories: [
      {
        id: "tc1",
        category: "Frontend",
        iconName: "Layout",
        color: "text-[#F2F4F6]",
        items: [
          { name: "React.js", desc: "Interactive UI Library" },
          { name: "Next.js", desc: "Full-Stack App Router" },
          { name: "HTML5", desc: "Semantic Markup" },
          { name: "CSS3", desc: "Modern Flex & Grid" },
          { name: "Tailwind CSS", desc: "Utility Design System" },
          { name: "JavaScript", desc: "ES6+ Modern Syntax" },
          { name: "TypeScript", desc: "Type-Safe Application Code" }
        ]
      },
      {
        id: "tc2",
        category: "Backend",
        iconName: "Server",
        color: "text-[#D6D8DC]",
        items: [
          { name: "Node.js", desc: "Event-Driven Server Runtime" },
          { name: "Express.js", desc: "Fast Web Middleware" },
          { name: "REST APIs", desc: "Standardized Endpoint Design" }
        ]
      },
      {
        id: "tc3",
        category: "Databases",
        iconName: "Database",
        color: "text-[#C8CDD4]",
        items: [
          { name: "Firebase Firestore", desc: "Realtime Document DB" },
          { name: "Supabase", desc: "Open Source Backend DB" },
          { name: "PostgreSQL", desc: "Relational Enterprise DB" },
          { name: "MySQL", desc: "Reliable SQL Engine" },
          { name: "MongoDB", desc: "Flexible NoSQL Storage" }
        ]
      },
      {
        id: "tc4",
        category: "Deployment",
        iconName: "Cloud",
        color: "text-[#3E5065]",
        items: [
          { name: "Vercel", desc: "Edge Global Cloud Network" },
          { name: "Firebase Hosting", desc: "Secure SSL Global Hosting" },
          { name: "Netlify", desc: "Automated Jamstack CI/CD" }
        ]
      }
    ]
  },
  process: {
    badge: "OUR DEVELOPMENT PROCESS",
    titlePart1: "STRATEGIC",
    titlePart2: "DEVELOPMENT TIMELINE",
    subtitle: "Most custom projects are completed within 30–40 days, depending on project complexity and client requirements.",
    highlightDays: "30–40 days",
    steps: [
      { id: "s1", stepNumber: "01", phaseLabel: "PHASE 1", title: "Requirement Analysis", desc: "Understanding business goals, scoping core deliverables, mapping user stories, and locking project specifications." },
      { id: "s2", stepNumber: "02", phaseLabel: "PHASE 2", title: "UI/UX Design", desc: "Crafting intuitive wireframes, responsive design systems, interactive prototypes, and clean navigation flows." },
      { id: "s3", stepNumber: "03", phaseLabel: "PHASE 3", title: "Development", desc: "Writing clean, maintainable, modular frontend and backend code with Next.js, React, Node.js, and database schemas." },
      { id: "s4", stepNumber: "04", phaseLabel: "PHASE 4", title: "Testing", desc: "Performing cross-browser responsiveness checks, security vulnerability scans, performance tuning, and staging verification." },
      { id: "s5", stepNumber: "05", phaseLabel: "PHASE 5", title: "Deployment", desc: "Configuring environment variables, setting up HTTPS encryption, and launching live to production cloud servers." },
      { id: "s6", stepNumber: "06", phaseLabel: "PHASE 6", title: "Ongoing Support", desc: "Providing continuous post-launch maintenance, bug fixes, security updates, and technical assistance." }
    ]
  },
  security: {
    badge: "SECURE DEVELOPMENT STANDARDS",
    titlePart1: "SECURITY &",
    titlePart2: "QUALITY ASSURANCE",
    subtitle: "Every project follows secure development practices and production quality checks.",
    practices: [
      { id: "sec1", title: "Secure Authentication", desc: "OAuth, JWT, and encrypted session management protecting user logins." },
      { id: "sec2", title: "Role-Based Access Control", desc: "Granular access levels ensuring users access only authorized application modules." },
      { id: "sec3", title: "HTTPS Encryption", desc: "Enforced SSL/TLS protocols securing data in transit across all pages." },
      { id: "sec4", title: "Input Validation", desc: "Sanitizing all user inputs to prevent malicious payloads or unexpected exceptions." },
      { id: "sec5", title: "SQL Injection & XSS Protection", desc: "Parameterized database queries and output escaping to eliminate attack vectors." },
      { id: "sec6", title: "Secure API Design", desc: "Rate limiting, CORS headers, and token-based protection for REST endpoints." },
      { id: "sec7", title: "Environment Variable Management", desc: "Keeping API keys, database credentials, and secrets securely segregated from client code." },
      { id: "sec8", title: "Responsive & Performance-Optimized", desc: "Fast page load times and sub-pixel responsive layouts across mobile & desktop." },
      { id: "sec9", title: "Code Quality Reviews", desc: "Enforcing clean code standards, modular structure, and strict typing." },
      { id: "sec10", title: "Production Testing Before Deployment", desc: "Thorough staging environment regression tests prior to live deployment cutover." }
    ]
  },
  support: {
    badge: "LONG-TERM COMMITMENT",
    titlePart1: "POST-LAUNCH",
    titlePart2: "SUPPORT & MAINTENANCE",
    quoteText: "We believe in building long-term relationships with our clients. Our support continues after deployment to ensure every application remains secure, reliable, and up to date.",
    ctaHeading: "Ready to build your custom software solution?",
    ctaButtonText: "Start Your Project With Us",
    pillars: [
      { id: "sp1", title: "Bug Fixes", desc: "Rapid triage and resolution for any post-launch software issues." },
      { id: "sp2", title: "Feature Enhancements", desc: "Continuous additions as your business or institution grows." },
      { id: "sp3", title: "Performance Optimization", desc: "Ongoing page speed, caching, and database query tuning." },
      { id: "sp4", title: "Security Updates", desc: "Regular dependency patch management and security maintenance." },
      { id: "sp5", title: "Technical Assistance", desc: "Direct developer guidance, troubleshooting, and advice." },
      { id: "sp6", title: "Ongoing Maintenance", desc: "Proactive uptime monitoring and system health checks." }
    ]
  }
};

const STORAGE_KEY = "varunya_homepage_config_v1";
const EVENT_NAME = "varunya_homepage_updated";

export function getStoredHomepageConfig(): HomepageConfig {
  if (typeof window === "undefined") {
    return DEFAULT_HOMEPAGE_CONFIG;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_HOMEPAGE_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_HOMEPAGE_CONFIG,
      ...parsed,
      hero: { ...DEFAULT_HOMEPAGE_CONFIG.hero, ...(parsed.hero || {}) },
      ticker: { ...DEFAULT_HOMEPAGE_CONFIG.ticker, ...(parsed.ticker || {}) },
      about: { ...DEFAULT_HOMEPAGE_CONFIG.about, ...(parsed.about || {}) },
      projects: { ...DEFAULT_HOMEPAGE_CONFIG.projects, ...(parsed.projects || {}) },
      techStack: { ...DEFAULT_HOMEPAGE_CONFIG.techStack, ...(parsed.techStack || {}) },
      process: { ...DEFAULT_HOMEPAGE_CONFIG.process, ...(parsed.process || {}) },
      security: { ...DEFAULT_HOMEPAGE_CONFIG.security, ...(parsed.security || {}) },
      support: { ...DEFAULT_HOMEPAGE_CONFIG.support, ...(parsed.support || {}) }
    };
  } catch (err) {
    console.error("Error reading homepage config from localStorage:", err);
    return DEFAULT_HOMEPAGE_CONFIG;
  }
}

export function saveHomepageConfig(config: HomepageConfig): void {
  if (typeof window === "undefined") return;
  try {
    const payload = { ...config, lastUpdated: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: payload }));
  } catch (err) {
    console.error("Error saving homepage config to localStorage:", err);
  }
}

export function resetHomepageConfig(): HomepageConfig {
  if (typeof window === "undefined") return DEFAULT_HOMEPAGE_CONFIG;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: DEFAULT_HOMEPAGE_CONFIG }));
  } catch (err) {
    console.error("Error resetting homepage config:", err);
  }
  return DEFAULT_HOMEPAGE_CONFIG;
}

export function subscribeHomepageUpdates(callback: (config: HomepageConfig) => void): () => void {
  if (typeof window === "undefined") return () => {};
  
  const handler = (e: Event) => {
    const customEvent = e as CustomEvent<HomepageConfig>;
    if (customEvent.detail) {
      callback(customEvent.detail);
    } else {
      callback(getStoredHomepageConfig());
    }
  };

  const storageHandler = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      callback(getStoredHomepageConfig());
    }
  };

  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener("storage", storageHandler);

  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener("storage", storageHandler);
  };
}
