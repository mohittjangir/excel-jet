"use client";

import { motion } from "framer-motion";
import { Star, ShieldCheck, Building2 } from "lucide-react";
import Image from "next/image";

export default function Testimonials() {
  const featuredReviews = [
    {
      name: "Marcus Vance",
      role: "VP of Supply Chain, Logistics Corp",
      content: "WMS Core transformed our 3PL warehouse throughput within 30 days. Stock counting errors plummeted to zero, and inventory audit prep takes minutes.",
      avatar: "https://i.pravatar.cc/150?u=marcus",
      rating: 5,
      metrics: "99.9% Inventory Precision"
    },
    {
      name: "Elena Rostova",
      role: "Operations Director, Apex Distribution",
      content: "The bin location tracking and real-time dispatch manifests saved our teams over 12 hours a week in walking distance and manual paperwork.",
      avatar: "https://i.pravatar.cc/150?u=elena",
      rating: 5,
      metrics: "3.5x Faster Order Putaway"
    },
    {
      name: "David Klinger",
      role: "Warehouse Manager, Global Spares",
      content: "The multi-facility view gives our regional team total visibility. Barcode ingestion is lightning fast and bulletproof.",
      avatar: "https://i.pravatar.cc/150?u=davidk",
      rating: 5,
      metrics: "100k+ SKUs Tracked"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-white border-t border-[#E2E8F0]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#16A3A3]/10 border border-[#16A3A3]/20 text-[#16A3A3] text-xs font-bold uppercase tracking-wider mb-4"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#16A3A3]" />
            <span>Customer Trust & Case Studies</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-[#17324D] mb-4 tracking-tight"
          >
            Trusted by Modern Logistics Leaders
          </motion.h2>
          <p className="text-[#64748B] text-base font-medium">See how enterprise facilities rely on WMS Core for error-free inventory control.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {featuredReviews.map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="bg-[#F5F7FA] p-8 rounded-xl border border-[#E2E8F0] shadow-sm flex flex-col justify-between text-left"
            >
              <div>
                <div className="flex gap-1 mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                  ))}
                </div>
                <p className="text-[#1F2937] font-medium text-sm leading-relaxed mb-6 italic">
                  &quot;{t.content}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Image 
                    src={t.avatar} 
                    alt={t.name} 
                    width={40} 
                    height={40} 
                    className="w-10 h-10 rounded-full border border-[#CBD5E1] object-cover" 
                  />
                  <div>
                    <h4 className="font-bold text-[#17324D] text-xs">{t.name}</h4>
                    <p className="text-[10px] text-[#64748B] font-semibold">{t.role}</p>
                  </div>
                </div>
                <span className="px-2 py-1 rounded bg-[#16A3A3]/10 text-[#16A3A3] text-[9px] font-bold uppercase tracking-wider">
                  {t.metrics}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
