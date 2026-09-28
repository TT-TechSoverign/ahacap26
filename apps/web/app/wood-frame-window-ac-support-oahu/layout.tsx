import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Wood-Frame Window AC Support Oahu | Prevent Sill Rot | Affordable Home A/C'
    },
    description: 'Protect historic wood-frame window sills from moisture rot and mechanical strain on Oahu. Waterproof neoprene barriers, standard exterior support brackets, CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/wood-frame-window-ac-support-oahu',
    },
    openGraph: {
        title: 'Wood-Frame Window AC Support Oahu | Prevent Sill Rot | Affordable Home A/C',
        description: 'Protect historic wood-frame window sills from moisture rot and mechanical strain on Oahu. Waterproof neoprene barriers, standard exterior support brackets, CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/wood-frame-window-ac-support-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Wood-Frame Window AC Support Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Wood-Frame Window AC Support Oahu | Prevent Sill Rot | Affordable Home A/C',
        description: 'Protect historic wood-frame window sills from moisture rot and mechanical strain on Oahu. Waterproof neoprene barriers, standard exterior support brackets, CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const woodFrameFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do you prevent window AC condensation from rotting wooden sills?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We install impermeable waterproof neoprene sill barriers between the AC chassis and the wooden sill, and calibrate a precise 1/4-inch backward pitch so all condensate flows outside away from the wood structure."
            }
        },
        {
            "@type": "Question",
            "name": "Can older wooden window sills support a heavy air conditioner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Older wooden sills can crack or splinter under the concentrated weight of a 70 to 140 lb unit. Our technicians install standard exterior window AC support brackets that anchor to the exterior wall framing, transferring the load away from the wooden sill."
            }
        },
        {
            "@type": "Question",
            "name": "Do you treat or protect damaged wood before installation?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians inspect the wood for existing moisture damage or termite activity before mounting, and apply protective flashing pads to prevent further wear."
            }
        }
    ]
};

export default function WoodFrameAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(woodFrameFaqSchema) }}
            />
            {children}
        </>
    );
}
