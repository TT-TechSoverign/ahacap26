import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: "Portable AC vs Window AC in Hawaii | Single-Wall & HECO Math",
    },
    description: "Why Window ACs beat Portable Hose ACs in Hawaii single-wall & jalousie homes: negative pressure humidity, 44dB noise & 44.2¢/kWh HECO cost • (808) 488-1111.",
    alternates: {
        canonical: "https://www.affordablehome-ac.com/portable-ac-vs-window-ac-hawaii",
    },
    openGraph: {
        title: "Portable AC vs Window AC in Hawaii | Single-Wall & HECO Math",
        description: "Why Window ACs beat Portable Hose ACs in Hawaii single-wall & jalousie homes: negative pressure humidity, 44dB noise & 44.2¢/kWh HECO cost • (808) 488-1111.",
        url: "https://www.affordablehome-ac.com/portable-ac-vs-window-ac-hawaii",
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/compact-window-fit-cutaway.webp",
                width: 1600,
                height: 1000,
                alt: "Portable AC vs Window AC Comparison for Hawaii Jalousie and Single-Wall Homes",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Portable AC vs Window AC in Hawaii | Single-Wall & HECO Math",
        description: "Why Window ACs beat Portable Hose ACs in Hawaii single-wall & jalousie homes: negative pressure humidity, 44dB noise & 44.2¢/kWh HECO cost • (808) 488-1111.",
        images: ["https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/compact-window-fit-cutaway.webp"],
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Do you clean or repair portable air conditioners on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No—Affordable Home A/C specializes 100% in Window Air Conditioners and 26-inch Through-the-Wall Built-In Air Conditioners (sales, custom installation, and antimicrobial deep coil cleaning). Because portable hose units are sealed plastic floor appliances that cost nearly as much to disassemble as a brand-new $395 LG Window AC, upgrading to a window unit saves money immediately."
            }
        },
        {
            "@type": "Question",
            "name": "Can a window AC be installed in Hawaiian jalousie louver windows without permanent damage?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our technicians carefully slide the glass louver panes out of the clips in the lower section of the jalousie frame (leaving your panes intact so they can be reinstalled whenever you move out) and fabricate a weather-tight rigid panel around the new LG window AC."
            }
        },
        {
            "@type": "Question",
            "name": "Why does a 6,000 BTU LG Window AC cool better than a '10,000 BTU' portable AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Because a '10,000 BTU ASHRAE' single-hose portable AC actually delivers only ~5,500–6,500 BTU DOE SACC after subtracting exhaust-hose radiant heat and negative-pressure hot air infiltration. A 6,000 BTU LG LW6023IVSM keeps 100% of its heat outdoors and seals the window tight."
            }
        },
        {
            "@type": "Question",
            "name": "How much quieter is an LG Dual Inverter Window AC than a portable AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Sleep Mode, LG Dual Inverter Window ACs operate at 44 dBA—roughly 12 to 18 decibels quieter than a portable AC sitting on your bedroom floor. Because the decibel scale is logarithmic, a 10–12 dB reduction sounds less than half as loud to the human ear."
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
            "name": "Portable AC vs. Window AC in Hawaii",
            "item": "https://www.affordablehome-ac.com/portable-ac-vs-window-ac-hawaii"
        }
    ]
};

const richEntitySchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/portable-ac-vs-window-ac-hawaii#collection",
            "url": "https://www.affordablehome-ac.com/portable-ac-vs-window-ac-hawaii",
            "name": "Portable AC vs Window AC in Hawaii | Single-Wall & HECO Math",
            "description": "Why Window ACs beat Portable Hose ACs in Hawaii single-wall & jalousie homes: negative pressure humidity, 44dB noise & 44.2¢/kWh HECO cost • (808) 488-1111.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "Portable AC vs Window AC in Hawaii | Single-Wall & HECO Math — Waipahu Models",
                "numberOfItems": 5,
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
                        "name": "LG Dual Inverter 10,000 BTU (LW1022IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/3-lg-dual-inverter-10-000-btu-lw1022ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "LG Dual Inverter 12,000 BTU (LW1222IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "name": "GE 12,000 BTU R-32 Inverter 26\" Built-In (AJCQ12AXXWA)",
                        "url": "https://www.affordablehome-ac.com/shop/15-ge-12-000-btu-ajcq12axxwa"
                    }
                ]
            }
        },
        {
            "@type": "HVACBusiness",
            "@id": "https://www.affordablehome-ac.com/portable-ac-vs-window-ac-hawaii#localbusiness",
            "parentOrganization": {
                "@id": "https://www.affordablehome-ac.com/#hvacbusiness"
            },
            "name": "Affordable Home A/C",
            "image": "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/compact-window-fit-cutaway.webp",
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
