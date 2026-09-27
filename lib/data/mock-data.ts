export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDesc: string;
  iconName: string;
  overview: string;
  benefits: string[];
  techStack: string[];
  process: { step: string; title: string; desc: string }[];
  timelineDays: number;
  startingPrice: string;
  faqs: { q: string; a: string }[];
  relatedCaseStudy: string;
}

export interface IndustryItem {
  id: string;
  slug: string;
  title: string;
  iconName: string;
  tagline: string;
  challenges: string[];
  solutions: string[];
  techStack: string[];
  compliance: string[];
  metrics: string[];
}

export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  industry: string;
  durationDays: number;
  heroImage: string;
  summary: string;
  challenge: string;
  solution: string;
  architecture: string;
  impactMetrics: { label: string; value: string }[];
  techStack: string[];
  liveDemoUrl?: string;
  features?: string[];
}

export interface BlogItem {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: { name: string; role: string; avatar: string };
  readTime: string;
  publishedAt: string;
  tags: string[];
  coverImage: string;
}

export interface CareerItem {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  summary: string;
  requirements: string[];
}

export const PORTFOLIO_DATA: PortfolioItem[] = [
  {
    id: "p1",
    slug: "erp-platform",
    title: "ERP Platform",
    client: "Enterprise Operations",
    category: "ERP & Management",
    industry: "Enterprise Operations",
    durationDays: 35,
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    summary: "A modern ERP platform designed to streamline organizational operations with role-based access, centralized management, and an intuitive dashboard.",
    challenge: "Managing fragmented operational workflows and distributed user access across multiple organizational departments without centralized control.",
    solution: "Built a centralized, role-based enterprise management system with dynamic analytics dashboards and encrypted authentication.",
    architecture: "Next.js -> Node.js -> PostgreSQL / Supabase -> Role-Based RBAC Auth Engine",
    impactMetrics: [
      { label: "Role-Based Security", value: "100% Granular" },
      { label: "Operational Speed", value: "Real-Time" },
      { label: "UI Experience", value: "Modern Glass" }
    ],
    techStack: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    liveDemoUrl: "https://erp-tan-six.vercel.app/",
    features: [
      "User Authentication",
      "Dashboard",
      "Role-Based Access",
      "Responsive Interface",
      "Modern UI",
      "Secure Data Handling"
    ]
  },
  {
    id: "p2",
    slug: "personal-portfolio-website",
    title: "Personal Portfolio Website",
    client: "Professional Portfolio",
    category: "Web Application",
    industry: "Personal & Business Branding",
    durationDays: 30,
    heroImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    summary: "A professional portfolio showcasing skills, projects, technical expertise, and experience through a clean, responsive, and modern design.",
    challenge: "Creating a high-impact, fast-loading personal brand presence that highlights complex technical accomplishments with seamless responsiveness.",
    solution: "Engineered an ultra-fast, performance-optimized portfolio website with interactive project galleries and direct contact integration.",
    architecture: "React.js -> Tailwind CSS -> Vercel Edge CDN -> Custom Motion Effects",
    impactMetrics: [
      { label: "Lighthouse Performance", value: "99+" },
      { label: "Mobile Responsiveness", value: "100%" },
      { label: "Load Velocity", value: "<100ms" }
    ],
    techStack: ["React.js", "JavaScript", "HTML5", "CSS3", "Tailwind CSS", "Vercel"],
    liveDemoUrl: "https://bhuvanamohanchowdary.vercel.app/",
    features: [
      "Responsive Design",
      "Project Showcase",
      "Skills Section",
      "Contact Integration",
      "Performance Optimized"
    ]
  },
  {
    id: "p3",
    slug: "fun-with-abacus",
    title: "Fun With Abacus",
    client: "EdTech Learning",
    category: "EdTech Platform",
    industry: "Education & Learning",
    durationDays: 35,
    heroImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    summary: "An interactive educational platform designed to make learning abacus engaging and accessible through digital practice and intuitive user interfaces.",
    challenge: "Transitioning traditional physical abacus mental math exercises into an intuitive, engaging digital learning web environment for students.",
    solution: "Designed and developed a student-friendly, highly responsive interactive learning suite with smooth touch-enabled visual feedback.",
    architecture: "Next.js -> React.js -> Custom Canvas & CSS Animations -> Vercel Cloud",
    impactMetrics: [
      { label: "Student Engagement", value: "Interactive" },
      { label: "User Usability", value: "100% Accessible" },
      { label: "UI Experience", value: "Educational" }
    ],
    techStack: ["Next.js", "React.js", "JavaScript", "HTML5", "Tailwind CSS", "Firebase"],
    liveDemoUrl: "https://funwithabacus.vercel.app/",
    features: [
      "Interactive Learning",
      "Educational UI",
      "Student-Friendly Design",
      "Responsive Layout",
      "Smooth User Experience"
    ]
  },
  {
    id: "p4",
    slug: "jignasa",
    title: "Jignasa",
    client: "Educational & Knowledge Hub",
    category: "Web Application",
    industry: "Knowledge & Usability",
    durationDays: 30,
    heroImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    summary: "A modern web application built with a focus on usability, responsive design, and an engaging user experience.",
    challenge: "Architecting a multi-device web experience prioritizing effortless content navigation and swift page load speed.",
    solution: "Delivered a clean, highly optimized web application featuring intuitive navigation architecture and mobile-first responsiveness.",
    architecture: "Next.js -> React.js -> Tailwind CSS -> Vercel Deployment Pipeline",
    impactMetrics: [
      { label: "Page Load Speed", value: "Sub-Second" },
      { label: "Navigation Clarity", value: "100% Clean" },
      { label: "Design Polish", value: "Modern UI" }
    ],
    techStack: ["Next.js", "React.js", "TypeScript", "Tailwind CSS", "Vercel"],
    liveDemoUrl: "https://jignasa.vercel.app/",
    features: [
      "Modern UI/UX",
      "Responsive Design",
      "Optimized Performance",
      "Clean Navigation"
    ]
  }
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "s1",
    slug: "web-development",
    title: "Web Development",
    shortDesc: "High-performance Next.js & React web platforms engineered for extreme velocity & conversion.",
    iconName: "Globe",
    overview: "We architect hyper-fast, visually captivating modern web applications in under 30 days using Next.js App Router, Tailwind CSS, TypeScript, and server-side optimization.",
    benefits: [
      "Sub-second page load times with Next.js SSR & ISR",
      "95+ Lighthouse performance, SEO, & WCAG accessibility scores",
      "Pixel-perfect responsive design across desktop, tablet, & mobile",
      "Built-in Analytics & Automated Conversion Tracking"
    ],
    techStack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Framer Motion", "Vercel"],
    process: [
      { step: "01", title: "Day 1-5: Scope & Wireframing", desc: "Design specs, interactive Figma prototypes, and system architecture mapping." },
      { step: "02", title: "Day 6-20: Core Sprint", desc: "Frontend component construction, API integration, and responsive layout assembly." },
      { step: "03", title: "Day 21-25: QA & Optimization", desc: "Core Web Vitals tuning, security audits, and cross-device testing." },
      { step: "04", title: "Day 26-30: Launch & Handoff", desc: "Production deployment, DNS cutover, CI/CD pipeline set up, and staff training." }
    ],
    timelineDays: 30,
    startingPrice: "$9,500",
    faqs: [
      { q: "Can a full enterprise site really be delivered in 30 days?", a: "Yes. Using our battle-tested reusable UI design tokens, pre-built component library, and agile AI-assisted sprint workflows, we guarantee 30-day production deployments." },
      { q: "What happens after the 30 days?", a: "We provide 30 days of complimentary post-launch monitoring and bug fixes, alongside flexible monthly maintenance retainers." }
    ],
    relatedCaseStudy: "fintech-core-platform"
  },
  {
    id: "s2",
    slug: "custom-software",
    title: "Custom Software",
    shortDesc: "Bespoke full-stack web and backend engines tailored specifically to your business workflows.",
    iconName: "Code2",
    overview: "Custom software tailored precisely to eliminate operational bottlenecks, automate manual data entry, and integrate seamlessly with your existing software ecosystem.",
    benefits: [
      "Zero legacy tech debt with clean SOLID software architecture",
      "Automated unit, integration, and end-to-end test suites",
      "Custom RESTful and GraphQL API backends",
      "Built to scale to 1M+ active monthly users"
    ],
    techStack: ["Node.js", "NestJS", "PostgreSQL", "Prisma ORM", "Redis", "Docker"],
    process: [
      { step: "01", title: "Day 1-5: Architecture Design", desc: "Database modeling, API route mapping, and cloud infrastructure setup." },
      { step: "02", title: "Day 6-22: Modular Sprints", desc: "Backend logic implementation, CRUD controllers, and state management." },
      { step: "03", title: "Day 23-28: Penetration & Stress Testing", desc: "Load testing up to 10k concurrent users and OWASP security vulnerability fixes." },
      { step: "04", title: "Day 29-30: Production Deployment", desc: "Automated deployment to AWS/Railway with zero downtime." }
    ],
    timelineDays: 30,
    startingPrice: "$14,500",
    faqs: [
      { q: "Do I own 100% of the source code?", a: "Absolutly. Upon final payment, 100% IP rights and source code repositories are transferred to your organization." }
    ],
    relatedCaseStudy: "medtech-telehealth-hub"
  },
  {
    id: "s3",
    slug: "ai-solutions",
    title: "AI Solutions & ML Integrations",
    shortDesc: "Embed intelligent LLM features, custom RAG search, and automated data extraction into your app.",
    iconName: "BrainCircuit",
    overview: "Accelerate user productivity with embedded generative AI models, vector database vector search, automated classification, and domain-specific smart assistants.",
    benefits: [
      "Custom RAG pipelines powered by Pinecone & OpenAI / Anthropic models",
      "Real-time streaming chat assistants and data summarizers",
      "Automated document parsing & OCR extraction",
      "Enterprise data privacy & zero model training on your data"
    ],
    techStack: ["OpenAI API", "LangChain", "Pinecone", "Python", "FastAPI", "Next.js"],
    process: [
      { step: "01", title: "Day 1-5: Data Ingestion & Prompting", desc: "Vector index setup and document embedding pipelines." },
      { step: "02", title: "Day 6-20: AI Agent Engine", desc: "Function calling setup, guardrails, and streaming response UI." },
      { step: "03", title: "Day 21-27: Accuracy Tuning", desc: "Benchmark testing, hallucination checks, and latency optimization." },
      { step: "04", title: "Day 28-30: Go-Live", desc: "Production API key rate limiting and analytics logging." }
    ],
    timelineDays: 30,
    startingPrice: "$12,000",
    faqs: [
      { q: "Is my business data secure with AI models?", a: "Yes, we implement enterprise zero-retention API configurations ensuring your proprietary data is never used to train public models." }
    ],
    relatedCaseStudy: "ai-legal-doc-analyzer"
  },
  {
    id: "s4",
    slug: "ai-agents",
    title: "Autonomous AI Agents",
    shortDesc: "Multi-agent automation systems that execute complex multi-step business tasks autonomously.",
    iconName: "Bot",
    overview: "Deploy autonomous AI agents capable of handling customer support routing, lead qualification, report generation, and automated database syncs around the clock.",
    benefits: [
      "24/7 automated task execution with zero human fatigue",
      "Autonomous tool-use (web scraping, API calls, database writes)",
      "Human-in-the-loop fallback approval mechanisms",
      "90% reduction in repetitive operational task overhead"
    ],
    techStack: ["AutoGPT", "CrewAI", "Python", "Redis", "Celery", "PostgreSQL"],
    process: [
      { step: "01", title: "Day 1-5: Workflow Specs", desc: "Mapping trigger actions, tool boundaries, and output expectations." },
      { step: "02", title: "Day 6-20: Agent Coding", desc: "Agent role specialization, memory state, and tool integration." },
      { step: "03", title: "Day 21-27: Simulation Runs", desc: "Stress testing edge cases and fail-safe handling." },
      { step: "04", title: "Day 28-30: Production Rollout", desc: "Continuous execution logs and admin monitoring dashboard setup." }
    ],
    timelineDays: 30,
    startingPrice: "$15,000",
    faqs: [
      { q: "Can AI agents make mistakes?", a: "We engineer strict verification guardrails and optional human approval checkpoints before critical actions are executed." }
    ],
    relatedCaseStudy: "fintech-core-platform"
  },
  {
    id: "s5",
    slug: "erp-development",
    title: "ERP Development",
    shortDesc: "Unified Enterprise Resource Planning portals for inventory, finance, HR, and operations.",
    iconName: "Building2",
    overview: "Consolidate fragmented business operations into a single sleek cloud dashboard with real-time analytics, automated invoicing, and inventory tracking.",
    benefits: [
      "Real-time centralized company reporting",
      "Granular role-based permissions (RBAC)",
      "Automated tax, payroll, and invoice generation",
      "Mobile-friendly field manager views"
    ],
    techStack: ["Next.js", "Prisma", "PostgreSQL", "Tailwind CSS", "Recharts", "Redis"],
    process: [
      { step: "01", title: "Day 1-6: Requirements & Schema", desc: "Data entity relationship diagramming and workflow sign-offs." },
      { step: "02", title: "Day 7-22: Core Modules", desc: "Finance, Inventory, HR, and Operations dashboard build." },
      { step: "03", title: "Day 23-28: Data Migration", desc: "Importing legacy CSV/Excel records into PostgreSQL." },
      { step: "04", title: "Day 29-30: Go-Live & Staff Onboarding", desc: "Role configuration and user access distribution." }
    ],
    timelineDays: 30,
    startingPrice: "$18,000",
    faqs: [
      { q: "Can you import data from our old legacy ERP?", a: "Yes, we write custom migration scripts to sanitize and import your historical records into the new database." }
    ],
    relatedCaseStudy: "logistics-fleet-control"
  },
  {
    id: "s6",
    slug: "crm-development",
    title: "CRM Development",
    shortDesc: "High-conversion sales pipeline management platforms tailored to your sales reps' workflow.",
    iconName: "Users2",
    overview: "Empower your sales team with dynamic visual Kanban pipelines, automated follow-up reminders, call logging, and customer activity timelines.",
    benefits: [
      "Customizable deal pipelines & lead scoring",
      "Automated email sequences & WhatsApp API triggers",
      "Sales rep leaderboard & quota tracking analytics",
      "Seamless integration with Gmail, Outlook, and Stripe"
    ],
    techStack: ["React", "Next.js", "PostgreSQL", "Twilio", "SendGrid", "Tailwind"],
    process: [
      { step: "01", title: "Day 1-5: Pipeline Mapping", desc: "Defining sales stages, lead fields, and automated actions." },
      { step: "02", title: "Day 6-20: Build Phase", desc: "Kanban drag-and-drop board, lead contact cards, and search." },
      { step: "03", title: "Day 21-26: Integration Sprint", desc: "Email webhook sync, payment links, and activity logs." },
      { step: "04", title: "Day 27-30: Deployment & Launch", desc: "Team onboarding and live pipeline migration." }
    ],
    timelineDays: 30,
    startingPrice: "$12,500",
    faqs: [
      { q: "How does this compare to Salesforce or HubSpot?", a: "Zero monthly per-seat subscription fees, 100% custom interface, and 5x faster page response times." }
    ],
    relatedCaseStudy: "fintech-core-platform"
  },
  {
    id: "s7",
    slug: "mobile-apps",
    title: "Mobile App Development",
    shortDesc: "Cross-platform iOS & Android mobile apps built with React Native for native speed.",
    iconName: "Smartphone",
    overview: "Deliver high-performing iOS and Android mobile apps from a single clean TypeScript codebase using React Native and Expo.",
    benefits: [
      "Single codebase for App Store & Google Play",
      "Native device camera, biometrics, GPS, and push notification access",
      "Offline-first sync using SQLite & WatermelonDB",
      "App Store submission management included"
    ],
    techStack: ["React Native", "Expo", "TypeScript", "Tailwind CSS", "Firebase", "App Store Connect"],
    process: [
      { step: "01", title: "Day 1-5: UI/UX & Mobile Prototype", desc: "Mobile UX Figma flows and gesture mapping." },
      { step: "02", title: "Day 6-20: App Engineering", desc: "Cross-platform components, push notifications, and API hookup." },
      { step: "03", title: "Day 21-26: TestFlight & Beta", desc: "Internal TestFlight builds and Android APK testing." },
      { step: "04", title: "Day 27-30: Store Submission", desc: "App Store and Google Play review submission." }
    ],
    timelineDays: 30,
    startingPrice: "$14,000",
    faqs: [
      { q: "Do you handle App Store approvals?", a: "Yes, we handle all store listing assets, compliance guidelines, and submission reviews until your app is live." }
    ],
    relatedCaseStudy: "medtech-telehealth-hub"
  },
  {
    id: "s8",
    slug: "cloud-migration",
    title: "Cloud Migration & DevOps",
    shortDesc: "Modernize legacy monoliths into cloud-native AWS / Docker / Vercel container microservices.",
    iconName: "Cloud",
    overview: "Migrate legacy physical servers or outdated cloud hosts into scalable, containerized infrastructure with automated GitHub Actions CI/CD pipelines.",
    benefits: [
      "Zero-downtime database and asset migration",
      "Auto-scaling infrastructure reducing cloud bill by up to 40%",
      "Automated CI/CD pipelines deploying in under 3 minutes",
      "24/7 cloud health monitoring & alerting"
    ],
    techStack: ["AWS", "Docker", "Kubernetes", "Terraform", "GitHub Actions", "Vercel"],
    process: [
      { step: "01", title: "Day 1-5: Audit & Blueprints", desc: "Infrastructure as Code setup and security policy mapping." },
      { step: "02", title: "Day 6-18: Containerization", desc: "Dockerizing services and configuring auto-scaling clusters." },
      { step: "03", title: "Day 19-25: Staging Migration", desc: "Dry-run database cutover and load validation." },
      { step: "04", title: "Day 26-30: Production Cutover", desc: "Final DNS switch with rollback safeguards." }
    ],
    timelineDays: 30,
    startingPrice: "$11,000",
    faqs: [
      { q: "Will our service go offline during migration?", a: "No, we use blue-green and canary cutover strategies to ensure 100% uptime during the migration." }
    ],
    relatedCaseStudy: "logistics-fleet-control"
  },
  {
    id: "s9",
    slug: "api-development",
    title: "API Development & Integration",
    shortDesc: "High-throughput REST and GraphQL APIs with swagger docs and rate-limiting security.",
    iconName: "Webhook",
    overview: "Connect disjoined third-party applications or expose clean public developers APIs with robust OpenAPI specifications, rate limiting, and webhooks.",
    benefits: [
      "Sub-50ms API response latency",
      "Automated OpenAPI / Swagger interactive documentation",
      "OAuth2 and JWT secure authentication",
      "Stripe, Zapier, Salesforce, and ERP webhook connectors"
    ],
    techStack: ["NestJS", "FastAPI", "PostgreSQL", "Redis", "Swagger", "Postman"],
    process: [
      { step: "01", title: "Day 1-5: OpenAPI Schema", desc: "Defining endpoints, payload contracts, and error standards." },
      { step: "02", title: "Day 6-20: Microservice Build", desc: "Controller construction, Redis caching, and rate limiting." },
      { step: "03", title: "Day 21-26: Integration Testing", desc: "Automated Postman test suites and security scanning." },
      { step: "04", title: "Day 27-30: Portal Release", desc: "Interactive developer portal publication." }
    ],
    timelineDays: 30,
    startingPrice: "$8,500",
    faqs: [
      { q: "Do you supply SDKs for frontend developers?", a: "Yes, we automatically generate TypeScript SDK clients from API schemas." }
    ],
    relatedCaseStudy: "fintech-core-platform"
  },
  {
    id: "s10",
    slug: "devops",
    title: "DevOps & CI/CD Engineering",
    shortDesc: "Automate build, test, and zero-downtime deployment pipelines for developer peace of mind.",
    iconName: "Cpu",
    overview: "Establish continuous integration, automated testing, container orchestration, and incident notification alerts across your engineering org.",
    benefits: [
      "Instant automated builds on git commit",
      "Comprehensive preview environments per pull request",
      "Automated database migration rollback safety",
      "PagerDuty and Slack incident integration"
    ],
    techStack: ["GitHub Actions", "Docker", "Sentry", "Datadog", "Terraform", "AWS"],
    process: [
      { step: "01", title: "Day 1-5: Pipeline Design", desc: "Audit existing workflows and security requirements." },
      { step: "02", title: "Day 6-20: Pipeline Scripting", desc: "Constructing GitHub Actions workflows and Docker builds." },
      { step: "03", title: "Day 21-26: Environment Tuning", desc: "Setting up staging, preview, and production environments." },
      { step: "04", title: "Day 27-30: Team Training", desc: "Engineering runbook documentation and handoff." }
    ],
    timelineDays: 30,
    startingPrice: "$9,000",
    faqs: [
      { q: "Which cloud providers do you support?", a: "AWS, Google Cloud, Azure, Vercel, Render, Railway, and DigitalOcean." }
    ],
    relatedCaseStudy: "logistics-fleet-control"
  },
  {
    id: "s11",
    slug: "ui-ux-design",
    title: "UI/UX Design & Prototyping",
    shortDesc: "Figma design systems, glassmorphic interfaces, and micro-interaction UX engineering.",
    iconName: "Palette",
    overview: "Elevate your product's perception with modern, world-class UI design systems comparable to Vercel, Linear, and Stripe.",
    benefits: [
      "Custom reusable Figma UI kit and design tokens",
      "Interactive high-fidelity prototypes ready for developer handoff",
      "User journey research and accessibility audits",
      "Framer Motion animation design guides"
    ],
    techStack: ["Figma", "Framer", "Design Tokens", "Tailwind CSS", "Storybook"],
    process: [
      { step: "01", title: "Day 1-5: User Research & Wireframes", desc: "Low-fidelity UX sketches and user persona mapping." },
      { step: "02", title: "Day 6-18: High-Fidelity UI Design", desc: "Dark & Light glassmorphic screens and components." },
      { step: "03", title: "Day 19-25: Interactive Prototype", desc: "Clickable Figma prototypes with hover states & animations." },
      { step: "04", title: "Day 26-30: Handoff & Specs", desc: "Exporting design tokens and developer guides." }
    ],
    timelineDays: 30,
    startingPrice: "$7,500",
    faqs: [
      { q: "Do we get the Figma files?", a: "Yes, complete edit access to all Figma design files, components, and token variables is delivered." }
    ],
    relatedCaseStudy: "ai-legal-doc-analyzer"
  },
  {
    id: "s12",
    slug: "software-consulting",
    title: "Software & Architecture Consulting",
    shortDesc: "Fractional CTO guidance, legacy code audits, tech stack selection, and AI roadmapping.",
    iconName: "Lightbulb",
    overview: "Get expert technical leadership on-demand to unblock stalled engineering projects, eliminate security vulnerabilities, and choose scalable architectures.",
    benefits: [
      "Comprehensive code quality and security vulnerability audit report",
      "Cloud cost optimization roadmap",
      "AI feasibility assessment & architectural blueprint",
      "Fractional CTO advisory support"
    ],
    techStack: ["Architecture Blueprints", "Security Audits", "CTO Advisory", "Cost Optimization"],
    process: [
      { step: "01", title: "Day 1-5: Discovery & Code Audit", desc: "Inspecting codebase, infrastructure, and team workflows." },
      { step: "02", title: "Day 6-15: Gap Analysis", desc: "Identifying bottlenecks, security risks, and tech debt." },
      { step: "03", title: "Day 16-25: Blueprint Creation", desc: "Drafting recommended architecture and hiring/tech roadmap." },
      { step: "04", title: "Day 26-30: Leadership Presentation", desc: "Executive presentation and Q&A session." }
    ],
    timelineDays: 30,
    startingPrice: "$6,500",
    faqs: [
      { q: "Can you help manage our internal developer team?", a: "Yes, our advisors can conduct sprint planning and code reviews alongside your team." }
    ],
    relatedCaseStudy: "fintech-core-platform"
  },
  {
    id: "s13",
    slug: "maintenance-support",
    title: "Maintenance & SLA Support",
    shortDesc: "24/7 security patch updates, uptime monitoring, bug fixes, and performance retainers.",
    iconName: "ShieldCheck",
    overview: "Ensure your software operates at peak uptime with continuous dependency patching, real-time error tracking, and guaranteed sub-1-hour emergency response.",
    benefits: [
      "Guaranteed 99.99% infrastructure uptime SLA",
      "Sub-1-hour critical incident response time",
      "Monthly security updates and vulnerability patches",
      "Dedicated Slack channel for real-time developer help"
    ],
    techStack: ["Sentry", "Datadog", "PagerDuty", "GitHub Dependabot", "Vercel"],
    process: [
      { step: "01", title: "Day 1-3: Onboarding & Health Checks", desc: "Hooking up telemetry, logging, and error tracking." },
      { step: "02", title: "Day 4-30: Ongoing Maintenance", desc: "24/7 monitoring, security patching, and SLA support." }
    ],
    timelineDays: 30,
    startingPrice: "$2,500/mo",
    faqs: [
      { q: "What is your SLA response time?", a: "Critical P1 issues receive response and active triage within 15 minutes." }
    ],
    relatedCaseStudy: "medtech-telehealth-hub"
  }
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: "ind1",
    slug: "healthcare",
    title: "Healthcare & MedTech",
    iconName: "Activity",
    tagline: "HIPAA-compliant digital health portals, EHR integrations, and AI diagnostic tools.",
    challenges: [
      "Strict HIPAA and GDPR patient data privacy compliance requirements",
      "Legacy EHR/EMR systems (Epic, Cerner) with difficult API connectivity",
      "High security vulnerability risks in telemedicine video streaming"
    ],
    solutions: [
      "End-to-end encrypted telehealth consultation platforms",
      "HL7 / FHIR compliant medical data exchange middleware",
      "AI-assisted clinical note summarization and triage tools"
    ],
    techStack: ["Next.js", "WebRTC", "PostgreSQL", "FHIR API", "AWS HealthLake"],
    compliance: ["HIPAA Compliant", "SOC2 Type II", "HL7 / FHIR", "GDPR"],
    metrics: ["100% HIPAA Compliance", "99.99% Telehealth Video Uptime", "<50ms Data Latency"]
  },
  {
    id: "ind2",
    slug: "finance",
    title: "FinTech & Financial Services",
    iconName: "Landmark",
    tagline: "Bank-grade security, instant payment gateways, fraud detection, and trading dashboards.",
    challenges: [
      "PCI-DSS compliance and financial data encryption standards",
      "Millisecond latency requirements for transaction processing",
      "Complex multi-currency tax and regulatory reporting"
    ],
    solutions: [
      "PCI-DSS compliant payment processing and subscription billing engines",
      "Real-time financial analytics dashboards with interactive charting",
      "AI-driven anomaly detection and transaction risk scoring"
    ],
    techStack: ["Node.js", "NestJS", "PostgreSQL", "Stripe API", "Redis"],
    compliance: ["PCI-DSS Level 1", "SOC1 / SOC2", "ISO 27001", "KYC/AML Ready"],
    metrics: ["$50M+ Transactions Processed", "Zero Security Breaches", "Sub-20ms Engine Speed"]
  },
  {
    id: "ind3",
    slug: "retail",
    title: "E-Commerce & Retail",
    iconName: "ShoppingBag",
    tagline: "Ultra-fast headless storefronts, inventory sync, and AI product recommendation engines.",
    challenges: [
      "Slow page loading causing high cart abandonment rates",
      "Inventory desynchronization across omnichannel marketplaces",
      "Generic search results lowering conversion rates"
    ],
    solutions: [
      "Sub-second Next.js headless Shopify/Custom commerce storefronts",
      "Real-time inventory warehouse synchronization middleware",
      "Personalized AI product recommendation & visual search"
    ],
    techStack: ["Next.js App Router", "Shopify Storefront API", "Algolia", "Tailwind CSS"],
    compliance: ["PCI-DSS", "GDPR", "Accessibility WCAG 2.1 AA"],
    metrics: ["+340% Mobile Conversion", "0.4s Average Load Time", "99.99% Peak Sale Uptime"]
  },
  {
    id: "ind4",
    slug: "logistics",
    title: "Logistics & Supply Chain",
    iconName: "Truck",
    tagline: "Real-time fleet tracking, automated dispatching, and warehouse management systems.",
    challenges: [
      "Lack of real-time GPS visibility into field delivery drivers",
      "Manual dispatch scheduling causing high fuel and labor costs",
      "Paper-based bills of lading and proof-of-delivery delays"
    ],
    solutions: [
      "Interactive map-based fleet dispatch & GPS tracking portal",
      "AI route optimization engine reducing travel distances by 25%",
      "Digital signature mobile app for instant proof-of-delivery"
    ],
    techStack: ["React Native", "Mapbox API", "Node.js", "PostgreSQL", "WebSockets"],
    compliance: ["DOT Regulations", "ISO 9001", "SOC2"],
    metrics: ["-25% Fuel Expenditure", "Real-Time Driver Tracking", "Zero Lost Shipments"]
  },
  {
    id: "ind5",
    slug: "education",
    title: "EdTech & Learning Platforms",
    iconName: "GraduationCap",
    tagline: "Interactive LMS portals, virtual classrooms, and gamified student analytics.",
    challenges: [
      "Low student engagement in traditional recorded video courses",
      "Scalability crashes during online exam quiz submissions",
      "Difficult progress tracking for corporate training managers"
    ],
    solutions: [
      "Gamified learning management system (LMS) with interactive quizzes",
      "Live interactive web video classroom with screen sharing",
      "AI tutor bot offering personalized homework guidance 24/7"
    ],
    techStack: ["Next.js", "WebRTC", "Prisma", "Tailwind CSS", "OpenAI API"],
    compliance: ["FERPA Compliant", "COPPA", "WCAG 2.1 AA"],
    metrics: ["+180% Course Completion", "10,000+ Concurrent Students", "4.9/5 Student Rating"]
  },
  {
    id: "ind6",
    slug: "real-estate",
    title: "Real Estate & PropTech",
    iconName: "Building",
    tagline: "3D virtual tours, tenant portals, automated lease contracts, and property analytics.",
    challenges: [
      "Manual lease signing paperwork causing multi-day deal friction",
      "Unresponsive maintenance ticket management for tenant issues",
      "Disjointed property listing data across MLS platforms"
    ],
    solutions: [
      "Tenant portal for online rent payments and instant maintenance requests",
      "Automated e-signature lease agreement workflow generator",
      "High-converting property portal with 3D interactive virtual tours"
    ],
    techStack: ["Next.js", "Three.js", "Stripe", "PostgreSQL", "Tailwind CSS"],
    compliance: ["Fair Housing Act", "PCI-DSS", "SOC2"],
    metrics: ["98% On-Time Rent Collection", "3-Minute Lease Approvals", "+210% Inquiries"]
  },
  {
    id: "ind7",
    slug: "manufacturing",
    title: "Manufacturing & Industry 4.0",
    iconName: "Factory",
    tagline: "IoT machine telemetry dashboards, predictive maintenance, and ERP manufacturing tools.",
    challenges: [
      "Unplanned machinery downtime costing thousands per hour",
      "Fragmented paper logs for quality control inspections",
      "Outdated legacy desktop software incompatible with cloud access"
    ],
    solutions: [
      "IoT sensor telemetry dashboard for real-time machine diagnostics",
      "AI predictive maintenance alerting system",
      "Tablet-friendly factory floor quality control inspection app"
    ],
    techStack: ["React", "Python", "MQTT", "TimescaleDB", "Tailwind CSS"],
    compliance: ["ISO 27001", "OSHA Compliance", "SOC2"],
    metrics: ["-40% Unplanned Downtime", "Real-Time Sensor Telemetry", "100% Digital Quality Logs"]
  },
  {
    id: "ind8",
    slug: "construction",
    title: "Construction & Engineering",
    iconName: "HardHat",
    tagline: "Job site progress tracking, blueprint management, and contractor expense software.",
    challenges: [
      "Poor communication between field job sites and office managers",
      "Cost overruns due to untracked contractor change orders",
      "Slow blueprint revisions distribution to field crews"
    ],
    solutions: [
      "Mobile blueprint viewer with offline annotation support",
      "Digital change order submission and quick approval workflows",
      "Daily job site photo & drone video progress log portal"
    ],
    techStack: ["React Native", "Next.js", "AWS S3", "PostgreSQL"],
    compliance: ["OSHA", "ISO 9001", "SOC2"],
    metrics: ["-18% Project Cost Overruns", "Instant Mobile Blueprint Sync", "100% On-Time Handoff"]
  },
  {
    id: "ind9",
    slug: "hospitality",
    title: "Hospitality & Travel Tech",
    iconName: "Hotel",
    tagline: "Contactless guest check-in, direct booking engines, and AI concierge assistants.",
    challenges: [
      "High commission fees paid to Online Travel Agencies (OTAs)",
      "Long front-desk check-in lines during peak arrival hours",
      "Fragmented guest communications across email, SMS, and WhatsApp"
    ],
    solutions: [
      "Direct commission-free web booking engine with instant payment",
      "Keyless mobile web check-in & digital room key access",
      "AI Guest Concierge answering hotel FAQs 24/7 via WhatsApp"
    ],
    techStack: ["Next.js", "Stripe API", "Twilio WhatsApp API", "Prisma"],
    compliance: ["PCI-DSS Level 1", "GDPR"],
    metrics: ["+45% Direct Bookings", "0-Minute Front Desk Wait", "96% Guest Satisfaction"]
  },
  {
    id: "ind10",
    slug: "government",
    title: "Government & Public Sector",
    iconName: "Shield",
    tagline: "Accessible citizen portals, secure document filing, and public service dashboards.",
    challenges: [
      "Inaccessible government portals failing WCAG accessibility guidelines",
      "Legacy paper-heavy permit application processing bottlenecks",
      "Strict data sovereignty and air-gapped security mandates"
    ],
    solutions: [
      "100% WCAG 2.1 AAA accessible citizen self-service web portal",
      "Digital permit application tracking with instant status notifications",
      "Air-gapped enterprise cloud deployment with audit logging"
    ],
    techStack: ["Next.js", "TypeScript", "PostgreSQL", "Docker", "Tailwind CSS"],
    compliance: ["WCAG 2.1 AAA", "FedRAMP Ready", "SOC2 Type II", "GDPR"],
    metrics: ["100% Accessibility Score", "-70% Application Processing Time", "Zero Security Vulnerabilities"]
  }
];


export const BLOG_DATA: BlogItem[] = [
  {
    id: "b1",
    slug: "how-we-ship-production-apps-in-30-days",
    title: "How We Ship Enterprise Production Software in Exactly 30 Days",
    excerpt: "Discover the architectural principles, reusable UI design tokens, and parallel agile sprint strategy behind our 30-day delivery model.",
    category: "Engineering Strategy",
    author: { name: "Marcus Vance", role: "Chief Technology Officer", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80" },
    readTime: "6 min read",
    publishedAt: "2026-07-28",
    tags: ["Next.js", "Agile", "Software Delivery", "Architecture"],
    coverImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    content: `Building enterprise software usually takes 6 to 12 months. Most of that time is wasted on indecision, reinventing basic authentication modules, and unaligned design reviews.

At VELOCITY 30, we restructured software engineering around modular parallelization.

### 1. Pre-Baked Design Tokens & Component Foundations
Instead of starting from a blank canvas, we utilize battle-tested design tokens built on Next.js 15, Tailwind CSS, and Shadcn primitives. This cuts frontend setup time from 3 weeks to 24 hours.

### 2. Strict 4-Week Sprint Schedule
* **Week 1 (Days 1-7):** Scope Lock, Database Schema, & Interactive Figma Specs.
* **Week 2 (Days 8-15):** Core Backend APIs & Component UI Assembly.
* **Week 3 (Days 16-23):** Integrations, AI Features, & QA Automation.
* **Week 4 (Days 24-30):** Load Testing, Security Audits, & Production Deployment.

By locking requirements at Day 3 and running backend and frontend builds concurrently, we eliminate project drag completely.`
  },
  {
    id: "b2",
    slug: "nextjs-15-app-router-performance-guide",
    title: "Optimizing Next.js 15 App Router for Sub-100ms Page Loads",
    excerpt: "A deep dive into server components, dynamic imports, edge caching, and font optimization techniques for enterprise platforms.",
    category: "Frontend Development",
    author: { name: "Elena Rostova", role: "VP of Engineering", avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80" },
    readTime: "8 min read",
    publishedAt: "2026-07-15",
    tags: ["Next.js", "React 19", "Performance", "Web Vitals"],
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80",
    content: `Page speed directly dictates conversion rates. In this technical walkthrough, we break down how to configure Next.js 15 for max velocity...`
  },
  {
    id: "b3",
    slug: "building-secure-ai-agents-for-enterprise",
    title: "Architecting Autonomous AI Agents with Zero Enterprise Data Leakage",
    excerpt: "Learn how to deploy self-hosted LLM agents and vector RAG pipelines without compromising client confidential data.",
    category: "AI & Machine Learning",
    author: { name: "David Chen", role: "Head of AI Architecture", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80" },
    readTime: "7 min read",
    publishedAt: "2026-06-30",
    tags: ["AI", "LLM", "RAG", "Security", "Python"],
    coverImage: "https://images.unsplash.com/photo-1677442136019-21780efad99a?auto=format&fit=crop&w=1200&q=80",
    content: `Deploying AI agents inside financial or medical systems requires strict security boundaries...`
  }
];

export const CAREERS_DATA: CareerItem[] = [
  {
    id: "c1",
    title: "Senior Full-Stack Engineer (Next.js / NestJS)",
    department: "Engineering",
    location: "Remote (Global)",
    type: "Full-Time",
    experience: "5+ years",
    summary: "Lead 30-day client delivery sprints building high-performance Next.js frontend applications and Node.js microservices.",
    requirements: [
      "Expert command of Next.js App Router, React 19, TypeScript, and Tailwind CSS",
      "Strong backend experience with NestJS, Node.js, Prisma, and PostgreSQL",
      "Track record of shipping production web applications with high test coverage",
      "Ability to work in fast-paced 4-week agile sprint cycles"
    ]
  },
  {
    id: "c2",
    title: "Staff AI / ML Solutions Architect",
    department: "AI Engineering",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "4+ years",
    summary: "Architect cutting-edge vector RAG systems, autonomous agent workflows, and fine-tuned LLM implementations for our enterprise clients.",
    requirements: [
      "Proficiency with Python, LangChain, LlamaIndex, Pinecone, and OpenAI APIs",
      "Experience deploying containerized ML API models on AWS / Docker",
      "Deep understanding of prompt engineering, function calling, and vector embeddings",
      "Strong client-facing technical communication skills"
    ]
  },
  {
    id: "c3",
    title: "Lead UI/UX & Motion Designer",
    department: "Design",
    location: "Remote",
    type: "Full-Time",
    experience: "4+ years",
    summary: "Design premium glassmorphic, Vercel/Stripe-level product interfaces and micro-interaction design systems.",
    requirements: [
      "Mastery of Figma, design systems, design tokens, and prototyping",
      "Experience designing dark/light theme mode interfaces for SaaS and FinTech",
      "Solid understanding of Framer Motion, CSS animations, and developer handoff",
      "Stunning portfolio showing modern minimal tech design aesthetics"
    ]
  }
];
