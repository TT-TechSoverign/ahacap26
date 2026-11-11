import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Keeps Tripping Breaker Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Does your LG & GE window air conditioner immediately trip the breaker on Oahu? Diagnostic electrical inspection.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-keeps-tripping-breaker-hawaii',
    },
    openGraph: {
        title: 'AC Keeps Tripping Breaker Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Does your LG & GE window air conditioner immediately trip the breaker on Oahu? Diagnostic electrical inspection.',
        url: 'https://www.affordablehome-ac.com/ac-keeps-tripping-breaker-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Tripping Breaker Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Keeps Tripping Breaker Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Does your LG & GE window air conditioner immediately trip the breaker on Oahu? Diagnostic electrical inspection.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const breakerFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why does my AC keep tripping the breaker in my electrical panel?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "If it trips instantly with a pop, you likely have a dead short circuit, a grounded compressor motor winding, or a gecko shorting the inverter board. If it trips after running for 5 to 15 minutes, the compressor is likely pulling excessive amperage due to a failing capacitor, dirty coils, or low voltage supply."
            }
        },
        {
            "@type": "Question",
            "name": "Is it safe to keep resetting the breaker?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No! Resetting a tripping breaker more than once is extremely dangerous. Breakers trip to prevent electrical wires inside your walls from overheating and starting an electrical fire. Repeatedly forcing the breaker ON can melt terminal lugs and damage your main service panel."
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
            "name": "Window AC Tripping Breaker Troubleshooting",
            "item": "https://www.affordablehome-ac.com/ac-keeps-tripping-breaker-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-keeps-tripping-breaker-hawaii#service",
    "name": "AC Keeps Tripping Breaker Hawaii ($0 Estimate)",
    "serviceType": "AC Keeps Tripping Breaker Hawaii ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/ac-keeps-tripping-breaker-hawaii",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Does your LG & GE window air conditioner immediately trip the breaker on Oahu? Diagnostic electrical inspection.",
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

export default function AcTrippingBreakerLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breakerFaqSchema) }}
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
