import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Salt Corrosion & Coil Rinse Hawaii | Marine AC Protection | Affordable Home A/C'
    },
    description: 'Neutralize aggressive marine salt air and prevent coil corrosion in coastal Oahu homes. Professional low-pressure coil rinse and corrosion defense. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/salt-corrosion-coil-rinse-hawaii',
    },
    openGraph: {
        title: 'Salt Corrosion & Coil Rinse Hawaii | Marine AC Protection | Affordable Home A/C',
        description: 'Neutralize aggressive marine salt air and prevent coil corrosion in coastal Oahu homes. Professional low-pressure coil rinse and corrosion defense. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/salt-corrosion-coil-rinse-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Salt Corrosion Coil Rinse Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Salt Corrosion & Coil Rinse Hawaii | Marine AC Protection | Affordable Home A/C',
        description: 'Neutralize aggressive marine salt air and prevent coil corrosion in coastal Oahu homes. Professional low-pressure coil rinse and corrosion defense. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const saltCorrosionFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does ocean salt air damage air conditioners in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Airborne sodium chloride from ocean spray deposits on outdoor condenser coils. Moisture in our humid air creates an electrolyte solution that triggers galvanic corrosion between copper tubes and aluminum fins. This eats away heat-transfer surfaces and causes pinhole refrigerant leaks."
            }
        },
        {
            "@type": "Question",
            "name": "Can I spray my outdoor condenser unit with a regular garden hose?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A gentle, low-pressure fresh water spray directly downward through the rear fins every 2 to 4 weeks helps rinse loose salt deposits. Never use high-pressure nozzles, which bend the razor-thin aluminum fins and permanently restrict airflow."
            }
        },
        {
            "@type": "Question",
            "name": "What is the difference between Blue Fin / Gold Fin and standard coils?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Blue Fin and Gold Fin refer to hydrophilic epoxy coatings applied at the factory to aluminum fins. They repel water and salt adhesion, extending coil lifespan in marine environments like Kailua, Hawaii Kai, and Ewa Beach by up to 2-3 times longer than uncoated coils."
            }
        }
    ]
};

export default function SaltCorrosionLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(saltCorrosionFaqSchema) }}
            />
            {children}
        </>
    );
}
