import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'LG Dual Inverter vs Standard Window AC Hawaii | Save $424/yr on HECO + $45 Rebate'
    },
    description: 'Compare 44dB LG Dual Inverter & GE R-32 Inverter Window ACs vs standard units in Hawaii. Save 40% on HECO bills + claim a $45 Rebate in Waipahu • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/inverter-window-ac-vs-standard-hawaii',
    },
    openGraph: {
        title: 'LG Dual Inverter vs Standard Window AC Hawaii | Save $424/yr on HECO + $45 Rebate',
        description: 'Compare 44dB LG Dual Inverter & GE R-32 Inverter Window ACs vs standard units in Hawaii. Save 40% on HECO bills + claim a $45 Rebate in Waipahu • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/inverter-window-ac-vs-standard-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Dual Inverter vs Standard Window AC Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LG Dual Inverter vs Standard Window AC Hawaii | Save $424/yr on HECO + $45 Rebate',
        description: 'Compare 44dB LG Dual Inverter & GE R-32 Inverter Window ACs vs standard units in Hawaii. Save 40% on HECO bills + claim a $45 Rebate in Waipahu • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const inverterVsStandardFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does an inverter window AC differ from a traditional window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A standard AC compressor operates at only one speed: 100% full blast or completely OFF. When your room warms up, it turns on with a loud clunk, overcools, and shuts down. A Dual Inverter compressor uses variable-speed twin rotaries that continuously modulate speed from 20% to 100%, maintaining a perfectly constant room temperature while consuming far less electricity."
            }
        },
        {
            "@type": "Question",
            "name": "Is an inverter window AC really worth the higher upfront price in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, absolutely. Because Hawaii has the highest electricity rates in the nation (~44.2¢/kWh), the 35% to 40% energy reduction of an inverter window AC saves \$25 to \$60 every single month. In just 6 to 9 months of island operation, the energy savings completely offset the price difference."
            }
        },
        {
            "@type": "Question",
            "name": "How much quieter is a Dual Inverter window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Standard window ACs typically produce 55 to 60 dB of noise, similar to a loud conversation or dishwasher. LG Dual Inverter & GE units run at just 44 dB in sleep mode—quieter than a library whisper—and eliminate the loud mechanical kick every time the compressor cycles."
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
            "name": "Dual Inverter vs Standard Window AC",
            "item": "https://www.affordablehome-ac.com/inverter-window-ac-vs-standard-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "LG Dual Inverter 12,000 BTU Window Air Conditioner (LW1222IVSM)",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "Compare and shop in-stock LG Dual Inverter ($560–$1,025) vs Standard LG ($395–$625) window ACs in Waipahu, Oahu. Up to 40% HECO electric savings + $45 Rebate.",
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
        "url": "https://www.affordablehome-ac.com/inverter-window-ac-vs-standard-hawaii",
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

export default function InverterVsStandardLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(inverterVsStandardFaqSchema) }}
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
