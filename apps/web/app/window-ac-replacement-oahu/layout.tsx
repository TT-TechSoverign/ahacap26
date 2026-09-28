import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Replacement Oahu | Old Unit Swap & Haul-Away | Affordable Home A/C'
    },
    description: 'Upgrade your loud, rusted, power-draining window air conditioner with an ultra-efficient LG Dual Inverter. Professional replacement, old unit haul-away, Waipahu warehouse pickup.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-replacement-oahu',
    },
    openGraph: {
        title: 'Window AC Replacement Oahu | Old Unit Swap & Haul-Away | Affordable Home A/C',
        description: 'Upgrade your loud, rusted, power-draining window air conditioner with an ultra-efficient LG Dual Inverter. Professional replacement, old unit haul-away, Waipahu warehouse pickup.',
        url: 'https://www.affordablehome-ac.com/window-ac-replacement-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Window AC Replacement Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Replacement Oahu | Old Unit Swap & Haul-Away | Affordable Home A/C',
        description: 'Upgrade your loud, rusted, power-draining window air conditioner with an ultra-efficient LG Dual Inverter. Professional replacement, old unit haul-away, Waipahu warehouse pickup.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const replacementFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "When should I replace my window AC instead of cleaning or repairing it?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "If your window AC is over 4 to 5 years old, has severe chassis rust from salt air, is making loud bearing grinding noises, or is an older non-inverter unit driving up your HECO bill, replacing it with an LG Dual Inverter ($504 to $1,025) is far more economical than expensive component repairs."
            }
        },
        {
            "@type": "Question",
            "name": "Can you haul away and dispose of my old window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! When you book our professional installation service with your new unit, our licensed technicians can safely remove and haul away your old rusted air conditioner for certified eco-friendly recycling."
            }
        },
        {
            "@type": "Question",
            "name": "Will the new window unit fit my existing opening?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians measure your window or jalousie opening to ensure proper fitment. We install new side accordion panels or custom filler materials to guarantee an airtight, insect-proof seal."
            }
        }
    ]
};

export default function WindowAcReplacementLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(replacementFaqSchema) }}
            />
            {children}
        </>
    );
}
