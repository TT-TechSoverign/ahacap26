import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Air Filter Cleaning & Replacement Hawaii | Washable Filter Care | Affordable Home A/C'
    },
    description: 'Learn how to clean and replace air filters in Hawaii homes. Protect against vog, red dirt, and pet dander while maintaining max cooling CFM. CT-36775 licensed.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/clean-air-filter-replacement-hawaii',
    },
    openGraph: {
        title: 'AC Air Filter Cleaning & Replacement Hawaii | Washable Filter Care | Affordable Home A/C',
        description: 'Learn how to clean and replace air filters in Hawaii homes. Protect against vog, red dirt, and pet dander while maintaining max cooling CFM. CT-36775 licensed.',
        url: 'https://www.affordablehome-ac.com/clean-air-filter-replacement-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Clean Air Filter Replacement Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Air Filter Cleaning & Replacement Hawaii | Washable Filter Care | Affordable Home A/C',
        description: 'Learn how to clean and replace air filters in Hawaii homes. Protect against vog, red dirt, and pet dander while maintaining max cooling CFM. CT-36775 licensed.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const filterCareFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How often should I clean my mini split or window AC filters in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Hawaii, washable mesh filters should be rinsed every 2 to 4 weeks. If you live in an area prone to volcanic haze (vog), open windows frequently near red dirt, or have indoor pets, bi-weekly washing is recommended to maintain airflow."
            }
        },
        {
            "@type": "Question",
            "name": "How do I properly wash a reusable mini split screen filter?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Unlatch the front panel, slide the mesh screens out, and rinse them with lukewarm water from the back side forward so dust washes away from the mesh. Allow them to dry 100% in the shade before sliding back in to prevent mildew."
            }
        },
        {
            "@type": "Question",
            "name": "When should an AC filter be completely replaced rather than cleaned?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Reusable filters should be replaced if the plastic frame is cracked, if tears or holes have formed in the nylon mesh, or if specialized enzyme/catechin deodorant inserts have exceeded their 12-month service lifespan."
            }
        }
    ]
};

export default function AirFilterCareLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(filterCareFaqSchema) }}
            />
            {children}
        </>
    );
}
