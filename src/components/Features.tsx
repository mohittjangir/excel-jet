"use client";

import { motion } from "framer-motion";
import { Warehouse, Boxes, Truck, ShieldCheck, BarChart3, ScanLine } from "lucide-react";

const wmsFeatures = [
  {
    title: "Inventory & Stock Tracking",
    description: "Real-time visibility into all warehouse stock levels, serial numbers, lot numbers, and location details.",
    icon: <Warehouse className="w-5 h-5" />,
  },
  {
    title: "Bin & Rack Location Management",
    description: "Optimize pick paths and storage density with automated bin mapping, zone assignment, and aisle routing.",
    icon: <Boxes className="w-5 h-5" />,
  },
  {
    title: "Inbound Receiving & Putaway",
    description: "Fast-track stock receiving with purchase order matching, quality checks, and directed putaway suggestions.",
    icon: <ScanLine className="w-5 h-5" />,
  },
  {
    title: "Outbound Dispatch & Shipping",
    description: "Streamline order picking, packing validation, shipping label generation, and carrier dispatch manifests.",
    icon: <Truck className="w-5 h-5" />,
  },
  {
    title: "Real-Time Analytics & Audit Logs",
    description: "Gain actionable intelligence on warehouse throughput, turnover rates, shrinkage, and operator audit trails.",
    icon: <BarChart3 className="w-5 h-5" />,
  },
  {
    title: "Enterprise Compliance & Security",
    description: "Role-based authorization, automated inventory reconciliation, and compliance reporting across facilities.",
    icon: <ShieldCheck className="w-5 h-5" />,
  }
];

export default function Features() {
  return (
    <section className="py-20 bg-[#F8FAFC]">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#0077C8]/10 border border-[#0077C8]/20 text-[#0077C8] text-xs font-bold uppercase tracking-wider mb-4"
          >
            Excel Jet Capabilities
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-extrabold text-[#0F172A] mb-4 tracking-tight"
          >
            Engineered for High-Velocity Logistics
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#64748B] text-base leading-relaxed"
          >
            A unified suite of tools designed to eliminate inventory discrepancies, reduce order fulfillment cycle time, and maximize warehouse efficiency.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wmsFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white border border-[#E2E8F0] shadow-sm hover:shadow-md transition-all group text-left"
            >
              <div className="w-10 h-10 bg-[#0F172A] text-white rounded-lg flex items-center justify-center mb-5 shadow-sm">
                <div className="text-[#0077C8]">{feature.icon}</div>
              </div>

              <h3 className="text-lg font-bold text-[#0F172A] mb-2 group-hover:text-[#0077C8] transition-colors">
                {feature.title}
              </h3>
              <p className="text-[#64748B] text-xs md:text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
