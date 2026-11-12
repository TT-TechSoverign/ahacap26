import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Musty Window AC Cleaning Oahu ($0 Estimate) | (808) 488-1111'
    },
    description: '$0 Free Estimate • (808) 488-1111. Eliminate musty mildew & dirty sock odors from your Oahu Window AC with deep evaporator coil & blower wheel sanitization.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-smells-musty-mildew-hawaii',
    },
    openGraph: {
        title: 'Musty Window AC Cleaning Oahu ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Eliminate musty mildew & dirty sock odors from your Oahu Window AC with deep evaporator coil & blower wheel sanitization.',
        url: 'https://www.affordablehome-ac.com/ac-smells-musty-mildew-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Smells Musty Mildew Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Musty Window AC Cleaning Oahu ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Eliminate musty mildew & dirty sock odors from your Oahu Window AC with deep evaporator coil & blower wheel sanitization.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const mustyAcFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why does my air conditioner smell like dirty socks or sour mildew?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Known in the HVAC trade as 'Dirty Sock Syndrome,' this odor occurs when bacteria and mold colonize damp evaporator coils and stagnant condensate pan water. Hawaii's 80%+ humidity and warm ambient temperatures provide constant fuel for this biofilm to fester."
            }
        },
        {
            "@type": "Question",
            "name": "Is it dangerous to breathe air from an AC that smells musty?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The odor is caused by volatile organic compounds released by active fungal and bacterial colonies. Breathing this air continuously can cause sinus congestion, morning headaches, throat irritation, and trigger asthma attacks, especially in children and elderly island residents."
            }
        },
        {
            "@type": "Question",
            "name": "Can I just spray Lysol or bleach into the front grille?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Never spray bleach or household disinfectants directly into an AC. Bleach causes rapid galvanic corrosion of aluminum fins and copper tubing, leading to costly refrigerant pinhole leaks. True eradication requires commercial, non-acidic coil cleaner applied by an Oahu cooling technician."
            }
        },
        {
            "@type": "Question",
            "name": "What service eliminates this musty smell completely?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For newer window units with surface dust and minor pan odors, our Window AC Cleaning service sanitizes the coils, washes the reusable filter, and treats the condensate pan with floor drop cloth protection. For older window units with heavy internal mold inside the Styrofoam air channels, upgrading to a high-efficiency LG Dual Inverter starting at $560 with a $45 Hawaii Energy cash rebate is the most economical solution."
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
            "name": "Musty Window AC Odor Elimination",
            "item": "https://www.affordablehome-ac.com/ac-smells-musty-mildew-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-smells-musty-mildew-hawaii#service",
    "name": "Window AC Smells Musty in Hawaii? Deep Mold Cleaning ($0 Estimate)",
    "serviceType": "Window AC Smells Musty in Hawaii? Deep Mold Cleaning ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/ac-smells-musty-mildew-hawaii",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "$0 Free Estimate • (808) 488-1111. Eliminate musty mildew & dirty sock odors from your Oahu Window AC with deep evaporator coil & blower wheel sanitization.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/ac-smells-musty-mildew-hawaii#localbusiness",
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

export default function AcSmellsMustyLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(mustyAcFaqSchema) }}
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
