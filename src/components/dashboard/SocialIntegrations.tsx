"use client";

import { useState } from "react";
import { Check, Plus, HardDrive, Network, Layers } from "lucide-react";

export default function SocialIntegrations() {
  const [integrations, setIntegrations] = useState([
    { id: 1, name: "SAP ERP Connector", icon: HardDrive, connected: true },
    { id: 2, name: "NetSuite Integration", icon: Network, connected: false },
    { id: 3, name: "Oracle Logistics API", icon: Layers, connected: false },
    { id: 4, name: "FedEx / UPS Carrier API", icon: HardDrive, connected: true },
  ]);

  const toggleIntegration = (id: number) => {
    setIntegrations(prev => prev.map(item => 
      item.id === id ? { ...item, connected: !item.connected } : item
    ));
  };

  return (
    <div className="bg-white border border-[#E2E8F0] rounded-xl p-6 shadow-sm text-left">
      <div className="mb-6">
        <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
          Connected Systems & APIs
        </h3>
        <p className="text-xs text-[#64748B] mt-0.5">Integrate warehouse operations with enterprise ERPs.</p>
      </div>

      <div className="space-y-3">
        {integrations.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center justify-between p-3.5 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#0077C8] transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-[#0F172A] text-white flex items-center justify-center">
                <item.icon className="w-4 h-4 text-[#0077C8]" />
              </div>
              <span className="font-bold text-xs text-[#0F172A]">{item.name}</span>
            </div>
            
            <button 
              onClick={() => toggleIntegration(item.id)}
              className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                item.connected ? 'bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30 hover:bg-[#16A34A]/20' : 'bg-white text-[#64748B] border border-[#E2E8F0] hover:text-[#0F172A] hover:border-[#0077C8]'
              }`}
            >
              {item.connected ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
