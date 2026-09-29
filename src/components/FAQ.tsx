"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const wmsFaqs = [
  {
    question: "How does WMS Core integrate with existing ERP systems?",
    answer: "WMS Core offers REST API endpoints and webhooks that connect with major ERPs including SAP, NetSuite, Microsoft Dynamics, and custom SQL databases for bidirectional inventory sync."
  },
  {
    question: "Can we manage multi-bin locations and zoned warehouses?",
    answer: "Yes! You can define custom warehouse layouts, aisle designations, rack tiers, and bin locations with automated pick-sequence optimization."
  },
  {
    question: "Does WMS Core support barcode scanning and RFID ingestion?",
    answer: "Absolutely. WMS Core supports standard 1D/2D barcode formats (GS1-128, QR Code, UPC) and mobile handheld scanner units for instant stock verification."
  },
  {
    question: "How are stock in (receiving) and stock out (dispatch) tracked?",
    answer: "Every stock movement is recorded in a real-time audit ledger with operator timestamp, SKU count, source bin, and target destination to eliminate inventory leakage."
  },
  {
    question: "What hardware or devices are required to run WMS Core?",
    answer: "WMS Core is fully web-based and responsive. It operates on standard desktop workstations, laptops, tablets, and rugged Android/iOS mobile warehouse scanners."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 bg-[#F5F7FA]">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#16A3A3]/10 border border-[#16A3A3]/20 text-[#16A3A3] text-xs font-bold uppercase tracking-wider mb-4"
          >
            <MessageCircleQuestion className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-extrabold text-[#17324D] mb-3 tracking-tight"
          >
            Frequently Asked Questions
          </motion.h2>
        </div>

        <div className="space-y-3">
          {wmsFaqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div 
                key={index}
                className={`border rounded-xl transition-all overflow-hidden bg-white ${
                  isOpen 
                    ? 'border-[#16A3A3] shadow-sm' 
                    : 'border-[#E2E8F0] hover:border-[#CBD5E1]'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left"
                >
                  <span className="text-base font-bold text-[#17324D]">{faq.question}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-[#16A3A3]/10 text-[#16A3A3]' : 'bg-[#F5F7FA] text-[#64748B]'}`}>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                      <ChevronDown className="w-4 h-4" />
                    </motion.div>
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-6 pb-4 text-[#64748B] text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
