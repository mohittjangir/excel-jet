"use client";

import React, { useState, useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, CheckCircle2, ShieldCheck, Boxes, Truck, Menu, X } from "lucide-react";
import { animate } from "framer-motion";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import UploadZone from "@/components/UploadZone";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import UserInfo from "@/components/UserInfo";
import WMSLogo from "@/components/WMSLogo";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const NAV_ITEMS = [
  { name: "Features", href: "#features" },
  { name: "Inventory", href: "#solutions" },
  { name: "FAQ", href: "#faq" }
];

export default function Home() {
  const router = useRouter();
  const { user } = useAuth();
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    if (mounted && user) {
      router.replace("/dashboard");
    }
  }, [user, mounted, router]);

  const handleSmoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement, MouseEvent>, href: string) => {
    if (href.startsWith("#") && href.length > 1) {
      e.preventDefault();
      const targetId = href.replace("#", "");
      const elem = document.getElementById(targetId);
      if (elem) {
        const targetPos = elem.getBoundingClientRect().top + window.pageYOffset;
        const startPos = window.pageYOffset;
        const distance = Math.abs(targetPos - startPos);

        const duration = Math.min(Math.max(distance / 2800, 0.4), 1.0);

        animate(startPos, targetPos, {
          type: "tween",
          duration: duration,
          ease: [0.25, 0.46, 0.45, 0.94],
          onUpdate: (latest: number) => {
            window.scrollTo(0, Math.floor(latest));
          },
          onComplete: () => {
            window.scrollTo(0, targetPos);
          }
        });
      }
    }
  }, []);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative flex flex-col min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      {/* Top Announcement Bar */}
      <div className="h-10 bg-[#0F172A] text-white flex items-center justify-center gap-4 px-4 overflow-hidden relative text-xs">
        <span className="font-semibold text-slate-200">
          Excel Jet WMS v4.2 Released: Enhanced Real-Time Stock & Multi-Warehouse Sync
        </span>
        <div className="h-3 w-[1px] bg-slate-600 hidden sm:block" />
        <Link href="/dashboard" className="font-bold text-[#0077C8] hover:underline hidden sm:flex items-center gap-1">
          Open Dashboard <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Navigation */}
      <header className="px-6 py-4 flex items-center justify-between border-b border-[#E2E8F0] sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-xs">
        <Link href="/" className="py-1">
          <WMSLogo variant="dark" size="md" />
        </Link>

        <nav className="hidden lg:flex items-center gap-8 relative z-10">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={(e) => handleSmoothScroll(e, item.href)}
              className="text-xs font-bold text-[#64748B] hover:text-[#0077C8] transition-colors uppercase tracking-wider relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#0077C8] transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 relative z-10">
          <Link href="/dashboard" className="hidden sm:block">
            <button className="px-5 py-2.5 bg-[#0077C8] hover:bg-[#0066B0] text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-all shadow-sm">
              {user ? "Dashboard" : "Access Excel Jet WMS"}
            </button>
          </Link>
          <UserInfo />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#0F172A] hover:bg-slate-100"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white border-b border-[#E2E8F0] p-6 shadow-xl lg:hidden flex flex-col gap-4 text-left">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  handleSmoothScroll(e, item.href);
                }}
                className="text-sm font-bold text-[#0F172A] hover:text-[#0077C8] uppercase tracking-wider py-1"
              >
                {item.name}
              </Link>
            ))}
            <Link href="/dashboard" className="pt-2">
              <button className="w-full py-3 bg-[#0077C8] text-white rounded-lg font-bold text-xs uppercase tracking-wider">
                {user ? "Open WMS Dashboard" : "Access Excel Jet WMS"}
              </button>
            </Link>
          </div>
        )}
      </header>

      <main className="flex-1">
        <Hero />

        <div id="features" className="relative z-10">
          <Features />
        </div>

        {/* Inventory Upload & Quick Scan Section */}
        <section id="solutions" className="py-20 bg-white border-y border-[#E2E8F0]">
          <div className="container mx-auto px-6 max-w-6xl">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <span className="px-3.5 py-1 rounded-full bg-[#0077C8]/10 text-[#0077C8] text-xs font-bold uppercase tracking-widest inline-block mb-3">
                Excel Jet Ingestion Engine
              </span>
              <h2 className="text-3xl font-extrabold text-[#0F172A] mb-3 tracking-tight">
                Import & Sync Inventory Manifests
              </h2>
              <p className="text-[#64748B] text-base">
                Upload stock sheets, SKU manifests, or dispatch orders to instantly verify items and update warehouse stock levels.
              </p>
            </div>
            <UploadZone />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 container mx-auto px-6 max-w-6xl">
          <div className="bg-[#0F172A] text-white rounded-2xl p-10 md:p-16 shadow-xl border border-[#0077C8]/30 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="max-w-xl text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0077C8]/20 border border-[#0077C8]/40 text-[#0077C8] text-xs font-bold uppercase tracking-widest mb-6">
                <ShieldCheck className="w-4 h-4 text-[#0077C8]" /> Enterprise Ready WMS
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight leading-tight">
                Streamline Operations with Excel Jet WMS
              </h2>
              <p className="text-slate-300 text-base mb-8 leading-relaxed">
                Join logistics teams and warehouse managers utilizing Excel Jet WMS for error-free inventory tracking, stock movements, and real-time reporting.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Link href="/dashboard">
                  <button className="px-7 py-3.5 bg-[#0077C8] hover:bg-[#0066B0] text-white font-bold text-xs uppercase tracking-wider rounded-lg transition-all shadow-md flex items-center gap-2">
                    Launch Excel Jet Control Center <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
              <div className="bg-[#1E293B] p-6 rounded-xl border border-[#0077C8]/30 text-center">
                <Boxes className="w-8 h-8 text-[#0077C8] mx-auto mb-2" />
                <div className="text-2xl font-black text-white">99.9%</div>
                <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Inventory Precision</div>
              </div>
              <div className="bg-[#1E293B] p-6 rounded-xl border border-[#0077C8]/30 text-center">
                <Truck className="w-8 h-8 text-[#0077C8] mx-auto mb-2" />
                <div className="text-2xl font-black text-white">45%</div>
                <div className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider">Faster Dispatch</div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />
        <FAQ />
      </main>

      <Footer />
    </div>
  );
}
