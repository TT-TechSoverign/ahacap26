import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Coil Cleaning Benefits: Lower Your HECO Power Bill | Affordable Home A/C'
    },
    description: 'Learn how dirty evaporator and condenser coils spike Hawaii electricity bills at HECO ~44.2¢/kWh rates. Clinical coil cleaning saves $40–$90/month. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-coil-cleaning-benefits-power-bill',
    },
    openGraph: {
        title: 'AC Coil Cleaning Benefits: Lower Your HECO Power Bill | Affordable Home A/C',
        description: 'Learn how dirty evaporator and condenser coils spike Hawaii electricity bills at HECO ~44.2¢/kWh rates. Clinical coil cleaning saves $40–$90/month. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/ac-coil-cleaning-benefits-power-bill',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Coil Cleaning HECO Power Bill Savings Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Coil Cleaning Benefits: Lower Your HECO Power Bill | Affordable Home A/C',
        description: 'Learn how dirty evaporator and condenser coils spike Hawaii electricity bills at HECO ~44.2¢/kWh rates. Clinical coil cleaning saves $40–$90/month. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const coilCleaningFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does a dirty AC coil increase my electric bill in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Dirt, lint, and fungal biofilm act as an insulating blanket on aluminum cooling fins. This prevents heat absorption indoors and heat rejection outdoors, forcing your compressor to draw higher amperage and run up to 40% longer. At Hawaiian Electric's ~44.2¢/kWh rate, this adds up rapidly."
            }
        },
        {
            "@type": "Question",
            "name": "How much money can I actually save each month by cleaning my coils?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For a typical 12,000 BTU unit running 8 hours a day, restoring clean coil heat transfer typically saves 2 to 3 kWh per day—translating to roughly $30 to $45 in monthly savings per air handler. In multi-split households, savings often exceed $100 per month."
            }
        },
        {
            "@type": "Question",
            "name": "Can I just vacuum the front of the coils myself?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Gentle surface brushing helps remove coarse lint, but microscopic grime, salt crystals, and mold cling deep inside the 14-to-18 fins-per-inch matrix. Commercial foaming chemical cleaners and precision pressure rinsing are required to penetrate the full coil depth."
            }
        }
    ]
};

export default function CoilCleaningPowerBillLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(coilCleaningFaqSchema) }}
            />
            {children}
        </>
    );
}
