import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Compressor Not Turning On Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Blower fan blowing warm air but LG & GE window AC compressor not running? Accurate diagnostic of capacitors, power.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-compressor-not-turning-on-oahu',
    },
    openGraph: {
        title: 'AC Compressor Not Turning On Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Blower fan blowing warm air but LG & GE window AC compressor not running? Accurate diagnostic of capacitors, power.',
        url: 'https://www.affordablehome-ac.com/ac-compressor-not-turning-on-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Compressor Not Turning On Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Compressor Not Turning On Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Blower fan blowing warm air but LG & GE window AC compressor not running? Accurate diagnostic of capacitors, power.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const compressorFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is my blower fan running but the window AC compressor won't kick on?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The interior blower fan and the sealed rotary compressor operate on separate electrical control relays. Common reasons the compressor fails to start include a blown dual-run capacitor, pitted power relay contacts, an inverter power module (IPM) error, or a thermal overload cutoff."
            }
        },
        {
            "@type": "Question",
            "name": "Can a bad capacitor cause the compressor to hum and buzz without starting?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. A degraded capacitor cannot deliver the microfarad phase-shift boost needed to overcome locked rotor inertia. The compressor will hum for 5-10 seconds, overheat, and trip its internal thermal overload switch."
            }
        },
        {
            "@type": "Question",
            "name": "How much does it cost to diagnose a non-starting AC compressor?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Affordable Home A/C provides a $0 Free Clean-vs-Replace Assessment and by-appointment troubleshooting across all of Oahu. Our technician checks capacitor ratings, winding resistance, and inverter voltages to identify the exact point of failure."
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
            "name": "Window AC Compressor Not Turning On",
            "item": "https://www.affordablehome-ac.com/ac-compressor-not-turning-on-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-compressor-not-turning-on-oahu#service",
    "name": "AC Compressor Not Turning On Oahu ($0 Estimate)",
    "serviceType": "AC Compressor Not Turning On Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/ac-compressor-not-turning-on-oahu",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Blower fan blowing warm air but LG & GE window AC compressor not running? Accurate diagnostic of capacitors, power.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/ac-compressor-not-turning-on-oahu#localbusiness",
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

export default function CompressorNotTurningOnLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(compressorFaqSchema) }}
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
