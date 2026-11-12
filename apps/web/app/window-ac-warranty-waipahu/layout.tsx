import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '1-Yr Window AC Warranty Waipahu ($395+ LG & GE) | Local Help'
    },
    description: 'Every factory-sealed LG & GE Window AC ($395–$1,200) at our Waipahu warehouse includes a 1-Year Manufacturer Parts & Labor Warranty • Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-warranty-waipahu',
    },
    openGraph: {
        title: '1-Yr Window AC Warranty Waipahu ($395+ LG & GE) | Local Help',
        description: 'Every factory-sealed LG & GE Window AC ($395–$1,200) at our Waipahu warehouse includes a 1-Year Manufacturer Parts & Labor Warranty • Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/window-ac-warranty-waipahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Warranty Waipahu Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '1-Yr Window AC Warranty Waipahu ($395+ LG & GE) | Local Help',
        description: 'Every factory-sealed LG & GE Window AC ($395–$1,200) at our Waipahu warehouse includes a 1-Year Manufacturer Parts & Labor Warranty • Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const warrantyFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What warranty comes with LG Dual Inverter & GE Built-In window air conditioners?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Every new LG Dual Inverter & GE window AC purchased from Affordable Home A/C includes a 1-year limited manufacturer warranty on parts and labor, plus an extended limited warranty on the Dual Inverter compressor component."
            }
        },
        {
            "@type": "Question",
            "name": "Do I have to ship my broken unit to the mainland for warranty service?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No! Unlike buying online from mainland websites where returns and warranty claims require expensive ocean freight shipping, Affordable Home A/C provides local diagnostic support and bench-testing right here at our Waipahu facility (94-150 Leoleo St #203)."
            }
        },
        {
            "@type": "Question",
            "name": "What happens if my unit needs service during the warranty period?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Simply call our Waipahu office at (808) 488-1111 with your purchase receipt. Our Oahu cooling technicians can diagnose issues on-site or at our facility using authentic manufacturer replacement parts."
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
            "name": "1-Year Window AC Factory Warranty",
            "item": "https://www.affordablehome-ac.com/window-ac-warranty-waipahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/window-ac-warranty-waipahu#service",
    "name": "LG & GE Window AC Factory Warranty & Local Waipahu Support Oahu",
    "serviceType": "LG & GE Window AC Factory Warranty & Local Waipahu Support Oahu",
    "url": "https://www.affordablehome-ac.com/window-ac-warranty-waipahu",
    "description": "1-year LG parts & labor and 2-year full / 5-year sealed-system GE Built-In manufacturer warranty support backed by our local Waipahu warehouse team.",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp"
    ],
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/window-ac-warranty-waipahu#localbusiness",
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
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "142",
            "bestRating": "5",
            "worstRating": "1"
        }
    },
    "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Oahu, Hawaii"
    }
};

export default function WindowAcWarrantyLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(warrantyFaqSchema).replace(/</g, '\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pass5RichSchema).replace(/</g, '\u003c') }}
            />
            {children}
        </>
    );
}
