import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Repair Oahu | $175 Diagnostic Inspection & Fast Dispatch | Affordable Home A/C'
    },
    description: 'Blowing warm air, leaking water, or tripped breakers? Schedule a flat-rate $175 AC diagnostic inspection across Oahu. Fast appointment dispatch by licensed Hawaii contractor CT-36775.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-repair-oahu',
    },
    openGraph: {
        title: 'AC Repair Oahu | $175 Diagnostic Inspection & Fast Dispatch | Affordable Home A/C',
        description: 'Blowing warm air, leaking water, or tripped breakers? Schedule a flat-rate $175 AC diagnostic inspection across Oahu. Fast appointment dispatch by licensed Hawaii contractor CT-36775.',
        url: 'https://www.affordablehome-ac.com/ac-repair-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Repair Oahu Diagnostic Inspection',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Repair Oahu | $175 Diagnostic Inspection & Fast Dispatch | Affordable Home A/C',
        description: 'Blowing warm air, leaking water, or tripped breakers? Schedule a flat-rate $175 AC diagnostic inspection across Oahu. Fast appointment dispatch by licensed Hawaii contractor CT-36775.',
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
            "name": "AC Repair Oahu",
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
            "name": "How quickly can a technician be scheduled for AC repair on Oahu?",
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
            "name": "What if my AC unit is too old or expensive to repair?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "If your compressor is seized or the unit is over 8 years old with extensive salt-air coil corrosion, repair costs can exceed the unit's value. Because we maintain our own central warehouse in Waipahu, we can immediately offer in-stock LG Dual Inverter window AC replacements (with pickup by appointment or $50 delivery) or provide an honest $0 upfront estimate for a new ductless mini-split."
            }
        },
        {
            "@type": "Question",
            "name": "Do you repair both window ACs and ductless mini-splits?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Our CT-36775 licensed technicians service and repair both ductless mini-splits (Mitsubishi, Daikin, Fujitsu, LG) and heavy-duty window air conditioners across Honolulu, Pearl City, Waipahu, Kailua, and all Oahu."
            }
        }
    ]
};

const hvacServiceSchema = {
    "@context": "https://schema.org",
    "@type": "HVACService",
    "name": "Air Conditioning Diagnostic Repair & Troubleshooting",
    "provider": {
        "@type": "HVACBusiness",
        "name": "Affordable Home A/C",
        "telephone": "+1-808-488-1111",
        "licenseNumber": "CT-36775",
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
    "description": "Professional residential AC repair, refrigerant leak detection, compressor diagnostics, and electrical troubleshooting across Oahu.",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AC Repair Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "name": "AC Diagnostic Inspection (By Appointment)",
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
