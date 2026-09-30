"use client";

import { useEffect, useState } from "react";
import { Database, Plus, Trash2, Search, Building2, MapPin, Truck, Users, Tag, Scale, CheckCircle2, AlertTriangle, X, ArrowDownLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import CustomizableStockInForm from "./CustomizableStockInForm";

type MasterType = 'categories' | 'units' | 'warehouses' | 'locations' | 'suppliers' | 'customers' | 'stock-in';

export default function MastersModule() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const [activeTab, setActiveTab] = useState<MasterType>('categories');
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Form State
  const [code, setCode] = useState("");
  const [field1, setField1] = useState("");
  const [field2, setField2] = useState("");
  const [field3, setField3] = useState("");
  const [field4, setField4] = useState("");

  const loadData = async (tab: MasterType) => {
    if (tab === 'stock-in') return;
    try {
      setLoading(true);
      const res = await fetch(`/api/wms/masters/${tab}`);
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (e) {
      console.error(`Failed to load ${tab}`, e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(activeTab);
  }, [activeTab]);

  const resetForm = () => {
    setCode("");
    setField1("");
    setField2("");
    setField3("");
    setField4("");
  };

  const handleTabChange = (tab: MasterType) => {
    setActiveTab(tab);
    setSearch("");
    setFeedback(null);
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    try {
      let payload: any = {};
      if (activeTab === 'categories') {
        payload = { code: code || `CAT-${Date.now().toString().slice(-4)}`, name: field1, description: field2 };
      } else if (activeTab === 'units') {
        payload = { code: code || `UNT-${Date.now().toString().slice(-4)}`, name: field1, symbol: field2 || field1.slice(0, 3) };
      } else if (activeTab === 'warehouses') {
        payload = { code: code || `WH-${Date.now().toString().slice(-4)}`, name: field1, address: field2, manager: field3, status: 'ACTIVE' };
      } else if (activeTab === 'locations') {
        payload = { code: code || `LOC-${Date.now().toString().slice(-4)}`, warehouseName: field1 || 'Central Hub', zone: field2 || 'Zone A', aisle: field3 || 'Aisle 01', bin: field4 || 'Bin 01', status: 'ACTIVE' };
      } else if (activeTab === 'suppliers' || activeTab === 'customers') {
        payload = { code: code || `ENT-${Date.now().toString().slice(-4)}`, name: field1, contactPerson: field2, email: field3, phone: field4, status: 'ACTIVE' };
      }

      const res = await fetch(`/api/wms/masters/${activeTab}`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'x-user-role': user?.role || 'STAFF',
          'x-user-name': user?.name || 'Admin'
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setFeedback({ type: 'success', msg: `Master entry for ${activeTab.toUpperCase()} created successfully!` });
        setShowModal(false);
        resetForm();
        loadData(activeTab);
      } else {
        const err = await res.json();
        setFeedback({ type: 'error', msg: err.error || "Creation failed" });
      }
    } catch (e: any) {
      setFeedback({ type: 'error', msg: e.message || "Network error" });
    }
  };

  const handleDelete = async (id: string) => {
    if (!isAdmin) {
      setFeedback({ type: 'error', msg: "Forbidden: Admin access required to delete master entries." });
      return;
    }
    if (!confirm("Delete this master record?")) return;
    try {
      const res = await fetch(`/api/wms/masters/${activeTab}?id=${id}`, {
        method: 'DELETE',
        headers: { 'x-user-role': user?.role || 'STAFF' }
      });
      if (res.ok) {
        setFeedback({ type: 'success', msg: "Record deleted." });
        loadData(activeTab);
      }
    } catch (e) {
      console.error("Delete failed", e);
    }
  };

  const filteredItems = items.filter(item => {
    const q = search.toLowerCase();
    return (
      (item.name && item.name.toLowerCase().includes(q)) ||
      (item.code && item.code.toLowerCase().includes(q)) ||
      (item.description && item.description.toLowerCase().includes(q)) ||
      (item.address && item.address.toLowerCase().includes(q)) ||
      (item.warehouseName && item.warehouseName.toLowerCase().includes(q))
    );
  });

  const masterTabs = [
    { id: 'categories', label: 'Categories', icon: Tag },
    { id: 'units', label: 'Units', icon: Scale },
    { id: 'warehouses', label: 'Warehouses', icon: Building2 },
    { id: 'locations', label: 'Locations', icon: MapPin },
    { id: 'suppliers', label: 'Suppliers', icon: Truck },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'stock-in', label: 'Customizable Stock In', icon: ArrowDownLeft },
  ];

  return (
    <div className="space-y-6 text-left">
      {/* Sub-tab navigation */}
      <div className="bg-white border border-[#E2E8F0] rounded-xl p-4 shadow-sm flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h3 className="text-base font-extrabold text-[#0F172A] flex items-center gap-2">
            Master Data & Receiving Directory <Database className="w-4 h-4 text-[#0077C8]" />
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">Manage master entities or configure your drag & drop Stock In receiving form.</p>
        </div>

        {isAdmin && activeTab !== 'stock-in' && (
          <button 
            onClick={() => { resetForm(); setFeedback(null); setShowModal(true); }}
            className="px-4 py-2 bg-[#0077C8] hover:bg-[#0066B0] text-white rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Add New {activeTab.slice(0, -1)}
          </button>
        )}
      </div>

      <div className="flex overflow-x-auto gap-2 border-b border-[#E2E8F0] pb-2">
        {masterTabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id as MasterType)}
              className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 shrink-0 border ${
                isActive 
                  ? 'bg-[#0F172A] text-white border-[#0F172A] shadow-xs' 
                  : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0] hover:text-[#0F172A] hover:bg-slate-100'
              }`}
            >
              <tab.icon className={`w-4 h-4 ${isActive ? 'text-[#0077C8]' : 'text-[#64748B]'}`} />
              {tab.label}
              {tab.id !== 'stock-in' && (
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-[#64748B]'}`}>
                  {activeTab === tab.id ? filteredItems.length : ''}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {activeTab === 'stock-in' ? (
        <CustomizableStockInForm />
      ) : (
        <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-left space-y-6">

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

      {/* Search Bar */}
      <div className="flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder={`Search ${activeTab}...`}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
          />
        </div>
        <span className="text-xs font-bold text-[#64748B]">Showing {filteredItems.length} {activeTab}</span>
      </div>

      {/* Dynamic Tailored Tables */}
      <div className="border border-[#E2E8F0] rounded-lg overflow-hidden">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider">
              {activeTab === 'categories' && (
                <>
                  <th className="p-3">Category Code</th>
                  <th className="p-3">Category Name</th>
                  <th className="p-3">Description</th>
                  <th className="p-3 text-right">Actions</th>
                </>
              )}
              {activeTab === 'units' && (
                <>
                  <th className="p-3">Unit Code</th>
                  <th className="p-3">Unit Name</th>
                  <th className="p-3">Symbol</th>
                  <th className="p-3 text-right">Actions</th>
                </>
              )}
              {activeTab === 'warehouses' && (
                <>
                  <th className="p-3">Facility Code</th>
                  <th className="p-3">Warehouse Name</th>
                  <th className="p-3">Address</th>
                  <th className="p-3">Manager</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </>
              )}
              {activeTab === 'locations' && (
                <>
                  <th className="p-3">Location Code</th>
                  <th className="p-3">Warehouse</th>
                  <th className="p-3">Zone</th>
                  <th className="p-3">Aisle</th>
                  <th className="p-3">Bin / Rack</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-right">Actions</th>
                </>
              )}
              {(activeTab === 'suppliers' || activeTab === 'customers') && (
                <>
                  <th className="p-3">Code</th>
                  <th className="p-3">{activeTab === 'suppliers' ? 'Supplier Name' : 'Customer Account'}</th>
                  <th className="p-3">Contact Person</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3 text-right">Actions</th>
                </>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E2E8F0]">
            {loading ? (
              <tr><td colSpan={6} className="p-6 text-center text-[#64748B] font-medium">Loading {activeTab}...</td></tr>
            ) : filteredItems.length === 0 ? (
              <tr><td colSpan={6} className="p-6 text-center text-[#64748B] font-medium">No {activeTab} records registered yet.</td></tr>
            ) : (
              filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-[#F8FAFC]">
                  {activeTab === 'categories' && (
                    <>
                      <td className="p-3 font-mono font-bold text-[#0077C8]">{item.code || item.id}</td>
                      <td className="p-3 font-bold text-[#0F172A]">{item.name}</td>
                      <td className="p-3 text-[#64748B]">{item.description || 'N/A'}</td>
                    </>
                  )}

                  {activeTab === 'units' && (
                    <>
                      <td className="p-3 font-mono font-bold text-[#0077C8]">{item.code || item.id}</td>
                      <td className="p-3 font-bold text-[#0F172A]">{item.name}</td>
                      <td className="p-3 text-[#0F172A] font-mono font-bold">{item.symbol || 'N/A'}</td>
                    </>
                  )}

                  {activeTab === 'warehouses' && (
                    <>
                      <td className="p-3 font-mono font-bold text-[#0077C8]">{item.code || item.id}</td>
                      <td className="p-3 font-bold text-[#0F172A]">{item.name}</td>
                      <td className="p-3 text-[#64748B]">{item.address || 'N/A'}</td>
                      <td className="p-3 font-medium text-[#0F172A]">{item.manager || 'Unassigned'}</td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#16A34A]/10 text-[#16A34A]">ACTIVE</span>
                      </td>
                    </>
                  )}

                  {activeTab === 'locations' && (
                    <>
                      <td className="p-3 font-mono font-bold text-[#0077C8]">{item.code || `LOC-${item.id}`}</td>
                      <td className="p-3 font-semibold text-[#0F172A]">{item.warehouseName || 'Central Hub'}</td>
                      <td className="p-3 text-[#0F172A] font-bold">{item.zone || 'Zone A'}</td>
                      <td className="p-3 text-[#64748B]">{item.aisle || 'Aisle 01'}</td>
                      <td className="p-3 text-[#0F172A] font-mono">{item.bin || item.name || 'Bin 01'}</td>
                      <td className="p-3 text-center">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#16A34A]/10 text-[#16A34A]">{item.status || 'ACTIVE'}</span>
                      </td>
                    </>
                  )}

                  {(activeTab === 'suppliers' || activeTab === 'customers') && (
                    <>
                      <td className="p-3 font-mono font-bold text-[#0077C8]">{item.code || item.id}</td>
                      <td className="p-3 font-bold text-[#0F172A]">{item.name}</td>
                      <td className="p-3 text-[#0F172A] font-medium">{item.contactPerson || 'Main Representative'}</td>
                      <td className="p-3 text-[#64748B] font-mono">{item.email || 'contact@entity.com'}</td>
                      <td className="p-3 text-[#64748B] font-mono">{item.phone || '+1 (555) 019-2831'}</td>
                    </>
                  )}

                  <td className="p-3 text-right">
                    {isAdmin && (
                      <button 
                        onClick={() => handleDelete(item.id)} 
                        title="Delete Record"
                        className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Dynamic Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 max-w-md w-full text-left space-y-4 relative shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F172A]"><X className="w-5 h-5" /></button>
            <h3 className="text-base font-extrabold text-[#0F172A] uppercase flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#0077C8]" /> Add New {activeTab.slice(0, -1)}
            </h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Code / Identifier</label>
                <input 
                  type="text" 
                  placeholder="Auto-generated if left blank" 
                  value={code} 
                  onChange={e => setCode(e.target.value)} 
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono" 
                />
              </div>

              {activeTab === 'categories' && (
                <>
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Category Name</label>
                    <input type="text" required placeholder="e.g. Storage & Racking" value={field1} onChange={e => setField1(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A]" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Description</label>
                    <textarea placeholder="Category description..." value={field2} onChange={e => setField2(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] h-16" />
                  </div>
                </>
              )}

              {activeTab === 'units' && (
                <>
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Unit Name</label>
                    <input type="text" required placeholder="e.g. Kilograms / Pallets / Cartons" value={field1} onChange={e => setField1(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A]" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Symbol</label>
                    <input type="text" required placeholder="e.g. kg, ctn, pal, pcs" value={field2} onChange={e => setField2(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] font-mono" />
                  </div>
                </>
              )}

              {activeTab === 'warehouses' && (
                <>
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Warehouse Name</label>
                    <input type="text" required placeholder="e.g. Central Metro Distribution Hub" value={field1} onChange={e => setField1(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A]" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Facility Address</label>
                    <input type="text" placeholder="Full street address..." value={field2} onChange={e => setField2(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A]" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Warehouse Manager</label>
                    <input type="text" placeholder="Manager Name" value={field3} onChange={e => setField3(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A]" />
                  </div>
                </>
              )}

              {activeTab === 'locations' && (
                <>
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Warehouse Facility</label>
                    <input type="text" placeholder="e.g. Central Metro Distribution Hub" value={field1} onChange={e => setField1(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A]" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Zone</label>
                    <input type="text" placeholder="e.g. Zone A (Cold Storage)" value={field2} onChange={e => setField2(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-[#0F172A] mb-1">Aisle</label>
                      <input type="text" placeholder="Aisle 01" value={field3} onChange={e => setField3(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A]" />
                    </div>
                    <div>
                      <label className="block font-bold text-[#0F172A] mb-1">Bin / Rack</label>
                      <input type="text" placeholder="Bin 04" value={field4} onChange={e => setField4(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A]" />
                    </div>
                  </div>
                </>
              )}

              {(activeTab === 'suppliers' || activeTab === 'customers') && (
                <>
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">{activeTab === 'suppliers' ? 'Supplier Name' : 'Customer Account Name'}</label>
                    <input type="text" required placeholder="Company Name" value={field1} onChange={e => setField1(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A]" />
                  </div>
                  <div>
                    <label className="block font-bold text-[#0F172A] mb-1">Contact Person</label>
                    <input type="text" placeholder="Name" value={field2} onChange={e => setField2(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A]" />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-[#0F172A] mb-1">Email</label>
                      <input type="email" placeholder="email@company.com" value={field3} onChange={e => setField3(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A]" />
                    </div>
                    <div>
                      <label className="block font-bold text-[#0F172A] mb-1">Phone</label>
                      <input type="text" placeholder="+1..." value={field4} onChange={e => setField4(e.target.value)} className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A]" />
                    </div>
                  </div>
                </>
              )}

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded bg-slate-100 font-bold uppercase text-[10px] hover:bg-slate-200">Cancel</button>
                <button type="submit" className="px-5 py-2 rounded bg-[#0077C8] hover:bg-[#0066B0] text-white font-bold uppercase text-[10px] shadow-sm">Save Master Record</button>
              </div>
            </form>
          </div>
        </div>
      )}
        </div>
      )}
    </div>
  );
}
