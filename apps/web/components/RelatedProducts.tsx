'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ArrowUpRight, ShoppingCart, Check } from 'lucide-react';
import { Product } from '@/types/inventory';
import { generateProductSlug, isCampaignActive } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { INITIAL_CATALOG_PRODUCTS } from '@/lib/catalog-seed';
import { fetchLiveProductsClient } from '@/lib/use-live-inventory';
import { getProductImages } from '@/lib/product-images';

interface RelatedProductsProps {
  currentProduct: Product;
}

function selectRelatedInStock(source: Product[], currentProduct: Product): Product[] {
  return source
    .filter((p) => p.id !== currentProduct.id && p.stock > 0 && (p.btu || 0) > 0)
    .sort((a, b) => {
      if (a.subcategory === currentProduct.subcategory && b.subcategory !== currentProduct.subcategory) return -1;
      if (a.subcategory !== currentProduct.subcategory && b.subcategory === currentProduct.subcategory) return 1;
      return Math.abs((a.btu || 0) - (currentProduct.btu || 0)) - Math.abs((b.btu || 0) - (currentProduct.btu || 0));
    })
    .slice(0, 4);
}

export function RelatedProducts({ currentProduct }: RelatedProductsProps) {
  const { addToCart, openCart } = useCart();
  const [products, setProducts] = useState<Product[]>(() =>
    selectRelatedInStock(INITIAL_CATALOG_PRODUCTS, currentProduct)
  );
  const [addedId, setAddedId] = useState<number | null>(null);
  const isPromo = isCampaignActive();

  useEffect(() => {
    let active = true;
    fetchLiveProductsClient().then((data) => {
      if (!active || !Array.isArray(data) || data.length === 0) return;
      setProducts(selectRelatedInStock(data, currentProduct));
    });
    return () => {
      active = false;
    };
  }, [currentProduct]);

  if (products.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-baseline border-b border-border-dark/50 pb-4">
        <h2 className="font-header font-black uppercase text-lg text-white leading-none tracking-wide">
          Compare &amp; Order Similar In-Stock Models
        </h2>
        <Link 
          href="/shop" 
          className="text-primary hover:text-white text-[10px] font-header font-black uppercase tracking-widest flex items-center gap-1 transition-all"
        >
          View Full Catalog
          <ChevronRight className="size-3" />
        </Link>
      </div>

      <div 
        className="flex lg:grid lg:grid-cols-4 gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth pb-4 [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-white/5 [&::-webkit-scrollbar-thumb]:bg-primary/30 [&::-webkit-scrollbar-thumb]:rounded-full"
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {products.map((prod) => {
          const slug = generateProductSlug(prod.id, prod.name);
          const activePrice = (isPromo && prod.promo_price) ? prod.promo_price : prod.price;
          const isOutOfStock = prod.stock <= 0;
          const isAdded = addedId === prod.id;
          return (
            <div 
              key={prod.id}
              className="w-[280px] lg:w-full shrink-0 bg-surface-dark border border-border-dark p-4 rounded-3xl snap-start group relative hover:border-primary/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  {isOutOfStock ? (
                    <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/30">
                      Out of Stock
                    </span>
                  ) : (
                    <span className="text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      {prod.stock} In Stock Waipahu
                    </span>
                  )}
                  <span className="text-[9px] font-mono text-slate-400">
                    {prod.voltage?.split('/')[0]?.trim() || '115V'}
                  </span>
                </div>

                {/* Image Container */}
                <Link href={`/shop/${slug}`} className="relative aspect-video w-full rounded-2xl bg-[#0b1120] overflow-hidden flex items-center justify-center p-3 mb-4 border border-border-dark/30 group-hover:border-primary/20 transition-colors block">
                  {prod.image_url ? (
                    <Image 
                      src={prod.image_url.endsWith('.svg') ? prod.image_url.replace('.svg', '.webp') : prod.image_url} 
                      alt={prod.name} 
                      fill 
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500" 
                      unoptimized
                    />
                  ) : (
                    <div className="text-[10px] text-slate-400 uppercase tracking-widest font-header">No Image</div>
                  )}
                </Link>

                <div className="space-y-1.5">
                  <span className="text-[8px] font-header font-black text-primary uppercase tracking-[0.25em]">
                    {prod.btu ? `${prod.btu.toLocaleString()} BTU • ` : ''}{prod.subcategory?.replace('_', ' ') || 'WINDOW AC'}
                  </span>
                  <Link href={`/shop/${slug}`}>
                    <h3 className="font-header font-black uppercase text-sm text-slate-100 line-clamp-2 group-hover:text-primary transition-colors">
                      {prod.name}
                    </h3>
                  </Link>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-border-dark/50 space-y-2.5">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="block text-[8px] font-header font-black text-slate-400 uppercase tracking-widest">Waipahu Price</span>
                    <span className="text-base font-header font-black text-white">${activePrice.toLocaleString()}</span>
                  </div>
                  <Link 
                    href={`/shop/${slug}`}
                    className="text-[10px] font-mono text-slate-400 hover:text-primary flex items-center gap-0.5"
                  >
                    Specs <ArrowUpRight className="size-3" />
                  </Link>
                </div>

                <button
                  type="button"
                  disabled={isOutOfStock}
                  onClick={() => {
                    if (isOutOfStock) return;
                    addToCart({
                      ...prod,
                      price: activePrice,
                    });
                    setAddedId(prod.id);
                    openCart();
                    setTimeout(() => setAddedId(null), 2000);
                  }}
                  className={`w-full py-2.5 px-3 rounded-xl font-header font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-1.5 transition-all ${
                    isOutOfStock
                      ? 'bg-slate-800/70 text-slate-500 cursor-not-allowed'
                      : isAdded
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-primary hover:bg-cyan-300 text-slate-950 shadow-md shadow-primary/20'
                  }`}
                >
                  {isOutOfStock ? (
                    <span>Out of Stock</span>
                  ) : isAdded ? (
                    <>
                      <Check className="size-3.5" />
                      <span>Added!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="size-3.5" />
                      <span>Add to Cart (${activePrice})</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
