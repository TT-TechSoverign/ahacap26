import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: "Affordable LG Window ACs Oahu ($395 & $625) | Waipahu Stock",
    },
    description: "Factory-new LG Window ACs starting at $395 (8,000 BTU LW8024RD) & $625 (12,000 BTU LW1217ERSM1) in Waipahu, Oahu. Free pickup or $50 delivery • (808) 488-1111.",
    alternates: {
        canonical: "https://www.affordablehome-ac.com/shop/lg-standard-budget-window-ac-oahu",
    },
    openGraph: {
        title: "Affordable LG Window ACs Oahu ($395 & $625) | Waipahu Stock",
        description: "Factory-new LG Window ACs starting at $395 (8,000 BTU LW8024RD) & $625 (12,000 BTU LW1217ERSM1) in Waipahu, Oahu. Free pickup or $50 delivery • (808) 488-1111.",
        url: "https://www.affordablehome-ac.com/shop/lg-standard-budget-window-ac-oahu",
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: "https://www.affordablehome-ac.com/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-1600x1000.webp",
                width: 1600,
                height: 1000,
                alt: "Affordable LG Standard 8,000 BTU LW8024RD and 12,000 BTU LW1217ERSM1 Window ACs Oahu",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Affordable LG Window ACs Oahu ($395 & $625) | Waipahu Stock",
        description: "Factory-new LG Window ACs starting at $395 (8,000 BTU LW8024RD) & $625 (12,000 BTU LW1217ERSM1) in Waipahu, Oahu. Free pickup or $50 delivery • (808) 488-1111.",
        images: ["https://www.affordablehome-ac.com/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-1600x1000.webp"],
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Are your $395 and $625 LG units brand-new or refurbished?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "100% brand-new and factory-sealed in original LG cartons. We never sell used, open-box, or scratched-and-dented units, and every new LG window AC carries LG's 1-Year Parts & Labor manufacturer warranty."
            }
        },
        {
            "@type": "Question",
            "name": "Does the $395 LG LW8024RD qualify for the $45 Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No—Hawaii Energy restricts the $45 window AC rebate to ENERGY STAR certified inverter models (starting with our $560 LG LW6023IVSM, which becomes $515 net after rebate). The LW8024RD ($395) gives you the lowest immediate out-of-pocket price with zero paperwork."
            }
        },
        {
            "@type": "Question",
            "name": "Will the $395 LW8024RD cool a standard Oahu bedroom?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! At 8,000 BTU (rated up to 350 sq. ft. AHAM and calibrated up to 280 sq. ft. for uninsulated Oahu single-wall bedrooms), the LW8024RD cools standard 120 to 260 sq. ft. bedrooms rapidly on a normal 115V wall plug."
            }
        },
        {
            "@type": "Question",
            "name": "Can you replace an old noisy window AC and haul away the dead unit during installation?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Request a $0 Free In-Home Estimate by appointment at (808) 488-1111 or through our Window AC Installation page, and our technicians will quote removing your failed unit and mounting your new LG unit cleanly over protective floor drop cloths."
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
            "name": "Shop Window ACs",
            "item": "https://www.affordablehome-ac.com/shop"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Affordable LG Standard Window ACs ($395 & $625)",
            "item": "https://www.affordablehome-ac.com/shop/lg-standard-budget-window-ac-oahu"
        }
    ]
};

const richEntitySchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/shop/lg-standard-budget-window-ac-oahu#collection",
            "url": "https://www.affordablehome-ac.com/shop/lg-standard-budget-window-ac-oahu",
            "name": "Affordable LG Window ACs Oahu ($395 & $625) | Waipahu Stock",
            "description": "Factory-new LG Window ACs starting at $395 (8,000 BTU LW8024RD) & $625 (12,000 BTU LW1217ERSM1) in Waipahu, Oahu. Free pickup or $50 delivery • (808) 488-1111.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "Affordable LG Window ACs Oahu ($395 & $625) | Waipahu Stock — Waipahu Models",
                "numberOfItems": 4,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "LG 8,000 BTU Standard (LW8024RD)",
                        "url": "https://www.affordablehome-ac.com/shop/11-lg-8-000-btu-lw8024rd"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "LG 12,000 BTU Standard WiFi (LW1217ERSM1)",
                        "url": "https://www.affordablehome-ac.com/shop/12-lg-12-000-btu-lw1217ersm1"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "LG Dual Inverter 6,000 BTU (LW6023IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/1-lg-dual-inverter-6-000-btu-lw6023ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "LG Dual Inverter 12,000 BTU (LW1222IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm"
                    }
                ]
            }
        },
        {
            "@type": "HVACBusiness",
            "@id": "https://www.affordablehome-ac.com/shop/lg-standard-budget-window-ac-oahu#localbusiness",
            "parentOrganization": {
                "@id": "https://www.affordablehome-ac.com/#hvacbusiness"
            },
            "name": "Affordable Home A/C",
            "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-base-standard-units/lg-base-standard-lw8024rd-front-1600x1000.webp",
            "url": "https://www.affordablehome-ac.com",
            "telephone": "+1-808-488-1111",
            "priceRange": "$395 - $1,200",
            "slogan": "Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005",
            "address": {
                "@type": "PostalAddress",
                "streetAddress": "94-150 Leoleo St. #203",
                "addressLocality": "Waipahu",
                "addressRegion": "HI",
                "postalCode": "96797",
                "addressCountry": "US"
            },
            "areaServed": {
                "@type": "AdministrativeArea",
                "name": "Oahu, Hawaii"
            },
            "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.9",
                "reviewCount": "142",
                "bestRating": "5",
                "worstRating": "1"
            }
        }
    ]
};

export default function PillarRouteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(richEntitySchema).replace(/</g, '\\u003c') }}
            />
            {children}
        </>
    );
}
