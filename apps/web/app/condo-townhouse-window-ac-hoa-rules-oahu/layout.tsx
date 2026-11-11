import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Oahu Condo Window AC HOA Guide ($395+) | 44dB LG & 26" GE'
    },
    description: '$0 Free Estimate • (808) 488-1111. HOA-compliant 44dB LG Dual Inverter & GE 26" Built-In Through-the-Wall ACs ($395–$1,200) in stock in Waipahu, Oahu.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/condo-townhouse-window-ac-hoa-rules-oahu',
    },
    openGraph: {
        title: 'Oahu Condo Window AC HOA Guide ($395+) | 44dB LG & 26" GE',
        description: '$0 Free Estimate • (808) 488-1111. HOA-compliant 44dB LG Dual Inverter & GE 26" Built-In Through-the-Wall ACs ($395–$1,200) in stock in Waipahu, Oahu.',
        url: 'https://www.affordablehome-ac.com/condo-townhouse-window-ac-hoa-rules-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Condo Townhouse Window AC HOA Rules Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Oahu Condo Window AC HOA Guide ($395+) | 44dB LG & 26" GE',
        description: '$0 Free Estimate • (808) 488-1111. HOA-compliant 44dB LG Dual Inverter & GE 26" Built-In Through-the-Wall ACs ($395–$1,200) in stock in Waipahu, Oahu.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp'],
    }
};

const condoHoaFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What are common HOA rules for window air conditioners on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most Oahu condo boards and townhouse HOAs enforce three main rules: (1) Noise limits—units cannot exceed 50 to 55 dB to avoid disturbing neighbors; (2) Facade appearance—side panels must be neutral white or matching frame colors without unsightly cardboard or duct tape; and (3) Condensation drainage—water cannot drip onto lower lanais, common walkways, or building walls."
            }
        },
        {
            "@type": "Question",
            "name": "Do LG Dual Inverter & GE window ACs pass strict HOA noise rules?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Operating at as low as 44 dB, LG Dual Inverter & GE units are significantly quieter than older rotary ACs (58+ dB) and pass even the strictest residential decibel rules in Honolulu and Salt Lake condos."
            }
        },
        {
            "@type": "Question",
            "name": "How do you satisfy HOA condensation drainage requirements?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our Oahu cooling technicians can attach custom condensate drain lines to route water safely to a drainage basin, container, or interior drain rather than letting it drip down the building exterior."
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
            "name": "Condo & Townhouse HOA Window AC Compliance",
            "item": "https://www.affordablehome-ac.com/condo-townhouse-window-ac-hoa-rules-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/condo-townhouse-window-ac-hoa-rules-oahu#service",
    "name": "Oahu Condo & Townhouse Window AC HOA Guide",
    "serviceType": "Oahu Condo & Townhouse Window AC HOA Guide",
    "url": "https://www.affordablehome-ac.com/condo-townhouse-window-ac-hoa-rules-oahu",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. HOA-compliant 44dB LG Dual Inverter & GE 26",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/condo-townhouse-window-ac-hoa-rules-oahu#localbusiness",
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

export default function CondoHoaAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(condoHoaFaqSchema) }}
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
