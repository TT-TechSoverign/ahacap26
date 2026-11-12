import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: "Window AC HECO Electricity Cost Hawaii (44.2¢/kWh) | $424/Yr",
    },
    description: "Monthly Hawaiian Electric (HECO ~44.2¢/kWh) cost & wattage chart for 6,000–23,500 BTU Window ACs. Save ~$424/yr + $45 Rebate in Oahu • (808) 488-1111.",
    alternates: {
        canonical: "https://www.affordablehome-ac.com/window-ac-electricity-cost-heco-calculator-hawaii",
    },
    openGraph: {
        title: "Window AC HECO Electricity Cost Hawaii (44.2¢/kWh) | $424/Yr",
        description: "Monthly Hawaiian Electric (HECO ~44.2¢/kWh) cost & wattage chart for 6,000–23,500 BTU Window ACs. Save ~$424/yr + $45 Rebate in Oahu • (808) 488-1111.",
        url: "https://www.affordablehome-ac.com/window-ac-electricity-cost-heco-calculator-hawaii",
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
                width: 1600,
                height: 1000,
                alt: "Hawaiian Electric HECO Window AC Monthly Cost and Wattage Chart Oahu",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Window AC HECO Electricity Cost Hawaii (44.2¢/kWh) | $424/Yr",
        description: "Monthly Hawaiian Electric (HECO ~44.2¢/kWh) cost & wattage chart for 6,000–23,500 BTU Window ACs. Save ~$424/yr + $45 Rebate in Oahu • (808) 488-1111.",
        images: ["https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"],
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much does it cost per month to run a 12,000 BTU window AC in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "At Hawaiian Electric's ~44.2¢/kWh Oahu residential rate, running an ENERGY STAR 12,000 BTU LG Dual Inverter (LW1222IVSM, 15.0 CEER) for 8 hours a day typically costs around $58 to $68 per month because the variable-speed compressor throttles down after initial pull-down. By contrast, an older 9.8 CEER fixed-speed 12,000 BTU unit often costs $95 to $110+ per month for the same room."
            }
        },
        {
            "@type": "Question",
            "name": "How many watts does a 6,000 or 8,000 BTU LG Dual Inverter draw?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "At full pull-down capacity, a 6,000 BTU LG LW6023IVSM draws roughly 510 watts (5.5 amps rated at 115V), and an 8,000 BTU LW8022IVSM draws roughly 660 watts (8.9 amps rated). Once the bedroom reaches temperature overnight, both throttle down into the 220W–380W range."
            }
        },
        {
            "@type": "Question",
            "name": "Is it cheaper on HECO to leave an inverter window AC on 24/7 or turn it off when nobody is home?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In uninsulated single-wall Hawaii homes, turning the unit OFF while the house is empty for 6+ hours—and using LG ThinQ Wi-Fi to turn it on 20 minutes before arriving home—saves substantially more electricity than fighting midday solar heat gain all afternoon in an empty house."
            }
        },
        {
            "@type": "Question",
            "name": "Which in-stock models qualify for the $45 Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "All 7 LG Dual Inverter models (LW6023IVSM, LW8022IVSM, LW1022IVSM, LW1222IVSM, LW1522FVSM, LW1822IVSM, LW2422IVSM) plus the GE 12,000 BTU R-32 Variable-Speed Built-In (AJCQ12AXXWA) qualify for the $45 Hawaii Energy cash rebate."
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
            "name": "$45 Hawaii Energy Rebate",
            "item": "https://www.affordablehome-ac.com/hawaii-energy-rebate"
        },
        {
            "@type": "ListItem",
            "position": 4,
            "name": "HECO Electricity Cost & Wattage Guide",
            "item": "https://www.affordablehome-ac.com/window-ac-electricity-cost-heco-calculator-hawaii"
        }
    ]
};

const richEntitySchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/window-ac-electricity-cost-heco-calculator-hawaii#collection",
            "url": "https://www.affordablehome-ac.com/window-ac-electricity-cost-heco-calculator-hawaii",
            "name": "Window AC HECO Electricity Cost Hawaii (44.2¢/kWh) | $424/Yr",
            "description": "Monthly Hawaiian Electric (HECO ~44.2¢/kWh) cost & wattage chart for 6,000–23,500 BTU Window ACs. Save ~$424/yr + $45 Rebate in Oahu • (808) 488-1111.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "Window AC HECO Electricity Cost Hawaii (44.2¢/kWh) | $424/Yr — Waipahu Models",
                "numberOfItems": 7,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "LG Dual Inverter 6,000 BTU (LW6023IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/1-lg-dual-inverter-6-000-btu-lw6023ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "LG Dual Inverter 10,000 BTU (LW1022IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/3-lg-dual-inverter-10-000-btu-lw1022ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "LG Dual Inverter 12,000 BTU (LW1222IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "LG Dual Inverter 14,000 BTU (LW1522FVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "name": "LG Dual Inverter 18,000 BTU (LW1822IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/6-lg-dual-inverter-18-000-btu-lw1822ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 6,
                        "name": "LG Dual Inverter 23,500 BTU (LW2422IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/7-lg-dual-inverter-23-500-btu-lw2422ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 7,
                        "name": "GE 12,000 BTU R-32 Inverter 26\" Built-In (AJCQ12AXXWA)",
                        "url": "https://www.affordablehome-ac.com/shop/15-ge-12-000-btu-ajcq12axxwa"
                    }
                ]
            }
        },
        {
            "@type": "HVACBusiness",
            "@id": "https://www.affordablehome-ac.com/window-ac-electricity-cost-heco-calculator-hawaii#localbusiness",
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
