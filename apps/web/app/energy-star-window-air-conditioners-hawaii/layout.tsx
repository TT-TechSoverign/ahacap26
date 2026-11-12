import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'ENERGY STAR Window ACs Oahu ($560+) | Save 40% + $45 Rebate'
    },
    description: 'Save up to 40% ($424/yr) on Oahu HECO bills with in-stock ENERGY STAR LG Dual Inverter & GE R-32 Window ACs. Includes $45 Hawaii Energy Rebate • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/energy-star-window-air-conditioners-hawaii',
    },
    openGraph: {
        title: 'ENERGY STAR Window ACs Oahu ($560+) | Save 40% + $45 Rebate',
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
        title: 'ENERGY STAR Window ACs Oahu ($560+) | Save 40% + $45 Rebate',
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

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/energy-star-window-air-conditioners-hawaii#collection",
            "url": "https://www.affordablehome-ac.com/energy-star-window-air-conditioners-hawaii",
            "name": "ENERGY STAR Certified Window Air Conditioners Hawaii ($560–$1,200 + $45 Rebate)",
            "description": "High-CEER ENERGY STAR LG Dual Inverter and GE Variable-Speed R-32 Inverter Window ACs eligible for the $45 Hawaii Energy rebate and saving up to 40% on HECO bills.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "ENERGY STAR Certified Window Air Conditioners Hawaii ($560–$1,200 + $45 Rebate) — Canonical Waipahu Models",
                "numberOfItems": 8,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "LG Dual Inverter 6,000 BTU (LW6023IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/1-lg-dual-inverter-6-000-btu-lw6023ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "LG Dual Inverter 8,000 BTU (LW8022IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/2-lg-dual-inverter-8-000-btu-lw8022ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "LG Dual Inverter 10,000 BTU (LW1022IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/3-lg-dual-inverter-10-000-btu-lw1022ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "LG Dual Inverter 12,000 BTU (LW1222IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "name": "LG Dual Inverter 14,000 BTU (LW1522FVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 6,
                        "name": "LG Dual Inverter 18,000 BTU (LW1822IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/6-lg-dual-inverter-18-000-btu-lw1822ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 7,
                        "name": "LG Dual Inverter 23,500 BTU (LW2422IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/7-lg-dual-inverter-23-500-btu-lw2422ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 8,
                        "name": "GE 12,000 BTU R-32 Inverter 26\" Built-In (AJCQ12AXXWA)",
                        "url": "https://www.affordablehome-ac.com/shop/15-ge-12-000-btu-ajcq12axxwa"
                    }
                ]
            }
        },
        {
            "@type": "HVACBusiness",
            "@id": "https://www.affordablehome-ac.com/energy-star-window-air-conditioners-hawaii#localbusiness",
            "parentOrganization": {
                "@id": "https://www.affordablehome-ac.com/#hvacbusiness"
            },
            "name": "Affordable Home A/C",
            "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
            "url": "https://www.affordablehome-ac.com",
            "telephone": "+1-808-488-1111",
            "priceRange": "$395 - $1,200",
            "slogan": "Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "94-150 Leoleo St. #203",
                "addressLocality": "Waipahu",
                "addressRegion": "HI",
                "postalCode": "96797",
                "addressCountry": "US"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "142",
                "bestRating": "5",
                "worstRating": "1"
            }
        }
    ]
};

export default function EnergyStarAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(energyStarFaqSchema).replace(/</g, '\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pass5RichSchema).replace(/</g, '\u003c') }}
            />
            {children}
        </>
    );
}
