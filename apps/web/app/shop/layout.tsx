import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'In-Stock LG & GE Window ACs Oahu ($395–$1,200) | Waipahu Pickup & $45 Rebate',
    },
    description: '16 In-Stock LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200) in Waipahu, Oahu. Free pickup, $50 delivery, $45 Rebate & $0 Estimate • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop',
    },
    openGraph: {
        title: 'In-Stock LG & GE Window ACs Oahu ($395–$1,200) | Waipahu Pickup & $45 Rebate',
        description: '16 In-Stock LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200) in Waipahu, Oahu. Free pickup, $50 delivery, $45 Rebate & $0 Estimate • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/shop',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'In-Stock LG Dual Inverter & GE Window Air Conditioners in Waipahu, Oahu ($395–$1,200)',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'In-Stock LG & GE Window ACs Oahu ($395–$1,200) | Waipahu Pickup & $45 Rebate',
        description: '16 In-Stock LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200) in Waipahu, Oahu. Free pickup, $50 delivery, $45 Rebate & $0 Estimate • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
