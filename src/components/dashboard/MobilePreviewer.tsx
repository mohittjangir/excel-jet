"use client";

import { motion } from "framer-motion";
import { Smartphone, Instagram, Music2, Heart, MessageCircle, Share2, MoreVertical } from "lucide-react";
import { useState } from "react";

export default function MobilePreviewer() {
  const [platform, setPlatform] = useState('tiktok');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 h-full shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="text-left">
          <h3 className="text-xl font-black text-slate-100 flex items-center gap-2 uppercase italic tracking-tighter">
            Mobile Preview <Smartphone className="w-5 h-5 text-indigo-400" />
          </h3>
          <p className="text-sm text-slate-400 mt-1 font-medium">Safe-zone check for platforms.</p>
        </div>
        
        <div className="flex p-1.5 bg-slate-950 rounded-2xl border border-slate-800 shadow-inner">
          <button 
            onClick={() => setPlatform('tiktok')}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              platform === 'tiktok' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            TikTok
          </button>
          <button 
            onClick={() => setPlatform('reels')}
            className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
              platform === 'reels' ? 'bg-pink-600 text-white shadow-lg shadow-pink-600/20' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Reels
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center py-4">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative w-[280px] h-[560px] bg-slate-950 rounded-[48px] border-[10px] border-slate-800 shadow-2xl overflow-hidden shadow-black/80"
        >
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-800 rounded-b-3xl z-20" />
          
          {/* Mock Video Content */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-950">
            <div className="absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&q=75&w=600')] bg-cover bg-center" />
          </div>

          {/* Subtitles (The thing being tested) */}
          <div className="absolute bottom-[35%] left-1/2 -translate-x-1/2 w-[85%] text-center z-10 pointer-events-none">
            <motion.p 
              animate={{ scale: [1, 1.05, 1], rotate: [0, 1, 0, -1, 0] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-xl font-black italic uppercase leading-none bg-indigo-500 text-white px-3 py-1.5 inline-block shadow-2xl border border-indigo-400"
            >
              VIRAL CONTENT ONLY!
            </motion.p>
          </div>

          {/* UI Overlays */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end gap-6 text-left">
            <div className="flex justify-between items-end mb-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-700 border-2 border-white/20 shadow-lg" />
                  <span className="text-[11px] font-black text-white shadow-md uppercase italic tracking-tighter">@viral_clip</span>
                </div>
                <p className="text-[10px] text-white/90 font-medium max-w-[160px] shadow-md leading-relaxed">This is exactly how your captions will look with platform UI overlays...</p>
                <div className="flex items-center gap-2">
                  <div className="p-1 rounded-md bg-white/10 backdrop-blur-md">
                    <Music2 className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[9px] font-bold text-white/80">Viral Audio (Original)</span>
                </div>
              </div>
              <div className="flex flex-col gap-5 items-center">
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-md"><Heart className="w-7 h-7 text-white" /></div>
                  <span className="text-[8px] font-black text-white">12.5K</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-md"><MessageCircle className="w-7 h-7 text-white" /></div>
                  <span className="text-[8px] font-black text-white">452</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <div className="p-2 rounded-full bg-white/10 backdrop-blur-md"><Share2 className="w-7 h-7 text-white" /></div>
                  <span className="text-[8px] font-black text-white">Share</span>
                </div>
                <MoreVertical className="w-6 h-6 text-white/60 mt-2" />
                <div className="w-9 h-9 rounded-full border-[3px] border-indigo-500/40 animate-spin-slow mt-2 bg-slate-900 flex items-center justify-center shadow-inner">
                  <div className="w-4 h-4 bg-indigo-500 rounded-sm" />
                </div>
              </div>
            </div>
            
            {/* Safe Zone Warning */}
            <div className={`absolute bottom-[28%] left-0 right-0 h-1.5 border-y backdrop-blur-[4px] flex items-center justify-center transition-all ${
              platform === 'tiktok' ? 'bg-red-500/20 border-red-500/40' : 'bg-amber-500/20 border-amber-500/40'
            }`}>
               <span className={`text-[7px] font-black uppercase tracking-[0.3em] px-3 py-1 rounded-full border shadow-2xl ${
                 platform === 'tiktok' ? 'text-red-400 bg-slate-950 border-red-500/20' : 'text-amber-400 bg-slate-950 border-amber-500/20'
               }`}>
                 DANGER: {platform === 'tiktok' ? 'TIKTOK' : 'REELS'} OVERLAY ZONE
               </span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
