import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Blinking Light Error Codes AC Repair Oahu | LG, Mitsubishi & Daikin | Affordable Home A/C'
    },
    description: 'Decode blinking green LED lights and error codes on LG, Mitsubishi, Daikin, and Fujitsu air conditioners on Oahu. Fast diagnostic triage by licensed CT-36775 technicians. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair',
    },
    openGraph: {
        title: 'Blinking Light Error Codes AC Repair Oahu | LG, Mitsubishi & Daikin | Affordable Home A/C',
        description: 'Decode blinking green LED lights and error codes on LG, Mitsubishi, Daikin, and Fujitsu air conditioners on Oahu. Fast diagnostic triage by licensed CT-36775 technicians. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Blinking Light Error Codes Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Blinking Light Error Codes AC Repair Oahu | LG, Mitsubishi & Daikin | Affordable Home A/C',
        description: 'Decode blinking green LED lights and error codes on LG, Mitsubishi, Daikin, and Fujitsu air conditioners on Oahu. Fast diagnostic triage by licensed CT-36775 technicians. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const errorCodeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What does a blinking green light on my air conditioner mean?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A flashing LED light on your indoor air conditioner unit indicates a self-diagnostic error code. Count the number of flashes between pauses. For example, on LG units, 5 flashes indicates an indoor thermistor fault, 6 flashes indicates an inverter DC peak, and a blinking CH05 code indicates a communication breakdown between the indoor and outdoor units."
            }
        },
        {
            "@type": "Question",
            "name": "Can I reset a blinking AC error code by turning off the breaker?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, turning off the breaker for 5 full minutes performs a hard microprocessor reset. If the error was caused by a transient power surge from the HECO grid, the unit may restart normally. However, if the light starts flashing again immediately upon powering on, a physical component failure exists that requires technician attention."
            }
        }
    ]
};

export default function BlinkingLightErrorCodesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(errorCodeFaqSchema) }}
            />
            {children}
        </>
    );
}
