"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { SignInButton, Show, UserButton } from "@clerk/nextjs";
import { Bot, ArrowRight, CheckCircle2, Sparkles, Cpu } from "lucide-react";
import { motion, useTransform, useScroll } from "framer-motion";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UploadZone from "@/components/UploadZone";
import BackgroundEffects from "@/components/BackgroundEffects";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative flex flex-col min-h-screen bg-transparent text-slate-50 selection:bg-indigo-500/30">
      <BackgroundEffects />
      {/* Top Announcement Bar */}
      <div className="h-10 bg-indigo-600/10 border-b border-indigo-500/20 flex items-center justify-center gap-4 overflow-hidden relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent animate-[shimmer_3s_infinite]" />
        <span className="text-[10px] font-black tracking-[0.3em] text-indigo-400 uppercase animate-pulse">
          New: AI B-Roll Engine is now in Public Beta
        </span>
        <div className="h-4 w-[1px] bg-indigo-500/20" />
        <Link href="/dashboard" className="text-[10px] font-bold text-white hover:text-indigo-400 transition-colors uppercase tracking-widest flex items-center gap-1">
          Try it now <ArrowRight className="w-3 h-3" />
        </Link>
      </div>

      {/* Navigation */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-3xl sticky top-0 z-50 bg-slate-950/80">
        {/* Subtle Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        <Link href="/" className="flex items-center gap-5 group py-1">
          <div className="relative">
            {/* Multi-layered Kinetic Aura */}
            <div className="absolute inset-[-12px] bg-indigo-500 blur-[30px] opacity-0 group-hover:opacity-40 transition-all duration-1000 group-hover:scale-150 animate-pulse" />
            <div className="absolute inset-[-4px] bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-2xl opacity-20 group-hover:opacity-60 blur-sm animate-[spin_4s_linear_infinite]" />
            
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="relative w-14 h-14 flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950 border border-white/20 shadow-[0_0_20px_rgba(79,70,229,0.3)]"
            >
              {/* Spinning Quantum Rings */}
              <div className="absolute inset-1 border-2 border-indigo-500/30 rounded-xl animate-[spin_3s_linear_infinite]" />
              <div className="absolute inset-2 border border-purple-500/40 rounded-lg animate-[spin_2s_linear_infinite_reverse]" />
              
              {/* Core Icon with Chromatic Shadow */}
              <div className="relative z-10">
                <div className="absolute inset-0 text-pink-500 blur-[2px] translate-x-0.5 opacity-50">
                   <Cpu className="w-7 h-7" />
                </div>
                <div className="absolute inset-0 text-cyan-400 blur-[2px] -translate-x-0.5 opacity-50">
                   <Cpu className="w-7 h-7" />
                </div>
                <Cpu className="relative text-white w-7 h-7 drop-shadow-[0_0_12px_rgba(255,255,255,0.8)]" />
              </div>

              {/* Internal Scanning Line */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-500/20 to-transparent h-1/2 w-full animate-[scan_2s_linear_infinite] pointer-events-none" />
            </motion.div>
          </div>
          
          <div className="flex flex-col relative group">
            <h1 className="text-4xl font-black tracking-tighter leading-none flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-200 to-white/60 uppercase italic drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">SAM</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-br from-indigo-400 to-purple-600 ml-1">AI</span>
            </h1>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[8px] font-black tracking-[0.5em] text-indigo-400/80 uppercase leading-none group-hover:text-white transition-colors">Neural Network</span>
              <div className="h-[2px] flex-1 bg-gradient-to-r from-indigo-500/50 to-transparent rounded-full" />
            </div>
          </div>
        </Link>
        
        <nav className="hidden lg:flex items-center gap-10 relative z-10">
          {[
            { name: "Features", href: "#features" },
            { name: "Solutions", href: "#" },
            { name: "Pricing", href: "#pricing" },
            { name: "Resources", href: "#" }
          ].map((item) => (
            <Link 
              key={item.name} 
              href={item.href} 
              className="text-[10px] font-black text-slate-500 hover:text-white transition-all uppercase tracking-[0.4em] relative group/link"
            >
              {item.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[1px] bg-indigo-500 transition-all group-hover/link:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-6 relative z-10">
          <div className="h-6 w-[1px] bg-white/10 hidden md:block" />
          
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-[10px] font-black text-slate-400 hover:text-white uppercase tracking-[0.3em] transition-colors">
                Sign In
              </button>
            </SignInButton>
            <Link href="/dashboard">
              <button className="px-8 py-3 bg-white text-slate-950 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-indigo-50 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                Get Started
              </button>
            </Link>
          </Show>

          <Show when="signed-in">
            <Link href="/dashboard">
              <button className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white/10 transition-all">
                Dashboard
              </button>
            </Link>
            <UserButton afterSignOutUrl="/" />
          </Show>
        </div>
      </header>

      <main className="flex-1">
        <Hero />
        
        <div id="features" className="relative z-10 mt-20 md:mt-0">
          <Features />
        </div>

        {/* Upload Preview Section */}
        <section className="py-24 bg-indigo-600/5 border-y border-white/5 relative">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
          <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Try it for yourself</h2>
              <p className="text-slate-400">Upload a small clip to see how our AI identifies the best moments.</p>
            </div>
            <UploadZone />
          </div>
        </section>

        {/* CTA Section - Enhanced Wide & Horizontal */}
        <section className="py-32 container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative bg-slate-900/50 rounded-[48px] overflow-hidden border border-white/10 backdrop-blur-3xl shadow-2xl group"
          >
            {/* 1. Ambient Floating Particles */}
            <div className="absolute inset-0 -z-10">
              {mounted && [...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -100, 0],
                    x: [0, Math.random() * 50 - 25, 0],
                    opacity: [0, 0.4, 0],
                  }}
                  transition={{
                    duration: 5 + Math.random() * 5,
                    repeat: Infinity,
                    delay: i * 1,
                  }}
                  className="absolute w-1 h-1 bg-indigo-400 rounded-full blur-sm"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </div>

            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-1/2 h-full bg-purple-600/10 blur-[120px] -z-10" />

            <div className="flex flex-col lg:flex-row items-center gap-16 p-12 md:p-20">
              {/* Left Content */}
              <div className="flex-1 text-left">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  animate={{ boxShadow: ["0 0 0px rgba(99,102,241,0)", "0 0 20px rgba(99,102,241,0.2)", "0 0 0px rgba(99,102,241,0)"] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-8"
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  Ready to Scale?
                </motion.div>

                <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-[1.1] bg-gradient-to-br from-white via-white to-slate-500 bg-clip-text text-transparent">
                  Go Viral <br />
                  <span className="text-white">on Autopilot.</span>
                </h2>
                
                <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-lg leading-relaxed">
                  Join 5,000+ elite creators who are dominating social media with AI-powered repurposing.
                </p>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                  <Link href="/dashboard" className="group relative">
                    <div className="absolute inset-[-4px] bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur-md opacity-20 group-hover:opacity-100 transition-opacity" />
                    <button className="relative px-10 py-5 bg-white text-slate-950 rounded-2xl font-black text-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 shadow-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                      Get Started with SAM
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>

                <div className="flex items-center gap-6 text-slate-500 text-sm font-medium">
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> No credit card</div>
                  <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-indigo-500" /> 10 Free Clips</div>
                </div>
              </div>

              {/* Right Content: Interactive Visual Stream */}
              <div className="flex-1 relative w-full h-[450px] hidden lg:block">
                <div className="absolute inset-0 flex items-center justify-center">
                  {/* Floating Mockup Cards with Magnet Effect */}
                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: -15, x: -10 }}
                    style={{ y: useTransform(useScroll().scrollYProgress, [0.8, 1], [60, -60]) }}
                    className="absolute left-0 top-10 w-48 aspect-[9/16] bg-slate-800 rounded-2xl border border-white/10 shadow-2xl overflow-hidden rotate-[-12deg] z-10 cursor-pointer transition-colors hover:border-indigo-500/50"
                  >
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=75&w=600')] bg-cover bg-center" />
                     <div className="absolute bottom-4 left-4 right-4 h-1 bg-white/20 rounded-full overflow-hidden">
                        <motion.div animate={{ width: ["0%", "100%"] }} transition={{ duration: 3, repeat: Infinity }} className="h-full bg-indigo-500" />
                     </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ scale: 1.05, rotate: 15, x: 10 }}
                    style={{ y: useTransform(useScroll().scrollYProgress, [0.8, 1], [-60, 60]) }}
                    className="absolute right-0 bottom-10 w-48 aspect-[9/16] bg-slate-800 rounded-2xl border border-white/10 shadow-2xl overflow-hidden rotate-[12deg] z-10 cursor-pointer transition-colors hover:border-purple-500/50"
                  >
                     <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=75&w=600')] bg-cover bg-center" />
                     <div className="absolute inset-0 bg-indigo-600/20 backdrop-blur-[2px] flex items-center justify-center">
                        <Sparkles className="text-white w-8 h-8 animate-pulse" />
                     </div>
                  </motion.div>

                  {/* Central Glow */}
                  <div className="w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full animate-pulse" />
                  
                  {/* Metric Card with Bouncing Bars */}
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    className="absolute z-20 bg-white/5 border border-white/10 backdrop-blur-3xl p-6 rounded-[32px] shadow-2xl"
                  >
                    <div className="flex items-center gap-3 mb-1">
                      <div className="text-3xl font-black text-white">+12.5k</div>
                      <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-2 h-2 bg-green-500 rounded-full" />
                    </div>
                    <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">New Followers This Week</div>
                    <div className="mt-4 h-16 flex items-end gap-2">
                       {[40, 75, 45, 95, 65, 85, 55].map((h, i) => (
                         <motion.div 
                           key={i}
                           initial={{ height: 0 }}
                           whileInView={{ height: `${h}%` }}
                           animate={{ height: [`${h}%`, `${h+5}%`, `${h}%`] }}
                           transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                           className="flex-1 bg-gradient-to-t from-indigo-600 to-indigo-400 rounded-t-sm"
                         />
                       ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        <Testimonials />
        <Pricing />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}

