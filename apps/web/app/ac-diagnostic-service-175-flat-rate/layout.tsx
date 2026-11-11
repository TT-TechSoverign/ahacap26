import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Diagnostic Service Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Accurate, honest window AC diagnostic service on Oahu with a $0 Free Clean-vs-Replace Estimate. Electrical.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-diagnostic-service-175-flat-rate',
    },
    openGraph: {
        title: 'AC Diagnostic Service Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Accurate, honest window AC diagnostic service on Oahu with a $0 Free Clean-vs-Replace Estimate. Electrical.',
        url: 'https://www.affordablehome-ac.com/ac-diagnostic-service-175-flat-rate',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Diagnostic & Clean-vs-Replace Assessment Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Diagnostic Service Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Accurate, honest window AC diagnostic service on Oahu with a $0 Free Clean-vs-Replace Estimate. Electrical.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const diagnosticFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is included in your Window AC Diagnostic & Clean-vs-Replace Assessment?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our on-site window AC evaluation covers complete on-site window AC troubleshooting: electrical capacitor microfarad testing, compressor winding amp draw analysis, inverter circuit board error code diagnosis, and temperature delta-T cooling evaluation."
            }
        },
        {
            "@type": "Question",
            "name": "Are there extra hidden fees or trip charges depending on my Oahu town?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No hidden trip charges. Our by-appointment evaluation is transparent across all 22 Oahu municipalities, from Honolulu and Pearl City to Kailua, Kaneohe, Kapolei, and the North Shore."
            }
        },
        {
            "@type": "Question",
            "name": "What happens if my unit requires replacement instead of repair?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "If our specialist determines the unit has a seized compressor or rotted coils where repair is uneconomical, we provide a free estimate for a replacement LG or GE window AC directly from our Waipahu warehouse."
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
            "name": "$0 Free Window AC Clean-vs-Replace Assessment",
            "item": "https://www.affordablehome-ac.com/ac-diagnostic-service-175-flat-rate"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-diagnostic-service-175-flat-rate#service",
    "name": "AC Diagnostic Service Oahu ($0 Estimate)",
    "serviceType": "AC Diagnostic Service Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/ac-diagnostic-service-175-flat-rate",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Accurate, honest window AC diagnostic service on Oahu with a $0 Free Clean-vs-Replace Estimate. Electrical.",
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

export default function AcDiagnosticLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(diagnosticFaqSchema) }}
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
