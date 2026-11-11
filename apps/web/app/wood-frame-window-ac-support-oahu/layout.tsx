import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Wood-Frame Window AC Support Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Protect historic wood-frame window sills from moisture rot and mechanical strain on Oahu. Waterproof neoprene.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/wood-frame-window-ac-support-oahu',
    },
    openGraph: {
        title: 'Wood-Frame Window AC Support Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Protect historic wood-frame window sills from moisture rot and mechanical strain on Oahu. Waterproof neoprene.',
        url: 'https://www.affordablehome-ac.com/wood-frame-window-ac-support-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Wood-Frame Window AC Support Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Wood-Frame Window AC Support Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Protect historic wood-frame window sills from moisture rot and mechanical strain on Oahu. Waterproof neoprene.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const woodFrameFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do you prevent window AC condensation from rotting wooden sills?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We install impermeable waterproof neoprene sill barriers between the AC chassis and the wooden sill, and calibrate a precise 1/4-inch backward pitch so all condensate flows outside away from the wood structure."
            }
        },
        {
            "@type": "Question",
            "name": "Can older wooden window sills support a heavy air conditioner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Older wooden sills can crack or splinter under the concentrated weight of a 70 to 140 lb unit. Our technicians install standard exterior LG & GE window AC support brackets that anchor to the exterior wall framing, transferring the load away from the wooden sill."
            }
        },
        {
            "@type": "Question",
            "name": "Do you treat or protect damaged wood before installation?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians inspect the wood for existing moisture damage or termite activity before mounting, and apply protective flashing pads to prevent further wear."
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
            "name": "Wood-Frame Sill Window AC Support",
            "item": "https://www.affordablehome-ac.com/wood-frame-window-ac-support-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/wood-frame-window-ac-support-oahu#service",
    "name": "Wood-Frame Window AC Support Oahu ($0 Estimate)",
    "serviceType": "Wood-Frame Window AC Support Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/wood-frame-window-ac-support-oahu",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Protect historic wood-frame window sills from moisture rot and mechanical strain on Oahu. Waterproof neoprene.",
    "provider": {
        "@type": "HVACBusiness",
        "name": "Affordable Home A/C",
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

export default function WoodFrameAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(woodFrameFaqSchema) }}
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
