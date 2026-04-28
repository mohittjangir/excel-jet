"use client";

import { Play, Download, MoreHorizontal, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

export default function RecentProjectsList() {
  const projects = [
    { id: 1, name: "Tech Review Vlog #42", date: "2 hours ago", duration: "04:12", status: "completed", thumbnail: "from-purple-600 to-blue-600" },
    { id: 2, name: "Podcast EP 12 - Highlights", date: "Yesterday", duration: "01:45", status: "processing", progress: 85, thumbnail: "from-orange-500 to-pink-500" },
    { id: 3, name: "Instagram Reel - Travel", date: "Oct 24", duration: "00:45", status: "completed", thumbnail: "from-emerald-500 to-teal-500" },
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
      className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      {projects.map((project) => (
        <motion.div 
          key={project.id} 
          variants={item}
          whileHover={{ y: -8, transition: { type: "spring", stiffness: 300 } }}
          className="group relative rounded-3xl border border-slate-800 bg-slate-900 overflow-hidden hover:border-indigo-500/50 transition-colors shadow-xl shadow-black/40"
        >
          {/* Thumbnail area with Gradient */}
          <div className={`aspect-video w-full bg-gradient-to-br ${project.thumbnail} relative`}>
            {/* Animated Overlay */}
            <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/60 transition-all flex items-center justify-center gap-4 backdrop-blur-none group-hover:backdrop-blur-sm opacity-0 group-hover:opacity-100 duration-300">
              <motion.button 
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 rounded-full bg-white text-slate-900 flex items-center justify-center shadow-2xl"
              >
                <Play className="w-5 h-5 ml-1" fill="currentColor" />
              </motion.button>
              {project.status === "completed" && (
                <motion.button 
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-slate-800/80 text-white flex items-center justify-center border border-slate-700 backdrop-blur-md"
                >
                  <Download className="w-5 h-5" />
                </motion.button>
              )}
            </div>
            {/* Duration badge */}
            <div className="absolute bottom-3 right-3 px-2 py-1 rounded-lg bg-black/60 text-white text-[10px] font-bold backdrop-blur-md border border-white/10 uppercase tracking-wider">
              {project.duration}
            </div>
          </div>
          
          {/* Content area */}
          <div className="p-5">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-bold text-slate-100 truncate pr-4 group-hover:text-indigo-400 transition-colors">{project.name}</h4>
              <button className="text-slate-500 hover:text-slate-300 transition-colors">
                <MoreHorizontal className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-widest mb-1">
              <span className="text-slate-500">{project.date}</span>
              
              {project.status === "completed" ? (
                <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full border border-emerald-400/20">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Ready
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                  <Clock className="w-3 h-3 animate-spin-slow" /> {project.progress}%
                </span>
              )}
            </div>
            
            {project.status === "processing" && (
              <div className="w-full h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ duration: 2, ease: "easeInOut" }}
                  className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" 
                ></motion.div>
              </div>
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
