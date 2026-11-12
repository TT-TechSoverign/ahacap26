import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: "LG Cool & Heat Window ACs Hawaii ($650–$1,025) | In-Stock",
    },
    description: "In-Stock LG Cool + Supplemental Heat Window & Thru-Wall ACs (7,600–23,000 BTU, $650–$1,025) in Waipahu, Oahu. Ideal for Upcountry & condos • (808) 488-1111.",
    alternates: {
        canonical: "https://www.affordablehome-ac.com/shop/lg-cool-and-heat-window-ac-hawaii",
    },
    openGraph: {
        title: "LG Cool & Heat Window ACs Hawaii ($650–$1,025) | In-Stock",
        description: "In-Stock LG Cool + Supplemental Heat Window & Thru-Wall ACs (7,600–23,000 BTU, $650–$1,025) in Waipahu, Oahu. Ideal for Upcountry & condos • (808) 488-1111.",
        url: "https://www.affordablehome-ac.com/shop/lg-cool-and-heat-window-ac-hawaii",
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: "https://www.affordablehome-ac.com/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW8023HRSM.webp",
                width: 1600,
                height: 1000,
                alt: "LG Cool and Supplemental Heat Window and Universal Thru-Wall Air Conditioners Hawaii",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "LG Cool & Heat Window ACs Hawaii ($650–$1,025) | In-Stock",
        description: "In-Stock LG Cool + Supplemental Heat Window & Thru-Wall ACs (7,600–23,000 BTU, $650–$1,025) in Waipahu, Oahu. Ideal for Upcountry & condos • (808) 488-1111.",
        images: ["https://www.affordablehome-ac.com/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW8023HRSM.webp"],
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does supplemental heating work on LG Cool + Heat window ACs?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "LG HRSM models combine a rotary air-conditioning compressor for summer cooling with an integrated electric resistance heating coil for chilly winter nights and damp mornings. Note that electric heat strips provide supplemental room warmth rather than primary sub-freezing furnace heating—making them ideal for Hawaii's mild 55°F–64°F elevation winters."
            }
        },
        {
            "@type": "Question",
            "name": "Does the 7,600 BTU LG LW8023HRSM use a regular 115V household outlet?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. The LG LW8023HRSM ($650) operates both its 7,600 BTU cooling compressor and its 3,850 BTU electric heater on a standard 115-volt, 15-amp household outlet (NEMA 5-15P)."
            }
        },
        {
            "@type": "Question",
            "name": "Can LG Cool + Heat units be installed through a wall sleeve as well as a window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. All three LG HRSM models feature a universal Slide In-Out window/wall chassis designed for standard window sills (with included curtain kits) or compatible through-the-wall sleeves where side-louver clearance meets LG's installation manual."
            }
        },
        {
            "@type": "Question",
            "name": "What outlet is required for the 18,000 BTU LW1823HRSM?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The LG LW1823HRSM ($925) requires a 208/230-volt, 20-amp NEMA 6-20R receptacle. If you need a new 230V circuit or outlet change, dedicated high-voltage electrical work is handled by a licensed electrical subcontractor."
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
            "name": "LG Cool & Heat Window ACs Hawaii",
            "item": "https://www.affordablehome-ac.com/shop/lg-cool-and-heat-window-ac-hawaii"
        }
    ]
};

const richEntitySchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/shop/lg-cool-and-heat-window-ac-hawaii#collection",
            "url": "https://www.affordablehome-ac.com/shop/lg-cool-and-heat-window-ac-hawaii",
            "name": "LG Cool & Heat Window ACs Hawaii ($650–$1,025) | In-Stock",
            "description": "In-Stock LG Cool + Supplemental Heat Window & Thru-Wall ACs (7,600–23,000 BTU, $650–$1,025) in Waipahu, Oahu. Ideal for Upcountry & condos • (808) 488-1111.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "LG Cool & Heat Window ACs Hawaii ($650–$1,025) | In-Stock — Waipahu Models",
                "numberOfItems": 4,
                "itemListElement": [
                    {
                        "@type": "ListItem",
                        "position": 1,
                        "name": "LG 7,600 BTU Cool + Heat (LW8023HRSM)",
                        "url": "https://www.affordablehome-ac.com/shop/8-lg-7-600-btu-lw8023hrsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 2,
                        "name": "LG 18,000 BTU Cool + Heat (LW1823HRSM)",
                        "url": "https://www.affordablehome-ac.com/shop/9-lg-18-000-btu-lw1823hrsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 3,
                        "name": "LG 23,000 BTU Cool + Heat (LW2423HRSM)",
                        "url": "https://www.affordablehome-ac.com/shop/10-lg-23-000-btu-lw2423hrsm"
                    },
                    {
                        "@type": "ListItem",
                        "position": 4,
                        "name": "GE RAB26A 26\" Wall Casement Sleeve",
                        "url": "https://www.affordablehome-ac.com/shop/16-ge-rab26a-wall-casement"
                    }
                ]
            }
        },
        {
            "@type": "HVACBusiness",
            "@id": "https://www.affordablehome-ac.com/shop/lg-cool-and-heat-window-ac-hawaii#localbusiness",
            "parentOrganization": {
                "@id": "https://www.affordablehome-ac.com/#hvacbusiness"
            },
            "name": "Affordable Home A/C",
            "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-universal-fit-unit-photos-1600x1000/LW8023HRSM.webp",
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
