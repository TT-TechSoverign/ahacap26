import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Living Room Window ACs Oahu (12k–23.5k BTU In-Stock $695+) | Waipahu Pickup'
    },
    description: 'Cool open Oahu living rooms with in-stock 12,000–23,500 BTU LG Dual Inverter & GE Window ACs ($695–$1,200) in Waipahu. $45 Rebate & $0 Estimate • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/living-room-window-ac-oahu',
    },
    openGraph: {
        title: 'Living Room Window ACs Oahu (12k–23.5k BTU In-Stock $695+) | Waipahu Pickup',
        description: 'Cool open Oahu living rooms with in-stock 12,000–23,500 BTU LG Dual Inverter & GE Window ACs ($695–$1,200) in Waipahu. $45 Rebate & $0 Estimate • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/living-room-window-ac-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_6_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Living Room Window AC Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Living Room Window ACs Oahu (12k–23.5k BTU In-Stock $695+) | Waipahu Pickup',
        description: 'Cool open Oahu living rooms with in-stock 12,000–23,500 BTU LG Dual Inverter & GE Window ACs ($695–$1,200) in Waipahu. $45 Rebate & $0 Estimate • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_6_fit_cutaway.webp'],
    }
};

const livingRoomFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What size window AC do I need for a living room in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For a standard 400 to 550 sq. ft. living room, a 12,000 BTU unit (LW1222IVSM) is ideal. For open-concept living/dining rooms or homes with uninsulated single-wall construction and vaulted ceilings, 14,000 to 18,000 BTU is recommended to overcome midday thermal gain."
            }
        },
        {
            "@type": "Question",
            "name": "Can I run a 14,000 BTU window AC on a standard 115V wall outlet?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! The LG Dual Inverter 14,000 BTU (LW1522FVSM) runs on a standard 115V 15A wall plug. For 18,000 BTU and 23,500 BTU units, a dedicated 208/230V circuit is required."
            }
        }
    ]
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
            "name": "Oahu Window AC Shop",
            "item": "https://www.affordablehome-ac.com/shop"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Living Room Window ACs (12k\u201323.5k BTU)",
            "item": "https://www.affordablehome-ac.com/living-room-window-ac-oahu"
        }
    ]
};

export default function LivingRoomWindowAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(livingRoomFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
