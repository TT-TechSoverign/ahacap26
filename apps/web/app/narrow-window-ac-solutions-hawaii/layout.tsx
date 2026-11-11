import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Narrow Window ACs Oahu ($395+ In-Stock) | 19.6" Compact LG'
    },
    description: '$0 Free Estimate • (808) 488-1111. Need a compact Window AC for a narrow Oahu opening? Shop in-stock 19.6"-wide LG 6k–10k BTU units ($395–$650) in Waipahu.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/narrow-window-ac-solutions-hawaii',
    },
    openGraph: {
        title: 'Narrow Window ACs Oahu ($395+ In-Stock) | 19.6" Compact LG',
        description: '$0 Free Estimate • (808) 488-1111. Need a compact Window AC for a narrow Oahu opening? Shop in-stock 19.6"-wide LG 6k–10k BTU units ($395–$650) in Waipahu.',
        url: 'https://www.affordablehome-ac.com/narrow-window-ac-solutions-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Narrow Window AC Solutions Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Narrow Window ACs Oahu ($395+ In-Stock) | 19.6" Compact LG',
        description: '$0 Free Estimate • (808) 488-1111. Need a compact Window AC for a narrow Oahu opening? Shop in-stock 19.6"-wide LG 6k–10k BTU units ($395–$650) in Waipahu.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const narrowWindowFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the smallest window width that can fit an air conditioner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "By removing standard side accordion curtains and using our custom narrow-mounting brackets, our compact 6,000 BTU LG Dual Inverter or GE Built-In unit (chassis width 19.5 inches) can fit into window openings as narrow as 20 to 21 inches wide."
            }
        },
        {
            "@type": "Question",
            "name": "Can you install an AC in a tall, narrow slider or casement window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! For tall, skinny openings, we build custom acrylic or insulated vertical filler panels above the unit, sealing the vertical height while fitting the narrow width perfectly."
            }
        },
        {
            "@type": "Question",
            "name": "Does a narrow window AC provide enough cooling for an Oahu bedroom?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! A compact 6,000 to 8,000 BTU Dual Inverter unit delivers ample cooling power for bedrooms up to 350 sq ft, while running quietly at 44 dB."
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
            "name": "Window AC Installation",
            "item": "https://www.affordablehome-ac.com/window-ac-installation"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Narrow Window AC Fit Solutions",
            "item": "https://www.affordablehome-ac.com/narrow-window-ac-solutions-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/narrow-window-ac-solutions-hawaii#service",
    "name": "Narrow Window AC Solutions Oahu ($395+ In-Stock) | Compact 19.6\" LG Units",
    "serviceType": "Narrow Window AC Solutions Oahu ($395+ In-Stock) | Compact 19.6\" LG Units",
    "url": "https://www.affordablehome-ac.com/narrow-window-ac-solutions-hawaii",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Need a compact Window AC for a narrow Oahu opening? Shop in-stock 19.6\"-wide LG 6k–10k BTU units ($395–$650) in Waipahu.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/narrow-window-ac-solutions-hawaii#localbusiness",
        "parentOrganization": { "@id": "https://www.affordablehome-ac.com/#hvacbusiness" },
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

export default function NarrowWindowAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(narrowWindowFaqSchema) }}
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
