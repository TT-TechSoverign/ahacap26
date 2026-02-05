'use client';

import { usePathname } from 'next/navigation';

export default function Ticker() {
    const pathname = usePathname();

    // Hide ticker on Puck editor pages
    if (pathname?.startsWith('/puck')) {
        return null;
    }

    return (
        <div className="fixed top-0 w-full z-[60] bg-primary text-white text-xs font-bold py-2 tracking-widest uppercase h-9 shadow-[0_0_20px_rgba(0,174,239,0.5)] overflow-hidden flex items-center">
            <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
                {Array(10).fill("⚠️ SYSTEM STATUS: AFFORDABLE HOME A/C IS CALIBRATING A NEW DIGITAL EXPERIENCE • RECHARGING REFRIGERANT • OPTIMIZING USER AIRFLOW • PRECISION COMFORT LOADING SOON ⚠️").map((text, i) => (
                    <span key={i} className="flex items-center gap-2">
                        {text}
                    </span>
                ))}
            </div>
        </div>
    );
}
