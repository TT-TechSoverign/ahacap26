import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Renter-Friendly Window AC Installation Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Zero-damage LG & GE window air conditioner mounting for Oahu renters and tenants. Protect your security deposit.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/renter-friendly-ac-installation-oahu',
    },
    openGraph: {
        title: 'Renter-Friendly Window AC Installation Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Zero-damage LG & GE window air conditioner mounting for Oahu renters and tenants. Protect your security deposit.',
        url: 'https://www.affordablehome-ac.com/renter-friendly-ac-installation-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Renter-Friendly Window AC Installation Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Renter-Friendly Window AC Installation Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Zero-damage LG & GE window air conditioner mounting for Oahu renters and tenants. Protect your security deposit.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const renterFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can I install a window AC in a rental home without losing my security deposit?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our technicians use zero-damage installation methods. Instead of screwing directly into your landlord's window sashes or frames, we use compression-fit support brackets and non-adhesive foam compression seals that leave zero holes, scratches, or residue when removed."
            }
        },
        {
            "@type": "Question",
            "name": "How easily can I take the window AC with me when I move?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our installation is 100% reversible. When your lease ends, the unit and brackets can be disassembled in 15 minutes, returning the window to its original untouched condition."
            }
        },
        {
            "@type": "Question",
            "name": "Can renters claim the $45 Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Anyone who pays an electric utility bill or lives in an eligible residential dwelling on Oahu can claim the $45 Hawaii Energy cash rebate on qualifying Energy Star window ACs."
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
            "name": "Renter-Friendly Window AC Installation",
            "item": "https://www.affordablehome-ac.com/renter-friendly-ac-installation-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/renter-friendly-ac-installation-oahu#service",
    "name": "Renter-Friendly Window AC Installation Oahu ($0 Estimate)",
    "serviceType": "Renter-Friendly Window AC Installation Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/renter-friendly-ac-installation-oahu",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Zero-damage LG & GE window air conditioner mounting for Oahu renters and tenants. Protect your security deposit.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/renter-friendly-ac-installation-oahu#localbusiness",
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

export default function RenterFriendlyAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(renterFaqSchema) }}
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
