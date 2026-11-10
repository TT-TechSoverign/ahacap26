import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Oahu Condo & Townhouse Window AC HOA Guide | 44dB LG & 26" GE Built-In ($395+)'
    },
    description: '$0 Free Estimate • (808) 488-1111. HOA-compliant 44dB LG Dual Inverter & GE 26" Built-In Through-the-Wall ACs ($395–$1,200) in stock in Waipahu, Oahu.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/condo-townhouse-window-ac-hoa-rules-oahu',
    },
    openGraph: {
        title: 'Oahu Condo & Townhouse Window AC HOA Guide | 44dB LG & 26" GE Built-In ($395+)',
        description: '$0 Free Estimate • (808) 488-1111. HOA-compliant 44dB LG Dual Inverter & GE 26" Built-In Through-the-Wall ACs ($395–$1,200) in stock in Waipahu, Oahu.',
        url: 'https://www.affordablehome-ac.com/condo-townhouse-window-ac-hoa-rules-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Condo Townhouse Window AC HOA Rules Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Oahu Condo & Townhouse Window AC HOA Guide | 44dB LG & 26" GE Built-In ($395+)',
        description: '$0 Free Estimate • (808) 488-1111. HOA-compliant 44dB LG Dual Inverter & GE 26" Built-In Through-the-Wall ACs ($395–$1,200) in stock in Waipahu, Oahu.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp'],
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
            "name": "Do LG Dual Inverter & GE window ACs pass strict HOA noise rules?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Operating at as low as 44 dB, LG Dual Inverter & GE units are significantly quieter than older rotary ACs (58+ dB) and pass even the strictest residential decibel rules in Honolulu and Salt Lake condos."
            }
        },
        {
            "@type": "Question",
            "name": "How do you satisfy HOA condensation drainage requirements?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our Oahu cooling technicians can attach custom condensate drain lines to route water safely to a drainage basin, container, or interior drain rather than letting it drip down the building exterior."
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
