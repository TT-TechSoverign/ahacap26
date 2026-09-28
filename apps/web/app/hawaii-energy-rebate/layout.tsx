import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '$45 Hawaii Energy Window AC Rebate Oahu | Official Application | Affordable Home A/C'
    },
    description: 'Claim your $45 Hawaii Energy cash rebate on qualifying Energy Star LG Dual Inverter window air conditioners. Download official pre-approved application form. Central Waipahu warehouse pickup or $50 delivery.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/hawaii-energy-rebate',
    },
    openGraph: {
        title: '$45 Hawaii Energy Window AC Rebate Oahu | Official Application | Affordable Home A/C',
        description: 'Claim your $45 Hawaii Energy cash rebate on qualifying Energy Star LG Dual Inverter window air conditioners. Download official pre-approved application form. Central Waipahu warehouse pickup or $50 delivery.',
        url: 'https://www.affordablehome-ac.com/hawaii-energy-rebate',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Hawaii Energy Window AC $45 Rebate Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '$45 Hawaii Energy Window AC Rebate Oahu | Official Application | Affordable Home A/C',
        description: 'Claim your $45 Hawaii Energy cash rebate on qualifying Energy Star LG Dual Inverter window air conditioners. Download official pre-approved application form. Central Waipahu warehouse pickup or $50 delivery.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
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
                "text": "The Hawaii Energy rebate is exactly $45 for qualifying Energy Star certified room window air conditioners, such as the LG Dual Inverter models stocked in our Waipahu warehouse."
            }
        },
        {
            "@type": "Question",
            "name": "Does Affordable Home AC participate in Hawaii Energy rebates for ductless mini splits?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Our rebate participation is strictly for qualifying Energy Star window AC units. Hawaii Energy currently offers 0% cash rebates for residential ductless mini-split systems. For mini-split installations, we provide honest direct contractor pricing CT-36775 with zero inflated markup gimmicks."
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
    "name": "Affordable Home A/C",
    "telephone": "+1-808-488-1111",
    "licenseNumber": "CT-36775",
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
