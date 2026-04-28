"use client";

import { motion } from "framer-motion";
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, Plus, Video } from "lucide-react";

export default function ContentCalendar() {
  const days = [
    { day: 'Mon', date: 24, status: 'scheduled', platform: 'TikTok' },
    { day: 'Tue', date: 25, status: 'posted', platform: 'Reels' },
    { day: 'Wed', date: 26, status: 'scheduled', platform: 'Shorts' },
    { day: 'Thu', date: 27, status: 'empty' },
    { day: 'Fri', date: 28, status: 'scheduled', platform: 'TikTok' },
    { day: 'Sat', date: 29, status: 'empty' },
    { day: 'Sun', date: 30, status: 'empty' },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl shadow-black/20 backdrop-blur-sm flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="text-left">
          <h3 className="text-xl font-black text-slate-100 flex items-center gap-2 uppercase italic tracking-tighter">
            Content Calendar <CalendarIcon className="w-5 h-5 text-indigo-400" />
          </h3>
          <p className="text-sm text-slate-400 mt-1 font-medium">Manage your posting schedule.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:text-white transition-all shadow-inner group">
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 px-2">October 2026</span>
          <button className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 hover:text-white transition-all shadow-inner group">
            <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 sm:gap-4 flex-1">
        {days.map((d, i) => (
          <div key={i} className="flex flex-col gap-3">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest text-center">{d.day}</span>
            <motion.div 
              whileHover={{ y: -8, scale: 1.02 }}
              className={`aspect-square sm:aspect-[4/5] rounded-3xl border flex flex-col items-center justify-center relative transition-all group cursor-pointer ${
                d.status === 'empty' 
                  ? 'bg-slate-950/30 border-slate-800 hover:border-indigo-500/30 hover:bg-indigo-500/5' 
                  : d.status === 'posted'
                    ? 'bg-emerald-500/5 border-emerald-500/20'
                    : 'bg-indigo-600/10 border-indigo-500/30 shadow-xl shadow-indigo-500/10'
              }`}
            >
              <span className={`text-sm font-black tracking-tighter ${d.status === 'empty' ? 'text-slate-600 group-hover:text-slate-400' : 'text-slate-100'}`}>{d.date}</span>
              
              {d.status !== 'empty' && (
                <div className="mt-3 hidden sm:flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center bg-slate-950 border border-white/5 shadow-inner mb-1.5`}>
                    <Video className={`w-4 h-4 ${d.status === 'posted' ? 'text-emerald-400' : 'text-indigo-400'}`} />
                  </div>
                  <span className="text-[8px] font-black uppercase text-slate-500 tracking-widest">{d.platform}</span>
                </div>
              )}

              {d.status === 'empty' && (
                <div className="mt-2 w-8 h-8 rounded-full border border-dashed border-slate-800 flex items-center justify-center text-slate-800 group-hover:text-indigo-500 group-hover:border-indigo-500/40 transition-all">
                  <Plus className="w-4 h-4" />
                </div>
              )}

              {d.status === 'posted' && (
                <div className="absolute top-3 right-3 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)]" />
              )}
            </motion.div>
          </div>
        ))}
      </div>
      
      <div className="mt-10 flex items-center justify-between p-4 rounded-2xl bg-slate-950/40 border border-slate-800">
        <div className="flex gap-6">
           <div className="flex items-center gap-2.5">
             <div className="w-2.5 h-2.5 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/40" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Scheduled</span>
           </div>
           <div className="flex items-center gap-2.5">
             <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40" />
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Posted</span>
           </div>
        </div>
        <button className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 hover:text-indigo-300 transition-all bg-indigo-400/5 px-4 py-2 rounded-full border border-indigo-400/10 hover:border-indigo-400/30">
          Full Schedule
        </button>
      </div>
    </div>
  );
}
