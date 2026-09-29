"use client";

import { useState } from "react";
import { BarChart3, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";

export default function PerformanceChart() {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | 'all'>('7d');

  const datasets = {
    '7d': { data: [40, 70, 45, 90, 65, 85, 100], total: "124,500 Units", growth: "+12.5%", days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
    '30d': { data: [55, 65, 80, 75, 95, 85, 110], total: "492,800 Units", growth: "+18.2%", days: ["Wk 1", "Wk 2", "Wk 3", "Wk 4", "Wk 5", "Wk 6", "Wk 7"] },
    'all': { data: [30, 50, 70, 85, 90, 95, 120], total: "1,850,000 Units", growth: "+24.0%", days: ["Q1", "Q2", "Q3", "Q4", "Q1", "Q2", "Q3"] }
  };

  const currentData = datasets[timeframe];

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-left relative overflow-hidden"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-3 relative z-10">
        <div>
          <h3 className="text-lg font-bold flex items-center gap-2 text-[#0F172A]">
            <BarChart3 className="w-5 h-5 text-[#0077C8]" /> Warehouse Stock Movements
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">Total units moved across all storage zones</p>
        </div>
        
        <div className="flex items-center gap-1.5 bg-[#F8FAFC] p-1 rounded-lg border border-[#E2E8F0]">
          <button 
            onClick={() => setTimeframe('7d')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${timeframe === '7d' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'}`}
          >
            7 Days
          </button>
          <button 
            onClick={() => setTimeframe('30d')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${timeframe === '30d' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'}`}
          >
            30 Days
          </button>
          <button 
            onClick={() => setTimeframe('all')}
            className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-all ${timeframe === 'all' ? 'bg-[#0F172A] text-white shadow-xs' : 'text-[#64748B] hover:text-[#0F172A]'}`}
          >
            All Time
          </button>
        </div>
      </div>

      <div className="flex items-baseline gap-3 mb-6 relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight">
          {currentData.total}
        </h2>
        <div className="flex items-center gap-1 text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded text-xs font-bold">
          <TrendingUp className="w-3.5 h-3.5" /> {currentData.growth} throughput
        </div>
      </div>

      <div className="h-44 w-full flex items-end justify-between gap-2 mt-auto relative z-10">
        {currentData.data.map((value, i) => (
          <div key={i} className="flex flex-col items-center gap-2 w-full group">
            <div className="w-full relative flex justify-center cursor-pointer">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${value * 1.3}px` }}
                transition={{ duration: 0.4 }}
                className={`w-full max-w-[32px] rounded-t-md transition-all ${i === currentData.data.length - 1 ? 'bg-[#0077C8]' : 'bg-[#0F172A] opacity-80 hover:opacity-100'}`}
              />
            </div>
            <span className="text-[10px] font-bold text-[#64748B] uppercase">{currentData.days[i]}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
