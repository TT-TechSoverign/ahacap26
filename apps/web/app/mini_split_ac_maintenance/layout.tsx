import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Ductless Mini Split AC Cleaning & Maintenance | Affordable Home A/C',
    description: 'Looking for a mini split cleaning service? We provide expert ductless ac maintenance hawaii to keep your split system mold-free, efficient, and running quiet.',
    alternates: {
        canonical: '/mini_split_ac_maintenance',
    },
    openGraph: {
        title: 'Ductless Mini Split AC Cleaning & Maintenance | Affordable Home A/C',
        description: 'Looking for a mini split cleaning service? We provide expert ductless ac maintenance hawaii to keep your split system mold-free, efficient, and running quiet.',
        url: '/mini_split_ac_maintenance',
        siteName: 'Affordable Home A/C',
        type: 'website',
    }
};

export default function MiniSplitAcMaintenanceLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
