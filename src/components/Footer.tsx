"use client";

import Link from "next/link";
import WMSLogo from "@/components/WMSLogo";

export default function Footer() {
  return (
    <footer className="relative border-t border-[#0077C8]/30 bg-[#0F172A] text-white">
      <div className="px-6 py-16">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="col-span-1 md:col-span-2 text-left">
            <Link href="/" className="inline-block mb-4">
              <WMSLogo variant="light" size="md" />
            </Link>
            <p className="text-slate-300 max-w-sm mb-6 text-xs leading-relaxed">
              Excel Jet Warehouse Management System provides end-to-end stock visibility, receiving control, rack allocation, and real-time logistics analytics.
            </p>
          </div>
          
          <div className="text-left">
            <h4 className="font-bold mb-4 text-white text-xs uppercase tracking-wider">Excel Jet Modules</h4>
            <ul className="space-y-2.5 text-slate-300 text-xs">
              <li><Link href="#features" className="hover:text-[#0077C8] transition-colors">Stock Tracking</Link></li>
              <li><Link href="#solutions" className="hover:text-[#0077C8] transition-colors">Receiving & Putaway</Link></li>
              <li><Link href="#solutions" className="hover:text-[#0077C8] transition-colors">Dispatch Manifests</Link></li>
              <li><Link href="#pricing" className="hover:text-[#0077C8] transition-colors">WMS Licensing</Link></li>
            </ul>
          </div>

          <div className="text-left">
            <h4 className="font-bold mb-4 text-white text-xs uppercase tracking-wider">Company & Legal</h4>
            <ul className="space-y-2.5 text-slate-300 text-xs">
              <li><Link href="#faq" className="hover:text-[#0077C8] transition-colors">Documentation</Link></li>
              <li><Link href="#faq" className="hover:text-[#0077C8] transition-colors">Security & SLA</Link></li>
              <li><Link href="#faq" className="hover:text-[#0077C8] transition-colors">Privacy Policy</Link></li>
              <li><Link href="#faq" className="hover:text-[#0077C8] transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="container mx-auto pt-6 border-t border-[#0077C8]/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-300 text-xs">
            &copy; {new Date().getFullYear()} Excel Jet Warehouse Management System. All rights reserved.
          </p>
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#1E293B] border border-[#0077C8]/40 text-xs text-slate-200">
            <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
            Excel Jet Cloud Services: 100% Operational
          </div>
        </div>
      </div>
    </footer>
  );
}
