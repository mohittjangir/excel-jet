"use client";

import { Check, Plus, Camera, Share2, Play } from "lucide-react";
import { motion } from "framer-motion";

export default function SocialIntegrations() {
  const platforms = [
    { name: "YouTube", icon: Play, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20", connected: true },
    { name: "TikTok", icon: null, customIcon: "🎵", color: "text-white", bg: "bg-slate-800", border: "border-slate-700", connected: false },
    { name: "Instagram", icon: Camera, color: "text-pink-500", bg: "bg-pink-500/10", border: "border-pink-500/20", connected: false },
    { name: "X (Twitter)", icon: Share2, color: "text-blue-400", bg: "bg-blue-400/10", border: "border-blue-400/20", connected: true },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.6
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: -10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 h-full flex flex-col shadow-xl shadow-black/20 backdrop-blur-sm"
    >
      <div className="mb-8">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          Connect Accounts
        </h3>
        <p className="text-sm text-slate-400 mt-1 font-medium">Export directly to your social platforms.</p>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="flex-1 space-y-4 flex flex-col justify-center"
      >
        {platforms.map((platform, i) => (
          <motion.div 
            key={i} 
            variants={item}
            whileHover={{ x: 5, backgroundColor: "rgba(15, 23, 42, 0.6)" }}
            className={`flex items-center justify-between p-4 rounded-2xl border ${platform.connected ? 'border-slate-800 bg-slate-950/40' : 'border-slate-800 bg-slate-900/40'} hover:border-indigo-500/30 transition-all group`}
          >
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center ${platform.bg} ${platform.border} border shadow-inner`}
              >
                {platform.icon ? (
                  <platform.icon className={`w-5 h-5 ${platform.color}`} />
                ) : (
                  <span className="text-lg">{platform.customIcon}</span>
                )}
              </motion.div>
              <span className="font-bold text-slate-200 group-hover:text-white transition-colors">{platform.name}</span>
            </div>
            
            <motion.button 
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`flex items-center justify-center w-9 h-9 rounded-full transition-all shadow-lg ${
              platform.connected 
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                : 'bg-slate-800 text-slate-400 hover:bg-indigo-600 hover:text-white border border-slate-700'
            }`}>
              {platform.connected ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
