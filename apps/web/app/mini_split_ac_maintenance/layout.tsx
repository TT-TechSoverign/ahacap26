import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Ductless Mini Split AC Cleaning Oahu | Deep Mold Sanitization | Affordable Home A/C'
    },
    description: 'Expert ductless mini split cleaning service in Oahu. Eradicate black mold, salt-air buildup, and musty odors with our $175-$225 professional deep sanitization.',
    alternates: {
        canonical: '/mini_split_ac_maintenance',
    },
    openGraph: {
        title: 'Ductless Mini Split AC Cleaning Oahu | Deep Mold Sanitization | Affordable Home A/C',
        description: 'Expert ductless mini split cleaning service in Oahu. Eradicate black mold, salt-air buildup, and musty odors with our $175-$225 professional deep sanitization.',
        url: '/mini_split_ac_maintenance',
        siteName: 'Affordable Home A/C',
        type: 'website',
    }
};

const miniSplitFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much does ductless mini-split cleaning cost in Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our basic mini-split sanitization is $175 per unit, and our full clinical deep chemical teardown is $225 per unit. Multi-unit residential discounts are available."
            }
        },
        {
            "@type": "Question",
            "name": "How often should mini-split AC units be cleaned in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Due to Oahu's tropical humidity and coastal salt-air exposure, professional deep cleaning is recommended every 6 to 12 months to eliminate toxic black mold, clear clogged drain lines, and maintain peak cooling performance."
            }
        },
        {
            "@type": "Question",
            "name": "Does professional cleaning remove black mold from mini-split blower wheels?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. We use specialized indoor catchment wash-bags and EPA-certified botanical sanitizers to thoroughly power-wash the squirrel-cage blower wheel, evaporator coils, and drain pan with zero water mess inside your home."
            }
        },
        {
            "@type": "Question",
            "name": "Can a dirty mini-split AC increase my HECO power bill?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Mold and dust choking the blower wheel and coil restrict airflow, forcing your inverter compressor to run at higher wattage and increasing monthly power consumption by 20% to 30%."
            }
        }
    ]
};

const hvacServiceSchema = {
    "@context": "https://schema.org",
    "@type": "HVACService",
    "name": "Ductless Mini Split AC Cleaning & Sanitization",
    "provider": {
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
        }
    },
    "areaServed": "Oahu",
    "description": "Professional ductless mini-split cleaning and chemical sanitization service across all Oahu neighborhoods."
};

export default function MiniSplitAcMaintenanceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(miniSplitFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacServiceSchema) }}
            />
            {children}
        </>
    );
}
