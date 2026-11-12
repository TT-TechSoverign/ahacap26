import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Commercial Window ACs Oahu ($395–$1,200 In-Stock) | Waipahu Warehouse'
    },
    description: 'In-Stock commercial LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200) in Waipahu, Oahu for offices, clinics & jobsite trailers • Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/commercial-window-ac-oahu',
    },
    openGraph: {
        title: 'Commercial Window ACs Oahu ($395–$1,200 In-Stock) | Waipahu Warehouse',
        description: 'In-Stock commercial LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200) in Waipahu, Oahu for offices, clinics & jobsite trailers • Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/commercial-window-ac-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Commercial Window AC Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Commercial Window ACs Oahu ($395–$1,200 In-Stock) | Waipahu Warehouse',
        description: 'In-Stock commercial LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200) in Waipahu, Oahu for offices, clinics & jobsite trailers • Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const commercialAcFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Do you provide window air conditioners for construction jobsite trailers on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Construction trailers and mobile offices are exposed to extreme sun and high heat. We supply durable, high-BTU window units (12,000 to 23,500 BTU) in stock for immediate jobsite pickup or delivery."
            }
        },
        {
            "@type": "Question",
            "name": "Can you provide commercial invoice billing for business accounts?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We work directly with general contractors, property managers, and commercial business accounts across Oahu, providing itemized invoices with Hawaii GET tax documentation."
            }
        },
        {
            "@type": "Question",
            "name": "Are commercial purchases eligible for the $45 Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Qualifying Energy Star certified window AC models are eligible for the $45 Hawaii Energy cash rebate on qualifying utility meters. We supply the pre-approved application form PDF."
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
            "name": "Commercial & Office Window ACs",
            "item": "https://www.affordablehome-ac.com/commercial-window-ac-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/commercial-window-ac-oahu#collection",
            "url": "https://www.affordablehome-ac.com/commercial-window-ac-oahu",
            "name": "Commercial, Office & Retail Heavy-Duty Window ACs Oahu ($745–$1,200)",
            "description": "Heavy-duty 12,000 to 23,500 BTU LG Dual Inverter, LG Cool+Heat, and GE 26-inch Built-In Window ACs in stock in Waipahu for Oahu offices, shops, and property managers.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "Commercial, Office & Retail Heavy-Duty Window ACs Oahu ($745–$1,200) — Canonical Waipahu Models",
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
                        "name": "LG 18,000 BTU Cool + Heat (LW1823HRSM)",
                        "url": "https://www.affordablehome-ac.com/shop/9-lg-18-000-btu-lw1823hrsm"
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
            "@id": "https://www.affordablehome-ac.com/commercial-window-ac-oahu#localbusiness",
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

export default function CommercialWindowAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(commercialAcFaqSchema).replace(/</g, '\u003c') }}
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
