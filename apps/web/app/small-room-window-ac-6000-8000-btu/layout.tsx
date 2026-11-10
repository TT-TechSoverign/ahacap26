import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '6,000 & 8,000 BTU Bedroom Window ACs Oahu ($395–$595 In-Stock) | Waipahu Pickup'
    },
    description: 'In-Stock 6,000 & 8,000 BTU LG & GE Window ACs ($395–$595) in Waipahu, Oahu. Standard 115V plug, 44dB quiet inverter option & $45 Rebate • Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/small-room-window-ac-6000-8000-btu',
    },
    openGraph: {
        title: '6,000 & 8,000 BTU Bedroom Window ACs Oahu ($395–$595 In-Stock) | Waipahu Pickup',
        description: 'In-Stock 6,000 & 8,000 BTU LG & GE Window ACs ($395–$595) in Waipahu, Oahu. Standard 115V plug, 44dB quiet inverter option & $45 Rebate • Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/small-room-window-ac-6000-8000-btu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Small Room Window AC 6000 8000 BTU Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '6,000 & 8,000 BTU Bedroom Window ACs Oahu ($395–$595 In-Stock) | Waipahu Pickup',
        description: 'In-Stock 6,000 & 8,000 BTU LG & GE Window ACs ($395–$595) in Waipahu, Oahu. Standard 115V plug, 44dB quiet inverter option & $45 Rebate • Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const smallRoomFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can a 6,000 or 8,000 BTU window AC plug into a regular wall outlet?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Both 6,000 and 8,000 BTU units use standard 115-volt 3-prong household plugs (NEMA 5-15P) and draw very low running amps, so they operate safely on standard 15-amp residential circuits without tripping breakers."
            }
        },
        {
            "@type": "Question",
            "name": "What room size does an 8,000 BTU window AC cool in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "An 8,000 BTU unit cools bedrooms up to 350 sq ft comfortably, even in uninsulated single-wall plantation homes with morning or afternoon sun exposure."
            }
        },
        {
            "@type": "Question",
            "name": "How quiet are the 6,000 and 8,000 BTU LG Dual Inverter & GE models?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In low sleep mode, LG Dual Inverter & GE models operate at just 44 dB—quieter than a normal conversational whisper and significantly quieter than traditional rotary compressors."
            }
        },
        {
            "@type": "Question",
            "name": "Do these models qualify for the $45 Hawaii Energy cash rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Qualifying Energy Star certified Dual Inverter window ACs qualify for an official $45 cash rebate from Hawaii Energy. We provide the official pre-approved application form PDF."
            }
        }
    ]
};

export default function SmallRoomAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(smallRoomFaqSchema) }}
            />
            {children}
        </>
    );
}
