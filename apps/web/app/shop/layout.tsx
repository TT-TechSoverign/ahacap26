import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Window Air Conditioner Oahu & Shop Near Me | Affordable Home A/C',
    description: 'Looking for a window air conditioner Oahu? Our local ac shop near me stocks the LG Dual Inverter LW6023IVSM and provides professional window ac installation near me.',
    alternates: {
        canonical: '/shop',
    },
    openGraph: {
        title: 'Window Air Conditioner Oahu & Shop Near Me | Affordable Home A/C',
        description: 'Looking for a window air conditioner Oahu? Our local ac shop near me stocks the LG Dual Inverter LW6023IVSM and provides professional window ac installation near me.',
        url: '/shop',
        siteName: 'Affordable Home A/C',
        type: 'website',
    }
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
