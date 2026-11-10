import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Air Conditioner Blower Wheel Cleaning Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Eliminate heavy dust cake and black mold from your LG or GE window AC squirrel-cage blower fan wheel. Restores.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/air-conditioner-blower-wheel-cleaning-hawaii',
    },
    openGraph: {
        title: 'Air Conditioner Blower Wheel Cleaning Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Eliminate heavy dust cake and black mold from your LG or GE window AC squirrel-cage blower fan wheel. Restores.',
        url: 'https://www.affordablehome-ac.com/air-conditioner-blower-wheel-cleaning-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Air Conditioner Blower Wheel Cleaning Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Air Conditioner Blower Wheel Cleaning Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Eliminate heavy dust cake and black mold from your LG or GE window AC squirrel-cage blower fan wheel. Restores.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
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
            "name": "Window AC Cleaning",
            "item": "https://www.affordablehome-ac.com/ac-cleaning-oahu"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Window AC Blower Wheel Deep Wash",
            "item": "https://www.affordablehome-ac.com/air-conditioner-blower-wheel-cleaning-hawaii"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
