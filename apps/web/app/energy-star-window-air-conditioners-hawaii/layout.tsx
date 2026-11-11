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
    "@type": "Product",
                "color": "White",
                "category": "Window Air Conditioners",
    "name": "LG Dual Inverter 10,000 BTU ENERGY STAR Window AC (LW1022IVSM)",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "ENERGY STAR certified LG Dual Inverter & GE R-32 Inverter window ACs ($560–$1,200) in stock in Waipahu, Oahu. Cut HECO bills up to 40% + $45 Hawaii Energy Cash Rebate.",
    "sku": "LW1022IVSM",
    "mpn": "LW1022IVSM",
    "gtin12": "195174029930",
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
        "url": "https://www.affordablehome-ac.com/energy-star-window-air-conditioners-hawaii",
        "priceCurrency": "USD",
        "price": "650.00",
        "priceValidUntil": "2027-12-31",
        "validFrom": "2026-01-01",
        "itemCondition": "https://schema.org/NewCondition",
        "availability": "https://schema.org/InStock",
        "seller": {
            "@type": "Organization",
            "name": "Affordable Home A/C",
            "url": "https://www.affordablehome-ac.com"
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pass5RichSchema) }}
            />
            {children}
        </>
    );
}
