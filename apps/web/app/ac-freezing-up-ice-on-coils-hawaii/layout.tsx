import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Freezing Up Ice on Coils Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC frozen solid with ice on the coils on Oahu? Emergency thaw instructions, root-cause.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-freezing-up-ice-on-coils-hawaii',
    },
    openGraph: {
        title: 'AC Freezing Up Ice on Coils Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC frozen solid with ice on the coils on Oahu? Emergency thaw instructions, root-cause.',
        url: 'https://www.affordablehome-ac.com/ac-freezing-up-ice-on-coils-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Freezing Up Ice on Coils Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Freezing Up Ice on Coils Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC frozen solid with ice on the coils on Oahu? Emergency thaw instructions, root-cause.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const freezingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is ice forming on my air conditioner coils in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oahu's high 74%+ relative humidity means air is heavy with water vapor. If airflow is choked by a dirty filter or the refrigerant charge is low from a pinhole leak, the coil temperature plunges below 32°F (0°C). Moisture instantly freezes on the aluminum fins, cascading into a solid block of ice that blocks all cooling."
            }
        },
        {
            "@type": "Question",
            "name": "What should I do immediately if my AC is frozen?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Immediately switch the unit to FAN ONLY mode (or turn it completely OFF). NEVER use a knife, screwdriver, or ice pick to chip ice away—this will puncture delicate copper coil tubes and release refrigerant. Place towels beneath the unit to catch the melting water and schedule a professional diagnostic check."
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
            "name": "Window AC Freezing Up & Iced Coils Fix",
            "item": "https://www.affordablehome-ac.com/ac-freezing-up-ice-on-coils-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-freezing-up-ice-on-coils-hawaii#service",
    "name": "AC Freezing Up Ice on Coils Hawaii ($0 Estimate)",
    "serviceType": "AC Freezing Up Ice on Coils Hawaii ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/ac-freezing-up-ice-on-coils-hawaii",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC frozen solid with ice on the coils on Oahu? Emergency thaw instructions, root-cause.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/ac-freezing-up-ice-on-coils-hawaii#localbusiness",
        "name": "Affordable Home A/C",
        "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "142",
            "bestRating": "5",
            "worstRating": "1"
        },
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

export default function AcFreezingUpLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(freezingFaqSchema) }}
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
