import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Smells Musty in Hawaii? Deep Mold Cleaning ($0 Estimate) | (808) 488-1111'
    },
    description: '$0 Free Estimate • (808) 488-1111. Eliminate musty mildew & dirty sock odors from your Oahu Window AC with deep evaporator coil & blower wheel sanitization.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-smells-musty-mildew-hawaii',
    },
    openGraph: {
        title: 'Window AC Smells Musty in Hawaii? Deep Mold Cleaning ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Eliminate musty mildew & dirty sock odors from your Oahu Window AC with deep evaporator coil & blower wheel sanitization.',
        url: 'https://www.affordablehome-ac.com/ac-smells-musty-mildew-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Smells Musty Mildew Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Smells Musty in Hawaii? Deep Mold Cleaning ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Eliminate musty mildew & dirty sock odors from your Oahu Window AC with deep evaporator coil & blower wheel sanitization.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
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

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://www.affordablehome-ac.com"
        },
        {
            "@type": "ListItem",
            "position": 2,
            "name": "Window AC Cleaning",
            "item": "https://www.affordablehome-ac.com/ac-cleaning-oahu"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Musty Window AC Odor Elimination",
            "item": "https://www.affordablehome-ac.com/ac-smells-musty-mildew-hawaii"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
