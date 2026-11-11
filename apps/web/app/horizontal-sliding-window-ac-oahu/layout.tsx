import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Horizontal Sliding Window AC Installation Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Expert LG & GE window AC installation for horizontal sliding windows on Oahu. Custom vertical filler panels.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/horizontal-sliding-window-ac-oahu',
    },
    openGraph: {
        title: 'Horizontal Sliding Window AC Installation Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Expert LG & GE window AC installation for horizontal sliding windows on Oahu. Custom vertical filler panels.',
        url: 'https://www.affordablehome-ac.com/horizontal-sliding-window-ac-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Horizontal Sliding Window AC Installation Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Horizontal Sliding Window AC Installation Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Expert LG & GE window AC installation for horizontal sliding windows on Oahu. Custom vertical filler panels.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const sliderFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can you install a standard window AC in a horizontal sliding window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Because standard window ACs are designed for up-and-down hung windows, installing them in horizontal sliders leaves an open vertical space above the unit. Our technicians fabricate clean vertical filler panels (acrylic or insulated paneling) and install standard exterior support brackets to ensure an airtight, secure fit."
            }
        },
        {
            "@type": "Question",
            "name": "How is the weight supported in a sliding window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sliding window tracks are made of vinyl or aluminum and are not engineered to hold a 60 to 120 lb air conditioner. We install standard exterior sill support brackets that bear the load securely against the home's exterior sill, protecting the window track from cracking."
            }
        },
        {
            "@type": "Question",
            "name": "Does this seal against trade wind rain and island geckos?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We apply high-density closed-cell weather stripping around the slider sash and custom filler panel, blocking rain, trade wind drafts, and island insects."
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
            "name": "Horizontal Sliding Window AC Installation",
            "item": "https://www.affordablehome-ac.com/horizontal-sliding-window-ac-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/horizontal-sliding-window-ac-oahu#service",
    "name": "Horizontal Sliding Window AC Installation Oahu ($0 Estimate)",
    "serviceType": "Horizontal Sliding Window AC Installation Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/horizontal-sliding-window-ac-oahu",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Expert LG & GE window AC installation for horizontal sliding windows on Oahu. Custom vertical filler panels.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/horizontal-sliding-window-ac-oahu#localbusiness",
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

export default function HorizontalSlidingAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(sliderFaqSchema) }}
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
