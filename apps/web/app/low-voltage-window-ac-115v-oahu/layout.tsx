import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '115V Standard Plug Window ACs Oahu (6k–14k BTU In-Stock $395–$785) | Waipahu'
    },
    description: 'In-Stock 115V 15-Amp LG & GE Window ACs (6,000–14,000 BTU, $395–$785) in Waipahu, Oahu. Plugs into standard outlets + $45 Hawaii Energy Rebate • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu',
    },
    openGraph: {
        title: '115V Standard Plug Window ACs Oahu (6k–14k BTU In-Stock $395–$785) | Waipahu',
        description: 'In-Stock 115V 15-Amp LG & GE Window ACs (6,000–14,000 BTU, $395–$785) in Waipahu, Oahu. Plugs into standard outlets + $45 Hawaii Energy Rebate • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: '115V Window AC Units Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '115V Standard Plug Window ACs Oahu (6k–14k BTU In-Stock $395–$785) | Waipahu',
        description: 'In-Stock 115V 15-Amp LG & GE Window ACs (6,000–14,000 BTU, $395–$785) in Waipahu, Oahu. Plugs into standard outlets + $45 Hawaii Energy Rebate • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const lowVoltageFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the largest BTU window AC that runs on a standard 115V outlet?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Thanks to LG Dual Inverter & GE Built-In variable-speed compressor technology, units up to 14,000 BTU (such as the LW1522FVSM) can operate on a standard 115V 15-amp circuit with a standard NEMA 5-15P plug, cooling up to 700 sq ft (AHAM) without requiring a 230V line."
            }
        },
        {
            "@type": "Question",
            "name": "Will a 115V Dual Inverter window AC trip my home's circuit breaker?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Traditional non-inverter units draw massive startup current spikes (often 30 to 40 amps for a split second) when the compressor kicks on, tripping older breakers. LG Dual Inverter & GE Built-Ins feature soft-start electronics that gradually ramp up power, virtually eliminating breaker trips."
            }
        },
        {
            "@type": "Question",
            "name": "Can I use an extension cord with a 115V window air conditioner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We strongly recommend plugging directly into a wall receptacle. If necessary, only use a heavy-duty, 14-gauge or 12-gauge appliance-rated extension cord rated for 15 amps to prevent overheating and voltage drop."
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
            "name": "115V Standard Plug Window ACs",
            "item": "https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "LG Dual Inverter 12,000 BTU 115V Standard Plug Window AC (LW1222IVSM)",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "115V / 15-Amp standard household plug window ACs from 6,000 to 14,000 BTU ($395–$1,200) in stock in Waipahu, Oahu. Zero 230V rewiring needed + $45 Hawaii Energy Rebate.",
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
        },
        {
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": "Leilani K. — Honolulu, Oahu"
            },
            "datePublished": "2026-10-02",
            "reviewBody": "Upgraded our Honolulu condo bedroom to an in-stock Waipahu unit. Runs whisper-quiet overnight on a standard 115V outlet and cut our HECO electric bill.",
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": "5",
                "bestRating": "5",
                "worstRating": "1"
            }
        },
        {
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": "David C. — Pearl City, Oahu"
            },
            "datePublished": "2026-10-14",
            "reviewBody": "Same-week Waipahu warehouse pickup by appointment. Brand-new factory-sealed unit with 1-year warranty and official $45 Hawaii Energy rebate PDF.",
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
        "url": "https://www.affordablehome-ac.com/low-voltage-window-ac-115v-oahu",
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

export default function LowVoltageAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(lowVoltageFaqSchema) }}
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
