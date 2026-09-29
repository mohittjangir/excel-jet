"use client";

import { useState } from "react";
import { Share2, Link2, FileText, Wand2, Copy, Check, ArrowRight } from "lucide-react";

export default function OmnichannelTool() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exported, setExported] = useState(false);

  const formats = [
    { name: "EDI 856 Shipment Notice", icon: Share2, count: "5 Data Segments" },
    { name: "ERP Inventory Ledger", icon: Link2, count: "450 Records" },
    { name: "Carrier Bill of Lading", icon: FileText, count: "Standard PDF" },
  ];

  const handleCopy = (index: number) => {
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleExport = () => {
    setExporting(true);
    setTimeout(() => {
      setExporting(false);
      setExported(true);
      setTimeout(() => setExported(false), 3000);
    }, 1500);
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-left">
      <div className="mb-6 text-left">
        <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
          Omnichannel Data Sync <Wand2 className="w-5 h-5 text-[#0077C8]" />
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5">Export stock data to EDI, ERP & Logistics partners.</p>
      </div>

      <div className="space-y-3">
        {formats.map((f, i) => (
          <div 
            key={i}
            className="p-4 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between group hover:border-[#0077C8] transition-all cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#0F172A] text-white flex items-center justify-center shrink-0">
                <f.icon className="w-5 h-5 text-[#0077C8]" />
              </div>
              <div className="text-left">
                <h4 className="text-xs font-bold text-[#0F172A]">{f.name}</h4>
                <p className="text-[10px] font-semibold text-[#0077C8] uppercase tracking-wider">{f.count}</p>
              </div>
            </div>
            <button 
              onClick={() => handleCopy(i)}
              className={`p-2 rounded border text-xs font-bold flex items-center gap-1 transition-all ${
                copiedIndex === i 
                  ? 'bg-[#16A34A] text-white border-[#16A34A]' 
                  : 'bg-white border-[#E2E8F0] text-[#64748B] hover:text-[#0F172A] hover:border-[#0077C8]'
              }`}
            >
              {copiedIndex === i ? <><Check className="w-4 h-4" /> Copied!</> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
      
      <div className="mt-6 p-4 rounded-lg bg-[#0F172A] text-white text-center">
         <p className="text-[10px] font-bold text-slate-300 uppercase tracking-wider mb-1">Target Warehouse Batch</p>
         <h4 className="text-sm font-extrabold text-white truncate">Stock Inbound Manifest #8841</h4>
         
         <button 
           onClick={handleExport}
           disabled={exporting}
           className="mt-4 w-full py-2.5 rounded-lg bg-[#0077C8] hover:bg-[#0066B0] text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm flex items-center justify-center gap-2"
         >
           {exporting ? (
             <span>Packaging EDI Manifest...</span>
           ) : exported ? (
             <span className="text-[#16A34A] font-bold flex items-center gap-1">
               <Check className="w-4 h-4" /> All Manifest Documents Exported!
             </span>
           ) : (
             <>Export All Documents <ArrowRight className="w-4 h-4" /></>
           )}
         </button>
      </div>
    </div>
  );
}
