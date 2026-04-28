"use client";

import { BarChart3, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function PerformanceChart() {
  const data = [40, 70, 45, 90, 65, 85, 100];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4 relative z-10">
        <div>
          <h3 className="text-xl font-bold flex items-center gap-2 text-slate-100">
            <BarChart3 className="w-5 h-5 text-indigo-400" /> Performance Overview
          </h3>
          <p className="text-sm text-slate-400 mt-1">Views generated across all platforms</p>
        </div>
        
        <div className="flex items-center gap-2 bg-slate-950 p-1 rounded-lg border border-slate-800">
          <button className="px-3 py-1.5 text-xs font-medium rounded-md text-slate-400 hover:text-slate-200 transition-colors">7 Days</button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-md bg-indigo-500/20 text-indigo-400 border border-indigo-500/20 shadow-sm">30 Days</button>
          <button className="px-3 py-1.5 text-xs font-medium rounded-md text-slate-400 hover:text-slate-200 transition-colors">All Time</button>
        </div>
      </div>

      <div className="flex items-end gap-4 mb-8 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-black tracking-tight text-white"
        >
          124.5K
        </motion.h2>
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", delay: 0.6 }}
          className="flex items-center gap-1 text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md text-sm font-semibold mb-1"
        >
          <TrendingUp className="w-4 h-4" /> +12.5%
        </motion.div>
      </div>

      <div className="h-48 w-full flex items-end justify-between gap-2 mt-auto relative z-10">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          <div className="border-b border-slate-800/50 w-full h-0"></div>
          <div className="border-b border-slate-800/50 w-full h-0"></div>
          <div className="border-b border-slate-800/50 w-full h-0"></div>
          <div className="border-b border-slate-800/50 w-full h-0"></div>
        </div>

        {data.map((value, i) => (
          <div key={i} className="flex flex-col items-center gap-3 w-full group">
            <div className="w-full relative flex justify-center group-hover:scale-y-105 transition-transform origin-bottom cursor-pointer">
              <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs py-1 px-2 rounded pointer-events-none whitespace-nowrap z-20 shadow-xl border border-slate-700">
                {value * 1.2}k views
              </div>
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${value}%` }}
                transition={{ duration: 1, delay: 0.5 + i * 0.1, ease: [0.33, 1, 0.68, 1] }}
                className={`w-full max-w-[40px] rounded-t-lg transition-all ${i === data.length - 1 ? 'bg-gradient-to-t from-indigo-600 to-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.4)]' : 'bg-slate-700 group-hover:bg-indigo-400/80'}`}
              ></motion.div>
            </div>
            <span className="text-xs font-bold text-slate-500 uppercase">{days[i]}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
