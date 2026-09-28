import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Same-Day Window AC Pickup Oahu | Emergency Cooling Waipahu | Affordable Home A/C'
    },
    description: 'Beat the island heatwave with same-day window air conditioner pickup at our Waipahu warehouse. In-stock LG Dual Inverter models loaded in minutes by appointment. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/same-day-window-ac-pickup-oahu',
    },
    openGraph: {
        title: 'Same-Day Window AC Pickup Oahu | Emergency Cooling Waipahu | Affordable Home A/C',
        description: 'Beat the island heatwave with same-day window air conditioner pickup at our Waipahu warehouse. In-stock LG Dual Inverter models loaded in minutes by appointment. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/same-day-window-ac-pickup-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Same-Day Window AC Pickup Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Same-Day Window AC Pickup Oahu | Emergency Cooling Waipahu | Affordable Home A/C',
        description: 'Beat the island heatwave with same-day window air conditioner pickup at our Waipahu warehouse. In-stock LG Dual Inverter models loaded in minutes by appointment. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
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

export default function SameDayPickupLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(sameDayPickupFaqSchema) }}
            />
            {children}
        </>
    );
}
