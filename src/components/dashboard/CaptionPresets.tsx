"use client";

import { useState } from "react";
import { MessageSquareQuote, ShieldCheck, Tag, Plus } from "lucide-react";

export default function CaptionPresets() {
  const [activeId, setActiveId] = useState(1);
  const [customAdded, setCustomAdded] = useState(false);

  const presets = [
    { id: 1, name: "GS1 Barcode Standard", desc: "High-contrast 1D/2D SKU label formatting.", icon: Tag },
    { id: 2, name: "Manifest Summary", desc: "Itemized stock breakdown with serial IDs.", icon: ShieldCheck },
    { id: 3, name: "Minimalist Packing Slip", desc: "Clean print-ready manifest template.", icon: MessageSquareQuote },
    ...(customAdded ? [{ id: 4, name: "Custom Logistics Tag", desc: "User configured manifest template.", icon: Tag }] : [])
  ];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 h-full shadow-sm text-left">
      <div className="mb-6 text-left">
        <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
          Manifest & Tag Styles <MessageSquareQuote className="w-5 h-5 text-[#0077C8]" />
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5">Pick layout presets for inventory labels & dispatch slips.</p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {presets.map((preset) => {
          const isActive = activeId === preset.id;
          return (
            <div 
              key={preset.id}
              onClick={() => setActiveId(preset.id)}
              className={`relative p-4 rounded-lg border transition-all cursor-pointer text-left ${
                isActive ? 'border-[#0077C8] bg-[#0077C8]/5 shadow-xs' : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#CBD5E1]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-[#0F172A] text-white flex items-center justify-center shrink-0`}>
                  <preset.icon className="w-5 h-5 text-[#0077C8]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-bold text-[#0F172A] text-sm">{preset.name}</h4>
                  <p className="text-xs text-[#64748B] mt-0.5 leading-tight">{preset.desc}</p>
                </div>
                {isActive && (
                  <span className="px-2 py-0.5 rounded bg-[#0077C8] text-[9px] font-bold uppercase text-white tracking-wider shrink-0">
                    Active
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      
      <button 
        onClick={() => {
          setCustomAdded(true);
          setActiveId(4);
        }}
        className="w-full mt-6 py-2.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-sm flex items-center justify-center gap-1.5"
      >
        <Plus className="w-4 h-4" /> Create Custom Tag Style
      </button>
    </div>
  );
}
