import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Cleaning Service Oahu | Chemical Teardown & Rust Eradication | Affordable Home A/C'
    },
    description: 'Specialized window AC chemical teardown and deep sanitization service on Oahu. Eradicate black mold, trade-wind salt corrosion, and restore icy cooling airflow.',
    alternates: {
        canonical: '/window_ac_maintenance',
    },
    openGraph: {
        title: 'Window AC Cleaning Service Oahu | Chemical Teardown & Rust Eradication | Affordable Home A/C',
        description: 'Specialized window AC chemical teardown and deep sanitization service on Oahu. Eradicate black mold, trade-wind salt corrosion, and restore icy cooling airflow.',
        url: '/window_ac_maintenance',
        siteName: 'Affordable Home A/C',
        type: 'website',
    }
};

const windowAcFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much does window AC deep cleaning cost in Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our professional chemical teardown and coil sanitization service is a flat rate of $149 per unit with drop-off at our Waipahu warehouse, or convenient $50 round-trip island-wide pickup and delivery."
            }
        },
        {
            "@type": "Question",
            "name": "Why does my window AC smell musty and blow weak air?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hawaii's humidity promotes rapid black mold growth inside the blower wheel, while ocean trade winds deposit corrosive salt on the condenser coils. A specialized chemical teardown removes these deposits, restoring clean air and maximum cooling."
            }
        },
        {
            "@type": "Question",
            "name": "What is included in your window AC chemical teardown?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We completely extract the chassis, isolate sensitive electronics, power-wash the evaporator and condenser coils with coil-brightening chemical wash, sanitize the fan wheel, treat rust, and test cooling performance."
            }
        },
        {
            "@type": "Question",
            "name": "How often should window ACs be professionally cleaned in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For primary bedrooms and living rooms on Oahu, professional teardowns are recommended every 6 to 12 months to prevent premature compressor burnout and maintain healthy indoor air quality."
            }
        }
    ]
};

const hvacServiceSchema = {
    "@context": "https://schema.org",
    "@type": "HVACService",
    "name": "Window AC Chemical Cleaning & Teardown",
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
    "description": "Professional window air conditioner deep chemical teardown, mold eradication, and anti-corrosion maintenance in Oahu, Hawaii."
};

export default function WindowAcMaintenanceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(windowAcFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacServiceSchema) }}
            />
            {children}
        </>
    );
}
