"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-slate-950 pointer-events-none">
      {/* 1. Subtle Grid Pattern - Using a simpler radial gradient */}
      <div 
        className="absolute inset-0 opacity-[0.08]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.1) 1px, transparent 0)`,
          backgroundSize: '48px 48px' 
        }} 
      />

      {/* 2. Floating Light Beams - Simplified path and smaller blur */}
      <motion.div
        animate={{
          x: [-100, 100],
          y: [-50, 50],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        className="absolute -top-[5%] -left-[5%] w-[400px] h-[400px] bg-indigo-600/10 blur-[80px] rounded-full will-change-transform"
      />
      
      <motion.div
        animate={{
          x: [100, -100],
          y: [50, -50],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "linear"
        }}
        className="absolute -bottom-[5%] -right-[5%] w-[500px] h-[500px] bg-violet-600/10 blur-[100px] rounded-full will-change-transform"
      />

      {/* 3. Static Noise Overlay - Replaced SVG filter with a tiny, high-performance base64 noise dot */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4OcnJy3t7e8vLzc3Nz7+/v///8AAAAEBAQJCQkREREYGBgcHBwkJCQpKSk1NTU8PDxERERMTExUVFRcXFxkZGRsbGxwcHB0dHR2dnZ6enp8fHyc39SjAAAAAXRSTlMAQObYZgAAAnNJREFUeNptVlO77DAMM06be7v//7Wv7Spt06Ybe7AnS7Ytyf8vS9KUfF+WJSv5vSyrqOT7sqypkr8v67qOqr8va76Oqr8va7mOqr8va76Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our+v6r4Our+v6z7m99f8/S9KUfF+WJSv5vSyrqOT7sqypkr8v67rOqr8v67qOqr8v6/oNlX39+f8AAAAASUVORK5CYII=")`
        }}
      />

      {/* 4. Soft Edge Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-60" />
    </div>
  );
}
