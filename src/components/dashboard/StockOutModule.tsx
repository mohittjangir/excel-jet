"use client";

import { useEffect, useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertTriangle, X, Truck, Layers, History } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function StockOutModule({ onStockOutSuccess }: { onStockOutSuccess?: () => void }) {
  const { user } = useAuth();
  const [products, setProducts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState("");
  const [actionQuantity, setActionQuantity] = useState(1);
  const [sourceDestination, setSourceDestination] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [actionNotes, setActionNotes] = useState("");
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const loadData = async () => {
    try {
      const [prodRes, txRes] = await Promise.all([
        fetch('/api/wms/products'),
        fetch('/api/wms/transactions')
      ]);

      if (prodRes.ok) {
        const pData = await prodRes.json();
        setProducts(pData);
        if (pData.length > 0 && !selectedProductId) {
          setSelectedProductId(pData[0].id);
        }
      }

      if (txRes.ok) {
        const tData = await txRes.json();
        setTransactions(tData.filter((t: any) => t.type === 'STOCK_OUT'));
      }
    } catch (e) {
      console.error("Failed to load stock out data", e);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || actionQuantity <= 0) {
      setFeedback({ type: 'error', msg: "Please select a product and enter a valid quantity." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/wms/stock-out', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': user?.role || 'STAFF',
          'x-user-name': user?.name || 'Operator'
        },
        body: JSON.stringify({
          productId: selectedProductId,
          quantity: actionQuantity,
          sourceDestination,
          referenceNo,
          notes: actionNotes,
          user: user?.name || 'Excel Jet Operator'
        }),
      });

      if (res.ok) {
        setFeedback({ type: 'success', msg: `Successfully dispatched ${actionQuantity} units!` });
        setActionQuantity(1);
        setSourceDestination("");
        setReferenceNo("");
        setActionNotes("");
        loadData();
        if (onStockOutSuccess) onStockOutSuccess();
      } else {
        const err = await res.json();
        setFeedback({ type: 'error', msg: err.error || "Stock Out operation failed" });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', msg: err.message || "Network error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedProduct = products.find(p => p.id === selectedProductId);

  return (
    <div className="space-y-6 text-left">
      {/* Stock Out Form Card */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
          <div>
            <h3 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2">
              <ArrowUpRight className="w-5 h-5 text-[#0077C8]" /> Stock Out (Outbound Dispatch)
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              Process customer order dispatches, stock picking, and outbound shipping manifests.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-lg bg-[#0077C8]/10 border border-[#0077C8]/20 text-[#0077C8] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5">
            <Truck className="w-4 h-4" /> Dispatch Control Active
          </div>
        </div>

        {feedback && (
          <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-bold ${
            feedback.type === 'success' ? 'bg-[#16A34A]/10 border-[#16A34A]/30 text-[#16A34A]' : 'bg-[#DC2626]/10 border-[#DC2626]/30 text-[#DC2626]'
          }`}>
            <div className="flex items-center gap-2">
              {feedback.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
              <span>{feedback.msg}</span>
            </div>
            <button onClick={() => setFeedback(null)} className="text-current opacity-70 hover:opacity-100">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-[#0F172A] mb-1">Select Product SKU <span className="text-red-500">*</span></label>
            <select
              value={selectedProductId}
              onChange={e => setSelectedProductId(e.target.value)}
              required
              className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
            >
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.sku}) — Available Stock: {p.quantity} {p.unit || 'units'}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#0F172A] mb-1">Quantity Dispatched (-) <span className="text-red-500">*</span></label>
              <input
                type="number"
                min="1"
                max={selectedProduct ? selectedProduct.quantity : undefined}
                value={actionQuantity}
                onChange={e => setActionQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                required
                className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
              />
              {selectedProduct && (
                <p className="text-[10px] text-[#64748B] mt-1">
                  Remaining after dispatch: <strong className="text-[#0F172A]">{Math.max(0, selectedProduct.quantity - actionQuantity)}</strong> units
                </p>
              )}
            </div>

            <div>
              <label className="block font-bold text-[#0F172A] mb-1">Customer / Destination Hub</label>
              <input
                type="text"
                placeholder="e.g. Metro Logistics Depot"
                value={sourceDestination}
                onChange={e => setSourceDestination(e.target.value)}
                className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-[#0F172A] mb-1">Dispatch / Order Ref #</label>
              <input
                type="text"
                placeholder="e.g. ORD-99301"
                value={referenceNo}
                onChange={e => setReferenceNo(e.target.value)}
                className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
              />
            </div>

            <div>
              <label className="block font-bold text-[#0F172A] mb-1">Notes / Shipping Details</label>
              <input
                type="text"
                placeholder="Outbound quality check verified..."
                value={actionNotes}
                onChange={e => setActionNotes(e.target.value)}
                className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
              />
            </div>
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#0077C8] hover:bg-[#0066B0] text-white rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md flex items-center gap-2"
            >
              <ArrowUpRight className="w-4 h-4" /> {isSubmitting ? 'Processing Dispatch...' : 'Confirm Stock Out'}
            </button>
          </div>
        </form>
      </div>

      {/* Recent Dispatches Table */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
            <History className="w-4 h-4 text-[#0077C8]" /> Recent Outbound Dispatches
          </h4>
          <span className="text-xs text-[#64748B] font-semibold">{transactions.length} Records</span>
        </div>

        <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider">
                <th className="p-3">Time</th>
                <th className="p-3">SKU / Item</th>
                <th className="p-3 text-center">Dispatched Qty</th>
                <th className="p-3">Destination / Customer</th>
                <th className="p-3">Ref #</th>
                <th className="p-3">Operator</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E2E8F0]">
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-400 font-semibold text-xs">
                    No outbound dispatches recorded yet.
                  </td>
                </tr>
              ) : (
                transactions.map(t => (
                  <tr key={t.id} className="hover:bg-[#F8FAFC]">
                    <td className="p-3 text-[#64748B]">{new Date(t.createdAt).toLocaleString()}</td>
                    <td className="p-3 font-bold text-[#0F172A]">{t.productName} ({t.sku})</td>
                    <td className="p-3 text-center font-extrabold text-[#0077C8]">-{t.quantity}</td>
                    <td className="p-3 text-[#64748B]">{t.sourceDestination || 'N/A'}</td>
                    <td className="p-3 font-mono text-[#0F172A]">{t.referenceNo || 'N/A'}</td>
                    <td className="p-3 font-semibold text-[#0F172A]">{t.user}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
