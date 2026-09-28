import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Vinyl Window AC Mounting Oahu | Prevent Frame Cracking | Affordable Home A/C'
    },
    description: 'Specialized window air conditioner mounting for vinyl replacement windows on Oahu. Weight distribution brackets prevent cracked vinyl tracks. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/vinyl-replacement-window-ac-mounting',
    },
    openGraph: {
        title: 'Vinyl Window AC Mounting Oahu | Prevent Frame Cracking | Affordable Home A/C',
        description: 'Specialized window air conditioner mounting for vinyl replacement windows on Oahu. Weight distribution brackets prevent cracked vinyl tracks. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/vinyl-replacement-window-ac-mounting',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Vinyl Window AC Mounting Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Vinyl Window AC Mounting Oahu | Prevent Frame Cracking | Affordable Home A/C',
        description: 'Specialized window air conditioner mounting for vinyl replacement windows on Oahu. Weight distribution brackets prevent cracked vinyl tracks. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const vinylWindowFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can resting a window AC directly on a vinyl window frame cause damage?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Modern vinyl replacement windows have hollow internal chambers that are not engineered to hold 60 to 120 lbs of dead weight. Resting an AC directly on the thin vinyl sill can permanently bend the track, crack the welded corners, or cause water leakage into the wall."
            }
        },
        {
            "@type": "Question",
            "name": "How do you safely mount a window AC in a vinyl window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians install standard exterior window AC support brackets that bear 100% of the unit's weight against the exterior building sill. We bridge the vinyl track with high-density rubber cushion blocks so zero mechanical downward force touches the vinyl frame."
            }
        },
        {
            "@type": "Question",
            "name": "Does this installation void my vinyl window manufacturer warranty?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Because our mounting brackets require zero drilling into the vinyl window frame or sills, your window warranty remains completely intact."
            }
        }
    ]
};

export default function VinylWindowAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(vinylWindowFaqSchema) }}
            />
            {children}
        </>
    );
}
