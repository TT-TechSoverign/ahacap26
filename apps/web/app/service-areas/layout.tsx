import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Oahu AC Repair & HVAC Service Areas | Affordable Home A/C',
    },
    description: 'Affordable Home A/C serves all of Oahu with expert AC repair, split AC installation, and window AC cleaning. View our service areas from Honolulu to Waipahu.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/service-areas',
    },
    openGraph: {
        title: 'Oahu AC Repair & HVAC Service Areas | Affordable Home A/C',
        description: 'Affordable Home A/C serves all of Oahu with expert AC repair, split AC installation, and window AC cleaning. View our service areas from Honolulu to Waipahu.',
        url: 'https://www.affordablehome-ac.com/service-areas',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Affordable Home A/C Logo',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Oahu AC Repair & HVAC Service Areas | Affordable Home A/C',
        description: 'Affordable Home A/C serves all of Oahu with expert AC repair, split AC installation, and window AC cleaning. View our service areas from Honolulu to Waipahu.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

export default function ServiceAreasLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
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
                                "name": "Service Areas",
                                "item": "https://www.affordablehome-ac.com/service-areas"
                            }
                        ]
                    })
                }}
            />
            {children}
        </>
    );
}
