import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Black Mold in AC: Health Risks & Removal in Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C'
    },
    description: '$0 Free Estimate • (808) 488-1111. Protect your family from black mold blowing out of your LG or GE window air conditioner in Hawaii. Understand.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/black-mold-in-ac-health-risks-hawaii',
    },
    openGraph: {
        title: 'Black Mold in AC: Health Risks & Removal in Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Protect your family from black mold blowing out of your LG or GE window air conditioner in Hawaii. Understand.',
        url: 'https://www.affordablehome-ac.com/black-mold-in-ac-health-risks-hawaii',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Black Mold in AC Health Risks Hawaii Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Black Mold in AC: Health Risks & Removal in Hawaii ($0 Estimate) | (808) 488-1111 | Affordable Home A/C',
        description: '$0 Free Estimate • (808) 488-1111. Protect your family from black mold blowing out of your LG or GE window air conditioner in Hawaii. Understand.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    }
};

const blackMoldFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What are the health risks of black mold inside an air conditioner?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "When mold colonies establish inside your AC blower wheel, mycotoxins and millions of microscopic spores are propelled into the room. This can cause persistent coughing, wheezing, watery eyes, sinus infections, chronic fatigue, and severe asthma attacks in sensitive individuals."
            }
        },
        {
            "@type": "Question",
            "name": "How do I know if black spots on my AC vents are toxic black mold?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Common HVAC molds in Oahu include Cladosporium, Penicillium, and Aspergillus. All mold types present respiratory hazards when distributed through an airstream. If you see black, fuzzy, or speckled residue along the louvers or behind the directional flaps, immediate window AC coil and blower sanitization is advised."
            }
        },
        {
            "@type": "Question",
            "name": "Does standard filter cleaning remove black mold?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Mesh filters capture larger lint and hair particles, but mold thrives behind the filter on the cold aluminum coil fins, inside the condensate pan, and deep within the cylindrical fan wheel blades. Cleaning the filters alone leaves 90% of the mold undisturbed."
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
            "name": "Window AC Cleaning",
            "item": "https://www.affordablehome-ac.com/ac-cleaning-oahu"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "Window AC Mold & Spore Remediation",
            "item": "https://www.affordablehome-ac.com/black-mold-in-ac-health-risks-hawaii"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/black-mold-in-ac-health-risks-hawaii#service",
    "name": "Black Mold in AC: Health Risks & Removal in Hawaii ($0 Estimate)",
    "serviceType": "Black Mold in AC: Health Risks & Removal in Hawaii ($0 Estimate)",
    "url": "https://www.affordablehome-ac.com/black-mold-in-ac-health-risks-hawaii",
    "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp",
    "description": "$0 Free Estimate • (808) 488-1111. Protect your family from black mold blowing out of your LG or GE window air conditioner in Hawaii. Understand.",
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

export default function BlackMoldAcLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blackMoldFaqSchema) }}
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
