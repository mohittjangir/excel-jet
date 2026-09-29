"use client";

import { useEffect, useState } from "react";
import { Boxes, Sliders, History, ArrowDownLeft, ArrowUpRight, AlertTriangle, CheckCircle2, X, Plus } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

type InventoryTab = 'current' | 'adjustments' | 'history';

export default function InventoryModule() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [activeTab, setActiveTab] = useState<InventoryTab>('current');
  const [products, setProducts] = useState<any[]>([]);
  const [adjustments, setAdjustments] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAdjModal, setShowAdjModal] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Form State
  const [selectedProductId, setSelectedProductId] = useState("");
  const [adjType, setAdjType] = useState<'INCREMENT' | 'DECREMENT' | 'DAMAGE_WRITE_OFF' | 'CYCLE_COUNT'>('CYCLE_COUNT');
  const [quantity, setQuantity] = useState(1);
  const [reason, setReason] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const [prodRes, adjRes, txRes] = await Promise.all([
        fetch('/api/wms/products'),
        fetch('/api/wms/adjustments'),
        fetch('/api/wms/transactions')
      ]);

      if (prodRes.ok) setProducts(await prodRes.json());
      if (adjRes.ok) setAdjustments(await adjRes.json());
      if (txRes.ok) setHistory(await txRes.json());
    } catch (e) {
      console.error("Failed to load inventory data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAdjustmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || quantity <= 0) return;
    setFeedback(null);

    try {
      const res = await fetch('/api/wms/adjustments', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-role': user?.role || 'STAFF',
          'x-user-name': user?.name || 'Operator'
        },
        body: JSON.stringify({
          productId: selectedProductId,
          type: adjType,
          quantity,
          reason,
        }),
      });

      if (res.ok) {
        setFeedback({ type: 'success', msg: `Stock adjustment processed successfully!` });
        setShowAdjModal(false);
        setQuantity(1);
        setReason("");
        loadData();
      } else {
        const err = await res.json();
        setFeedback({ type: 'error', msg: err.error || "Adjustment failed" });
      }
    } catch (e: any) {
      setFeedback({ type: 'error', msg: e.message || "Network error" });
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-left space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
            Inventory Management Engine <Boxes className="w-5 h-5 text-[#0077C8]" />
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">Track current stock levels, process cycle count adjustments & audit movements.</p>
        </div>

        <button 
          onClick={() => { setFeedback(null); setShowAdjModal(true); }}
          className="px-4 py-2 bg-[#0F172A] hover:bg-[#1E293B] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
        >
          <Sliders className="w-4 h-4 text-[#0077C8]" /> Process Stock Adjustment
        </button>
      </div>

      {/* Sub-tabs */}
      <div className="flex overflow-x-auto gap-2 border-b border-[#E2E8F0] pb-2">
        <button
          onClick={() => setActiveTab('current')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'current' ? 'bg-[#0F172A] text-white' : 'bg-[#F8FAFC] text-[#64748B]'
          }`}
        >
          <Boxes className="w-3.5 h-3.5" /> Current Stock Ledger
        </button>
        <button
          onClick={() => setActiveTab('adjustments')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'adjustments' ? 'bg-[#0F172A] text-white' : 'bg-[#F8FAFC] text-[#64748B]'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" /> Stock Adjustments Log
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            activeTab === 'history' ? 'bg-[#0F172A] text-white' : 'bg-[#F8FAFC] text-[#64748B]'
          }`}
        >
          <History className="w-3.5 h-3.5" /> Full Movement History
        </button>
      </div>

      {feedback && (
        <div className={`p-3 rounded-lg text-xs font-bold flex items-center justify-between ${
          feedback.type === 'success' ? 'bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30' : 'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/30'
        }`}>
          <div className="flex items-center gap-2">
            {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
            <span>{feedback.msg}</span>
          </div>
          <button onClick={() => setFeedback(null)}><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Content views */}
      {activeTab === 'current' && (
        <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider">
                <th className="p-3">SKU</th>
                <th className="p-3">Product Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Location</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 font-mono font-bold text-[#0077C8]">{p.sku}</td>
                  <td className="p-3 font-bold text-[#0F172A]">{p.name}</td>
                  <td className="p-3 text-[#64748B]">{p.category}</td>
                  <td className="p-3 text-[#64748B]">{p.location}</td>
                  <td className="p-3 text-center font-extrabold text-[#0F172A]">{p.quantity}</td>
                  <td className="p-3 text-center">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#0077C8]/10 text-[#0077C8]">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'adjustments' && (
        <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider">
                <th className="p-3">Date</th>
                <th className="p-3">SKU / Product</th>
                <th className="p-3">Type</th>
                <th className="p-3 text-center">Old Qty ➔ New Qty</th>
                <th className="p-3">Reason</th>
                <th className="p-3">Operator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {adjustments.map(a => (
                <tr key={a.id} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 text-[#64748B]">{new Date(a.createdAt).toLocaleString()}</td>
                  <td className="p-3 font-bold text-[#0F172A]">{a.productName} ({a.sku})</td>
                  <td className="p-3 font-bold text-[#0077C8]">{a.type}</td>
                  <td className="p-3 text-center font-mono font-bold">{a.oldQuantity} ➔ {a.newQuantity} ({a.type === 'INCREMENT' ? '+' : '-'}{a.quantity})</td>
                  <td className="p-3 text-[#64748B]">{a.reason}</td>
                  <td className="p-3 text-[#0F172A] font-semibold">{a.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider">
                <th className="p-3">Time</th>
                <th className="p-3">SKU / Item</th>
                <th className="p-3">Operation</th>
                <th className="p-3 text-center">Quantity</th>
                <th className="p-3">Ref / Partner</th>
                <th className="p-3">Operator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {history.map(h => (
                <tr key={h.id} className="hover:bg-[#F8FAFC]">
                  <td className="p-3 text-[#64748B]">{new Date(h.createdAt).toLocaleString()}</td>
                  <td className="p-3 font-bold text-[#0F172A]">{h.productName} ({h.sku})</td>
                  <td className="p-3 font-extrabold">
                    <span className={`px-2 py-0.5 rounded text-[10px] ${h.type === 'STOCK_IN' ? 'bg-[#16A34A]/10 text-[#16A34A]' : 'bg-[#0077C8]/10 text-[#0077C8]'}`}>
                      {h.type}
                    </span>
                  </td>
                  <td className="p-3 text-center font-extrabold text-[#0F172A]">{h.type === 'STOCK_IN' ? '+' : '-'}{h.quantity}</td>
                  <td className="p-3 text-[#64748B]">{h.sourceDestination} ({h.referenceNo || 'N/A'})</td>
                  <td className="p-3 text-[#0F172A] font-semibold">{h.user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Adjustment Form Modal */}
      {showAdjModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 max-w-md w-full text-left space-y-4 shadow-2xl relative">
            <button onClick={() => setShowAdjModal(false)} className="absolute top-4 right-4 text-[#64748B]"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-extrabold text-[#0F172A] uppercase">Stock Adjustment Entry</h3>
            
            <form onSubmit={handleAdjustmentSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Select Product SKU</label>
                <select 
                  value={selectedProductId} 
                  onChange={e => setSelectedProductId(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A]"
                >
                  <option value="">-- Choose Product --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku}) — Available: {p.quantity}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Adjustment Type</label>
                <select 
                  value={adjType} 
                  onChange={e => setAdjType(e.target.value as any)}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A]"
                >
                  <option value="CYCLE_COUNT">Cycle Count Adjustment (-)</option>
                  <option value="DAMAGE_WRITE_OFF">Damage Write-off (-)</option>
                  <option value="INCREMENT">Stock Found / Re-entry (+)</option>
                  <option value="DECREMENT">Stock Shrinkage / Variance (-)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Adjustment Quantity</label>
                <input 
                  type="number" 
                  min="1"
                  value={quantity}
                  onChange={e => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Audit Reason / Justification</label>
                <textarea 
                  required
                  placeholder="Reason for stock variance..."
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] h-16"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowAdjModal(false)} className="px-4 py-2 rounded bg-slate-100 font-bold uppercase text-[10px]">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded bg-[#0F172A] text-white font-bold uppercase text-[10px]">Confirm Adjustment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
