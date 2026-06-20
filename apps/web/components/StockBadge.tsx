import React from 'react';
import { cn } from '@/lib/utils';

interface StockBadgeProps {
  stock: number;
}

export function StockBadge({ stock }: StockBadgeProps) {
  const isOutOfStock = stock === 0;
  const isLowStock = stock > 0 && stock <= 5;

  return (
    <div className="flex items-center justify-center md:justify-start">
      <span
        className={cn(
          "inline-flex items-center gap-2 px-3 py-1 text-[10px] font-header font-black uppercase tracking-[0.2em] rounded-full border shadow-sm transition-all duration-300",
          isOutOfStock 
            ? "bg-red-500/10 border-red-500/20 text-red-400"
            : isLowStock
            ? "bg-amber-500/10 border-amber-500/20 text-amber-400 animate-pulse"
            : "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
        )}
      >
        <span 
          className={cn(
            "w-1.5 h-1.5 rounded-full shrink-0", 
            isOutOfStock ? "bg-red-500" : isLowStock ? "bg-amber-400 animate-ping" : "bg-emerald-500"
          )}
        />
        {isOutOfStock && "Temporarily Out Of Stock"}
        {isLowStock && `Only ${stock} Units Left in Waipahu`}
        {!isOutOfStock && !isLowStock && "In Stock — Waipahu Warehouse"}
      </span>
    </div>
  );
}
