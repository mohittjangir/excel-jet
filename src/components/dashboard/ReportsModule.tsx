"use client";

import { useEffect, useState } from "react";
import { BarChart3, Clock, TrendingUp, Download, PieChart, Layers } from "lucide-react";

type ReportTab = 'valuation' | 'ageing' | 'movement';

export default function ReportsModule() {
  const [activeTab, setActiveTab] = useState<ReportTab>('valuation');
  const [reports, setReports] = useState<{
    stockReport: any[];
    stockAgeing: any[];
    stockMovement: any[];
  }>({
    stockReport: [],
    stockAgeing: [],
    stockMovement: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/wms/reports');
        if (res.ok && isSubscribed) {
          const data = await res.json();
          setReports(data);
        }
      } catch (e) {
        console.error("Failed to load reports", e);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    };
    fetchReports();
    return () => { isSubscribed = false; };
  }, []);

  const totalInventoryValue = reports.stockReport.reduce((acc, r) => acc + (r.totalValue || 0), 0);

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-left space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
            Warehouse Reports & Intelligence <BarChart3 className="w-5 h-5 text-[#0077C8]" />
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">Real-time stock valuation, ageing analysis (0-90+ days), and movement tracking.</p>
        </div>

        <button 
          onClick={() => alert("Report downloaded as CSV manifest!")}
          className="px-4 py-2 bg-[#0077C8] hover:bg-[#0066B0] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
        >
          <Download className="w-4 h-4" /> Export Report CSV
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-[#E2E8F0] pb-2">
        <button
          onClick={() => setActiveTab('valuation')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'valuation' ? 'bg-[#0F172A] text-white' : 'bg-[#F8FAFC] text-[#64748B]'
          }`}
        >
          <PieChart className="w-3.5 h-3.5" /> Stock Valuation Report
        </button>
        <button
          onClick={() => setActiveTab('ageing')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'ageing' ? 'bg-[#0F172A] text-white' : 'bg-[#F8FAFC] text-[#64748B]'
          }`}
        >
          <Clock className="w-3.5 h-3.5" /> Stock Ageing Breakdown
        </button>
        <button
          onClick={() => setActiveTab('movement')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'movement' ? 'bg-[#0F172A] text-white' : 'bg-[#F8FAFC] text-[#64748B]'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" /> Stock Movement Report
        </button>
      </div>

      {/* Valuation Summary Banner */}
      {activeTab === 'valuation' && (
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B]">Total Asset Valuation</span>
            <h4 className="text-2xl font-black text-[#0F172A]">${totalInventoryValue.toLocaleString()}</h4>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#64748B]">Active Line Items</span>
            <h4 className="text-xl font-bold text-[#0077C8]">{reports.stockReport.length} SKUs</h4>
          </div>
        </div>
      )}

      {/* Content views */}
      {activeTab === 'valuation' && (
        <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider">
                <th className="p-3">SKU</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Category</th>
                <th className="p-3 text-center">Qty On Hand</th>
                <th className="p-3 text-right">Unit Price</th>
                <th className="p-3 text-right">Total Asset Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {reports.stockReport.map(r => (
                <tr key={r.id} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-mono font-bold text-[#0077C8]">{r.sku}</td>
                  <td className="p-3 font-bold text-[#0F172A]">{r.name}</td>
                  <td className="p-3 text-[#64748B]">{r.category}</td>
                  <td className="p-3 text-center font-extrabold text-[#0F172A]">{r.quantity}</td>
                  <td className="p-3 text-right text-[#64748B]">${r.price}</td>
                  <td className="p-3 text-right font-extrabold text-[#0F172A]">${(r.totalValue || 0).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'ageing' && (
        <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider">
                <th className="p-3">SKU</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Category</th>
                <th className="p-3 text-center">Days in Warehouse</th>
                <th className="p-3 text-center">Ageing Bucket</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {reports.stockAgeing.map(a => (
                <tr key={a.id} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-mono font-bold text-[#0077C8]">{a.sku}</td>
                  <td className="p-3 font-bold text-[#0F172A]">{a.name}</td>
                  <td className="p-3 text-[#64748B]">{a.category}</td>
                  <td className="p-3 text-center font-bold text-[#0F172A]">{a.daysInWarehouse} Days</td>
                  <td className="p-3 text-center">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase bg-[#0077C8]/10 text-[#0077C8]">
                      {a.ageBucket}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'movement' && (
        <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider">
                <th className="p-3">Date</th>
                <th className="p-3">SKU / Item</th>
                <th className="p-3">Type</th>
                <th className="p-3 text-center">Movement Qty</th>
                <th className="p-3">Partner / Ref</th>
                <th className="p-3">Operator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {reports.stockMovement.map(m => (
                <tr key={m.id} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 text-[#64748B]">{new Date(m.createdAt).toLocaleString()}</td>
                  <td className="p-3 font-bold text-[#0F172A]">{m.productName} ({m.sku})</td>
                  <td className="p-3 font-bold text-[#0077C8]">{m.type}</td>
                  <td className="p-3 text-center font-extrabold text-[#0F172A]">{m.type === 'STOCK_IN' ? '+' : '-'}{m.quantity}</td>
                  <td className="p-3 text-[#64748B]">{m.sourceDestination}</td>
                  <td className="p-3 font-semibold text-[#0F172A]">{m.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
