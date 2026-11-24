import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: "In-Stock LG Window ACs Oahu ($395–$1,200) | Waipahu Direct",
    },
    description: "Shop all 12 LG Dual Inverter, Cool+Heat & Standard Window ACs ($395–$1,200) physically in stock in Waipahu, Oahu. $45 Rebate & $50 delivery • (808) 488-1111.",
    alternates: {
        canonical: "https://www.affordablehome-ac.com/shop/in-stock-lg-window-ac-oahu",
    },
    openGraph: {
        title: "In-Stock LG Window ACs Oahu ($395–$1,200) | Waipahu Direct",
        description: "Shop all 12 LG Dual Inverter, Cool+Heat & Standard Window ACs ($395–$1,200) physically in stock in Waipahu, Oahu. $45 Rebate & $50 delivery • (808) 488-1111.",
        url: "https://www.affordablehome-ac.com/shop/in-stock-lg-window-ac-oahu",
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
                width: 1600,
                height: 1000,
                alt: "In-Stock LG Dual Inverter, Cool+Heat and Standard Window ACs in Waipahu, Oahu",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "In-Stock LG Window ACs Oahu ($395–$1,200) | Waipahu Direct",
        description: "Shop all 12 LG Dual Inverter, Cool+Heat & Standard Window ACs ($395–$1,200) physically in stock in Waipahu, Oahu. $45 Rebate & $50 delivery • (808) 488-1111.",
        images: ["https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"],
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Where can I buy an LG Dual Inverter window air conditioner in stock on Oahu today?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Affordable Home A/C stocks factory-sealed LG Dual Inverter, LG Cool+Heat, and LG Standard window air conditioners ($395 to $1,200) directly at our central Waipahu warehouse (94-150 Leoleo St. #203, Waipahu, HI 96797). Order online at affordablehome-ac.com/shop or call (808) 488-1111 for free Waipahu pickup by appointment or $50 flat-rate Oahu delivery—with zero multi-week mainland freight delays."
            }
        },
        {
            "@type": "Question",
            "name": "Which LG window ACs in your Waipahu warehouse plug into a normal 115V household outlet?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Eight of our twelve LG models run on a standard 115V / 15-Amp 3-prong wall outlet (NEMA 5-15P) with zero 230V electrical rewiring: the LG Dual Inverter 6k (LW6023IVSM), 8k (LW8022IVSM), 10k (LW1022IVSM), 12k (LW1222IVSM), and 14k (LW1522FVSM — Oahu's highest-capacity 115V unit), plus the LG 7.6k Cool+Heat (LW8023HRSM) and LG Standard 8k (LW8024RD) and 12k (LW1217ERSM1)."
            }
        },
        {
            "@type": "Question",
            "name": "Which LG window ACs qualify for the $45 Hawaii Energy cash rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "All seven ENERGY STAR certified LG Dual Inverter models (LW6023IVSM, LW8022IVSM, LW1022IVSM, LW1222IVSM, LW1522FVSM, LW1822IVSM, and LW2422IVSM) qualify for the $45 Hawaii Energy cash rebate. Standard rotary (LW8024RD, LW1217ERSM1) and Cool+Heat (LW8023HRSM, LW1823HRSM, LW2423HRSM) units do not carry the inverter rebate."
            }
        },
        {
            "@type": "Question",
            "name": "Can your team install my LG window AC into Hawaiian jalousie glass louvers?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Request a $0 Free In-Home Estimate (By Appointment First, zero upfront deposit) and our insured Oahu cooling specialists will measure your opening, remove necessary jalousie glass slats, fabricate weather-tight infill panels, install exterior support brackets when needed, and protect your floors with drop cloths."
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
            "name": "In-Stock LG Window ACs Oahu",
            "item": "https://www.affordablehome-ac.com/shop/in-stock-lg-window-ac-oahu"
        }
    ]
};

const richEntitySchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/shop/in-stock-lg-window-ac-oahu#collection",
            "url": "https://www.affordablehome-ac.com/shop/in-stock-lg-window-ac-oahu",
            "name": "In-Stock LG Window ACs Oahu ($395–$1,200) | All 12 Waipahu Models",
            "description": "Shop all 12 LG Dual Inverter, Cool+Heat & Standard Window ACs ($395–$1,200) physically in stock in Waipahu, Oahu. $45 Rebate & $50 delivery • (808) 488-1111.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "Complete 12-Model LG Window AC Lineup — Waipahu Warehouse Oahu",
                "numberOfItems": 12,
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "LG Dual Inverter 6,000 BTU (LW6023IVSM)", "url": "https://www.affordablehome-ac.com/shop/1-lg-dual-inverter-6-000-btu-lw6023ivsm" },
                    { "@type": "ListItem", "position": 2, "name": "LG Dual Inverter 8,000 BTU (LW8022IVSM)", "url": "https://www.affordablehome-ac.com/shop/2-lg-dual-inverter-8-000-btu-lw8022ivsm" },
                    { "@type": "ListItem", "position": 3, "name": "LG Dual Inverter 10,000 BTU (LW1022IVSM)", "url": "https://www.affordablehome-ac.com/shop/3-lg-dual-inverter-10-000-btu-lw1022ivsm" },
                    { "@type": "ListItem", "position": 4, "name": "LG Dual Inverter 12,000 BTU (LW1222IVSM)", "url": "https://www.affordablehome-ac.com/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm" },
                    { "@type": "ListItem", "position": 5, "name": "LG Dual Inverter 14,000 BTU (LW1522FVSM)", "url": "https://www.affordablehome-ac.com/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm" },
                    { "@type": "ListItem", "position": 6, "name": "LG Dual Inverter 18,000 BTU (LW1822IVSM)", "url": "https://www.affordablehome-ac.com/shop/6-lg-dual-inverter-18-000-btu-lw1822ivsm" },
                    { "@type": "ListItem", "position": 7, "name": "LG Dual Inverter 23,500 BTU (LW2422IVSM)", "url": "https://www.affordablehome-ac.com/shop/7-lg-dual-inverter-23-500-btu-lw2422ivsm" },
                    { "@type": "ListItem", "position": 8, "name": "LG 7,600 BTU Cool + Heat (LW8023HRSM)", "url": "https://www.affordablehome-ac.com/shop/8-lg-7-600-btu-lw8023hrsm" },
                    { "@type": "ListItem", "position": 9, "name": "LG 18,000 BTU Cool + Heat (LW1823HRSM)", "url": "https://www.affordablehome-ac.com/shop/9-lg-18-000-btu-lw1823hrsm" },
                    { "@type": "ListItem", "position": 10, "name": "LG 23,000 BTU Cool + Heat (LW2423HRSM)", "url": "https://www.affordablehome-ac.com/shop/10-lg-23-000-btu-lw2423hrsm" },
                    { "@type": "ListItem", "position": 11, "name": "LG 8,000 BTU Standard (LW8024RD)", "url": "https://www.affordablehome-ac.com/shop/11-lg-8-000-btu-lw8024rd" },
                    { "@type": "ListItem", "position": 12, "name": "LG 12,000 BTU Standard WiFi (LW1217ERSM1)", "url": "https://www.affordablehome-ac.com/shop/12-lg-12-000-btu-lw1217ersm1" }
                ]
            }
        },
        {
            "@type": "HVACBusiness",
            "@id": "https://www.affordablehome-ac.com/shop/in-stock-lg-window-ac-oahu#localbusiness",
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

export default function InStockLgOahuLayout({ children }: { children: React.ReactNode }) {
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
