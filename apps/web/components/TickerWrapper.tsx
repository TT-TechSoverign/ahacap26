'use client';

import { usePathname } from 'next/navigation';
import Ticker from '../components/Ticker';

export default function TickerWrapper() {
    const pathname = usePathname();
    const isShopPage = pathname?.startsWith('/shop');
    const isAdminPage = pathname?.startsWith('/admin');

    if (isShopPage || isAdminPage) return null;

    return <Ticker />;
}
