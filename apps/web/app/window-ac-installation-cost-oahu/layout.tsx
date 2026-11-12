import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: "Window AC & Installation Cost Oahu (2026) | $0 Free Estimate",
    },
    description: "Transparent Oahu Window AC unit ($395–$1,200) & custom jalousie, slider, bracket & 26\" wall sleeve installation cost guide. $0 Free Estimate • (808) 488-1111.",
    alternates: {
        canonical: "https://www.affordablehome-ac.com/window-ac-installation-cost-oahu",
    },
    openGraph: {
        title: "Window AC & Installation Cost Oahu (2026) | $0 Free Estimate",
        description: "Transparent Oahu Window AC unit ($395–$1,200) & custom jalousie, slider, bracket & 26\" wall sleeve installation cost guide. $0 Free Estimate • (808) 488-1111.",
        url: "https://www.affordablehome-ac.com/window-ac-installation-cost-oahu",
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
                width: 1600,
                height: 1000,
                alt: "Oahu Window AC Unit and Custom Jalousie Installation Cost Guide",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Window AC & Installation Cost Oahu (2026) | $0 Free Estimate",
        description: "Transparent Oahu Window AC unit ($395–$1,200) & custom jalousie, slider, bracket & 26\" wall sleeve installation cost guide. $0 Free Estimate • (808) 488-1111.",
        images: ["https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp"],
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why don't you charge a flat installation fee during online checkout?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Because Oahu window openings range from 15-minute ground-floor double-hung sashes to custom multi-pane jalousie acrylic fabrications, second-story brackets, and rusted 26-inch concrete condo sleeves. Quoting by appointment ($0 Free In-Home Estimate) guarantees you never overpay for a simple window and never get hit with surprise change-orders on complex openings."
            }
        },
        {
            "@type": "Question",
            "name": "Is the in-home Window AC installation estimate really $0?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes—100% free ($0) with zero upfront payment barriers. Our dispatch team speaks with you by phone first and schedules an Oahu cooling specialist to evaluate your window or wall sleeve and provide a written itemized quote."
            }
        },
        {
            "@type": "Question",
            "name": "Will you install a window AC that I already purchased?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! While most customers save time and money ordering factory-sealed LG or GE inventory directly from our Waipahu warehouse ($395–$1,200), you can also request a $0 installation estimate for a compatible factory-new window AC you already own."
            }
        },
        {
            "@type": "Question",
            "name": "Do you patch drywall or install new 230V breaker circuits?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No—we specialize strictly in Window AC & 26-inch wall-sleeve mounting, custom window infill sealing, and coil cleaning (always laying protective floor drop cloths). We do not perform drywall/stucco masonry patching, and any dedicated 208/230V electrical circuit work is handled by licensed electrical subcontractors."
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
            "name": "Window AC Installation",
            "item": "https://www.affordablehome-ac.com/window-ac-installation"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Oahu Unit & Installation Cost Guide",
            "item": "https://www.affordablehome-ac.com/window-ac-installation-cost-oahu"
        }
    ]
};

const richEntitySchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/window-ac-installation-cost-oahu#service",
    "name": "Window AC & Installation Cost Oahu (2026) | $0 Free Estimate",
    "serviceType": "Window Air Conditioner Supply & Custom Oahu Installation ($0 Free In-Home Estimate)",
    "url": "https://www.affordablehome-ac.com/window-ac-installation-cost-oahu",
    "description": "Transparent Oahu Window AC unit ($395–$1,200) & custom jalousie, slider, bracket & 26\" wall sleeve installation cost guide. $0 Free Estimate • (808) 488-1111.",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp"
    ],
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/window-ac-installation-cost-oahu#localbusiness",
        "parentOrganization": {
            "@id": "https://www.affordablehome-ac.com/#hvacbusiness"
        },
        "name": "Affordable Home A/C",
        "image": "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
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
    },
    "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Oahu, Hawaii"
    }
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
