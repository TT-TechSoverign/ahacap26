import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '$50 Flat-Rate Window AC Delivery Oahu | In-Stock LG & GE ACs ($395–$1,200)'
    },
    description: '$50 flat Oahu delivery or free Waipahu pickup by appointment! 16 in-stock LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200, $45 Rebate) • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-delivery-service-oahu',
    },
    openGraph: {
        title: '$50 Flat-Rate Window AC Delivery Oahu | In-Stock LG & GE ACs ($395–$1,200)',
        description: '$50 flat Oahu delivery or free Waipahu pickup by appointment! 16 in-stock LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200, $45 Rebate) • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/window-ac-delivery-service-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Delivery Service Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '$50 Flat-Rate Window AC Delivery Oahu | In-Stock LG & GE ACs ($395–$1,200)',
        description: '$50 flat Oahu delivery or free Waipahu pickup by appointment! 16 in-stock LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200, $45 Rebate) • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
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
                "text": "Yes! You can choose our professional window AC installation add-on at checkout. Our Oahu cooling technicians will deliver the unit, lay protective floor drop cloths, securely mount the unit with standard brackets if required, and test cooling operation before leaving."
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
