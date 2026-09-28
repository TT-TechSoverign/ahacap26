import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Smells Musty & Mildew in Hawaii | Dirty Sock Syndrome Solved | Affordable Home A/C'
    },
    description: 'Why does your Hawaii AC smell musty like dirty socks or mildew? Discover causes of bacteria and mold buildup in coils and drain pans, and get clinical chemical sanitization. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-smells-musty-mildew-hawaii',
    },
    openGraph: {
        title: 'AC Smells Musty & Mildew in Hawaii | Dirty Sock Syndrome Solved | Affordable Home A/C',
        description: 'Why does your Hawaii AC smell musty like dirty socks or mildew? Discover causes of bacteria and mold buildup in coils and drain pans, and get clinical chemical sanitization. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/ac-smells-musty-mildew-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Smells Musty Mildew Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Smells Musty & Mildew in Hawaii | Dirty Sock Syndrome Solved | Affordable Home A/C',
        description: 'Why does your Hawaii AC smell musty like dirty socks or mildew? Discover causes of bacteria and mold buildup in coils and drain pans, and get clinical chemical sanitization. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const mustyAcFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why does my air conditioner smell like dirty socks or sour mildew?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Known in the HVAC industry as 'Dirty Sock Syndrome,' this pungent odor is caused by bacterial colonies and mold spores decaying on the damp cooling coils and in stagnant drain pan water. Hawaii's persistent high humidity accelerates this microbial growth."
            }
        },
        {
            "@type": "Question",
            "name": "Will spraying air freshener or disinfectant spray into the vents fix the smell?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Spraying household aerosol fresheners only masks the odor for hours while leaving the sticky bacterial biofilm intact on the aluminum fins. In fact, many household sprays can corrode sensitive evaporator coils."
            }
        },
        {
            "@type": "Question",
            "name": "How does Affordable Home A/C eradicate musty AC odors permanently?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We apply foaming alkaline coil detergents that dissolve biofilm down to bare aluminum, pressure flush stagnant condensate pans, treat drain lines with antimicrobial agents, and scrub the blower fan assembly where mold spores cling."
            }
        }
    ]
};

export default function AcSmellsMustyLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(mustyAcFaqSchema) }}
            />
            {children}
        </>
    );
}
