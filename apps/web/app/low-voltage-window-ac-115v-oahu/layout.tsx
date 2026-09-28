import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '115V Window AC Units Oahu | Standard 15A Wall Plug | Affordable Home A/C'
    },
    description: 'High-efficiency 115V window air conditioners that run safely on standard 15-amp household circuits. No electrician or 230V sub-panel rewiring required. In stock in Waipahu.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu',
    },
    openGraph: {
        title: '115V Window AC Units Oahu | Standard 15A Wall Plug | Affordable Home A/C',
        description: 'High-efficiency 115V window air conditioners that run safely on standard 15-amp household circuits. No electrician or 230V sub-panel rewiring required. In stock in Waipahu.',
        url: 'https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: '115V Window AC Units Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '115V Window AC Units Oahu | Standard 15A Wall Plug | Affordable Home A/C',
        description: 'High-efficiency 115V window air conditioners that run safely on standard 15-amp household circuits. No electrician or 230V sub-panel rewiring required. In stock in Waipahu.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const lowVoltageFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the largest BTU window AC that runs on a standard 115V outlet?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Thanks to LG Dual Inverter variable-speed compressor technology, units up to 14,000 BTU (such as the LW1522IVSM) can operate on a standard 115V 15-amp circuit with a standard NEMA 5-15P plug, cooling up to 800 sq ft without requiring a 230V line."
            }
        },
        {
            "@type": "Question",
            "name": "Will a 115V Dual Inverter window AC trip my home's circuit breaker?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Traditional non-inverter units draw massive startup current spikes (often 30 to 40 amps for a split second) when the compressor kicks on, tripping older breakers. LG Dual Inverters feature soft-start electronics that gradually ramp up power, virtually eliminating breaker trips."
            }
        },
        {
            "@type": "Question",
            "name": "Can I use an extension cord with a 115V window air conditioner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We strongly recommend plugging directly into a wall receptacle. If necessary, only use a heavy-duty, 14-gauge or 12-gauge appliance-rated extension cord rated for 15 amps to prevent overheating and voltage drop."
            }
        }
    ]
};

export default function LowVoltageAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(lowVoltageFaqSchema) }}
            />
            {children}
        </>
    );
}
