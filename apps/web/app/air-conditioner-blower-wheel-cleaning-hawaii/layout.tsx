import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Air Conditioner Blower Wheel Cleaning Hawaii | Deep Fan Wheel Scrub | Affordable Home A/C'
    },
    description: 'Eliminate heavy dust cake and black mold from your LG or GE window AC squirrel-cage blower fan wheel. Restores 100% airflow CFM and eradicates vibration.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/air-conditioner-blower-wheel-cleaning-hawaii',
    },
    openGraph: {
        title: 'Air Conditioner Blower Wheel Cleaning Hawaii | Deep Fan Wheel Scrub | Affordable Home A/C',
        description: 'Eliminate heavy dust cake and black mold from your LG or GE window AC squirrel-cage blower fan wheel. Restores 100% airflow CFM and eradicates vibration.',
        url: 'https://www.affordablehome-ac.com/air-conditioner-blower-wheel-cleaning-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Air Conditioner Blower Wheel Cleaning Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Air Conditioner Blower Wheel Cleaning Hawaii | Deep Fan Wheel Scrub | Affordable Home A/C',
        description: 'Eliminate heavy dust cake and black mold from your window AC squirrel-cage blower fan wheel. Restores 100% airflow CFM and eradicates vibration.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const blowerWheelFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why does the AC blower wheel get coated in black dirt and mold?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The blower wheel spins thousands of rotations per hour, pulling humid room air directly across wet cooling coils. Microscopic dust, skin cells, and pet dander stick to the damp curved fan blades, creating a dense fungal crust that chokes airflow."
            }
        },
        {
            "@type": "Question",
            "name": "How do you clean a window AC blower wheel effectively?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our specialists access the internal blower housing to scrub and flush away baked-on biofilm and dust crust from the fan fins while protecting the fan motor bearings and laying floor drop cloths beneath your window."
            }
        },
        {
            "@type": "Question",
            "name": "What are the signs that my blower wheel is clogged?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Key symptoms include weak air velocity even on high fan speed, a rhythmic pulsating or roaring whoosh sound, black flecks blowing onto your bed or couch, and an unbalanced rattling vibration from the window unit."
            }
        }
    ]
};

export default function BlowerWheelCleaningLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blowerWheelFaqSchema) }}
            />
            {children}
        </>
    );
}
