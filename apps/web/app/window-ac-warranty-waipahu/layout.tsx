import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Warranty & Local Support Waipahu ($395+ In-Stock) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Local Oahu warranty support for LG Dual Inverter & GE Built-In window air conditioners. 1-year manufacturer.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-warranty-waipahu',
    },
    openGraph: {
        title: 'Window AC Warranty & Local Support Waipahu ($395+ In-Stock) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Local Oahu warranty support for LG Dual Inverter & GE Built-In window air conditioners. 1-year manufacturer.',
        url: 'https://www.affordablehome-ac.com/window-ac-warranty-waipahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Warranty Waipahu Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Warranty & Local Support Waipahu ($395+ In-Stock) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Local Oahu warranty support for LG Dual Inverter & GE Built-In window air conditioners. 1-year manufacturer.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const warrantyFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What warranty comes with LG Dual Inverter & GE Built-In window air conditioners?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Every new LG Dual Inverter & GE window AC purchased from Affordable Home A/C includes a 1-year limited manufacturer warranty on parts and labor, plus an extended limited warranty on the Dual Inverter compressor component."
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
                "text": "Simply call our Waipahu office at (808) 488-1111 with your purchase receipt. Our Oahu cooling technicians can diagnose issues on-site or at our facility using authentic manufacturer replacement parts."
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
