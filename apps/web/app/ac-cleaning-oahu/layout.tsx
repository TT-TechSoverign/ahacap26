import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Cleaning Oahu | Basic ($175) & Premium Deep Teardown ($275) | Affordable Home A/C'
    },
    description: 'Breathe cleaner air and restore ice-cold airflow with professional ductless mini split AC cleaning on Oahu. Basic service ($175) and Premium teardown ($275) with floor drop cloths. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-cleaning-oahu',
    },
    openGraph: {
        title: 'AC Cleaning Oahu | Basic ($175) & Premium Deep Teardown ($275) | Affordable Home A/C',
        description: 'Breathe cleaner air and restore ice-cold airflow with professional ductless mini split AC cleaning on Oahu. Basic service ($175) and Premium teardown ($275) with floor drop cloths. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/ac-cleaning-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Cleaning Oahu Basic and Premium Teardown',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Cleaning Oahu | Basic ($175) & Premium Deep Teardown ($275) | Affordable Home A/C',
        description: 'Breathe cleaner air and restore ice-cold airflow with professional ductless mini split AC cleaning on Oahu. Basic service ($175) and Premium teardown ($275) with floor drop cloths. Call (808) 488-1111.',
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
            "name": "AC Cleaning Oahu",
            "item": "https://www.affordablehome-ac.com/ac-cleaning-oahu"
        }
    ]
};

const acCleaningFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the difference between Basic and Premium Mini Split AC cleaning?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Basic Mini Split AC Cleaning ($175) provides routine filter and coil care, drain line flushing, and temperature/pressure verification. Premium Mini Split AC Cleaning ($275) includes a Full Teardown: disassembling the unit to access hidden dirt, deep cleaning the air scoop and blower wheel, and thoroughly flushing condensate pans to eradicate deep black mold."
            }
        },
        {
            "@type": "Question",
            "name": "Do you clean window air conditioners on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Window units are sealed consumer appliances that are generally uneconomical to disassemble and chemically overhaul once mold or bearing noise sets in. We recommend regular DIY filter cleaning for young units, or upgrading to a brand-new LG Dual Inverter starting at $504 with a $45 Hawaii Energy cash rebate."
            }
        },
        {
            "@type": "Question",
            "name": "Do your technicians use protective floor drop cloths?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, absolutely. Our licensed technicians always lay clean protective floor drop cloths beneath the unit during service, ensuring your home is left cleaner than when we arrived."
            }
        }
    ]
};

const hvacServiceSchema = {
    "@context": "https://schema.org",
    "@type": "HVACService",
    "name": "AC Cleaning & Mold Remediation Service",
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
    "description": "Professional air conditioning cleaning, black mold sanitation, and preventative coil care across Oahu.",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "AC Cleaning Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "name": "Basic Mini Split AC Cleaning",
                "price": "175.00",
                "priceCurrency": "USD",
                "description": "Routine filter and coil care, drain flush, and performance inspection."
            },
            {
                "@type": "Offer",
                "name": "Premium Mini Split AC Cleaning (Full Teardown)",
                "price": "275.00",
                "priceCurrency": "USD",
                "description": "Complete disassembly, deep clean air scoop & blower wheel, flush condensate pans, coil wash."
            }
        ]
    }
};

export default function AcCleaningOahuLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(acCleaningFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacServiceSchema) }}
            />
            {children}
        </>
    );
}
