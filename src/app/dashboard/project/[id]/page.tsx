"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Play, Pause, SkipBack, SkipForward, Maximize2, 
  Settings, Download, Share2, Scissors, Wand2, CheckCircle2,
  ChevronLeft, LayoutTemplate, Type, Music
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Mock Transcription Data
const MOCK_TRANSCRIPTION = [
  { time: 0, text: "The", highlighted: true },
  { time: 0.5, text: "secret", highlighted: true },
  { time: 1.0, text: "to", highlighted: true },
  { time: 1.2, text: "going", highlighted: true },
  { time: 1.5, text: "viral", highlighted: true },
  { time: 2.0, text: "isn't", highlighted: false },
  { time: 2.5, text: "luck.", highlighted: false },
  { time: 3.2, text: "It's", highlighted: false },
  { time: 3.5, text: "about", highlighted: false },
  { time: 4.0, text: "retaining", highlighted: false },
  { time: 4.5, text: "attention", highlighted: false },
  { time: 5.0, text: "in", highlighted: false },
  { time: 5.2, text: "the", highlighted: false },
  { time: 5.5, text: "first", highlighted: false },
  { time: 6.0, text: "three", highlighted: false },
  { time: 6.5, text: "seconds.", highlighted: false },
];

export default function ProjectEditor() {
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<'tiktok' | 'instagram'>('tiktok');
  
  // Simulate video playback
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= 10 ? 0 : prev + 0.1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Simulate export progress
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isExporting) {
      interval = setInterval(() => {
        setExportProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsExporting(false);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isExporting]);

  const handleExport = () => {
    setIsExporting(true);
    setExportProgress(0);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-50 overflow-hidden">
      {/* Top Header */}
      <header className="h-16 border-b border-white/5 flex items-center justify-between px-6 bg-slate-900/50 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-2 hover:bg-white/10 rounded-xl transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div className="h-4 w-px bg-white/10" />
          <div>
            <h1 className="font-bold tracking-tight">Podcast_Ep12_Viral_Clip_{params.id}.mp4</h1>
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Auto-saved 2 mins ago</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-bold transition-colors flex items-center gap-2 border border-white/5">
            <Share2 className="w-4 h-4" /> Share
          </button>
          <button 
            onClick={handleExport}
            className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 rounded-xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2 border border-indigo-500/50"
          >
            {isExporting ? <span className="animate-pulse">Rendering...</span> : <><Download className="w-4 h-4" /> Export</>}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-16 border-r border-white/5 bg-slate-900/20 flex flex-col items-center py-6 gap-6 shrink-0">
          <div className="p-3 bg-indigo-500/20 text-indigo-400 rounded-xl cursor-pointer hover:bg-indigo-500/30 transition-colors">
            <LayoutTemplate className="w-5 h-5" />
          </div>
          <div className="p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
            <Type className="w-5 h-5" />
          </div>
          <div className="p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
            <Music className="w-5 h-5" />
          </div>
          <div className="p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
            <Scissors className="w-5 h-5" />
          </div>
          <div className="mt-auto p-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl cursor-pointer transition-colors">
            <Settings className="w-5 h-5" />
          </div>
        </div>

        {/* Center Canvas (Video Player) */}
        <div className="flex-1 flex flex-col bg-black/40 relative">
          <div className="flex-1 p-8 flex items-center justify-center relative">
            {/* Aspect Ratio Container (9:16 for Social) */}
            <div className="relative w-full max-w-[360px] aspect-[9/16] bg-slate-800 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-80" />
              
              {/* Overlay Safe Zones */}
              <div className="absolute inset-0 border border-red-500/20 border-dashed pointer-events-none m-4 rounded-xl" />
              
              {/* Dynamic Captions Render */}
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-center items-center px-8 z-10 pointer-events-none">
                <motion.div 
                  key={Math.floor(currentTime)}
                  initial={{ scale: 0.8, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  className="bg-black/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 shadow-2xl"
                >
                  <span className="font-black text-3xl uppercase italic text-yellow-400 tracking-tighter" style={{ textShadow: '2px 2px 0px #000' }}>
                    {MOCK_TRANSCRIPTION.find(t => t.time <= currentTime && t.time + 1 > currentTime)?.text || "Viral"}
                  </span>
                </motion.div>
              </div>

              {/* Progress Bar within player */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div className="h-full bg-indigo-500" style={{ width: `${(currentTime / 10) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Player Controls */}
          <div className="h-24 bg-slate-900/80 border-t border-white/5 px-6 flex items-center justify-between backdrop-blur-xl shrink-0">
            <div className="flex items-center gap-4">
              <button className="text-slate-400 hover:text-white transition-colors"><SkipBack className="w-5 h-5" /></button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 bg-white text-slate-950 rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
              </button>
              <button className="text-slate-400 hover:text-white transition-colors"><SkipForward className="w-5 h-5" /></button>
              <div className="text-sm font-bold font-mono text-slate-300 ml-4">
                00:{Math.floor(currentTime).toString().padStart(2, '0')}:{Math.floor((currentTime % 1) * 100).toString().padStart(2, '0')} / 00:10:00
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="px-3 py-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors flex items-center gap-2">
                <Wand2 className="w-3 h-3" /> Auto-Cut
              </button>
              <button className="text-slate-400 hover:text-white transition-colors"><Maximize2 className="w-5 h-5" /></button>
            </div>
          </div>
        </div>

        {/* Right Sidebar (Transcription & Export Hub) */}
        <div className="w-[400px] border-l border-white/5 bg-slate-900/50 flex flex-col shrink-0">
          
          {/* Transcription Editor */}
          <div className="flex-1 flex flex-col border-b border-white/5">
            <div className="p-4 border-b border-white/5 flex items-center justify-between bg-slate-900">
              <h3 className="font-bold text-sm uppercase tracking-widest text-slate-300">Transcription</h3>
              <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase rounded-md border border-emerald-500/20">99% Accuracy</span>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="flex flex-wrap gap-2">
                {MOCK_TRANSCRIPTION.map((word, i) => (
                  <span 
                    key={i} 
                    className={`text-lg font-medium cursor-pointer transition-colors px-1 rounded-md ${
                      currentTime >= word.time && currentTime < word.time + 1
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' 
                        : word.highlighted 
                          ? 'text-white hover:bg-white/10' 
                          : 'text-slate-500 hover:text-slate-300'
                    }`}
                  >
                    {word.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Export Hub Panel */}
          <div className="h-64 bg-slate-900 p-6 flex flex-col">
            <h3 className="font-bold text-sm uppercase tracking-widest text-slate-300 mb-4">Export Hub</h3>
            
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button 
                onClick={() => setSelectedPlatform('tiktok')}
                className={`py-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                  selectedPlatform === 'tiktok' 
                    ? 'bg-slate-800 border-indigo-500 text-white shadow-lg shadow-indigo-500/10' 
                    : 'bg-slate-950 border-white/5 text-slate-400 hover:bg-slate-900'
                }`}
              >
                TikTok / Reels
              </button>
              <button 
                onClick={() => setSelectedPlatform('instagram')}
                className={`py-3 rounded-xl border flex items-center justify-center gap-2 text-sm font-bold transition-all ${
                  selectedPlatform === 'instagram' 
                    ? 'bg-slate-800 border-indigo-500 text-white shadow-lg shadow-indigo-500/10' 
                    : 'bg-slate-950 border-white/5 text-slate-400 hover:bg-slate-900'
                }`}
              >
                YouTube Shorts
              </button>
            </div>

            {isExporting ? (
              <div className="mt-auto">
                <div className="flex justify-between text-xs font-bold text-slate-400 mb-2">
                  <span>Rendering video...</span>
                  <span className="text-indigo-400">{exportProgress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-indigo-600 to-purple-500"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
              </div>
            ) : exportProgress === 100 ? (
              <div className="mt-auto p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-3 text-emerald-400 text-sm font-bold">
                <CheckCircle2 className="w-5 h-5" /> Export Complete
              </div>
            ) : (
              <div className="mt-auto">
                <div className="text-xs text-slate-500 font-medium mb-3 flex items-center justify-between">
                  <span>Est. File Size: 24MB</span>
                  <span>1080p • 60fps</span>
                </div>
                <button 
                  onClick={handleExport}
                  className="w-full py-3 bg-white text-slate-950 hover:bg-slate-200 rounded-xl font-black uppercase tracking-widest text-xs transition-colors shadow-xl"
                >
                  Start Render
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
