import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Weather Sealing Oahu ($0 Estimate) | (808) 488-1111'
    },
    description: '$0 Free Estimate • (808) 488-1111. Seal out Oahu trade wind rain, humidity, noise & geckos with marine-grade closed-cell foam Window AC weather stripping.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-weather-stripping-island-seal',
    },
    openGraph: {
        title: 'Window AC Weather Sealing Oahu ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Seal out Oahu trade wind rain, humidity, noise & geckos with marine-grade closed-cell foam Window AC weather stripping.',
        url: 'https://www.affordablehome-ac.com/window-ac-weather-stripping-island-seal',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Weather Stripping Island Seal Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Weather Sealing Oahu ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Seal out Oahu trade wind rain, humidity, noise & geckos with marine-grade closed-cell foam Window AC weather stripping.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const weatherSealFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is proper weather sealing critical for window ACs in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Unsealed window gaps allow chilled air to escape and hot humid trade winds to blow in, forcing your AC to run continuously and driving up your HECO bill. Gaps also invite geckos, ants, and flying insects inside."
            }
        },
        {
            "@type": "Question",
            "name": "What materials do you use to seal around the window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We use high-density closed-cell marine-grade weather stripping foam, UV-resistant vinyl gaskets, and rigid insulated side panels rather than cheap open-cell sponge foam that degrades under tropical sunlight."
            }
        },
        {
            "@type": "Question",
            "name": "Does weather stripping prevent rainwater from leaking inside during storms?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Our technicians install compression gaskets along top and bottom sashes and verify proper 1/4-inch backward pitch so wind-driven tropical rains drain safely outside away from your interior sills."
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
            "name": "Window AC Installation",
            "item": "https://www.affordablehome-ac.com/window-ac-installation"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Marine-Grade Window AC Weather Stripping",
            "item": "https://www.affordablehome-ac.com/window-ac-weather-stripping-island-seal"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/window-ac-weather-stripping-island-seal#service",
    "name": "Window AC Weather Stripping & Sealing Oahu ($0 Estimate) | (808) 488-1111",
    "serviceType": "Window AC Weather Stripping & Sealing Oahu ($0 Estimate) | (808) 488-1111",
    "url": "https://www.affordablehome-ac.com/window-ac-weather-stripping-island-seal",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Seal out Oahu trade wind rain, humidity, noise & geckos with marine-grade closed-cell foam Window AC weather stripping.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/window-ac-weather-stripping-island-seal#localbusiness",
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

export default function WeatherSealAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(weatherSealFaqSchema) }}
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
