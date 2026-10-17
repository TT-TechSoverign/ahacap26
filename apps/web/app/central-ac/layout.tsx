import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Central Air Conditioning Services Oahu | Affordable Home A/C',
    description: 'Central air conditioning diagnostics, replacement, and high-efficiency ductless mini-split or window AC upgrades in Oahu, Hawaii. License CT-36775.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/central-ac',
    },
};

export default function CentralAcLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
