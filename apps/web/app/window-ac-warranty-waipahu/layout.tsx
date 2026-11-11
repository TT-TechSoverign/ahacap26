import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Warranty & Local Support Waipahu ($395+ In-Stock) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Local Oahu warranty support for LG Dual Inverter & GE Built-In window air conditioners. 1-year manufacturer.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-warranty-waipahu',
    },
    openGraph: {
        title: 'Window AC Warranty & Local Support Waipahu ($395+ In-Stock) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Local Oahu warranty support for LG Dual Inverter & GE Built-In window air conditioners. 1-year manufacturer.',
        url: 'https://www.affordablehome-ac.com/window-ac-warranty-waipahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Warranty Waipahu Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Warranty & Local Support Waipahu ($395+ In-Stock) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Local Oahu warranty support for LG Dual Inverter & GE Built-In window air conditioners. 1-year manufacturer.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const warrantyFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What warranty comes with LG Dual Inverter & GE Built-In window air conditioners?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Every new LG Dual Inverter & GE window AC purchased from Affordable Home A/C includes a 1-year limited manufacturer warranty on parts and labor, plus an extended limited warranty on the Dual Inverter compressor component."
            }
        },
        {
            "@type": "Question",
            "name": "Do I have to ship my broken unit to the mainland for warranty service?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No! Unlike buying online from mainland websites where returns and warranty claims require expensive ocean freight shipping, Affordable Home A/C provides local diagnostic support and bench-testing right here at our Waipahu facility (94-150 Leoleo St #203)."
            }
        },
        {
            "@type": "Question",
            "name": "What happens if my unit needs service during the warranty period?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply call our Waipahu office at (808) 488-1111 with your purchase receipt. Our Oahu cooling technicians can diagnose issues on-site or at our facility using authentic manufacturer replacement parts."
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
            "name": "1-Year Window AC Factory Warranty",
            "item": "https://www.affordablehome-ac.com/window-ac-warranty-waipahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "Factory-Warrantied LG & GE Window Air Conditioners Oahu (AJCQ12AXXWA)",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
    ],
    "description": "Brand-new factory-sealed LG (1-Yr Parts & Labor) and GE Built-In (2-Yr Full / 5-Yr Sealed System) window ACs ($395–$1,200) in stock in Waipahu, Oahu.",
    "sku": "AJCQ12AXXWA",
    "mpn": "AJCQ12AXXWA",
    "gtin12": "084691908142",
    "brand": {
        "@type": "Brand",
        "name": "GE Appliances"
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
        "url": "https://www.affordablehome-ac.com/window-ac-warranty-waipahu",
        "priceCurrency": "USD",
        "price": "1200.00",
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

export default function WindowAcWarrantyLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(warrantyFaqSchema) }}
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
