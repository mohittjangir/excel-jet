"use client";

import { motion } from "framer-motion";
import { Smartphone, Package, QrCode } from "lucide-react";
import { useState } from "react";

export default function MobilePreviewer() {
  const [platform, setPlatform] = useState('scanner');

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 h-full shadow-sm text-left">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3">
        <div className="text-left">
          <h3 className="text-lg font-bold text-[#17324D] flex items-center gap-2">
            Handheld Scanner View <Smartphone className="w-5 h-5 text-[#16A3A3]" />
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">Mobile terminal interface preview.</p>
        </div>
        
        <div className="flex p-1 bg-[#F5F7FA] rounded-lg border border-[#E2E8F0]">
          <button 
            onClick={() => setPlatform('scanner')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              platform === 'scanner' ? 'bg-[#17324D] text-white shadow-xs' : 'text-[#64748B] hover:text-[#17324D]'
            }`}
          >
            Scanner UI
          </button>
          <button 
            onClick={() => setPlatform('tablet')}
            className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
              platform === 'tablet' ? 'bg-[#17324D] text-white shadow-xs' : 'text-[#64748B] hover:text-[#17324D]'
            }`}
          >
            Tablet UI
          </button>
        </div>
      </div>

      <div className="flex justify-center items-center py-2">
        <div className="relative w-[260px] h-[480px] bg-[#17324D] rounded-[36px] border-[8px] border-[#0F2338] shadow-xl overflow-hidden text-white flex flex-col p-4">
          <div className="w-20 h-4 bg-[#0F2338] rounded-b-xl mx-auto mb-4" />
          
          <div className="bg-[#0F2338] p-3 rounded-lg border border-[#2F5D7C] text-left mb-4">
            <div className="flex items-center gap-2 text-[#16A3A3] text-xs font-bold mb-1">
              <QrCode className="w-4 h-4" /> Barcode Reader Ready
            </div>
            <p className="text-[10px] text-slate-300">Scan bin tag or SKU manifest</p>
          </div>

          <div className="flex-1 bg-[#F5F7FA] text-[#1F2937] rounded-lg p-3 flex flex-col justify-between text-left">
            <div>
              <span className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">Item Details</span>
              <h4 className="font-extrabold text-sm text-[#17324D] mt-0.5">Pallet #PL-9042</h4>
              <p className="text-xs text-[#64748B]">Zone B • Aisle 04 • Shelf 12</p>
            </div>

            <div className="bg-white p-2.5 rounded border border-[#E2E8F0] shadow-xs">
              <div className="flex items-center justify-between text-xs font-bold text-[#17324D]">
                <span>Count: 150 Units</span>
                <span className="text-[#16A34A]">Pass</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
