import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Not Cooling & Leak Check Oahu ($0 Estimate) | Swap From $395'
    },
    description: '$0 Free Estimate • (808) 488-1111. Sealed refrigerant loss in your Oahu Window AC? Get a $0 Clean-vs-Replace assessment or swap with an in-stock LG/GE ($395+).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-refrigerant-leak-detection-hawaii',
    },
    openGraph: {
        title: 'Window AC Not Cooling & Leak Check Oahu ($0 Estimate) | Swap From $395',
        description: '$0 Free Estimate • (808) 488-1111. Sealed refrigerant loss in your Oahu Window AC? Get a $0 Clean-vs-Replace assessment or swap with an in-stock LG/GE ($395+).',
        url: 'https://www.affordablehome-ac.com/ac-refrigerant-leak-detection-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Refrigerant Leak Detection Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Not Cooling & Leak Check Oahu ($0 Estimate) | Swap From $395',
        description: '$0 Free Estimate • (808) 488-1111. Sealed refrigerant loss in your Oahu Window AC? Get a $0 Clean-vs-Replace assessment or swap with an in-stock LG/GE ($395+).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const refrigerantLeakFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How can I tell if my window air conditioner has a refrigerant leak?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most common symptoms are partial ice forming on one corner of the front evaporator coil while the rest stays warm, the compressor running continuously without lowering the room temperature, or dark oily residue on the lower copper return bends."
            }
        },
        {
            "@type": "Question",
            "name": "Why shouldn't I pay to recharge a leaking window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Window air conditioners are factory brazed hermetically sealed loops without service ports. When coastal salt air corrodes thin copper return bends, brazing and recharging costs more than a brand-new factory-warranted LG Dual Inverter or GE window AC from our Waipahu warehouse."
            }
        },
        {
            "@type": "Question",
            "name": "How does Affordable Home A/C verify whether my unit is clogged or leaking refrigerant?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We inspect coil airflow, test compressor amp draw, measure temperature differential across the evaporator, and check for salt-pitted copper return bends so you know immediately whether your unit just needs a deep cleaning or a direct replacement."
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
            "name": "Sealed-System Refrigerant Leak vs Replacement",
            "item": "https://www.affordablehome-ac.com/ac-refrigerant-leak-detection-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-refrigerant-leak-detection-hawaii#service",
    "name": "Window AC Not Cooling & Leak Check Oahu ($0 Estimate) | Swap From $395",
    "serviceType": "Window AC Not Cooling & Leak Check Oahu ($0 Estimate) | Swap From $395",
    "url": "https://www.affordablehome-ac.com/ac-refrigerant-leak-detection-hawaii",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Sealed refrigerant loss in your Oahu Window AC? Get a $0 Clean-vs-Replace assessment or swap with an in-stock LG/GE ($395+).",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/ac-refrigerant-leak-detection-hawaii#localbusiness",
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

export default function RefrigerantLeakLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(refrigerantLeakFaqSchema) }}
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
