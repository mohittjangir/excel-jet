"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const faqs = [
  {
    question: "How does the AI identify viral moments?",
    answer: "Our proprietary AI analyzes visual retention hooks, audio spikes (like laughter or intense speaking), and context shifts to predict which segments have the highest probability of retaining viewers on platforms like TikTok and Reels."
  },
  {
    question: "Can I use custom fonts and brand colors?",
    answer: "Yes! The Pro and Agency plans allow you to upload your own custom fonts, define brand color palettes, and create reusable templates to ensure every exported clip matches your brand identity perfectly."
  },
  {
    question: "What languages are supported for auto-captions?",
    answer: "We currently support auto-captions in 98+ languages, including English, Spanish, French, German, Hindi, Japanese, and Korean. The AI automatically detects the spoken language with 99% accuracy."
  },
  {
    question: "Do you have a watermark on free accounts?",
    answer: "The Starter plan includes a subtle 'SAM AI' watermark in the bottom corner. Upgrading to the Pro plan removes all watermarks and unlocks 4K export capabilities."
  },
  {
    question: "How long does rendering take?",
    answer: "For standard clips (under 60 seconds), rendering typically takes less than 15 seconds. Pro users get access to priority rendering queues, reducing wait times even during peak hours."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-32 relative z-10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black uppercase tracking-[0.2em] mb-8"
          >
            <MessageCircleQuestion className="w-3 h-3" />
            <span>Got Questions?</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter mb-6 leading-none"
          >
            Frequently Asked <br /><span className="text-indigo-500">Questions</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`border rounded-3xl transition-all overflow-hidden ${
                  isOpen 
                    ? 'bg-slate-900/60 border-indigo-500/30 shadow-[0_0_30px_rgba(79,70,229,0.1)] backdrop-blur-xl' 
                    : 'bg-slate-900/20 border-white/5 hover:border-white/10 hover:bg-slate-900/40 backdrop-blur-md'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left"
                >
                  <span className="text-lg font-bold text-slate-200">{faq.question}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-indigo-500/20 text-indigo-400' : 'bg-white/5 text-slate-400'}`}>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
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
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-8 pb-6 text-slate-400 leading-relaxed font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
