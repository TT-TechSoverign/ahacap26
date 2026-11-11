import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Quiet 44dB Bedroom Window AC Oahu ($560–$595 In-Stock) | LG Dual Inverter & $45 Rebate'
    },
    description: 'In-Stock 44dB ultra-quiet LG Dual Inverter bedroom Window ACs ($560–$595) in Waipahu, Oahu. Standard 115V plug, $45 Hawaii Energy Rebate & $50 delivery • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/quiet-bedroom-window-ac-oahu',
    },
    openGraph: {
        title: 'Quiet 44dB Bedroom Window AC Oahu ($560–$595 In-Stock) | LG Dual Inverter & $45 Rebate',
        description: 'In-Stock 44dB ultra-quiet LG Dual Inverter bedroom Window ACs ($560–$595) in Waipahu, Oahu. Standard 115V plug, $45 Hawaii Energy Rebate & $50 delivery • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/quiet-bedroom-window-ac-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Quiet Bedroom Window AC Oahu 44dB',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Quiet 44dB Bedroom Window AC Oahu ($560–$595 In-Stock) | LG Dual Inverter & $45 Rebate',
        description: 'In-Stock 44dB ultra-quiet LG Dual Inverter bedroom Window ACs ($560–$595) in Waipahu, Oahu. Standard 115V plug, $45 Hawaii Energy Rebate & $50 delivery • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const bedroomFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How quiet is an LG Dual Inverter & GE window AC in a bedroom?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Sleep Mode, LG Dual Inverter 6,000 and 8,000 BTU models operate at just 44 decibels (dB)—as quiet as a quiet library or a gentle rain shower. Unlike traditional units that clatter and shudder when the compressor kicks on, the Dual Inverter variable-speed motor ramps up and down smoothly with zero sudden start-stop clangs."
            }
        },
        {
            "@type": "Question",
            "name": "How much electricity does a quiet window AC use overnight on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "At HECO's residential rate of ~44.2¢/kWh, running an LG Dual Inverter 8 hours overnight typically consumes only 2.0 to 2.4 kWh, which amounts to approximately $0.90 to $1.06 per night. Older single-speed window ACs draw over 2.5x more power."
            }
        },
        {
            "@type": "Question",
            "name": "Does this quiet bedroom unit qualify for a Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Both the 6,000 BTU (LW6023IVSM) and 8,000 BTU (LW8022IVSM) are Energy Star certified and qualify for the $45 Hawaii Energy cash rebate."
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
            "name": "Quiet Bedroom Window ACs (42 dBA)",
            "item": "https://www.affordablehome-ac.com/quiet-bedroom-window-ac-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "LG Dual Inverter 6,000 BTU Ultra-Quiet 44dB Bedroom Window AC (LW6023IVSM)",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
    ],
    "description": "Whisper-quiet 44dB LG Dual Inverter 6,000 BTU bedroom window AC (LW6023IVSM) in stock in Waipahu, Oahu. Standard 115V plug, $45 Hawaii Energy Rebate, free pickup or $50 delivery.",
    "sku": "LW6023IVSM",
    "mpn": "LW6023IVSM",
    "gtin12": "048231606028",
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
        "url": "https://www.affordablehome-ac.com/quiet-bedroom-window-ac-oahu",
        "priceCurrency": "USD",
        "price": "560.00",
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

export default function QuietBedroomWindowAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(bedroomFaqSchema) }}
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
