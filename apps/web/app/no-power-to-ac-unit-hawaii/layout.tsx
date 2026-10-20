import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'No Power to AC Unit in Hawaii? Breaker & Disconnect Checks | Affordable Home A/C'
    },
    description: 'Window AC unit completely dead with no power or display lights in Hawaii? Check circuit breakers, LCDI safety plugs, and control fuses.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii',
    },
    openGraph: {
        title: 'No Power to AC Unit in Hawaii? Breaker & Disconnect Checks | Affordable Home A/C',
        description: 'Window AC unit completely dead with no power or display lights in Hawaii? Check circuit breakers, LCDI safety plugs, and control fuses.',
        url: 'https://www.affordablehome-ac.com/no-power-to-ac-unit-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'No Power to AC Unit Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'No Power to AC Unit in Hawaii? Breaker & Disconnect Checks | Affordable Home A/C',
        description: 'Window AC unit completely dead with no power or display lights in Hawaii? Check circuit breakers, LCDI safety plugs, and control fuses.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const noPowerFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is my window air conditioner completely dead with no display lights or sound?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "When a window AC has zero power, the most common causes are a tripped LCDI safety button on the power cord plug head, a tripped circuit breaker in your electrical panel, or a blown low-voltage fuse on the internal control board."
            }
        },
        {
            "@type": "Question",
            "name": "How does the LCDI safety plug on my window AC cord work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "High-efficiency window units incorporate a Leakage Current Detection Interrupter (LCDI) on the plug head. If a power surge or cord damage occurs, the button pops out and cuts power immediately to prevent electrical hazards."
            }
        },
        {
            "@type": "Question",
            "name": "What should I do if the circuit breaker trips immediately when I reset it?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Never force a breaker to stay in the ON position or repeatedly reset it. An instantaneous trip signifies a hard direct short to ground in the compressor windings or an inverter power module failure."
            }
        }
    ]
};

export default function NoPowerAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(noPowerFaqSchema) }}
            />
            {children}
        </>
    );
}
