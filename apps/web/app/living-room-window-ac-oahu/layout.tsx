import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Living Room Window AC Oahu | High-Capacity Dual Inverters | Affordable Home A/C'
    },
    description: 'Cool large living rooms and open floor plans on Oahu with high-capacity LG Dual Inverter window ACs (12,000 to 23,500 BTU). In-stock in Waipahu with $45 Hawaii Energy cash rebate. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/living-room-window-ac-oahu',
    },
    openGraph: {
        title: 'Living Room Window AC Oahu | High-Capacity Dual Inverters | Affordable Home A/C',
        description: 'Cool large living rooms and open floor plans on Oahu with high-capacity LG Dual Inverter window ACs (12,000 to 23,500 BTU). In-stock in Waipahu with $45 Hawaii Energy cash rebate. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/living-room-window-ac-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Living Room Window AC Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Living Room Window AC Oahu | High-Capacity Dual Inverters | Affordable Home A/C',
        description: 'Cool large living rooms and open floor plans on Oahu with high-capacity LG Dual Inverter window ACs (12,000 to 23,500 BTU). In-stock in Waipahu with $45 Hawaii Energy cash rebate. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const livingRoomFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What size window AC do I need for a living room in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For a standard 400 to 550 sq. ft. living room, a 12,000 BTU unit (LW1222IVSM) is ideal. For open-concept living/dining rooms or homes with uninsulated single-wall construction and vaulted ceilings, 14,000 to 18,000 BTU is recommended to overcome midday thermal gain."
            }
        },
        {
            "@type": "Question",
            "name": "Can I run a 14,000 BTU window AC on a standard 115V wall outlet?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! The LG Dual Inverter 14,000 BTU (LW1522FVSM) runs on a standard 115V 15A wall plug. For 18,000 BTU and 23,500 BTU units, a dedicated 208/230V circuit is required."
            }
        }
    ]
};

export default function LivingRoomWindowAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(livingRoomFaqSchema) }}
            />
            {children}
        </>
    );
}
