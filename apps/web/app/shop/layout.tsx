import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Window Air Conditioner Oahu & Shop Near Me | Affordable Home A/C',
    description: 'Looking for a window air conditioner Oahu? Our local ac shop near me stocks the LG Dual Inverter LW6023IVSM and provides professional window ac installation near me.',
    alternates: {
        canonical: '/shop',
    },
    openGraph: {
        title: 'Window Air Conditioner Oahu & Shop Near Me | Affordable Home A/C',
        description: 'Looking for a window air conditioner Oahu? Our local ac shop near me stocks the LG Dual Inverter LW6023IVSM and provides professional window ac installation near me.',
        url: '/shop',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Affordable Home A/C Logo',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window Air Conditioner Oahu & Shop Near Me | Affordable Home A/C',
        description: 'Looking for a window air conditioner Oahu? Our local ac shop near me stocks the LG Dual Inverter LW6023IVSM and provides professional window ac installation near me.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
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
                        "name": "Oahu In-Stock Window Air Conditioners & Supplies",
                        "description": "In-stock LG Dual Inverter, GE, and universal-fit window air conditioners available for Waipahu warehouse pickup and $50 flat island-wide delivery.",
                        "provider": {
                            "@id": `${domain}/#hvacbusiness`
                        },
                        "aggregateRating": {
                            "@type": "AggregateRating",
                            "ratingValue": "4.9",
                            "reviewCount": "142",
                            "bestRating": "5",
                            "worstRating": "1"
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
                        "description": "Live catalog of in-stock LG Dual Inverter and GE window air conditioners in Waipahu, Oahu.",
                        "numberOfItems": 16,
                        "itemListElement": [
                            { "@type": "ListItem", "position": 1, "name": "LG Dual Inverter 6,000 BTU (LW6023IVSM)", "url": `${domain}/shop/1-lg-dual-inverter-6-000-btu-lw6023ivsm` },
                            { "@type": "ListItem", "position": 2, "name": "LG Dual Inverter 8,000 BTU (LW8022IVSM)", "url": `${domain}/shop/2-lg-dual-inverter-8-000-btu-lw8022ivsm` },
                            { "@type": "ListItem", "position": 3, "name": "LG Dual Inverter 10,000 BTU (LW1022IVSM)", "url": `${domain}/shop/3-lg-dual-inverter-10-000-btu-lw1022ivsm` },
                            { "@type": "ListItem", "position": 4, "name": "LG Dual Inverter 12,000 BTU (LW1222IVSM)", "url": `${domain}/shop/4-lg-dual-inverter-12-000-btu-lw1222ivsm` },
                            { "@type": "ListItem", "position": 5, "name": "LG Dual Inverter 14,000 BTU (LW1522FVSM)", "url": `${domain}/shop/5-lg-dual-inverter-14-000-btu-lw1522fvsm` },
                            { "@type": "ListItem", "position": 6, "name": "LG Dual Inverter 18,000 BTU (LW1822IVSM)", "url": `${domain}/shop/6-lg-dual-inverter-18-000-btu-lw1822ivsm` },
                            { "@type": "ListItem", "position": 7, "name": "LG Dual Inverter 23,500 BTU (LW2422IVSM)", "url": `${domain}/shop/7-lg-dual-inverter-23-500-btu-lw2422ivsm` },
                            { "@type": "ListItem", "position": 8, "name": "LG 7,600 BTU (LW8023HRSM)", "url": `${domain}/shop/8-lg-7-600-btu-lw8023hrsm` },
                            { "@type": "ListItem", "position": 9, "name": "LG 18,000 BTU (LW1823HRSM)", "url": `${domain}/shop/9-lg-18-000-btu-lw1823hrsm` },
                            { "@type": "ListItem", "position": 10, "name": "LG 23,000 BTU (LW2423HRSM)", "url": `${domain}/shop/10-lg-23-000-btu-lw2423hrsm` },
                            { "@type": "ListItem", "position": 11, "name": "LG 8,000 BTU (LW8024RD)", "url": `${domain}/shop/11-lg-8-000-btu-lw8024rd` },
                            { "@type": "ListItem", "position": 12, "name": "LG 12,000 BTU (LW1217ERSM1)", "url": `${domain}/shop/12-lg-12-000-btu-lw1217ersm1` },
                            { "@type": "ListItem", "position": 13, "name": "GE 8,200 BTU (AJCQ08AWJ)", "url": `${domain}/shop/13-ge-8-200-btu-ajcq08awj` },
                            { "@type": "ListItem", "position": 14, "name": "GE 10,000 BTU (AJCQ10AWJ)", "url": `${domain}/shop/14-ge-10-000-btu-ajcq10awj` },
                            { "@type": "ListItem", "position": 15, "name": "GE 12,000 BTU (AJCQ12AWJ)", "url": `${domain}/shop/15-ge-12-000-btu-ajcq12awj` },
                            { "@type": "ListItem", "position": 16, "name": "GE RAB26A Wall Casement", "url": `${domain}/shop/16-ge-rab26a-wall-casement` }
                        ]
                    })
                }}
            />
            {children}
        </>
    );
}
