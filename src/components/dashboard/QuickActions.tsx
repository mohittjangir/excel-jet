"use client";

import { Mic, Captions, Scissors, LayoutTemplate } from "lucide-react";
import { motion } from "framer-motion";

export default function QuickActions() {
  const actions = [
    { title: "Podcast to Shorts", desc: "Extract viral clips", icon: Mic, color: "bg-orange-500", glow: "shadow-orange-500/20" },
    { title: "Auto-Captions", desc: "Add dynamic text", icon: Captions, color: "bg-pink-500", glow: "shadow-pink-500/20" },
    { title: "Remove Silences", desc: "Cut dead air instantly", icon: Scissors, color: "bg-cyan-500", glow: "shadow-cyan-500/20" },
    { title: "Use Templates", desc: "Start with a preset", icon: LayoutTemplate, color: "bg-indigo-500", glow: "shadow-indigo-500/20" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div className="mt-12">
      <h3 className="text-lg font-bold mb-6 text-slate-200">Quick Actions</h3>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {actions.map((action, i) => (
          <motion.button 
            key={i} 
            variants={item}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.95 }}
            className="flex flex-col items-center text-center p-6 rounded-2xl border border-slate-800 bg-slate-900/40 backdrop-blur-md hover:bg-slate-800/60 hover:border-slate-700 transition-all group relative overflow-hidden"
          >
            {/* Hover Glow Effect */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-t from-${action.color.split('-')[1]}-500 to-transparent`} />
            
            <motion.div 
              whileHover={{ rotate: [0, -10, 10, 0], transition: { duration: 0.5, repeat: Infinity } }}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 ${action.color} shadow-lg ${action.glow} group-hover:scale-110 transition-all z-10`}
            >
              <action.icon className="w-6 h-6 text-white" />
            </motion.div>
            <h4 className="font-bold text-slate-200 relative z-10">{action.title}</h4>
            <p className="text-xs text-slate-400 mt-1 relative z-10">{action.desc}</p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
