const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5000;

const server = http.createServer((req, res) => {
  const url = req.url;
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Content-Type', 'text/html; charset=utf-8');

  // Simple Router serving full VELOCITY 30 HTML application
  if (url === '/api/v1/quote') {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      data: {
        estimatedCost: "$14,500",
        durationDays: 30,
        confidenceScore: 96,
        recommendedStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "PostgreSQL + Prisma", "OpenAI Vector RAG"]
      }
    }));
    return;
  }

  const html = `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>VELOCITY 30 | Build Enterprise Software in 30 Days</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            brand: { 500: '#06b6d4' },
            dark: { bg: '#060911' }
          }
        }
      }
    }
  </script>
  <style>
    body { background-color: #060911; color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; }
    .glass-card { background: rgba(15, 23, 42, 0.7); backdrop-filter: blur(16px); border: 1px solid rgba(255, 255, 255, 0.1); }
    .gradient-hero { background: linear-gradient(135deg, #ffffff 20%, #93c5fd 50%, #c084fc 80%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .gradient-cyan { background: linear-gradient(135deg, #38bdf8 0%, #06b6d4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  </style>
</head>
<body class="min-h-screen flex flex-col justify-between">

  <!-- Header Navigation -->
  <header className="sticky top-0 z-50 glass-card border-b border-white/10 px-6 py-4 flex justify-between items-center">
    <div class="flex items-center gap-3">
      <div class="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 p-[1px]">
        <div class="w-full h-full bg-slate-950 rounded-[11px] flex items-center justify-center font-bold text-cyan-400">⚡</div>
      </div>
      <div>
        <span class="font-extrabold text-xl tracking-tight text-white">VELOCITY <span class="gradient-cyan">30</span></span>
        <span class="block text-[10px] font-mono text-slate-400 uppercase tracking-widest -mt-1">30-Day Dev Studio</span>
      </div>
    </div>

    <nav class="hidden md:flex gap-6 text-sm font-medium text-slate-300">
      <a href="#hero" class="hover:text-cyan-400">Home</a>
      <a href="#sprint" class="hover:text-cyan-400">30-Day Sprint</a>
      <a href="#services" class="hover:text-cyan-400">Services (13)</a>
      <a href="#portfolio" class="hover:text-cyan-400">Portfolio</a>
      <a href="#ai-tools" class="hover:text-cyan-400">AI Studio</a>
      <a href="#portal" class="hover:text-cyan-400">Client Portal</a>
      <a href="#admin" class="hover:text-purple-400">Admin HQ</a>
    </nav>

    <div class="flex gap-3">
      <a href="#ai-tools" class="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-xs font-bold text-white shadow-lg shadow-cyan-500/20 hover:opacity-90">
        Get Instant Quote (AI)
      </a>
    </div>
  </header>

  <!-- Hero Section -->
  <section id="hero" class="px-6 py-20 text-center max-w-5xl mx-auto space-y-6">
    <div class="inline-block px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono">
      ⚡ TAGLINE: FROM IDEA TO PRODUCTION IN 30 DAYS
    </div>
    <h1 class="text-4xl sm:text-6xl font-extrabold text-white leading-tight">
      Build Your Software in <br />
      <span class="gradient-hero">Just 30 Days.</span>
    </h1>
    <p class="text-slate-300 text-lg max-w-2xl mx-auto">
      We help startups, SMEs, and enterprises rapidly transform business ideas into production-ready software platforms using Next.js 15, Prisma, and AI-assisted engineering.
    </p>

    <!-- Key Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10">
      <div class="glass-card p-4 rounded-2xl">
        <div class="text-3xl font-extrabold text-white font-mono">30 Days</div>
        <div class="text-[10px] text-slate-400 uppercase tracking-wider">Guaranteed Delivery SLA</div>
      </div>
      <div class="glass-card p-4 rounded-2xl">
        <div class="text-3xl font-extrabold text-cyan-400 font-mono">$50M+</div>
        <div class="text-[10px] text-slate-400 uppercase tracking-wider">Client Volume Handled</div>
      </div>
      <div class="glass-card p-4 rounded-2xl">
        <div class="text-3xl font-extrabold text-purple-400 font-mono">99.99%</div>
        <div class="text-[10px] text-slate-400 uppercase tracking-wider">Cloud Uptime Standard</div>
      </div>
      <div class="glass-card p-4 rounded-2xl">
        <div class="text-3xl font-extrabold text-emerald-400 font-mono">100%</div>
        <div class="text-[10px] text-slate-400 uppercase tracking-wider">IP Code Ownership</div>
      </div>
    </div>
  </section>

  <!-- Interactive 30-Day Sprint Roadmap -->
  <section id="sprint" class="px-6 py-16 max-w-6xl mx-auto space-y-8">
    <div class="text-center space-y-2">
      <span class="text-xs font-mono text-cyan-400 uppercase tracking-widest">Agile SLA Workflow</span>
      <h2 class="text-3xl font-bold text-white">How We Deliver in 30 Days</h2>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="glass-card p-6 rounded-2xl space-y-2 border-cyan-500/40">
        <span class="text-xs font-mono font-bold text-cyan-400">Week 1 (Days 1-7)</span>
        <h3 class="text-base font-bold text-white">Scope & Schema Lock</h3>
        <p class="text-xs text-slate-400">Interactive Figma wireframes, Prisma DB entity schema, and API specs.</p>
      </div>

      <div class="glass-card p-6 rounded-2xl space-y-2 border-purple-500/40">
        <span class="text-xs font-mono font-bold text-purple-400">Week 2 (Days 8-15)</span>
        <h3 class="text-base font-bold text-white">Frontend & Auth</h3>
        <p class="text-xs text-slate-400">Next.js UI design system, Auth.js JWT authentication, and user roles.</p>
      </div>

      <div class="glass-card p-6 rounded-2xl space-y-2 border-emerald-500/40">
        <span class="text-xs font-mono font-bold text-emerald-400">Week 3 (Days 16-23)</span>
        <h3 class="text-base font-bold text-white">APIs & AI Engines</h3>
        <p class="text-xs text-slate-400">NestJS microservices, Redis caching, Stripe billing, and AI vector RAG.</p>
      </div>

      <div class="glass-card p-6 rounded-2xl space-y-2 border-yellow-500/40">
        <span class="text-xs font-mono font-bold text-yellow-400">Week 4 (Days 24-30)</span>
        <h3 class="text-base font-bold text-white">QA & Go-Live</h3>
        <p class="text-xs text-slate-400">OWASP security audits, load testing, sub-100ms Web Vitals, and Vercel launch.</p>
      </div>
    </div>
  </section>

  <!-- AI Studio Section -->
  <section id="ai-tools" class="px-6 py-16 max-w-4xl mx-auto">
    <div class="glass-card p-8 rounded-3xl border-cyan-500/50 space-y-6 text-center">
      <span class="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-full text-xs font-mono">
        🤖 AI 30-DAY PROJECT ESTIMATOR
      </span>
      <h2 class="text-3xl font-bold text-white">Calculate Your 30-Day Investment</h2>
      <p class="text-xs text-slate-300">Select your features below to instantly generate team allocation and proposal draft.</p>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
        <div>
          <label class="block text-xs font-bold text-slate-400 mb-1">Project Domain</label>
          <select id="projectType" class="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white">
            <option>Web Platform (Next.js 15)</option>
            <option>Custom SaaS Platform</option>
            <option>AI Solution & LLM Agent</option>
            <option>Enterprise ERP / CRM Portal</option>
          </select>
        </div>
        <div>
          <label class="block text-xs font-bold text-slate-400 mb-1">Industry Sector</label>
          <select id="industry" class="w-full p-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white">
            <option>Healthcare & MedTech</option>
            <option>FinTech & Financials</option>
            <option>Logistics & Supply Chain</option>
            <option>Retail & E-Commerce</option>
          </select>
        </div>
      </div>

      <button onclick="calculateQuote()" class="w-full py-3 bg-gradient-to-r from-cyan-500 via-purple-600 to-blue-600 rounded-xl font-bold text-sm text-white shadow-lg shadow-cyan-500/20">
        Generate AI Estimate
      </button>

      <div id="quoteResult" class="hidden p-6 bg-slate-900/90 border border-cyan-500/40 rounded-2xl text-left space-y-3">
        <div class="flex justify-between items-center">
          <div>
            <div class="text-[10px] text-cyan-400 font-mono uppercase">Estimated Investment</div>
            <div class="text-3xl font-bold text-white font-mono" id="quoteCost">$14,500</div>
          </div>
          <div class="text-right">
            <div class="text-[10px] text-purple-400 font-mono uppercase">Delivery SLA</div>
            <div class="text-lg font-bold text-white font-mono">30 Days SLA</div>
          </div>
        </div>
        <p class="text-xs text-slate-300">✓ Guaranteed 30-Day Delivery • 100% IP Code Transfer • 60 Days SLA Support</p>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="border-t border-slate-800 py-8 px-6 text-center text-xs text-slate-500">
    © 2026 VELOCITY 30 Software Inc. All rights reserved. • Running live on http://localhost:5000
  </footer>

  <script>
    function calculateQuote() {
      document.getElementById('quoteResult').classList.remove('hidden');
      const type = document.getElementById('projectType').value;
      const cost = type.includes('ERP') ? '$18,500' : type.includes('AI') ? '$15,000' : '$14,500';
      document.getElementById('quoteCost').innerText = cost;
    }
  </script>
</body>
</html>`;

  res.end(html);
});

server.listen(PORT, () => {
  console.log(`VELOCITY 30 Server running live on http://localhost:${PORT}`);
});
