"use client";

import { CheckCircle, Zap, CreditCard } from "lucide-react";
import { motion } from "framer-motion";

export default function ActivityFeed() {
  const activities = [
    { id: 1, type: "success", title: "Render Complete", desc: "Tech Review Vlog #42 is ready to download.", time: "10 min ago", icon: CheckCircle, color: "text-emerald-500" },
    { id: 2, type: "info", title: "Credits Added", desc: "Monthly subscription renewed (+100 credits).", time: "2 hours ago", icon: CreditCard, color: "text-blue-500" },
    { id: 3, type: "system", title: "New Feature", desc: "Auto-captions now support 15+ languages.", time: "1 day ago", icon: Zap, color: "text-amber-500" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 h-full shadow-xl shadow-black/20 backdrop-blur-sm"
    >
      <h3 className="text-xl font-bold mb-8 text-slate-100 flex items-center gap-2">
        <Zap className="w-5 h-5 text-amber-500" /> Activity Feed
      </h3>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-8"
      >
        {activities.map((activity, index) => (
          <motion.div key={activity.id} variants={item} className="relative flex gap-4">
            {index !== activities.length - 1 && (
              <motion.div 
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                className="absolute left-[15px] top-8 bottom-[-32px] w-0.5 bg-gradient-to-b from-slate-800 to-transparent origin-top"
              ></motion.div>
            )}
            
            <motion.div 
              whileHover={{ scale: 1.2, rotate: 5 }}
              className="relative z-10 w-8 h-8 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center shrink-0 shadow-lg"
            >
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </motion.div>
            
            <div className="flex flex-col">
              <p className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">{activity.title}</p>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{activity.desc}</p>
              <div className="flex items-center gap-2 mt-2">
                <div className="w-1 h-1 rounded-full bg-slate-700" />
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{activity.time}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
