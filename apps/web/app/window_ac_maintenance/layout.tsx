import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Cleaning Oahu | $275 Full Warehouse Teardown | Affordable Home A/C'
    },
    description: 'Restore factory ice-cold airflow & eliminate 100% of black mold with Oahu\'s premier $275 window AC full teardown cleaning. Waipahu warehouse drop-off with 24-48hr turnaround. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window_ac_maintenance',
    },
    openGraph: {
        title: 'Window AC Cleaning Oahu | $275 Full Warehouse Teardown | Affordable Home A/C',
        description: 'Restore factory ice-cold airflow & eliminate 100% of black mold with Oahu\'s premier $275 window AC full teardown cleaning. Waipahu warehouse drop-off with 24-48hr turnaround. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/window_ac_maintenance',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Window AC Teardown Cleaning Service Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Cleaning Oahu | $275 Full Warehouse Teardown | Affordable Home A/C',
        description: 'Restore factory ice-cold airflow & eliminate 100% of black mold with Oahu\'s premier $275 window AC full teardown cleaning. Waipahu warehouse drop-off with 24-48hr turnaround. Call (808) 488-1111.',
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
            "name": "Window AC Cleaning",
            "item": "https://www.affordablehome-ac.com/window_ac_maintenance"
        }
    ]
};

const windowAcFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much does window AC deep cleaning cost in Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our complete window AC teardown cleaning and sanitization service is a flat rate of $275 per unit with drop-off at our Waipahu warehouse. Restores ice-cold airflow, eliminates black mold, and lowers energy strain (subject to initial phone consultation and drop-off scheduling)."
            }
        },
        {
            "@type": "Question",
            "name": "Why does my window AC smell musty and blow weak air?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Hawaii's humidity traps black mold and dirt deep inside the blower wheel and coils, while ocean trade winds coat aluminum fins with salt. Our complete chassis teardown flushes these blockages from both sides, restoring crisp, icy-cold airflow and eliminating musty odors."
            }
        },
        {
            "@type": "Question",
            "name": "What is included in your window AC chemical teardown?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We completely extract the chassis, isolate sensitive electrical components, power-wash both evaporator and condenser coils, descale the blower wheel, clear drain channels, apply an anti-corrosion salt barrier, and digitally test cooling performance before pickup."
            }
        },
        {
            "@type": "Question",
            "name": "How often should window ACs be professionally cleaned in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For primary bedrooms and living rooms on Oahu, professional teardowns are recommended every 6 to 12 months to prevent premature compressor burnout and maintain healthy indoor air quality."
            }
        }
    ]
};

const hvacServiceSchema = {
    "@context": "https://schema.org",
    "@type": "HVACService",
    "name": "Window AC Chemical Cleaning & Teardown",
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
    "description": "Professional window air conditioner deep chemical teardown, mold eradication, and anti-corrosion maintenance in Oahu, Hawaii.",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Window AC Cleaning Service",
        "itemListElement": [
            {
                "@type": "Offer",
                "name": "Window AC Teardown Deep Cleaning (Waipahu Drop-Off)",
                "price": "275.00",
                "priceCurrency": "USD",
                "description": "Complete chassis extraction, pressurized dual-side coil flush, blower wheel descaling, drain flush, and anti-corrosion salt barrier."
            }
        ]
    }
};

export default function WindowAcMaintenanceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(windowAcFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacServiceSchema) }}
            />
            {children}
        </>
    );
}
