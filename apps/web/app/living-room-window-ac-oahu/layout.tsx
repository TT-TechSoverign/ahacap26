import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Living Room Window ACs Oahu ($695+ In-Stock) | 12k–23.5k BTU'
    },
    description: 'Cool open Oahu living rooms with in-stock 12,000–23,500 BTU LG Dual Inverter & GE Window ACs ($695–$1,200) in Waipahu. $45 Rebate & $0 Estimate • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/living-room-window-ac-oahu',
    },
    openGraph: {
        title: 'Living Room Window ACs Oahu ($695+ In-Stock) | 12k–23.5k BTU',
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
        title: 'Living Room Window ACs Oahu ($695+ In-Stock) | 12k–23.5k BTU',
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
        },
        {
            "@type": "Question",
            "name": "Do high-capacity living room Window ACs qualify for the $45 Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! All ENERGY STAR certified LG Dual Inverter cooling models—including 12,000 BTU (LW1222IVSM), 14,000 BTU (LW1522FVSM), 18,000 BTU (LW1822IVSM), and 23,500 BTU (LW2422IVSM)—qualify for the $45 Hawaii Energy cash rebate, and we include the official rebate PDF at checkout."
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

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/living-room-window-ac-oahu#collection",
            "url": "https://www.affordablehome-ac.com/living-room-window-ac-oahu",
            "name": "Living Room & Open-Concept Window ACs Oahu (12,000–23,500 BTU)",
            "description": "High-CFM 12,000, 14,000, 18,000, and 23,500 BTU LG Dual Inverter and GE Window ACs calibrated for Oahu living rooms and single-wall homes.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "Living Room & Open-Concept Window ACs Oahu (12,000–23,500 BTU) — Canonical Waipahu Models",
                "numberOfItems": 6,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "LG Dual Inverter 12,000 BTU (LW1222IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "LG Dual Inverter 14,000 BTU (LW1522FVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "LG Dual Inverter 18,000 BTU (LW1822IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/6-lg-dual-inverter-18-000-btu-lw1822ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "LG Dual Inverter 23,500 BTU (LW2422IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/7-lg-dual-inverter-23-500-btu-lw2422ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "name": "LG 12,000 BTU Standard WiFi (LW1217ERSM1)",
                        "url": "https://www.affordablehome-ac.com/shop/12-lg-12-000-btu-lw1217ersm1"
                    },
                    {
                        "@type": "ListItem",
                        "position": 6,
                        "name": "GE 12,000 BTU R-32 Inverter 26\" Built-In (AJCQ12AXXWA)",
                        "url": "https://www.affordablehome-ac.com/shop/15-ge-12-000-btu-ajcq12axxwa"
                    }
                ]
            }
        },
        {
            "@type": "HVACBusiness",
            "@id": "https://www.affordablehome-ac.com/living-room-window-ac-oahu#localbusiness",
            "parentOrganization": {
                "@id": "https://www.affordablehome-ac.com/#hvacbusiness"
            },
            "name": "Affordable Home A/C",
            "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
            "url": "https://www.affordablehome-ac.com",
            "telephone": "+1-808-488-1111",
            "priceRange": "$395 - $1,200",
            "slogan": "Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "94-150 Leoleo St. #203",
                "addressLocality": "Waipahu",
                "addressRegion": "HI",
                "postalCode": "96797",
                "addressCountry": "US"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "142",
                "bestRating": "5",
                "worstRating": "1"
            }
        }
    ]
};

export default function LivingRoomWindowAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(livingRoomFaqSchema).replace(/</g, '\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pass5RichSchema).replace(/</g, '\u003c') }}
            />
            {children}
        </>
    );
}
