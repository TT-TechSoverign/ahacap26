'use client';

import React from 'react';
import { Star } from 'lucide-react';
import { getSelectedReviews } from '@/lib/product-reviews';

interface YelpReviewsProps {
  productId: number;
}

export function YelpReviews({ productId }: YelpReviewsProps) {
  const selectedReviews = React.useMemo(() => {
    return getSelectedReviews(productId);
  }, [productId]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pb-4 border-b border-border-dark/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/30 flex items-center justify-center">
            <Star className="size-5 text-red-500 fill-red-500" />
          </div>
          <div>
            <h3 className="font-header font-black uppercase text-lg text-white leading-none tracking-wide">YELP VERIFIED REVIEWS</h3>
            <p className="text-[10px] font-header font-black text-slate-500 uppercase tracking-widest mt-1">AFFORDABLE HOME A/C WAIPAHU</p>
          </div>
        </div>

        {/* Yelp Score Card badge */}
        <a 
          href="https://www.yelp.com/biz/affordable-home-air-conditioning-waipahu" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="px-4 py-2 bg-surface-dark border border-border-dark rounded-xl flex items-center gap-2 hover:border-red-500/40 transition-all group"
        >
          <span className="text-white text-xs font-bold font-header uppercase tracking-wider">4.8 / 5.0 Rating</span>
          <div className="flex gap-0.5 text-red-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3 fill-current" />
            ))}
          </div>
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {selectedReviews.map((review, idx) => (
          <div 
            key={idx} 
            className="bg-surface-dark border border-border-dark p-5 rounded-2xl flex flex-col justify-between hover:shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:border-white/10 transition-all duration-300"
          >
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-white font-bold text-xs">{review.author}</span>
                <span className="px-2 py-0.5 text-[8px] font-black uppercase text-emerald-400 bg-emerald-500/10 rounded-full border border-emerald-500/20">Verified Customer</span>
              </div>
              <p className="text-slate-300 text-xs leading-relaxed italic font-sans break-words whitespace-normal">
                &ldquo;{review.text.length > 160 ? `${review.text.slice(0, 160)}...` : review.text}&rdquo;
              </p>
            </div>
            <div className="flex items-center gap-1 text-red-500 pt-4 mt-4 border-t border-border-dark/45">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="size-3 fill-current" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
