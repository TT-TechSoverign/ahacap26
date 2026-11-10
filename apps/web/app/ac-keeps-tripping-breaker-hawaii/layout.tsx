import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Keeps Tripping Breaker Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Does your LG & GE window air conditioner immediately trip the breaker on Oahu? Diagnostic electrical inspection.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-keeps-tripping-breaker-hawaii',
    },
    openGraph: {
        title: 'AC Keeps Tripping Breaker Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Does your LG & GE window air conditioner immediately trip the breaker on Oahu? Diagnostic electrical inspection.',
        url: 'https://www.affordablehome-ac.com/ac-keeps-tripping-breaker-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Tripping Breaker Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Keeps Tripping Breaker Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: 'Does your window air conditioner immediately trip the breaker on Oahu? Diagnostic electrical inspection for short circuits, grounded compressors, and failing capacitors. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const breakerFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why does my AC keep tripping the breaker in my electrical panel?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "If it trips instantly with a pop, you likely have a dead short circuit, a grounded compressor motor winding, or a gecko shorting the inverter board. If it trips after running for 5 to 15 minutes, the compressor is likely pulling excessive amperage due to a failing capacitor, dirty coils, or low voltage supply."
            }
        },
        {
            "@type": "Question",
            "name": "Is it safe to keep resetting the breaker?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No! Resetting a tripping breaker more than once is extremely dangerous. Breakers trip to prevent electrical wires inside your walls from overheating and starting an electrical fire. Repeatedly forcing the breaker ON can melt terminal lugs and damage your main service panel."
            }
        }
    ]
};

export default function AcTrippingBreakerLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breakerFaqSchema) }}
            />
            {children}
        </>
    );
}
