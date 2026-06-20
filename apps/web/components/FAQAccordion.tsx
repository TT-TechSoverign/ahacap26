'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { getProductFaqs } from '@/lib/product-faq';

interface FAQAccordionProps {
  productName: string;
}

export function FAQAccordion({ productName }: FAQAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const faqs = getProductFaqs(productName);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="bg-surface-dark border border-border-dark rounded-3xl p-6 shadow-xl relative overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="size-5 text-primary" />
        <h4 className="font-header font-black uppercase text-sm tracking-wider text-white">Frequently Asked Questions</h4>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div 
              key={idx} 
              className="border-b border-border-dark/60 last:border-0 pb-3 last:pb-0"
            >
              <button 
                onClick={() => toggle(idx)}
                className="w-full flex items-center justify-between text-left py-3 group focus:outline-none"
              >
                <span className="font-header font-black uppercase text-[11px] md:text-[12px] text-slate-100 tracking-wider group-hover:text-primary transition-colors">
                  {faq.q}
                </span>
                <ChevronDown 
                  className={`size-4 text-slate-400 group-hover:text-white transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                />
              </button>
              
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeOut' }}
                    className="overflow-hidden"
                  >
                    <p className="text-slate-300 text-xs leading-relaxed font-sans pb-3 pl-1">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </div>
  );
}
