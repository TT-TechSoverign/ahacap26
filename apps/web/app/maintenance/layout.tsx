import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Maintenance Services Oahu | Affordable Home A/C'
    },
    description: 'Preventative AC maintenance, coil cleaning, and system tune-ups across Oahu. Licensed Hawaii contractor CT-36775.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/maintenance',
    },
    openGraph: {
        title: 'AC Maintenance Services Oahu | Affordable Home A/C',
        description: 'Preventative AC maintenance, coil cleaning, and system tune-ups across Oahu. Licensed Hawaii contractor CT-36775.',
        url: 'https://www.affordablehome-ac.com/maintenance',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Maintenance Oahu',
            }
        ]
    }
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.affordablehome-ac.com"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Maintenance",
            "item": "https://www.affordablehome-ac.com/maintenance"
        }
    ]
};

export default function MaintenanceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
