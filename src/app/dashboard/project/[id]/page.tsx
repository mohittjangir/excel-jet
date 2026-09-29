"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Play, Pause, SkipBack, SkipForward, Maximize2, 
  Settings, Download, Share2, Scissors, Wand2, CheckCircle2,
  ChevronLeft, LayoutTemplate, Type, Music
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

const MOCK_TRANSCRIPTION = [
  { time: 0, text: "Receiving", highlighted: true },
  { time: 0.5, text: "shipment", highlighted: true },
  { time: 1.0, text: "from", highlighted: true },
  { time: 1.2, text: "supplier", highlighted: true },
  { time: 1.5, text: "pallet", highlighted: true },
  { time: 2.0, text: "#9042.", highlighted: false },
  { time: 2.5, text: "Verified", highlighted: false },
  { time: 3.2, text: "150", highlighted: false },
  { time: 3.5, text: "units", highlighted: false },
  { time: 4.0, text: "allocated", highlighted: false },
  { time: 4.5, text: "to", highlighted: false },
  { time: 5.0, text: "Zone B.", highlighted: false },
];

export default function ProjectEditor() {
  const params = useParams();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState<'tiktok' | 'instagram'>('tiktok');
  
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => (prev >= 10 ? 0 : prev + 0.1));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

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
    <div className="flex flex-col h-screen bg-[#F5F7FA] text-[#1F2937] overflow-hidden">
      {/* Top Header */}
      <header className="h-14 border-b border-[#E2E8F0] flex items-center justify-between px-6 bg-[#17324D] text-white shrink-0">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="p-1.5 hover:bg-[#2F5D7C] rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5 text-white" />
          </Link>
          <div className="h-4 w-px bg-[#2F5D7C]" />
          <div>
            <h1 className="font-bold text-xs text-white">Stock_Manifest_Log_{params.id}.mp4</h1>
            <p className="text-[9px] text-slate-300 font-semibold uppercase tracking-wider">Auto-saved 2 mins ago</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-3.5 py-1.5 bg-[#2F5D7C] hover:bg-[#254b64] rounded-lg text-xs font-bold transition-colors flex items-center gap-1.5 text-white">
            <Share2 className="w-3.5 h-3.5" /> Share
          </button>
          <button 
            onClick={handleExport}
            className="px-5 py-1.5 bg-[#16A3A3] hover:bg-[#118282] rounded-lg text-xs font-bold transition-all text-white flex items-center gap-1.5 shadow-sm"
          >
            {isExporting ? <span className="animate-pulse">Processing...</span> : <><Download className="w-3.5 h-3.5" /> Export Manifest</>}
          </button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-14 border-r border-[#E2E8F0] bg-white flex flex-col items-center py-4 gap-4 shrink-0">
          <div className="p-2.5 bg-[#16A3A3]/10 text-[#16A3A3] rounded-lg cursor-pointer">
            <LayoutTemplate className="w-4 h-4" />
          </div>
          <div className="p-2.5 text-[#64748B] hover:text-[#17324D] hover:bg-[#F5F7FA] rounded-lg cursor-pointer transition-colors">
            <Type className="w-4 h-4" />
          </div>
          <div className="p-2.5 text-[#64748B] hover:text-[#17324D] hover:bg-[#F5F7FA] rounded-lg cursor-pointer transition-colors">
            <Music className="w-4 h-4" />
          </div>
          <div className="p-2.5 text-[#64748B] hover:text-[#17324D] hover:bg-[#F5F7FA] rounded-lg cursor-pointer transition-colors">
            <Scissors className="w-4 h-4" />
          </div>
          <div className="mt-auto p-2.5 text-[#64748B] hover:text-[#17324D] hover:bg-[#F5F7FA] rounded-lg cursor-pointer transition-colors">
            <Settings className="w-4 h-4" />
          </div>
        </div>

        {/* Center Canvas */}
        <div className="flex-1 flex flex-col bg-[#F5F7FA] relative">
          <div className="flex-1 p-6 flex items-center justify-center relative">
            <div className="relative w-full max-w-[340px] aspect-[9/16] bg-[#17324D] rounded-2xl overflow-hidden border border-[#2F5D7C] shadow-lg flex flex-col">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-70" />
              
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 flex justify-center items-center px-6 z-10 pointer-events-none">
                <div className="bg-[#17324D]/90 backdrop-blur-md px-4 py-2 rounded-lg border border-[#16A3A3] shadow-md">
                  <span className="font-extrabold text-xl uppercase tracking-wider text-white">
                    {MOCK_TRANSCRIPTION.find(t => t.time <= currentTime && t.time + 1 > currentTime)?.text || "WMS"}
                  </span>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div className="h-full bg-[#16A3A3]" style={{ width: `${(currentTime / 10) * 100}%` }} />
              </div>
            </div>
          </div>

          {/* Player Controls */}
          <div className="h-20 bg-white border-t border-[#E2E8F0] px-6 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <button className="text-[#64748B] hover:text-[#17324D]"><SkipBack className="w-4 h-4" /></button>
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-10 h-10 bg-[#17324D] text-white rounded-full flex items-center justify-center hover:bg-[#11263c] shadow-sm"
              >
                {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
              </button>
              <button className="text-[#64748B] hover:text-[#17324D]"><SkipForward className="w-4 h-4" /></button>
              <div className="text-xs font-mono font-bold text-[#17324D] ml-3">
                00:{Math.floor(currentTime).toString().padStart(2, '0')}:{Math.floor((currentTime % 1) * 100).toString().padStart(2, '0')} / 00:10:00
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="px-3 py-1.5 rounded-md bg-[#16A3A3]/10 text-[#16A3A3] text-xs font-bold uppercase tracking-wider border border-[#16A3A3]/20 flex items-center gap-1.5">
                <Wand2 className="w-3 h-3" /> Auto-Verify
              </button>
              <button className="text-[#64748B] hover:text-[#17324D]"><Maximize2 className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-[360px] border-l border-[#E2E8F0] bg-white flex flex-col shrink-0">
          <div className="flex-1 flex flex-col border-b border-[#E2E8F0]">
            <div className="p-3.5 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F5F7FA]">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#17324D]">Stock Audit Notes</h3>
              <span className="px-2 py-0.5 bg-[#16A34A]/10 text-[#16A34A] text-[10px] font-bold uppercase rounded border border-[#16A34A]/20">Verified</span>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-3 text-left">
              <div className="flex flex-wrap gap-1.5">
                {MOCK_TRANSCRIPTION.map((word, i) => (
                  <span 
                    key={i} 
                    className={`text-sm font-medium cursor-pointer px-1 rounded ${
                      currentTime >= word.time && currentTime < word.time + 1
                        ? 'bg-[#16A3A3]/20 text-[#16A3A3] font-bold' 
                        : word.highlighted 
                          ? 'text-[#17324D] font-bold' 
                          : 'text-[#64748B]'
                    }`}
                  >
                    {word.text}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="h-60 bg-[#F5F7FA] p-5 flex flex-col text-left">
            <h3 className="font-bold text-xs uppercase tracking-wider text-[#17324D] mb-3">Export Hub</h3>
            
            <div className="grid grid-cols-2 gap-2 mb-4">
              <button 
                onClick={() => setSelectedPlatform('tiktok')}
                className={`py-2 rounded-lg border text-xs font-bold transition-all ${
                  selectedPlatform === 'tiktok' 
                    ? 'bg-[#17324D] border-[#17324D] text-white shadow-xs' 
                    : 'bg-white border-[#E2E8F0] text-[#64748B]'
                }`}
              >
                CSV / XLSX
              </button>
              <button 
                onClick={() => setSelectedPlatform('instagram')}
                className={`py-2 rounded-lg border text-xs font-bold transition-all ${
                  selectedPlatform === 'instagram' 
                    ? 'bg-[#17324D] border-[#17324D] text-white shadow-xs' 
                    : 'bg-white border-[#E2E8F0] text-[#64748B]'
                }`}
              >
                EDI Package
              </button>
            </div>

            {isExporting ? (
              <div className="mt-auto">
                <div className="flex justify-between text-xs font-bold text-[#17324D] mb-1.5">
                  <span>Reconciling Manifest...</span>
                  <span className="text-[#16A3A3]">{exportProgress}%</span>
                </div>
                <div className="h-2 w-full bg-[#E2E8F0] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#16A3A3]"
                    style={{ width: `${exportProgress}%` }}
                  />
                </div>
              </div>
            ) : exportProgress === 100 ? (
              <div className="mt-auto p-3 bg-[#16A34A]/10 border border-[#16A34A]/20 rounded-lg flex items-center gap-2 text-[#16A34A] text-xs font-bold">
                <CheckCircle2 className="w-4 h-4" /> Manifest Exported
              </div>
            ) : (
              <div className="mt-auto">
                <button 
                  onClick={handleExport}
                  className="w-full py-2.5 bg-[#17324D] hover:bg-[#11263c] text-white rounded-lg font-bold uppercase tracking-wider text-xs transition-colors shadow-xs"
                >
                  Generate Manifest Report
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
