"use client";

import React, { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    setIsPlaying(!isPlaying);
    // Play a subtle synth audio cue using Web Audio API synthesized oscillator
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(isPlaying ? 220 : 440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(isPlaying ? 110 : 880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      }
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button
        onClick={toggleSound}
        data-cursor={isPlaying ? "MUTE" : "SOUND"}
        className="group relative flex items-center gap-3 px-4 py-2.5 rounded-full bg-[#0E0E12]/80 backdrop-blur-xl border border-white/10 hover:border-[#FF5500]/50 transition-all duration-300 shadow-2xl"
        title={isPlaying ? "Mute Ambient Sound" : "Enable Sound Effects"}
      >
        <span className="text-[11px] font-mono tracking-wider font-semibold text-slate-300 group-hover:text-white uppercase transition-colors">
          {isPlaying ? "SOUND ON" : "SOUND OFF"}
        </span>

        {/* Animated Equalizer Visualizer Bars */}
        <div className="flex items-end gap-1 h-3.5 w-4">
          {[0.4, 0.9, 0.6, 0.8].map((heightMultiplier, idx) => (
            <motion.span
              key={idx}
              className={`w-0.5 rounded-full ${
                isPlaying ? "bg-[#FF5500]" : "bg-slate-600"
              }`}
              animate={{
                height: isPlaying
                  ? [`${20 * heightMultiplier}%`, `${100 * heightMultiplier}%`, `${40 * heightMultiplier}%`]
                  : "30%",
              }}
              transition={{
                duration: 0.4 + idx * 0.1,
                repeat: isPlaying ? Infinity : 0,
                repeatType: "reverse",
              }}
            />
          ))}
        </div>

        <div className="text-slate-400 group-hover:text-[#FF5500] transition-colors">
          {isPlaying ? (
            <Volume2 className="w-4 h-4 text-[#FF5500]" />
          ) : (
            <VolumeX className="w-4 h-4" />
          )}
        </div>
      </button>
    </div>
  );
}
