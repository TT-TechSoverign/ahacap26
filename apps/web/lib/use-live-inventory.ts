'use client';

import { useState, useEffect, useMemo } from 'react';
import { Product } from '@/types/inventory';
import { INITIAL_CATALOG_PRODUCTS } from '@/lib/catalog-seed';

let cachedLiveProducts: Product[] | null = null;
let cachedAt = 0;
let inflightPromise: Promise<Product[]> | null = null;

function mergeLiveCatalog(liveData: Product[]): Product[] {
    const liveById = new Map<number, Product>(liveData.map((p) => [p.id, p]));
    return INITIAL_CATALOG_PRODUCTS.map((fallback) => {
        const live = liveById.get(fallback.id);
        if (!live) return fallback;
        return {
            ...fallback,
            ...live,
            // Preserve canonical display fields when DB returns empty/null
            performance_specs: live.performance_specs || fallback.performance_specs,
            coverage_aham: live.coverage_aham || fallback.coverage_aham,
            coverage_oahu: live.coverage_oahu || fallback.coverage_oahu,
            image_url: live.image_url || fallback.image_url,
            ceer_rating: live.ceer_rating || fallback.ceer_rating,
            promo_price: undefined,
            discount_percent: undefined,
        };
    });
}

export async function fetchLiveCatalogProducts(force = false): Promise<Product[]> {
    const now = Date.now();
    if (!force && cachedLiveProducts && now - cachedAt < 15000) {
        return cachedLiveProducts;
    }
    if (!force && inflightPromise) {
        return inflightPromise;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
    inflightPromise = fetch(`${apiUrl}/products`, { cache: 'no-store' })
        .then(async (res) => {
            if (!res.ok) return INITIAL_CATALOG_PRODUCTS;
            const data = await res.json();
            if (!Array.isArray(data) || data.length === 0) return INITIAL_CATALOG_PRODUCTS;
            const merged = mergeLiveCatalog(data);
            cachedLiveProducts = merged;
            cachedAt = Date.now();
            return merged;
        })
        .catch(() => INITIAL_CATALOG_PRODUCTS)
        .finally(() => {
            inflightPromise = null;
        });

    return inflightPromise;
}

export const fetchLiveProductsClient = fetchLiveCatalogProducts;

export function useLiveInventorySummary() {
    const [products, setProducts] = useState<Product[]>(
        () => cachedLiveProducts || INITIAL_CATALOG_PRODUCTS
    );

    useEffect(() => {
        let active = true;
        fetchLiveCatalogProducts().then((merged) => {
            if (active) setProducts(merged);
        });
        return () => {
            active = false;
        };
    }, []);

    return useMemo(() => {
        const acModels = products.filter(
            (p) => (p.btu || 0) > 0 && p.subcategory !== 'casement'
        );
        const inStockAcProducts = acModels.filter((p) => (p.stock || 0) > 0);
        const prices = (inStockAcProducts.length > 0 ? inStockAcProducts : acModels)
            .map((p) => Number(p.price) || 0)
            .filter((n) => n > 0);

        const minPrice = prices.length > 0 ? Math.min(...prices) : 395;
        const maxPrice = prices.length > 0 ? Math.max(...prices) : 1200;
        const totalPhysicalAcUnits = inStockAcProducts.reduce(
            (sum, p) => sum + (Number(p.stock) || 0),
            0
        );

        return {
            products,
            acModels,
            inStockAcProducts,
            inStockAcCount: inStockAcProducts.length,
            totalAcModelCount: acModels.length,
            totalCatalogCount: products.length,
            totalPhysicalAcUnits,
            minPrice,
            maxPrice,
        };
    }, [products]);
}
