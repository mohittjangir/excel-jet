"use client";

import { motion } from "framer-motion";
import { UserCheck, ShieldCheck } from "lucide-react";

export default function AvatarSelection() {
  const operators = [
    { id: 1, name: "Operator #04", type: "Shift Lead", active: true },
    { id: 2, name: "Operator #12", type: "Forklift Lead", active: false },
    { id: 3, name: "Operator #08", type: "QC Auditor", active: false },
    { id: 4, name: "Operator #19", type: "Dispatch Lead", active: false },
  ];

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 h-full shadow-sm text-left">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-[#17324D] flex items-center gap-2">
            Active Operators <ShieldCheck className="w-5 h-5 text-[#16A3A3]" />
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5 font-medium">Assigned floor personnel & supervisors.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {operators.map((op) => (
          <div 
            key={op.id}
            className={`relative rounded-lg border p-3.5 cursor-pointer transition-all flex flex-col items-center gap-2 ${
              op.active ? 'border-[#16A3A3] bg-[#16A3A3]/5 shadow-xs' : 'border-[#E2E8F0] bg-[#F5F7FA] hover:border-[#CBD5E1]'
            }`}
          >
            {op.active && (
              <div className="absolute top-2 right-2">
                <ShieldCheck className="w-4 h-4 text-[#16A3A3]" />
              </div>
            )}

            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#17324D] text-white">
              <UserCheck className="w-6 h-6 text-[#16A3A3]" />
            </div>
            <div className="text-center">
              <p className="text-xs font-bold text-[#17324D]">{op.name}</p>
              <p className="text-[10px] font-bold text-[#16A3A3] uppercase tracking-wider mt-0.5">{op.type}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2.5 rounded-lg bg-[#17324D] hover:bg-[#11263c] text-xs font-bold uppercase tracking-wider text-white transition-all shadow-sm">
        Manage Shift Staff
      </button>
    </div>
  );
}
