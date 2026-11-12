import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'LG & GE Window AC Error Codes Oahu ($0 Estimate) | Repair'
    },
    description: '$0 Free Estimate • (808) 488-1111. Fix blinking filter lights & CH05/CH21/CH34 error codes on LG & GE Window ACs in Oahu, or swap with an in-stock unit ($395+).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair',
    },
    openGraph: {
        title: 'LG & GE Window AC Error Codes Oahu ($0 Estimate) | Repair',
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
        title: 'LG & GE Window AC Error Codes Oahu ($0 Estimate) | Repair',
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
            "name": "How do I read the blinking lights or digital error codes on my window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "On LG Dual Inverter and GE digital window units, the LED display will show a 2-character code (such as CH01, CH02, CH21, F1, or F2) or blink the Clean Filter / Power LED in a repeating sequence. Count the flashes between pauses or note the digital code shown on the front panel."
            }
        },
        {
            "@type": "Question",
            "name": "Can I clear the error code by unplugging the unit or resetting the breaker?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Unplug the window unit (or press the RESET button on the LCDI plug head) and wait 5 full minutes to let the internal inverter capacitors discharge. Plug it back in and press RESET. If the error was caused by a temporary HECO island voltage flicker, the unit may reboot normally. If the code returns immediately, a sensor or board fault exists."
            }
        },
        {
            "@type": "Question",
            "name": "What if the Clean Filter LED is blinking?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "On LG and GE window air conditioners, a steady or blinking Filter LED triggers automatically after 250 hours of fan operation as a reminder to wash the front mesh screen. Pull out the filter, rinse it with warm water, reinstall it, and hold the Filter / Temp buttons for 3 seconds to clear the light."
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
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Fix blinking filter lights & CH05/CH21/CH34 error codes on LG & GE Window ACs in Oahu, or swap with an in-stock unit ($395+).",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair#localbusiness",
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
