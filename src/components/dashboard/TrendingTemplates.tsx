"use client";

import { useState } from "react";
import { Warehouse, Boxes, ScanLine, Truck, Check } from "lucide-react";
import { motion } from "framer-motion";

export default function TrendingTemplates() {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const templates = [
    { id: 1, title: "Cross-Docking Workflow", category: "Receiving", icon: Warehouse, uses: "12.5K Runs" },
    { id: 2, title: "High-Density Bin Mapping", category: "Storage", icon: Boxes, uses: "8.2K Runs" },
    { id: 3, title: "Fast-Track SKU Inspection", category: "Auditing", icon: ScanLine, uses: "15.1K Runs" },
    { id: 4, title: "Automated Carrier Dispatch", category: "Logistics", icon: Truck, uses: "5.4K Runs" },
  ];

  return (
    <div className="mt-12 pt-8 border-t border-[#E2E8F0]">
      <div className="flex items-center justify-between mb-6">
        <div className="text-left">
          <h3 className="text-xl font-bold text-[#0F172A]">
            Standard Warehouse Templates & Workflows
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">Pre-configured operational automation rules for warehouse staff.</p>
        </div>
        <button 
          onClick={() => alert("Library contains 45 pre-configured WMS operational rules.")}
          className="text-xs font-bold text-[#0077C8] hover:text-[#0066B0] transition-colors bg-[#0077C8]/10 px-3 py-1.5 rounded-lg border border-[#0077C8]/20 uppercase tracking-wider"
        >
          Browse Library
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {templates.map((template) => {
          const isSelected = selectedId === template.id;
          return (
            <motion.div 
              key={template.id} 
              whileHover={{ y: -4 }}
              onClick={() => setSelectedId(template.id)}
              className={`group relative rounded-xl bg-white border overflow-hidden transition-all shadow-sm hover:shadow-md cursor-pointer flex flex-col p-5 text-left ${
                isSelected ? 'border-[#0077C8] ring-2 ring-[#0077C8]/20' : 'border-[#E2E8F0] hover:border-[#0077C8]'
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-10 h-10 rounded-lg bg-[#0F172A] text-white flex items-center justify-center">
                  <template.icon className="w-5 h-5 text-[#0077C8]" />
                </div>
                {isSelected && (
                  <span className="p-1 rounded-full bg-[#16A34A] text-white text-[9px] font-bold">
                    <Check className="w-3 h-3" />
                  </span>
                )}
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#64748B]">
                  {template.category}
                </span>
                <span className="text-[9px] text-[#0077C8] font-bold bg-[#F8FAFC] px-2 py-0.5 rounded border border-[#E2E8F0]">
                  {template.uses}
                </span>
              </div>
              <h4 className="font-bold text-[#0F172A] text-sm leading-tight group-hover:text-[#0077C8] transition-colors">
                {template.title}
              </h4>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
