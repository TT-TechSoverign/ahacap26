import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Blowing Warm Air Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC blowing warm air on Oahu? Diagnostic troubleshooting guide for refrigerant leaks.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu',
    },
    openGraph: {
        title: 'AC Blowing Warm Air Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC blowing warm air on Oahu? Diagnostic troubleshooting guide for refrigerant leaks.',
        url: 'https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Blowing Warm Air Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Blowing Warm Air Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC blowing warm air on Oahu? Diagnostic troubleshooting guide for refrigerant leaks.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const warmAirFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is my AC running but blowing warm room-temperature air on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most frequent causes on Oahu are: (1) A blown dual-run motor capacitor caused by island voltage spikes, (2) A refrigerant (Freon) leak due to salt-air coil pitting, (3) A severely clogged exterior condenser coil blocked by salt and dirt, or (4) A gecko shorting the inverter control board."
            }
        },
        {
            "@type": "Question",
            "name": "How much does it cost to have a technician diagnose warm air?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We provide on-site window AC troubleshooting and clean-vs-replace assessments across Oahu. An experienced technician tests electrical voltages, airflow, and compressor health, providing an upfront recommendation before any work begins."
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
            "name": "Window AC Blowing Warm Air Troubleshooting",
            "item": "https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu#service",
    "name": "AC Blowing Warm Air Oahu ($0 Estimate)",
    "serviceType": "AC Blowing Warm Air Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC blowing warm air on Oahu? Diagnostic troubleshooting guide for refrigerant leaks.",
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

export default function AcBlowingWarmAirLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(warmAirFaqSchema) }}
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
