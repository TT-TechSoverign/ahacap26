import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Vinyl Window AC Mounting Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Specialized LG & GE window air conditioner mounting for vinyl replacement windows on Oahu. Weight distribution.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/vinyl-replacement-window-ac-mounting',
    },
    openGraph: {
        title: 'Vinyl Window AC Mounting Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Specialized LG & GE window air conditioner mounting for vinyl replacement windows on Oahu. Weight distribution.',
        url: 'https://www.affordablehome-ac.com/vinyl-replacement-window-ac-mounting',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Vinyl Window AC Mounting Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Vinyl Window AC Mounting Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Specialized LG & GE window air conditioner mounting for vinyl replacement windows on Oahu. Weight distribution.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const vinylWindowFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can resting a window AC directly on a vinyl window frame cause damage?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Modern vinyl replacement windows have hollow internal chambers that are not engineered to hold 60 to 120 lbs of dead weight. Resting an AC directly on the thin vinyl sill can permanently bend the track, crack the welded corners, or cause water leakage into the wall."
            }
        },
        {
            "@type": "Question",
            "name": "How do you safely mount a window AC in a vinyl window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians install standard exterior window AC support brackets that bear 100% of the unit's weight against the exterior building sill. We bridge the vinyl track with high-density rubber cushion blocks so zero mechanical downward force touches the vinyl frame."
            }
        },
        {
            "@type": "Question",
            "name": "Does this installation void my vinyl window manufacturer warranty?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Because our mounting brackets require zero drilling into the vinyl window frame or sills, your window warranty remains completely intact."
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
            "name": "Vinyl Window Frame AC Mounting",
            "item": "https://www.affordablehome-ac.com/vinyl-replacement-window-ac-mounting"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/vinyl-replacement-window-ac-mounting#service",
    "name": "Vinyl Window AC Mounting Oahu ($0 Estimate)",
    "serviceType": "Vinyl Window AC Mounting Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/vinyl-replacement-window-ac-mounting",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Specialized LG & GE window air conditioner mounting for vinyl replacement windows on Oahu. Weight distribution.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/vinyl-replacement-window-ac-mounting#localbusiness",
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

export default function VinylWindowAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(vinylWindowFaqSchema) }}
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
