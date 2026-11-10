import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '115V Standard Plug Window ACs Oahu (6k–14k BTU In-Stock $395–$785) | Waipahu'
    },
    description: 'In-Stock 115V 15-Amp LG & GE Window ACs (6,000–14,000 BTU, $395–$785) in Waipahu, Oahu. Plugs into standard outlets + $45 Hawaii Energy Rebate • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu',
    },
    openGraph: {
        title: '115V Standard Plug Window ACs Oahu (6k–14k BTU In-Stock $395–$785) | Waipahu',
        description: 'In-Stock 115V 15-Amp LG & GE Window ACs (6,000–14,000 BTU, $395–$785) in Waipahu, Oahu. Plugs into standard outlets + $45 Hawaii Energy Rebate • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: '115V Window AC Units Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '115V Standard Plug Window ACs Oahu (6k–14k BTU In-Stock $395–$785) | Waipahu',
        description: 'In-Stock 115V 15-Amp LG & GE Window ACs (6,000–14,000 BTU, $395–$785) in Waipahu, Oahu. Plugs into standard outlets + $45 Hawaii Energy Rebate • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const lowVoltageFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the largest BTU window AC that runs on a standard 115V outlet?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Thanks to LG Dual Inverter & GE Built-In variable-speed compressor technology, units up to 14,000 BTU (such as the LW1522FVSM) can operate on a standard 115V 15-amp circuit with a standard NEMA 5-15P plug, cooling up to 700 sq ft (AHAM) without requiring a 230V line."
            }
        },
        {
            "@type": "Question",
            "name": "Will a 115V Dual Inverter window AC trip my home's circuit breaker?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Traditional non-inverter units draw massive startup current spikes (often 30 to 40 amps for a split second) when the compressor kicks on, tripping older breakers. LG Dual Inverter & GE Built-Ins feature soft-start electronics that gradually ramp up power, virtually eliminating breaker trips."
            }
        },
        {
            "@type": "Question",
            "name": "Can I use an extension cord with a 115V window air conditioner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We strongly recommend plugging directly into a wall receptacle. If necessary, only use a heavy-duty, 14-gauge or 12-gauge appliance-rated extension cord rated for 15 amps to prevent overheating and voltage drop."
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
            "name": "Oahu Window AC Shop",
            "item": "https://www.affordablehome-ac.com/shop"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "115V Standard Plug Window ACs",
            "item": "https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu"
        }
    ]
};

export default function LowVoltageAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(lowVoltageFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
