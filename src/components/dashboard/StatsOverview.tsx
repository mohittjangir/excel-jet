"use client";

import React, { memo, useEffect, useState } from "react";
import { Warehouse, HardDrive, Truck, ShieldCheck, RefreshCw } from "lucide-react";
import { motion } from "framer-motion";

export default memo(function StatsOverview() {
  const [statsData, setStatsData] = useState<{
    totalProducts: number;
    totalStock: number;
    stockReceived: number;
    stockDispatched: number;
    lowStockCount: number;
    outOfStockCount: number;
  }>({
    totalProducts: 4,
    totalStock: 510,
    stockReceived: 50,
    stockDispatched: 30,
    lowStockCount: 1,
    outOfStockCount: 1,
  });

  const [loading, setLoading] = useState(false);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/wms/stats');
      if (res.ok) {
        const data = await res.json();
        setStatsData(data);
      }
    } catch (e) {
      console.error("Error loading stats", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 5000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { label: "Total Products", value: `${statsData.totalProducts} SKUs`, icon: Warehouse, color: "text-[#0077C8]", bg: "bg-[#0077C8]/10" },
    { label: "Total Stock In Inventory", value: `${statsData.totalStock.toLocaleString()} Units`, icon: HardDrive, color: "text-[#0F172A]", bg: "bg-[#0F172A]/10" },
    { label: "Stock Received (In)", value: `${statsData.stockReceived.toLocaleString()} Units`, icon: ShieldCheck, color: "text-[#16A34A]", bg: "bg-[#16A34A]/10" },
    { label: "Stock Dispatched (Out)", value: `${statsData.stockDispatched.toLocaleString()} Orders`, icon: Truck, color: "text-[#F59E0B]", bg: "bg-[#F59E0B]/10", action: statsData.lowStockCount > 0 ? `${statsData.lowStockCount} Low Stock` : "Optimal" },
  ];

  return (
    <div className="relative">
      <div className="flex justify-end mb-2">
        <button 
          onClick={fetchStats}
          disabled={loading}
          className="text-[10px] font-bold text-[#0077C8] hover:text-[#0066B0] flex items-center gap-1 transition-colors uppercase tracking-wider"
        >
          <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Sync Live Stats
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="p-5 rounded-xl border border-[#E2E8F0] bg-white transition-all flex items-center gap-4 relative overflow-hidden group shadow-xs hover:shadow-md text-left"
          >
            <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${stat.bg} group-hover:scale-105 transition-transform shrink-0`}>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div className="text-left flex-1 min-w-0">
              <p className="text-xs text-[#64748B] font-semibold">{stat.label}</p>
              <div className="flex items-baseline gap-2">
                <h4 className="text-xl font-extrabold text-[#0F172A] truncate">{stat.value}</h4>
                {stat.action && (
                  <span className="text-[10px] text-[#DC2626] font-extrabold uppercase tracking-wider bg-[#DC2626]/10 px-1.5 py-0.5 rounded">
                    {stat.action}
                  </span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
});
