import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Large Room Window ACs Oahu (14,000–23,500 BTU) — $785–$1,025 | In-Stock Waipahu | Affordable Home A/C',
    },
    description: 'Shop high-capacity 14,000 BTU (115V), 18,000 BTU (230V), and 23,500 BTU (230V) LG Dual Inverter window air conditioners in stock in Waipahu, Oahu ($785–$1,025). Free warehouse pickup or $50 island delivery.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop/large-room-window-ac-oahu',
    },
    openGraph: {
        title: 'Large Room Window ACs Oahu (14,000–23,500 BTU) — $785–$1,025 | In-Stock Waipahu',
        description: 'High-capacity LG Dual Inverter window air conditioners for large Oahu living rooms and open floor plans. In stock in Waipahu for pickup or $50 delivery.',
        url: 'https://www.affordablehome-ac.com/shop/large-room-window-ac-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Large Room LG Dual Inverter Window ACs In-Stock Oahu',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Large Room Window ACs Oahu (14,000–23,500 BTU) — $785–$1,025 | In-Stock Waipahu',
        description: 'Shop 14k, 18k & 23.5k BTU LG Dual Inverter window ACs in stock in Waipahu, Oahu.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    },
};

export default function LargeRoomShopLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
