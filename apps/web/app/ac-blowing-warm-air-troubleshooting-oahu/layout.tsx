import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Blowing Warm Air Oahu ($0 Estimate) | Repair or $395+ New AC'
    },
    description: '$0 Free Estimate • (808) 488-1111. Window AC blowing warm air on Oahu? Expert coil cleaning, capacitor checks & in-stock replacements ($395+).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu',
    },
    openGraph: {
        title: 'Window AC Blowing Warm Air Oahu ($0 Estimate) | Repair or $395+ New AC',
        description: '$0 Free Estimate • (808) 488-1111. Window AC blowing warm air on Oahu? Expert coil cleaning, capacitor checks & in-stock replacements ($395+).',
        url: 'https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Blowing Warm Air Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Blowing Warm Air Oahu ($0 Estimate) | Repair or $395+ New AC',
        description: '$0 Free Estimate • (808) 488-1111. Window AC blowing warm air on Oahu? Expert coil cleaning, capacitor checks & in-stock replacements ($395+).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const warmAirFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is my AC running but blowing warm room-temperature air on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most frequent causes on Oahu are: (1) A blown dual-run motor capacitor caused by island voltage spikes, (2) A refrigerant (Freon) leak due to salt-air coil pitting, (3) A severely clogged exterior condenser coil blocked by salt and dirt, or (4) A gecko shorting the inverter control board."
            }
        },
        {
            "@type": "Question",
            "name": "How much does it cost to have a technician diagnose warm air?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We provide on-site window AC troubleshooting and clean-vs-replace assessments across Oahu. An experienced technician tests electrical voltages, airflow, and compressor health, providing an upfront recommendation before any work begins."
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
            "name": "Window AC Blowing Warm Air Troubleshooting",
            "item": "https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu#service",
    "name": "Window AC Blowing Warm Air Oahu ($0 Estimate) | Repair or $395+ New AC",
    "serviceType": "Window AC Blowing Warm Air Oahu ($0 Estimate) | Repair or $395+ New AC",
    "url": "https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Window AC blowing warm air on Oahu? Expert coil cleaning, capacitor checks & in-stock replacements ($395+).",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu#localbusiness",
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
                    "@type": "Product",
                    "name": "In-Stock LG Dual Inverter & GE 26-Inch Built-In Window ACs ($395–$1,200)"
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

export default function AcBlowingWarmAirLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(warmAirFaqSchema) }}
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
