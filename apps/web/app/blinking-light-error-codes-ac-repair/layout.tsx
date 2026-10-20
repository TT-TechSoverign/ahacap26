import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Blinking Light Error Codes AC Repair Oahu | LG & GE Window AC | Affordable Home A/C'
    },
    description: 'Decode blinking LED lights and digital CH error codes on LG Dual Inverter and GE window air conditioners on Oahu. Fast diagnostic triage by Oahu cooling specialists. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair',
    },
    openGraph: {
        title: 'Blinking Light Error Codes AC Repair Oahu | LG & GE Window AC | Affordable Home A/C',
        description: 'Decode blinking LED lights and digital CH error codes on LG Dual Inverter and GE window air conditioners on Oahu. Fast diagnostic triage by Oahu cooling specialists. Call (808) 488-1111.',
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
        title: 'Blinking Light Error Codes AC Repair Oahu | LG & GE Window AC | Affordable Home A/C',
        description: 'Decode blinking LED lights and digital CH error codes on LG Dual Inverter and GE window air conditioners on Oahu. Fast diagnostic triage by Oahu cooling specialists. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const errorCodeFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What does a blinking light or CH code on my window air conditioner mean?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A flashing LED light or CH display on your LG or GE window air conditioner indicates a self-diagnostic error code. For example, on LG Dual Inverter units, CH01 indicates an indoor room thermistor fault, CH02 indicates an evaporator pipe thermistor fault, and CH21 indicates compressor overcurrent protection."
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
