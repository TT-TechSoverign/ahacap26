import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Making Loud Buzzing Noise? Causes & Fixes Oahu | Affordable Home A/C'
    },
    description: 'Diagnose and silence loud buzzing, humming, and vibrating window air conditioners in Oahu. Bracket dampening, fan bearing repair, or whisper-quiet inverter upgrade. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-making-loud-buzzing-noise',
    },
    openGraph: {
        title: 'Window AC Making Loud Buzzing Noise? Causes & Fixes Oahu | Affordable Home A/C',
        description: 'Diagnose and silence loud buzzing, humming, and vibrating window air conditioners in Oahu. Bracket dampening, fan bearing repair, or whisper-quiet inverter upgrade. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/window-ac-making-loud-buzzing-noise',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Window AC Making Loud Buzzing Noise Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Making Loud Buzzing Noise? Causes & Fixes Oahu | Affordable Home A/C',
        description: 'Diagnose and silence loud buzzing, humming, and vibrating window air conditioners in Oahu. Bracket dampening, fan bearing repair, or whisper-quiet inverter upgrade. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const buzzingAcFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is my window air conditioner making a loud buzzing or vibrating sound?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Window AC buzzing is typically caused by four factors: loose sheet metal screws vibrating against the outer cabinet, degraded rubber compressor vibration grommets, the fan blade striking debris or the plastic shroud, or an improper window sill mounting angle."
            }
        },
        {
            "@type": "Question",
            "name": "Can an unlevel mounting bracket cause the unit to buzz loudly?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. If the unit does not have proper neoprene vibration isolation pads between the metal chassis and the exterior sill bracket, compressor harmonic vibration transmits directly into the window frame and wall studs, amplifying the noise throughout the room."
            }
        },
        {
            "@type": "Question",
            "name": "Can Affordable Home A/C silence or repair a buzzing window unit?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We offer on-site bracket re-seating and vibration dampening, or brand-new whisper-quiet Dual Inverter models starting at $504 (as quiet as 44 dB) with an available $45 Hawaii Energy rebate."
            }
        }
    ]
};

export default function WindowAcBuzzingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(buzzingAcFaqSchema) }}
            />
            {children}
        </>
    );
}
