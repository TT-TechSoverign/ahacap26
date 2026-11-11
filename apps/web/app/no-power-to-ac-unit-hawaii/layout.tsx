import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'No Power to AC Unit in Hawaii? Breaker & Plug Checks ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Window AC unit completely dead with no power or display lights in Hawaii? Check circuit breakers, LCDI safety.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii',
    },
    openGraph: {
        title: 'No Power to AC Unit in Hawaii? Breaker & Plug Checks ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Window AC unit completely dead with no power or display lights in Hawaii? Check circuit breakers, LCDI safety.',
        url: 'https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'No Power to AC Unit Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'No Power to AC Unit in Hawaii? Breaker & Plug Checks ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Window AC unit completely dead with no power or display lights in Hawaii? Check circuit breakers, LCDI safety.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const noPowerFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is my LG & GE window air conditioner completely dead with no display lights or sound?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "When a window AC has zero power, the most common causes are a tripped LCDI safety button on the power cord plug head, a tripped circuit breaker in your electrical panel, or a blown low-voltage fuse on the internal control board."
            }
        },
        {
            "@type": "Question",
            "name": "How does the LCDI safety plug on my window AC cord work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "High-efficiency window units incorporate a Leakage Current Detection Interrupter (LCDI) on the plug head. If a power surge or cord damage occurs, the button pops out and cuts power immediately to prevent electrical hazards."
            }
        },
        {
            "@type": "Question",
            "name": "What should I do if the circuit breaker trips immediately when I reset it?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Never force a breaker to stay in the ON position or repeatedly reset it. An instantaneous trip signifies a hard direct short to ground in the compressor windings or an inverter power module failure."
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
            "name": "Dead Window AC No-Power Troubleshooting",
            "item": "https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii#service",
    "name": "No Power to AC Unit in Hawaii? Breaker & Plug Checks ($0 Estimate)",
    "serviceType": "No Power to AC Unit in Hawaii? Breaker & Plug Checks ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Window AC unit completely dead with no power or display lights in Hawaii? Check circuit breakers, LCDI safety.",
    "provider": {
        "@type": "HVACBusiness",
        "name": "Affordable Home A/C",
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

export default function NoPowerAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(noPowerFaqSchema) }}
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
