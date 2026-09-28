import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Quiet Bedroom Window AC Oahu | 44 dB Ultra-Quiet Dual Inverter | Affordable Home A/C'
    },
    description: 'Sleep in whisper-quiet comfort with 44 dB LG Dual Inverter bedroom window ACs on Oahu. In-stock in Waipahu ($504–$545) with $45 Hawaii Energy cash rebate. Free pickup or $50 delivery.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/quiet-bedroom-window-ac-oahu',
    },
    openGraph: {
        title: 'Quiet Bedroom Window AC Oahu | 44 dB Ultra-Quiet Dual Inverter | Affordable Home A/C',
        description: 'Sleep in whisper-quiet comfort with 44 dB LG Dual Inverter bedroom window ACs on Oahu. In-stock in Waipahu ($504–$545) with $45 Hawaii Energy cash rebate. Free pickup or $50 delivery.',
        url: 'https://www.affordablehome-ac.com/quiet-bedroom-window-ac-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Quiet Bedroom Window AC Oahu 44dB',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Quiet Bedroom Window AC Oahu | 44 dB Ultra-Quiet Dual Inverter | Affordable Home A/C',
        description: 'Sleep in whisper-quiet comfort with 44 dB LG Dual Inverter bedroom window ACs on Oahu. In-stock in Waipahu ($504–$545) with $45 Hawaii Energy cash rebate. Free pickup or $50 delivery.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const bedroomFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How quiet is an LG Dual Inverter window AC in a bedroom?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Sleep Mode, LG Dual Inverter 6,000 and 8,000 BTU models operate at just 44 decibels (dB)—as quiet as a quiet library or a gentle rain shower. Unlike traditional units that clatter and shudder when the compressor kicks on, the Dual Inverter variable-speed motor ramps up and down smoothly with zero sudden start-stop clangs."
            }
        },
        {
            "@type": "Question",
            "name": "How much electricity does a quiet window AC use overnight on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "At HECO's residential rate of ~44.2¢/kWh, running an LG Dual Inverter 8 hours overnight typically consumes only 2.0 to 2.4 kWh, which amounts to approximately $0.90 to $1.06 per night. Older single-speed window ACs draw over 2.5x more power."
            }
        },
        {
            "@type": "Question",
            "name": "Does this quiet bedroom unit qualify for a Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Both the 6,000 BTU (LW6023IVSM) and 8,000 BTU (LW8022IVSM) are Energy Star certified and qualify for the $45 Hawaii Energy cash rebate."
            }
        }
    ]
};

export default function QuietBedroomWindowAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(bedroomFaqSchema) }}
            />
            {children}
        </>
    );
}
