"use client";

import { Copy, TrendingUp, HelpCircle } from "lucide-react";

export default function ViralHooks() {
  const rules = [
    { title: "FIFO Order Allocation Rule", category: "Allocation", text: "First-In First-Out rule for perishable & batch stock." },
    { title: "Auto Re-order Threshold", category: "Inventory", text: "Trigger purchase order request when SKU falls below 15%." },
    { title: "High-Priority Pick Route", category: "Dispatch", text: "Assign fast-mover SKUs to front-rack aisles." },
    { title: "Quality Check Requirement", category: "Inspection", text: "Mandatory QC verification before putaway confirmation." },
  ];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 h-full shadow-sm text-left">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#17324D] flex items-center gap-2">
            Stock Routing Rules <TrendingUp className="w-5 h-5 text-[#16A3A3]" />
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5 font-medium">Automated logic for inventory handling.</p>
        </div>
        <button className="text-[#64748B] hover:text-[#17324D] transition-colors">
          <HelpCircle className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-3">
        {rules.map((rule, i) => (
          <div 
            key={i}
            className="p-3.5 rounded-lg bg-[#F5F7FA] border border-[#E2E8F0] hover:border-[#16A3A3] transition-all group cursor-pointer"
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#16A3A3] bg-[#16A3A3]/10 px-2 py-0.5 rounded">
                {rule.category}
              </span>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[#64748B] hover:text-[#17324D]">
                <Copy className="w-3.5 h-3.5" />
              </button>
            </div>
            <h4 className="text-xs font-bold text-[#17324D] line-clamp-1">{rule.title}</h4>
            <p className="text-[11px] text-[#64748B] mt-0.5 line-clamp-1">{rule.text}</p>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-5 py-2.5 rounded-lg bg-[#F5F7FA] hover:bg-[#E2E8F0] text-xs font-bold text-[#2F5D7C] transition-all border border-[#E2E8F0]">
        Manage Routing Rules
      </button>
    </div>
  );
}
