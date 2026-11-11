import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '$50 Flat-Rate Window AC Delivery Oahu | In-Stock LG & GE ACs ($395–$1,200)'
    },
    description: '$50 flat Oahu delivery or free Waipahu pickup by appointment! 16 in-stock LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200, $45 Rebate) • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-delivery-service-oahu',
    },
    openGraph: {
        title: '$50 Flat-Rate Window AC Delivery Oahu | In-Stock LG & GE ACs ($395–$1,200)',
        description: '$50 flat Oahu delivery or free Waipahu pickup by appointment! 16 in-stock LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200, $45 Rebate) • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/window-ac-delivery-service-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Delivery Service Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '$50 Flat-Rate Window AC Delivery Oahu | In-Stock LG & GE ACs ($395–$1,200)',
        description: '$50 flat Oahu delivery or free Waipahu pickup by appointment! 16 in-stock LG Dual Inverter & GE 26" Built-In Window ACs ($395–$1,200, $45 Rebate) • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const deliveryFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much does window AC delivery cost on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "We charge a flat rate of $50 for delivery anywhere on Oahu, from Hawaii Kai and urban Honolulu to Ewa Beach, Kapolei, Kailua, and the North Shore."
            }
        },
        {
            "@type": "Question",
            "name": "How quickly can my window AC be delivered?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Units in stock at our Waipahu warehouse are typically scheduled for delivery within 24 to 48 hours. Our dispatch team coordinates a 2-hour delivery window directly with you."
            }
        },
        {
            "@type": "Question",
            "name": "Can you install the window AC when you deliver it?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! You can choose our professional window AC installation add-on at checkout. Our Oahu cooling technicians will deliver the unit, lay protective floor drop cloths, securely mount the unit with standard brackets if required, and test cooling operation before leaving."
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
            "name": "$50 Flat-Rate Oahu Window AC Delivery",
            "item": "https://www.affordablehome-ac.com/window-ac-delivery-service-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "In-Stock LG & GE Window Air Conditioners with $50 Flat Oahu Delivery (LW1222IVSM)",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"
    ],
    "description": "Order in-stock LG Dual Inverter & GE Built-In window ACs ($395–$1,200) online with $50 flat-rate delivery across all 22 Oahu cities or free Waipahu warehouse pickup.",
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
        "url": "https://www.affordablehome-ac.com/window-ac-delivery-service-oahu",
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

export default function WindowAcDeliveryLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(deliveryFaqSchema) }}
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
