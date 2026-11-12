import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Waipahu Window AC Pickup ($395–$1,200) | 16 LG & GE Models'
    },
    description: 'Same-day Waipahu warehouse pickup by appointment (94-150 Leoleo St #203) or $50 Oahu delivery! 16 in-stock LG & GE Window ACs ($395–$1,200) • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-warehouse-pickup-waipahu',
    },
    openGraph: {
        title: 'Waipahu Window AC Pickup ($395–$1,200) | 16 LG & GE Models',
        description: 'Same-day Waipahu warehouse pickup by appointment (94-150 Leoleo St #203) or $50 Oahu delivery! 16 in-stock LG & GE Window ACs ($395–$1,200) • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/window-ac-warehouse-pickup-waipahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Warehouse Pickup Waipahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Waipahu Window AC Pickup ($395–$1,200) | 16 LG & GE Models',
        description: 'Same-day Waipahu warehouse pickup by appointment (94-150 Leoleo St #203) or $50 Oahu delivery! 16 in-stock LG & GE Window ACs ($395–$1,200) • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const pickupFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Where is the Affordable Home AC warehouse located?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our central Oahu warehouse is located at 94-150 Leoleo St. #203, Waipahu, HI 96797. We are easily accessible from H-1 and Farrington Highway, making pickups quick and convenient from Pearl City, Kapolei, Ewa Beach, and Honolulu."
            }
        },
        {
            "@type": "Question",
            "name": "How does warehouse pickup work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Browse our online Shop and purchase your unit with zero hassle. Select 'Waipahu Warehouse Pickup' at checkout. Our dispatch team will immediately coordinate an appointment window so your unit is pulled, inspected, and ready the moment you pull up."
            }
        },
        {
            "@type": "Question",
            "name": "Will an 8,000 or 12,000 BTU window AC fit in my car?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! 6,000 to 12,000 BTU units easily fit into the trunk or back seat of a standard sedan or compact SUV. 18,000 and 23,500 BTU units fit comfortably in an SUV, minivan, or truck bed."
            }
        },
        {
            "@type": "Question",
            "name": "Do warehouse pickup orders receive the $45 Hawaii Energy rebate form?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our warehouse coordinator hands you the official pre-approved $45 Hawaii Energy rebate application form PDF along with your itemized receipt upon pickup."
            }
        }
    ]
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
            "name": "Oahu Window AC Shop",
            "item": "https://www.affordablehome-ac.com/shop"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Waipahu Warehouse Window AC Pickup",
            "item": "https://www.affordablehome-ac.com/window-ac-warehouse-pickup-waipahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/window-ac-warehouse-pickup-waipahu#service",
    "name": "Free Waipahu Warehouse Window AC Pickup by Appointment (94-150 Leoleo St #203)",
    "serviceType": "Free Waipahu Warehouse Window AC Pickup by Appointment (94-150 Leoleo St #203)",
    "url": "https://www.affordablehome-ac.com/window-ac-warehouse-pickup-waipahu",
    "description": "Free ($0) local warehouse pickup by appointment in Waipahu, Oahu for all 16 factory-sealed LG Dual Inverter and GE Built-In Window ACs ($395–$1,200).",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp"
    ],
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/window-ac-warehouse-pickup-waipahu#localbusiness",
        "parentOrganization": {
            "@id": "https://www.affordablehome-ac.com/#hvacbusiness"
        },
        "name": "Affordable Home A/C",
        "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "url": "https://www.affordablehome-ac.com",
        "telephone": "+1-808-488-1111",
        "priceRange": "$395 - $1,200",
        "slogan": "Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "94-150 Leoleo St. #203",
            "addressLocality": "Waipahu",
            "addressRegion": "HI",
            "postalCode": "96797",
            "addressCountry": "US"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "142",
            "bestRating": "5",
            "worstRating": "1"
        }
    },
    "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Oahu, Hawaii"
    }
};

export default function WarehousePickupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pickupFaqSchema).replace(/</g, '\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pass5RichSchema).replace(/</g, '\u003c') }}
            />
            {children}
        </>
    );
}
