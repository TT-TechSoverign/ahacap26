import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Outdoor AC Fan Not Spinning in Hawaii? Causes & Repair Oahu | Affordable Home A/C'
    },
    description: 'Outdoor AC condenser fan stopped spinning? Diagnose dead capacitors, seized fan bearings, and inverter motor boards in Oahu. $175 flat rate diagnostic. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii',
    },
    openGraph: {
        title: 'Outdoor AC Fan Not Spinning in Hawaii? Causes & Repair Oahu | Affordable Home A/C',
        description: 'Outdoor AC condenser fan stopped spinning? Diagnose dead capacitors, seized fan bearings, and inverter motor boards in Oahu. $175 flat rate diagnostic. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Outdoor Unit Fan Not Spinning Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Outdoor AC Fan Not Spinning in Hawaii? Causes & Repair Oahu | Affordable Home A/C',
        description: 'Outdoor AC condenser fan stopped spinning? Diagnose dead capacitors, seized fan bearings, and inverter motor boards in Oahu. $175 flat rate diagnostic. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const outdoorFanFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What happens if the outdoor AC fan stops spinning while the unit is running?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Without the fan drawing air across the condenser coils, high-pressure superheated refrigerant cannot condense into liquid. Head pressure and temperatures skyrocket within 2 to 3 minutes, forcing the compressor into high-pressure thermal overload cutoff and risking permanent motor damage."
            }
        },
        {
            "@type": "Question",
            "name": "What is the most common reason an outdoor fan motor stops spinning?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Hawaii, the leading cause is a failed dual-run capacitor where the 'FAN' terminal has lost microfarad rating due to high ambient heat. Other frequent causes include bearing seizure from salt air corrosion or a shorted DC brushless fan motor on mini split inverters."
            }
        },
        {
            "@type": "Question",
            "name": "Can I test if the fan motor is seized by spinning the blade?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "With the power completely turned off at the disconnect switch, use a wooden stick or pencil to gently push a fan blade. If the blade resists or stops immediately, the motor bearings are seized and the fan motor must be replaced."
            }
        }
    ]
};

export default function OutdoorFanNotSpinningLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(outdoorFanFaqSchema) }}
            />
            {children}
        </>
    );
}
