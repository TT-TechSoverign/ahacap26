import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Seasonal AC Maintenance Plans Oahu | Preventative Care | Affordable Home A/C'
    },
    description: 'Keep your cooling system running at peak efficiency year-round. Bi-annual coil cleaning, amp draw checks, and drain flushes tailored to Oahu microclimates. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/seasonal-ac-maintenance-plans-oahu',
    },
    openGraph: {
        title: 'Seasonal AC Maintenance Plans Oahu | Preventative Care | Affordable Home A/C',
        description: 'Keep your cooling system running at peak efficiency year-round. Bi-annual coil cleaning, amp draw checks, and drain flushes tailored to Oahu microclimates. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/seasonal-ac-maintenance-plans-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Seasonal AC Maintenance Plans Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Seasonal AC Maintenance Plans Oahu | Preventative Care | Affordable Home A/C',
        description: 'Keep your cooling system running at peak efficiency year-round. Bi-annual coil cleaning, amp draw checks, and drain flushes tailored to Oahu microclimates. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const seasonalPlanFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How often does an air conditioner need maintenance on Oahu?",
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
                "text": "Our multi-point inspection covers evaporator coil sanitization, condenser fan motor amp draws, operating pressures, electrical disconnect tightness, condensate drain clearing, and temperature split verification."
            }
        },
        {
            "@type": "Question",
            "name": "Do you lock customers into recurring binding contracts?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No locked-in contracts. We believe in earning your business on every service call with straightforward flat rates: $175 for Basic Mini Split Cleaning and $275 for Premium Teardowns."
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
