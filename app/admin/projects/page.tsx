"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useAdminSession } from "../AdminSessionContext";
import { Kanban, CheckCircle, Clock, ChevronRight } from "lucide-react";

interface KanbanTask {
  id: string;
  title: string;
  project: string;
  assignee: string;
  status: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
}

export default function AdminProjectsPage() {
  const { activeRole } = useAdminSession();
  const [boardType, setBoardType] = useState<"developer" | "designer">("developer");

  const devColumns = ["BACKLOG", "TODO", "IN PROGRESS", "CODE REVIEW", "TESTING", "COMPLETED"];
  const designColumns = ["REQUEST", "DESIGNING", "INTERNAL REVIEW", "CLIENT REVIEW", "REVISION", "APPROVED"];

  // Mock Developer Tasks
  const [devTasks, setDevTasks] = useState<KanbanTask[]>([
    { id: "T1", title: "Write API integrations tests", project: "ApexPay Portal", assignee: "Alex Rivera", status: "BACKLOG", priority: "MEDIUM" },
    { id: "T2", title: "Setup Redis Cache cluster", project: "Global Freight ERP", assignee: "David Miller", status: "BACKLOG", priority: "HIGH" },
    { id: "T3", title: "Implement OAuth login routes", project: "ApexPay Portal", assignee: "Alex Rivera", status: "TODO", priority: "HIGH" },
    { id: "T4", title: "Build dynamic custom pointer cursor", project: "Velocity Website", assignee: "Alex Rivera", status: "IN_PROGRESS", priority: "MEDIUM" },
    { id: "T5", title: "Create prisma database schema declarations", project: "PulseHealth Clinic", assignee: "David Miller", status: "CODE_REVIEW", priority: "HIGH" },
    { id: "T6", title: "Deploy next.js staging server builds", project: "PulseHealth Clinic", assignee: "Alex Rivera", status: "TESTING", priority: "LOW" },
    { id: "T7", title: "Verify standard library optimization guidelines", project: "Core System", assignee: "David Miller", status: "COMPLETED", priority: "MEDIUM" },
  ]);

  // Mock Designer Tasks
  const [designTasks, setDesignTasks] = useState<KanbanTask[]>([
    { id: "D1", title: "Design high-fidelity invoice components", project: "Finance Module", assignee: "Elena Rostova", status: "REQUEST", priority: "MEDIUM" },
    { id: "D2", title: "Wireframe sprint milestone timeline chart", project: "Manager Panel", assignee: "Elena Rostova", status: "DESIGNING", priority: "HIGH" },
    { id: "D3", title: "Draw dark-theme typography tokens", project: "Design System", assignee: "Elena Rostova", status: "INTERNAL_REVIEW", priority: "LOW" },
    { id: "D4", title: "Prepare client presentation slides for milestone 2", project: "ApexPay Portal", assignee: "Elena Rostova", status: "CLIENT_REVIEW", priority: "HIGH" },
    { id: "D5", title: "Revise brand color accent tones (red to orange)", project: "Creative Studio", assignee: "Elena Rostova", status: "REVISION", priority: "MEDIUM" },
    { id: "D6", title: "Figma final prototypes lock", project: "PulseHealth Clinic", assignee: "Elena Rostova", status: "APPROVED", priority: "HIGH" },
  ]);

  // Decide which board to render
  const activeBoard = 
    activeRole === "DEVELOPER" ? "developer" :
    activeRole === "DESIGNER" ? "designer" :
    boardType; // Toggleable for Admin/Manager

  const columns = activeBoard === "developer" ? devColumns : designColumns;
  const tasks = activeBoard === "developer" ? devTasks : designTasks;

  const moveTask = (id: string) => {
    if (activeBoard === "developer") {
      setDevTasks(prev => prev.map(t => {
        if (t.id === id) {
          const currentIdx = devColumns.indexOf(t.status);
          const nextStatus = devColumns[(currentIdx + 1) % devColumns.length];
          return { ...t, status: nextStatus };
        }
        return t;
      }));
    } else {
      setDesignTasks(prev => prev.map(t => {
        if (t.id === id) {
          const currentIdx = designColumns.indexOf(t.status);
          const nextStatus = designColumns[(currentIdx + 1) % designColumns.length];
          return { ...t, status: nextStatus };
        }
        return t;
      }));
    }
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case "HIGH": return "bg-red-500/10 text-red-400 border border-red-500/20";
      case "MEDIUM": return "bg-yellow-500/10 text-yellow-450 border border-yellow-500/20";
      default: return "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20";
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white font-display uppercase tracking-tight flex items-center gap-2">
            <Kanban className="w-6 h-6 text-purple-400" />
            {activeBoard === "developer" ? "Developer Sprint Kanban" : "Designer Creative Board"}
          </h2>
          <p className="text-xs text-slate-400">
            {activeBoard === "developer" 
              ? "Track core software engineering tasks through standard agile pipeline stages." 
              : "Monitor creative visual designs from request to final client sign-off."}
          </p>
        </div>

        {/* Board Switcher for ADMIN and MANAGER */}
        {(activeRole === "ADMIN" || activeRole === "MANAGER") && (
          <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-xl">
            <button
              onClick={() => setBoardType("developer")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                boardType === "developer" 
                  ? "bg-purple-650 text-white" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Developer Board
            </button>
            <button
              onClick={() => setBoardType("designer")}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition ${
                boardType === "designer" 
                  ? "bg-cyan-650 text-white" 
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Designer Board
            </button>
          </div>
        )}
      </div>

      {/* Kanban Board Grid */}
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4 min-w-[1200px]">
          {columns.map((col) => {
            const colTasks = tasks.filter(
              (t) => t.status.replace("_", " ") === col
            );
            return (
              <GlassCard key={col} className="flex-1 p-4 border-slate-800 bg-slate-900/40 space-y-3 min-w-[190px] shrink-0">
                <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-300 pb-2 border-b border-slate-800">
                  <span>{col}</span>
                  <span className="px-2 py-0.5 bg-slate-850 text-[10px] text-slate-450 rounded-md">
                    {colTasks.length}
                  </span>
                </div>

                <div className="space-y-3">
                  {colTasks.map((task) => (
                    <div key={task.id} className="p-3.5 bg-slate-800/80 rounded-xl border border-slate-700/60 space-y-3 text-xs">
                      <div className="font-bold text-white leading-snug">{task.title}</div>
                      <div className="space-y-1">
                        <div className="text-[9px] text-slate-450 font-mono">Project: {task.project}</div>
                        <div className="text-[9px] text-slate-455">Assignee: {task.assignee}</div>
                      </div>
                      <div className="flex items-center justify-between pt-2 border-t border-slate-700/60">
                        <span className={`px-2 py-0.5 rounded font-mono text-[8px] font-bold ${getPriorityColor(task.priority)}`}>
                          {task.priority}
                        </span>
                        
                        {col !== "COMPLETED" && col !== "APPROVED" && (
                          <button
                            onClick={() => moveTask(task.id)}
                            className="text-[9px] text-purple-400 hover:text-purple-300 font-bold flex items-center gap-0.5 hover:underline transition"
                          >
                            Advance <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {colTasks.length === 0 && (
                    <div className="text-center py-8 text-[9px] text-slate-600 font-mono border border-dashed border-slate-800 rounded-xl">
                      Empty column
                    </div>
                  )}
                </div>
              </GlassCard>
            );
          })}
        </div>
      </div>
    </div>
  );
}
