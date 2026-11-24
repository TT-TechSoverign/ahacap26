import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: "LG vs. GE Window & 26\" Wall ACs Hawaii | Oahu Buyer Guide",
    },
    description: "Compare in-stock LG Dual Inverter ($560–$1,025) vs. GE 26\" Built-In Wall ACs ($1,000–$1,200) in Waipahu, Oahu. Window vs. condo sleeve fit • (808) 488-1111.",
    alternates: {
        canonical: "https://www.affordablehome-ac.com/shop/lg-vs-ge-window-ac-hawaii",
    },
    openGraph: {
        title: "LG vs. GE Window & 26\" Wall ACs Hawaii | Oahu Buyer Guide",
        description: "Compare in-stock LG Dual Inverter ($560–$1,025) vs. GE 26\" Built-In Wall ACs ($1,000–$1,200) in Waipahu, Oahu. Window vs. condo sleeve fit • (808) 488-1111.",
        url: "https://www.affordablehome-ac.com/shop/lg-vs-ge-window-ac-hawaii",
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
                width: 1600,
                height: 1000,
                alt: "LG Dual Inverter Window AC vs GE 26-Inch Built-In Wall AC Comparison Oahu",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "LG vs. GE Window & 26\" Wall ACs Hawaii | Oahu Buyer Guide",
        description: "Compare in-stock LG Dual Inverter ($560–$1,025) vs. GE 26\" Built-In Wall ACs ($1,000–$1,200) in Waipahu, Oahu. Window vs. condo sleeve fit • (808) 488-1111.",
        images: ["https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp"],
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can I put a standard LG Dual Inverter window AC inside a 26-inch concrete condo wall sleeve?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No—standard LG Dual Inverter window ACs draw condenser air through side and top cabinet louvers. Sliding a side-vented window chassis inside a solid concrete or wood condo wall sleeve blocks condenser airflow, causing hot exhaust air to recirculate and trip thermal overload. For enclosed 26-inch wall sleeves, choose a solid-side rear-breathing GE AJCQ Built-In (such as the GE AJCQ12AXXWA R-32 Inverter or AJCQ08AWJ)."
            }
        },
        {
            "@type": "Question",
            "name": "When is LG Dual Inverter better than GE for an Oahu home?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For any true window installation—Hawaiian jalousie glass louvers, horizontal sliding windows, or double-hung wood/vinyl sash frames—LG Dual Inverter is our #1 choice: quieter sleep operation (44 dB vs. 48–55 dB), higher energy efficiency (14.5–15.5 CEER vs. 10.5–10.6 CEER on HECO's 44.2¢/kWh grid), lower upfront cost ($560–$1,025), and capacities up to 23,500 BTU."
            }
        },
        {
            "@type": "Question",
            "name": "Do both LG Dual Inverter and GE Built-In inverter models qualify for the $45 Hawaii Energy rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, on qualifying ENERGY STAR inverter models! All 7 LG Dual Inverter models (LW6023IVSM–LW2422IVSM) and the 12,000 BTU GE AJCQ12AXXWA R-32 Variable-Speed Built-In Inverter ($1,200) qualify for the $45 Hawaii Energy cash rebate. Non-inverter GE AJCQ08AWJ/AJCQ10AWJ and LG Standard/Cool+Heat units do not carry the $45 rebate."
            }
        },
        {
            "@type": "Question",
            "name": "What warranty difference exists between LG and GE units at your Waipahu warehouse?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "LG Window ACs carry a 1-Year Parts & Labor manufacturer warranty (with 10-year compressor coverage on Dual Inverter models), while GE AJCQ 26-inch Built-In Through-the-Wall units carry an upgraded 2-Year Full Parts & Labor plus 5-Year Sealed Refrigerant System manufacturer warranty."
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
            "name": "LG vs. GE Window & Wall AC Comparison",
            "item": "https://www.affordablehome-ac.com/shop/lg-vs-ge-window-ac-hawaii"
        }
    ]
};

const richEntitySchema = {
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "CollectionPage",
            "@id": "https://www.affordablehome-ac.com/shop/lg-vs-ge-window-ac-hawaii#collection",
            "url": "https://www.affordablehome-ac.com/shop/lg-vs-ge-window-ac-hawaii",
            "name": "LG vs. GE Window & 26\" Wall ACs Hawaii | Oahu Engineering Comparison",
            "description": "Compare in-stock LG Dual Inverter ($560–$1,025) vs. GE 26\" Built-In Wall ACs ($1,000–$1,200) in Waipahu, Oahu. Window vs. condo sleeve fit • (808) 488-1111.",
            "mainEntity": {
                "@type": "ItemList",
                "name": "Flagship LG Window vs. GE 26-Inch Built-In Models — Waipahu Oahu",
                "numberOfItems": 6,
                "itemListElement": [
                    { "@type": "ListItem", "position": 1, "name": "LG Dual Inverter 12,000 BTU (LW1222IVSM)", "url": "https://www.affordablehome-ac.com/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm" },
                    { "@type": "ListItem", "position": 2, "name": "GE 12,000 BTU R-32 Inverter 26\" Built-In (AJCQ12AXXWA)", "url": "https://www.affordablehome-ac.com/shop/15-ge-12-000-btu-ajcq12axxwa" },
                    { "@type": "ListItem", "position": 3, "name": "LG Dual Inverter 14,000 BTU 115V (LW1522FVSM)", "url": "https://www.affordablehome-ac.com/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm" },
                    { "@type": "ListItem", "position": 4, "name": "GE 8,200 BTU 26\" Built-In (AJCQ08AWJ)", "url": "https://www.affordablehome-ac.com/shop/13-ge-8-200-btu-ajcq08awj" },
                    { "@type": "ListItem", "position": 5, "name": "LG 8,000 BTU Standard Value (LW8024RD)", "url": "https://www.affordablehome-ac.com/shop/11-lg-8-000-btu-lw8024rd" },
                    { "@type": "ListItem", "position": 6, "name": "GE RAB26A 26\" Galvanized Steel Wall Sleeve", "url": "https://www.affordablehome-ac.com/shop/16-ge-rab26a-wall-casement" }
                ]
            }
        },
        {
            "@type": "HVACBusiness",
            "@id": "https://www.affordablehome-ac.com/shop/lg-vs-ge-window-ac-hawaii#localbusiness",
            "parentOrganization": {
                "@id": "https://www.affordablehome-ac.com/#hvacbusiness"
            },
            "name": "Affordable Home A/C",
            "image": "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
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

export default function LgVsGeHawaiiLayout({ children }: { children: React.ReactNode }) {
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
