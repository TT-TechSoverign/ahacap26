import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Horizontal Sliding Window AC Installation Oahu | Slider Panels | Affordable Home A/C'
    },
    description: 'Expert window AC installation for horizontal sliding windows on Oahu. Custom vertical filler panels, standard exterior support brackets, airtight weather sealing.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/horizontal-sliding-window-ac-oahu',
    },
    openGraph: {
        title: 'Horizontal Sliding Window AC Installation Oahu | Slider Panels | Affordable Home A/C',
        description: 'Expert window AC installation for horizontal sliding windows on Oahu. Custom vertical filler panels, standard exterior support brackets, airtight weather sealing.',
        url: 'https://www.affordablehome-ac.com/horizontal-sliding-window-ac-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Horizontal Sliding Window AC Installation Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Horizontal Sliding Window AC Installation Oahu | Slider Panels | Affordable Home A/C',
        description: 'Expert window AC installation for horizontal sliding windows on Oahu. Custom vertical filler panels, standard exterior support brackets, airtight weather sealing.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const sliderFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can you install a standard window AC in a horizontal sliding window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Because standard window ACs are designed for up-and-down hung windows, installing them in horizontal sliders leaves an open vertical space above the unit. Our technicians fabricate clean vertical filler panels (acrylic or insulated paneling) and install standard exterior support brackets to ensure an airtight, secure fit."
            }
        },
        {
            "@type": "Question",
            "name": "How is the weight supported in a sliding window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sliding window tracks are made of vinyl or aluminum and are not engineered to hold a 60 to 120 lb air conditioner. We install standard exterior sill support brackets that bear the load securely against the home's exterior sill, protecting the window track from cracking."
            }
        },
        {
            "@type": "Question",
            "name": "Does this seal against trade wind rain and island geckos?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We apply high-density closed-cell weather stripping around the slider sash and custom filler panel, blocking rain, trade wind drafts, and island insects."
            }
        }
    ]
};

export default function HorizontalSlidingAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(sliderFaqSchema) }}
            />
            {children}
        </>
    );
}
