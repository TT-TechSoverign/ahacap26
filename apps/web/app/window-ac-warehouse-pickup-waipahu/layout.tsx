import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Warehouse Pickup Waipahu | Same-Day In-Stock | Affordable Home A/C'
    },
    description: 'Pick up in-stock LG Dual Inverter window air conditioners directly from our central Waipahu warehouse (94-150 Leoleo St #203). Fast pickup by appointment with $45 Hawaii Energy cash rebate. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-warehouse-pickup-waipahu',
    },
    openGraph: {
        title: 'Window AC Warehouse Pickup Waipahu | Same-Day In-Stock | Affordable Home A/C',
        description: 'Pick up in-stock LG Dual Inverter window air conditioners directly from our central Waipahu warehouse (94-150 Leoleo St #203). Fast pickup by appointment with $45 Hawaii Energy cash rebate. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/window-ac-warehouse-pickup-waipahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Window AC Warehouse Pickup Waipahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Warehouse Pickup Waipahu | Same-Day In-Stock | Affordable Home A/C',
        description: 'Pick up in-stock LG Dual Inverter window air conditioners directly from our central Waipahu warehouse (94-150 Leoleo St #203). Fast pickup by appointment with $45 Hawaii Energy cash rebate. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
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

export default function WarehousePickupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pickupFaqSchema) }}
            />
            {children}
        </>
    );
}
