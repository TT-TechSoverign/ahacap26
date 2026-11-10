import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Freezing Up Ice on Coils Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC frozen solid with ice on the coils on Oahu? Emergency thaw instructions, root-cause.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-freezing-up-ice-on-coils-hawaii',
    },
    openGraph: {
        title: 'AC Freezing Up Ice on Coils Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC frozen solid with ice on the coils on Oahu? Emergency thaw instructions, root-cause.',
        url: 'https://www.affordablehome-ac.com/ac-freezing-up-ice-on-coils-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Freezing Up Ice on Coils Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Freezing Up Ice on Coils Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: 'Is your window AC frozen solid with ice on the coils on Oahu? Emergency thaw instructions, root-cause troubleshooting, and coil cleaning or replacement dispatch. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const freezingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is ice forming on my air conditioner coils in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oahu's high 74%+ relative humidity means air is heavy with water vapor. If airflow is choked by a dirty filter or the refrigerant charge is low from a pinhole leak, the coil temperature plunges below 32°F (0°C). Moisture instantly freezes on the aluminum fins, cascading into a solid block of ice that blocks all cooling."
            }
        },
        {
            "@type": "Question",
            "name": "What should I do immediately if my AC is frozen?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Immediately switch the unit to FAN ONLY mode (or turn it completely OFF). NEVER use a knife, screwdriver, or ice pick to chip ice away—this will puncture delicate copper coil tubes and release refrigerant. Place towels beneath the unit to catch the melting water and schedule a professional diagnostic check."
            }
        }
    ]
};

export default function AcFreezingUpLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(freezingFaqSchema) }}
            />
            {children}
        </>
    );
}
