import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Burning Electrical Smell Oahu? Emergency Shutoff & Repair | Affordable Home A/C'
    },
    description: 'Smell burning plastic, fishy odor, or electrical smoke from your AC vents? Follow immediate breaker shutoff safety steps and get emergency diagnostics in Oahu. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-burning-electrical-smell-oahu',
    },
    openGraph: {
        title: 'AC Burning Electrical Smell Oahu? Emergency Shutoff & Repair | Affordable Home A/C',
        description: 'Smell burning plastic, fishy odor, or electrical smoke from your AC vents? Follow immediate breaker shutoff safety steps and get emergency diagnostics in Oahu. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/ac-burning-electrical-smell-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Burning Electrical Smell Oahu Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Burning Electrical Smell Oahu? Emergency Shutoff & Repair | Affordable Home A/C',
        description: 'Smell burning plastic, fishy odor, or electrical smoke from your AC vents? Follow immediate breaker shutoff safety steps and get emergency diagnostics in Oahu. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const burningSmellFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What should I do immediately if I smell burning electrical plastic from my AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Immediately shut off the air conditioner at the remote or thermostat, and go straight to your main electrical panel to switch the 240V AC breaker completely OFF. Do not leave the system energized, as overheating wires can ignite surrounding building materials."
            }
        },
        {
            "@type": "Question",
            "name": "What causes an air conditioner to produce a burning electrical odor?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The most frequent causes are high-resistance electrical connections where terminal screws have loosened, causing wire insulation to melt; an overheating blower fan motor with seized bearings; or a ruptured capacitor leaking hot dielectric fluid."
            }
        },
        {
            "@type": "Question",
            "name": "Why does a burning electrical issue sometimes smell like dead fish?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "When the plastic and resin binders in electrical circuit breakers, contactors, or terminal blocks overheat, they release pungent amine compounds that produce a strong, unmistakable fish-like chemical odor."
            }
        }
    ]
};

export default function AcBurningSmellLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(burningSmellFaqSchema) }}
            />
            {children}
        </>
    );
}
