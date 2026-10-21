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
                "text": "If a window AC is over 5–7 years old with severe coastal salt-air fin rot, loud bearing noise, or compressor wear, upgrading to a brand-new LG Dual Inverter & GE Built-In starting at $560 with a $45 Hawaii Energy cash rebate is often more cost-effective and saves up to 40% on monthly HECO bills."
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
    "@id": "https://www.affordablehome-ac.com/ac-cleaning-oahu#service",
    "name": "Oahu Window AC Deep Cleaning, Coil Sanitization & Clean-vs-Replace Assessment",
    "url": "https://www.affordablehome-ac.com/ac-cleaning-oahu",
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/#hvacbusiness",
        "name": "Affordable Home A/C",
        "slogan": "Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005",
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
    "areaServed": "Oahu, Hawaii",
    "description": "On-site window air conditioner evaporator/condenser coil cleaning, antimicrobial pan treatment, condensate drain clearing, floor drop-cloth protection, and honest clean-vs-replace assessments across all 22 Oahu neighborhoods.",
    "potentialAction": {
        "@type": "ReserveAction",
        "name": "Schedule Oahu Window AC Cleaning or $0 Clean-vs-Replace Assessment",
        "target": {
            "@type": "EntryPoint",
            "urlTemplate": "https://www.affordablehome-ac.com/ac-cleaning-oahu",
            "inLanguage": "en-US"
        }
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Oahu Window AC Cleaning & Assessment Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "name": "Window AC Clean-vs-Replace Assessment (By Appointment)",
                "price": "0.00",
                "priceCurrency": "USD",
                "description": "Free on-site evaluation of coil condition, salt-air fin integrity, and HECO power draw with custom itemized quote."
            },
            {
                "@type": "Offer",
                "name": "On-Site Window AC Coil Cleaning & Antimicrobial Pan Sanitization",
                "description": "Evaporator and condenser coil foaming wash, blower wheel sanitization, condensate drain clearing, and protective floor drop-cloth service by appointment."
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
