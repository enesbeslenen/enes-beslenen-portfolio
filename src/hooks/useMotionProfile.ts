"use client";

import { useSyncExternalStore } from "react";

export type MotionProfile = {
  /** Mobile or prefers-reduced-motion: skip 3D, infinite loops, heavy entrances */
  lite: boolean;
  /** System accessibility preference only */
  reduced: boolean;
};

function getMotionProfile(): MotionProfile {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  return { lite: reduced || mobile, reduced };
}

function subscribe(onChange: () => void) {
  const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileMq = window.matchMedia("(max-width: 767px)");
  reducedMq.addEventListener("change", onChange);
  mobileMq.addEventListener("change", onChange);
  return () => {
    reducedMq.removeEventListener("change", onChange);
    mobileMq.removeEventListener("change", onChange);
  };
}

/** Mobile + prefers-reduced-motion: lighter animations for performance */
export function useMotionProfile(): MotionProfile {
  return useSyncExternalStore(subscribe, getMotionProfile, () => ({
    lite: true,
    reduced: false,
  }));
}
