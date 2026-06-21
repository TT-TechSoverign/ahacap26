'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowUpRight } from 'lucide-react';
import { Product } from '@/types/inventory';
import { generateProductSlug } from '@/lib/utils';

interface RelatedProductsProps {
  currentProduct: Product;
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRelated() {
      try {
        const res = await fetch('/api/v1/products');
        if (res.ok) {
          const data: Product[] = await res.json();
          // Filter out the current product and match subcategory or brand
          const filtered = data
            .filter((p) => p.id !== currentProduct.id)
            .sort((a, b) => {
              // Prioritize same subcategory, then general category
              if (a.subcategory === currentProduct.subcategory && b.subcategory !== currentProduct.subcategory) return -1;
              if (a.subcategory !== currentProduct.subcategory && b.subcategory === currentProduct.subcategory) return 1;
              return 0;
            });
          setProducts(filtered.slice(0, 4));
        }
      } catch (e) {
        console.error("Failed to load related products:", e);
      } finally {
        setLoading(false);
      }
    }
    fetchRelated();
  }, [currentProduct]);

  if (loading || products.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-baseline border-b border-border-dark/50 pb-4">
        <h2 className="font-header font-black uppercase text-lg text-white leading-none tracking-wide">
          Compare Similar Models
        </h2>
        <Link 
          href="/shop" 
          className="text-primary hover:text-white text-[10px] font-header font-black uppercase tracking-widest flex items-center gap-1 transition-all"
        >
          View Full Catalog
          <ChevronRight className="size-3" />
        </Link>
      </div>

      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb]:rounded-full">
        {products.map((prod) => {
          const slug = generateProductSlug(prod.id, prod.name);
          return (
            <div 
              key={prod.id}
              className="w-[280px] shrink-0 bg-surface-dark border border-border-dark p-4 rounded-3xl snap-start group relative hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image Container */}
                <div className="relative aspect-video w-full rounded-2xl bg-[#0b1120] overflow-hidden flex items-center justify-center p-3 mb-4 border border-border-dark/30 group-hover:border-primary/20 transition-colors">
                  {prod.image_url ? (
                    <Image 
                      src={prod.image_url.endsWith('.svg') ? prod.image_url.replace('.svg', '.webp') : prod.image_url} 
                      alt={prod.name} 
                      fill 
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500" 
                    />
                  ) : (
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-header">No Image</div>
                  )}
                </div>

                <div className="space-y-2">
                  <span className="text-[8px] font-header font-black text-primary uppercase tracking-[0.25em]">
                    {prod.subcategory?.replace('_', ' ') || 'WINDOW AC'}
                  </span>
                  <h3 className="font-header font-black uppercase text-sm text-slate-100 line-clamp-1 group-hover:text-primary transition-colors">
                    {prod.name}
                  </h3>
                </div>
              </div>

              <div className="flex justify-between items-center mt-6 pt-4 border-t border-border-dark/50">
                <div>
                  <span className="block text-[8px] font-header font-black text-slate-400 uppercase tracking-widest">Pricing</span>
                  <span className="text-sm font-header font-black text-white">${prod.price.toLocaleString()}</span>
                </div>
                <Link 
                  href={`/shop/${slug}`}
                  className="px-3.5 py-2 bg-[#0b1120] hover:bg-primary border border-border-dark hover:border-primary text-slate-400 hover:text-black rounded-xl font-header font-black uppercase text-[9px] tracking-widest flex items-center gap-1.5 transition-all"
                >
                  Configure
                  <ArrowUpRight className="size-3" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
