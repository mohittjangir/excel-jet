"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Check, ShieldCheck } from "lucide-react";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const toggleBilling = useCallback(() => {
    setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly');
  }, []);

  const plans = useMemo(() => [
    {
      name: "Facility Standard",
      price: billingCycle === 'monthly' ? "149" : "119",
      desc: "Ideal for single facility warehouses scaling inventory.",
      features: ["Up to 10,000 active SKUs", "Inbound receiving & putaway", "Standard barcode scanning", "Basic stock analytics", "Email support"],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Enterprise Excel Jet",
      price: billingCycle === 'monthly' ? "499" : "399",
      desc: "For multi-warehouse operations requiring full automation.",
      features: ["Unlimited SKUs & Facilities", "Multi-bin location mapping", "Real-time carrier dispatch API", "Custom role permissions", "Dedicated WMS Specialist"],
      cta: "Launch Enterprise",
      popular: true
    },
    {
      name: "Custom Logistics",
      price: billingCycle === 'monthly' ? "Custom" : "Custom",
      desc: "Dedicated infrastructure & tailored ERP integrations.",
      features: ["All Enterprise features", "Custom ERP/SAP connectors", "On-premise deployment option", "SLA & 24/7 phone support", "Custom operator training"],
      cta: "Contact Sales",
      popular: false
    }
  ], [billingCycle]);

  return (
    <section id="pricing" className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0077C8]/10 border border-[#0077C8]/20 text-[#0077C8] text-xs font-bold uppercase tracking-wider mb-4"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#0077C8]" />
            <span>Pricing & Licensing</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-4 tracking-tight"
          >
            Transparent Excel Jet WMS Licensing
          </motion.h2>
          <p className="text-[#64748B] text-base font-medium mb-8">Choose the plan that scales with your warehouse throughput.</p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${billingCycle === 'monthly' ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>Monthly</span>
            <button 
              onClick={toggleBilling}
              className="w-14 h-8 bg-[#E2E8F0] rounded-full p-1 relative transition-all border border-[#CBD5E1]"
            >
              <motion.div 
                animate={{ x: billingCycle === 'monthly' ? 0 : 24 }}
                className="w-6 h-6 bg-[#0077C8] rounded-full shadow-md"
              />
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-bold uppercase tracking-wider transition-colors ${billingCycle === 'yearly' ? 'text-[#0F172A]' : 'text-[#64748B]'}`}>Annual</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#16A34A]/10 text-[#16A34A] text-[10px] font-bold uppercase tracking-wider border border-[#16A34A]/20">Save 20%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-xl border transition-all flex flex-col ${
                plan.popular 
                  ? 'bg-white border-[#0077C8] shadow-lg shadow-[#0077C8]/10 ring-2 ring-[#0077C8]' 
                  : 'bg-white border-[#E2E8F0] hover:border-[#CBD5E1] shadow-sm'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#0077C8] text-white text-[10px] font-bold uppercase tracking-wider rounded-full shadow-md flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Recommended
                </div>
              )}
              
              <div className="mb-6 text-left">
                <h3 className="text-xl font-bold text-[#0F172A] mb-2">{plan.name}</h3>
                <p className="text-xs text-[#64748B] font-medium leading-relaxed">{plan.desc}</p>
              </div>
              
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-4xl font-extrabold text-[#0F172A] tracking-tight">
                  {plan.price !== "Custom" ? `$${plan.price}` : "Custom"}
                </span>
                {plan.price !== "Custom" && <span className="text-[#64748B] font-semibold text-xs">/ facility / month</span>}
              </div>
              
              <button className={`w-full py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all mb-8 flex items-center justify-center gap-2 ${
                plan.popular 
                  ? 'bg-[#0077C8] hover:bg-[#0066B0] text-white shadow-sm' 
                  : 'bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#0F172A] border border-[#E2E8F0]'
              }`}>
                {plan.cta}
              </button>
              
              <div className="space-y-3.5 flex-1 text-left">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-[#16A34A]/10 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-[#16A34A]" />
                    </div>
                    <span className="text-xs font-semibold text-[#0F172A]">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
