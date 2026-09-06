import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Mini Split AC Deep Cleaning Oahu | $175-$275 Mold Sanitization | Affordable Home A/C'
    },
    description: 'Expert ductless mini split deep cleaning in Oahu. Eradicate black mold, salt-air buildup, and musty odors with our $175 Basic or $275 Full Teardown deep sanitization. Zero indoor water mess. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/mini_split_ac_maintenance',
    },
    openGraph: {
        title: 'Mini Split AC Deep Cleaning Oahu | $175-$275 Mold Sanitization | Affordable Home A/C',
        description: 'Eradicate black mold, salt-air buildup, and musty odors with our $175 Basic or $275 Full Teardown deep sanitization. Zero indoor water mess. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/mini_split_ac_maintenance',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/minisplitacphotos/mini-split-premium-maintenance-before-after-800x800.png',
                width: 800,
                height: 800,
                alt: 'Mini Split AC Deep Cleaning Before and After',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mini Split AC Deep Cleaning Oahu | $175-$275 Mold Sanitization | Affordable Home A/C',
        description: 'Eradicate black mold, salt-air buildup, and musty odors with our $175 Basic or $275 Full Teardown deep sanitization. Zero indoor water mess. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/minisplitacphotos/mini-split-premium-maintenance-before-after-800x800.png'],
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
            "name": "Mini Split AC",
            "item": "https://www.affordablehome-ac.com/mini_split_ac"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Mini Split AC Cleaning",
            "item": "https://www.affordablehome-ac.com/mini_split_ac_maintenance"
        }
    ]
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
                "text": "Our routine basic mini-split sanitization is $175 per unit, and our full clinical deep chemical teardown is $275 per unit. Multi-unit residential scheduling is available across Oahu."
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
                "text": "Yes. We use multi-point clinical teardowns, floor drop-cloth protection, and deep-cleansing, odor-neutralizing solutions to power-wash hidden black mold, biofilm, and salt buildup from the blower wheel, evaporator coils, and drain pan—restoring crisp, icy airflow with zero water mess inside your home."
            }
        },
        {
            "@type": "Question",
            "name": "Can a dirty mini-split AC increase my HECO power bill?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Mold and dust choking the blower wheel and coil restrict airflow, forcing your inverter compressor to run at higher wattage and increasing monthly power consumption by 20% to 30%."
            }
        },
        {
            "@type": "Question",
            "name": "Will the chemical cleaning make a mess or leave chemical fumes in my house?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Our technicians lay down clean, heavy-duty floor drop cloths directly beneath your unit and use precision rinses. All dirty water, mold slurry, and chemical rinse are safely contained and removed from your home with zero water mess on your floors."
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
    "description": "Professional ductless mini-split cleaning and chemical sanitization service across all Oahu neighborhoods. Restores ice-cold airflow, eliminates black mold, and prevents water leaks.",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Mini Split Cleaning Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "name": "Basic Mini Split AC Cleaning",
                "price": "175.00",
                "priceCurrency": "USD",
                "description": "Coil wipe-down, filter wash, pressure check, and drain line flush."
            },
            {
                "@type": "Offer",
                "name": "Premium Chemical Teardown Deep Cleaning",
                "price": "275.00",
                "priceCurrency": "USD",
                "description": "Full clinical indoor teardown, blower wheel deep power flush, microbial mold purge, and coil descaling."
            }
        ]
    }
};

export default function MiniSplitAcMaintenanceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
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
