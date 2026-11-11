import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'LG & GE Window AC Blinking Light & CH Error Codes Oahu | $0 Estimate | (808) 488-1111'
    },
    description: '$0 Free Estimate • (808) 488-1111. Fix blinking filter lights & CH05/CH21/CH34 error codes on LG & GE Window ACs in Oahu, or swap with an in-stock unit ($395+).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair',
    },
    openGraph: {
        title: 'LG & GE Window AC Blinking Light & CH Error Codes Oahu | $0 Estimate | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Fix blinking filter lights & CH05/CH21/CH34 error codes on LG & GE Window ACs in Oahu, or swap with an in-stock unit ($395+).',
        url: 'https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Blinking Light Error Codes Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LG & GE Window AC Blinking Light & CH Error Codes Oahu | $0 Estimate | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Fix blinking filter lights & CH05/CH21/CH34 error codes on LG & GE Window ACs in Oahu, or swap with an in-stock unit ($395+).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const errorCodeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What does a blinking light or CH code on my window air conditioner mean?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A flashing LED light or CH display on your LG or GE window air conditioner indicates a self-diagnostic error code. For example, on LG Dual Inverter units, CH01 indicates an indoor room thermistor fault, CH02 indicates an evaporator pipe thermistor fault, and CH21 indicates compressor overcurrent protection."
            }
        },
        {
            "@type": "Question",
            "name": "Can I reset a blinking AC error code by turning off the breaker?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, turning off the breaker for 5 full minutes performs a hard microprocessor reset. If the error was caused by a transient power surge from the HECO grid, the unit may restart normally. However, if the light starts flashing again immediately upon powering on, a physical component failure exists that requires technician attention."
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
            "name": "LG & GE Window AC Error Codes & Blinking Light",
            "item": "https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair#service",
    "name": "LG & GE Window AC Blinking Light & CH Error Codes Oahu",
    "serviceType": "LG & GE Window AC Blinking Light & CH Error Codes Oahu",
    "url": "https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Fix blinking filter lights & CH05/CH21/CH34 error codes on LG & GE Window ACs in Oahu, or swap with an in-stock unit ($395+).",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair#localbusiness",
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

export default function BlinkingLightErrorCodesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(errorCodeFaqSchema) }}
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
