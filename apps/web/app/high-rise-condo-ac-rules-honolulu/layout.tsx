import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Honolulu High-Rise Condo Window & 26" Wall AC Installation ($0 Estimate) | Oahu'
    },
    description: '$0 Free Estimate • (808) 488-1111. Honolulu condo 26" through-the-wall GE Built-In & quiet 44dB LG Dual Inverter AC sales, drain routing & installation.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/high-rise-condo-ac-rules-honolulu',
    },
    openGraph: {
        title: 'Honolulu High-Rise Condo Window & 26" Wall AC Installation ($0 Estimate) | Oahu',
        description: '$0 Free Estimate • (808) 488-1111. Honolulu condo 26" through-the-wall GE Built-In & quiet 44dB LG Dual Inverter AC sales, drain routing & installation.',
        url: 'https://www.affordablehome-ac.com/high-rise-condo-ac-rules-honolulu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'High-Rise Condo Window AC Rules Honolulu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Honolulu High-Rise Condo Window & 26" Wall AC Installation ($0 Estimate) | Oahu',
        description: '$0 Free Estimate • (808) 488-1111. Honolulu condo 26" through-the-wall GE Built-In & quiet 44dB LG Dual Inverter AC sales, drain routing & installation.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp'],
    }
};

const highRiseFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What safety precautions are required when installing a window AC in a Honolulu high-rise?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In high-rise towers, our Oahu cooling technicians use industrial safety tether lanyards that anchor the AC chassis to the interior building structure throughout the entire mounting process, mathematically eliminating any risk of falling debris or equipment drop onto sidewalks or lanais below."
            }
        },
        {
            "@type": "Question",
            "name": "How is condensation handled in high-rise condominiums?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "High-rise condo bylaws strictly forbid water dripping onto lower balconies or street traffic. Our technicians install sealed condensation drain tubing connected to internal drain traps or collection reservoirs."
            }
        },
        {
            "@type": "Question",
            "name": "Do you coordinate with building management and freight elevators?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! We coordinate directly with building managers, security, and resident associations across Waikiki, Kakaako, and urban Honolulu, providing Certificates of Insurance (COI) and booking freight elevator windows."
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
            "name": "High-Rise Condo 26\" Wall Sleeve & Window AC",
            "item": "https://www.affordablehome-ac.com/high-rise-condo-ac-rules-honolulu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/high-rise-condo-ac-rules-honolulu#service",
    "name": "Honolulu High-Rise Condo Window & 26",
    "serviceType": "Honolulu High-Rise Condo Window & 26",
    "url": "https://www.affordablehome-ac.com/high-rise-condo-ac-rules-honolulu",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Honolulu condo 26",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/high-rise-condo-ac-rules-honolulu#localbusiness",
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

export default function HighRiseCondoAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(highRiseFaqSchema) }}
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
