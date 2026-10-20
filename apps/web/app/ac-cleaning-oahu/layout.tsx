import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Cleaning Oahu | Coil Sanitization & Deep Clean | Affordable Home A/C'
    },
    description: 'Breathe cleaner air and restore ice-cold airflow with professional Window AC cleaning and sanitization on Oahu. Floor drop-cloth protection & clean-vs-replace evaluation. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-cleaning-oahu',
    },
    openGraph: {
        title: 'Window AC Cleaning Oahu | Coil Sanitization & Deep Clean | Affordable Home A/C',
        description: 'Breathe cleaner air and restore ice-cold airflow with professional Window AC cleaning and sanitization on Oahu. Floor drop-cloth protection & clean-vs-replace evaluation. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/ac-cleaning-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Window AC Cleaning Oahu Coil Sanitization',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Cleaning Oahu | Coil Sanitization & Deep Clean | Affordable Home A/C',
        description: 'Breathe cleaner air and restore ice-cold airflow with professional Window AC cleaning and sanitization on Oahu. Floor drop-cloth protection & clean-vs-replace evaluation. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
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
            "name": "Window AC Cleaning Oahu",
            "item": "https://www.affordablehome-ac.com/ac-cleaning-oahu"
        }
    ]
};

const acCleaningFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is included in your Window AC Cleaning & Sanitization service?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our Window AC Cleaning service includes reusable filter washing, evaporator and condenser coil foaming sanitization, blower wheel & air channel cleaning, slinger pan and drain channel flushing, and airflow temperature verification."
            }
        },
        {
            "@type": "Question",
            "name": "When should I replace my window air conditioner instead of cleaning it?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "If a window AC is over 5–7 years old with severe coastal salt-air fin rot, loud bearing noise, or compressor wear, upgrading to a brand-new LG Dual Inverter starting at $560 with a $45 Hawaii Energy cash rebate is often more cost-effective and saves up to 40% on monthly HECO bills."
            }
        },
        {
            "@type": "Question",
            "name": "Do your technicians use protective floor drop cloths?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, absolutely. Our technicians always lay clean protective floor drop cloths beneath the unit during service, ensuring your home is left cleaner than when we arrived."
            }
        }
    ]
};

const hvacServiceSchema = {
    "@context": "https://schema.org",
    "@type": "HVACService",
    "name": "Window AC Cleaning & Mold Remediation Service",
    "provider": {
        "@type": "HVACBusiness",
        "name": "Affordable Home A/C",
        "telephone": "+1-808-488-1111",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "94-150 Leoleo St. #203",
            "addressLocality": "Waipahu",
            "addressRegion": "HI",
            "postalCode": "96797",
            "addressCountry": "US"
        }
    },
    "areaServed": "Oahu",
    "description": "Professional window air conditioning cleaning, black mold sanitation, and preventative coil care across Oahu.",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Window AC Cleaning Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "name": "Standard Window AC Cleaning & Coil Rinse",
                "price": "175.00",
                "priceCurrency": "USD",
                "description": "Routine filter and coil care, drain pan flush, and performance inspection."
            },
            {
                "@type": "Offer",
                "name": "Deep Window AC Sanitization & Mold Purge",
                "price": "225.00",
                "priceCurrency": "USD",
                "description": "Deep clean air scoop & blower wheel, flush condensate slinger pan, and antimicrobial coil wash."
            }
        ]
    }
};

export default function AcCleaningOahuLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(acCleaningFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacServiceSchema) }}
            />
            {children}
        </>
    );
}
