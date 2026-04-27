"use client";

import Link from "next/link";
import { SignInButton, Show, UserButton } from "@clerk/nextjs";
import { Video, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { motion, useTransform, useScroll } from "framer-motion";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UploadZone from "@/components/UploadZone";
import BackgroundEffects from "@/components/BackgroundEffects";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen bg-transparent text-slate-50 selection:bg-indigo-500/30">
      <BackgroundEffects />
      {/* Navigation */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-white/5 backdrop-blur-xl sticky top-0 z-50 bg-slate-950/50">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <Video className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter">ViralClip</span>
        </div>
        
        <nav className="flex items-center gap-6">
          <Link href="#features" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden md:block">Features</Link>
          <Link href="#pricing" className="text-sm font-medium text-slate-400 hover:text-white transition-colors hidden md:block">Pricing</Link>
          
          <div className="h-4 w-[1px] bg-white/10 hidden md:block" />

          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="text-sm font-semibold hover:text-indigo-400 transition-colors">
                Sign In
              </button>
            </SignInButton>
            <Link href="/dashboard" className="bg-white text-slate-950 px-5 py-2 rounded-full text-sm font-bold hover:bg-slate-200 transition-all">
              Get Started
            </Link>
          </Show>
          
          <Show when="signed-in">
            <Link href="/dashboard" className="text-sm font-semibold hover:text-indigo-400 transition-colors">Dashboard</Link>
            <UserButton afterSignOutUrl="/" />
          </Show>
        </nav>
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
              {[...Array(6)].map((_, i) => (
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
                      Get Started for Free
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
      </main>

      <footer className="px-6 py-20 border-t border-white/5 bg-slate-950">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Video className="text-white w-5 h-5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">ViralClip</span>
            </div>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed">
              The AI-powered platform for creators who want to scale their presence across TikTok, Reels, and Shorts without spending hours in the edit suite.
            </p>
            <div className="flex gap-4">
              {/* Social icons can be added here once correct icons are identified */}
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">Product</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              {["Features", "Pricing", "API"].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="relative inline-block hover:text-white hover:scale-105 transition-all duration-300 group"
                  >
                    {item}
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              {["About", "Privacy", "Terms"].map((item) => (
                <li key={item}>
                  <Link 
                    href="#" 
                    className="relative inline-block hover:text-white hover:scale-105 transition-all duration-300 group"
                  >
                    {item}
                    <span className="absolute left-0 bottom-[-4px] w-0 h-[2px] bg-indigo-500 transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="container mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-xs">
            &copy; {new Date().getFullYear()} ViralClip AI. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-slate-500">
             <span>Status: All Systems Operational</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

