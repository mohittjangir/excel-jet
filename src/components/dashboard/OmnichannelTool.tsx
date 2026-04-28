"use client";

import { motion } from "framer-motion";
import { Share2, Link2, FileText, Wand2, Copy, ArrowRight } from "lucide-react";

export default function OmnichannelTool() {
  const formats = [
    { name: "X (Twitter) Thread", icon: Share2, color: "text-sky-400", bg: "bg-sky-400/10", count: "5 Tweets" },
    { name: "LinkedIn Post", icon: Link2, color: "text-blue-500", bg: "bg-blue-500/10", count: "450 Words" },
    { name: "Blog Summary", icon: FileText, color: "text-emerald-400", bg: "bg-emerald-400/10", count: "800 Words" },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="mb-8 text-left">
        <h3 className="text-xl font-black text-slate-100 flex items-center gap-2 uppercase italic tracking-tighter">
          Omnichannel <Wand2 className="w-5 h-5 text-indigo-400" />
        </h3>
        <p className="text-sm text-slate-400 mt-1 font-medium">Turn video into text instantly.</p>
      </div>

      <div className="space-y-4">
        {formats.map((f, i) => (
          <motion.div 
            key={i}
            whileHover={{ x: 10, backgroundColor: "rgba(15, 23, 42, 0.8)" }}
            className="p-6 rounded-[32px] bg-slate-950/50 border border-slate-800 flex items-center justify-between group hover:border-indigo-500/30 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${f.bg} border border-white/5 shadow-inner group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-7 h-7 ${f.color}`} />
              </div>
              <div className="text-left">
                <h4 className="text-base font-black text-slate-200 group-hover:text-white transition-colors uppercase italic tracking-tight">{f.name}</h4>
                <p className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.2em] mt-1">{f.count}</p>
              </div>
            </div>
            <button className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white hover:bg-indigo-600 hover:border-indigo-400 transition-all opacity-0 group-hover:opacity-100 shadow-lg">
              <Copy className="w-5 h-5" />
            </button>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10 p-6 rounded-[32px] bg-indigo-600/10 border border-indigo-500/20 text-center relative overflow-hidden group">
         <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl -z-10 group-hover:scale-150 transition-transform duration-1000" />
         
         <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-3">Target Project</p>
         <h4 className="text-xl font-black italic uppercase text-white truncate px-4">Tech Review Vlog #42</h4>
         
         <motion.button 
           whileHover={{ scale: 1.02 }}
           whileTap={{ scale: 0.98 }}
           className="mt-6 w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-indigo-600/40 border border-indigo-400/30 flex items-center justify-center gap-3"
         >
           Generate All Assets <ArrowRight className="w-4 h-4" />
         </motion.button>
      </div>
    </div>
  );
}
