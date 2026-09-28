import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Air Conditioner Blower Wheel Cleaning Hawaii | Deep Fan Wheel Scrub | Affordable Home A/C'
    },
    description: 'Eliminate heavy dust cake and black mold from your AC squirrel-cage blower fan wheel. Restores 100% airflow CFM and eradicates vibration. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/air-conditioner-blower-wheel-cleaning-hawaii',
    },
    openGraph: {
        title: 'Air Conditioner Blower Wheel Cleaning Hawaii | Deep Fan Wheel Scrub | Affordable Home A/C',
        description: 'Eliminate heavy dust cake and black mold from your AC squirrel-cage blower fan wheel. Restores 100% airflow CFM and eradicates vibration. CT-36775 licensed.',
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
        description: 'Eliminate heavy dust cake and black mold from your AC squirrel-cage blower fan wheel. Restores 100% airflow CFM and eradicates vibration. CT-36775 licensed.',
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
                "text": "The crossflow blower wheel spins thousands of rotations per hour, pulling humid room air directly across wet cooling coils. Microscopic dust, skin cells, and pet dander stick to the damp curved fan blades, creating a dense fungal crust that chokes airflow."
            }
        },
        {
            "@type": "Question",
            "name": "Can you clean a mini split blower wheel without removing it?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Surface spray-down in place only cleans the exposed top edge and can wash mold slurry into the fan motor bearings. Our $275 Premium Teardown extracts the wheel completely from the housing for a 360-degree degreasing bath."
            }
        },
        {
            "@type": "Question",
            "name": "What are the signs that my blower wheel is clogged?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Key symptoms include weak air velocity even on high fan speed, a rhythmic pulsating or roaring whoosh sound, black flecks blowing onto your bed or couch, and an unbalanced rattling vibration from the indoor air handler."
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
