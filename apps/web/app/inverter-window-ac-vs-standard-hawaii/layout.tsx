import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Inverter vs Standard Window AC Oahu ($395+) | Save $424/yr'
    },
    description: 'Compare 44dB LG Dual Inverter & GE R-32 Inverter Window ACs vs standard units in Hawaii. Save 40% on HECO bills + claim a $45 Rebate in Waipahu • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/inverter-window-ac-vs-standard-hawaii',
    },
    openGraph: {
        title: 'Inverter vs Standard Window AC Oahu ($395+) | Save $424/yr',
        description: 'Compare 44dB LG Dual Inverter & GE R-32 Inverter Window ACs vs standard units in Hawaii. Save 40% on HECO bills + claim a $45 Rebate in Waipahu • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/inverter-window-ac-vs-standard-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Dual Inverter vs Standard Window AC Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Inverter vs Standard Window AC Oahu ($395+) | Save $424/yr',
        description: 'Compare 44dB LG Dual Inverter & GE R-32 Inverter Window ACs vs standard units in Hawaii. Save 40% on HECO bills + claim a $45 Rebate in Waipahu • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const inverterVsStandardFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does an inverter window AC differ from a traditional window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A standard AC compressor operates at only one speed: 100% full blast or completely OFF. When your room warms up, it turns on with a loud clunk, overcools, and shuts down. A Dual Inverter compressor uses variable-speed twin rotaries that continuously modulate speed from 20% to 100%, maintaining a perfectly constant room temperature while consuming far less electricity."
            }
        },
        {
            "@type": "Question",
            "name": "Is an inverter window AC really worth the higher upfront price in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, absolutely. Because Hawaii has the highest electricity rates in the nation (~44.2¢/kWh), the 35% to 40% energy reduction of an inverter window AC saves \$25 to \$60 every single month. In just 6 to 9 months of island operation, the energy savings completely offset the price difference."
            }
        },
        {
            "@type": "Question",
            "name": "How much quieter is a Dual Inverter window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Standard window ACs typically produce 55 to 60 dB of noise, similar to a loud conversation or dishwasher. LG Dual Inverter & GE units run at just 44 dB in sleep mode—quieter than a library whisper—and eliminate the loud mechanical kick every time the compressor cycles."
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
            "name": "Dual Inverter vs Standard Window AC",
            "item": "https://www.affordablehome-ac.com/inverter-window-ac-vs-standard-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/inverter-window-ac-vs-standard-hawaii#collection",
            "url": "https://www.affordablehome-ac.com/inverter-window-ac-vs-standard-hawaii",
            "name": "Dual Inverter vs. Standard Fixed-Speed Window ACs in Hawaii (HECO 44.2c/kWh Comparison)",
            "description": "Engineering comparison of variable-speed LG Dual Inverter & GE R-32 Inverter Window ACs ($560–$1,200) vs budget fixed-speed LG models ($395–$625) on Oahu.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "Dual Inverter vs. Standard Fixed-Speed Window ACs in Hawaii (HECO 44.2c/kWh Comparison) — Canonical Waipahu Models",
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
                        "name": "LG 12,000 BTU Standard WiFi (LW1217ERSM1)",
                        "url": "https://www.affordablehome-ac.com/shop/12-lg-12-000-btu-lw1217ersm1"
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
            "@id": "https://www.affordablehome-ac.com/inverter-window-ac-vs-standard-hawaii#localbusiness",
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

export default function InverterVsStandardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(inverterVsStandardFaqSchema).replace(/</g, '\u003c') }}
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
