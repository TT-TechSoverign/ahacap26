import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Ductless Mini Split Free In-Home Estimate Oahu | Affordable Home A/C'
    },
    description: 'Schedule a $0 in-home mini split consultation with Oahu\'s premier licensed HVAC contractor (CT-36775). Professional room sizing, equipment placement, and installation planning.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/mini-split-estimate',
    },
    openGraph: {
        title: 'Ductless Mini Split Free In-Home Estimate Oahu | Affordable Home A/C',
        description: 'Schedule a $0 in-home mini split consultation with Oahu\'s premier licensed HVAC contractor (CT-36775). Professional room sizing, equipment placement, and installation planning.',
        url: 'https://www.affordablehome-ac.com/mini-split-estimate',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Mini Split Free In-Home Estimate Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ductless Mini Split Free In-Home Estimate Oahu | Affordable Home A/C',
        description: 'Schedule a $0 in-home mini split consultation with Oahu\'s premier licensed HVAC contractor (CT-36775). Professional room sizing, equipment placement, and installation planning.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
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
            "name": "Mini Split Estimate",
            "item": "https://www.affordablehome-ac.com/mini-split-estimate"
        }
    ]
};

const miniSplitEstimateFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Does Affordable Home AC participate in Hawaii Energy rebates for mini splits?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Affordable Home AC does not participate in Hawaii Energy rebates for our mini split division (Hawaii Energy offers 0% cash rebates for residential ductless systems). Instead, we offer upfront, honest Hawaii Contractor CT-36775 direct pricing with zero markups or phony rebate gimmicks."
            }
        },
        {
            "@type": "Question",
            "name": "What electrical panel capacity do I need for a ductless mini split on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "A single-zone mini split typically requires a dedicated 15A or 20A 208/230V breaker, while multi-zone systems draw 30A to 45A. Our technicians review power requirements and coordinate with licensed electrical subcontractors whenever dedicated 208/230V circuit wiring or panel work is needed."
            }
        },
        {
            "@type": "Question",
            "name": "How much can a high-SEER2 mini split save on Hawaii HECO electric bills?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oahu has the highest residential electricity rates in the nation (~44.2¢/kWh). Replacing an aging central AC with a 20-28 SEER2 variable-speed inverter mini split typically slashes monthly cooling costs by 40% to 50%—saving $1,200 to $2,400 annually."
            }
        },
        {
            "@type": "Question",
            "name": "How long does a typical ductless mini split installation take?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Most single-zone installations are completed in a single day (4 to 6 hours). Multi-zone installations typically require 2 to 3 days, including line-set hide fabrication, vacuum pressure decay testing, and system commissioning."
            }
        }
    ]
};

const hvacServiceSchema = {
    "@context": "https://schema.org",
    "@type": "HVACService",
    "name": "Ductless Mini Split In-Home Consultation & Estimate",
    "provider": {
        "@type": "HVACBusiness",
        "name": "Affordable Home A/C",
        "telephone": "+1-808-488-1111",
        "licenseNumber": "CT-36775",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "94-150 Leoleo St. #203",
            "addressLocality": "Waipahu",
            "addressRegion": "HI",
            "postalCode": "96797",
            "addressCountry": "US"
        }
    },
    "areaServed": "Oahu",
    "description": "Complimentary $0 in-home mini split site assessment, equipment placement planning, and upfront installation estimate across Oahu.",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Mini Split Consultations",
        "itemListElement": [
            {
                "@type": "Offer",
                "name": "In-Home Mini Split Estimate",
                "price": "0.00",
                "priceCurrency": "USD",
                "description": "$0 In-Home site assessment, unit placement, power requirement review, and upfront estimate."
            }
        ]
    }
};

export default function MiniSplitEstimateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(miniSplitEstimateFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacServiceSchema) }}
            />
            {children}
        </>
    );
}
