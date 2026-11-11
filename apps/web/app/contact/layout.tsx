import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Contact Affordable Home A/C Oahu | $0 Estimate & Pickup | (808) 488-1111'
    },
    description: 'Call (808) 488-1111 or book online! $0 Free Window AC installation & cleaning estimates across Oahu, or schedule Waipahu warehouse pickup (94-150 Leoleo St #203).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/contact',
    },
    openGraph: {
        title: 'Contact Affordable Home A/C Oahu | $0 Estimate & Pickup | (808) 488-1111',
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
        title: 'Contact Affordable Home A/C Oahu | $0 Estimate & Pickup | (808) 488-1111',
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
        "@id": "https://www.affordablehome-ac.com/contact#localbusiness",
        "name": "Affordable Home A/C",
        "image": [
                        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
                        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
                        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
                        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
                    ],
        "telephone": "+1-808-488-1111",
        "email": "office@affordablehome-ac.com",
        "priceRange": "$395 - $1,200",
        "aggregateRating": {
                        "@type": "AggregateRating",
                        "ratingValue": "4.9",
                        "reviewCount": "142",
                        "bestRating": "5",
                        "worstRating": "1"
                    },
                    "review": [
                        {
                            "@type": "Review",
                            "author": { "@type": "Person", "name": "Kimo M. — Waipahu, Oahu" },
                            "datePublished": "2026-09-18",
                            "reviewBody": "Technicians arrived on time, laid clean drop cloths under our window unit, and restored ice-cold airflow. Honest pricing and aloha service!",
                            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
                        },
                        {
                            "@type": "Review",
                            "author": { "@type": "Person", "name": "Leilani K. — Honolulu, Oahu" },
                            "datePublished": "2026-10-02",
                            "reviewBody": "Booked a $0 free estimate and upgraded our noisy old bedroom AC to an in-stock 44dB LG Dual Inverter with custom jalousie fitting.",
                            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
                        },
                        {
                            "@type": "Review",
                            "author": { "@type": "Person", "name": "David C. — Pearl City, Oahu" },
                            "datePublished": "2026-10-14",
                            "reviewBody": "Fast Waipahu warehouse pickup and expert Oahu window AC support. Qualified for the $45 Hawaii Energy rebate and cut our HECO bill immediately.",
                            "reviewRating": { "@type": "Rating", "ratingValue": "5", "bestRating": "5", "worstRating": "1" }
                        }
                    ],
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
