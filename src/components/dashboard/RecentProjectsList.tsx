"use client";

import { useEffect, useState } from "react";
import { CheckCircle2, ArrowDownLeft, ArrowUpRight, Clock, Package } from "lucide-react";
import { motion } from "framer-motion";

export default function RecentProjectsList() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadTransactions = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/wms/transactions');
      if (res.ok) {
        const data = await res.json();
        setTransactions(data);
      }
    } catch (e) {
      console.error("Error loading transactions", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
    const interval = setInterval(loadTransactions, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading && transactions.length === 0) {
    return (
      <div className="p-8 bg-white border border-[#E2E8F0] rounded-xl text-center text-xs font-semibold text-[#64748B]">
        Loading stock history ledger...
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="p-8 bg-white border border-[#E2E8F0] rounded-xl text-center text-xs font-semibold text-[#64748B]">
        No stock transactions recorded yet. Perform a Stock In or Stock Out operation above.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {transactions.slice(0, 6).map((tx) => {
        const isStockIn = tx.type === 'STOCK_IN';
        return (
          <motion.div 
            key={tx.id} 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="group relative rounded-xl border border-[#E2E8F0] bg-white overflow-hidden hover:border-[#0077C8] transition-all shadow-xs hover:shadow-md p-5 text-left"
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-lg ${isStockIn ? 'bg-[#16A34A]/10 text-[#16A34A]' : 'bg-[#0077C8]/10 text-[#0077C8]'} flex items-center justify-center shrink-0`}>
                  {isStockIn ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-[#0F172A] text-sm truncate group-hover:text-[#0077C8] transition-colors">{tx.productName}</h4>
                  <p className="text-[11px] text-[#64748B] font-medium">{tx.sku} • {tx.quantity} Units</p>
                </div>
              </div>
            </div>
            
            <div className="text-xs text-[#64748B] font-medium mb-3">
              <span>{isStockIn ? 'Source:' : 'Destination:'} </span>
              <span className="font-bold text-[#0F172A]">{tx.sourceDestination}</span>
            </div>

            <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider pt-3 border-t border-[#E2E8F0]">
              <span className="text-[#64748B]">{new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
              
              <span className={`inline-flex items-center shrink-0 whitespace-nowrap gap-1 px-2 py-0.5 rounded-full border ${isStockIn ? 'text-[#16A34A] bg-[#16A34A]/10 border-[#16A34A]/20' : 'text-[#0077C8] bg-[#0077C8]/10 border-[#0077C8]/20'}`}>
                <CheckCircle2 className="w-3 h-3" /> {isStockIn ? 'STOCK IN' : 'STOCK OUT'}
              </span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
