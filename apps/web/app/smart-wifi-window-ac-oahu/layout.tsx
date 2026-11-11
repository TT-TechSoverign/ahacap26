import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Smart Wi-Fi Window AC Oahu ($395+ In-Stock) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Control your room temperature from anywhere on Oahu with smart Wi-Fi enabled LG Dual Inverter & GE SmartHQ & GE.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/smart-wifi-window-ac-oahu',
    },
    openGraph: {
        title: 'Smart Wi-Fi Window AC Oahu ($395+ In-Stock) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Control your room temperature from anywhere on Oahu with smart Wi-Fi enabled LG Dual Inverter & GE SmartHQ & GE.',
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
        title: 'Smart Wi-Fi Window AC Oahu ($395+ In-Stock) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Control your room temperature from anywhere on Oahu with smart Wi-Fi enabled LG Dual Inverter & GE SmartHQ & GE.',
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
    "@type": "Product",
    "name": "LG Dual Inverter 12,000 BTU ThinQ Smart WiFi Window AC (LW1222IVSM)",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
    ],
    "description": "Smart WiFi LG ThinQ and GE SmartHQ window air conditioners ($560–$1,200) in stock in Waipahu, Oahu. Remote smartphone cooling control, kWh energy tracking & $45 Rebate.",
    "sku": "LW1222IVSM",
    "mpn": "LW1222IVSM",
    "gtin12": "195174029947",
    "brand": {
        "@type": "Brand",
        "name": "LG"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "reviewCount": "142",
        "bestRating": "5",
        "worstRating": "1"
    },
    "review": [
        {
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": "Kimo M. — Oahu Homeowner"
            },
            "datePublished": "2026-09-18",
            "reviewBody": "Picked up our new LG Dual Inverter at the Waipahu warehouse. Ice-cold, whisper quiet at 44dB, and qualified for the $45 Hawaii Energy rebate.",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
            }
        }
    ],
    "offers": {
        "@type": "Offer",
        "url": "https://www.affordablehome-ac.com/smart-wifi-window-ac-oahu",
        "priceCurrency": "USD",
        "price": "745.00",
        "priceValidUntil": "2027-12-31",
        "validFrom": "2026-01-01",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
            "@type": "Organization",
            "name": "Affordable Home A/C"
        },
        "hasMerchantReturnPolicy": {
            "@type": "MerchantReturnPolicy",
            "applicableCountry": "US",
            "returnPolicyCategory": "https://schema.org/MerchantReturnNotPermitted",
            "name": "All Sales Final"
        },
        "shippingDetails": [
            {
                "@type": "OfferShippingDetails",
                "name": "Waipahu Warehouse Pickup by Appt",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "0.00",
                    "currency": "USD"
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "US",
                    "addressRegion": "HI",
                    "postalCode": "96797"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 0,
                        "maxValue": 1,
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 0,
                        "maxValue": 0,
                        "unitCode": "DAY"
                    }
                }
            },
            {
                "@type": "OfferShippingDetails",
                "name": "Flat-Rate Oahu Delivery",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": "50.00",
                    "currency": "USD"
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "US",
                    "addressRegion": "HI"
                },
                "deliveryTime": {
                    "@type": "ShippingDeliveryTime",
                    "handlingTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 2,
                        "unitCode": "DAY"
                    },
                    "transitTime": {
                        "@type": "QuantitativeValue",
                        "minValue": 1,
                        "maxValue": 3,
                        "unitCode": "DAY"
                    }
                }
            }
        ]
    }
};

export default function SmartWifiAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(smartWifiFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pass5RichSchema) }}
            />
            {children}
        </>
    );
}
