import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Refrigerant Leak Assessment Hawaii | Sealed System Evaluation | Affordable Home A/C'
    },
    description: 'Pinpoint sealed refrigerant system loss in window AC coils in Oahu. Honest clean-vs-replace assessments and Waipahu warehouse direct LG & GE replacements.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-refrigerant-leak-detection-hawaii',
    },
    openGraph: {
        title: 'Window AC Refrigerant Leak Assessment Hawaii | Sealed System Evaluation | Affordable Home A/C',
        description: 'Pinpoint sealed refrigerant system loss in window AC coils in Oahu. Honest clean-vs-replace assessments and Waipahu warehouse direct LG & GE replacements.',
        url: 'https://www.affordablehome-ac.com/ac-refrigerant-leak-detection-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Refrigerant Leak Detection Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Refrigerant Leak Assessment Hawaii | Sealed System Evaluation | Affordable Home A/C',
        description: 'Pinpoint sealed refrigerant system loss in window AC coils in Oahu. Honest clean-vs-replace assessments and Waipahu warehouse direct LG & GE replacements.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const refrigerantLeakFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How can I tell if my window air conditioner has a refrigerant leak?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most common symptoms are partial ice forming on one corner of the front evaporator coil while the rest stays warm, the compressor running continuously without lowering the room temperature, or dark oily residue on the lower copper return bends."
            }
        },
        {
            "@type": "Question",
            "name": "Why shouldn't I pay to recharge a leaking window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Window air conditioners are factory brazed hermetically sealed loops without service ports. When coastal salt air corrodes thin copper return bends, brazing and recharging costs more than a brand-new factory-warranted LG Dual Inverter or GE window AC from our Waipahu warehouse."
            }
        },
        {
            "@type": "Question",
            "name": "How does Affordable Home A/C verify whether my unit is clogged or leaking refrigerant?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We inspect coil airflow, test compressor amp draw, measure temperature differential across the evaporator, and check for salt-pitted copper return bends so you know immediately whether your unit just needs a deep cleaning or a direct replacement."
            }
        }
    ]
};

export default function RefrigerantLeakLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(refrigerantLeakFaqSchema) }}
            />
            {children}
        </>
    );
}
