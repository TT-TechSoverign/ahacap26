import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Replacement Oahu ($0 Estimate) | Old Unit Swap & In-Stock LG/GE ($395+)'
    },
    description: '$0 Free Estimate • (808) 488-1111. Replace loud, rusted Oahu Window ACs with in-stock LG Dual Inverter or GE 26" Built-In units ($395–$1,200, $45 Rebate).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-replacement-oahu',
    },
    openGraph: {
        title: 'Window AC Replacement Oahu ($0 Estimate) | Old Unit Swap & In-Stock LG/GE ($395+)',
        description: '$0 Free Estimate • (808) 488-1111. Replace loud, rusted Oahu Window ACs with in-stock LG Dual Inverter or GE 26" Built-In units ($395–$1,200, $45 Rebate).',
        url: 'https://www.affordablehome-ac.com/window-ac-replacement-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Replacement Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Replacement Oahu ($0 Estimate) | Old Unit Swap & In-Stock LG/GE ($395+)',
        description: '$0 Free Estimate • (808) 488-1111. Replace loud, rusted Oahu Window ACs with in-stock LG Dual Inverter or GE 26" Built-In units ($395–$1,200, $45 Rebate).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const replacementFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "When should I replace my window AC instead of cleaning or repairing it?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "If your window AC is over 4 to 5 years old, has severe chassis rust from salt air, is making loud bearing grinding noises, or is an older non-inverter unit driving up your HECO bill, replacing it with an LG Dual Inverter ($560 to $1,025) is far more economical than expensive component repairs."
            }
        },
        {
            "@type": "Question",
            "name": "Can you haul away and dispose of my old window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! When you book our professional installation service with your new unit, our Oahu cooling technicians can safely remove and haul away your old rusted air conditioner for certified eco-friendly recycling."
            }
        },
        {
            "@type": "Question",
            "name": "Will the new window unit fit my existing opening?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians measure your window or jalousie opening to ensure proper fitment. We install new side accordion panels or custom filler materials to guarantee an airtight, insect-proof seal."
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
            "name": "Window AC Replacement & Upgrade",
            "item": "https://www.affordablehome-ac.com/window-ac-replacement-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "LG Dual Inverter 12,000 BTU Replacement Window AC (LW1222IVSM)",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
    ],
    "description": "In-stock replacement LG & GE window and 26-inch through-the-wall air conditioners ($395–$1,200) in Waipahu, Oahu with $0 Free In-Home Installation Estimate.",
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
        "url": "https://www.affordablehome-ac.com/window-ac-replacement-oahu",
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

export default function WindowAcReplacementLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(replacementFaqSchema) }}
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
