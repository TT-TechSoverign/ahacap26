import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Smart Wi-Fi Window ACs Oahu ($560+ In-Stock) | LG ThinQ & GE SmartHQ'
    },
    description: 'In-Stock Smart Wi-Fi LG ThinQ Dual Inverter & GE SmartHQ Window ACs ($560–$1,200) in Waipahu, Oahu. Phone app control, $45 Rebate & $50 delivery • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/smart-wifi-window-ac-oahu',
    },
    openGraph: {
        title: 'Smart Wi-Fi Window ACs Oahu ($560+ In-Stock) | LG ThinQ & GE SmartHQ',
        description: 'In-Stock Smart Wi-Fi LG ThinQ Dual Inverter & GE SmartHQ Window ACs ($560–$1,200) in Waipahu, Oahu. Phone app control, $45 Rebate & $50 delivery • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/smart-wifi-window-ac-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Smart WiFi Window AC Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Smart Wi-Fi Window ACs Oahu ($560+ In-Stock) | LG ThinQ & GE SmartHQ',
        description: 'In-Stock Smart Wi-Fi LG ThinQ Dual Inverter & GE SmartHQ Window ACs ($560–$1,200) in Waipahu, Oahu. Phone app control, $45 Rebate & $50 delivery • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const smartWifiFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does Wi-Fi smartphone control work on a window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "LG Dual Inverter smart models connect directly to your home's 2.4 GHz Wi-Fi network. Using the free LG ThinQ mobile app on iOS or Android, you can power your unit on, adjust temperatures, change fan speeds, and set timers from anywhere on Oahu or across the world."
            }
        },
        {
            "@type": "Question",
            "name": "Can I connect the smart window AC to Google Assistant or Amazon Alexa?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! LG ThinQ integrates with Google Assistant and Amazon Alexa, allowing you to control your room cooling with voice commands like 'Hey Google, set bedroom AC to 72 degrees.'"
            }
        },
        {
            "@type": "Question",
            "name": "How does smart Wi-Fi scheduling help lower HECO electric bills?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "With smart scheduling, you can set your AC to turn off automatically when you leave for work in the morning and turn back on 15 minutes before you return, eliminating 8 to 10 hours of unnecessary daytime power consumption."
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
            "name": "Smart Wi-Fi LG ThinQ Window ACs",
            "item": "https://www.affordablehome-ac.com/smart-wifi-window-ac-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/smart-wifi-window-ac-oahu#collection",
            "url": "https://www.affordablehome-ac.com/smart-wifi-window-ac-oahu",
            "name": "Smart Wi-Fi Window ACs Oahu — LG ThinQ & GE SmartHQ App Control",
            "description": "Wi-Fi enabled LG ThinQ and GE SmartHQ Window Air Conditioners ($560–$1,200) in stock in Waipahu with HECO energy monitoring, voice control, and remote pre-cooling.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "Smart Wi-Fi Window ACs Oahu — LG ThinQ & GE SmartHQ App Control — Canonical Waipahu Models",
                "numberOfItems": 10,
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
                        "name": "LG 12,000 BTU Standard WiFi (LW1217ERSM1)",
                        "url": "https://www.affordablehome-ac.com/shop/12-lg-12-000-btu-lw1217ersm1"
                    },
                    {
                        "@type": "ListItem",
                        "position": 9,
                        "name": "GE 8,200 BTU 26\" Built-In (AJCQ08AWJ)",
                        "url": "https://www.affordablehome-ac.com/shop/13-ge-8-200-btu-ajcq08awj"
                    },
                    {
                        "@type": "ListItem",
                        "position": 10,
                        "name": "GE 12,000 BTU R-32 Inverter 26\" Built-In (AJCQ12AXXWA)",
                        "url": "https://www.affordablehome-ac.com/shop/15-ge-12-000-btu-ajcq12axxwa"
                    }
                ]
            }
        },
        {
            "@type": "HVACBusiness",
            "@id": "https://www.affordablehome-ac.com/smart-wifi-window-ac-oahu#localbusiness",
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

export default function SmartWifiAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(smartWifiFaqSchema).replace(/</g, '\u003c') }}
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
