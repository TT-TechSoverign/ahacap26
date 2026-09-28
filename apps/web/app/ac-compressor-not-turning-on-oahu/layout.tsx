import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Compressor Not Turning On Oahu | Outdoor Unit Repair | Affordable Home A/C'
    },
    description: 'Indoor fan blowing warm air but outdoor compressor not running? Accurate diagnostic of capacitors, contactors, inverter modules, and thermal overloads on Oahu. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-compressor-not-turning-on-oahu',
    },
    openGraph: {
        title: 'AC Compressor Not Turning On Oahu | Outdoor Unit Repair | Affordable Home A/C',
        description: 'Indoor fan blowing warm air but outdoor compressor not running? Accurate diagnostic of capacitors, contactors, inverter modules, and thermal overloads on Oahu. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/ac-compressor-not-turning-on-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Compressor Not Turning On Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Compressor Not Turning On Oahu | Outdoor Unit Repair | Affordable Home A/C',
        description: 'Indoor fan blowing warm air but outdoor compressor not running? Accurate diagnostic of capacitors, contactors, inverter modules, and thermal overloads on Oahu. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const compressorFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is my indoor fan running but the outdoor compressor won't kick on?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The indoor blower fan and the outdoor compressor operate on separate electrical sub-circuits. Common reasons the compressor fails to start include a blown dual-run capacitor, pitted electrical contactor points, an inverter power module (IPM) error, or a low-pressure refrigerant cutoff."
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
                "text": "Affordable Home A/C offers a transparent $175 flat-rate diagnostic across all of Oahu. Our licensed technician checks capacitor ratings, winding resistance, and inverter voltages to identify the exact point of failure."
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
