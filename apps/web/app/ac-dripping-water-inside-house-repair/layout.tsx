import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Dripping Water Inside House Repair Oahu | Drain Clearing | Affordable Home A/C'
    },
    description: 'Is your AC leaking water inside your home on Oahu? Stop drywall damage immediately. Expert algae drain line clearing, pan repair, and leveling by licensed CT-36775 contractors. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-dripping-water-inside-house-repair',
    },
    openGraph: {
        title: 'AC Dripping Water Inside House Repair Oahu | Drain Clearing | Affordable Home A/C',
        description: 'Is your AC leaking water inside your home on Oahu? Stop drywall damage immediately. Expert algae drain line clearing, pan repair, and leveling by licensed CT-36775 contractors. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/ac-dripping-water-inside-house-repair',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'AC Dripping Water Inside House Repair Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Dripping Water Inside House Repair Oahu | Drain Clearing | Affordable Home A/C',
        description: 'Is your AC leaking water inside your home on Oahu? Stop drywall damage immediately. Expert algae drain line clearing, pan repair, and leveling by licensed CT-36775 contractors. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const drippingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is water dripping from my mini split or window AC inside my house?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Hawaii's humid climate, air conditioners pull gallons of water from the air each day. The most common cause of indoor water leaks is a clogged condensate drain line choked with algae slime. Other common causes include an unlevel mounting bracket, a cracked drain pan, or frozen evaporator coils that melt faster than the pan can drain."
            }
        },
        {
            "@type": "Question",
            "name": "How does Affordable Home AC fix indoor AC leaks?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our licensed technicians inspect the condensate drain pan, flush and clear the gravity drain line using vacuum extraction and dedicated line flushing, verify the mounting pitch with a digital level, and apply antimicrobial pan treatments to prevent future algae clogs."
            }
        }
    ]
};

export default function AcDrippingWaterLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(drippingFaqSchema) }}
            />
            {children}
        </>
    );
}
