import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Leaking Water Inside Oahu ($0 Estimate) | Drain & Pitch Fix'
    },
    description: '$0 Free Estimate • (808) 488-1111. LG or GE Window AC dripping water indoors on Oahu? We clear algae drain pan clogs, fix window pitch & protect floors.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-dripping-water-inside-house-repair',
    },
    openGraph: {
        title: 'Window AC Leaking Water Inside Oahu ($0 Estimate) | Drain & Pitch Fix',
        description: '$0 Free Estimate • (808) 488-1111. LG or GE Window AC dripping water indoors on Oahu? We clear algae drain pan clogs, fix window pitch & protect floors.',
        url: 'https://www.affordablehome-ac.com/ac-dripping-water-inside-house-repair',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Dripping Water Inside House Repair Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Leaking Water Inside Oahu ($0 Estimate) | Drain & Pitch Fix',
        description: '$0 Free Estimate • (808) 488-1111. LG or GE Window AC dripping water indoors on Oahu? We clear algae drain pan clogs, fix window pitch & protect floors.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const drippingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is water dripping from my window AC inside my house?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Hawaii's humid climate, air conditioners pull gallons of water from the air each day. The most common cause of indoor water leaks is a clogged condensate drain line choked with algae slime. Other common causes include an unlevel mounting bracket, a cracked drain pan, or frozen evaporator coils that melt faster than the pan can drain."
            }
        },
        {
            "@type": "Question",
            "name": "How does Affordable Home AC fix indoor AC leaks?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our Oahu cooling technicians inspect the condensate drain pan, flush and clear the gravity drain line using vacuum extraction and dedicated line flushing, verify the mounting pitch with a digital level, and apply antimicrobial pan treatments to prevent future algae clogs."
            }
        },
        {
            "@type": "Question",
            "name": "Can I pour bleach into my window AC drain pan myself?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We strongly advise against bleach. Bleach fumes are corrosive to aluminum coil fins, can degrade rubber gaskets, and if splashed on paint or upholstery causes permanent discoloration. Our technicians use specialized non-corrosive HVAC pan treatments and lay protective floor drop cloths under your unit during service."
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
            "name": "Window AC Leaking Water Inside Fix",
            "item": "https://www.affordablehome-ac.com/ac-dripping-water-inside-house-repair"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-dripping-water-inside-house-repair#service",
    "name": "Window AC Leaking Water Inside Oahu ($0 Estimate) | Drain & Pitch Fix",
    "serviceType": "Window AC Leaking Water Inside Oahu ($0 Estimate) | Drain & Pitch Fix",
    "url": "https://www.affordablehome-ac.com/ac-dripping-water-inside-house-repair",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. LG or GE Window AC dripping water indoors on Oahu? We clear algae drain pan clogs, fix window pitch & protect floors.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/ac-dripping-water-inside-house-repair#localbusiness",
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

export default function AcDrippingWaterLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(drippingFaqSchema) }}
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
