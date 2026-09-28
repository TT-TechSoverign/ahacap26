import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Commercial Window AC Oahu | Jobsite Trailers & Offices | Affordable Home A/C'
    },
    description: 'Rugged commercial window air conditioners for Oahu construction jobsite trailers, security guard shacks, retail shops, and offices. Bulk orders and same-day Waipahu pickup.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/commercial-window-ac-oahu',
    },
    openGraph: {
        title: 'Commercial Window AC Oahu | Jobsite Trailers & Offices | Affordable Home A/C',
        description: 'Rugged commercial window air conditioners for Oahu construction jobsite trailers, security guard shacks, retail shops, and offices. Bulk orders and same-day Waipahu pickup.',
        url: 'https://www.affordablehome-ac.com/commercial-window-ac-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Commercial Window AC Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Commercial Window AC Oahu | Jobsite Trailers & Offices | Affordable Home A/C',
        description: 'Rugged commercial window air conditioners for Oahu construction jobsite trailers, security guard shacks, retail shops, and offices. Bulk orders and same-day Waipahu pickup.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const commercialAcFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Do you provide window air conditioners for construction jobsite trailers on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Construction trailers and mobile offices are exposed to extreme sun and high heat. We supply durable, high-BTU window units (12,000 to 23,500 BTU) in stock for immediate jobsite pickup or delivery."
            }
        },
        {
            "@type": "Question",
            "name": "Can you provide commercial invoice billing for business accounts?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We work directly with general contractors, property managers, and commercial business accounts across Oahu, providing itemized invoices with Hawaii GET tax documentation."
            }
        },
        {
            "@type": "Question",
            "name": "Are commercial purchases eligible for the $45 Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Qualifying Energy Star certified window AC models are eligible for the $45 Hawaii Energy cash rebate on qualifying utility meters. We supply the pre-approved application form PDF."
            }
        }
    ]
};

export default function CommercialWindowAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(commercialAcFaqSchema) }}
            />
            {children}
        </>
    );
}
