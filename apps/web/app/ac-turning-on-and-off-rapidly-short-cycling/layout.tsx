import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Turning On and Off Rapidly? Short Cycling Fixes Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Why is your LG or GE window air conditioner short cycling every few minutes? Learn causes of rapid on/off.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-turning-on-and-off-rapidly-short-cycling',
    },
    openGraph: {
        title: 'AC Turning On and Off Rapidly? Short Cycling Fixes Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Why is your LG or GE window air conditioner short cycling every few minutes? Learn causes of rapid on/off.',
        url: 'https://www.affordablehome-ac.com/ac-turning-on-and-off-rapidly-short-cycling',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Turning On and Off Rapidly Short Cycling Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Turning On and Off Rapidly? Short Cycling Fixes Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Why is your LG or GE window air conditioner short cycling every few minutes? Learn causes of rapid on/off.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const shortCyclingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is air conditioner short cycling?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Short cycling occurs when an air conditioner starts up, runs for only 2 to 5 minutes, shuts down abruptly before completing a full cooling cycle, and repeats this sequence continuously. This prevents proper room dehumidification and causes high electrical wear."
            }
        },
        {
            "@type": "Question",
            "name": "Can an oversized air conditioner cause short cycling in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. An oversized unit drops the sensible air temperature in a small room too rapidly without running long enough to remove moisture. This leaves your room feeling cold and clammy, encouraging mold growth while stressing the compressor."
            }
        },
        {
            "@type": "Question",
            "name": "How does Affordable Home A/C troubleshoot short cycling?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "During our on-site window AC evaluation, our technician tests temperature sensors (thermistors) with a digital multimeter, verifies coil temperature differentials, inspects capacitor capacitance, and calculates room thermal heat load."
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
            "name": "Window AC Repair & Assessment",
            "item": "https://www.affordablehome-ac.com/ac-repair-oahu"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Window AC Short-Cycling Fix",
            "item": "https://www.affordablehome-ac.com/ac-turning-on-and-off-rapidly-short-cycling"
        }
    ]
};

export default function ShortCyclingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(shortCyclingFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
