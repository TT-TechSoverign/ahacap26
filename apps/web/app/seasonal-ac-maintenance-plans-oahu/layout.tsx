import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Seasonal AC Maintenance Plans Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Keep your window cooling system running at peak efficiency year-round. Bi-annual coil cleaning, amp draw checks.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/seasonal-ac-maintenance-plans-oahu',
    },
    openGraph: {
        title: 'Seasonal AC Maintenance Plans Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Keep your window cooling system running at peak efficiency year-round. Bi-annual coil cleaning, amp draw checks.',
        url: 'https://www.affordablehome-ac.com/seasonal-ac-maintenance-plans-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Seasonal AC Maintenance Plans Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Seasonal AC Maintenance Plans Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Keep your window cooling system running at peak efficiency year-round. Bi-annual coil cleaning, amp draw checks.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const seasonalPlanFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How often does a LG & GE window air conditioner need maintenance on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Due to Oahu's continuous salt-laden marine air and 80%+ humidity, we recommend bi-annual (every 6 months) servicing for primary living areas, and at minimum an annual comprehensive cleaning for secondary bedrooms."
            }
        },
        {
            "@type": "Question",
            "name": "What is verified during a routine preventative maintenance visit?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our multi-point inspection covers evaporator and condenser coil sanitization, fan motor amp draws, electrical plug safety, condensate base pan clearing, and temperature Delta-T verification."
            }
        },
        {
            "@type": "Question",
            "name": "Do you lock customers into recurring binding contracts?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No locked-in contracts. We believe in earning your business on every service call with upfront itemized estimates and zero upfront booking fees."
            }
        }
    ]
};

export default function SeasonalMaintenanceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(seasonalPlanFaqSchema) }}
            />
            {children}
        </>
    );
}
