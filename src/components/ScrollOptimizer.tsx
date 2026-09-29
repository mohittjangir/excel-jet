"use client";

import { useEffect } from "react";

export default function ScrollOptimizer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Passive scroll listener for smooth performance
    const handleScroll = () => {
      // Keep lightweight without mutating pointer-events or global transforms
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return null;
}
