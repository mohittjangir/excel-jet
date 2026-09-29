"use client";

import { ScanLine, PackagePlus, PackageMinus, Boxes } from "lucide-react";
import { motion } from "framer-motion";

export default function QuickActions() {
  const actions = [
    { title: "Stock Inbound", desc: "Process incoming goods", icon: PackagePlus, bg: "bg-[#17324D]" },
    { title: "Dispatch Outbound", desc: "Generate shipping orders", icon: PackageMinus, bg: "bg-[#2F5D7C]" },
    { title: "Barcode Audit", desc: "Verify SKU barcodes", icon: ScanLine, bg: "bg-[#16A3A3]" },
    { title: "Bin Re-Allocation", desc: "Re-assign warehouse racks", icon: Boxes, bg: "bg-[#17324D]" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08
      }
    }
  };

  const item = {
    hidden: { opacity: 0, scale: 0.95 },
    show: { opacity: 1, scale: 1 }
  };

  return (
    <div className="mt-8">
      <h3 className="text-lg font-bold mb-4 text-[#17324D] text-left">Quick Operations</h3>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {actions.map((action, i) => (
          <motion.button 
            key={i} 
            variants={item}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            className="flex flex-col items-center text-center p-5 rounded-xl border border-[#E2E8F0] bg-white hover:border-[#CBD5E1] transition-all group shadow-sm hover:shadow-md"
          >
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 ${action.bg} text-white shadow-sm group-hover:scale-105 transition-transform`}>
              <action.icon className="w-5 h-5 text-white" />
            </div>
            <h4 className="font-bold text-sm text-[#17324D]">{action.title}</h4>
            <p className="text-xs text-[#64748B] mt-0.5">{action.desc}</p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
