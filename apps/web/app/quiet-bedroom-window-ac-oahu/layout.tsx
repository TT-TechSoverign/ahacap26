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
            "name": "Why are traditional window ACs so loud in bedrooms?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Old-style single-speed window ACs cycle their compressors strictly on and off. Whenever room temperature rises, the compressor engages with a loud mechanical 'thunk' and runs at 100% capacity (58–64 dB), shuddering the window frame and waking light sleepers. LG Dual Inverter & GE Built-Ins use twin-rotary brushless motors that gently modulate speed, eliminating start-stop noise."
            }
        },
        {
            "@type": "Question",
            "name": "What does 44 decibels (dB) sound like?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "44 dB is quieter than a normal conversational voice (60 dB) and comparable to a quiet suburban library or light rain rustling leaves. You hear only a gentle, steady whoosh of cool conditioned air."
            }
        },
        {
            "@type": "Question",
            "name": "Can I run this unit on my existing bedroom outlet?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! All three bedroom models (6k, 8k, and 10k BTU) operate on standard 115V 15-amp household wall outlets. No special 230V wiring or expensive electrical upgrades are required."
            }
        },
        {
            "@type": "Question",
            "name": "Do these bedroom units qualify for the $45 Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Every model featured here is Energy Star certified and qualifies for a $45 Hawaii Energy cash rebate. We provide the official pre-approved application form PDF with your purchase."
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
