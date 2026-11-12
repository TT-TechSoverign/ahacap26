import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '14k–23.5k BTU Large Window ACs Oahu ($785–$1,025) | In-Stock',
    },
    description: 'In-Stock 14k (115V), 18k & 23.5k BTU (230V) LG Dual Inverter Window ACs ($785–$1,025) in Waipahu, Oahu. $45 Rebate & $50 delivery • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop/large-room-window-ac-oahu',
    },
    openGraph: {
        title: '14k–23.5k BTU Large Window ACs Oahu ($785–$1,025) | In-Stock',
        description: 'In-Stock 14k (115V), 18k & 23.5k BTU (230V) LG Dual Inverter Window ACs ($785–$1,025) in Waipahu, Oahu. $45 Rebate & $50 delivery • (808) 488-1111.',
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
        title: '14k–23.5k BTU Large Window ACs Oahu ($785–$1,025) | In-Stock',
        description: 'In-Stock 14k (115V), 18k & 23.5k BTU (230V) LG Dual Inverter Window ACs ($785–$1,025) in Waipahu, Oahu. $45 Rebate & $50 delivery • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    },
};

export default function LargeRoomShopLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
