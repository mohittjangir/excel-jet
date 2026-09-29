"use client";

import { CheckCircle, Truck, PackageCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function ActivityFeed() {
  const activities = [
    { id: 1, type: "success", title: "Inbound Verified", desc: "Manifest #8841 (120 SKUs) received into Zone A.", time: "10 min ago", icon: PackageCheck, color: "text-[#16A34A]" },
    { id: 2, type: "info", title: "Dispatch Dispatched", desc: "Outbound shipment #4412 handed over to Carrier.", time: "2 hours ago", icon: Truck, color: "text-[#16A3A3]" },
    { id: 3, type: "system", title: "Cycle Count Completed", desc: "Zone B bin audit completed with 100% match.", time: "1 day ago", icon: CheckCircle, color: "text-[#2F5D7C]" },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, x: 10 },
    show: { opacity: 1, x: 0 }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 15 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white border border-[#E2E8F0] rounded-xl p-6 h-full shadow-sm text-left"
    >
      <h3 className="text-lg font-bold mb-6 text-[#17324D] flex items-center gap-2">
        <PackageCheck className="w-5 h-5 text-[#16A3A3]" /> Warehouse Activity Log
      </h3>
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-6"
      >
        {activities.map((activity, index) => (
          <motion.div key={activity.id} variants={item} className="relative flex gap-3.5">
            {index !== activities.length - 1 && (
              <div className="absolute left-[15px] top-7 bottom-[-24px] w-0.5 bg-[#E2E8F0]" />
            )}
            
            <div className="relative z-10 w-8 h-8 rounded-lg bg-[#F5F7FA] border border-[#E2E8F0] flex items-center justify-center shrink-0">
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            
            <div className="flex flex-col min-w-0">
              <p className="text-xs font-bold text-[#17324D]">{activity.title}</p>
              <p className="text-xs text-[#64748B] mt-0.5 leading-relaxed">{activity.desc}</p>
              <p className="text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider mt-1">{activity.time}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
