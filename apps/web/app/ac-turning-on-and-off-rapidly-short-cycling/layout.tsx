import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Turning On and Off Rapidly? Short Cycling Fixes Oahu | Affordable Home A/C'
    },
    description: 'Why is your air conditioner short cycling every few minutes? Learn causes of rapid on/off cycles—oversizing, faulty thermistors, or clogged coils. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-turning-on-and-off-rapidly-short-cycling',
    },
    openGraph: {
        title: 'AC Turning On and Off Rapidly? Short Cycling Fixes Oahu | Affordable Home A/C',
        description: 'Why is your air conditioner short cycling every few minutes? Learn causes of rapid on/off cycles—oversizing, faulty thermistors, or clogged coils. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/ac-turning-on-and-off-rapidly-short-cycling',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Turning On and Off Rapidly Short Cycling Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Turning On and Off Rapidly? Short Cycling Fixes Oahu | Affordable Home A/C',
        description: 'Why is your air conditioner short cycling every few minutes? Learn causes of rapid on/off cycles—oversizing, faulty thermistors, or clogged coils. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
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
                "text": "During our $175 diagnostic visit, our licensed technician tests temperature sensors (thermistors) with a digital multimeter, verifies refrigerant operating pressures, inspects capacitor capacitance, and calculates room thermal heat load."
            }
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
            {children}
        </>
    );
}
