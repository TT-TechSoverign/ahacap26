import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Smells Musty in Hawaii? Deep Mold Cleaning ($0 Estimate) | (808) 488-1111'
    },
    description: '$0 Free Estimate • (808) 488-1111. Eliminate musty mildew & dirty sock odors from your Oahu Window AC with deep evaporator coil & blower wheel sanitization.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-smells-musty-mildew-hawaii',
    },
    openGraph: {
        title: 'Window AC Smells Musty in Hawaii? Deep Mold Cleaning ($0 Estimate) | (808) 488-1111',
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
        title: 'Window AC Smells Musty in Hawaii? Deep Mold Cleaning ($0 Estimate) | (808) 488-1111',
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
                "text": "Known in the HVAC industry as 'Dirty Sock Syndrome,' this pungent odor is caused by bacterial colonies and mold spores decaying on the damp cooling coils and in stagnant drain pan water. Hawaii's persistent high humidity accelerates this microbial growth."
            }
        },
        {
            "@type": "Question",
            "name": "Will spraying air freshener or disinfectant spray into the vents fix the smell?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Spraying household aerosol fresheners only masks the odor for hours while leaving the sticky bacterial biofilm intact on the aluminum fins. In fact, many household sprays can corrode sensitive evaporator coils."
            }
        },
        {
            "@type": "Question",
            "name": "How does Affordable Home A/C eradicate musty AC odors permanently?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We apply foaming alkaline coil detergents that dissolve biofilm down to bare aluminum, pressure flush stagnant condensate pans, treat drain lines with antimicrobial agents, and scrub the blower fan assembly where mold spores cling."
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
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Eliminate musty mildew & dirty sock odors from your Oahu Window AC with deep evaporator coil & blower wheel sanitization.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/ac-smells-musty-mildew-hawaii#localbusiness",
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
