'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';

const CartDrawer = dynamic(() => import('./CartDrawer'), { ssr: false });

export function LazyCartDrawerHost() {
    const { isOpen, items } = useCart();
    const [shouldMount, setShouldMount] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setShouldMount(true);
            return;
        }
        if (items.length > 0 && !shouldMount) {
            const timer = window.setTimeout(() => setShouldMount(true), 2500);
            return () => window.clearTimeout(timer);
        }
    }, [isOpen, items.length, shouldMount]);

    if (!shouldMount && !isOpen) return null;
    return <CartDrawer />;
}
