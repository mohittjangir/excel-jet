"use client";

import { motion } from "framer-motion";
import { Users, UserPlus, Settings, ShieldCheck, Mail, MoreHorizontal } from "lucide-react";

export default function TeamWorkspace() {
  const members = [
    { name: "Mohit (You)", role: "Admin", active: true, color: "bg-gradient-to-br from-indigo-500 to-indigo-700" },
    { name: "Aayush", role: "Editor", active: true, color: "bg-gradient-to-br from-pink-500 to-pink-700" },
    { name: "Sarah J.", role: "Viewer", active: false, color: "bg-gradient-to-br from-slate-700 to-slate-900" },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 h-full shadow-xl shadow-black/20 backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="text-left">
          <h3 className="text-xl font-black text-slate-100 flex items-center gap-2 uppercase italic tracking-tighter">
            Team Hub <Users className="w-5 h-5 text-indigo-400" />
          </h3>
          <p className="text-sm text-slate-400 mt-1 font-medium">Manage your creative team.</p>
        </div>
        <button className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white text-[10px] font-black uppercase tracking-widest transition-all shadow-lg shadow-indigo-600/30 border border-indigo-400/30 flex items-center gap-2">
          <UserPlus className="w-4 h-4" /> Invite
        </button>
      </div>

      <div className="space-y-4">
        {members.map((m, i) => (
          <motion.div 
            key={i} 
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between p-5 rounded-3xl bg-slate-950/50 border border-slate-800 group hover:border-slate-700 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-5">
              <div className={`w-12 h-12 rounded-2xl ${m.color} border border-white/10 flex items-center justify-center text-white font-black text-lg shadow-xl`}>
                {m.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-base font-black text-slate-100 uppercase italic tracking-tighter">{m.name}</p>
                <div className="flex items-center gap-2">
                  <span className={`text-[9px] font-black uppercase tracking-[0.2em] ${m.role === 'Admin' ? 'text-indigo-400' : 'text-slate-500'}`}>{m.role}</span>
                  {m.active && (
                    <div className="flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[8px] font-bold text-emerald-500/60 uppercase">Online</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
              <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all shadow-lg">
                <Mail className="w-4 h-4" />
              </button>
              <button className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-500 hover:text-white transition-all shadow-lg">
                <Settings className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10 pt-10 border-t border-slate-800">
        <div className="flex justify-between items-center mb-5">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Shared Credits</span>
          <span className="text-sm font-black italic text-white bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">450 / 1,000</span>
        </div>
        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800 shadow-inner p-[2px]">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: '45%' }}
             transition={{ duration: 1.5, ease: "easeOut" }}
             className="h-full bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]"
           />
        </div>
        <div className="mt-8 flex items-start gap-4 p-5 rounded-[28px] bg-indigo-500/5 border border-indigo-500/10 text-left">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-indigo-400" />
          </div>
          <p className="text-[11px] font-medium text-indigo-300 leading-relaxed">Only Admins can manage credit distribution and workspace settings. <span className="font-black underline cursor-pointer hover:text-white transition-colors">Learn More</span></p>
        </div>
      </div>
    </div>
  );
}
