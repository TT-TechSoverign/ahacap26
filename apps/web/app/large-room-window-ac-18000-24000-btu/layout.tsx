import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '18,000 & 23,500 BTU Large Room Window ACs Oahu ($940–$1,025 In-Stock) | Waipahu'
    },
    description: 'In-Stock 18,000 & 23,500 BTU LG Dual Inverter & Cool+Heat Window ACs ($940–$1,025) in Waipahu, Oahu. Free pickup by appt or $50 delivery • Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/large-room-window-ac-18000-24000-btu',
    },
    openGraph: {
        title: '18,000 & 23,500 BTU Large Room Window ACs Oahu ($940–$1,025 In-Stock) | Waipahu',
        description: 'In-Stock 18,000 & 23,500 BTU LG Dual Inverter & Cool+Heat Window ACs ($940–$1,025) in Waipahu, Oahu. Free pickup by appt or $50 delivery • Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/large-room-window-ac-18000-24000-btu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_6_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Large Room Window AC 18000 24000 BTU Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '18,000 & 23,500 BTU Large Room Window ACs Oahu ($940–$1,025 In-Stock) | Waipahu',
        description: 'In-Stock 18,000 & 23,500 BTU LG Dual Inverter & Cool+Heat Window ACs ($940–$1,025) in Waipahu, Oahu. Free pickup by appt or $50 delivery • Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_6_fit_cutaway.webp'],
    }
};

const largeRoomFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What electrical outlet is required for an 18,000 or 23,500 BTU window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "18,000 and 23,500 BTU window AC units require a dedicated 208/230-volt circuit with a NEMA 6-15P or NEMA 6-20P outlet. They cannot be plugged into a standard 115V 3-prong household outlet."
            }
        },
        {
            "@type": "Question",
            "name": "How much square footage does a 23,500 BTU window AC cool in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In mainland conditions, 23,500 BTU is rated for up to 1,400 sq ft. However, under Hawaii's Island Microclimate Calibration (factoring uninsulated single-wall redwood framing and solar heat gain), it comfortably cools 1,000 to 1,250 sq ft of open-concept living space."
            }
        },
        {
            "@type": "Question",
            "name": "Do these heavy window units require exterior mounting brackets?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Units over 100 lbs require a heavy-duty standard exterior window AC support bracket to transfer the weight securely onto the exterior wall sill and relieve stress from your window frame."
            }
        },
        {
            "@type": "Question",
            "name": "Are these large window air conditioners eligible for the Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Qualifying Energy Star certified Dual Inverter models qualify for an official $45 cash rebate from Hawaii Energy. We provide the pre-approved application form PDF with your purchase."
            }
        }
    ]
};

export default function LargeRoomAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(largeRoomFaqSchema) }}
            />
            {children}
        </>
    );
}
