import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Window AC Cleaning Service & Maintenance Hawaii | Affordable Home A/C',
    description: 'Professional window ac cleaning service and ac cleaning hawaii. Extend unit lifespan, prevent rust, and eradicate mold with our specialized chemical teardowns.',
    alternates: {
        canonical: '/window_ac_maintenance',
    },
    openGraph: {
        title: 'Window AC Cleaning Service & Maintenance Hawaii | Affordable Home A/C',
        description: 'Professional window ac cleaning service and ac cleaning hawaii. Extend unit lifespan, prevent rust, and eradicate mold with our specialized chemical teardowns.',
        url: '/window_ac_maintenance',
        siteName: 'Affordable Home A/C',
        type: 'website',
    }
};

export default function WindowAcMaintenanceLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
