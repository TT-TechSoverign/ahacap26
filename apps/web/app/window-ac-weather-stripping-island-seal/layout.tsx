import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Weather Stripping & Island Seal Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Prevent cool air loss, trade wind drafts, driving rain, and island insects with professional LG & GE window AC.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-weather-stripping-island-seal',
    },
    openGraph: {
        title: 'Window AC Weather Stripping & Island Seal Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Prevent cool air loss, trade wind drafts, driving rain, and island insects with professional LG & GE window AC.',
        url: 'https://www.affordablehome-ac.com/window-ac-weather-stripping-island-seal',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Weather Stripping Island Seal Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Weather Stripping & Island Seal Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: 'Prevent cool air loss, trade wind drafts, driving rain, and island insects with professional window AC weather stripping and perimeter sealing on Oahu.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const weatherSealFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is proper weather sealing critical for window ACs in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Unsealed window gaps allow chilled air to escape and hot humid trade winds to blow in, forcing your AC to run continuously and driving up your HECO bill. Gaps also invite geckos, ants, and flying insects inside."
            }
        },
        {
            "@type": "Question",
            "name": "What materials do you use to seal around the window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We use high-density closed-cell marine-grade weather stripping foam, UV-resistant vinyl gaskets, and rigid insulated side panels rather than cheap open-cell sponge foam that degrades under tropical sunlight."
            }
        },
        {
            "@type": "Question",
            "name": "Does weather stripping prevent rainwater from leaking inside during storms?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Our technicians install compression gaskets along top and bottom sashes and verify proper 1/4-inch backward pitch so wind-driven tropical rains drain safely outside away from your interior sills."
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
            "name": "Window AC Installation",
            "item": "https://www.affordablehome-ac.com/window-ac-installation"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Marine-Grade Window AC Weather Stripping",
            "item": "https://www.affordablehome-ac.com/window-ac-weather-stripping-island-seal"
        }
    ]
};

export default function WeatherSealAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(weatherSealFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
