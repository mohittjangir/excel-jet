"use client";
// Forced re-compile to clear stale Lucide icon cache

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Zap, Scissors, BarChart3, Globe, Smartphone, Shield, Sparkles } from "lucide-react";

const features = [
  {
    title: "AI Moment Hunter",
    description: "Our AI analyzes your transcript to find the most engaging and viral-worthy moments automatically.",
    icon: <Zap className="w-6 h-6" />,
    color: "from-amber-400 to-orange-500",
    glow: "bg-orange-500/20"
  },
  {
    title: "Smart Auto-Crop",
    description: "No more manual reframing. AI keeps you center-stage with intelligent face tracking and 9:16 cropping.",
    icon: <Scissors className="w-6 h-6" />,
    color: "from-blue-400 to-indigo-500",
    glow: "bg-indigo-500/20"
  },
  {
    title: "Viral Captions",
    description: "Generate catchy hooks and animated captions that keep viewers watching until the very end.",
    icon: <BarChart3 className="w-6 h-6" />,
    color: "from-purple-400 to-pink-500",
    glow: "bg-purple-500/20"
  },
  {
    title: "Multi-Platform Export",
    description: "One-click export to TikTok, Instagram Reels, and YouTube Shorts with perfect settings.",
    icon: <Globe className="w-6 h-6" />,
    color: "from-emerald-400 to-teal-500",
    glow: "bg-emerald-500/20"
  },
  {
    title: "Mobile Optimized",
    description: "Designed for the vertical era. Your content will look native and premium on every phone.",
    icon: <Smartphone className="w-6 h-6" />,
    color: "from-red-400 to-rose-500",
    glow: "bg-rose-500/20"
  },
  {
    title: "Secure Processing",
    description: "Your data is encrypted and processed on high-performance servers. We never use your videos for training.",
    icon: <Shield className="w-6 h-6" />,
    color: "from-cyan-400 to-blue-500",
    glow: "bg-cyan-500/20"
  }
];

function FeatureCard({ feature, index }: { feature: typeof features[0], index: number }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/[0.07] transition-colors duration-500 will-change-transform"
    >
      {/* Dynamic Glow Background */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl -z-10 rounded-full ${feature.glow}`} />
      
      {/* Animated Border Beam */}
      <div className="absolute inset-0 rounded-[32px] overflow-hidden">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-100%] bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgba(99,102,241,0.3)_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        />
      </div>

      <div style={{ transform: "translateZ(50px)" }} className="relative z-10">
        <div className={`w-14 h-14 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-indigo-500/20 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
          <div className="text-white drop-shadow-md">
            {feature.icon}
          </div>
        </div>
        
        <h3 className="text-2xl font-bold mb-4 group-hover:text-white transition-colors">
          {feature.title}
        </h3>
        <p className="text-slate-400 leading-relaxed text-sm md:text-base group-hover:text-slate-300 transition-colors">
          {feature.description}
        </p>

        <div className="mt-8 flex items-center gap-2 text-xs font-bold tracking-widest text-indigo-400 uppercase opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-500">
          <span>Learn More</span>
          <Sparkles className="w-3 h-3" />
        </div>
      </div>
    </motion.div>
  );
}

export default function Features() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Capabilities
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black mb-6 tracking-tight"
          >
            Built for the <br />
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Attention Economy</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-lg leading-relaxed"
          >
            Everything you need to scale your short-form presence without hiring a full-time editor.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
