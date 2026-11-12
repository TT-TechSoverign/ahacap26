import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Replacement Oahu ($0 Estimate) | In-Stock $395+'
    },
    description: '$0 Free Estimate • (808) 488-1111. Replace loud, rusted Oahu Window ACs with in-stock LG Dual Inverter or GE 26" Built-In units ($395–$1,200, $45 Rebate).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-replacement-oahu',
    },
    openGraph: {
        title: 'Window AC Replacement Oahu ($0 Estimate) | In-Stock $395+',
        description: '$0 Free Estimate • (808) 488-1111. Replace loud, rusted Oahu Window ACs with in-stock LG Dual Inverter or GE 26" Built-In units ($395–$1,200, $45 Rebate).',
        url: 'https://www.affordablehome-ac.com/window-ac-replacement-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Replacement Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Replacement Oahu ($0 Estimate) | In-Stock $395+',
        description: '$0 Free Estimate • (808) 488-1111. Replace loud, rusted Oahu Window ACs with in-stock LG Dual Inverter or GE 26" Built-In units ($395–$1,200, $45 Rebate).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const replacementFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "When should I replace my window AC instead of cleaning or repairing it?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "If your window AC is over 4 to 5 years old, has severe chassis rust from salt air, is making loud bearing grinding noises, or is an older non-inverter unit driving up your HECO bill, replacing it with an LG Dual Inverter ($560 to $1,025) is far more economical than expensive component repairs."
            }
        },
        {
            "@type": "Question",
            "name": "Can you haul away and dispose of my old window AC?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! When you book our professional installation service with your new unit, our Oahu cooling technicians can safely remove and haul away your old rusted air conditioner for certified eco-friendly recycling."
            }
        },
        {
            "@type": "Question",
            "name": "Will the new window unit fit my existing opening?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians measure your window or jalousie opening to ensure proper fitment. We install new side accordion panels or custom filler materials to guarantee an airtight, insect-proof seal."
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
            "name": "Window AC Replacement & Upgrade",
            "item": "https://www.affordablehome-ac.com/window-ac-replacement-oahu"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/window-ac-replacement-oahu#service",
    "name": "Window AC & 26-Inch Wall Sleeve Replacement Service Oahu ($0 Estimate)",
    "serviceType": "Window AC & 26-Inch Wall Sleeve Replacement Service Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/window-ac-replacement-oahu",
    "description": "Same-week Oahu window AC and 26-inch condo wall-sleeve replacement with in-stock LG & GE units ($395–$1,200), custom jalousie fitting, and protective floor drop cloths.",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp"
    ],
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/window-ac-replacement-oahu#localbusiness",
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

export default function WindowAcReplacementLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(replacementFaqSchema).replace(/</g, '\u003c') }}
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
