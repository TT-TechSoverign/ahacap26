import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Studio & Apartment Window ACs Oahu ($395–$650) | 44dB LG'
    },
    description: 'In-Stock compact 6,000–10,000 BTU LG & GE Window ACs ($395–$650) for Honolulu studios & Waikiki apartments. 115V plug, 44dB quiet & $45 Rebate • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-for-studios-apartments-hawaii',
    },
    openGraph: {
        title: 'Studio & Apartment Window ACs Oahu ($395–$650) | 44dB LG',
        description: 'In-Stock compact 6,000–10,000 BTU LG & GE Window ACs ($395–$650) for Honolulu studios & Waikiki apartments. 115V plug, 44dB quiet & $45 Rebate • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/window-ac-for-studios-apartments-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC for Studios and Apartments Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Studio & Apartment Window ACs Oahu ($395–$650) | 44dB LG',
        description: 'In-Stock compact 6,000–10,000 BTU LG & GE Window ACs ($395–$650) for Honolulu studios & Waikiki apartments. 115V plug, 44dB quiet & $45 Rebate • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp'],
    }
};

const studioApartmentFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What size window AC is best for a studio apartment on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For typical Honolulu studio apartments ranging from 350 to 550 sq ft, an 8,000 to 10,000 BTU LG Dual Inverter or GE Built-In unit is ideal. It provides sufficient cooling capacity for island humidity while running on a standard 115V circuit."
            }
        },
        {
            "@type": "Question",
            "name": "Why is low decibel sound important in a studio apartment?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In a studio apartment, your living room, home office, and bed are in the same room. A traditional loud window AC (55+ dB) makes sleeping or watching TV difficult. Our 44 dB Dual Inverter units run at a gentle whisper."
            }
        },
        {
            "@type": "Question",
            "name": "Can I install this in a rental apartment without damaging the window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our technicians use non-destructive compression brackets and foam gaskets that protect window sills and frames, making removal easy when moving out so your security deposit is protected."
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
            "name": "Studio & Apartment Window ACs",
            "item": "https://www.affordablehome-ac.com/window-ac-for-studios-apartments-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/window-ac-for-studios-apartments-hawaii#collection",
            "url": "https://www.affordablehome-ac.com/window-ac-for-studios-apartments-hawaii",
            "name": "Studio & Apartment Window Air Conditioners Hawaii ($395–$1,200)",
            "description": "Compact 115V window and 26-inch condo wall-sleeve air conditioners in stock in Waipahu for Honolulu studios, walk-up apartments, and townhomes.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "Studio & Apartment Window Air Conditioners Hawaii ($395–$1,200) — Canonical Waipahu Models",
                "numberOfItems": 7,
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
                        "name": "LG 7,600 BTU Cool + Heat (LW8023HRSM)",
                        "url": "https://www.affordablehome-ac.com/shop/8-lg-7-600-btu-lw8023hrsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 6,
                        "name": "GE 8,200 BTU 26\" Built-In (AJCQ08AWJ)",
                        "url": "https://www.affordablehome-ac.com/shop/13-ge-8-200-btu-ajcq08awj"
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
            "@id": "https://www.affordablehome-ac.com/window-ac-for-studios-apartments-hawaii#localbusiness",
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

export default function StudioApartmentAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(studioApartmentFaqSchema).replace(/</g, '\u003c') }}
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
