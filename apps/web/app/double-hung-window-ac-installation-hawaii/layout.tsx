import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Double-Hung Window AC Installation Hawaii | Sash Window Mounting | Affordable Home A/C'
    },
    description: 'Professional window air conditioner installation for double-hung sash windows across Oahu. Top-rail locking, side curtain insulation, and backward drainage pitch. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/double-hung-window-ac-installation-hawaii',
    },
    openGraph: {
        title: 'Double-Hung Window AC Installation Hawaii | Sash Window Mounting | Affordable Home A/C',
        description: 'Professional window air conditioner installation for double-hung sash windows across Oahu. Top-rail locking, side curtain insulation, and backward drainage pitch. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/double-hung-window-ac-installation-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Double-Hung Window AC Installation Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Double-Hung Window AC Installation Hawaii | Sash Window Mounting | Affordable Home A/C',
        description: 'Professional window air conditioner installation for double-hung sash windows across Oahu. Top-rail locking, side curtain insulation, and backward drainage pitch. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const doubleHungFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does window AC installation work in a double-hung window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In a traditional double-hung window, the bottom sash slides up. The AC unit rests securely on the sill, the top mounting rail hooks behind the lowered sash to lock the unit in place, and accordion side curtains expand to fill the left and right openings."
            }
        },
        {
            "@type": "Question",
            "name": "Why is proper backward pitch important for double-hung AC mounting?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Window ACs must be installed with a slight 1/4-inch to 1/2-inch downward pitch toward the outside of the home. This ensures that tropical condensation drains outdoors rather than spilling into your window sill and walls."
            }
        },
        {
            "@type": "Question",
            "name": "Do double-hung window installations need exterior support brackets?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For lightweight 6,000 to 8,000 BTU units, the window sash and sill provide sufficient support. For heavier 10,000 to 23,500 BTU models (weighing 70 to 140 lbs), our technicians install standard exterior window AC brackets to prevent sill damage."
            }
        }
    ]
};

export default function DoubleHungAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(doubleHungFaqSchema) }}
            />
            {children}
        </>
    );
}
