'use client';

import { usePathname } from 'next/navigation';
import Ticker from '../components/Ticker';

export default function TickerWrapper() {
    const pathname = usePathname();
    const isShopPage = pathname?.startsWith('/shop');

    if (isShopPage) return null;

    return <Ticker />;
}
