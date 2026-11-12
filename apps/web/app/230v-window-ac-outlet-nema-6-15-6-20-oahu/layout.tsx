import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: "230V Window AC Outlet Guide Oahu (NEMA 6-15 & 6-20) | 18k–24k",
    },
    description: "Visual Oahu guide to 208V/230V Window AC plugs (NEMA 6-15P 15A vs 6-20P 20A) for 18,000 & 23,500 BTU LG units, plus 14k BTU 115V option • (808) 488-1111.",
    alternates: {
        canonical: "https://www.affordablehome-ac.com/230v-window-ac-outlet-nema-6-15-6-20-oahu",
    },
    openGraph: {
        title: "230V Window AC Outlet Guide Oahu (NEMA 6-15 & 6-20) | 18k–24k",
        description: "Visual Oahu guide to 208V/230V Window AC plugs (NEMA 6-15P 15A vs 6-20P 20A) for 18,000 & 23,500 BTU LG units, plus 14k BTU 115V option • (808) 488-1111.",
        url: "https://www.affordablehome-ac.com/230v-window-ac-outlet-nema-6-15-6-20-oahu",
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp",
                width: 1600,
                height: 1000,
                alt: "208V and 230V NEMA 6-15P and 6-20P Window AC Outlet Guide Oahu Hawaii",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "230V Window AC Outlet Guide Oahu (NEMA 6-15 & 6-20) | 18k–24k",
        description: "Visual Oahu guide to 208V/230V Window AC plugs (NEMA 6-15P 15A vs 6-20P 20A) for 18,000 & 23,500 BTU LG units, plus 14k BTU 115V option • (808) 488-1111.",
        images: ["https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp"],
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the difference between a NEMA 6-15P and NEMA 6-20P window AC plug?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Both are 208/230-volt grounded 3-prong plugs, but NEMA 6-15P (15-Amp, used on our LG LW1822IVSM and LW2422IVSM Dual Inverters) has two flat horizontal blades (— —). NEMA 6-20P (20-Amp, used on our LG LW1823HRSM and LW2423HRSM Cool+Heat units) has one vertical blade and one horizontal blade, requiring a 20-amp T-slot wall outlet."
            }
        },
        {
            "@type": "Question",
            "name": "Will a 230V LG Dual Inverter work on a 208V Honolulu condo circuit?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! All four of our large-capacity LG units (LW1822IVSM, LW2422IVSM, LW1823HRSM, and LW2423HRSM) are factory rated for 208/230V 60Hz operation, making them 100% compatible with Honolulu high-rise 208V building power."
            }
        },
        {
            "@type": "Question",
            "name": "Can Affordable Home A/C install a new 230V outlet or breaker for me?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We specialize strictly in Window AC sales, mounting, custom window sealing, and coil cleaning; dedicated 208/230V electrical circuit additions or receptacle conversions are performed by licensed electrical subcontractors."
            }
        },
        {
            "@type": "Question",
            "name": "What is the biggest window AC that runs on a regular 115V outlet?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The 14,000 BTU LG Dual Inverter LW1522FVSM ($785, in stock at our Waipahu warehouse) is our highest-BTU model that plugs into a standard 115-volt, 15-amp NEMA 5-15R household outlet."
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
            "name": "Shop Window ACs",
            "item": "https://www.affordablehome-ac.com/shop"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Window AC Plug Guide",
            "item": "https://www.affordablehome-ac.com/shop/window-ac-plug-guide"
        },
        {
            "@type": "ListItem",
            "position": 4,
            "name": "208V/230V NEMA 6-15 & 6-20 Outlet Guide",
            "item": "https://www.affordablehome-ac.com/230v-window-ac-outlet-nema-6-15-6-20-oahu"
        }
    ]
};

const richEntitySchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/230v-window-ac-outlet-nema-6-15-6-20-oahu#collection",
            "url": "https://www.affordablehome-ac.com/230v-window-ac-outlet-nema-6-15-6-20-oahu",
            "name": "230V Window AC Outlet Guide Oahu (NEMA 6-15 & 6-20) | 18k–24k",
            "description": "Visual Oahu guide to 208V/230V Window AC plugs (NEMA 6-15P 15A vs 6-20P 20A) for 18,000 & 23,500 BTU LG units, plus 14k BTU 115V option • (808) 488-1111.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "230V Window AC Outlet Guide Oahu (NEMA 6-15 & 6-20) | 18k–24k — Waipahu Models",
                "numberOfItems": 5,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "LG Dual Inverter 18,000 BTU (LW1822IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/6-lg-dual-inverter-18-000-btu-lw1822ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "LG Dual Inverter 23,500 BTU (LW2422IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/7-lg-dual-inverter-23-500-btu-lw2422ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "LG 18,000 BTU Cool + Heat (LW1823HRSM)",
                        "url": "https://www.affordablehome-ac.com/shop/9-lg-18-000-btu-lw1823hrsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "LG 23,000 BTU Cool + Heat (LW2423HRSM)",
                        "url": "https://www.affordablehome-ac.com/shop/10-lg-23-000-btu-lw2423hrsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "name": "LG Dual Inverter 14,000 BTU (LW1522FVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm"
                    }
                ]
            }
        },
        {
            "@type": "HVACBusiness",
            "@id": "https://www.affordablehome-ac.com/230v-window-ac-outlet-nema-6-15-6-20-oahu#localbusiness",
            "parentOrganization": {
                "@id": "https://www.affordablehome-ac.com/#hvacbusiness"
            },
            "name": "Affordable Home A/C",
            "image": "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/heavy-duty-window-fit-cutaway.webp",
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
            "areaServed": {
                "@type": "AdministrativeArea",
                "name": "Oahu, Hawaii"
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

export default function PillarRouteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(richEntitySchema).replace(/</g, '\\u003c') }}
            />
            {children}
        </>
    );
}
