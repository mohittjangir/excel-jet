"use client";

import { useCallback, useMemo, useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { LayoutDashboard, 
  BrainCircuit, Target, Clock, MessageSquareQuote,
  Palette, BarChart3, Users, Film, Plus, ArrowDownLeft, ArrowUpRight, Search, Filter, Trash2, Edit3, X, CheckCircle2, AlertTriangle, Layers, ShieldAlert, Lock, LogIn, Boxes, ClipboardList, FileText, Shield
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import UploadZone from "@/components/UploadZone";
import StatsOverview from "@/components/dashboard/StatsOverview";
import RecentProjectsList from "@/components/dashboard/RecentProjectsList";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import PerformanceChart from "@/components/dashboard/PerformanceChart";
import SocialIntegrations from "@/components/dashboard/SocialIntegrations";
import TrendingTemplates from "@/components/dashboard/TrendingTemplates";
import ViralHooks from "@/components/dashboard/ViralHooks";
import AIVoiceSettings from "@/components/dashboard/AIVoiceSettings";
import AvatarSelection from "@/components/dashboard/AvatarSelection";
import { useSearchParams } from "next/navigation";

import BrandKitManager from "@/components/dashboard/BrandKitManager";
import CaptionPresets from "@/components/dashboard/CaptionPresets";
import MobilePreviewer from "@/components/dashboard/MobilePreviewer";
import ContentCalendar from "@/components/dashboard/ContentCalendar";
import OmnichannelTool from "@/components/dashboard/OmnichannelTool";
import TeamWorkspace from "@/components/dashboard/TeamWorkspace";
import BRollSuggester from "@/components/dashboard/BRollSuggester";
import MastersModule from "@/components/dashboard/MastersModule";
import InventoryModule from "@/components/dashboard/InventoryModule";
import ReportsModule from "@/components/dashboard/ReportsModule";
import AdministrationModule from "@/components/dashboard/AdministrationModule";
import UserInfo from "@/components/UserInfo";
import WMSLogo from "@/components/WMSLogo";
import { useAuth } from "@/context/AuthContext";

type TabType = 'overview' | 'masters' | 'inventory' | 'reports' | 'admin' | 'production' | 'growth';

function DashboardContent() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'ADMIN';

  const searchParams = useSearchParams();

  const visibleTabs = useMemo(() => {
    return [
      { id: 'overview', label: isAdmin ? 'Executive Overview' : 'Floor Operations', icon: LayoutDashboard },
      { id: 'masters', label: 'WMS Data Masters', icon: Boxes },
      { id: 'inventory', label: 'Inventory & Adjustments', icon: ClipboardList },
      { id: 'reports', label: 'WMS Reports', icon: FileText },
      ...(isAdmin ? [
        { id: 'admin', label: 'System Admin & User Roles', icon: Shield },
        { id: 'growth', label: 'Growth & Analytics', icon: BarChart3 },
        { id: 'production', label: 'Production Schedule', icon: Film },
      ] : [
        { id: 'growth', label: 'Stock Analytics', icon: BarChart3 },
      ])
    ];
  }, [isAdmin]);

  const activeTab = useMemo(() => {
    const tab = searchParams.get('tab');
    if (tab && visibleTabs.some(t => t.id === tab)) return tab as TabType;
    return 'overview';
  }, [searchParams, visibleTabs]);

  const handleTabChange = useCallback((id: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set('tab', id);
    window.history.pushState({}, '', url);
  }, []);

  // Products & Transactions State
  const [products, setProducts] = useState<any[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");

  // Modals & Action States
  const [showAddProductModal, setShowAddProductModal] = useState(false);
  const [showStockInModal, setShowStockInModal] = useState(false);
  const [showStockOutModal, setShowStockOutModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);

  // Form Fields
  const [selectedProductId, setSelectedProductId] = useState("");
  const [actionQuantity, setActionQuantity] = useState(1);
  const [sourceDestination, setSourceDestination] = useState("");
  const [referenceNo, setReferenceNo] = useState("");
  const [actionNotes, setActionNotes] = useState("");
  const [receivingWarehouse, setReceivingWarehouse] = useState("Central Metro Distribution Hub");
  const [receivingLocation, setReceivingLocation] = useState("Zone A - Aisle 01");
  const [unitCost, setUnitCost] = useState<number | "">(0);
  const [availableLocations, setAvailableLocations] = useState<any[]>([]);
  const [availableSuppliers, setAvailableSuppliers] = useState<any[]>([]);
  
  // Product Form Fields
  const [prodName, setProdName] = useState("");
  const [prodSku, setProdSku] = useState("");
  const [prodCategory, setProdCategory] = useState("Storage & Racking");
  const [prodQuantity, setProdQuantity] = useState(10);
  const [prodMinStock, setProdMinStock] = useState(10);
  const [prodPrice, setProdPrice] = useState(100);
  const [prodLocation, setProdLocation] = useState("Zone A - Aisle 01");

  // Status Feedback
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await fetch('/api/wms/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
        if (data.length > 0 && !selectedProductId) {
          setSelectedProductId(data[0].id);
        }
      }
    } catch (e) {
      console.error("Error fetching products", e);
    } finally {
      setLoadingProducts(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetch('/api/wms/masters/locations').then(r => r.ok && r.json()).then(data => data && Array.isArray(data) && setAvailableLocations(data)).catch(() => {});
    fetch('/api/wms/masters/suppliers').then(r => r.ok && r.json()).then(data => data && Array.isArray(data) && setAvailableSuppliers(data)).catch(() => {});
  }, []);

  const handleStockInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || actionQuantity <= 0) return;
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const res = await fetch('/api/wms/stock-in', {
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
          warehouse: receivingWarehouse,
          location: receivingLocation,
          unitPrice: unitCost !== "" ? Number(unitCost) : undefined,
          user: user?.name || "Excel Jet Operator",
        }),
      });

      if (res.ok) {
        setFeedback({ type: 'success', msg: `Successfully received ${actionQuantity} units into inventory!` });
        setShowStockInModal(false);
        setActionQuantity(1);
        setSourceDestination("");
        setReferenceNo("");
        setActionNotes("");
        fetchProducts();
      } else {
        const err = await res.json();
        setFeedback({ type: 'error', msg: err.error || "Stock In failed" });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', msg: err.message || "Network error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStockOutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProductId || actionQuantity <= 0) return;
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
          user: user?.name || "Excel Jet Operator",
        }),
      });

      if (res.ok) {
        setFeedback({ type: 'success', msg: `Successfully dispatched ${actionQuantity} units!` });
        setShowStockOutModal(false);
        setActionQuantity(1);
        setSourceDestination("");
        setReferenceNo("");
        setActionNotes("");
        fetchProducts();
      } else {
        const err = await res.json();
        setFeedback({ type: 'error', msg: err.error || "Stock Out failed" });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', msg: err.message || "Network error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAddOrEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName) return;
    if (!isAdmin) {
      setFeedback({ type: 'error', msg: "Forbidden: Admin access required to add or edit product SKUs." });
      return;
    }
    setIsSubmitting(true);
    setFeedback(null);

    try {
      const method = editingProduct ? 'PUT' : 'POST';
      const bodyPayload = editingProduct
        ? { id: editingProduct.id, name: prodName, sku: prodSku, category: prodCategory, quantity: prodQuantity, minStock: prodMinStock, price: prodPrice, location: prodLocation }
        : { name: prodName, sku: prodSku || `SKU-${Date.now().toString().slice(-6)}`, category: prodCategory, quantity: prodQuantity, minStock: prodMinStock, price: prodPrice, location: prodLocation };

      const res = await fetch('/api/wms/products', {
        method,
        headers: { 
          'Content-Type': 'application/json',
          'x-user-role': user?.role || 'STAFF'
        },
        body: JSON.stringify(bodyPayload),
      });

      if (res.ok) {
        setFeedback({ type: 'success', msg: editingProduct ? "Product updated successfully!" : "New Product added successfully!" });
        setShowAddProductModal(false);
        setEditingProduct(null);
        setProdName("");
        setProdSku("");
        fetchProducts();
      } else {
        const err = await res.json();
        setFeedback({ type: 'error', msg: err.error || "Operation failed" });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', msg: err.message || "Network error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!isAdmin) {
      setFeedback({ type: 'error', msg: "Forbidden: Only Admin personnel are authorized to delete inventory SKUs." });
      return;
    }
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/wms/products?id=${id}`, { 
        method: 'DELETE',
        headers: { 'x-user-role': user?.role || 'STAFF' }
      });
      if (res.ok) {
        setFeedback({ type: 'success', msg: "Product deleted from inventory." });
        fetchProducts();
      } else {
        const err = await res.json();
        setFeedback({ type: 'error', msg: err.error || "Failed to delete product" });
      }
    } catch (e) {
      console.error("Failed to delete product", e);
    }
  };

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div 
            key="overview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-10 text-left"
          >
            {/* Role Header Subtitle Banner */}
            <div className="p-4 rounded-xl bg-white border border-[#E2E8F0] shadow-xs flex items-center justify-between">
              <div>
                <span className={`text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full ${isAdmin ? 'bg-[#0077C8]/10 text-[#0077C8] border border-[#0077C8]/30' : 'bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30'}`}>
                  {isAdmin ? 'ADMIN EXECUTIVE CONTROL CENTER' : 'STAFF FLOOR OPERATIONS HUB'}
                </span>
                <p className="text-xs text-[#64748B] mt-1 font-medium">
                  {isAdmin 
                    ? "Full warehouse oversight, SKU maintenance, inventory adjustments, and operator access controls."
                    : "Task-focused floor interface: receive inbound shipments, process outbound dispatches, and look up stock locations."
                  }
                </p>
              </div>
            </div>

            <StatsOverview />

            {/* User Feedback Alert Banner */}
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

            {/* Quick Action Operations Bar */}
            <div className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-extrabold text-[#0F172A]">
                  {isAdmin ? 'Stock Control & Management' : 'Floor Movements & Operations'}
                </h3>
                <p className="text-xs text-[#64748B] mt-0.5">
                  {isAdmin 
                    ? "Execute Stock In, Stock Out, or register new product SKUs."
                    : "Receive incoming shipments or dispatch stock for customer orders."
                  }
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <button 
                  onClick={() => { setFeedback(null); setShowStockInModal(true); }}
                  className="px-5 py-2.5 rounded-lg bg-[#16A34A] hover:bg-[#12823a] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <ArrowDownLeft className="w-4 h-4" /> Stock In (+)
                </button>

                <button 
                  onClick={() => { setFeedback(null); setShowStockOutModal(true); }}
                  className="px-5 py-2.5 rounded-lg bg-[#0077C8] hover:bg-[#0066B0] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <ArrowUpRight className="w-4 h-4" /> Stock Out (-)
                </button>

                {isAdmin && (
                  <button 
                    onClick={() => { setEditingProduct(null); setProdName(""); setProdSku(""); setShowAddProductModal(true); }}
                    className="px-5 py-2.5 rounded-lg bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 shadow-sm"
                  >
                    <Plus className="w-4 h-4 text-[#0077C8]" /> Add New SKU
                  </button>
                )}
              </div>
            </div>

            {/* Live Inventory Management Table */}
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
              <div className="p-6 border-b border-[#E2E8F0] flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2">
                    <Layers className="w-5 h-5 text-[#0077C8]" /> Live Inventory Ledger
                  </h3>
                  <p className="text-xs text-[#64748B] mt-0.5">All tracked warehouse items, stock levels & status.</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="relative">
                    <Search className="w-4 h-4 text-[#64748B] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input 
                      type="text"
                      placeholder="Search SKU or Name..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                      className="pl-9 pr-3 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-medium text-[#0F172A] focus:outline-none focus:border-[#0077C8] w-48 sm:w-64"
                    />
                  </div>

                  <select 
                    value={categoryFilter} 
                    onChange={e => setCategoryFilter(e.target.value)}
                    className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  >
                    <option value="All">All Categories</option>
                    <option value="Storage & Racking">Storage & Racking</option>
                    <option value="Packaging Materials">Packaging Materials</option>
                    <option value="Hardware & Electronics">Hardware & Electronics</option>
                    <option value="Labeling & Tags">Labeling & Tags</option>
                  </select>

                  <select 
                    value={statusFilter} 
                    onChange={e => setStatusFilter(e.target.value)}
                    className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="In Stock">In Stock</option>
                    <option value="Low Stock">Low Stock</option>
                    <option value="Out of Stock">Out of Stock</option>
                  </select>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-[10px] font-extrabold uppercase text-[#64748B] tracking-wider">
                      <th className="p-4">SKU / Code</th>
                      <th className="p-4">Product Name</th>
                      <th className="p-4">Category</th>
                      <th className="p-4">Location</th>
                      <th className="p-4 text-center">Stock Quantity</th>
                      <th className="p-4 text-center">Min Stock</th>
                      <th className="p-4 text-center">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0] text-xs">
                    {filteredProducts.map((p) => (
                      <tr key={p.id} className="hover:bg-[#F8FAFC] transition-colors">
                        <td className="p-4 font-mono font-bold text-[#0077C8]">{p.sku}</td>
                        <td className="p-4 font-bold text-[#0F172A]">{p.name}</td>
                        <td className="p-4 text-[#64748B] font-semibold">{p.category}</td>
                        <td className="p-4 text-[#64748B]">{p.location}</td>
                        <td className="p-4 text-center font-extrabold text-[#0F172A]">{p.quantity}</td>
                        <td className="p-4 text-center text-[#64748B] font-semibold">{p.minStock}</td>
                        <td className="p-4 whitespace-nowrap text-center">
                          <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider whitespace-nowrap min-w-[85px] ${
                            p.status === 'In Stock' ? 'bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/20' :
                            p.status === 'Low Stock' ? 'bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20' :
                            'bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button 
                              onClick={() => {
                                setSelectedProductId(p.id);
                                setShowStockInModal(true);
                              }}
                              className="p-1.5 rounded bg-[#16A34A]/10 text-[#16A34A] hover:bg-[#16A34A]/20 font-bold text-[10px] uppercase"
                            >
                              + In
                            </button>
                            <button 
                              onClick={() => {
                                setSelectedProductId(p.id);
                                setShowStockOutModal(true);
                              }}
                              className="p-1.5 rounded bg-[#0077C8]/10 text-[#0077C8] hover:bg-[#0077C8]/20 font-bold text-[10px] uppercase"
                            >
                              - Out
                            </button>

                            {isAdmin && (
                              <>
                                <button 
                                  onClick={() => {
                                    setEditingProduct(p);
                                    setProdName(p.name);
                                    setProdSku(p.sku);
                                    setProdCategory(p.category);
                                    setProdQuantity(p.quantity);
                                    setProdMinStock(p.minStock);
                                    setProdPrice(p.price || 0);
                                    setProdLocation(p.location || '');
                                    setShowAddProductModal(true);
                                  }}
                                  title="Edit Product Details (Admin Only)"
                                  className="p-1.5 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[#0F172A] hover:bg-slate-100"
                                >
                                  <Edit3 className="w-3.5 h-3.5" />
                                </button>
                                <button 
                                  onClick={() => handleDeleteProduct(p.id)}
                                  title="Delete Product (Admin Only)"
                                  className="p-1.5 rounded bg-[#DC2626]/10 text-[#DC2626] hover:bg-[#DC2626]/20"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pt-4">
              <div className="xl:col-span-2 space-y-8">
                <div className="text-left bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
                  <h1 className="text-xl font-extrabold text-[#0F172A] mb-1">
                    Document & Manifest Sync
                  </h1>
                  <p className="text-[#64748B] text-xs mb-4">Upload inventory files to trigger automated parsing.</p>
                  <UploadZone />
                </div>
              </div>

              <div className="xl:col-span-1">
                <ActivityFeed />
              </div>
            </div>

            <div className="pt-8 border-t border-[#E2E8F0]">
              <div className="mb-6 text-left">
                <h3 className="text-lg font-extrabold text-[#0F172A] mb-1">Recent Inventory Transactions</h3>
                <p className="text-[#64748B] text-xs">Real-time stock audit movements logged across all warehouse zones.</p>
              </div>
              <RecentProjectsList />
            </div>
          </motion.div>
        );
      case 'masters':
        return (
          <motion.div key="masters" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <MastersModule />
          </motion.div>
        );
      case 'inventory':
        return (
          <motion.div key="inventory" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <InventoryModule />
          </motion.div>
        );
      case 'reports':
        return (
          <motion.div key="reports" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <ReportsModule />
          </motion.div>
        );
      case 'admin':
        if (!isAdmin) {
          return (
            <div key="admin-forbidden" className="bg-white border border-[#E2E8F0] rounded-xl p-8 shadow-sm text-center">
              <ShieldAlert className="w-12 h-12 text-[#F59E0B] mx-auto mb-3" />
              <h3 className="text-lg font-bold text-[#0F172A] mb-1">Admin Access Required</h3>
              <p className="text-xs text-[#64748B]">System administration and audit log views are restricted to Admin personnel.</p>
            </div>
          );
        }
        return (
          <motion.div key="admin" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <AdministrationModule />
          </motion.div>
        );
      case 'growth':
        return (
          <motion.div key="growth" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <PerformanceChart />
            <TrendingTemplates />
          </motion.div>
        );
      case 'production':
        return (
          <motion.div key="production" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-8">
            <ContentCalendar />
            <BRollSuggester />
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <div className="relative flex h-screen bg-[#F8FAFC] text-[#0F172A] font-sans overflow-hidden">
        {/* Sidebar - Excel Jet Deep Dark #0F172A */}
        <aside className="w-64 shrink-0 bg-[#0F172A] border-r border-[#0077C8]/30 flex flex-col p-5 hidden md:flex sticky top-0 h-screen z-50 text-white shadow-lg overflow-hidden">
          <Link href="/" className="flex items-center gap-3 py-2 px-1 mb-8 shrink-0">
            <WMSLogo variant="light" size="md" />
          </Link>

          <nav className="flex-1 space-y-2">
            {visibleTabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button 
                  key={tab.id}
                  onClick={() => handleTabChange(tab.id)}
                  className="w-full text-left"
                >
                  <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all border ${
                    isActive 
                      ? 'bg-[#0077C8] text-white font-bold border-[#0077C8] shadow-sm' 
                      : 'text-slate-200 border-transparent hover:bg-slate-800/80 hover:text-white'
                  }`}>
                    <tab.icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-300'}`} /> 
                    <span className="text-xs font-semibold uppercase tracking-wider">{tab.label}</span>
                  </div>
                </button>
              );
            })}
          </nav>

          <div className="mt-auto pt-4 border-t border-[#0077C8]/30">
            <UserInfo layout="sidebar" />
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto bg-[#F8FAFC]">
          <header className="p-4 md:px-8 border-b border-[#E2E8F0] flex flex-wrap items-center justify-between bg-white sticky top-0 z-40 shadow-xs gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-sm md:text-lg font-extrabold text-[#0F172A] uppercase tracking-wide">
                {visibleTabs.find(t => t.id === activeTab)?.label || 'Dashboard'}
              </h2>
            </div>

            {/* Mobile Tab Selector */}
            <div className="md:hidden flex items-center gap-2">
              <select 
                value={activeTab}
                onChange={e => handleTabChange(e.target.value)}
                className="p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
              >
                {visibleTabs.map(tab => (
                  <option key={tab.id} value={tab.id}>{tab.label}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-4">
              <UserInfo />
            </div>
          </header>

          <div className="p-6 md:p-8 mx-auto w-full max-w-7xl flex-1">
            <AnimatePresence mode="wait">
              {renderTabContent()}
            </AnimatePresence>

            <div className="mt-16 pt-6 border-t border-[#E2E8F0] text-center">
              <p className="text-[#64748B] text-xs font-semibold">Excel Jet Warehouse Management System &copy; 2026. All rights reserved.</p>
            </div>
          </div>
        </main>
      </div>

      {/* Stock In Modal */}
      {showStockInModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-md w-full p-6 text-left relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowStockInModal(false)} className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F172A]">
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded bg-[#16A34A]/10 text-[#16A34A]">
                <ArrowDownLeft className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#0F172A]">Stock In (Receive Goods)</h3>
            </div>

            <form onSubmit={handleStockInSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Select Product</label>
                <select 
                  value={selectedProductId}
                  onChange={e => setSelectedProductId(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                >
                  {products.map((p, idx) => (
                    <option key={p.id || `in-prod-${idx}`} value={p.id}>{p.name} ({p.sku}) — Current: {p.quantity}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Quantity Received (+)</label>
                  <input 
                    type="number"
                    min="1"
                    value={actionQuantity}
                    onChange={e => setActionQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    required
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Unit Cost ($)</label>
                  <input 
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="e.g. 45.00"
                    value={unitCost}
                    onChange={e => setUnitCost(e.target.value === "" ? "" : parseFloat(e.target.value))}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Destination Warehouse</label>
                  <select
                    value={receivingWarehouse}
                    onChange={e => setReceivingWarehouse(e.target.value)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  >
                    <option value="Central Metro Distribution Hub">Central Metro Hub</option>
                    <option value="North Regional Logistics Facility">North Regional Hub</option>
                    <option value="East Sorting Center">East Sorting Center</option>
                    <option value="West Logistics Depot">West Logistics Depot</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Bin / Shelf Location</label>
                  <select
                    value={receivingLocation}
                    onChange={e => setReceivingLocation(e.target.value)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  >
                    <option value="Zone A - Aisle 01">Zone A - Aisle 01</option>
                    <option value="Zone B - Aisle 04">Zone B - Aisle 04</option>
                    <option value="Zone C - Cabinet 01">Zone C - Cabinet 01</option>
                    <option value="Zone D - Shelf 08">Zone D - Shelf 08</option>
                    <option value="Zone E - Bulk Receiving">Zone E - Bulk Receiving</option>
                    {availableLocations.map((loc: any) => {
                      const label = `${loc.zone || ''} ${loc.aisle ? `- ${loc.aisle}` : ''} ${loc.bin ? `(${loc.bin})` : ''}`.trim();
                      return <option key={loc.id} value={label}>{label}</option>;
                    })}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Supplier / Source</label>
                <select
                  value={sourceDestination}
                  onChange={e => setSourceDestination(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                >
                  <option value="">-- Select Supplier Source --</option>
                  <option value="Apex Industrial Supplies">Apex Industrial Supplies</option>
                  <option value="Global Packaging Co">Global Packaging Co</option>
                  <option value="TechHardware Logistics">TechHardware Logistics</option>
                  <option value="Fastener King Inc">Fastener King Inc</option>
                  {availableSuppliers.map((s: any) => (
                    <option key={s.id} value={s.name}>{s.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Reference PO / Invoice #</label>
                <input 
                  type="text"
                  placeholder="e.g. PO-88492"
                  value={referenceNo}
                  onChange={e => setReferenceNo(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Notes / Inspection Status</label>
                <textarea 
                  placeholder="Inbound inspection passed..."
                  value={actionNotes}
                  onChange={e => setActionNotes(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8] h-16"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowStockInModal(false)}
                  className="px-4 py-2 rounded bg-slate-100 text-[#0F172A] font-bold uppercase text-[10px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded bg-[#16A34A] hover:bg-[#12823a] text-white font-bold uppercase text-[10px] shadow-sm"
                >
                  {isSubmitting ? 'Receiving...' : 'Confirm Stock In'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stock Out Modal */}
      {showStockOutModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-md w-full p-6 text-left relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowStockOutModal(false)} className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F172A]">
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded bg-[#0077C8]/10 text-[#0077C8]">
                <ArrowUpRight className="w-5 h-5" />
              </div>
              <h3 className="text-base font-extrabold text-[#0F172A]">Stock Out (Dispatch Goods)</h3>
            </div>

            <form onSubmit={handleStockOutSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Select Product</label>
                <select 
                  value={selectedProductId}
                  onChange={e => setSelectedProductId(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                >
                  {products.map(p => (
                    <option key={p.id} value={p.id}>{p.name} ({p.sku}) — Available: {p.quantity}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Quantity Dispatched (-)</label>
                <input 
                  type="number"
                  min="1"
                  value={actionQuantity}
                  onChange={e => setActionQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  required
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                />
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
                <label className="block font-bold text-[#0F172A] mb-1">Notes</label>
                <textarea 
                  placeholder="Outbound dispatch verified..."
                  value={actionNotes}
                  onChange={e => setActionNotes(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8] h-16"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowStockOutModal(false)}
                  className="px-4 py-2 rounded bg-slate-100 text-[#0F172A] font-bold uppercase text-[10px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded bg-[#0077C8] hover:bg-[#0066B0] text-white font-bold uppercase text-[10px] shadow-sm"
                >
                  {isSubmitting ? 'Dispatching...' : 'Confirm Stock Out'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add / Edit SKU Modal (Admin Only) */}
      {showAddProductModal && isAdmin && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-2xl max-w-lg w-full p-6 text-left relative max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowAddProductModal(false)} className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F172A]">
              <X className="w-5 h-5" />
            </button>
            
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 rounded bg-[#0F172A] text-white">
                <Plus className="w-5 h-5 text-[#0077C8]" />
              </div>
              <h3 className="text-base font-extrabold text-[#0F172A]">
                {editingProduct ? 'Edit Product SKU' : 'Register New Inventory SKU'}
              </h3>
            </div>

            <form onSubmit={handleAddOrEditProduct} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Product Name</label>
                  <input 
                    type="text"
                    required
                    placeholder="Industrial Heavy Pallet"
                    value={prodName}
                    onChange={e => setProdName(e.target.value)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">SKU Code</label>
                  <input 
                    type="text"
                    placeholder="Auto-generated if empty"
                    value={prodSku}
                    onChange={e => setProdSku(e.target.value)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-mono text-[#0077C8] focus:outline-none focus:border-[#0077C8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Category</label>
                  <select 
                    value={prodCategory}
                    onChange={e => setProdCategory(e.target.value)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  >
                    <option value="Storage & Racking">Storage & Racking</option>
                    <option value="Packaging Materials">Packaging Materials</option>
                    <option value="Hardware & Electronics">Hardware & Electronics</option>
                    <option value="Labeling & Tags">Labeling & Tags</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Warehouse Location</label>
                  <input 
                    type="text"
                    placeholder="Zone A - Aisle 01"
                    value={prodLocation}
                    onChange={e => setProdLocation(e.target.value)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Initial Qty</label>
                  <input 
                    type="number"
                    min="0"
                    value={prodQuantity}
                    onChange={e => setProdQuantity(parseInt(e.target.value) || 0)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Min Alert Stock</label>
                  <input 
                    type="number"
                    min="1"
                    value={prodMinStock}
                    onChange={e => setProdMinStock(parseInt(e.target.value) || 10)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#0F172A] mb-1">Unit Price ($)</label>
                  <input 
                    type="number"
                    min="0"
                    value={prodPrice}
                    onChange={e => setProdPrice(parseFloat(e.target.value) || 0)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setShowAddProductModal(false)}
                  className="px-4 py-2 rounded bg-slate-100 text-[#0F172A] font-bold uppercase text-[10px]"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white font-bold uppercase text-[10px] shadow-sm"
                >
                  {isSubmitting ? 'Saving...' : editingProduct ? 'Update Product' : 'Save Product SKU'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

function DashboardGuard() {
  const { user, openLoginModal } = useAuth();

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex flex-col items-center justify-center p-6 text-center">
        <div className="bg-white border border-[#E2E8F0] shadow-xl rounded-2xl p-10 max-w-md w-full space-y-6">
          <div className="w-16 h-16 bg-[#0077C8]/10 text-[#0077C8] rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8 text-[#0077C8]" />
          </div>
          <div>
            <h2 className="text-2xl font-extrabold text-[#0F172A] tracking-tight">Access Restricted</h2>
            <p className="text-xs text-[#64748B] mt-2 leading-relaxed">
              You are currently signed out. Please sign in to access the Excel Jet Warehouse Management System.
            </p>
          </div>
          <div className="space-y-3 pt-2">
            <button
              onClick={openLoginModal}
              className="w-full py-3.5 bg-[#0077C8] hover:bg-[#0066B0] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Sign In to WMS Portal
            </button>
            <Link href="/" className="block">
              <button className="w-full py-3 bg-[#F8FAFC] hover:bg-slate-100 border border-[#E2E8F0] text-[#0F172A] font-bold text-xs uppercase tracking-wider rounded-xl transition-all">
                Return to Landing Page
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <DashboardContent />;
}

export default function Dashboard() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-bold text-xs uppercase tracking-wider text-[#0077C8]">
        Loading Excel Jet WMS...
      </div>
    }>
      <DashboardGuard />
    </Suspense>
  );
}
