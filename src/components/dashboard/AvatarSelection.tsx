"use client";

import { motion } from "framer-motion";
import { UserCircle2, Sparkles, ShieldCheck } from "lucide-react";

export default function AvatarSelection() {
  const avatars = [
    { id: 1, name: "Alex", type: "Casual", bg: "bg-indigo-500/20", active: true },
    { id: 2, name: "Elena", type: "Formal", bg: "bg-pink-500/20", active: false },
    { id: 3, name: "James", type: "Tech", bg: "bg-cyan-500/20", active: false },
    { id: 4, name: "Sofia", type: "Creative", bg: "bg-amber-500/20", active: false },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 h-full shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h3 className="text-xl font-black text-slate-100 flex items-center gap-2 uppercase italic tracking-tighter">
            AI Actors <Sparkles className="w-5 h-5 text-amber-500" />
          </h3>
          <p className="text-sm text-slate-400 mt-1 font-medium">Choose your digital spokesperson.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {avatars.map((avatar) => (
          <motion.div 
            key={avatar.id}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.95 }}
            className={`relative rounded-3xl border-2 p-5 cursor-pointer transition-all flex flex-col items-center gap-3 overflow-hidden ${
              avatar.active ? 'border-indigo-500 bg-indigo-500/10 shadow-xl shadow-indigo-500/10' : 'border-slate-800 bg-slate-950/50 hover:border-slate-700'
            }`}
          >
            {avatar.active && (
              <div className="absolute top-3 right-3">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
              </div>
            )}
            
            {/* Background Glow */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity bg-gradient-to-br from-indigo-500 to-transparent pointer-events-none`} />

            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${avatar.bg} border border-white/5 shadow-inner`}>
              <UserCircle2 className="w-12 h-12 text-white/30" />
            </div>
            <div className="text-center">
              <p className="text-sm font-black text-slate-100 uppercase tracking-tight">{avatar.name}</p>
              <p className="text-[10px] font-black uppercase text-indigo-500 tracking-widest mt-1">{avatar.type}</p>
            </div>
          </motion.div>
        ))}
      </div>
      
      <button className="w-full mt-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all shadow-lg shadow-indigo-600/20 border border-indigo-400/30">
        Customize Actor
      </button>
    </div>
  );
}
