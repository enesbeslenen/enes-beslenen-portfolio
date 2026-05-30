"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);

  // Dot follows instantly
  const dotX = useSpring(rawX, { stiffness: 1000, damping: 50, mass: 0.1 });
  const dotY = useSpring(rawY, { stiffness: 1000, damping: 50, mass: 0.1 });

  // Ring lags behind
  const ringX = useSpring(rawX, { stiffness: 150, damping: 20, mass: 0.5 });
  const ringY = useSpring(rawY, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);

      const target = e.target as HTMLElement;
      const hoverable = target.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="pointer"]'
      );
      setIsPointer(!!hoverable);
    };

    const onLeave = () => setIsHidden(true);
    const onEnter = () => setIsHidden(false);
    const onDown = () => setIsClicking(true);
    const onUp = () => setIsClicking(false);

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
    };
  }, [rawX, rawY]);

  return (
    <>
      {/* Outer ring */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.8)",
        }}
        animate={{
          width: isPointer ? 48 : isClicking ? 20 : 32,
          height: isPointer ? 48 : isClicking ? 20 : 32,
          opacity: isHidden ? 0 : 1,
          borderColor: isPointer ? "#e8621a" : "rgba(255,255,255,0.8)",
        }}
        transition={{ duration: 0.2 }}
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 z-[9999] pointer-events-none rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isPointer ? 6 : isClicking ? 12 : 6,
          height: isPointer ? 6 : isClicking ? 12 : 6,
          backgroundColor: isPointer ? "#e8621a" : "#ffffff",
          opacity: isHidden ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
