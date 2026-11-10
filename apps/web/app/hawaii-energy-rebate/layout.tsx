import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '$45 Hawaii Energy Window AC Rebate Oahu (2026 PDF Form) | In-Stock LG & GE ACs'
    },
    description: 'Download the official $45 Hawaii Energy Window AC Rebate PDF! Save up to 40% ($424/yr) on HECO bills with in-stock Waipahu LG & GE Inverters • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/hawaii-energy-rebate',
    },
    openGraph: {
        title: '$45 Hawaii Energy Window AC Rebate Oahu (2026 PDF Form) | In-Stock LG & GE ACs',
        description: 'Download the official $45 Hawaii Energy Window AC Rebate PDF! Save up to 40% ($424/yr) on HECO bills with in-stock Waipahu LG & GE Inverters • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/hawaii-energy-rebate',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Hawaii Energy Window AC $45 Rebate Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '$45 Hawaii Energy Window AC Rebate Oahu (2026 PDF Form) | In-Stock LG & GE ACs',
        description: 'Download the official $45 Hawaii Energy Window AC Rebate PDF! Save up to 40% ($424/yr) on HECO bills with in-stock Waipahu LG & GE Inverters • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const rebateFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much is the Hawaii Energy rebate for window air conditioners?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Hawaii Energy rebate is exactly $45 for qualifying Energy Star certified room window air conditioners, such as the LG Dual Inverter & GE models stocked in our Waipahu warehouse."
            }
        },
        {
            "@type": "Question",
            "name": "Which window AC models qualify for the $45 Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our rebate participation covers all qualifying Energy Star certified room window AC units, including our 6,000 BTU to 23,500 BTU LG Dual Inverter & GE models stocked in our Waipahu warehouse."
            }
        },
        {
            "@type": "Question",
            "name": "How do I claim my $45 window AC rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "When you purchase an in-stock qualifying Energy Star window unit from Affordable Home AC, we provide you with our official pre-approved Hawaii Energy Rebate Application Form (Version 4). Simply fill in your HECO electric account number and submit the form with your purchase receipt online or via mail to receive your $45 check from Hawaii Energy."
            }
        },
        {
            "@type": "Question",
            "name": "Can I pick up my rebate-qualifying window AC today?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! We maintain active inventory in our central Waipahu warehouse (94-150 Leoleo St #203). You can order online and arrange free local pickup by appointment, or choose flat-rate $50 island-wide delivery."
            }
        }
    ]
};

const hvacBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
                            "@id": "https://www.affordablehome-ac.com/#hvacbusiness",
    "name": "Affordable Home A/C",
    "telephone": "+1-808-488-1111",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "94-150 Leoleo St. #203",
        "addressLocality": "Waipahu",
        "addressRegion": "HI",
        "postalCode": "96797",
        "addressCountry": "US"
    },
    "areaServed": "Oahu"
};

export default function HawaiiEnergyRebateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(rebateFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacBusinessSchema) }}
            />
            {children}
        </>
    );
}
