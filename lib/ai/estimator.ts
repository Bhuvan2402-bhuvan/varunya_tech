export interface AIQuoteInput {
  projectType: string;
  industry: string;
  expectedUsers: string;
  features: string[];
  description: string;
}

export interface AIQuoteOutput {
  estimatedCost: string;
  durationDays: number;
  confidenceScore: number;
  recommendedStack: string[];
  sprintBreakdown: { week: string; focus: string; deliverables: string[] }[];
  riskAssessment: { risk: string; severity: "Low" | "Medium" | "High"; mitigation: string }[];
  proposalSummary: string;
  architectureDiagramSvgSnippet: string;
}

export function generateAIEstimate(input: AIQuoteInput): AIQuoteOutput {
  // Smart heuristic AI calculation algorithm
  const baseCost = input.projectType === "Enterprise ERP / CRM" ? 18500 
    : input.projectType === "AI Solution / LLM Agent" ? 15000
    : input.projectType === "Mobile App (iOS/Android)" ? 14000
    : input.projectType === "Custom Software Platform" ? 13500
    : 9500;

  const featureMultiplier = (input.features.length || 1) * 750;
  const userMultiplier = input.expectedUsers === "100k+ users" ? 3000 : input.expectedUsers === "10k - 100k" ? 1500 : 500;
  
  const totalCostNumber = Math.min(Math.max(baseCost + featureMultiplier + userMultiplier, 7500), 45000);
  const formattedCost = `$${totalCostNumber.toLocaleString()}`;

  const recommendedStack = [
    "Next.js 15 App Router",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL + Prisma",
    "Redis Caching",
    input.projectType.includes("AI") ? "Pinecone Vector DB + OpenAI" : "Node.js / NestJS Backend",
    "Docker + Vercel Deployment"
  ];

  return {
    estimatedCost: formattedCost,
    durationDays: 30,
    confidenceScore: 96,
    recommendedStack,
    sprintBreakdown: [
      {
        week: "Week 1 (Days 1 - 7)",
        focus: "Discovery, PRD Lock & Database Architecture",
        deliverables: ["Interactive Figma Wireframes", "Prisma Database Schema", "API Route Specifications"]
      },
      {
        week: "Week 2 (Days 8 - 15)",
        focus: "Core Frontend UI & Authentication Engine",
        deliverables: ["Responsive UI Component Library", "JWT/OAuth Auth Flow", "Dashboard & Portal Shell"]
      },
      {
        week: "Week 3 (Days 16 - 23)",
        focus: "Backend Integrations & Smart AI Features",
        deliverables: ["Third-party API Integrations", "AI Estimation/RAG Pipelines", "Role-based Access Controls"]
      },
      {
        week: "Week 4 (Days 24 - 30)",
        focus: "QA Load Testing, Security Audit & Go-Live",
        deliverables: ["OWASP Security Audit", "Sub-100ms Core Web Vitals Optimization", "Production Deployment to Vercel/AWS"]
      }
    ],
    riskAssessment: [
      {
        risk: "Third-party API rate limits",
        severity: "Medium",
        mitigation: "Implement Redis response caching and exponential backoff retry queues."
      },
      {
        risk: "Scope expansion during mid-sprint",
        severity: "Low",
        mitigation: "Strict PRD freeze on Day 5 with secondary backlog phase for post-launch."
      }
    ],
    proposalSummary: `Executive Project Proposal for ${input.industry || "Enterprise"} ${input.projectType || "Software Solution"}.\nDelivered in a 30-Day Fixed Sprint cycle including source code transfer, 100% IP rights, unit testing, and post-launch SLA monitoring.`,
    architectureDiagramSvgSnippet: `<svg class="w-full h-32" viewBox="0 0 400 120">...</svg>`
  };
}
