import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Short Cycling Oahu ($0 Estimate) | Fix Rapid On/Off Cycling'
    },
    description: '$0 Free Estimate • (808) 488-1111. Fix Oahu Window AC short cycling & airflow blocks, or upgrade to an in-stock LG Dual Inverter ($560+).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-turning-on-and-off-rapidly-short-cycling',
    },
    openGraph: {
        title: 'Window AC Short Cycling Oahu ($0 Estimate) | Fix Rapid On/Off Cycling',
        description: '$0 Free Estimate • (808) 488-1111. Fix Oahu Window AC short cycling & airflow blocks, or upgrade to an in-stock LG Dual Inverter ($560+).',
        url: 'https://www.affordablehome-ac.com/ac-turning-on-and-off-rapidly-short-cycling',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Turning On and Off Rapidly Short Cycling Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Short Cycling Oahu ($0 Estimate) | Fix Rapid On/Off Cycling',
        description: '$0 Free Estimate • (808) 488-1111. Fix Oahu Window AC short cycling & airflow blocks, or upgrade to an in-stock LG Dual Inverter ($560+).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const shortCyclingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is air conditioner short cycling?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Short cycling occurs when an air conditioner starts up, runs for only 2 to 5 minutes, shuts down abruptly before completing a full cooling cycle, and repeats this sequence continuously. This prevents proper room dehumidification and causes high electrical wear."
            }
        },
        {
            "@type": "Question",
            "name": "Can an oversized air conditioner cause short cycling in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. An oversized unit drops the sensible air temperature in a small room too rapidly without running long enough to remove moisture. This leaves your room feeling cold and clammy, encouraging mold growth while stressing the compressor."
            }
        },
        {
            "@type": "Question",
            "name": "How does Affordable Home A/C troubleshoot short cycling?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "During our on-site window AC evaluation, our technician tests temperature sensors (thermistors) with a digital multimeter, verifies coil temperature differentials, inspects capacitor capacitance, and calculates room thermal heat load."
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
            "name": "Window AC Repair & Assessment",
            "item": "https://www.affordablehome-ac.com/ac-repair-oahu"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Window AC Short-Cycling Fix",
            "item": "https://www.affordablehome-ac.com/ac-turning-on-and-off-rapidly-short-cycling"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-turning-on-and-off-rapidly-short-cycling#service",
    "name": "Window AC Short Cycling Oahu ($0 Estimate) | Fix Rapid On/Off Cycling",
    "serviceType": "Window AC Short Cycling Oahu ($0 Estimate) | Fix Rapid On/Off Cycling",
    "url": "https://www.affordablehome-ac.com/ac-turning-on-and-off-rapidly-short-cycling",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Fix Oahu Window AC short cycling & airflow blocks, or upgrade to an in-stock LG Dual Inverter ($560+).",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/ac-turning-on-and-off-rapidly-short-cycling#localbusiness",
        "name": "Affordable Home A/C",
        "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "142",
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": [
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Kimo M. — Waipahu, Oahu" },
                "datePublished": "2026-09-18",
                "reviewBody": "Technicians arrived on time, laid clean drop cloths under our window unit, and restored ice-cold airflow. Honest pricing and aloha service!",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            },
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "Leilani K. — Honolulu, Oahu" },
                "datePublished": "2026-10-02",
                "reviewBody": "Booked a $0 free estimate and upgraded our noisy old bedroom AC to an in-stock 44dB LG Dual Inverter with custom jalousie fitting.",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            },
            {
                "@type": "Review",
                "author": { "@type": "Person", "name": "David C. — Pearl City, Oahu" },
                "datePublished": "2026-10-14",
                "reviewBody": "Fast Waipahu warehouse pickup and expert Oahu window AC support. Qualified for the $45 Hawaii Energy rebate and cut our HECO bill immediately.",
                "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
            }
        ],
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
        }
    },
    "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Oahu, Hawaii"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Oahu Window AC Services & In-Stock Replacements",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "$0 Free In-Home Window AC Estimate & Clean-vs-Replace Assessment (By Appointment First)"
                },
                "price": "0.00",
                "priceCurrency": "USD"
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Waipahu Warehouse Direct LG & GE Window AC Replacement Supply ($395–$1,200)",
                    "description": "Factory-sealed LG Dual Inverter & GE 26-inch Built-In Window ACs in stock in Waipahu for free pickup by appointment, $50 Oahu delivery, or custom installation."
                },
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "minPrice": "395.00",
                    "maxPrice": "1200.00",
                    "priceCurrency": "USD"
                }
            }
        ]
    }
};

export default function ShortCyclingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(shortCyclingFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pass5RichSchema) }}
            />
            {children}
        </>
    );
}
