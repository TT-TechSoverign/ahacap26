import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Refrigerant Leak Assessment Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Pinpoint sealed refrigerant system loss in window AC coils in Oahu. Honest clean-vs-replace assessments and.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-refrigerant-leak-detection-hawaii',
    },
    openGraph: {
        title: 'Window AC Refrigerant Leak Assessment Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Pinpoint sealed refrigerant system loss in window AC coils in Oahu. Honest clean-vs-replace assessments and.',
        url: 'https://www.affordablehome-ac.com/ac-refrigerant-leak-detection-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Refrigerant Leak Detection Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Refrigerant Leak Assessment Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Pinpoint sealed refrigerant system loss in window AC coils in Oahu. Honest clean-vs-replace assessments and.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
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
            "name": "Window AC Repair & Assessment",
            "item": "https://www.affordablehome-ac.com/ac-repair-oahu"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Sealed-System Refrigerant Leak vs Replacement",
            "item": "https://www.affordablehome-ac.com/ac-refrigerant-leak-detection-hawaii"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
