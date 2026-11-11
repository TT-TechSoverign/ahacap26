import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Making Loud Buzzing Noise? Causes & Fixes Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Diagnose and silence loud buzzing, humming, and vibrating LG & GE window air conditioners in Oahu. Bracket.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-making-loud-buzzing-noise',
    },
    openGraph: {
        title: 'Window AC Making Loud Buzzing Noise? Causes & Fixes Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Diagnose and silence loud buzzing, humming, and vibrating LG & GE window air conditioners in Oahu. Bracket.',
        url: 'https://www.affordablehome-ac.com/window-ac-making-loud-buzzing-noise',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Making Loud Buzzing Noise Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Making Loud Buzzing Noise? Causes & Fixes Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Diagnose and silence loud buzzing, humming, and vibrating LG & GE window air conditioners in Oahu. Bracket.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const buzzingAcFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is my window air conditioner making a loud buzzing or vibrating sound?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Window AC buzzing is typically caused by four factors: loose sheet metal screws vibrating against the outer cabinet, degraded rubber compressor vibration grommets, the fan blade striking debris or the plastic shroud, or an improper window sill mounting angle."
            }
        },
        {
            "@type": "Question",
            "name": "Can an unlevel mounting bracket cause the unit to buzz loudly?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. If the unit does not have proper neoprene vibration isolation pads between the metal chassis and the exterior sill bracket, compressor harmonic vibration transmits directly into the window frame and wall studs, amplifying the noise throughout the room."
            }
        },
        {
            "@type": "Question",
            "name": "Can Affordable Home A/C silence or repair a buzzing window unit?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We offer on-site bracket re-seating and vibration dampening, or brand-new whisper-quiet Dual Inverter models starting at $560 (as quiet as 44 dB) with an available $45 Hawaii Energy rebate."
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
            "name": "Loud or Rattling Window AC Assessment",
            "item": "https://www.affordablehome-ac.com/window-ac-making-loud-buzzing-noise"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/window-ac-making-loud-buzzing-noise#service",
    "name": "Window AC Making Loud Buzzing Noise? Causes & Fixes Oahu ($0 Estimate)",
    "serviceType": "Window AC Making Loud Buzzing Noise? Causes & Fixes Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/window-ac-making-loud-buzzing-noise",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Diagnose and silence loud buzzing, humming, and vibrating LG & GE window air conditioners in Oahu. Bracket.",
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

export default function WindowAcBuzzingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(buzzingAcFaqSchema) }}
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
