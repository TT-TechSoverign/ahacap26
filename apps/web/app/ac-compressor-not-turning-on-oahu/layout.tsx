import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Compressor Not Turning On Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Blower fan blowing warm air but LG & GE window AC compressor not running? Accurate diagnostic of capacitors, power.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-compressor-not-turning-on-oahu',
    },
    openGraph: {
        title: 'AC Compressor Not Turning On Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Blower fan blowing warm air but LG & GE window AC compressor not running? Accurate diagnostic of capacitors, power.',
        url: 'https://www.affordablehome-ac.com/ac-compressor-not-turning-on-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Compressor Not Turning On Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Compressor Not Turning On Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: 'Blower fan blowing warm air but window AC compressor not running? Accurate diagnostic of capacitors, power relays, inverter modules, and thermal overloads on Oahu.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const compressorFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is my blower fan running but the window AC compressor won't kick on?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The interior blower fan and the sealed rotary compressor operate on separate electrical control relays. Common reasons the compressor fails to start include a blown dual-run capacitor, pitted power relay contacts, an inverter power module (IPM) error, or a thermal overload cutoff."
            }
        },
        {
            "@type": "Question",
            "name": "Can a bad capacitor cause the compressor to hum and buzz without starting?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. A degraded capacitor cannot deliver the microfarad phase-shift boost needed to overcome locked rotor inertia. The compressor will hum for 5-10 seconds, overheat, and trip its internal thermal overload switch."
            }
        },
        {
            "@type": "Question",
            "name": "How much does it cost to diagnose a non-starting AC compressor?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Affordable Home A/C provides a $0 Free Clean-vs-Replace Assessment and by-appointment troubleshooting across all of Oahu. Our technician checks capacitor ratings, winding resistance, and inverter voltages to identify the exact point of failure."
            }
        }
    ]
};

export default function CompressorNotTurningOnLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(compressorFaqSchema) }}
            />
            {children}
        </>
    );
}
