"use client";

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const toggleBilling = useCallback(() => {
    setBillingCycle(prev => prev === 'monthly' ? 'yearly' : 'monthly');
  }, []);

  const plans = useMemo(() => [
    {
      name: "Starter",
      price: billingCycle === 'monthly' ? "0" : "0",
      desc: "Perfect for exploring the AI power.",
      features: ["10 clips per month", "Standard captions", "720p export", "Community support"],
      cta: "Get Started",
      popular: false
    },
    {
      name: "Pro",
      price: billingCycle === 'monthly' ? "29" : "24",
      desc: "For serious creators scaling viral brands.",
      features: ["Unlimited clips", "Hormozi style captions", "4K Ultra HD", "Priority rendering", "Custom Brand Kits"],
      cta: "Go Pro Now",
      popular: true
    },
    {
      name: "Agency",
      price: billingCycle === 'monthly' ? "99" : "79",
      desc: "The ultimate tool for content teams.",
      features: ["All Pro features", "Team workspaces", "Shared credit pool", "Dedicated manager", "White-label reports"],
      cta: "Contact Sales",
      popular: false
    }
  ], [billingCycle]);

  return (
    <section id="pricing" className="py-32 relative">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
          >
            <Sparkles className="w-3 h-3" />
            <span>Pricing Plans</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-black mb-8 uppercase italic tracking-tighter leading-none"
          >
            Simple, <span className="text-indigo-500">Transparent</span> <br />Pricing
          </motion.h2>
          <p className="text-slate-400 text-lg mb-12 font-medium">Choose the plan that fits your viral ambition. No hidden fees.</p>
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-6">
            <span className={`text-sm font-black uppercase italic tracking-tighter transition-colors ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
            <button 
              onClick={toggleBilling}
              className="w-16 h-9 bg-slate-900 rounded-full p-1.5 border border-slate-800 relative transition-all shadow-inner group"
            >
              <motion.div 
                animate={{ x: billingCycle === 'monthly' ? 0 : 28 }}
                className="w-6 h-6 bg-indigo-600 rounded-full shadow-xl shadow-indigo-600/40 border border-indigo-400/30"
              />
            </button>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-black uppercase italic tracking-tighter transition-colors ${billingCycle === 'yearly' ? 'text-white' : 'text-slate-500'}`}>Yearly</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 shadow-lg shadow-emerald-500/5">Save 20%</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {plans.map((plan, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: plan.popular ? 1.05 : 1 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                delay: i * 0.1 
              }}
              viewport={{ once: true, margin: "-50px" }}
              className={`relative p-10 rounded-[48px] border transition-all flex flex-col ${
                plan.popular 
                  ? 'bg-slate-900/80 border-indigo-500/50 shadow-[0_0_80px_rgba(79,70,229,0.15)] scale-105 z-10 backdrop-blur-xl' 
                  : 'bg-slate-900/40 border-white/5 hover:border-white/10 backdrop-blur-md'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 bg-indigo-600 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full shadow-2xl shadow-indigo-600/50 flex items-center gap-2 border border-indigo-400/40">
                  <Sparkles className="w-3.5 h-3.5" /> Best Value
                </div>
              )}
              
              <div className="mb-10 text-left">
                <h3 className="text-2xl font-black uppercase italic text-white mb-3 tracking-tight">{plan.name}</h3>
                <p className="text-sm text-slate-400 font-medium leading-relaxed">{plan.desc}</p>
              </div>
              
              <div className="flex items-baseline gap-2 mb-10">
                <span className="text-6xl font-black text-white tracking-tighter">${plan.price}</span>
                <span className="text-slate-500 font-black uppercase tracking-[0.2em] text-[10px]">/ month</span>
              </div>
              
              <button className={`w-full py-5 rounded-[24px] text-xs font-black uppercase tracking-[0.2em] transition-all mb-10 flex items-center justify-center gap-2 group ${
                plan.popular 
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-2xl shadow-indigo-600/40 border border-indigo-400/40' 
                  : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}>
                {plan.cta}
              </button>
              
              <div className="space-y-5 flex-1 text-left">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-xl flex items-center justify-center shrink-0 border ${plan.popular ? 'bg-indigo-500/10 border-indigo-500/20' : 'bg-white/5 border-white/5'}`}>
                      <Check className={`w-3.5 h-3.5 ${plan.popular ? 'text-indigo-400' : 'text-slate-500'}`} />
                    </div>
                    <span className="text-sm font-bold text-slate-300 tracking-tight">{feature}</span>
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
