import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Burning Electrical Smell Oahu? Emergency Shutoff & Repair ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Smell burning plastic, fishy odor, or electrical smoke from your LG or GE window AC vents? Follow immediate.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-burning-electrical-smell-oahu',
    },
    openGraph: {
        title: 'AC Burning Electrical Smell Oahu? Emergency Shutoff & Repair ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Smell burning plastic, fishy odor, or electrical smoke from your LG or GE window AC vents? Follow immediate.',
        url: 'https://www.affordablehome-ac.com/ac-burning-electrical-smell-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Burning Electrical Smell Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Burning Electrical Smell Oahu? Emergency Shutoff & Repair ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Smell burning plastic, fishy odor, or electrical smoke from your LG or GE window AC vents? Follow immediate.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const burningSmellFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What should I do immediately if I smell burning electrical plastic from my AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Immediately shut off the air conditioner at the remote or front control panel, unplug the LCDI power cord if safely accessible, and go straight to your main electrical panel to switch the AC circuit breaker completely OFF. Do not leave the system energized, as overheating wires can ignite surrounding building materials."
            }
        },
        {
            "@type": "Question",
            "name": "What causes an air conditioner to produce a burning electrical odor?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most frequent causes are high-resistance electrical connections where terminal screws have loosened, causing wire insulation to melt; an overheating blower fan motor with seized bearings; or a ruptured capacitor leaking hot dielectric fluid."
            }
        },
        {
            "@type": "Question",
            "name": "Why does a burning electrical issue sometimes smell like dead fish?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "When the plastic and resin binders in electrical circuit breakers, power relays, or terminal blocks overheat, they release pungent amine compounds that produce a strong, unmistakable fish-like chemical odor."
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
            "name": "Window AC Electrical Smell Safety Guide",
            "item": "https://www.affordablehome-ac.com/ac-burning-electrical-smell-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-burning-electrical-smell-oahu#service",
    "name": "AC Burning Electrical Smell Oahu? Emergency Shutoff & Repair ($0 Estimate)",
    "serviceType": "AC Burning Electrical Smell Oahu? Emergency Shutoff & Repair ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/ac-burning-electrical-smell-oahu",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Smell burning plastic, fishy odor, or electrical smoke from your LG or GE window AC vents? Follow immediate.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/ac-burning-electrical-smell-oahu#localbusiness",
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

export default function AcBurningSmellLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(burningSmellFaqSchema) }}
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
