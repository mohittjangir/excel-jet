"use client";

import { motion } from "framer-motion";
import { MessageSquareQuote, Sparkles, Zap, Ghost } from "lucide-react";

export default function CaptionPresets() {
  const presets = [
    { id: 1, name: "The Hormozi", desc: "High-contrast, colorful, dynamic tracking.", icon: Zap, color: "text-amber-400", bg: "from-amber-500/20 to-orange-500/5", active: true },
    { id: 2, name: "The MrBeast", desc: "Huge, expressive text with stroke effects.", icon: Sparkles, color: "text-blue-400", bg: "from-blue-500/20 to-cyan-500/5", active: false },
    { id: 3, name: "The Minimalist", desc: "Clean, elegant, white sans-serif text.", icon: Ghost, color: "text-slate-400", bg: "from-slate-500/20 to-slate-500/5", active: false },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 h-full shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="mb-8 text-left">
        <h3 className="text-xl font-black text-slate-100 flex items-center gap-2 uppercase italic tracking-tighter">
          Caption Styles <MessageSquareQuote className="w-5 h-5 text-indigo-400" />
        </h3>
        <p className="text-sm text-slate-400 mt-1 font-medium">Pick a viral format for your subtitles.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {presets.map((preset) => (
          <motion.div 
            key={preset.id}
            whileHover={{ scale: 1.02, x: 5 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-5 rounded-[32px] border-2 transition-all cursor-pointer overflow-hidden group ${
              preset.active ? 'border-indigo-500 bg-indigo-500/5 shadow-xl shadow-indigo-500/10' : 'border-slate-800 bg-slate-950/40 hover:border-slate-700'
            }`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${preset.bg} blur-3xl opacity-50 group-hover:opacity-80 transition-opacity -z-10`} />
            
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 rounded-2xl bg-slate-900 border border-white/5 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform`}>
                <preset.icon className={`w-7 h-7 ${preset.color}`} />
              </div>
              <div className="text-left">
                <h4 className="font-black text-slate-100 uppercase italic tracking-tight text-lg">{preset.name}</h4>
                <p className="text-xs text-slate-400 mt-1 font-medium leading-tight max-w-[180px]">{preset.desc}</p>
              </div>
            </div>
            
            {preset.active && (
              <motion.div 
                layoutId="active-indicator"
                className="absolute right-6 top-6 px-3 py-1 rounded-full bg-indigo-600 text-[9px] font-black uppercase text-white tracking-[0.2em] shadow-lg shadow-indigo-600/20 border border-indigo-400/30"
              >
                Selected
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-8 py-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-[10px] font-black uppercase tracking-widest text-slate-300 transition-all border border-slate-700 shadow-lg">
        Create Custom Style
      </button>
    </div>
  );
}
