import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Blowing Warm Air Oahu | Troubleshooting & $175 Repair | Affordable Home A/C'
    },
    description: 'Is your AC blowing warm air on Oahu? Diagnostic troubleshooting guide for refrigerant leaks, failed capacitors, and compressor lockouts. Fast $175 diagnostic dispatch. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu',
    },
    openGraph: {
        title: 'AC Blowing Warm Air Oahu | Troubleshooting & $175 Repair | Affordable Home A/C',
        description: 'Is your AC blowing warm air on Oahu? Diagnostic troubleshooting guide for refrigerant leaks, failed capacitors, and compressor lockouts. Fast $175 diagnostic dispatch. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/ac-blowing-warm-air-troubleshooting-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Blowing Warm Air Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Blowing Warm Air Oahu | Troubleshooting & $175 Repair | Affordable Home A/C',
        description: 'Is your AC blowing warm air on Oahu? Diagnostic troubleshooting guide for refrigerant leaks, failed capacitors, and compressor lockouts. Fast $175 diagnostic dispatch. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
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
                "text": "The most frequent causes on Oahu are: (1) A blown dual-run motor capacitor caused by island voltage spikes, (2) A refrigerant (Freon) leak due to salt-air coil pitting, (3) A severely clogged outdoor condenser coil blocked by salt and dirt, or (4) A gecko shorting the inverter control board."
            }
        },
        {
            "@type": "Question",
            "name": "How much does it cost to have a technician diagnose warm air?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We charge a transparent flat rate of $175 for our comprehensive on-site diagnostic inspection. A CT-36775 licensed technician tests electrical voltages, refrigerant pressures, and compressor health, providing an upfront quote before any repairs begin."
            }
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
            {children}
        </>
    );
}
