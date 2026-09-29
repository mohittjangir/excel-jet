"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Warehouse, Boxes, PackageCheck, Truck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative pt-16 pb-20 md:pt-24 md:pb-32 bg-[#F8FAFC]">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0077C8]/10 border border-[#0077C8]/20 text-[#0077C8] text-xs font-bold uppercase tracking-wider mb-8"
          >
            <ShieldCheck className="w-4 h-4 text-[#0077C8]" />
            <span>Excel Jet Warehouse Management System</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 text-[#0F172A] leading-[1.1]"
          >
            Optimize Inventory. <br />
            <span className="text-[#0077C8]">Accelerate Logistics.</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base md:text-lg text-[#64748B] max-w-2xl mb-10 leading-relaxed font-normal"
          >
            Excel Jet WMS provides real-time stock tracking, automated receiving, bin location mapping, and dispatch control for high-performance warehouses.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-[#0077C8] hover:bg-[#0066B0] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-3"
            >
              Open Excel Jet WMS Dashboard
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#features"
              className="px-8 py-4 bg-white hover:bg-slate-50 text-[#0F172A] border border-[#E2E8F0] rounded-xl font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
            >
              Explore Features
            </Link>
          </motion.div>

          {/* Feature Checklist */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-6 text-[#64748B] text-xs font-semibold"
          >
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Real-time Stock Tracking</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Automated Barcode & SKU Auditing</div>
            <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#16A34A]" /> Multi-Bin Location Support</div>
          </motion.div>
        </div>

        {/* Visual Preview Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 max-w-5xl mx-auto rounded-2xl border border-[#E2E8F0] bg-white p-4 md:p-6 shadow-xl"
        >
          <div className="bg-[#0F172A] rounded-xl p-6 text-white overflow-hidden relative">
            <div className="flex items-center justify-between border-b border-[#0077C8]/40 pb-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white p-1 flex items-center justify-center">
                  <Image src="/excel-jet-logo.jpg" alt="Excel Jet Logo" width={36} height={36} className="object-contain" />
                </div>
                <div className="text-left">
                  <h3 className="font-extrabold text-sm text-white">Excel Jet Central Hub #01</h3>
                  <p className="text-[10px] text-slate-300">Live Operation Feed • Zone A-D</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md bg-[#16A34A]/20 border border-[#16A34A]/30 text-[#16A34A] text-[10px] font-bold uppercase tracking-wider">
                  SYSTEM OPERATIONAL
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#1E293B] p-4 rounded-xl border border-[#0077C8]/30 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Stock Received</span>
                  <PackageCheck className="w-4 h-4 text-[#0077C8]" />
                </div>
                <div className="text-2xl font-black text-white">1,482 Units</div>
                <div className="text-[10px] text-emerald-400 font-semibold mt-1">↑ +12% today</div>
              </div>

              <div className="bg-[#1E293B] p-4 rounded-xl border border-[#0077C8]/30 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Active Dispatches</span>
                  <Truck className="w-4 h-4 text-[#0077C8]" />
                </div>
                <div className="text-2xl font-black text-white">340 Orders</div>
                <div className="text-[10px] text-slate-300 font-semibold mt-1">On Schedule</div>
              </div>

              <div className="bg-[#1E293B] p-4 rounded-xl border border-[#0077C8]/30 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">Space Utilization</span>
                  <Boxes className="w-4 h-4 text-[#0077C8]" />
                </div>
                <div className="text-2xl font-black text-white">84.2% Capacity</div>
                <div className="text-[10px] text-amber-400 font-semibold mt-1">Optimal Storage</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
