"use client";

import Link from "next/link";
import { Bot, ArrowRight, Sparkles, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const Twitter = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
);

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
);

const Github = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 overflow-hidden">
      {/* Waitlist/Newsletter Section with Mesh Gradient */}
      <div className="relative py-24 bg-slate-950 overflow-hidden">
        {/* Mesh Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-slate-950 -z-10" />
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-purple-900/20 via-slate-950 to-slate-950 -z-10" />
        
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center relative z-10 p-12 rounded-[48px] bg-white/5 border border-white/10 backdrop-blur-3xl shadow-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6"
            >
              <Sparkles className="w-3 h-3" />
              <span>Join the Waitlist</span>
            </motion.div>
            <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter mb-4 text-white">
              Don&apos;t Miss The Next <span className="text-indigo-500">Update</span>
            </h3>
            <p className="text-slate-400 text-lg mb-8 font-medium">
              Get exclusive early access to our upcoming Video Generation features and weekly tips on going viral.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-all font-medium"
              />
              <button 
                type="submit"
                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-600/20 flex items-center justify-center gap-2 whitespace-nowrap group"
              >
                Join Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="px-6 py-20 bg-slate-950">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-5 group mb-8">
              <div className="relative">
                <div className="absolute inset-[-10px] bg-indigo-500 blur-[25px] opacity-0 group-hover:opacity-40 transition-all duration-700 animate-pulse" />
                <div className="absolute inset-[-3px] bg-gradient-to-tr from-pink-500 via-purple-500 to-indigo-500 rounded-2xl opacity-10 group-hover:opacity-40 animate-[spin_5s_linear_infinite]" />
                
                <div className="relative w-14 h-14 flex items-center justify-center overflow-hidden rounded-2xl bg-slate-950 border border-white/20 shadow-xl">
                  <div className="absolute inset-1 border border-indigo-500/20 rounded-xl animate-[spin_4s_linear_infinite]" />
                  <div className="absolute inset-2 border border-purple-500/20 rounded-lg animate-[spin_3s_linear_infinite_reverse]" />
                  <Cpu className="relative z-10 text-white w-7 h-7 drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]" />
                </div>
              </div>
              
              <div className="flex flex-col relative group">
                <h3 className="text-3xl font-black tracking-tighter leading-none flex items-center">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-indigo-100 to-white/60 uppercase italic">SAM</span>
                  <span className="text-indigo-500">AI</span>
                </h3>
                <span className="text-[9px] font-black tracking-[0.5em] text-slate-500 uppercase leading-none mt-1.5 group-hover:text-indigo-400 transition-colors">Neural Network</span>
              </div>
            </Link>
            <p className="text-slate-400 max-w-sm mb-8 leading-relaxed font-medium">
              The AI-powered platform for creators who want to scale their presence across TikTok, Reels, and Shorts without spending hours in the edit suite.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-white/10 hover:text-white transition-all">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">Product</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              {["Features", "Pricing", "API", "Changelog"].map((item) => (
                <li key={item}>
                  <Link href={`#${item.toLowerCase()}`} className="hover:text-indigo-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6 text-white text-sm uppercase tracking-widest">Company</h4>
            <ul className="space-y-4 text-slate-400 text-sm font-medium">
              {["About", "Blog", "Privacy", "Terms"].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="hover:text-indigo-400 transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="container mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 relative z-10">
          <p className="text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} SAM AI. All rights reserved.
          </p>
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/5 text-xs text-slate-400 font-bold uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            All Systems Operational
          </div>
        </div>
      </div>
    </footer>
  );
}
