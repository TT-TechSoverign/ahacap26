import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Security Bars Window AC Installation Oahu | Burglar Bar Mounting | Affordable Home A/C'
    },
    description: 'Specialized window air conditioner installation for homes with exterior security burglar bars on Oahu. Clearances, bracket mounting, and airflow optimization. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/security-bars-window-ac-installation-oahu',
    },
    openGraph: {
        title: 'Security Bars Window AC Installation Oahu | Burglar Bar Mounting | Affordable Home A/C',
        description: 'Specialized window air conditioner installation for homes with exterior security burglar bars on Oahu. Clearances, bracket mounting, and airflow optimization. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/security-bars-window-ac-installation-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Security Bars Window AC Installation Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Security Bars Window AC Installation Oahu | Burglar Bar Mounting | Affordable Home A/C',
        description: 'Specialized window air conditioner installation for homes with exterior security burglar bars on Oahu. Clearances, bracket mounting, and airflow optimization. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const securityBarsFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can a window AC be installed if my window has exterior security bars?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Many Oahu residences in Kalihi, Waipahu, Palama, and McCully have wrought-iron security bars. If the bar clearance is at least 10 to 14 inches from the window sash, a compact unit can slide into place. If clearances are tighter, our technicians use specialized bracket mounting or interior slide-in configurations."
            }
        },
        {
            "@type": "Question",
            "name": "Does installing an AC compromise my home's window security?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. We install sash-locking security hardware and heavy-gauge steel bracket ties that prevent the unit or window sash from being pushed inward from the outside, keeping your home fully secure."
            }
        },
        {
            "@type": "Question",
            "name": "Do security bars restrict the air conditioner's exhaust airflow?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians verify at least 4 to 6 inches of clearance between the outdoor condenser coil and the security bar metal to prevent warm air recirculation, ensuring peak cooling efficiency."
            }
        }
    ]
};

export default function SecurityBarsAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(securityBarsFaqSchema) }}
            />
            {children}
        </>
    );
}
