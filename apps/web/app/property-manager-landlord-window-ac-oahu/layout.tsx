import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: "Oahu Property Manager & Landlord Window ACs | Waipahu Supply",
    },
    description: "Fast tenant-turnover LG & GE Window ACs ($395–$1,200), 26\" condo wall sleeves ($275), custom install & coil cleaning for Oahu landlords • Call (808) 488-1111.",
    alternates: {
        canonical: "https://www.affordablehome-ac.com/property-manager-landlord-window-ac-oahu",
    },
    openGraph: {
        title: "Oahu Property Manager & Landlord Window ACs | Waipahu Supply",
        description: "Fast tenant-turnover LG & GE Window ACs ($395–$1,200), 26\" condo wall sleeves ($275), custom install & coil cleaning for Oahu landlords • Call (808) 488-1111.",
        url: "https://www.affordablehome-ac.com/property-manager-landlord-window-ac-oahu",
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
                width: 1600,
                height: 1000,
                alt: "Oahu Property Manager, Resident Manager and Landlord Window AC Warehouse Supply Waipahu",
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Oahu Property Manager & Landlord Window ACs | Waipahu Supply",
        description: "Fast tenant-turnover LG & GE Window ACs ($395–$1,200), 26\" condo wall sleeves ($275), custom install & coil cleaning for Oahu landlords • Call (808) 488-1111.",
        images: ["https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp"],
    },
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Do you provide itemized receipts showing Hawaii GET tax for property-management accounting?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Every online order and service invoice includes a clean, itemized receipt breaking out equipment pricing, optional $50 Oahu delivery, and exact 4.712% Oahu General Excise Tax (GET) for owner statements and Schedule E records."
            }
        },
        {
            "@type": "Question",
            "name": "Can an off-island landlord order a replacement AC or schedule an estimate for an Oahu tenant?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Absolutely. Off-island owners and Honolulu property managers routinely coordinate through us. Request a $0 Free In-Home Estimate online or call (808) 488-1111—our dispatch desk contacts your tenant to arrange the window inspection and sends you the itemized quote for approval before work begins."
            }
        },
        {
            "@type": "Question",
            "name": "Which model has the longest factory warranty for condo rentals?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our GE 26-inch Built-In Through-the-Wall series (AJCQ08AWJ $1,000, AJCQ10AWJ $1,100, and AJCQ12AXXWA $1,200) includes an industry-leading 2-Year Full Parts & Labor / 5-Year Sealed System manufacturer warranty, while all LG models include a 1-Year Parts & Labor manufacturer warranty."
            }
        },
        {
            "@type": "Question",
            "name": "Can our building maintenance staff pick up multiple units at your Waipahu warehouse?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Place your order online to reserve live inventory and select Free Waipahu Warehouse Pickup by appointment at 94-150 Leoleo St. #203, Waipahu, HI 96797. Our team stages your cartons upright for fast loading into pickup trucks or cargo vans."
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
            "name": "Commercial Window ACs Oahu",
            "item": "https://www.affordablehome-ac.com/commercial-window-ac-oahu"
        },
        {
            "@type": "ListItem",
            "position": 4,
            "name": "Property Manager & Landlord Supply",
            "item": "https://www.affordablehome-ac.com/property-manager-landlord-window-ac-oahu"
        }
    ]
};

const richEntitySchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/property-manager-landlord-window-ac-oahu#service",
    "name": "Oahu Property Manager & Landlord Window ACs | Waipahu Supply",
    "serviceType": "Multi-Unit Residential & Commercial Window AC Supply, Installation & Sanitization Oahu",
    "url": "https://www.affordablehome-ac.com/property-manager-landlord-window-ac-oahu",
    "description": "Fast tenant-turnover LG & GE Window ACs ($395–$1,200), 26\" condo wall sleeves ($275), custom install & coil cleaning for Oahu landlords • Call (808) 488-1111.",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp"
    ],
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/property-manager-landlord-window-ac-oahu#localbusiness",
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
