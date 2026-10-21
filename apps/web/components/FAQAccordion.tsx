'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { getProductFaqs } from '@/lib/product-faq';

interface FAQAccordionProps {
  productName: string;
}

export function FAQAccordion({ productName }: FAQAccordionProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const faqs = getProductFaqs(productName);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="bg-surface-dark border border-border-dark rounded-3xl p-6 shadow-xl relative overflow-hidden">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="size-5 text-primary" />
        <h2 className="font-header font-black uppercase text-sm tracking-wider text-white">Frequently Asked Questions</h2>
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
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between text-left py-3 group focus:outline-none"
              >
                <span className="font-header font-black uppercase text-[11px] md:text-[12px] text-slate-100 tracking-wider group-hover:text-primary transition-colors">
                  {faq.q}
                </span>
                <ChevronDown 
                  className={`size-4 text-slate-400 group-hover:text-white transition-transform duration-300 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                />
              </button>
              
              <div className={isOpen ? 'block overflow-hidden' : 'hidden overflow-hidden'}>
                <p className="text-slate-300 text-xs leading-relaxed font-sans pb-3 pl-1">
                  {faq.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
