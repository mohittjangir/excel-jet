"use client";

import { motion } from "framer-motion";

export default function BackgroundEffects() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden bg-slate-950 pointer-events-none">
      {/* 1. Large Ambient Glows (from Hero) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-indigo-600/20 blur-[140px] rounded-full animate-pulse" />
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-violet-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/10 blur-[130px] rounded-full" />

      {/* 2. Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.08]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(99, 102, 241, 0.1) 1px, transparent 0)`,
          backgroundSize: '48px 48px' 
        }} 
      />

      {/* 3. Floating Light Beams */}
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

      {/* 4. Static Noise Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAMAAAAp4XiDAAAAUVBMVEWFhYWDg4OcnJy3t7e8vLzc3Nz7+/v///8AAAAEBAQJCQkREREYGBgcHBwkJCQpKSk1NTU8PDxERERMTExUVFRcXFxkZGRsbGxwcHB0dHR2dnZ6enp8fHyc39SjAAAAAXRSTlMAQObYZgAAAnNJREFUeNptVlO77DAMM06be7v//7Wv7Spt06Ybe7AnS7Ytyf8vS9KUfF+WJSv5vSyrqOT7sqypkr8v67qOqr8va76Oqr8va7mOqr8va76Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our8v676Our+v6r4Our+v6z7m99f8/S9KUfF+WJSv5vSyrqOT7sqypkr8v67rOqr8v67qOqr8v6/oNlX39+f8AAAAASUVORK5CYII=")`
        }}
      />

      {/* 5. Soft Edge Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-transparent to-slate-950 opacity-60" />
    </div>
  );
}
