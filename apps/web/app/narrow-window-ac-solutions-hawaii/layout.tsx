import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Narrow Window AC Solutions Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Compact window air conditioners designed to fit narrow window openings under 22 inches wide on Oahu. Custom.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/narrow-window-ac-solutions-hawaii',
    },
    openGraph: {
        title: 'Narrow Window AC Solutions Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Compact window air conditioners designed to fit narrow window openings under 22 inches wide on Oahu. Custom.',
        url: 'https://www.affordablehome-ac.com/narrow-window-ac-solutions-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Narrow Window AC Solutions Hawaii',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Narrow Window AC Solutions Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Compact window air conditioners designed to fit narrow window openings under 22 inches wide on Oahu. Custom.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const narrowWindowFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the smallest window width that can fit an air conditioner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "By removing standard side accordion curtains and using our custom narrow-mounting brackets, our compact 6,000 BTU LG Dual Inverter or GE Built-In unit (chassis width 19.5 inches) can fit into window openings as narrow as 20 to 21 inches wide."
            }
        },
        {
            "@type": "Question",
            "name": "Can you install an AC in a tall, narrow slider or casement window?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! For tall, skinny openings, we build custom acrylic or insulated vertical filler panels above the unit, sealing the vertical height while fitting the narrow width perfectly."
            }
        },
        {
            "@type": "Question",
            "name": "Does a narrow window AC provide enough cooling for an Oahu bedroom?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! A compact 6,000 to 8,000 BTU Dual Inverter unit delivers ample cooling power for bedrooms up to 350 sq ft, while running quietly at 44 dB."
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
            "name": "Narrow Window AC Fit Solutions",
            "item": "https://www.affordablehome-ac.com/narrow-window-ac-solutions-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/narrow-window-ac-solutions-hawaii#service",
    "name": "Narrow Window AC Solutions Hawaii ($0 Estimate)",
    "serviceType": "Narrow Window AC Solutions Hawaii ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/narrow-window-ac-solutions-hawaii",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Compact window air conditioners designed to fit narrow window openings under 22 inches wide on Oahu. Custom.",
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

export default function NarrowWindowAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(narrowWindowFaqSchema) }}
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
