import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'LG & GE Window AC Blinking Light & CH Error Codes Oahu | $0 Estimate | (808) 488-1111'
    },
    description: '$0 Free Estimate • (808) 488-1111. Fix blinking filter lights & CH05/CH21/CH34 error codes on LG & GE Window ACs in Oahu, or swap with an in-stock unit ($395+).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair',
    },
    openGraph: {
        title: 'LG & GE Window AC Blinking Light & CH Error Codes Oahu | $0 Estimate | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Fix blinking filter lights & CH05/CH21/CH34 error codes on LG & GE Window ACs in Oahu, or swap with an in-stock unit ($395+).',
        url: 'https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Blinking Light Error Codes Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LG & GE Window AC Blinking Light & CH Error Codes Oahu | $0 Estimate | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Fix blinking filter lights & CH05/CH21/CH34 error codes on LG & GE Window ACs in Oahu, or swap with an in-stock unit ($395+).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
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
            "name": "LG & GE Window AC Error Codes & Blinking Light",
            "item": "https://www.affordablehome-ac.com/blinking-light-error-codes-ac-repair"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
