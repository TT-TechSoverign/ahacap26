import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Pet Hair & Dander Window AC Cleaning Oahu | Affordable Home A/C'
    },
    description: 'Eradicate embedded pet hair, feline dander, and animal odors from your window AC in Oahu. Filter sanitization, coil wash, and LG Dual Inverter upgrades. Local Waipahu specialists.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/pet-hair-dander-ac-cleaning-oahu',
    },
    openGraph: {
        title: 'Pet Hair & Dander Window AC Cleaning Oahu | Affordable Home A/C',
        description: 'Eradicate embedded pet hair, feline dander, and animal odors from your window AC in Oahu. Filter sanitization, coil wash, and LG Dual Inverter upgrades. Local Waipahu specialists.',
        url: 'https://www.affordablehome-ac.com/pet-hair-dander-ac-cleaning-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Pet Hair Dander AC Cleaning Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Pet Hair & Dander Window AC Cleaning Oahu | Affordable Home A/C',
        description: 'Eradicate embedded pet hair, feline dander, and animal odors from your window AC in Oahu. Filter sanitization, coil wash, and LG Dual Inverter upgrades. Local Waipahu specialists.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const petHairFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does pet hair damage an air conditioner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Microscopic dog and cat hair slips past coarse mesh filters and sticks to the wet evaporator coils. Mixed with dust and moisture, it forms a dense, felt-like blanket that insulates the aluminum fins, restricts airflow, and creates a breeding ground for foul pet-odor bacteria."
            }
        },
        {
            "@type": "Question",
            "name": "Why doesn't vacuuming the filter get rid of the dog or cat smell?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The pet smell originates from animal dander and dried oils that have bonded deep within the cooling fins and on the cylindrical blower fan wheel. Surface vacuuming only clears loose hair on the outer screen, leaving 90% of the odor source inside the machine."
            }
        },
        {
            "@type": "Question",
            "name": "What cleaning service is recommended for homes with multiple pets?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For window units impacted by heavy pet dander, we recommend bi-weekly washable filter rinsing, periodic surface coil sanitization with floor drop cloth protection, or upgrading older units to an energy-efficient new LG Dual Inverter or GE Built-In unit."
            }
        }
    ]
};

export default function PetHairCleaningLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(petHairFaqSchema) }}
            />
            {children}
        </>
    );
}
