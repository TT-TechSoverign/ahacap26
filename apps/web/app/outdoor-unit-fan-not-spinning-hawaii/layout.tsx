import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Condenser Fan Not Spinning in Hawaii? Causes & Repair Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. LG & GE window AC condenser fan stopped spinning? Diagnose dead capacitors, seized fan bearings, and inverter.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii',
    },
    openGraph: {
        title: 'AC Condenser Fan Not Spinning in Hawaii? Causes & Repair Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. LG & GE window AC condenser fan stopped spinning? Diagnose dead capacitors, seized fan bearings, and inverter.',
        url: 'https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Condenser Fan Not Spinning Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Condenser Fan Not Spinning in Hawaii? Causes & Repair Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. LG & GE window AC condenser fan stopped spinning? Diagnose dead capacitors, seized fan bearings, and inverter.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const outdoorFanFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What happens if the rear condenser fan stops spinning while the window AC is running?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Without the fan drawing air across the rear condenser coils, high-pressure hot refrigerant gas cannot condense into liquid. Head pressure and temperatures skyrocket within 2 to 3 minutes, forcing the compressor into high-pressure thermal overload cutoff and risking permanent motor damage."
            }
        },
        {
            "@type": "Question",
            "name": "What is the most common reason a condenser fan motor stops spinning?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Hawaii, the leading cause is a failed dual-run capacitor where the 'FAN' terminal has lost microfarad rating due to high ambient heat. Other frequent causes include bearing seizure from salt air corrosion or a shorted DC brushless fan motor on inverter window units."
            }
        },
        {
            "@type": "Question",
            "name": "Can I test if the fan motor is seized by spinning the blade?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "With the power cord completely unplugged from the wall receptacle, a technician can gently check the fan shaft rotation. If the shaft resists or binds immediately, the motor bearings are seized."
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
            "name": "Window AC Fan Motor Not Spinning Assessment",
            "item": "https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii#service",
    "name": "AC Condenser Fan Not Spinning in Hawaii? Causes & Repair Oahu ($0 Estimate)",
    "serviceType": "AC Condenser Fan Not Spinning in Hawaii? Causes & Repair Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. LG & GE window AC condenser fan stopped spinning? Diagnose dead capacitors, seized fan bearings, and inverter.",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii#localbusiness",
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

export default function OutdoorFanNotSpinningLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(outdoorFanFaqSchema) }}
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
