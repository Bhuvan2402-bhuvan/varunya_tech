"use client";

import React, { useState } from "react";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { Mail, Phone, MapPin, Calendar, CheckCircle2, MessageSquare, Clock } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [showCalendly, setShowCalendly] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="py-16 space-y-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="px-3.5 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-xs font-mono text-cyan-400">
          START YOUR 30-DAY JOURNEY
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white font-display">
          Let&apos;s Build Something Incredible
        </h1>
        <p className="text-slate-300 text-base sm:text-lg">
          Ready to turn your idea into a production app in 30 days? Send us a message or schedule a direct technical call.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Contact info cards */}
        <div className="lg:col-span-5 space-y-6">
          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Email Us Directly</h3>
                <p className="text-xs text-slate-400 font-mono">hello@velocity30.io</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Phone / WhatsApp</h3>
                <p className="text-xs text-slate-400 font-mono">+1 (800) 555-VELOCITY</p>
              </div>
            </div>
          </GlassCard>

          <GlassCard className="p-6 space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Calendly Direct Meeting</h3>
                <p className="text-xs text-slate-400">Book 15 minutes with our CTO</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-full text-xs"
              onClick={() => setShowCalendly(!showCalendly)}
            >
              {showCalendly ? "Hide Scheduler" : "Open Calendly Scheduler"}
            </Button>
          </GlassCard>

          {showCalendly && (
            <GlassCard className="p-6 border-cyan-500/40 text-center space-y-4 animate-in fade-in duration-300">
              <Clock className="w-8 h-8 text-cyan-400 mx-auto" />
              <h4 className="text-sm font-bold text-white">Select a Time Slot</h4>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button onClick={() => alert("Meeting booked for Tomorrow 10:00 AM!")} className="p-2 bg-slate-800 rounded-lg hover:bg-cyan-500/20 text-cyan-300">Tomorrow 10:00 AM</button>
                <button onClick={() => alert("Meeting booked for Tomorrow 2:00 PM!")} className="p-2 bg-slate-800 rounded-lg hover:bg-cyan-500/20 text-cyan-300">Tomorrow 2:00 PM</button>
                <button onClick={() => alert("Meeting booked for Thursday 11:30 AM!")} className="p-2 bg-slate-800 rounded-lg hover:bg-cyan-500/20 text-cyan-300">Thursday 11:30 AM</button>
                <button onClick={() => alert("Meeting booked for Friday 4:00 PM!")} className="p-2 bg-slate-800 rounded-lg hover:bg-cyan-500/20 text-cyan-300">Friday 4:00 PM</button>
              </div>
            </GlassCard>
          )}
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7">
          <GlassCard className="p-8 border-slate-800">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-cyan-400 mx-auto" />
                <h2 className="text-2xl font-bold text-white">Message Received!</h2>
                <p className="text-xs text-slate-400">Our engineering architect will get back to you within 4 business hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Your Name</label>
                    <input required type="text" placeholder="Sarah Jenkins" className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Work Email</label>
                    <input required type="email" placeholder="sarah@company.com" className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Company Name</label>
                    <input type="text" placeholder="Acme Corp" className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">Budget Range</label>
                    <select className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500">
                      <option>$9,500 - $15,000 (Starter)</option>
                      <option>$15,000 - $25,000 (Professional)</option>
                      <option>$25,000+ (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Overview</label>
                  <textarea required rows={4} placeholder="Briefly describe what software platform you want to build in 30 days..." className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-cyan-500" />
                </div>

                <Button type="submit" variant="gradient" size="lg" className="w-full">
                  Send Project Request
                </Button>
              </form>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
