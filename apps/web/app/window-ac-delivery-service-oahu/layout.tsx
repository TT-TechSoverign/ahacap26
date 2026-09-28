import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Delivery Service Oahu | Flat $50 Island-Wide | Affordable Home A/C'
    },
    description: 'Flat $50 island-wide delivery on all LG Dual Inverter window air conditioners from our Waipahu warehouse to any Oahu residence. Fast, safe delivery to your doorstep.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-delivery-service-oahu',
    },
    openGraph: {
        title: 'Window AC Delivery Service Oahu | Flat $50 Island-Wide | Affordable Home A/C',
        description: 'Flat $50 island-wide delivery on all LG Dual Inverter window air conditioners from our Waipahu warehouse to any Oahu residence. Fast, safe delivery to your doorstep.',
        url: 'https://www.affordablehome-ac.com/window-ac-delivery-service-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Window AC Delivery Service Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Delivery Service Oahu | Flat $50 Island-Wide | Affordable Home A/C',
        description: 'Flat $50 island-wide delivery on all LG Dual Inverter window air conditioners from our Waipahu warehouse to any Oahu residence. Fast, safe delivery to your doorstep.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const deliveryFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much does window AC delivery cost on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We charge a flat rate of $50 for delivery anywhere on Oahu, from Hawaii Kai and urban Honolulu to Ewa Beach, Kapolei, Kailua, and the North Shore."
            }
        },
        {
            "@type": "Question",
            "name": "How quickly can my window AC be delivered?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Units in stock at our Waipahu warehouse are typically scheduled for delivery within 24 to 48 hours. Our dispatch team coordinates a 2-hour delivery window directly with you."
            }
        },
        {
            "@type": "Question",
            "name": "Can you install the window AC when you deliver it?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! You can choose our professional window AC installation add-on at checkout. Our licensed technicians will deliver the unit, lay protective floor drop cloths, securely mount the unit with standard brackets if required, and test cooling operation before leaving."
            }
        }
    ]
};

export default function WindowAcDeliveryLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(deliveryFaqSchema) }}
            />
            {children}
        </>
    );
}
