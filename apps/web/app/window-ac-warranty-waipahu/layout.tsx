import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Warranty & Local Support Waipahu | Affordable Home A/C'
    },
    description: 'Local Oahu warranty support for LG Dual Inverter window air conditioners. 1-year manufacturer warranty backed by our central Waipahu bench-testing facility and licensed technicians.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-warranty-waipahu',
    },
    openGraph: {
        title: 'Window AC Warranty & Local Support Waipahu | Affordable Home A/C',
        description: 'Local Oahu warranty support for LG Dual Inverter window air conditioners. 1-year manufacturer warranty backed by our central Waipahu bench-testing facility and licensed technicians.',
        url: 'https://www.affordablehome-ac.com/window-ac-warranty-waipahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Window AC Warranty Waipahu Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Warranty & Local Support Waipahu | Affordable Home A/C',
        description: 'Local Oahu warranty support for LG Dual Inverter window air conditioners. 1-year manufacturer warranty backed by our central Waipahu bench-testing facility and licensed technicians.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const warrantyFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What warranty comes with LG Dual Inverter window air conditioners?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Every new LG Dual Inverter window AC purchased from Affordable Home A/C includes a 1-year limited manufacturer warranty on parts and labor, plus an extended limited warranty on the Dual Inverter compressor component."
            }
        },
        {
            "@type": "Question",
            "name": "Do I have to ship my broken unit to the mainland for warranty service?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No! Unlike buying online from mainland websites where returns and warranty claims require expensive ocean freight shipping, Affordable Home A/C provides local diagnostic support and bench-testing right here at our Waipahu facility (94-150 Leoleo St #203)."
            }
        },
        {
            "@type": "Question",
            "name": "What happens if my unit needs service during the warranty period?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply call our Waipahu office at (808) 488-1111 with your purchase receipt. Our licensed HVAC technicians can diagnose issues on-site or at our facility using authentic manufacturer replacement parts."
            }
        }
    ]
};

export default function WindowAcWarrantyLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(warrantyFaqSchema) }}
            />
            {children}
        </>
    );
}
