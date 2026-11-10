import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Storefront Admin Command Deck | Affordable Home A/C'
    },
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/admin',
    },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
