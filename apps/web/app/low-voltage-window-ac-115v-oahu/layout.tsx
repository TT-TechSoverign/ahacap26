import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '115V Plug Window ACs Oahu ($395–$785) | 6k–14k BTU In-Stock'
    },
    description: 'In-Stock 115V 15-Amp LG & GE Window ACs (6,000–14,000 BTU, $395–$785) in Waipahu, Oahu. Plugs into standard outlets + $45 Hawaii Energy Rebate • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu',
    },
    openGraph: {
        title: '115V Plug Window ACs Oahu ($395–$785) | 6k–14k BTU In-Stock',
        description: 'In-Stock 115V 15-Amp LG & GE Window ACs (6,000–14,000 BTU, $395–$785) in Waipahu, Oahu. Plugs into standard outlets + $45 Hawaii Energy Rebate • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: '115V Window AC Units Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '115V Plug Window ACs Oahu ($395–$785) | 6k–14k BTU In-Stock',
        description: 'In-Stock 115V 15-Amp LG & GE Window ACs (6,000–14,000 BTU, $395–$785) in Waipahu, Oahu. Plugs into standard outlets + $45 Hawaii Energy Rebate • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const lowVoltageFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the largest BTU window AC that runs on a standard 115V outlet?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Thanks to LG Dual Inverter & GE Built-In variable-speed compressor technology, units up to 14,000 BTU (such as the LW1522FVSM) can operate on a standard 115V 15-amp circuit with a standard NEMA 5-15P plug, cooling up to 700 sq ft (AHAM) without requiring a 230V line."
            }
        },
        {
            "@type": "Question",
            "name": "Will a 115V Dual Inverter window AC trip my home's circuit breaker?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Traditional non-inverter units draw massive startup current spikes (often 30 to 40 amps for a split second) when the compressor kicks on, tripping older breakers. LG Dual Inverter & GE Built-Ins feature soft-start electronics that gradually ramp up power, virtually eliminating breaker trips."
            }
        },
        {
            "@type": "Question",
            "name": "Can I use an extension cord with a 115V window air conditioner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We strongly recommend plugging directly into a wall receptacle. If necessary, only use a heavy-duty, 14-gauge or 12-gauge appliance-rated extension cord rated for 15 amps to prevent overheating and voltage drop."
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
            "name": "115V Standard Plug Window ACs",
            "item": "https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu#collection",
            "url": "https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu",
            "name": "115V Standard Household Plug Window ACs Oahu (6,000–14,000 BTU, NEMA 5-15P)",
            "description": "All 115V / 15-Amp NEMA 5-15P LG & GE Window Air Conditioners ($395–$1,200) in stock in Waipahu that plug directly into standard Oahu 3-prong wall outlets.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "115V Standard Household Plug Window ACs Oahu (6,000–14,000 BTU, NEMA 5-15P) — Canonical Waipahu Models",
                "numberOfItems": 10,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "LG 8,000 BTU Standard (LW8024RD)",
                        "url": "https://www.affordablehome-ac.com/shop/11-lg-8-000-btu-lw8024rd"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "LG Dual Inverter 6,000 BTU (LW6023IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/1-lg-dual-inverter-6-000-btu-lw6023ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "LG Dual Inverter 8,000 BTU (LW8022IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/2-lg-dual-inverter-8-000-btu-lw8022ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "LG 7,600 BTU Cool + Heat (LW8023HRSM)",
                        "url": "https://www.affordablehome-ac.com/shop/8-lg-7-600-btu-lw8023hrsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "name": "LG Dual Inverter 10,000 BTU (LW1022IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/3-lg-dual-inverter-10-000-btu-lw1022ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 6,
                        "name": "LG 12,000 BTU Standard WiFi (LW1217ERSM1)",
                        "url": "https://www.affordablehome-ac.com/shop/12-lg-12-000-btu-lw1217ersm1"
                    },
                    {
                        "@type": "ListItem",
                        "position": 7,
                        "name": "LG Dual Inverter 12,000 BTU (LW1222IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 8,
                        "name": "LG Dual Inverter 14,000 BTU (LW1522FVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 9,
                        "name": "GE 8,200 BTU 26\" Built-In (AJCQ08AWJ)",
                        "url": "https://www.affordablehome-ac.com/shop/13-ge-8-200-btu-ajcq08awj"
                    },
                    {
                        "@type": "ListItem",
                        "position": 10,
                        "name": "GE 12,000 BTU R-32 Inverter 26\" Built-In (AJCQ12AXXWA)",
                        "url": "https://www.affordablehome-ac.com/shop/15-ge-12-000-btu-ajcq12axxwa"
                    }
                ]
            }
        },
        {
            "@type": "HVACBusiness",
            "@id": "https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu#localbusiness",
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

export default function LowVoltageAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(lowVoltageFaqSchema).replace(/</g, '\u003c') }}
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
