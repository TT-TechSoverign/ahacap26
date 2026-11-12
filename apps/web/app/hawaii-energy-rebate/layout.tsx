import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '$45 Hawaii Energy Window AC Rebate PDF (2026) | Oahu In-Stock'
    },
    description: 'Instant $45 Hawaii Energy Window AC Rebate PDF Download! Eligible LG Dual Inverter & GE ACs ($560+, $515 net) in stock in Waipahu • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/hawaii-energy-rebate',
    },
    openGraph: {
        title: '$45 Hawaii Energy Window AC Rebate PDF (2026) | Oahu In-Stock',
        description: 'Instant $45 Hawaii Energy Window AC Rebate PDF Download! Eligible LG Dual Inverter & GE ACs ($560+, $515 net) in stock in Waipahu • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/hawaii-energy-rebate',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Hawaii Energy Window AC $45 Rebate Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '$45 Hawaii Energy Window AC Rebate PDF (2026) | Oahu In-Stock',
        description: 'Instant $45 Hawaii Energy Window AC Rebate PDF Download! Eligible LG Dual Inverter & GE ACs ($560+, $515 net) in stock in Waipahu • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const rebateFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much is the Hawaii Energy rebate for window air conditioners?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Hawaii Energy rebate is exactly $45 for qualifying Energy Star certified room window air conditioners, such as the LG Dual Inverter & GE models stocked in our Waipahu warehouse."
            }
        },
        {
            "@type": "Question",
            "name": "Which window AC models qualify for the $45 Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our rebate participation covers all qualifying Energy Star certified room window AC units, including our 6,000 BTU to 23,500 BTU LG Dual Inverter & GE models stocked in our Waipahu warehouse."
            }
        },
        {
            "@type": "Question",
            "name": "How do I claim my $45 window AC rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "When you purchase an in-stock qualifying Energy Star window unit from Affordable Home AC, we provide you with our official pre-approved Hawaii Energy Rebate Application Form (Version 4). Simply fill in your HECO electric account number and submit the form with your purchase receipt online or via mail to receive your $45 check from Hawaii Energy."
            }
        },
        {
            "@type": "Question",
            "name": "Can I pick up my rebate-qualifying window AC today?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! We maintain active inventory in our central Waipahu warehouse (94-150 Leoleo St #203). You can order online and arrange free local pickup by appointment, or choose flat-rate $50 island-wide delivery."
            }
        }
    ]
};

const hvacBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": "https://www.affordablehome-ac.com/#hvacbusiness",
    "name": "Affordable Home A/C",
    "telephone": "+1-808-488-1111",
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "94-150 Leoleo St. #203",
        "addressLocality": "Waipahu",
        "addressRegion": "HI",
        "postalCode": "96797",
        "addressCountry": "US"
    },
    "areaServed": "Oahu"
};

const rebateHowToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Claim Your $45 Hawaii Energy Window AC Rebate on Oahu",
    "description": "3-step guide to claiming your $45 cash rebate from Hawaii Energy when purchasing an ENERGY STAR LG Dual Inverter or GE Inverter Window AC in Oahu.",
    "totalTime": "PT5M",
    "step": [
        {
            "@type": "HowToStep",
            "position": 1,
            "name": "Purchase an ENERGY STAR Qualifying Window AC",
            "text": "Order an eligible LG Dual Inverter (6,000–23,500 BTU) or GE Variable Speed Inverter (AJCQ12AXXWA) online at affordablehome-ac.com/shop ($560–$1,200) for Free Waipahu Pickup or $50 Oahu Delivery.",
            "url": "https://www.affordablehome-ac.com/shop#dual_inverter"
        },
        {
            "@type": "HowToStep",
            "position": 2,
            "name": "Download the Official Pre-Approved AHAC Rebate PDF",
            "text": "Download the official Affordable Home A/C Hawaii Energy Window AC Purchase Application (Version 4 PDF) and enter your 12-digit Hawaiian Electric (HECO) residential account number.",
            "url": "https://www.affordablehome-ac.com/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf"
        },
        {
            "@type": "HowToStep",
            "position": 3,
            "name": "Submit Receipt & Form for Your $45 Check",
            "text": "Submit your completed application alongside your itemized Affordable Home A/C purchase receipt to Hawaii Energy online or by mail to receive your $45 cash rebate check.",
            "url": "https://www.affordablehome-ac.com/hawaii-energy-rebate"
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
            "name": "$45 Hawaii Energy Window AC Rebate",
            "item": "https://www.affordablehome-ac.com/hawaii-energy-rebate"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
                "color": "White",
                "category": "Window Air Conditioners",
    "name": "Hawaii Energy $45 Rebate Eligible LG Dual Inverter Window AC (LW1022IVSM)",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
    ],
    "description": "Qualifying ENERGY STAR LG Dual Inverter & GE R-32 Inverter window ACs ($560–$1,200) in stock in Waipahu, Oahu with $45 Instant Hawaii Energy Cash Rebate & up to 40% HECO savings.",
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
        "url": "https://www.affordablehome-ac.com/hawaii-energy-rebate",
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

export default function HawaiiEnergyRebateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(rebateFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(rebateHowToSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pass5RichSchema) }}
            />
            {children}
        </>
    );
}
