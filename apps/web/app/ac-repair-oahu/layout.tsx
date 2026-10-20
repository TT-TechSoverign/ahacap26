import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Repair Oahu | $175 Diagnostic Inspection | Affordable Home A/C'
    },
    description: 'Blowing warm air, leaking water, or tripped breakers? Schedule a flat-rate $175 Window AC diagnostic inspection across Oahu. Fast appointment dispatch • Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-repair-oahu',
    },
    openGraph: {
        title: 'Window AC Repair Oahu | $175 Diagnostic Inspection | Affordable Home A/C',
        description: 'Blowing warm air, leaking water, or tripped breakers? Schedule a flat-rate $175 Window AC diagnostic inspection across Oahu. Fast appointment dispatch • Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/ac-repair-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Window AC Repair Oahu Diagnostic Inspection',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Repair Oahu | $175 Diagnostic Inspection | Affordable Home A/C',
        description: 'Blowing warm air, leaking water, or tripped breakers? Schedule a flat-rate $175 Window AC diagnostic inspection across Oahu. Fast appointment dispatch • Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
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
            "name": "Window AC Repair Oahu",
            "item": "https://www.affordablehome-ac.com/ac-repair-oahu"
        }
    ]
};

const acRepairFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How quickly can a technician be scheduled for Window AC repair on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We schedule diagnostic appointments based on our earliest technician availability across all 22 Oahu municipalities. Booking through our form allows our dispatch team to coordinate a convenient appointment window with zero upfront deposit required."
            }
        },
        {
            "@type": "Question",
            "name": "How much is the diagnostic service fee?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We charge a standard $175 flat-rate diagnostic inspection fee that covers on-site technician dispatch, travel time, and a comprehensive electrical and mechanical troubleshooting evaluation."
            }
        },
        {
            "@type": "Question",
            "name": "What if my Window AC unit is too old or expensive to repair?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "If your compressor is seized or the unit is over 5–7 years old with extensive salt-air coil corrosion, repair costs can exceed the unit's value. Because we maintain our own Waipahu warehouse, we can immediately offer in-stock LG Dual Inverter and GE Built-In window AC replacements ($395–$1,200) with free Waipahu pickup or $50 flat Oahu delivery."
            }
        },
        {
            "@type": "Question",
            "name": "Do you service both jalousie-mounted and through-the-wall window ACs?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Our technicians service and replace both standard/jalousie-mounted LG Dual Inverter window units and 26-inch GE Built-In through-the-wall chassis across Honolulu, Pearl City, Waipahu, Kailua, and all Oahu."
            }
        }
    ]
};

const hvacServiceSchema = {
    "@context": "https://schema.org",
    "@type": "HVACService",
    "name": "Window Air Conditioning Diagnostic Repair & Troubleshooting",
    "provider": {
        "@type": "HVACBusiness",
        "name": "Affordable Home A/C",
        "telephone": "+1-808-488-1111",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "94-150 Leoleo St. #203",
            "addressLocality": "Waipahu",
            "addressRegion": "HI",
            "postalCode": "96797",
            "addressCountry": "US"
        }
    },
    "areaServed": "Oahu",
    "description": "Professional residential Window AC repair, compressor diagnostics, and electrical troubleshooting across Oahu.",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Window AC Repair Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "name": "Window AC Diagnostic Inspection (By Appointment)",
                "price": "175.00",
                "priceCurrency": "USD",
                "description": "Comprehensive electrical, mechanical, and refrigeration diagnostic inspection with itemized quote before repair."
            }
        ]
    }
};

export default function AcRepairOahuLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(acRepairFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacServiceSchema) }}
            />
            {children}
        </>
    );
}
