import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Black Mold in AC: Health Risks & Removal in Hawaii | Affordable Home A/C'
    },
    description: 'Protect your family from black mold blowing out of your air conditioner in Hawaii. Understand health hazards, respiratory risks, and clinical AC teardown sanitization. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/black-mold-in-ac-health-risks-hawaii',
    },
    openGraph: {
        title: 'Black Mold in AC: Health Risks & Removal in Hawaii | Affordable Home A/C',
        description: 'Protect your family from black mold blowing out of your air conditioner in Hawaii. Understand health hazards, respiratory risks, and clinical AC teardown sanitization. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/black-mold-in-ac-health-risks-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Black Mold in AC Health Risks Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Black Mold in AC: Health Risks & Removal in Hawaii | Affordable Home A/C',
        description: 'Protect your family from black mold blowing out of your air conditioner in Hawaii. Understand health hazards, respiratory risks, and clinical AC teardown sanitization. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const blackMoldFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What are the health risks of black mold inside an air conditioner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "When mold colonies establish inside your AC blower wheel, mycotoxins and millions of microscopic spores are propelled into the room. This can cause persistent coughing, wheezing, watery eyes, sinus infections, chronic fatigue, and severe asthma attacks in sensitive individuals."
            }
        },
        {
            "@type": "Question",
            "name": "How do I know if black spots on my AC vents are toxic black mold?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Common HVAC molds in Oahu include Cladosporium, Penicillium, and Aspergillus. All mold types present respiratory hazards when distributed through an airstream. If you see black, fuzzy, or speckled residue along the louvers or behind the directional flaps, immediate teardown cleaning is advised."
            }
        },
        {
            "@type": "Question",
            "name": "Does standard filter cleaning remove black mold?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Mesh filters capture larger lint and hair particles, but mold thrives behind the filter on the cold aluminum coil fins, inside the condensate pan, and deep within the cylindrical fan wheel blades. Cleaning the filters alone leaves 90% of the mold undisturbed."
            }
        }
    ]
};

export default function BlackMoldAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blackMoldFaqSchema) }}
            />
            {children}
        </>
    );
}
