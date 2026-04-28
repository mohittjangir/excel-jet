"use client";

import { motion } from "framer-motion";
import { Palette, Type, Image as ImageIcon, Plus, Trash2 } from "lucide-react";

export default function BrandKitManager() {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 h-full shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="mb-8 text-left">
        <h3 className="text-xl font-black text-slate-100 flex items-center gap-2 uppercase italic tracking-tighter">
          Brand Kit <Palette className="w-5 h-5 text-indigo-400" />
        </h3>
        <p className="text-sm text-slate-400 mt-1 font-medium">Keep your clips on-brand automatically.</p>
      </div>

      <div className="space-y-8">
        {/* Colors */}
        <div className="text-left">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block">Brand Colors</label>
          <div className="flex flex-wrap gap-3">
            {['bg-indigo-600', 'bg-pink-600', 'bg-amber-500', 'bg-white'].map((color, i) => (
              <motion.div 
                key={i} 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className={`w-10 h-10 rounded-xl ${color} border border-white/10 cursor-pointer shadow-lg shadow-black/40`}
              />
            ))}
            <button className="w-10 h-10 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-500 hover:text-white hover:border-indigo-500/50 hover:bg-indigo-500/5 transition-all">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Fonts */}
        <div className="text-left">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block">Brand Fonts</label>
          <div className="space-y-2">
            <div className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 flex items-center justify-between group hover:border-indigo-500/30 transition-all">
              <span className="text-sm font-black italic uppercase text-slate-200">Inter Black Italic</span>
              <Trash2 className="w-4 h-4 text-slate-600 opacity-0 group-hover:opacity-100 cursor-pointer hover:text-red-500 transition-all" />
            </div>
            <button className="w-full py-3 rounded-2xl border border-dashed border-slate-800 text-[10px] font-black uppercase text-slate-500 hover:border-indigo-500/40 hover:text-indigo-400 hover:bg-indigo-500/5 transition-all flex items-center justify-center gap-2">
              <Plus className="w-3 h-3" /> Add Custom Font
            </button>
          </div>
        </div>

        {/* Logos */}
        <div className="text-left">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4 block">Watermark / Logo</label>
          <div className="aspect-video rounded-3xl bg-slate-950 border border-dashed border-slate-800 flex flex-col items-center justify-center text-slate-600 hover:text-indigo-400 hover:border-indigo-500/40 hover:bg-indigo-500/5 transition-all cursor-pointer group">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-indigo-500/10 transition-all shadow-inner">
              <ImageIcon className="w-6 h-6" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Upload PNG / SVG</span>
          </div>
        </div>
      </div>
    </div>
  );
}
