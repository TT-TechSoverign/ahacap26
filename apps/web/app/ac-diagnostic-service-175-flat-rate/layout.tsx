import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Diagnostic Service Oahu | $175 Flat Rate Troubleshooting | Affordable Home A/C'
    },
    description: 'Accurate, honest AC diagnostic service on Oahu for a transparent $175 flat rate. Electrical, refrigerant, and mechanical troubleshooting. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-diagnostic-service-175-flat-rate',
    },
    openGraph: {
        title: 'AC Diagnostic Service Oahu | $175 Flat Rate Troubleshooting | Affordable Home A/C',
        description: 'Accurate, honest AC diagnostic service on Oahu for a transparent $175 flat rate. Electrical, refrigerant, and mechanical troubleshooting. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/ac-diagnostic-service-175-flat-rate',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Diagnostic Service 175 Flat Rate Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Diagnostic Service Oahu | $175 Flat Rate Troubleshooting | Affordable Home A/C',
        description: 'Accurate, honest AC diagnostic service on Oahu for a transparent $175 flat rate. Electrical, refrigerant, and mechanical troubleshooting. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const diagnosticFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is included in the $175 AC Diagnostic Service?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our $175 flat-rate diagnostic covers complete on-site troubleshooting: digital refrigerant pressure checks, electrical capacitor microfarad testing, compressor winding amp draw analysis, inverter circuit board error code diagnosis, and temperature delta-T split evaluation."
            }
        },
        {
            "@type": "Question",
            "name": "Are there extra hidden fees or trip charges depending on my Oahu town?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No hidden trip charges. Our $175 diagnostic fee is transparent across all 22 Oahu municipalities, from Honolulu and Pearl City to Kailua, Kaneohe, Kapolei, and the North Shore."
            }
        },
        {
            "@type": "Question",
            "name": "What happens if my unit requires replacement instead of repair?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "If our licensed technician determines the unit has a seized compressor or rotted coils where repair is uneconomical, we provide a free estimate for a replacement mini split or window AC from our Waipahu warehouse."
            }
        }
    ]
};

export default function AcDiagnosticLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(diagnosticFaqSchema) }}
            />
            {children}
        </>
    );
}
