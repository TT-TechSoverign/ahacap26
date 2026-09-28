import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Condensation Drain Routing Condos Oahu | Stop Lanai Dripping | Affordable Home A/C'
    },
    description: 'Prevent window AC condensation from dripping on downstairs neighbor lanais and walkways in Oahu condos. Custom drain kits, UV-resistant tubing, CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-condensation-drain-routing-condos',
    },
    openGraph: {
        title: 'AC Condensation Drain Routing Condos Oahu | Stop Lanai Dripping | Affordable Home A/C',
        description: 'Prevent window AC condensation from dripping on downstairs neighbor lanais and walkways in Oahu condos. Custom drain kits, UV-resistant tubing, CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/ac-condensation-drain-routing-condos',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Condensation Drain Routing Condos Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Condensation Drain Routing Condos Oahu | Stop Lanai Dripping | Affordable Home A/C',
        description: 'Prevent window AC condensation from dripping on downstairs neighbor lanais and walkways in Oahu condos. Custom drain kits, UV-resistant tubing, CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const condensationDrainFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is AC condensation drainage a serious issue in Oahu condos?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "During humid Hawaiian summers, a single window AC can extract 2 to 5 gallons of water daily from indoor air. If left to drip freely, water falls onto downstairs neighbors' balconies, patio furniture, or public building walkways, triggering immediate HOA citations and neighbor disputes."
            }
        },
        {
            "@type": "Question",
            "name": "How does professional condensation drain routing work?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians install a sealed drain pan adapter nozzle on the base of your window AC and connect reinforced, UV-resistant vinyl tubing. We route the hose cleanly along the wall or railing to a dedicated lanai floor drain, drainage scupper, or discrete collection container."
            }
        },
        {
            "@type": "Question",
            "name": "Does drain routing affect cooling efficiency?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Modern window ACs are engineered with dual drain ports or sling fans. Our technicians install drain kits in compliance with factory guidelines to ensure smooth water evacuation without hindering condenser coil heat dissipation."
            }
        }
    ]
};

export default function CondensationDrainAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(condensationDrainFaqSchema) }}
            />
            {children}
        </>
    );
}
