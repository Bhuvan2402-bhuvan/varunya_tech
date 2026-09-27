"use client";

import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [cursorText, setCursorText] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorXSpring = useSpring(cursorX, {
    stiffness: 400,
    damping: 28,
    mass: 0.4,
  });
  const cursorYSpring = useSpring(cursorY, {
    stiffness: 400,
    damping: 28,
    mass: 0.4,
  });

  const trailXSpring = useSpring(cursorX, {
    stiffness: 150,
    damping: 20,
    mass: 0.8,
  });
  const trailYSpring = useSpring(cursorY, {
    stiffness: 150,
    damping: 20,
    mass: 0.8,
  });

  useEffect(() => {
    // Enable custom cursor mode on body
    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorElement = target.closest("[data-cursor]") as HTMLElement | null;
      if (cursorElement) {
        const text = cursorElement.getAttribute("data-cursor") || "VIEW";
        setCursorText(text);
        setIsHovered(true);
      } else if (
        target.closest("button") || 
        target.closest("a") ||
        target.tagName === "BUTTON" || 
        target.tagName === "A"
      ) {
        setCursorText("");
        setIsHovered(true);
      } else {
        setIsHovered(false);
        setCursorText("");
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden hidden md:block">
      {/* Dynamic Cursor Ring/Blob */}
      <motion.div
        className="fixed top-0 left-0 rounded-full flex items-center justify-center pointer-events-none font-mono text-[10px] font-bold uppercase tracking-wider text-black bg-[#FF5500] shadow-[0_0_25px_rgba(255,85,0,0.8)]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovered ? (cursorText ? 80 : 40) : 16,
          height: isHovered ? (cursorText ? 80 : 40) : 16,
          scale: isHovered ? 1.1 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 28,
          mass: 0.4,
        }}
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-white font-extrabold px-1 text-center select-none"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>

      {/* Subtle Outer Trail Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#FF5500]/40 pointer-events-none"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          width: 48,
          height: 48,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          opacity: isHovered ? 0.2 : 0.6,
        }}
        transition={{
          duration: 0.2,
        }}
      />
    </div>
  );
}
