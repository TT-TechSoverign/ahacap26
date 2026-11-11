import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Studio & Apartment Window ACs Oahu ($395–$650) | 44dB LG'
    },
    description: 'In-Stock compact 6,000–10,000 BTU LG & GE Window ACs ($395–$650) for Honolulu studios & Waikiki apartments. 115V plug, 44dB quiet & $45 Rebate • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-for-studios-apartments-hawaii',
    },
    openGraph: {
        title: 'Studio & Apartment Window ACs Oahu ($395–$650) | 44dB LG',
        description: 'In-Stock compact 6,000–10,000 BTU LG & GE Window ACs ($395–$650) for Honolulu studios & Waikiki apartments. 115V plug, 44dB quiet & $45 Rebate • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/window-ac-for-studios-apartments-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC for Studios and Apartments Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Studio & Apartment Window ACs Oahu ($395–$650) | 44dB LG',
        description: 'In-Stock compact 6,000–10,000 BTU LG & GE Window ACs ($395–$650) for Honolulu studios & Waikiki apartments. 115V plug, 44dB quiet & $45 Rebate • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp'],
    }
};

const studioApartmentFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What size window AC is best for a studio apartment on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For typical Honolulu studio apartments ranging from 350 to 550 sq ft, an 8,000 to 10,000 BTU LG Dual Inverter or GE Built-In unit is ideal. It provides sufficient cooling capacity for island humidity while running on a standard 115V circuit."
            }
        },
        {
            "@type": "Question",
            "name": "Why is low decibel sound important in a studio apartment?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In a studio apartment, your living room, home office, and bed are in the same room. A traditional loud window AC (55+ dB) makes sleeping or watching TV difficult. Our 44 dB Dual Inverter units run at a gentle whisper."
            }
        },
        {
            "@type": "Question",
            "name": "Can I install this in a rental apartment without damaging the window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our technicians use non-destructive compression brackets and foam gaskets that protect window sills and frames, making removal easy when moving out so your security deposit is protected."
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
            "name": "Studio & Apartment Window ACs",
            "item": "https://www.affordablehome-ac.com/window-ac-for-studios-apartments-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
                "color": "White",
                "category": "Window Air Conditioners",
    "name": "LG Dual Inverter 6,000 BTU Studio & Apartment Window AC (LW6023IVSM)",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "Compact, HOA-friendly 115V studio and apartment window ACs ($395–$745) and 26-inch condo wall units in stock at our Waipahu, Oahu warehouse.",
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
        "url": "https://www.affordablehome-ac.com/window-ac-for-studios-apartments-hawaii",
        "priceCurrency": "USD",
        "price": "560.00",
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

export default function StudioApartmentAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(studioApartmentFaqSchema) }}
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
