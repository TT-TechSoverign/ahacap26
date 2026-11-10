import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Blowing Warm Air Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC blowing warm air on Oahu? Diagnostic troubleshooting guide for refrigerant leaks.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu',
    },
    openGraph: {
        title: 'AC Blowing Warm Air Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC blowing warm air on Oahu? Diagnostic troubleshooting guide for refrigerant leaks.',
        url: 'https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Blowing Warm Air Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Blowing Warm Air Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC blowing warm air on Oahu? Diagnostic troubleshooting guide for refrigerant leaks.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const warmAirFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is my AC running but blowing warm room-temperature air on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most frequent causes on Oahu are: (1) A blown dual-run motor capacitor caused by island voltage spikes, (2) A refrigerant (Freon) leak due to salt-air coil pitting, (3) A severely clogged exterior condenser coil blocked by salt and dirt, or (4) A gecko shorting the inverter control board."
            }
        },
        {
            "@type": "Question",
            "name": "How much does it cost to have a technician diagnose warm air?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We provide on-site window AC troubleshooting and clean-vs-replace assessments across Oahu. An experienced technician tests electrical voltages, airflow, and compressor health, providing an upfront recommendation before any work begins."
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
            "name": "Window AC Blowing Warm Air Troubleshooting",
            "item": "https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu"
        }
    ]
};

export default function AcBlowingWarmAirLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(warmAirFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
