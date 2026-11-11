import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'AC Dripping Water Inside House Repair Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC leaking water inside your home on Oahu? Stop drywall damage immediately. Expert algae.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ac-dripping-water-inside-house-repair',
    },
    openGraph: {
        title: 'AC Dripping Water Inside House Repair Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC leaking water inside your home on Oahu? Stop drywall damage immediately. Expert algae.',
        url: 'https://www.affordablehome-ac.com/ac-dripping-water-inside-house-repair',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'AC Dripping Water Inside House Repair Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'AC Dripping Water Inside House Repair Oahu ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC leaking water inside your home on Oahu? Stop drywall damage immediately. Expert algae.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const drippingFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Why is water dripping from my window AC inside my house?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "In Hawaii's humid climate, air conditioners pull gallons of water from the air each day. The most common cause of indoor water leaks is a clogged condensate drain line choked with algae slime. Other common causes include an unlevel mounting bracket, a cracked drain pan, or frozen evaporator coils that melt faster than the pan can drain."
            }
        },
        {
            "@type": "Question",
            "name": "How does Affordable Home AC fix indoor AC leaks?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our Oahu cooling technicians inspect the condensate drain pan, flush and clear the gravity drain line using vacuum extraction and dedicated line flushing, verify the mounting pitch with a digital level, and apply antimicrobial pan treatments to prevent future algae clogs."
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
            "name": "Window AC Repair & Assessment",
            "item": "https://www.affordablehome-ac.com/ac-repair-oahu"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Window AC Leaking Water Inside Fix",
            "item": "https://www.affordablehome-ac.com/ac-dripping-water-inside-house-repair"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/ac-dripping-water-inside-house-repair#service",
    "name": "AC Dripping Water Inside House Repair Oahu ($0 Estimate)",
    "serviceType": "AC Dripping Water Inside House Repair Oahu ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/ac-dripping-water-inside-house-repair",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Is your LG or GE window AC leaking water inside your home on Oahu? Stop drywall damage immediately. Expert algae.",
    "provider": {
        "@type": "HVACBusiness",
        "name": "Affordable Home A/C",
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
        }
    },
    "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Oahu, Hawaii"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Oahu Window AC Services & In-Stock Replacements",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "$0 Free In-Home Window AC Estimate & Clean-vs-Replace Assessment (By Appointment First)"
                },
                "price": "0.00",
                "priceCurrency": "USD"
            },
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Product",
                    "name": "In-Stock LG Dual Inverter & GE 26-Inch Built-In Window ACs ($395–$1,200)"
                },
                "priceSpecification": {
                    "@type": "PriceSpecification",
                    "minPrice": "395.00",
                    "maxPrice": "1200.00",
                    "priceCurrency": "USD"
                }
            }
        ]
    }
};

export default function AcDrippingWaterLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(drippingFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pass5RichSchema) }}
            />
            {children}
        </>
    );
}
