"use client";

import { motion } from "framer-motion";
import { Film, Search, Wand2, Plus } from "lucide-react";

export default function BRollSuggester() {
  const suggestions = [
    { time: "00:04", prompt: "Dynamic city street view", source: "Pexels" },
    { time: "00:12", prompt: "Person typing on laptop", source: "Storyblocks" },
    { time: "00:25", prompt: "Abstract blue particles", source: "Unsplash" },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 h-full shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="text-left">
          <h3 className="text-xl font-black text-slate-100 flex items-center gap-2 uppercase italic tracking-tighter">
            AI B-Roll <Film className="w-5 h-5 text-indigo-400" />
          </h3>
          <p className="text-sm text-slate-400 mt-1 font-medium">Smart stock footage suggestions.</p>
        </div>
        <button className="px-5 py-3 rounded-2xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 hover:bg-indigo-600/20 transition-all flex items-center gap-3 text-[10px] font-black uppercase tracking-widest shadow-lg">
          <Wand2 className="w-4 h-4" /> Auto-Analyze
        </button>
      </div>

      <div className="space-y-6">
        {suggestions.map((s, i) => (
          <motion.div 
            key={i}
            whileHover={{ x: 10, backgroundColor: "rgba(15, 23, 42, 0.8)" }}
            className="flex items-center gap-6 p-5 rounded-[32px] bg-slate-950/50 border border-slate-800 group hover:border-indigo-500/30 transition-all cursor-pointer"
          >
            <div className="w-28 aspect-video rounded-2xl bg-slate-900 border border-white/5 relative overflow-hidden flex items-center justify-center shrink-0 shadow-inner">
               <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent group-hover:scale-110 transition-transform duration-1000" />
               <Search className="w-6 h-6 text-slate-700 group-hover:text-indigo-500 group-hover:scale-125 transition-all" />
               <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-lg bg-black/60 text-[9px] font-black text-white backdrop-blur-md border border-white/10 uppercase tracking-widest">
                 {s.time}
               </div>
            </div>
            <div className="flex-1 text-left">
              <p className="text-base font-black uppercase italic text-slate-100 tracking-tight leading-tight group-hover:text-indigo-400 transition-colors line-clamp-1">{s.prompt}</p>
              <div className="flex items-center gap-3 mt-2">
                 <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{s.source}</span>
                 <div className="w-1.5 h-1.5 rounded-full bg-slate-800" />
                 <span className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] cursor-pointer hover:text-indigo-400 transition-colors">Match Script</span>
              </div>
            </div>
            <button className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xl shadow-indigo-600/30 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 border border-indigo-400/30">
              <Plus className="w-6 h-6" />
            </button>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10 pt-10 border-t border-slate-800">
         <div className="flex items-center justify-between mb-8">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Visual Impact Timeline</span>
            <span className="text-[10px] font-black text-indigo-400 uppercase italic tracking-widest bg-indigo-500/5 px-3 py-1 rounded-full border border-indigo-500/10">High Engagement Path</span>
         </div>
         <div className="flex items-end gap-1.5 h-16 px-2">
            {[20, 45, 80, 40, 90, 60, 30, 70, 50, 40, 80, 60, 95, 45, 75, 40].map((h, i) => (
              <motion.div 
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: i * 0.05, duration: 1 }}
                className={`flex-1 rounded-full transition-all cursor-help ${h > 75 ? 'bg-indigo-500 shadow-[0_0_10px_rgba(79,70,229,0.5)]' : 'bg-slate-800 hover:bg-slate-700'}`}
              />
            ))}
         </div>
      </div>
    </div>
  );
}
