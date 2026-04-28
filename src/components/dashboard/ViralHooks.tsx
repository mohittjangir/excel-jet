"use client";

import { motion } from "framer-motion";
import { Copy, TrendingUp, HelpCircle } from "lucide-react";

export default function ViralHooks() {
  const hooks = [
    { title: "The 'Did You Know' Hook", category: "Educational", text: "Did you know that 90% of creators fail because..." },
    { title: "The 'Result First' Hook", category: "Results", text: "I made $10,000 in 30 days using this one simple trick..." },
    { title: "The 'Controversial' Hook", category: "Engagement", text: "Unpopular opinion: TikTok is actually dying..." },
    { title: "The 'Listicle' Hook", category: "Educational", text: "3 Tools that will save you 10+ hours a week..." },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 h-full shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-100 flex items-center gap-2 uppercase italic tracking-tighter">
            Viral Hooks <TrendingUp className="w-5 h-5 text-indigo-400" />
          </h3>
          <p className="text-sm text-slate-400 mt-1 font-medium">Proven scripts to stop the scroll.</p>
        </div>
        <button className="text-slate-500 hover:text-slate-300 transition-colors">
          <HelpCircle className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {hooks.map((hook, i) => (
          <motion.div 
            key={i}
            whileHover={{ x: 5, backgroundColor: "rgba(15, 23, 42, 0.8)" }}
            className="p-4 rounded-2xl bg-slate-950/50 border border-slate-800 hover:border-indigo-500/30 transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded-md">
                {hook.category}
              </span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-white">
                <Copy className="w-4 h-4" />
              </button>
            </div>
            <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors line-clamp-1 uppercase">{hook.title}</h4>
            <p className="text-xs text-slate-500 mt-1 italic line-clamp-1 font-medium text-slate-400">"{hook.text}"</p>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-[10px] font-black uppercase tracking-widest text-slate-300 transition-all border border-slate-700">
        View Full Library
      </button>
    </div>
  );
}
