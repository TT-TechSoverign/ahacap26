import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC vs Mini Split Oahu | Cost, Efficiency & Sizing Guide | Affordable Home A/C'
    },
    description: 'Compare window ACs vs ductless mini splits for Oahu homes. Upfront equipment costs, HECO 44.2¢/kWh power consumption, and installation requirements compared by licensed contractors CT-36775.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-vs-mini-split-oahu',
    },
    openGraph: {
        title: 'Window AC vs Mini Split Oahu | Cost, Efficiency & Sizing Guide | Affordable Home A/C',
        description: 'Compare window ACs vs ductless mini splits for Oahu homes. Upfront equipment costs, HECO 44.2¢/kWh power consumption, and installation requirements compared by licensed contractors CT-36775.',
        url: 'https://www.affordablehome-ac.com/window-ac-vs-mini-split-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Window AC vs Mini Split Cost Comparison Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC vs Mini Split Oahu | Cost, Efficiency & Sizing Guide | Affordable Home A/C',
        description: 'Compare window ACs vs ductless mini splits for Oahu homes. Upfront equipment costs, HECO 44.2¢/kWh power consumption, and installation requirements compared by licensed contractors CT-36775.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
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
            "name": "Window AC vs Mini Split",
            "item": "https://www.affordablehome-ac.com/window-ac-vs-mini-split-oahu"
        }
    ]
};

const comparisonFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Which is cheaper: a window AC or a ductless mini split on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Window ACs are substantially cheaper upfront: an in-stock LG Dual Inverter costs $504–$1,025 with $0-deposit installation options. Ductless mini-splits typically range from $3,800 to $5,500+ per zone installed. Dual Inverters close the operating efficiency gap by using variable-speed inverter compressors."
            }
        },
        {
            "@type": "Question",
            "name": "Do window ACs use more electricity than mini splits?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Traditional single-speed window ACs consume 30-40% more electricity. However, modern LG Dual Inverter window ACs utilize variable-speed technology that operates at near mini-split efficiency (~$38-$55/mo at HECO's ~44.2¢/kWh rate)."
            }
        },
        {
            "@type": "Question",
            "name": "When does a ductless mini split make more sense than a window unit?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Mini splits are ideal when you want ultra-whisper quiet operation (19 dB vs 44 dB), need to cool multiple rooms with one outdoor unit, or have rooms with no suitable windows (or HOA facade restrictions)."
            }
        }
    ]
};

export default function WindowAcVsMiniSplitLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(comparisonFaqSchema) }}
            />
            {children}
        </>
    );
}
