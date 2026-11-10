import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Honolulu High-Rise Condo Window & 26" Wall AC Installation ($0 Estimate) | Oahu'
    },
    description: '$0 Free Estimate • (808) 488-1111. Honolulu condo 26" through-the-wall GE Built-In & quiet 44dB LG Dual Inverter AC sales, drain routing & installation.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/high-rise-condo-ac-rules-honolulu',
    },
    openGraph: {
        title: 'Honolulu High-Rise Condo Window & 26" Wall AC Installation ($0 Estimate) | Oahu',
        description: '$0 Free Estimate • (808) 488-1111. Honolulu condo 26" through-the-wall GE Built-In & quiet 44dB LG Dual Inverter AC sales, drain routing & installation.',
        url: 'https://www.affordablehome-ac.com/high-rise-condo-ac-rules-honolulu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'High-Rise Condo Window AC Rules Honolulu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Honolulu High-Rise Condo Window & 26" Wall AC Installation ($0 Estimate) | Oahu',
        description: '$0 Free Estimate • (808) 488-1111. Honolulu condo 26" through-the-wall GE Built-In & quiet 44dB LG Dual Inverter AC sales, drain routing & installation.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp'],
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
                "text": "In high-rise towers, our Oahu cooling technicians use industrial safety tether lanyards that anchor the AC chassis to the interior building structure throughout the entire mounting process, mathematically eliminating any risk of falling debris or equipment drop onto sidewalks or lanais below."
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
            "name": "High-Rise Condo 26\" Wall Sleeve & Window AC",
            "item": "https://www.affordablehome-ac.com/high-rise-condo-ac-rules-honolulu"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
