import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Condensation Drain Routing Condos Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Prevent window AC condensation from dripping on downstairs neighbor lanais and walkways in Oahu condos. Custom.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-condensation-drain-routing-condos',
    },
    openGraph: {
        title: 'AC Condensation Drain Routing Condos Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Prevent window AC condensation from dripping on downstairs neighbor lanais and walkways in Oahu condos. Custom.',
        url: 'https://www.affordablehome-ac.com/ac-condensation-drain-routing-condos',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Condensation Drain Routing Condos Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Condensation Drain Routing Condos Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Prevent window AC condensation from dripping on downstairs neighbor lanais and walkways in Oahu condos. Custom.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const condensationDrainFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is AC condensation drainage a serious issue in Oahu condos?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "During humid Hawaiian summers, a single window AC can extract 2 to 5 gallons of water daily from indoor air. If left to drip freely, water falls onto downstairs neighbors' balconies, patio furniture, or public building walkways, triggering immediate HOA citations and neighbor disputes."
            }
        },
        {
            "@type": "Question",
            "name": "How does professional condensation drain routing work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians install a sealed drain pan adapter nozzle on the base of your LG or GE window AC and connect reinforced, UV-resistant vinyl tubing. We route the hose cleanly along the wall or railing to a dedicated lanai floor drain, drainage scupper, or discrete collection container."
            }
        },
        {
            "@type": "Question",
            "name": "Does drain routing affect cooling efficiency?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Modern window ACs are engineered with dual drain ports or sling fans. Our technicians install drain kits in compliance with factory guidelines to ensure smooth water evacuation without hindering condenser coil heat dissipation."
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
            "name": "Condo Window AC Condensate Drain Routing",
            "item": "https://www.affordablehome-ac.com/ac-condensation-drain-routing-condos"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-condensation-drain-routing-condos#service",
    "name": "AC Condensation Drain Routing Condos Oahu ($0 Estimate)",
    "serviceType": "AC Condensation Drain Routing Condos Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/ac-condensation-drain-routing-condos",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Prevent window AC condensation from dripping on downstairs neighbor lanais and walkways in Oahu condos. Custom.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/ac-condensation-drain-routing-condos#localbusiness",
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

export default function CondensationDrainAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(condensationDrainFaqSchema) }}
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
