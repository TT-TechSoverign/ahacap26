import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Quiet 44dB Bedroom Window AC Oahu ($560+) | $45 Rebate'
    },
    description: 'In-Stock 44dB ultra-quiet LG Dual Inverter bedroom Window ACs ($560–$595) in Waipahu, Oahu. Standard 115V plug, $45 Rebate & $50 delivery • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/quiet-bedroom-window-ac-oahu',
    },
    openGraph: {
        title: 'Quiet 44dB Bedroom Window AC Oahu ($560+) | $45 Rebate',
        description: 'In-Stock 44dB ultra-quiet LG Dual Inverter bedroom Window ACs ($560–$595) in Waipahu, Oahu. Standard 115V plug, $45 Rebate & $50 delivery • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/quiet-bedroom-window-ac-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Quiet Bedroom Window AC Oahu 44dB',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Quiet 44dB Bedroom Window AC Oahu ($560+) | $45 Rebate',
        description: 'In-Stock 44dB ultra-quiet LG Dual Inverter bedroom Window ACs ($560–$595) in Waipahu, Oahu. Standard 115V plug, $45 Rebate & $50 delivery • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const bedroomFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How quiet is an LG Dual Inverter & GE window AC in a bedroom?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Sleep Mode, LG Dual Inverter 6,000 and 8,000 BTU models operate at just 44 decibels (dB)—as quiet as a quiet library or a gentle rain shower. Unlike traditional units that clatter and shudder when the compressor kicks on, the Dual Inverter variable-speed motor ramps up and down smoothly with zero sudden start-stop clangs."
            }
        },
        {
            "@type": "Question",
            "name": "How much electricity does a quiet window AC use overnight on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "At HECO's residential rate of ~44.2¢/kWh, running an LG Dual Inverter 8 hours overnight typically consumes only 2.0 to 2.4 kWh, which amounts to approximately $0.90 to $1.06 per night. Older single-speed window ACs draw over 2.5x more power."
            }
        },
        {
            "@type": "Question",
            "name": "Does this quiet bedroom unit qualify for a Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Both the 6,000 BTU (LW6023IVSM) and 8,000 BTU (LW8022IVSM) are Energy Star certified and qualify for the $45 Hawaii Energy cash rebate."
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
            "name": "Quiet Bedroom Window ACs (42 dBA)",
            "item": "https://www.affordablehome-ac.com/quiet-bedroom-window-ac-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/quiet-bedroom-window-ac-oahu#collection",
            "url": "https://www.affordablehome-ac.com/quiet-bedroom-window-ac-oahu",
            "name": "Ultra-Quiet 44 dB Bedroom Window Air Conditioners Oahu ($560–$745)",
            "description": "Whisper-quiet 44 dBA Sleep Mode LG Dual Inverter and 48 dBA GE R-32 Inverter bedroom window ACs in stock at our Waipahu warehouse.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "Ultra-Quiet 44 dB Bedroom Window Air Conditioners Oahu ($560–$745) — Canonical Waipahu Models",
                "numberOfItems": 5,
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
                        "name": "LG Dual Inverter 8,000 BTU (LW8022IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/2-lg-dual-inverter-8-000-btu-lw8022ivsm"
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
            "@id": "https://www.affordablehome-ac.com/quiet-bedroom-window-ac-oahu#localbusiness",
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

export default function QuietBedroomWindowAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(bedroomFaqSchema).replace(/</g, '\u003c') }}
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
