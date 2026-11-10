import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Double-Hung Window AC Installation Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Professional LG & GE window air conditioner installation for double-hung sash windows across Oahu. Top-rail.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/double-hung-window-ac-installation-hawaii',
    },
    openGraph: {
        title: 'Double-Hung Window AC Installation Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Professional LG & GE window air conditioner installation for double-hung sash windows across Oahu. Top-rail.',
        url: 'https://www.affordablehome-ac.com/double-hung-window-ac-installation-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Double-Hung Window AC Installation Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Double-Hung Window AC Installation Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Professional LG & GE window air conditioner installation for double-hung sash windows across Oahu. Top-rail.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
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
            "name": "Window AC Installation",
            "item": "https://www.affordablehome-ac.com/window-ac-installation"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Double-Hung Window AC Installation",
            "item": "https://www.affordablehome-ac.com/double-hung-window-ac-installation-hawaii"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
