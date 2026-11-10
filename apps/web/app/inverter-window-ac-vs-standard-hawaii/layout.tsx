import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'LG Dual Inverter vs Standard Window AC Hawaii | Save $424/yr on HECO + $45 Rebate'
    },
    description: 'Compare 44dB LG Dual Inverter & GE R-32 Inverter Window ACs vs standard units in Hawaii. Save 40% on HECO bills + claim a $45 Rebate in Waipahu • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/inverter-window-ac-vs-standard-hawaii',
    },
    openGraph: {
        title: 'LG Dual Inverter vs Standard Window AC Hawaii | Save $424/yr on HECO + $45 Rebate',
        description: 'Compare 44dB LG Dual Inverter & GE R-32 Inverter Window ACs vs standard units in Hawaii. Save 40% on HECO bills + claim a $45 Rebate in Waipahu • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/inverter-window-ac-vs-standard-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Dual Inverter vs Standard Window AC Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LG Dual Inverter vs Standard Window AC Hawaii | Save $424/yr on HECO + $45 Rebate',
        description: 'Compare 44dB LG Dual Inverter & GE R-32 Inverter Window ACs vs standard units in Hawaii. Save 40% on HECO bills + claim a $45 Rebate in Waipahu • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const inverterVsStandardFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does an inverter window AC differ from a traditional window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A standard AC compressor operates at only one speed: 100% full blast or completely OFF. When your room warms up, it turns on with a loud clunk, overcools, and shuts down. A Dual Inverter compressor uses variable-speed twin rotaries that continuously modulate speed from 20% to 100%, maintaining a perfectly constant room temperature while consuming far less electricity."
            }
        },
        {
            "@type": "Question",
            "name": "Is an inverter window AC really worth the higher upfront price in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, absolutely. Because Hawaii has the highest electricity rates in the nation (~44.2¢/kWh), the 35% to 40% energy reduction of an inverter window AC saves \$25 to \$60 every single month. In just 6 to 9 months of island operation, the energy savings completely offset the price difference."
            }
        },
        {
            "@type": "Question",
            "name": "How much quieter is a Dual Inverter window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Standard window ACs typically produce 55 to 60 dB of noise, similar to a loud conversation or dishwasher. LG Dual Inverter & GE units run at just 44 dB in sleep mode—quieter than a library whisper—and eliminate the loud mechanical kick every time the compressor cycles."
            }
        }
    ]
};

export default function InverterVsStandardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(inverterVsStandardFaqSchema) }}
            />
            {children}
        </>
    );
}
