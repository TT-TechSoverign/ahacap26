import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'ENERGY STAR Window ACs Hawaii ($560+ In-Stock) | Cut HECO Bills 40% + $45 Rebate'
    },
    description: 'Save up to 40% ($424/yr) on Oahu HECO bills with in-stock ENERGY STAR LG Dual Inverter & GE R-32 Window ACs. Includes $45 Hawaii Energy Rebate • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/energy-star-window-air-conditioners-hawaii',
    },
    openGraph: {
        title: 'ENERGY STAR Window ACs Hawaii ($560+ In-Stock) | Cut HECO Bills 40% + $45 Rebate',
        description: 'Save up to 40% ($424/yr) on Oahu HECO bills with in-stock ENERGY STAR LG Dual Inverter & GE R-32 Window ACs. Includes $45 Hawaii Energy Rebate • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/energy-star-window-air-conditioners-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Energy Star Window Air Conditioners Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'ENERGY STAR Window ACs Hawaii ($560+ In-Stock) | Cut HECO Bills 40% + $45 Rebate',
        description: 'Save up to 40% ($424/yr) on Oahu HECO bills with in-stock ENERGY STAR LG Dual Inverter & GE R-32 Window ACs. Includes $45 Hawaii Energy Rebate • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
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
            "name": "Oahu Window AC Shop",
            "item": "https://www.affordablehome-ac.com/shop"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "ENERGY STAR Window Air Conditioners",
            "item": "https://www.affordablehome-ac.com/energy-star-window-air-conditioners-hawaii"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
