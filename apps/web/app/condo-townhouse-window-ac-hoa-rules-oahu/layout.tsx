import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Condo & Townhouse Window AC HOA Rules Oahu | Compliance Guide | Affordable Home A/C'
    },
    description: 'Navigate Oahu condo and townhouse HOA rules for window air conditioners. Decibel restrictions, exterior facade aesthetics, condensation drain rules, and compliant models in stock in Waipahu.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/condo-townhouse-window-ac-hoa-rules-oahu',
    },
    openGraph: {
        title: 'Condo & Townhouse Window AC HOA Rules Oahu | Compliance Guide | Affordable Home A/C',
        description: 'Navigate Oahu condo and townhouse HOA rules for window air conditioners. Decibel restrictions, exterior facade aesthetics, condensation drain rules, and compliant models in stock in Waipahu.',
        url: 'https://www.affordablehome-ac.com/condo-townhouse-window-ac-hoa-rules-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Condo Townhouse Window AC HOA Rules Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Condo & Townhouse Window AC HOA Rules Oahu | Compliance Guide | Affordable Home A/C',
        description: 'Navigate Oahu condo and townhouse HOA rules for window air conditioners. Decibel restrictions, exterior facade aesthetics, condensation drain rules, and compliant models in stock in Waipahu.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const condoHoaFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What are common HOA rules for window air conditioners on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most Oahu condo boards and townhouse HOAs enforce three main rules: (1) Noise limits—units cannot exceed 50 to 55 dB to avoid disturbing neighbors; (2) Facade appearance—side panels must be neutral white or matching frame colors without unsightly cardboard or duct tape; and (3) Condensation drainage—water cannot drip onto lower lanais, common walkways, or building walls."
            }
        },
        {
            "@type": "Question",
            "name": "Do LG Dual Inverter window ACs pass strict HOA noise rules?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Operating at as low as 44 dB, LG Dual Inverter units are significantly quieter than older rotary ACs (58+ dB) and pass even the strictest residential decibel rules in Honolulu and Salt Lake condos."
            }
        },
        {
            "@type": "Question",
            "name": "How do you satisfy HOA condensation drainage requirements?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our licensed technicians can attach custom condensate drain lines to route water safely to a drainage basin, container, or interior drain rather than letting it drip down the building exterior."
            }
        }
    ]
};

export default function CondoHoaAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(condoHoaFaqSchema) }}
            />
            {children}
        </>
    );
}
