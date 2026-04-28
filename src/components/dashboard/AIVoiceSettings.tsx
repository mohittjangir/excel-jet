"use client";

import { motion } from "framer-motion";
import { Mic2, Globe, Check } from "lucide-react";

export default function AIVoiceSettings() {
  const voices = [
    { name: "Marcus", style: "Energetic", active: true },
    { name: "Sarah", style: "Professional", active: false },
    { name: "Leo", style: "Friendly", active: false },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 h-full shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="mb-8">
        <h3 className="text-xl font-black text-slate-100 flex items-center gap-2 uppercase italic tracking-tighter">
          AI Brain <Globe className="w-5 h-5 text-indigo-400" />
        </h3>
        <p className="text-sm text-slate-400 mt-1 font-medium">Configure voice & translation models.</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Primary Voice</label>
          <div className="grid grid-cols-1 gap-2">
            {voices.map((voice, i) => (
              <motion.button 
                key={i}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`flex items-center justify-between p-3 rounded-2xl border transition-all ${
                  voice.active ? 'bg-indigo-600 border-indigo-400 shadow-lg shadow-indigo-600/20' : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${voice.active ? 'bg-white/20' : 'bg-slate-900'}`}>
                    <Mic2 className={`w-4 h-4 ${voice.active ? 'text-white' : 'text-slate-400'}`} />
                  </div>
                  <div className="text-left">
                    <p className={`text-sm font-bold ${voice.active ? 'text-white' : 'text-slate-200'}`}>{voice.name}</p>
                    <p className={`text-[10px] font-bold ${voice.active ? 'text-white/70' : 'text-slate-500'} uppercase tracking-tight`}>{voice.style}</p>
                  </div>
                </div>
                {voice.active && <Check className="w-4 h-4 text-white" />}
              </motion.button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-3 block">Auto-Translation</label>
          <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-indigo-500/20 transition-all cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-slate-900 flex items-center justify-center">
                <Globe className="w-4 h-4 text-indigo-400" />
              </div>
              <span className="text-sm font-bold text-slate-200">Global Subtitles</span>
            </div>
            <div className="w-10 h-5 bg-indigo-600 rounded-full relative">
              <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-3 italic px-1 font-medium">Generate captions in 15+ languages instantly.</p>
        </div>
      </div>
    </div>
  );
}
