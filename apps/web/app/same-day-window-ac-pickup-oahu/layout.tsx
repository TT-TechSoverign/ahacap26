import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Same-Day Window AC Pickup Oahu ($395–$1,200) | In-Stock Waipahu Warehouse'
    },
    description: 'Need a Window AC today on Oahu? Pick up factory-sealed LG Dual Inverter & GE 26" Built-In units ($395–$1,200) in Waipahu by appointment • Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-warehouse-pickup-waipahu',
    },
    openGraph: {
        title: 'Same-Day Window AC Pickup Oahu ($395–$1,200) | In-Stock Waipahu Warehouse',
        description: 'Need a Window AC today on Oahu? Pick up factory-sealed LG Dual Inverter & GE 26" Built-In units ($395–$1,200) in Waipahu by appointment • Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/window-ac-warehouse-pickup-waipahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Same-Day Window AC Pickup Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Same-Day Window AC Pickup Oahu ($395–$1,200) | In-Stock Waipahu Warehouse',
        description: 'Need a Window AC today on Oahu? Pick up factory-sealed LG Dual Inverter & GE 26" Built-In units ($395–$1,200) in Waipahu by appointment • Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const sameDayPickupFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can I pick up a window AC today on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! All in-stock models listed on our website are physically stored in our Waipahu warehouse at 94-150 Leoleo St #203. Simply place your order online and our dispatch team will coordinate your same-day pickup appointment."
            }
        },
        {
            "@type": "Question",
            "name": "How fast is the pickup process once I arrive?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Because pickups are arranged by appointment, your unit is pulled from the shelf, inspected, and waiting on the loading dock when you arrive. Our team assists with loading into your vehicle in under 10 minutes."
            }
        },
        {
            "@type": "Question",
            "name": "What if I can't pick it up myself today?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We offer island-wide flat-rate $50 delivery to any Oahu address from Hawaii Kai to Haleiwa, with prompt dispatch options."
            }
        }
    ]
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.affordablehome-ac.com" },
        { "@type": "ListItem", "position": 2, "name": "Oahu Window AC Shop", "item": "https://www.affordablehome-ac.com/shop" },
        { "@type": "ListItem", "position": 3, "name": "Waipahu Warehouse Pickup", "item": "https://www.affordablehome-ac.com/window-ac-warehouse-pickup-waipahu" }
    ]
};

export default function SameDayPickupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(sameDayPickupFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
