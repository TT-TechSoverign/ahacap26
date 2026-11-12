import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: "10k & 12k BTU Window ACs Oahu ($625–$1,200) | 115V In-Stock",
    },
    description: "In-Stock 10,000 & 12,000 BTU LG Dual Inverter & GE 26\" Built-In Window ACs ($625–$1,200) in Waipahu, Oahu. 115V plug & $45 Rebate • (808) 488-1111.",
    alternates: {
        canonical: "https://www.affordablehome-ac.com/shop/10000-12000-btu-window-ac-oahu",
    },
    openGraph: {
        title: "10k & 12k BTU Window ACs Oahu ($625–$1,200) | 115V In-Stock",
        description: "In-Stock 10,000 & 12,000 BTU LG Dual Inverter & GE 26\" Built-In Window ACs ($625–$1,200) in Waipahu, Oahu. 115V plug & $45 Rebate • (808) 488-1111.",
        url: "https://www.affordablehome-ac.com/shop/10000-12000-btu-window-ac-oahu",
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
                width: 1600,
                height: 1000,
                alt: "10,000 and 12,000 BTU LG Dual Inverter and GE Built-In Window ACs Oahu",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "10k & 12k BTU Window ACs Oahu ($625–$1,200) | 115V In-Stock",
        description: "In-Stock 10,000 & 12,000 BTU LG Dual Inverter & GE 26\" Built-In Window ACs ($625–$1,200) in Waipahu, Oahu. 115V plug & $45 Rebate • (808) 488-1111.",
        images: ["https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp"],
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Do 12,000 BTU window air conditioners plug into a normal 115V outlet?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Every 10,000 and 12,000 BTU LG and GE air conditioner we stock in Waipahu (LW1022IVSM, LW1217ERSM1, LW1222IVSM, AJCQ10AWJ, and AJCQ12AXXWA) uses a standard 115-volt, 15-amp 3-prong household plug (NEMA 5-15P). Only 18,000 BTU and 23,500 BTU models require 208/230V outlets."
            }
        },
        {
            "@type": "Question",
            "name": "Should I buy 10,000 BTU or 12,000 BTU for an Oahu master bedroom?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For a 200 to 300 sq. ft. master bedroom—or if your window opening is between 22 and 26.5 inches wide—the 10,000 BTU LG LW1022IVSM ($650) is ideal. For larger 280 to 380 sq. ft. master suites, open studio apartments, or west-facing single-wall rooms in Ewa Beach, Kapolei, or Waipahu with a 27-inch+ window, step up to the 12,000 BTU LG LW1222IVSM ($745)."
            }
        },
        {
            "@type": "Question",
            "name": "Which 10k and 12k models qualify for the $45 Hawaii Energy cash rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our ENERGY STAR certified inverter models—including the LG LW1022IVSM ($650), LG LW1222IVSM ($745), and GE AJCQ12AXXWA R-32 Variable-Speed Built-In ($1,200)—qualify for the $45 Hawaii Energy cash rebate. We provide our pre-approved Version 4 rebate application PDF with your purchase."
            }
        },
        {
            "@type": "Question",
            "name": "Can I pick up a 10,000 or 12,000 BTU AC at your Waipahu warehouse today?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Order online at affordablehome-ac.com/shop and select Free Waipahu Warehouse Pickup by appointment (94-150 Leoleo St. #203, Waipahu, HI 96797) or $50 flat-rate curbside delivery across 15 Oahu municipalities."
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
            "name": "10,000 & 12,000 BTU Buyer Guide",
            "item": "https://www.affordablehome-ac.com/shop/10000-12000-btu-window-ac-oahu"
        }
    ]
};

const richEntitySchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/shop/10000-12000-btu-window-ac-oahu#collection",
            "url": "https://www.affordablehome-ac.com/shop/10000-12000-btu-window-ac-oahu",
            "name": "10k & 12k BTU Window ACs Oahu ($625–$1,200) | 115V In-Stock",
            "description": "In-Stock 10,000 & 12,000 BTU LG Dual Inverter & GE 26\" Built-In Window ACs ($625–$1,200) in Waipahu, Oahu. 115V plug & $45 Rebate • (808) 488-1111.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "10k & 12k BTU Window ACs Oahu ($625–$1,200) | 115V In-Stock — Waipahu Models",
                "numberOfItems": 5,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "LG Dual Inverter 10,000 BTU (LW1022IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/3-lg-dual-inverter-10-000-btu-lw1022ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "LG Dual Inverter 12,000 BTU (LW1222IVSM)",
                        "url": "https://www.affordablehome-ac.com/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "LG 12,000 BTU Standard WiFi (LW1217ERSM1)",
                        "url": "https://www.affordablehome-ac.com/shop/12-lg-12-000-btu-lw1217ersm1"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "GE 10,000 BTU 26\" Built-In (AJCQ10AWJ)",
                        "url": "https://www.affordablehome-ac.com/shop/14-ge-10-000-btu-ajcq10awj"
                    },
                    {
                        "@type": "ListItem",
                        "position": 5,
                        "name": "GE 12,000 BTU R-32 Inverter 26\" Built-In (AJCQ12AXXWA)",
                        "url": "https://www.affordablehome-ac.com/shop/15-ge-12-000-btu-ajcq12axxwa"
                    }
                ]
            }
        },
        {
            "@type": "HVACBusiness",
            "@id": "https://www.affordablehome-ac.com/shop/10000-12000-btu-window-ac-oahu#localbusiness",
            "parentOrganization": {
                "@id": "https://www.affordablehome-ac.com/#hvacbusiness"
            },
            "name": "Affordable Home A/C",
            "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
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
