import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Waipahu Window AC Warehouse Pickup ($395–$1,200) | 16 In-Stock LG & GE Models'
    },
    description: 'Same-day Waipahu warehouse pickup by appointment (94-150 Leoleo St #203) or $50 Oahu delivery! 16 in-stock LG & GE Window ACs ($395–$1,200) • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-warehouse-pickup-waipahu',
    },
    openGraph: {
        title: 'Waipahu Window AC Warehouse Pickup ($395–$1,200) | 16 In-Stock LG & GE Models',
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
        title: 'Waipahu Window AC Warehouse Pickup ($395–$1,200) | 16 In-Stock LG & GE Models',
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
            "name": "Where is the warehouse pickup location on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our warehouse facility is centrally located in Waipahu at 94-150 Leoleo St. #203, Waipahu, HI 96797, right off Farrington Highway near Leeward Community College. Pickups are scheduled by appointment."
            }
        },
        {
            "@type": "Question",
            "name": "How quickly can I pick up my window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Units in stock are available for same-day or next-day pickup by appointment. Once your online order is placed through our Shop, our team contacts you to confirm your convenient loading window."
            }
        },
        {
            "@type": "Question",
            "name": "Do you help load the unit into my vehicle?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our warehouse team will gladly assist you in loading the unit into your trunk, hatchback, or truck bed and provide you with your receipt and pre-approved $45 Hawaii Energy rebate form."
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

export default function WarehousePickupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pickupFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
