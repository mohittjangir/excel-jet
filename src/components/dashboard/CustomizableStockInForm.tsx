"use client";

import { useEffect, useState, useRef } from "react";
import { ArrowDownLeft, GripVertical, Eye, EyeOff, ArrowUp, ArrowDown, RotateCcw, CheckCircle2, AlertTriangle, X, Plus, Trash2, Sliders, Type, Hash, AlignLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export interface FieldConfig {
  id: string;
  label: string;
  required: boolean;
  visible: boolean;
  type: 'productSelect' | 'number' | 'warehouseSelect' | 'locationSelect' | 'supplierSelect' | 'text' | 'textarea';
  placeholder?: string;
  isCustom?: boolean;
}

const DEFAULT_FIELDS: FieldConfig[] = [
  { id: 'productId', label: 'Select Product', required: true, visible: true, type: 'productSelect' },
  { id: 'quantity', label: 'Quantity Received (+)', required: true, visible: true, type: 'number', placeholder: '1' },
  { id: 'unitCost', label: 'Unit Cost ($)', required: false, visible: true, type: 'number', placeholder: 'e.g. 45.00' },
  { id: 'warehouse', label: 'Destination Warehouse', required: false, visible: true, type: 'warehouseSelect' },
  { id: 'location', label: 'Bin / Shelf Location', required: false, visible: true, type: 'locationSelect' },
  { id: 'supplier', label: 'Supplier / Source', required: false, visible: true, type: 'supplierSelect' },
  { id: 'referenceNo', label: 'Reference PO / Invoice #', required: false, visible: true, type: 'text', placeholder: 'e.g. PO-88492' },
  { id: 'notes', label: 'Notes / Inspection Status', required: false, visible: true, type: 'textarea', placeholder: 'Inbound inspection passed...' },
];

const STORAGE_KEY = 'excel_jet_wms_stock_in_layout_v2';

export default function CustomizableStockInForm({ onStockInSuccess }: { onStockInSuccess?: () => void }) {
  const { user } = useAuth();
  
  // Layout & Form Fields State
  const [fields, setFields] = useState<FieldConfig[]>(DEFAULT_FIELDS);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [showAddCustomModal, setShowAddCustomModal] = useState(false);

  // New Custom Field Modal Form
  const [newFieldLabel, setNewFieldLabel] = useState("");
  const [newFieldType, setNewFieldType] = useState<'text' | 'number' | 'textarea'>("text");
  const [newFieldPlaceholder, setNewFieldPlaceholder] = useState("");
  
  // Master Data Options State
  const [products, setProducts] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [suppliers, setSuppliers] = useState<any[]>([]);
  
  // Form Values State
  const [formData, setFormData] = useState<Record<string, any>>({
    productId: '',
    quantity: 1,
    unitCost: '',
    warehouse: 'Central Metro Distribution Hub',
    location: 'Zone A - Aisle 01',
    supplier: '',
    referenceNo: '',
    notes: '',
  });

  // Drag State
  const dragItem = useRef<number | null>(null);
  const dragOverItem = useRef<number | null>(null);

  // Status & Feedback State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  // Load Saved Field Preferences
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: FieldConfig[] = JSON.parse(saved);
        // Merge with DEFAULT_FIELDS to safeguard required fields
        const merged = parsed.map(f => {
          const def = DEFAULT_FIELDS.find(d => d.id === f.id);
          return def ? { ...def, visible: def.required ? true : f.visible } : f;
        });
        // Add any custom or missing fields
        DEFAULT_FIELDS.forEach(def => {
          if (!merged.some(m => m.id === def.id)) merged.push(def);
        });
        setFields(merged);
      }
    } catch (e) {
      console.error("Failed to load Stock In layout settings", e);
    }
  }, []);

  // Fetch Master Data Options
  useEffect(() => {
    fetch('/api/wms/products')
      .then(r => r.ok && r.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
          setFormData(prev => ({ ...prev, productId: prev.productId || data[0].id }));
        }
      })
      .catch(() => {});

    fetch('/api/wms/masters/locations')
      .then(r => r.ok && r.json())
      .then(data => Array.isArray(data) && setLocations(data))
      .catch(() => {});

    fetch('/api/wms/masters/suppliers')
      .then(r => r.ok && r.json())
      .then(data => Array.isArray(data) && setSuppliers(data))
      .catch(() => {});
  }, []);

  // Save Preferences to LocalStorage
  const saveLayoutPreferences = (newFields: FieldConfig[]) => {
    setFields(newFields);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newFields));
    } catch (e) {
      console.error("Failed to save Stock In layout", e);
    }
  };

  // Drag & Drop Handlers
  const handleDragStart = (index: number) => {
    dragItem.current = index;
  };

  const handleDragEnter = (index: number) => {
    dragOverItem.current = index;
  };

  const handleDragEnd = () => {
    if (dragItem.current !== null && dragOverItem.current !== null && dragItem.current !== dragOverItem.current) {
      const copy = [...fields];
      const draggedObj = copy[dragItem.current];
      copy.splice(dragItem.current, 1);
      copy.splice(dragOverItem.current, 0, draggedObj);
      saveLayoutPreferences(copy);
    }
    dragItem.current = null;
    dragOverItem.current = null;
  };

  // Keyboard Accessible Reordering
  const moveField = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= fields.length) return;
    const copy = [...fields];
    const temp = copy[index];
    copy[index] = copy[targetIndex];
    copy[targetIndex] = temp;
    saveLayoutPreferences(copy);
  };

  // Toggle Visibility for Optional Fields
  const toggleVisibility = (id: string) => {
    const copy = fields.map(f => {
      if (f.id === id) {
        if (f.required) return f;
        return { ...f, visible: !f.visible };
      }
      return f;
    });
    saveLayoutPreferences(copy);
  };

  // Add Custom Field Handler
  const handleAddCustomField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldLabel.trim()) return;

    const customId = `custom_${Date.now()}_${newFieldLabel.toLowerCase().replace(/[^a-z0-9]/g, '_')}`;
    const newField: FieldConfig = {
      id: customId,
      label: newFieldLabel.trim(),
      required: false,
      visible: true,
      type: newFieldType,
      placeholder: newFieldPlaceholder.trim() || `Enter ${newFieldLabel.trim()}`,
      isCustom: true,
    };

    const updated = [...fields, newField];
    saveLayoutPreferences(updated);
    setShowAddCustomModal(false);
    setNewFieldLabel("");
    setNewFieldPlaceholder("");
    setNewFieldType("text");
    setFeedback({ type: 'success', msg: `Custom field "${newField.label}" added to Stock In form!` });
  };

  // Remove / Delete Custom Field Handler
  const handleRemoveField = (id: string) => {
    const fieldToRemove = fields.find(f => f.id === id);
    if (!fieldToRemove) return;
    if (fieldToRemove.required) {
      setFeedback({ type: 'error', msg: "Cannot remove required system fields." });
      return;
    }
    const updated = fields.filter(f => f.id !== id);
    saveLayoutPreferences(updated);
    setFeedback({ type: 'success', msg: `Field "${fieldToRemove.label}" removed from Stock In form.` });
  };

  // Reset to Default Form Layout
  const resetLayout = () => {
    saveLayoutPreferences(DEFAULT_FIELDS);
    setFeedback({ type: 'success', msg: "Stock In layout restored to default configuration." });
  };

  // Handle Input Change
  const handleChange = (fieldId: string, value: any) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  // Submit Stock In Operation
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.productId || Number(formData.quantity) <= 0) {
      setFeedback({ type: 'error', msg: "Please select a product and enter a valid quantity (> 0)." });
      return;
    }

    setIsSubmitting(true);
    setFeedback(null);

    // Aggregate Custom Field Values into Transaction Notes
    const customSummary = fields
      .filter(f => f.isCustom && f.visible && formData[f.id])
      .map(f => `${f.label}: ${formData[f.id]}`)
      .join(' | ');

    const combinedNotes = [formData.notes, customSummary].filter(Boolean).join(' | ');

    try {
      const res = await fetch('/api/wms/stock-in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': user?.role || 'STAFF',
          'x-user-name': user?.name || 'Operator'
        },
        body: JSON.stringify({
          productId: formData.productId,
          quantity: Number(formData.quantity),
          sourceDestination: formData.supplier,
          referenceNo: formData.referenceNo,
          notes: combinedNotes,
          warehouse: formData.warehouse,
          location: formData.location,
          unitPrice: formData.unitCost !== '' ? Number(formData.unitCost) : undefined,
          user: user?.name || 'Excel Jet Operator'
        }),
      });

      if (res.ok) {
        setFeedback({ type: 'success', msg: `Successfully received ${formData.quantity} units into inventory!` });
        setFormData(prev => ({ ...prev, quantity: 1, referenceNo: '', notes: '' }));
        if (onStockInSuccess) onStockInSuccess();
      } else {
        const err = await res.json();
        setFeedback({ type: 'error', msg: err.error || "Stock In processing failed" });
      }
    } catch (e: any) {
      setFeedback({ type: 'error', msg: e.message || "Network error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-left space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E8F0]">
        <div>
          <h3 className="text-lg font-extrabold text-[#0F172A] flex items-center gap-2">
            <ArrowDownLeft className="w-5 h-5 text-[#16A34A]" /> Customizable Stock In Form
          </h3>
          <p className="text-xs text-[#64748B] mt-0.5">
            Arrange, add custom fields, or toggle optional fields for your inbound receiving workflow.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {isCustomizing && (
            <button
              type="button"
              onClick={() => setShowAddCustomModal(true)}
              className="px-3.5 py-2 bg-[#16A34A] hover:bg-[#12823a] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Custom Field
            </button>
          )}

          <button
            type="button"
            onClick={() => setIsCustomizing(!isCustomizing)}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border ${
              isCustomizing
                ? 'bg-[#0077C8] text-white border-[#0077C8] shadow-xs'
                : 'bg-[#F8FAFC] text-[#0F172A] border-[#E2E8F0] hover:bg-slate-100'
            }`}
          >
            <GripVertical className="w-4 h-4" /> {isCustomizing ? 'Done Customizing' : 'Customize Form Layout'}
          </button>

          {isCustomizing && (
            <button
              type="button"
              onClick={resetLayout}
              title="Reset layout to default order"
              className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-[#0F172A] rounded-lg text-xs font-bold transition-all flex items-center gap-1"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reset
            </button>
          )}
        </div>
      </div>

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

      {/* Layout Customization Drawer / Manager */}
      {isCustomizing && (
        <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#0077C8]/30 space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <span className="text-xs font-extrabold text-[#0077C8] uppercase tracking-wider flex items-center gap-1.5">
              <Sliders className="w-4 h-4" /> Form Layout & Custom Field Manager
            </span>
            <span className="text-[11px] text-[#64748B]">Drag rows • Use Eye to show/hide • Trash to remove custom fields</span>
          </div>

          <div className="space-y-2">
            {fields.map((field, idx) => (
              <div
                key={field.id}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragEnter={() => handleDragEnter(idx)}
                onDragEnd={handleDragEnd}
                onDragOver={(e) => e.preventDefault()}
                className={`p-3 rounded-lg border bg-white flex items-center justify-between transition-all shadow-xs cursor-move select-none ${
                  !field.visible ? 'opacity-50 bg-slate-50' : 'hover:border-[#0077C8]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="w-4 h-4 text-[#64748B] shrink-0" />
                  <span className="text-xs font-bold text-[#0F172A]">{field.label}</span>
                  {field.required ? (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#0077C8]/10 text-[#0077C8]">
                      Required
                    </span>
                  ) : field.isCustom ? (
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-[#16A34A]/10 text-[#16A34A]">
                      Custom Field
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-[#64748B]">Optional</span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {/* Keyboard Reordering Buttons */}
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={() => moveField(idx, 'up')}
                    title="Move Field Up"
                    className="p-1 rounded hover:bg-slate-100 text-[#64748B] disabled:opacity-30"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    disabled={idx === fields.length - 1}
                    onClick={() => moveField(idx, 'down')}
                    title="Move Field Down"
                    className="p-1 rounded hover:bg-slate-100 text-[#64748B] disabled:opacity-30"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>

                  {/* Toggle Visibility */}
                  {!field.required && (
                    <button
                      type="button"
                      onClick={() => toggleVisibility(field.id)}
                      title={field.visible ? 'Hide Field' : 'Show Field'}
                      className={`p-1.5 rounded transition-all ml-1 ${
                        field.visible ? 'bg-[#16A34A]/10 text-[#16A34A]' : 'bg-slate-100 text-slate-400'
                      }`}
                    >
                      {field.visible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                  )}

                  {/* Remove / Delete Field */}
                  {!field.required && (
                    <button
                      type="button"
                      onClick={() => handleRemoveField(field.id)}
                      title="Remove Field"
                      className="p-1.5 rounded bg-red-50 text-red-600 hover:bg-red-100 transition-all ml-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setShowAddCustomModal(true)}
              className="px-3.5 py-2 bg-[#16A34A] hover:bg-[#12823a] text-white rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 shadow-xs"
            >
              <Plus className="w-4 h-4" /> Add Custom Field to Form
            </button>
          </div>
        </div>
      )}

      {/* Dynamic Stock In Form */}
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {fields
          .filter(f => f.visible)
          .map(field => {
            if (field.type === 'productSelect') {
              return (
                <div key={field.id}>
                  <label className="block font-bold text-[#0F172A] mb-1">
                    {field.label} <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.productId}
                    onChange={e => handleChange('productId', e.target.value)}
                    required
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name} ({p.sku}) — Current Stock: {p.quantity}</option>
                    ))}
                  </select>
                </div>
              );
            }

            if (field.type === 'number') {
              return (
                <div key={field.id}>
                  <label className="block font-bold text-[#0F172A] mb-1">
                    {field.label} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  <input
                    type="number"
                    min={field.id === 'quantity' ? '1' : '0'}
                    step={field.id === 'unitCost' ? '0.01' : '1'}
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={e => handleChange(field.id, e.target.value)}
                    required={field.required}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  />
                </div>
              );
            }

            if (field.type === 'warehouseSelect') {
              return (
                <div key={field.id}>
                  <label className="block font-bold text-[#0F172A] mb-1">{field.label}</label>
                  <select
                    value={formData.warehouse}
                    onChange={e => handleChange('warehouse', e.target.value)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  >
                    <option value="Central Metro Distribution Hub">Central Metro Hub</option>
                    <option value="North Regional Logistics Facility">North Regional Hub</option>
                    <option value="East Sorting Center">East Sorting Center</option>
                    <option value="West Logistics Depot">West Logistics Depot</option>
                  </select>
                </div>
              );
            }

            if (field.type === 'locationSelect') {
              return (
                <div key={field.id}>
                  <label className="block font-bold text-[#0F172A] mb-1">{field.label}</label>
                  <select
                    value={formData.location}
                    onChange={e => handleChange('location', e.target.value)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  >
                    <option value="Zone A - Aisle 01">Zone A - Aisle 01</option>
                    <option value="Zone B - Aisle 04">Zone B - Aisle 04</option>
                    <option value="Zone C - Cabinet 01">Zone C - Cabinet 01</option>
                    <option value="Zone D - Shelf 08">Zone D - Shelf 08</option>
                    <option value="Zone E - Bulk Receiving">Zone E - Bulk Receiving</option>
                    {locations.map(loc => {
                      const label = `${loc.zone || ''} ${loc.aisle ? `- ${loc.aisle}` : ''} ${loc.bin ? `(${loc.bin})` : ''}`.trim();
                      return <option key={loc.id} value={label}>{label}</option>;
                    })}
                  </select>
                </div>
              );
            }

            if (field.type === 'supplierSelect') {
              return (
                <div key={field.id}>
                  <label className="block font-bold text-[#0F172A] mb-1">{field.label}</label>
                  <select
                    value={formData.supplier}
                    onChange={e => handleChange('supplier', e.target.value)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg font-bold text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                  >
                    <option value="">-- Select Supplier Source --</option>
                    <option value="Apex Industrial Supplies">Apex Industrial Supplies</option>
                    <option value="Global Packaging Co">Global Packaging Co</option>
                    <option value="TechHardware Logistics">TechHardware Logistics</option>
                    <option value="Fastener King Inc">Fastener King Inc</option>
                    {suppliers.map(s => (
                      <option key={s.id} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>
              );
            }

            if (field.type === 'textarea') {
              return (
                <div key={field.id}>
                  <label className="block font-bold text-[#0F172A] mb-1">{field.label}</label>
                  <textarea
                    placeholder={field.placeholder}
                    value={formData[field.id] || ''}
                    onChange={e => handleChange(field.id, e.target.value)}
                    className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8] h-20"
                  />
                </div>
              );
            }

            return (
              <div key={field.id}>
                <label className="block font-bold text-[#0F172A] mb-1">{field.label}</label>
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={formData[field.id] || ''}
                  onChange={e => handleChange(field.id, e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                />
              </div>
            );
          })}

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 rounded-lg bg-[#16A34A] hover:bg-[#12823a] text-white font-bold uppercase tracking-wider text-xs shadow-md transition-all flex items-center gap-2"
          >
            <ArrowDownLeft className="w-4 h-4" /> {isSubmitting ? 'Receiving Stock...' : 'Confirm Stock In'}
          </button>
        </div>
      </form>

      {/* Add Custom Field Modal */}
      {showAddCustomModal && (
        <div className="fixed inset-0 z-50 bg-[#0F172A]/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl border border-[#E2E8F0] p-6 max-w-md w-full text-left space-y-4 relative shadow-2xl">
            <button onClick={() => setShowAddCustomModal(false)} className="absolute top-4 right-4 text-[#64748B] hover:text-[#0F172A]">
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-base font-extrabold text-[#0F172A] uppercase flex items-center gap-2">
              <Plus className="w-4 h-4 text-[#16A34A]" /> Create Custom Field for Stock In
            </h3>

            <form onSubmit={handleAddCustomField} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Field Label / Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Driver Name, Gate Pass #, Temp (°C)"
                  value={newFieldLabel}
                  onChange={e => setNewFieldLabel(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Field Input Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setNewFieldType('text')}
                    className={`p-2.5 rounded-lg border font-bold text-center flex flex-col items-center gap-1 ${
                      newFieldType === 'text' ? 'bg-[#0077C8] text-white border-[#0077C8]' : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]'
                    }`}
                  >
                    <Type className="w-4 h-4" /> Text Input
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewFieldType('number')}
                    className={`p-2.5 rounded-lg border font-bold text-center flex flex-col items-center gap-1 ${
                      newFieldType === 'number' ? 'bg-[#0077C8] text-white border-[#0077C8]' : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]'
                    }`}
                  >
                    <Hash className="w-4 h-4" /> Number
                  </button>
                  <button
                    type="button"
                    onClick={() => setNewFieldType('textarea')}
                    className={`p-2.5 rounded-lg border font-bold text-center flex flex-col items-center gap-1 ${
                      newFieldType === 'textarea' ? 'bg-[#0077C8] text-white border-[#0077C8]' : 'bg-[#F8FAFC] text-[#64748B] border-[#E2E8F0]'
                    }`}
                  >
                    <AlignLeft className="w-4 h-4" /> Multi-Line Text
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0F172A] mb-1">Placeholder Text (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Enter details..."
                  value={newFieldPlaceholder}
                  onChange={e => setNewFieldPlaceholder(e.target.value)}
                  className="w-full p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-[#0F172A] focus:outline-none focus:border-[#0077C8]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddCustomModal(false)}
                  className="px-4 py-2 rounded bg-slate-100 font-bold uppercase text-[10px] hover:bg-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded bg-[#16A34A] hover:bg-[#12823a] text-white font-bold uppercase text-[10px] shadow-sm"
                >
                  Add Custom Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
