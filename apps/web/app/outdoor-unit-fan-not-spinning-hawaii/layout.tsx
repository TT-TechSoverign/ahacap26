import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Fan Not Spinning Oahu ($0 Estimate) | Motor & Capacitor Fix'
    },
    description: '$0 Free Estimate • (808) 488-1111. LG or GE Window AC fan stopped spinning on Oahu? Diagnose bad capacitors & seized motors, or swap with an in-stock AC ($395+).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii',
    },
    openGraph: {
        title: 'Window AC Fan Not Spinning Oahu ($0 Estimate) | Motor & Capacitor Fix',
        description: '$0 Free Estimate • (808) 488-1111. LG or GE Window AC fan stopped spinning on Oahu? Diagnose bad capacitors & seized motors, or swap with an in-stock AC ($395+).',
        url: 'https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Condenser Fan Not Spinning Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Fan Not Spinning Oahu ($0 Estimate) | Motor & Capacitor Fix',
        description: '$0 Free Estimate • (808) 488-1111. LG or GE Window AC fan stopped spinning on Oahu? Diagnose bad capacitors & seized motors, or swap with an in-stock AC ($395+).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const outdoorFanFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What happens if the rear condenser fan stops spinning while the window AC is running?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Without the fan drawing air across the rear condenser coils, high-pressure hot refrigerant gas cannot condense into liquid. Head pressure and temperatures skyrocket within 2 to 3 minutes, forcing the compressor into high-pressure thermal overload cutoff and risking permanent motor damage."
            }
        },
        {
            "@type": "Question",
            "name": "What is the most common reason a condenser fan motor stops spinning?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Hawaii, the leading cause is a failed dual-run capacitor where the 'FAN' terminal has lost microfarad rating due to high ambient heat. Other frequent causes include bearing seizure from salt air corrosion or a shorted DC brushless fan motor on inverter window units."
            }
        },
        {
            "@type": "Question",
            "name": "Can I test if the fan motor is seized by spinning the blade?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "With the power cord completely unplugged from the wall receptacle, a technician can gently check the fan shaft rotation. If the shaft resists or binds immediately, the motor bearings are seized."
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
            "name": "Window AC Fan Motor Not Spinning Assessment",
            "item": "https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii#service",
    "name": "Window AC Fan Not Spinning Oahu ($0 Estimate) | Motor & Capacitor Fix",
    "serviceType": "Window AC Fan Not Spinning Oahu ($0 Estimate) | Motor & Capacitor Fix",
    "url": "https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. LG or GE Window AC fan stopped spinning on Oahu? Diagnose bad capacitors & seized motors, or swap with an in-stock AC ($395+).",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii#localbusiness",
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

export default function OutdoorFanNotSpinningLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(outdoorFanFaqSchema) }}
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
