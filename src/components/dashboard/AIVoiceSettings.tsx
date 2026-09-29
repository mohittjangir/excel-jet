"use client";

import { motion } from "framer-motion";
import { HardDrive, Globe, Check } from "lucide-react";

export default function AIVoiceSettings() {
  const scanners = [
    { name: "Scanner Station #1", style: "Zone A - Inbound", active: true },
    { name: "Scanner Station #2", style: "Zone B - Racks", active: false },
    { name: "Mobile Terminal #4", style: "Dispatch Bay", active: false },
  ];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 h-full shadow-sm text-left">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#17324D] flex items-center gap-2">
          Hardware & Integration <Globe className="w-5 h-5 text-[#16A3A3]" />
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5 font-medium">Barcode scanner & terminal configuration.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-2 block">Active Scanner Station</label>
          <div className="grid grid-cols-1 gap-2">
            {scanners.map((scanner, i) => (
              <button 
                key={i}
                className={`flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
                  scanner.active ? 'bg-[#17324D] text-white border-[#17324D] shadow-sm' : 'bg-[#F5F7FA] border-[#E2E8F0] hover:border-[#CBD5E1] text-[#17324D]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center ${scanner.active ? 'bg-[#16A3A3]' : 'bg-[#E2E8F0]'}`}>
                    <HardDrive className={`w-3.5 h-3.5 ${scanner.active ? 'text-white' : 'text-[#64748B]'}`} />
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${scanner.active ? 'text-white' : 'text-[#17324D]'}`}>{scanner.name}</p>
                    <p className={`text-[10px] font-semibold ${scanner.active ? 'text-slate-300' : 'text-[#64748B]'}`}>{scanner.style}</p>
                  </div>
                </div>
                {scanner.active && <Check className="w-4 h-4 text-[#16A3A3]" />}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-2 block">Real-Time ERP Sync</label>
          <div className="flex items-center justify-between p-3 rounded-lg bg-[#F5F7FA] border border-[#E2E8F0]">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-md bg-[#16A3A3]/10 flex items-center justify-center">
                <Globe className="w-3.5 h-3.5 text-[#16A3A3]" />
              </div>
              <span className="text-xs font-bold text-[#17324D]">Cloud Ledger Sync</span>
            </div>
            <div className="w-8 h-4 bg-[#16A3A3] rounded-full relative">
              <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
