import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Renter-Friendly Window AC Installation Oahu | No-Damage Mounting | Affordable Home A/C'
    },
    description: 'Zero-damage window air conditioner mounting for Oahu renters and tenants. Protect your security deposit with non-invasive brackets and removable weather seals. In stock in Waipahu.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/renter-friendly-ac-installation-oahu',
    },
    openGraph: {
        title: 'Renter-Friendly Window AC Installation Oahu | No-Damage Mounting | Affordable Home A/C',
        description: 'Zero-damage window air conditioner mounting for Oahu renters and tenants. Protect your security deposit with non-invasive brackets and removable weather seals. In stock in Waipahu.',
        url: 'https://www.affordablehome-ac.com/renter-friendly-ac-installation-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Renter-Friendly Window AC Installation Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Renter-Friendly Window AC Installation Oahu | No-Damage Mounting | Affordable Home A/C',
        description: 'Zero-damage window air conditioner mounting for Oahu renters and tenants. Protect your security deposit with non-invasive brackets and removable weather seals. In stock in Waipahu.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const renterFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can I install a window AC in a rental home without losing my security deposit?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our technicians use zero-damage installation methods. Instead of screwing directly into your landlord's window sashes or frames, we use compression-fit support brackets and non-adhesive foam compression seals that leave zero holes, scratches, or residue when removed."
            }
        },
        {
            "@type": "Question",
            "name": "How easily can I take the window AC with me when I move?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our installation is 100% reversible. When your lease ends, the unit and brackets can be disassembled in 15 minutes, returning the window to its original untouched condition."
            }
        },
        {
            "@type": "Question",
            "name": "Can renters claim the $45 Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Anyone who pays an electric utility bill or lives in an eligible residential dwelling on Oahu can claim the $45 Hawaii Energy cash rebate on qualifying Energy Star window ACs."
            }
        }
    ]
};

export default function RenterFriendlyAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(renterFaqSchema) }}
            />
            {children}
        </>
    );
}
