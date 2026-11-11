import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Coil Cleaning Benefits: Lower Your HECO Power Bill ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Learn how dirty evaporator and condenser coils spike Hawaii window AC electricity bills at HECO for LG & GE units.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-coil-cleaning-benefits-power-bill',
    },
    openGraph: {
        title: 'AC Coil Cleaning Benefits: Lower Your HECO Power Bill ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Learn how dirty evaporator and condenser coils spike Hawaii window AC electricity bills at HECO for LG & GE units.',
        url: 'https://www.affordablehome-ac.com/ac-coil-cleaning-benefits-power-bill',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Coil Cleaning HECO Power Bill Savings Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Coil Cleaning Benefits: Lower Your HECO Power Bill ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Learn how dirty evaporator and condenser coils spike Hawaii window AC electricity bills at HECO for LG & GE units.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const coilCleaningFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does a dirty AC coil increase my electric bill in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Dirt, lint, and fungal biofilm act as an insulating blanket on aluminum cooling fins. This prevents heat absorption indoors and heat rejection outdoors, forcing your compressor to draw higher amperage and run up to 40% longer. At Hawaiian Electric's ~44.2¢/kWh rate, this adds up rapidly."
            }
        },
        {
            "@type": "Question",
            "name": "How much money can I actually save each month by cleaning my coils?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For a typical 12,000 BTU window unit running 8 hours a day, restoring clean coil heat transfer typically saves 2 to 3 kWh per day—translating to roughly $30 to $45 in monthly savings per window AC. In multi-room households running multiple window units, savings often exceed $100 per month."
            }
        },
        {
            "@type": "Question",
            "name": "Can I just vacuum the front of the coils myself?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Gentle surface brushing helps remove coarse lint, but microscopic grime, salt crystals, and mold cling deep inside the 14-to-18 fins-per-inch matrix. Commercial foaming chemical cleaners and precision pressure rinsing are required to penetrate the full coil depth."
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
            "name": "HECO Power Bill Savings from Coil Cleaning",
            "item": "https://www.affordablehome-ac.com/ac-coil-cleaning-benefits-power-bill"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-coil-cleaning-benefits-power-bill#service",
    "name": "AC Coil Cleaning Benefits: Lower Your HECO Power Bill ($0 Estimate)",
    "serviceType": "AC Coil Cleaning Benefits: Lower Your HECO Power Bill ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/ac-coil-cleaning-benefits-power-bill",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Learn how dirty evaporator and condenser coils spike Hawaii window AC electricity bills at HECO for LG & GE units.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/ac-coil-cleaning-benefits-power-bill#localbusiness",
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

export default function CoilCleaningPowerBillLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(coilCleaningFaqSchema) }}
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
