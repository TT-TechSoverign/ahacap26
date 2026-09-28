import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Refrigerant Leak Detection Hawaii | Electronic Sniffers & Flare Repair | Affordable Home A/C'
    },
    description: 'Pinpoint refrigerant freon leaks in mini split copper flares and coils with electronic halogen sniffers and nitrogen decay testing in Oahu. EPA certified. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-refrigerant-leak-detection-hawaii',
    },
    openGraph: {
        title: 'AC Refrigerant Leak Detection Hawaii | Electronic Sniffers & Flare Repair | Affordable Home A/C',
        description: 'Pinpoint refrigerant freon leaks in mini split copper flares and coils with electronic halogen sniffers and nitrogen decay testing in Oahu. EPA certified. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/ac-refrigerant-leak-detection-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Refrigerant Leak Detection Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Refrigerant Leak Detection Hawaii | Electronic Sniffers & Flare Repair | Affordable Home A/C',
        description: 'Pinpoint refrigerant freon leaks in mini split copper flares and coils with electronic halogen sniffers and nitrogen decay testing in Oahu. EPA certified. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const refrigerantLeakFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How can I tell if my air conditioner has a refrigerant leak?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most common symptoms are ice forming on the indoor evaporator coils or thin copper service valves, the system running for hours without lowering the room temperature, a faint hissing sound near flare fittings, or dark oily residue coating the copper connections."
            }
        },
        {
            "@type": "Question",
            "name": "Why shouldn't I just ask a technician to 'top off' or add more freon?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Air conditioning systems are hermetically sealed closed loops. Refrigerant is never consumed or 'used up.' If your system is low, a physical hole or loose flare exists. Simply adding refrigerant without repairing the leak violates EPA regulations and will leak out again within weeks."
            }
        },
        {
            "@type": "Question",
            "name": "How does Affordable Home A/C locate microscopic refrigerant leaks?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We utilize heated diode electronic halogen sniffers capable of detecting leaks as small as 0.1 oz/year, bubble test micro-leak fluids on brass flare connections, and perform high-pressure nitrogen decay tests to verify hermetic integrity."
            }
        }
    ]
};

export default function RefrigerantLeakLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(refrigerantLeakFaqSchema) }}
            />
            {children}
        </>
    );
}
