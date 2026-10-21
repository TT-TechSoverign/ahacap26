import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'In-Stock Window Air Conditioners Oahu ($395–$1,200) | Waipahu Pickup & $50 Delivery | Affordable Home A/C',
    },
    description: 'Shop in-stock LG Dual Inverter (6,000–23,500 BTU, -$45 Rebate), LG Cool+Heat, and GE 26" Wall Sleeve window air conditioners in Oahu ($395–$1,200). Free Waipahu warehouse pickup, $50 flat delivery & professional installation.',
    alternates: {
        canonical: '/shop',
    },
    openGraph: {
        title: 'In-Stock Window Air Conditioners Oahu ($395–$1,200) | Waipahu Pickup & $50 Delivery | Affordable Home A/C',
        description: 'Shop in-stock LG Dual Inverter (6,000–23,500 BTU, -$45 Rebate), LG Cool+Heat, and GE 26" Wall Sleeve window air conditioners in Oahu ($395–$1,200). Free Waipahu warehouse pickup, $50 flat delivery & professional installation.',
        url: '/shop',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'In-Stock LG Dual Inverter & GE Window Air Conditioners in Waipahu, Oahu ($395–$1,200)',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'In-Stock Window Air Conditioners Oahu ($395–$1,200) | Waipahu Pickup & $50 Delivery | Affordable Home A/C',
        description: 'Shop in-stock LG Dual Inverter (6,000–23,500 BTU, -$45 Rebate), LG Cool+Heat, and GE 26" Wall Sleeve window air conditioners in Oahu ($395–$1,200). Free Waipahu warehouse pickup, $50 flat delivery & professional installation.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
    const domain = process.env.NEXT_PUBLIC_URL || 'https://www.affordablehome-ac.com';

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BreadcrumbList",
                        "itemListElement": [
                            {
                                "@type": "ListItem",
                                "position": 1,
                                "name": "Home",
                                "item": `${domain}/`
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Shop",
                                "item": `${domain}/shop`
                            }
                        ]
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "CollectionPage",
                        "@id": `${domain}/shop#collection`,
                        "url": `${domain}/shop`,
                        "name": "Oahu In-Stock LG & GE Window Air Conditioners ($395–$1,200)",
                        "description": "In-stock LG Dual Inverter, LG Cool+Heat, and GE 26-inch Built-In window and wall air conditioners in Waipahu, Oahu ($395–$1,200). Free Waipahu warehouse pickup by appointment, $50 flat island-wide delivery, and $45 Hawaii Energy cash rebate.",
                        "provider": {
                            "@id": `${domain}/#hvacbusiness`
                        },
                        "potentialAction": {
                            "@type": "OrderAction",
                            "name": "Order In-Stock LG & GE Window AC Units Online on Oahu",
                            "target": `${domain}/shop`
                        }
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "ItemList",
                        "name": "Oahu In-Stock Window Air Conditioners Catalog",
                        "description": "Live catalog of 16 in-stock LG Dual Inverter and GE window air conditioners at our Waipahu warehouse (94-150 Leoleo St. #203, Waipahu, HI 96797).",
                        "numberOfItems": 16,
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "LG Dual Inverter 6,000 BTU (LW6023IVSM)", "url": `${domain}/shop/1-lg-dual-inverter-6-000-btu-lw6023ivsm` },
                            { "@type": "ListItem", "position": 2, "name": "LG Dual Inverter 8,000 BTU (LW8022IVSM)", "url": `${domain}/shop/2-lg-dual-inverter-8-000-btu-lw8022ivsm` },
                            { "@type": "ListItem", "position": 3, "name": "LG Dual Inverter 10,000 BTU (LW1022IVSM)", "url": `${domain}/shop/3-lg-dual-inverter-10-000-btu-lw1022ivsm` },
                            { "@type": "ListItem", "position": 4, "name": "LG Dual Inverter 12,000 BTU (LW1222IVSM)", "url": `${domain}/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm` },
                            { "@type": "ListItem", "position": 5, "name": "LG Dual Inverter 14,000 BTU (LW1522FVSM)", "url": `${domain}/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm` },
                            { "@type": "ListItem", "position": 6, "name": "LG Dual Inverter 18,000 BTU (LW1822IVSM)", "url": `${domain}/shop/6-lg-dual-inverter-18-000-btu-lw1822ivsm` },
                            { "@type": "ListItem", "position": 7, "name": "LG Dual Inverter 23,500 BTU (LW2422IVSM)", "url": `${domain}/shop/7-lg-dual-inverter-23-500-btu-lw2422ivsm` },
                            { "@type": "ListItem", "position": 8, "name": "LG 7,600 BTU Cool + Heat (LW8023HRSM)", "url": `${domain}/shop/8-lg-7-600-btu-lw8023hrsm` },
                            { "@type": "ListItem", "position": 9, "name": "LG 18,000 BTU Cool + Heat (LW1823HRSM)", "url": `${domain}/shop/9-lg-18-000-btu-lw1823hrsm` },
                            { "@type": "ListItem", "position": 10, "name": "LG 23,000 BTU Cool + Heat (LW2423HRSM)", "url": `${domain}/shop/10-lg-23-000-btu-lw2423hrsm` },
                            { "@type": "ListItem", "position": 11, "name": "LG 8,000 BTU Standard (LW8024RD)", "url": `${domain}/shop/11-lg-8-000-btu-lw8024rd` },
                            { "@type": "ListItem", "position": 12, "name": "LG 12,000 BTU Universal Fit (LW1217ERSM1)", "url": `${domain}/shop/12-lg-12-000-btu-lw1217ersm1` },
                            { "@type": "ListItem", "position": 13, "name": "GE 8,200 BTU 26\" Built-In (AJCQ08AWJ)", "url": `${domain}/shop/13-ge-8-200-btu-ajcq08awj` },
                            { "@type": "ListItem", "position": 14, "name": "GE 10,000 BTU 26\" Built-In (AJCQ10AWJ)", "url": `${domain}/shop/14-ge-10-000-btu-ajcq10awj` },
                            { "@type": "ListItem", "position": 15, "name": "GE 12,000 BTU R-32 Inverter 26\" Built-In (AJCQ12AXXWA)", "url": `${domain}/shop/15-ge-12-000-btu-ajcq12axxwa` },
                            { "@type": "ListItem", "position": 16, "name": "GE RAB26A 26\" Wall Casement Sleeve", "url": `${domain}/shop/16-ge-rab26a-wall-casement` }
                        ]
                    })
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": [
                            {
                                "@type": "Question",
                                "name": "Where can I order an in-stock LG Dual Inverter or GE window AC on Oahu?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "You can order brand-new, factory-sealed LG Dual Inverter and GE 26-inch Built-In window air conditioners ($395–$1,200) directly online at Affordable Home A/C (affordablehome-ac.com/shop) or by calling (808) 488-1111. All in-stock units are staged at our Waipahu warehouse (94-150 Leoleo St. #203, Waipahu, HI 96797) for Free Waipahu Pickup by appointment or $50 flat-rate Oahu curbside delivery."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Which window AC units qualify for the $45 Hawaii Energy cash rebate?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "All ENERGY STAR certified LG Dual Inverter window air conditioners (6,000 to 23,500 BTU) and the GE AJCQ12AXXWA Variable Speed Inverter qualify for the $45 Hawaii Energy cash rebate and save up to $424.32 per year at HECO's ~44.2¢/kWh residential rate. Every qualifying purchase includes our official Hawaii Energy rebate application form."
                                }
                            },
                            {
                                "@type": "Question",
                                "name": "Do you offer professional Oahu window AC installation and jalousie window retrofits?",
                                "acceptedAnswer": {
                                    "@type": "Answer",
                                    "text": "Yes. Affordable Home A/C provides $0 Free In-Home Estimates for standard horizontal/vertical slider window installations, custom Hawaiian jalousie louver acrylic baffle retrofits, exterior structural brackets, and 26-inch GE built-in wall sleeve replacements with protective floor drop cloths."
                                }
                            }
                        ]
                    })
                }}
            />
            {children}
        </>
    );
}
