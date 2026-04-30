"use client";

import { useEffect } from "react";

export default function ScrollOptimizer() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const html = document.documentElement;
    html.setAttribute("data-scrolling", "false");
    
    let scrollTimeout: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      // Use a data attribute to potentially disable heavy CSS hover effects during scroll
      if (!scrollTimeout) {
        html.setAttribute("data-scrolling", "true");
        // Force a tiny paint to keep GPU warm
        html.style.setProperty("--scroll-tick", Date.now().toString());
      }
      
      if (scrollTimeout) clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        html.setAttribute("data-scrolling", "false");
        scrollTimeout = null;
      }, 150);
    };

    // Passive listener for best performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    
    // Add a tiny hint to the body to trigger GPU layering early
    const body = document.body;
    body.style.transform = "translateZ(0)";
    body.style.backfaceVisibility = "hidden";

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  return null;
}
