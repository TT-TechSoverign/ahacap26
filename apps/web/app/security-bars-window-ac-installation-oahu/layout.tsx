import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Security Bars Window AC Installation Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Specialized LG & GE window air conditioner installation for homes with exterior security burglar bars on Oahu.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/security-bars-window-ac-installation-oahu',
    },
    openGraph: {
        title: 'Security Bars Window AC Installation Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Specialized LG & GE window air conditioner installation for homes with exterior security burglar bars on Oahu.',
        url: 'https://www.affordablehome-ac.com/security-bars-window-ac-installation-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Security Bars Window AC Installation Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Security Bars Window AC Installation Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Specialized LG & GE window air conditioner installation for homes with exterior security burglar bars on Oahu.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const securityBarsFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can a window AC be installed if my window has exterior security bars?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Many Oahu residences in Kalihi, Waipahu, Palama, and McCully have wrought-iron security bars. If the bar clearance is at least 10 to 14 inches from the window sash, a compact unit can slide into place. If clearances are tighter, our technicians use specialized bracket mounting or interior slide-in configurations."
            }
        },
        {
            "@type": "Question",
            "name": "Does installing an AC compromise my home's window security?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. We install sash-locking security hardware and heavy-gauge steel bracket ties that prevent the unit or window sash from being pushed inward from the outside, keeping your home fully secure."
            }
        },
        {
            "@type": "Question",
            "name": "Do security bars restrict the air conditioner's exhaust airflow?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians verify at least 4 to 6 inches of clearance between the exterior condenser coil and the security bar metal to prevent warm air recirculation, ensuring peak cooling efficiency."
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
            "name": "Security Bar Window AC Installation",
            "item": "https://www.affordablehome-ac.com/security-bars-window-ac-installation-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/security-bars-window-ac-installation-oahu#service",
    "name": "Security Bars Window AC Installation Oahu ($0 Estimate)",
    "serviceType": "Security Bars Window AC Installation Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/security-bars-window-ac-installation-oahu",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Specialized LG & GE window air conditioner installation for homes with exterior security burglar bars on Oahu.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/security-bars-window-ac-installation-oahu#localbusiness",
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

export default function SecurityBarsAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(securityBarsFaqSchema) }}
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
