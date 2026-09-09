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
            {children}
        </>
    );
}
