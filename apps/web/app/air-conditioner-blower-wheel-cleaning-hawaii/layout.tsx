import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Blower Wheel Deep Cleaning Oahu ($0 Estimate) | (808) 488-1111'
    },
    description: '$0 Free Estimate • (808) 488-1111. Remove heavy mold cake & dust from your Oahu Window AC blower fan wheel. Restores ice-cold CFM airflow with zero water mess.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/air-conditioner-blower-wheel-cleaning-hawaii',
    },
    openGraph: {
        title: 'Window AC Blower Wheel Deep Cleaning Oahu ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Remove heavy mold cake & dust from your Oahu Window AC blower fan wheel. Restores ice-cold CFM airflow with zero water mess.',
        url: 'https://www.affordablehome-ac.com/air-conditioner-blower-wheel-cleaning-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Air Conditioner Blower Wheel Cleaning Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Blower Wheel Deep Cleaning Oahu ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Remove heavy mold cake & dust from your Oahu Window AC blower fan wheel. Restores ice-cold CFM airflow with zero water mess.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const blowerWheelFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why does the AC blower wheel get coated in black dirt and mold?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The centrifugal squirrel-cage blower wheel spins thousands of rotations per hour, pulling humid room air directly across wet cooling coils. Microscopic dust, skin cells, and pet dander stick to the damp curved fan blades, creating a dense fungal crust that chokes airflow."
            }
        },
        {
            "@type": "Question",
            "name": "Can you clean a heavily caked blower wheel in place?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Surface spray-down in place only cleans the exposed front edge and can wash mold slurry deeper into the housing. For lightly soiled window units, routine filter and surface cleaning works well; for older window units with heavily encrusted blower wheels, upgrading to a brand-new LG Dual Inverter & GE Built-In ($560+ with a $45 rebate) is far more economical than a full mechanical teardown."
            }
        },
        {
            "@type": "Question",
            "name": "What are the signs that my blower wheel is clogged?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Key symptoms include weak air velocity even on high fan speed, a rhythmic pulsating or roaring whoosh sound, black flecks blowing onto your bed or couch, and an unbalanced rattling vibration from the window unit."
            }
        },
        {
            "@type": "Question",
            "name": "Does a clogged fan wheel increase power consumption?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. When the concave curvature of the fan blades is packed with dirt, the wheel loses aerodynamic lift. The motor draws more amps trying to push air, while room cooling times double, wasting electricity at HECO's ~44.2¢/kWh rate."
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
            "name": "Window AC Cleaning",
            "item": "https://www.affordablehome-ac.com/ac-cleaning-oahu"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Window AC Blower Wheel Deep Wash",
            "item": "https://www.affordablehome-ac.com/air-conditioner-blower-wheel-cleaning-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/air-conditioner-blower-wheel-cleaning-hawaii#service",
    "name": "Window AC Blower Wheel Deep Cleaning Oahu ($0 Estimate) | (808) 488-1111",
    "serviceType": "Window AC Blower Wheel Deep Cleaning Oahu ($0 Estimate) | (808) 488-1111",
    "url": "https://www.affordablehome-ac.com/air-conditioner-blower-wheel-cleaning-hawaii",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Remove heavy mold cake & dust from your Oahu Window AC blower fan wheel. Restores ice-cold CFM airflow with zero water mess.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/air-conditioner-blower-wheel-cleaning-hawaii#localbusiness",
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

export default function BlowerWheelCleaningLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blowerWheelFaqSchema) }}
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
