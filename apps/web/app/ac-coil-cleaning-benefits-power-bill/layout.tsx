import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Coil Cleaning Oahu ($0 Estimate) | Cut HECO Power Bills 30%'
    },
    description: '$0 Free Estimate • (808) 488-1111. Cut Oahu HECO electric bills up to 30% with deep LG & GE Window AC evaporator & condenser coil cleaning or a $45 Rebate AC.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-coil-cleaning-benefits-power-bill',
    },
    openGraph: {
        title: 'Window AC Coil Cleaning Oahu ($0 Estimate) | Cut HECO Power Bills 30%',
        description: '$0 Free Estimate • (808) 488-1111. Cut Oahu HECO electric bills up to 30% with deep LG & GE Window AC evaporator & condenser coil cleaning or a $45 Rebate AC.',
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
        title: 'Window AC Coil Cleaning Oahu ($0 Estimate) | Cut HECO Power Bills 30%',
        description: '$0 Free Estimate • (808) 488-1111. Cut Oahu HECO electric bills up to 30% with deep LG & GE Window AC evaporator & condenser coil cleaning or a $45 Rebate AC.',
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
    "name": "Window AC Coil Cleaning Oahu ($0 Estimate) | Cut HECO Power Bills 30%",
    "serviceType": "Window AC Coil Cleaning Oahu ($0 Estimate) | Cut HECO Power Bills 30%",
    "url": "https://www.affordablehome-ac.com/ac-coil-cleaning-benefits-power-bill",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Cut Oahu HECO electric bills up to 30% with deep LG & GE Window AC evaporator & condenser coil cleaning or a $45 Rebate AC.",
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
