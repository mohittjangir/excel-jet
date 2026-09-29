"use client";

import { useState } from "react";
import { Palette, Plus, Trash2, Image as ImageIcon, Check } from "lucide-react";

export default function BrandKitManager() {
  const [colors, setColors] = useState(['bg-[#0F172A]', 'bg-[#0077C8]', 'bg-[#00A3E0]', 'bg-[#16A34A]', 'bg-[#F59E0B]']);
  const [activeColorIndex, setActiveColorIndex] = useState(1);
  const [presets, setPresets] = useState([
    { id: 1, name: "Geist Sans / Code 128" },
    { id: 2, name: "Mono Dense / QR Matrix" }
  ]);
  const [newPresetName, setNewPresetName] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [logoUploaded, setLogoUploaded] = useState(false);

  const handleAddPreset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPresetName) return;
    setPresets(prev => [...prev, { id: Date.now(), name: newPresetName }]);
    setNewPresetName("");
    setShowAddForm(false);
  };

  const handleRemovePreset = (id: number) => {
    setPresets(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 h-full shadow-sm text-left">
      <div className="mb-6 text-left">
        <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
          Warehouse Brand & Label Kit <Palette className="w-5 h-5 text-[#0077C8]" />
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5">Custom barcode labels, packing slips & tag branding.</p>
      </div>

      <div className="space-y-6">
        {/* Colors */}
        <div className="text-left">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-3 block">Theme Palette</label>
          <div className="flex flex-wrap gap-2.5">
            {colors.map((color, i) => (
              <div 
                key={i} 
                onClick={() => setActiveColorIndex(i)}
                className={`w-9 h-9 rounded-lg ${color} border border-[#CBD5E1] cursor-pointer shadow-xs flex items-center justify-center transition-transform hover:scale-105`}
              >
                {activeColorIndex === i && <Check className="w-4 h-4 text-white" />}
              </div>
            ))}
          </div>
        </div>

        {/* Fonts / Presets */}
        <div className="text-left">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-3 block">Barcode Font / Standard Presets</label>
          <div className="space-y-2">
            {presets.map((p) => (
              <div key={p.id} className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between">
                <span className="text-xs font-bold text-[#0F172A]">{p.name}</span>
                <button 
                  onClick={() => handleRemovePreset(p.id)}
                  className="text-[#64748B] hover:text-red-500 transition-colors p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {showAddForm ? (
              <form onSubmit={handleAddPreset} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Preset format name..."
                  value={newPresetName}
                  onChange={e => setNewPresetName(e.target.value)}
                  className="flex-1 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg text-xs focus:outline-none focus:border-[#0077C8]"
                />
                <button type="submit" className="px-3 py-2 bg-[#0077C8] text-white text-xs font-bold rounded-lg">Save</button>
              </form>
            ) : (
              <button 
                onClick={() => setShowAddForm(true)}
                className="w-full py-2.5 rounded-lg border border-dashed border-[#E2E8F0] text-xs font-bold text-[#0077C8] hover:bg-[#F8FAFC] flex items-center justify-center gap-1.5 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" /> Add Label Preset
              </button>
            )}
          </div>
        </div>

        {/* Logos */}
        <div className="text-left">
          <label className="text-[10px] font-bold uppercase tracking-wider text-[#64748B] mb-3 block">Facility Logo / Watermark</label>
          <div 
            onClick={() => setLogoUploaded(!logoUploaded)}
            className={`aspect-video rounded-lg border border-dashed transition-all cursor-pointer flex flex-col items-center justify-center p-4 ${
              logoUploaded ? 'bg-[#16A34A]/5 border-[#16A34A]' : 'bg-[#F8FAFC] border-[#CBD5E1] hover:border-[#0077C8]'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-2 shadow-xs ${logoUploaded ? 'bg-[#16A34A] text-white' : 'bg-white border border-[#E2E8F0] text-[#0F172A]'}`}>
              {logoUploaded ? <Check className="w-5 h-5 text-white" /> : <ImageIcon className="w-5 h-5" />}
            </div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F172A]">
              {logoUploaded ? 'Excel Jet Logo Uploaded ✓ (Click to replace)' : 'Upload PNG / SVG Logo'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
