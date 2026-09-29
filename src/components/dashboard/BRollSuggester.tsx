"use client";

import { useState } from "react";
import { Film, Search, Wand2, Plus, Check } from "lucide-react";

export default function BRollSuggester() {
  const [scanning, setScanning] = useState(false);
  const [addedIds, setAddedIds] = useState<number[]>([]);

  const suggestions = [
    { id: 1, time: "00:04", prompt: "Zone A Automated Conveyor Inspection", source: "Camera #04" },
    { id: 2, time: "00:12", prompt: "Forklift Rack Loading Video Feed", source: "Camera #12" },
    { id: 3, time: "00:25", prompt: "Pallet Wrap Machine Audit Feed", source: "Camera #08" },
  ];

  const handleScan = () => {
    setScanning(true);
    setTimeout(() => setScanning(false), 1200);
  };

  const handleToggleAdd = (id: number) => {
    setAddedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div>
          <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
            CCTV & Dock Feed Inspector <Film className="w-5 h-5 text-[#0077C8]" />
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">Live warehouse security & receiving camera feeds.</p>
        </div>
        <button 
          onClick={handleScan}
          disabled={scanning}
          className="px-4 py-2 rounded-lg bg-[#0F172A] text-white hover:bg-[#1E293B] transition-all flex items-center gap-2 text-xs font-bold uppercase tracking-wider shadow-sm"
        >
          <Wand2 className={`w-4 h-4 text-[#0077C8] ${scanning ? 'animate-spin' : ''}`} /> 
          {scanning ? "Scanning Feeds..." : "Auto-Scan Dock"}
        </button>
      </div>

      <div className="space-y-4">
        {suggestions.map((s) => {
          const isAdded = addedIds.includes(s.id);
          return (
            <div 
              key={s.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] hover:border-[#0077C8] transition-all"
            >
              <div className="w-24 aspect-video rounded-lg bg-[#0F172A] text-white flex items-center justify-center shrink-0 relative">
                <Search className="w-5 h-5 text-[#0077C8]" />
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded bg-black/60 text-[9px] font-bold text-white">
                  {s.time}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-bold text-[#0F172A] truncate">{s.prompt}</p>
                <span className="text-[10px] font-semibold text-[#0077C8] uppercase tracking-wider">{s.source}</span>
              </div>
              <button 
                onClick={() => handleToggleAdd(s.id)}
                className={`p-2 rounded-lg transition-all ${
                  isAdded ? 'bg-[#16A34A] text-white' : 'bg-[#0F172A] text-white hover:bg-[#1E293B]'
                }`}
              >
                {isAdded ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
