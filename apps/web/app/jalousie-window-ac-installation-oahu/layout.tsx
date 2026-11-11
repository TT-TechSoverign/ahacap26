import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Jalousie Window AC Installation Oahu ($0 Estimate) | (808) 488-1111'
    },
    description: '$0 Free Estimate • (808) 488-1111. Custom Hawaiian jalousie glass louver Window AC installation, weatherproof panels, brackets & in-stock LG/GE ACs ($395+).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/jalousie-window-ac-installation-oahu',
    },
    openGraph: {
        title: 'Jalousie Window AC Installation Oahu ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Custom Hawaiian jalousie glass louver Window AC installation, weatherproof panels, brackets & in-stock LG/GE ACs ($395+).',
        url: 'https://www.affordablehome-ac.com/jalousie-window-ac-installation-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Jalousie Window AC Installation Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Jalousie Window AC Installation Oahu ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Custom Hawaiian jalousie glass louver Window AC installation, weatherproof panels, brackets & in-stock LG/GE ACs ($395+).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const jalousieFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can you install a window AC in jalousie louver windows in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Jalousie installations are our specialty. Our experienced technicians remove only the necessary glass slats, install custom-cut marine-grade acrylic baffles and weather seals, and ensure zero mechanical weight is placed on the delicate louver tracks."
            }
        },
        {
            "@type": "Question",
            "name": "Are custom fabrication options and security brackets available?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Custom fabrication options and security brackets are available for an additional cost with installation. During installation, our technician inspects your sill and framing to ensure your installation is safe, secure, and weatherproof."
            }
        },
        {
            "@type": "Question",
            "name": "What is your floor drop-cloth guarantee?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians lay clean protective drop cloths directly under the window workspace to catch glass dust, acrylic shavings, or debris. We vacuum the work area and ensure your home is left cleaner than when we arrived."
            }
        }
    ]
};

const hvacServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Jalousie Window AC Installation",
    "name": "Jalousie Window AC Installation & Custom Fabrication",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/jalousie-window-ac-installation-oahu#localbusiness",
        "parentOrganization": { "@id": "https://www.affordablehome-ac.com/#hvacbusiness" },
        "name": "Affordable Home A/C",
        "image": [
                        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
                        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
                        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
                        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
                    ],
        "telephone": "+1-808-488-1111",
        "priceRange": "$395 - $1,200",
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
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "94-150 Leoleo St. #203",
            "addressLocality": "Waipahu",
            "addressRegion": "HI",
            "postalCode": "96797",
            "addressCountry": "US"
        }
    },
    "areaServed": "Oahu, Hawaii",
    "description": "Specialized LG & GE window air conditioner installation in Hawaiian jalousie louver windows, custom acrylic fabrication, and exterior security mounting across Oahu.",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Jalousie Window AC Installation & In-Stock Units",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "$0 Free In-Home Jalousie Window AC Installation Estimate (By Appointment First)"
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
            "name": "Jalousie Louver Window AC Installation",
            "item": "https://www.affordablehome-ac.com/jalousie-window-ac-installation-oahu"
        }
    ]
};

export default function JalousieWindowAcInstallationLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jalousieFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacServiceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
