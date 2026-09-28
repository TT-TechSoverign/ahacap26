import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Energy Star Window Air Conditioners Hawaii | Cut HECO Bills | Affordable Home A/C'
    },
    description: 'Save hundreds on Oahu electric bills with Energy Star certified LG Dual Inverter window air conditioners. High CEER ratings, official $45 Hawaii Energy cash rebate, in stock in Waipahu.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/energy-star-window-air-conditioners-hawaii',
    },
    openGraph: {
        title: 'Energy Star Window Air Conditioners Hawaii | Cut HECO Bills | Affordable Home A/C',
        description: 'Save hundreds on Oahu electric bills with Energy Star certified LG Dual Inverter window air conditioners. High CEER ratings, official $45 Hawaii Energy cash rebate, in stock in Waipahu.',
        url: 'https://www.affordablehome-ac.com/energy-star-window-air-conditioners-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Energy Star Window Air Conditioners Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Energy Star Window Air Conditioners Hawaii | Cut HECO Bills | Affordable Home A/C',
        description: 'Save hundreds on Oahu electric bills with Energy Star certified LG Dual Inverter window air conditioners. High CEER ratings, official $45 Hawaii Energy cash rebate, in stock in Waipahu.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const energyStarFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much electricity does an Energy Star window AC save in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Because Hawaiian Electric (HECO) residential electricity rates average around 44.2¢ per kilowatt-hour, an Energy Star certified Dual Inverter window AC uses up to 35% to 40% less energy than standard models, saving $25 to $60 every month per unit."
            }
        },
        {
            "@type": "Question",
            "name": "What is CEER rating and why does it matter on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "CEER stands for Combined Energy Efficiency Ratio. Unlike older EER ratings, CEER measures energy use both while cooling and while in standby/off mode. High CEER ratings (14.5 to 15.0+) ensure your unit isn't bleeding phantom power while idle."
            }
        },
        {
            "@type": "Question",
            "name": "How do I claim the $45 Hawaii Energy cash rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "When you purchase an eligible Energy Star window AC from Affordable Home AC, we provide the pre-approved Hawaii Energy application form PDF. Simply attach your itemized receipt and submit online or by mail for your $45 cash rebate check."
            }
        }
    ]
};

export default function EnergyStarAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(energyStarFaqSchema) }}
            />
            {children}
        </>
    );
}
