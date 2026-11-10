import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Contact Affordable Home A/C Oahu | $0 Free Estimate & Waipahu Pickup | (808) 488-1111'
    },
    description: 'Call (808) 488-1111 or book online! $0 Free Window AC installation & cleaning estimates across Oahu, or schedule Waipahu warehouse pickup (94-150 Leoleo St #203).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/contact',
    },
    openGraph: {
        title: 'Contact Affordable Home A/C Oahu | $0 Free Estimate & Waipahu Pickup | (808) 488-1111',
        description: 'Call (808) 488-1111 or book online! $0 Free Window AC installation & cleaning estimates across Oahu, or schedule Waipahu warehouse pickup (94-150 Leoleo St #203).',
        url: 'https://www.affordablehome-ac.com/contact',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Contact Affordable Home A/C',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Contact Affordable Home A/C Oahu | $0 Free Estimate & Waipahu Pickup | (808) 488-1111',
        description: 'Call (808) 488-1111 or book online! $0 Free Window AC installation & cleaning estimates across Oahu, or schedule Waipahu warehouse pickup (94-150 Leoleo St #203).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
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

const contactFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Where is Affordable Home A/C's Waipahu warehouse located?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our Oahu warehouse is located at 94-150 Leoleo St. #203, Waipahu, HI 96797. Warehouse pickup and showroom consultations are by appointment so we can have your unit staged and ready—call (808) 488-1111 or schedule online."
            }
        },
        {
            "@type": "Question",
            "name": "Do I have to pay anything upfront to request a Window AC installation or cleaning estimate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No! Affordable Home A/C operates strictly By Appointment First with $0 upfront booking payment barriers. Submit your appointment request online or call (808) 488-1111 and our dispatch team will confirm your visit directly."
            }
        }
    ]
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(contactFaqSchema) }}
            />
            {children}
        </>
    );
}
