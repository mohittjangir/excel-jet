"use client";

import { Play, Sparkles, Zap, Flame } from "lucide-react";
import { motion } from "framer-motion";

export default function TrendingTemplates() {
  const templates = [
    { id: 1, title: "Gaming Montage", category: "Gaming", icon: Zap, uses: "12.5K", gradient: "from-violet-600 to-indigo-600" },
    { id: 2, title: "Vlog Intro (Cinematic)", category: "Lifestyle", icon: Sparkles, uses: "8.2K", gradient: "from-emerald-500 to-teal-500" },
    { id: 3, title: "Podcast Highlights", category: "Educational", icon: Flame, uses: "15.1K", gradient: "from-orange-500 to-rose-500" },
    { id: 4, title: "Product Showcase", category: "Business", icon: Sparkles, uses: "5.4K", gradient: "from-blue-500 to-cyan-500" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.8
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="mt-16 pt-8 border-t border-slate-900/50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h3 className="text-2xl font-black flex items-center gap-2 tracking-tight text-slate-100 italic uppercase">
            Trending Templates <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}><Flame className="w-6 h-6 text-orange-500" /></motion.div>
          </h3>
          <p className="text-slate-400 mt-1 font-medium">Start your next viral hit with a proven format.</p>
        </div>
        <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors bg-indigo-500/5 px-4 py-2 rounded-full border border-indigo-500/10 hover:border-indigo-500/30">
          Browse library
        </button>
      </motion.div>

      <motion.div 
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {templates.map((template) => (
          <motion.div 
            key={template.id} 
            variants={item}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group relative rounded-3xl bg-slate-900 border border-slate-800 overflow-hidden hover:border-indigo-500/40 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 cursor-pointer flex flex-col h-[280px]"
          >
            {/* Visual Header */}
            <div className={`h-3/5 w-full bg-gradient-to-br ${template.gradient} relative overflow-hidden flex items-center justify-center`}>
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
              
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"
              />
              
              <div className="relative z-10 w-14 h-14 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300 shadow-2xl">
                <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
              </div>
            </div>
            
            {/* Content Area */}
            <div className="p-5 flex-1 flex flex-col bg-slate-950/40 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 flex items-center gap-1.5">
                  <template.icon className="w-3 h-3 text-indigo-400" /> {template.category}
                </span>
                <span className="text-[10px] text-slate-400 font-bold bg-slate-900 px-2 py-0.5 rounded-full border border-slate-800">{template.uses} USES</span>
              </div>
              <h4 className="font-black text-slate-100 text-lg leading-tight group-hover:text-indigo-400 transition-colors tracking-tight uppercase italic">{template.title}</h4>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
