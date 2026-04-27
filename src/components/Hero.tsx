"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, CheckCircle2, Zap, Layout, Scissors } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative pt-32 pb-24 md:pt-48 md:pb-64">
      {/* Dynamic Background Elements - Kept overflow hidden locally here */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[600px] bg-indigo-600/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-violet-600/10 blur-[100px] rounded-full" />
      </div>
      
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-semibold mb-10 backdrop-blur-md shadow-lg shadow-indigo-500/5"
          >
            <Sparkles className="w-4 h-4" />
            <span>Used by 5,000+ top-tier creators</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-6xl md:text-8xl font-black tracking-tight mb-8 bg-gradient-to-b from-white via-white to-slate-500 bg-clip-text text-transparent leading-[1.05]"
          >
            Stop Editing. <br />
            <span className="text-white">Start Going Viral.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mb-12 leading-relaxed"
          >
            Turn 1 long-form video into 10+ high-impact clips for TikTok, Reels, and Shorts. 
            Our AI finds the hooks, crops for vertical, and generates captions in seconds.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
          >
            <Link 
              href="/dashboard" 
              className="group relative px-10 py-5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-[0_0_30px_rgba(79,70,229,0.5)] hover:shadow-[0_0_40px_rgba(79,70,229,0.7)] hover:scale-[1.02] flex items-center gap-3"
            >
              Start Creating Viral Clips
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <button className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all flex items-center gap-3 backdrop-blur-xl group">
              <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                <Play className="w-4 h-4 fill-white" />
              </div>
              Watch Demo
            </button>
          </motion.div>

          {/* Social Proof Checklist */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-slate-500 text-sm font-medium"
          >
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> No credit card required</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> 10 free clips/month</div>
            <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-500" /> One-click scheduling</div>
          </motion.div>
        </div>

        {/* Visual/Illustration: Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-24 relative max-w-6xl mx-auto rounded-[32px] border border-white/10 bg-slate-900/40 p-3 md:p-6 backdrop-blur-lg shadow-[0_0_80px_rgba(0,0,0,0.4)] group will-change-transform"
        >
          {/* Decorative Floating Elements */}
          <div className="absolute -top-12 -left-6 md:-left-12 p-6 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 backdrop-blur-md shadow-2xl hidden lg:block animate-bounce-slow z-20 will-change-transform">
            <Zap className="text-indigo-400 w-8 h-8 mb-2" />
            <div className="text-xs font-bold text-white">AI ANALYSIS</div>
            <div className="text-[10px] text-slate-400">98% Viral Probability</div>
          </div>
          <div className="absolute -bottom-8 -right-6 md:-right-12 p-6 rounded-3xl bg-violet-600/10 border border-violet-500/20 backdrop-blur-md shadow-2xl hidden lg:block animate-float z-20 will-change-transform">
            <Layout className="text-violet-400 w-8 h-8 mb-2" />
            <div className="text-xs font-bold text-white">AUTO-CROP</div>
            <div className="text-[10px] text-slate-400">9:16 Active Track</div>
          </div>

          <div className="aspect-[16/10] md:aspect-[16/8] bg-slate-950 rounded-2xl flex items-center justify-center overflow-hidden relative">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=75&w=1000')] bg-cover bg-center opacity-40 group-hover:scale-105 transition-transform duration-1000 will-change-transform" />
             
             {/* Overlay UI Mockup */}
             <div className="relative z-10 w-full h-full flex items-center justify-center gap-8 p-12">
                <div className="w-1/3 aspect-[9/16] border-2 border-indigo-500 rounded-2xl bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center shadow-2xl scale-110">
                   <Scissors className="text-indigo-500 w-12 h-12 mb-4 animate-pulse" />
                   <div className="h-1 w-2/3 bg-indigo-500/20 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-full bg-indigo-500" 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                   </div>
                   <div className="mt-4 text-xs font-black text-white tracking-widest uppercase">Rendering Clip #1</div>
                </div>
                <div className="flex-1 flex flex-col gap-4 hidden md:flex">
                   <div className="h-20 w-full bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center"><CheckCircle2 className="text-green-500" /></div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white">Viral Hook Detected</div>
                        <div className="text-xs text-slate-400">Time: 12:45 - 13:12</div>
                      </div>
                   </div>
                   <div className="h-20 w-full bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4 opacity-60">
                      <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center"><Sparkles className="text-indigo-400 w-5 h-5" /></div>
                      <div className="flex-1">
                        <div className="text-sm font-bold text-white">Generating Captions...</div>
                        <div className="text-xs text-slate-400">Style: Alex Hormozi</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

