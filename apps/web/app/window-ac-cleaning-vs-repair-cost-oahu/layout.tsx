import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: "Window AC Cleaning vs Repair vs Replace Oahu | $0 Estimate",
    },
    description: "Should you deep-clean, repair, or replace your Oahu Window AC? Honest age, mold, rust & HECO 44.2¢/kWh ROI guide + $0 Free Estimate • Call (808) 488-1111.",
    alternates: {
        canonical: "https://www.affordablehome-ac.com/window-ac-cleaning-vs-repair-cost-oahu",
    },
    openGraph: {
        title: "Window AC Cleaning vs Repair vs Replace Oahu | $0 Estimate",
        description: "Should you deep-clean, repair, or replace your Oahu Window AC? Honest age, mold, rust & HECO 44.2¢/kWh ROI guide + $0 Free Estimate • Call (808) 488-1111.",
        url: "https://www.affordablehome-ac.com/window-ac-cleaning-vs-repair-cost-oahu",
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
                width: 1600,
                height: 1000,
                alt: "Oahu Window AC Deep Cleaning vs Repair vs New LG GE Replacement Guide",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Window AC Cleaning vs Repair vs Replace Oahu | $0 Estimate",
        description: "Should you deep-clean, repair, or replace your Oahu Window AC? Honest age, mold, rust & HECO 44.2¢/kWh ROI guide + $0 Free Estimate • Call (808) 488-1111.",
        images: ["https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"],
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How old is too old to spend money repairing a window air conditioner in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "On Oahu, once a standard fixed-speed window AC passes 6 to 8 years of salt-air exposure—or if its compressor or sealed copper coils fail—putting repair dollars into it rarely makes financial sense when a brand-new LG 8,000 BTU unit starts at $395 and a 44dB LG Dual Inverter starts at $560 ($515 net after the $45 Hawaii Energy rebate)."
            }
        },
        {
            "@type": "Question",
            "name": "How often should a window AC be professionally deep-cleaned on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We recommend deep evaporator/condenser coil sanitization and antimicrobial pan treatment every 6 months for coastal homes, pet households, or 12-hour/day sleepers, and every 12 months for inland Oahu bedrooms."
            }
        },
        {
            "@type": "Question",
            "name": "Do you charge anything upfront to inspect whether my AC should be cleaned or replaced?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. You can request a $0 Free In-Home Estimate by appointment with zero upfront checkout payment barriers. Our specialist evaluates your unit's coils, Delta-T cooling split, and chassis condition and gives you honest itemized options."
            }
        },
        {
            "@type": "Question",
            "name": "Do your technicians keep messy coil wash water off my bedroom floor?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes—100%. Laying clean protective floor drop cloths under the window or wall sleeve is a mandatory step on every Affordable Home A/C cleaning and installation visit."
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
            "name": "Window AC Cleaning Oahu",
            "item": "https://www.affordablehome-ac.com/ac-cleaning-oahu"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Clean vs. Replace Calculator",
            "item": "https://www.affordablehome-ac.com/clean-vs-replace-window-ac"
        },
        {
            "@type": "ListItem",
            "position": 4,
            "name": "Cleaning vs. Repair vs. Replace Matrix",
            "item": "https://www.affordablehome-ac.com/window-ac-cleaning-vs-repair-cost-oahu"
        }
    ]
};

const richEntitySchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/window-ac-cleaning-vs-repair-cost-oahu#service",
    "name": "Window AC Cleaning vs Repair vs Replace Oahu | $0 Estimate",
    "serviceType": "Window Air Conditioner Deep Cleaning, Troubleshooting & Replacement Evaluation",
    "url": "https://www.affordablehome-ac.com/window-ac-cleaning-vs-repair-cost-oahu",
    "description": "Should you deep-clean, repair, or replace your Oahu Window AC? Honest age, mold, rust & HECO 44.2¢/kWh ROI guide + $0 Free Estimate • Call (808) 488-1111.",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/window-ac-cleaning-vs-repair-cost-oahu#localbusiness",
        "parentOrganization": {
            "@id": "https://www.affordablehome-ac.com/#hvacbusiness"
        },
        "name": "Affordable Home A/C",
        "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
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
        },
        "areaServed": {
            "@type": "AdministrativeArea",
            "name": "Oahu, Hawaii"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "142",
            "bestRating": "5",
            "worstRating": "1"
        }
    },
    "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Oahu, Hawaii"
    }
};

export default function PillarRouteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(richEntitySchema).replace(/</g, '\\u003c') }}
            />
            {children}
        </>
    );
}
