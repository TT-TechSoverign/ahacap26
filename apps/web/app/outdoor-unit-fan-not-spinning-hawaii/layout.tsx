import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Outdoor AC Fan Not Spinning in Hawaii? Causes & Repair Oahu | Affordable Home A/C'
    },
    description: 'Window AC condenser fan stopped spinning? Diagnose dead capacitors, seized fan bearings, and inverter motor boards in Oahu. $175 flat rate diagnostic.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/outdoor-unit-fan-not-spinning-hawaii',
    },
    openGraph: {
        title: 'Outdoor AC Fan Not Spinning in Hawaii? Causes & Repair Oahu | Affordable Home A/C',
        description: 'Window AC condenser fan stopped spinning? Diagnose dead capacitors, seized fan bearings, and inverter motor boards in Oahu. $175 flat rate diagnostic.',
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
        description: 'Window AC condenser fan stopped spinning? Diagnose dead capacitors, seized fan bearings, and inverter motor boards in Oahu. $175 flat rate diagnostic.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const outdoorFanFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What happens if the rear condenser fan stops spinning while the window AC is running?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Without the fan drawing air across the rear condenser coils, high-pressure superheated refrigerant cannot condense into liquid. Head pressure and temperatures skyrocket within 2 to 3 minutes, forcing the compressor into high-pressure thermal overload cutoff and risking permanent motor damage."
            }
        },
        {
            "@type": "Question",
            "name": "What is the most common reason a condenser fan motor stops spinning?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Hawaii, the leading cause is a failed dual-run capacitor where the 'FAN' terminal has lost microfarad rating due to high ambient heat. Other frequent causes include bearing seizure from salt air corrosion or a shorted DC brushless fan motor on inverter window units."
            }
        },
        {
            "@type": "Question",
            "name": "Can I test if the fan motor is seized by spinning the blade?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "With the power cord completely unplugged from the wall receptacle, a technician can gently check the fan shaft rotation. If the shaft resists or binds immediately, the motor bearings are seized."
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
