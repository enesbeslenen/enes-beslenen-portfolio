"use client";

import { useEffect, useState } from "react";

export type MotionProfile = {
  /** Mobile or prefers-reduced-motion: skip 3D, infinite loops, heavy entrances */
  lite: boolean;
  /** System accessibility preference only */
  reduced: boolean;
};

function readMotionProfile(): MotionProfile {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const mobile = window.matchMedia("(max-width: 767px)").matches;
  return { lite: reduced || mobile, reduced };
}

/**
 * Defaults to lite mode until mounted so SSR + hydration markup match
 * (avoids desktop hydration crash from mismatched animation trees).
 */
export function useMotionProfile(): MotionProfile {
  const [profile, setProfile] = useState<MotionProfile>({
    lite: true,
    reduced: false,
  });

  useEffect(() => {
    const update = () => setProfile(readMotionProfile());

    update();

    const reducedMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mobileMq = window.matchMedia("(max-width: 767px)");
    reducedMq.addEventListener("change", update);
    mobileMq.addEventListener("change", update);

    return () => {
      reducedMq.removeEventListener("change", update);
      mobileMq.removeEventListener("change", update);
    };
  }, []);

  return profile;
}
