import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '22 Oahu AC Service Areas | In-Stock Window ACs ($395+) & $0 Mini-Split Estimate | Affordable Home A/C',
    },
    description: 'Affordable Home A/C serves 22 Oahu communities with in-stock LG & GE Window ACs ($395–$1,200), ductless mini-split installation ($0 Free Estimate), mini-split deep cleaning, and AC repair. Lic #CT-36775 • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/service-areas',
    },
    openGraph: {
        title: '22 Oahu AC Service Areas | In-Stock Window ACs ($395+) & $0 Mini-Split Estimate | Affordable Home A/C',
        description: 'Affordable Home A/C serves 22 Oahu communities with in-stock LG & GE Window ACs ($395–$1,200), ductless mini-split installation ($0 Free Estimate), mini-split deep cleaning, and AC repair. Lic #CT-36775 • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/service-areas',
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
        title: '22 Oahu AC Service Areas | In-Stock Window ACs ($395+) & $0 Mini-Split Estimate | Affordable Home A/C',
        description: 'Affordable Home A/C serves 22 Oahu communities with in-stock LG & GE Window ACs ($395–$1,200), ductless mini-split installation ($0 Free Estimate), mini-split deep cleaning, and AC repair. Lic #CT-36775 • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

export default function ServiceAreasLayout({ children }: { children: React.ReactNode }) {
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
                                "item": "https://www.affordablehome-ac.com"
                            },
                            {
                                "@type": "ListItem",
                                "position": 2,
                                "name": "Service Areas",
                                "item": "https://www.affordablehome-ac.com/service-areas"
                            }
                        ]
                    })
                }}
            />
            {children}
        </>
    );
}
