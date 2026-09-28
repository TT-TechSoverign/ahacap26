import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Mini Split Installation Cost Oahu 2026 | Upfront Estimates | Affordable Home A/C'
    },
    description: 'Realistic ductless mini-split installation costs for Oahu homes. Single-zone ($3,800–$5,500) and multi-zone pricing. CT-36775 licensed contractor. Schedule a $0 in-home estimate. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/mini-split-installation-cost-oahu',
    },
    openGraph: {
        title: 'Mini Split Installation Cost Oahu 2026 | Upfront Estimates | Affordable Home A/C',
        description: 'Realistic ductless mini-split installation costs for Oahu homes. Single-zone ($3,800–$5,500) and multi-zone pricing. CT-36775 licensed contractor. Schedule a $0 in-home estimate. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/mini-split-installation-cost-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Mini Split Installation Cost Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mini Split Installation Cost Oahu 2026 | Upfront Estimates | Affordable Home A/C',
        description: 'Realistic ductless mini-split installation costs for Oahu homes. Single-zone ($3,800–$5,500) and multi-zone pricing. CT-36775 licensed contractor. Schedule a $0 in-home estimate. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
    }
};

const costFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How much does a ductless mini-split cost to install on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "On Oahu, a turnkey single-zone mini-split typically ranges from $3,800 to $5,500 including equipment, line sets, electrical disconnect, and vacuum testing. Multi-zone systems (2 to 4 indoor heads) generally range from $6,800 to $14,000+ depending on line run lengths and electrical panel capacity."
            }
        },
        {
            "@type": "Question",
            "name": "Does Affordable Home AC handle municipal building permits?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "As a boutique HVAC contractor specializing in high-quality residential retrofits, Affordable Home A/C focuses strictly on mechanical craftsmanship and does not handle or guarantee municipal DPP building permits. Homeowners or general contractors coordinate municipal permitting if required for their specific building or HOA scope."
            }
        },
        {
            "@type": "Question",
            "name": "Do I have to pay anything upfront for an estimate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No! We operate strictly by appointment first with $0 upfront cost for in-home mini-split estimates. Our technician evaluates your wall structure, power requirements, and line routing, providing an itemized quote before any commitment."
            }
        },
        {
            "@type": "Question",
            "name": "Do you protect my home during installation?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our technicians always lay clean protective floor drop cloths beneath every indoor unit and workspace, ensuring your home is left cleaner than when we arrived."
            }
        }
    ]
};

const hvacServiceSchema = {
    "@context": "https://schema.org",
    "@type": "HVACService",
    "name": "Ductless Mini Split Installation & Pricing",
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
    "description": "Realistic mini-split heat pump estimates, professional single and multi-zone installation, and $0 in-home consultations across Oahu."
};

export default function MiniSplitInstallationCostLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(costFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacServiceSchema) }}
            />
            {children}
        </>
    );
}
