import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Contact & Schedule Appointment Oahu | Affordable Home A/C'
    },
    description: 'Contact Affordable Home A/C on Oahu. Schedule $0 in-home mini split estimates, $175 diagnostic troubleshooting, or window AC installations. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/contact',
    },
    openGraph: {
        title: 'Contact & Schedule Appointment Oahu | Affordable Home A/C',
        description: 'Contact Affordable Home A/C on Oahu. Schedule $0 in-home mini split estimates, $175 diagnostic troubleshooting, or window AC installations. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/contact',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Contact Affordable Home A/C',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact & Schedule Appointment Oahu | Affordable Home A/C',
        description: 'Contact Affordable Home A/C on Oahu. Schedule $0 in-home mini split estimates, $175 diagnostic troubleshooting, or window AC installations. Call (808) 488-1111.',
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
            "name": "Contact & Appointments",
            "item": "https://www.affordablehome-ac.com/contact"
        }
    ]
};

const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Affordable Home A/C",
    "mainEntity": {
        "@type": "HVACBusiness",
        "name": "Affordable Home A/C",
        "telephone": "+1-808-488-1111",
        "email": "office@affordablehome-ac.com",
        "licenseNumber": "CT-36775",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "94-150 Leoleo St. #203",
            "addressLocality": "Waipahu",
            "addressRegion": "HI",
            "postalCode": "96797",
            "addressCountry": "US"
        },
        "openingHoursSpecification": [
            {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                "opens": "08:00",
                "closes": "17:00"
            }
        ]
    }
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
            />
            {children}
        </>
    );
}
