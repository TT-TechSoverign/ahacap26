import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Checkout | Affordable Home A/C'
    },
    description: 'Secure checkout for in-stock LG Dual Inverter window air conditioners. Waipahu warehouse pickup or $50 flat island delivery.',
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/checkout',
    }
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
