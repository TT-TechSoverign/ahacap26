import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'In-Stock Window Air Conditioners Oahu ($395–$1,200) | Waipahu Pickup & $50 Delivery | Affordable Home A/C',
    },
    description: 'Shop in-stock LG Dual Inverter (6,000–23,500 BTU, -$45 Rebate), LG Cool+Heat, and GE 26" Wall Sleeve window air conditioners in Oahu ($395–$1,200). Free Waipahu warehouse pickup, $50 flat delivery & professional installation.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/shop',
    },
    openGraph: {
        title: 'In-Stock Window Air Conditioners Oahu ($395–$1,200) | Waipahu Pickup & $50 Delivery | Affordable Home A/C',
        description: 'Shop in-stock LG Dual Inverter (6,000–23,500 BTU, -$45 Rebate), LG Cool+Heat, and GE 26" Wall Sleeve window air conditioners in Oahu ($395–$1,200). Free Waipahu warehouse pickup, $50 flat delivery & professional installation.',
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
        title: 'In-Stock Window Air Conditioners Oahu ($395–$1,200) | Waipahu Pickup & $50 Delivery | Affordable Home A/C',
        description: 'Shop in-stock LG Dual Inverter (6,000–23,500 BTU, -$45 Rebate), LG Cool+Heat, and GE 26" Wall Sleeve window air conditioners in Oahu ($395–$1,200). Free Waipahu warehouse pickup, $50 flat delivery & professional installation.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
