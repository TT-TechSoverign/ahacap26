import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Cleaning Service Oahu | Teardown & Mold Sanitization | Affordable Home A/C'
    },
    description: 'Professional window AC teardown deep cleaning on Oahu. Eradicate black mold, restore icy-cold cooling airflow, and protect against salt-air rust with fast 24-48hr turnaround.',
    alternates: {
        canonical: '/window_ac_maintenance',
    },
    openGraph: {
        title: 'Window AC Cleaning Service Oahu | Teardown & Mold Sanitization | Affordable Home A/C',
        description: 'Professional window AC teardown deep cleaning on Oahu. Eradicate black mold, restore icy-cold cooling airflow, and protect against salt-air rust with fast 24-48hr turnaround.',
        url: '/window_ac_maintenance',
        siteName: 'Affordable Home A/C',
        type: 'website',
    }
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
    "description": "Professional window air conditioner deep chemical teardown, mold eradication, and anti-corrosion maintenance in Oahu, Hawaii."
};

export default function WindowAcMaintenanceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
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
