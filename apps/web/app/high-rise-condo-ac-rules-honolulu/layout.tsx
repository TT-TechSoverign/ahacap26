import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'High-Rise Condo Window AC Rules Honolulu | Waikiki & Kakaako | Affordable Home A/C'
    },
    description: 'Strict high-rise condo window air conditioning installation in Honolulu. Freight elevator coordination, safety lanyards, condensation drainage compliance, CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/high-rise-condo-ac-rules-honolulu',
    },
    openGraph: {
        title: 'High-Rise Condo Window AC Rules Honolulu | Waikiki & Kakaako | Affordable Home A/C',
        description: 'Strict high-rise condo window air conditioning installation in Honolulu. Freight elevator coordination, safety lanyards, condensation drainage compliance, CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/high-rise-condo-ac-rules-honolulu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'High-Rise Condo Window AC Rules Honolulu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'High-Rise Condo Window AC Rules Honolulu | Waikiki & Kakaako | Affordable Home A/C',
        description: 'Strict high-rise condo window air conditioning installation in Honolulu. Freight elevator coordination, safety lanyards, condensation drainage compliance, CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const highRiseFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What safety precautions are required when installing a window AC in a Honolulu high-rise?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In high-rise towers, our licensed technicians use industrial safety tether lanyards that anchor the AC chassis to the interior building structure throughout the entire mounting process, mathematically eliminating any risk of falling debris or equipment drop onto sidewalks or lanais below."
            }
        },
        {
            "@type": "Question",
            "name": "How is condensation handled in high-rise condominiums?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "High-rise condo bylaws strictly forbid water dripping onto lower balconies or street traffic. Our technicians install sealed condensation drain tubing connected to internal drain traps or collection reservoirs."
            }
        },
        {
            "@type": "Question",
            "name": "Do you coordinate with building management and freight elevators?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! We coordinate directly with building managers, security, and resident associations across Waikiki, Kakaako, and urban Honolulu, providing Certificates of Insurance (COI) and booking freight elevator windows."
            }
        }
    ]
};

export default function HighRiseCondoAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(highRiseFaqSchema) }}
            />
            {children}
        </>
    );
}
