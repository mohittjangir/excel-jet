"use client";

import { Video, HardDrive, Clock, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsOverview() {
  const stats = [
    { label: "Total Videos", value: "14", icon: Video, color: "text-blue-500", bg: "bg-blue-500/10" },
    { label: "Storage Used", value: "4.2 GB", icon: HardDrive, color: "text-purple-500", bg: "bg-purple-500/10" },
    { label: "Hours Saved", value: "28h", icon: Clock, color: "text-green-500", bg: "bg-green-500/10" },
    { label: "Current Plan", value: "Pro", icon: Sparkles, color: "text-amber-500", bg: "bg-amber-500/10", action: "Upgrade" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
    >
      {stats.map((stat, i) => (
        <motion.div 
          key={i} 
          variants={item}
          whileHover={{ y: -5, backgroundColor: "rgba(15, 23, 42, 0.8)" }}
          className="p-5 rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm transition-colors flex items-center gap-4 relative overflow-hidden group shadow-lg shadow-black/20"
        >
          {/* Subtle Background Glow on Hover */}
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-transparent to-${stat.color.split('-')[1]}-500 pointer-events-none`} />
          
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${stat.bg} group-hover:scale-110 transition-transform relative z-10`}>
            <stat.icon className={`w-6 h-6 ${stat.color}`} />
          </div>
          <div className="relative z-10">
            <p className="text-sm text-slate-400 font-medium">{stat.label}</p>
            <div className="flex items-baseline gap-2">
              <h4 className="text-2xl font-bold text-slate-100">{stat.value}</h4>
              {stat.action && (
                <span className="text-xs text-indigo-400 font-semibold cursor-pointer hover:underline hover:text-indigo-300 transition-colors">{stat.action}</span>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
