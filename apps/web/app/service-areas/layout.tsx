import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '22 Oahu Window AC Service Areas ($0 Estimate) | In-Stock ACs ($395+), Install & Clean',
    },
    description: '$0 Free Estimate across all 22 Oahu cities • (808) 488-1111. In-stock LG & GE Window ACs ($395–$1,200, Waipahu pickup / $50 delivery), install & deep cleaning.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/service-areas',
    },
    openGraph: {
        title: '22 Oahu Window AC Service Areas ($0 Estimate) | In-Stock ACs ($395+), Install & Clean',
        description: '$0 Free Estimate across all 22 Oahu cities • (808) 488-1111. In-stock LG & GE Window ACs ($395–$1,200, Waipahu pickup / $50 delivery), install & deep cleaning.',
        url: 'https://www.affordablehome-ac.com/service-areas',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: '22 Oahu Window AC Service Areas — Affordable Home A/C',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '22 Oahu Window AC Service Areas ($0 Estimate) | In-Stock ACs ($395+), Install & Clean',
        description: '$0 Free Estimate across all 22 Oahu cities • (808) 488-1111. In-stock LG & GE Window ACs ($395–$1,200, Waipahu pickup / $50 delivery), install & deep cleaning.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const serviceAreasFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Which Oahu cities does Affordable Home A/C serve?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Affordable Home A/C serves all 22 Oahu communities across Metro Honolulu, Central Oahu, Leeward/West Oahu, Windward Oahu, East Honolulu, and the North Shore—including Honolulu, Waipahu, Kapolei, Ewa Beach, Mililani, Pearl City, Aiea, Kailua, Kaneohe, and Hawaii Kai."
            }
        },
        {
            "@type": "Question",
            "name": "How much is island-wide Window AC delivery or Waipahu warehouse pickup?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Waipahu warehouse pickup at 94-150 Leoleo St. #203 is $0 (free by appointment), and island-wide residential delivery across all 22 Oahu service areas is a flat $50."
            }
        }
    ]
};

export default function ServiceAreasLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceAreasFaqSchema) }}
            />
            {children}
        </>
    );
}
