import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Premium Mini Split Deep Cleaning Oahu | $275 Full Teardown | Affordable Home A/C'
    },
    description: 'Clinical $275 premium mini split deep cleaning on Oahu. Complete casing disassembly, blower wheel extraction, coil pressure wash, and drop-cloth protection. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/premium-mini-split-deep-cleaning-oahu',
    },
    openGraph: {
        title: 'Premium Mini Split Deep Cleaning Oahu | $275 Full Teardown | Affordable Home A/C',
        description: 'Clinical $275 premium mini split deep cleaning on Oahu. Complete casing disassembly, blower wheel extraction, coil pressure wash, and drop-cloth protection. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/premium-mini-split-deep-cleaning-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Premium Mini Split Deep Cleaning Full Teardown Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Premium Mini Split Deep Cleaning Oahu | $275 Full Teardown | Affordable Home A/C',
        description: 'Clinical $275 premium mini split deep cleaning on Oahu. Complete casing disassembly, blower wheel extraction, coil pressure wash, and drop-cloth protection. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const premiumCleaningFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is included in the $275 Premium Deep Cleaning Teardown?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our $275 Premium Deep Cleaning includes complete removal of the outer plastic shroud, louvers, and condensate drain pan, detachment of the cylindrical blower fan wheel for 360-degree degreasing, high-pressure antimicrobial coil wash, drain line vacuum flush, and reassembly by a licensed CT-36775 technician."
            }
        },
        {
            "@type": "Question",
            "name": "How does Premium compare to the $175 Basic Mini Split Cleaning?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The $175 Basic Cleaning focuses on routine surface sanitation of accessible coils, filter washing, and gravity drain flush without dismantling the fan motor assembly. The $275 Premium Teardown pulls the blower wheel and drain pan out completely, eradicating the deep mold colonies that cause musty odors and black specks."
            }
        },
        {
            "@type": "Question",
            "name": "How do you protect my home during the deep wash?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Technicians lay protective floor drop cloths directly under the indoor unit. Precision rinse containment systems capture all wash water, mold slurry, and chemical runoff directly into closed disposal buckets. Your drywall, trim, and flooring remain 100% dry and clean."
            }
        }
    ]
};

export default function PremiumMiniSplitCleaningLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(premiumCleaningFaqSchema) }}
            />
            {children}
        </>
    );
}
