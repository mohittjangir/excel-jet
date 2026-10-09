"use client";

import React from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UploadZone from "@/components/UploadZone";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import { Info, ShieldCheck, Boxes, Truck } from "lucide-react";

export default function AboutModule() {
  return (
    <div className="space-y-10 text-left">
      {/* Top Section Header */}
      <div className="p-6 rounded-xl bg-white border border-[#E2E8F0] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#0077C8]/10 text-[#0077C8] text-xs font-bold uppercase tracking-wider mb-2">
            <Info className="w-3.5 h-3.5 text-[#0077C8]" />
            <span>Excel Jet Warehouse Management System</span>
          </div>
          <h2 className="text-xl font-extrabold text-[#0F172A] tracking-tight">
            About Excel Jet WMS v4.2
          </h2>
          <p className="text-xs text-[#64748B] mt-1 font-medium max-w-2xl">
            Enterprise WMS solution engineered for high-velocity logistics, real-time stock tracking, multi-bin location mapping, and automated dispatch operations.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-[#0F172A] text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2 border border-[#0077C8]/30">
            <ShieldCheck className="w-4 h-4 text-[#0077C8]" /> System Active & Operational
          </div>
        </div>
      </div>

      {/* Main Hero & Overview */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <Hero />
      </div>

      {/* Features & Capabilities */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <Features />
      </div>

      {/* Manifest Sync Section */}
      <section className="bg-white rounded-xl border border-[#E2E8F0] p-8 shadow-sm">
        <div className="max-w-3xl mx-auto text-center mb-8">
          <span className="px-3.5 py-1 rounded-full bg-[#0077C8]/10 text-[#0077C8] text-xs font-bold uppercase tracking-widest inline-block mb-3">
            Excel Jet Ingestion Engine
          </span>
          <h3 className="text-2xl font-extrabold text-[#0F172A] mb-2">
            Import & Sync Inventory Manifests
          </h3>
          <p className="text-[#64748B] text-xs">
            Upload stock sheets, SKU manifests, or dispatch orders to verify items and sync stock levels.
          </p>
        </div>
        <UploadZone />
      </section>

      {/* Customer Trust & FAQ */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <Testimonials />
      </div>

      <div className="bg-white rounded-xl border border-[#E2E8F0] overflow-hidden shadow-sm">
        <FAQ />
      </div>
    </div>
  );
}
