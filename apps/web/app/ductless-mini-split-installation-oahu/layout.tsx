import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Ductless Mini Split Installation Oahu | $0 Free Estimate • Lic #CT-36775 | Affordable Home A/C'
    },
    description: 'Expert ductless mini split installation across Oahu. Single-zone & multi-zone Mitsubishi, Fujitsu, Daikin & LG systems. $0 Free In-Home Estimate • Lic #CT-36775 • Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/ductless-mini-split-installation-oahu',
    },
    openGraph: {
        title: 'Ductless Mini Split Installation Oahu | $0 Free Estimate • Lic #CT-36775 | Affordable Home A/C',
        description: 'Expert ductless mini split installation across Oahu. Single-zone & multi-zone Mitsubishi, Fujitsu, Daikin & LG systems. $0 Free In-Home Estimate • Lic #CT-36775 • Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/ductless-mini-split-installation-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Ductless Mini Split Installation Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Ductless Mini Split Installation Oahu | $0 Free Estimate • Lic #CT-36775 | Affordable Home A/C',
        description: 'Expert ductless mini split installation across Oahu. Single-zone & multi-zone Mitsubishi, Fujitsu, Daikin & LG systems. $0 Free In-Home Estimate • Lic #CT-36775 • Call (808) 488-1111.',
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
            "name": "Ductless Mini Split Installation",
            "item": "https://www.affordablehome-ac.com/ductless-mini-split-installation-oahu"
        }
    ]
};

const miniSplitFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Does Hawaii Energy offer rebates on mini splits?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "No. Hawaii Energy currently offers 0% cash rebates on residential ductless mini-split systems. Beware of contractors inflating estimates to show fake rebates. We provide honest direct contractor pricing."
            }
        },
        {
            "@type": "Question",
            "name": "How do I get a quote for a ductless mini split installation on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Every Oahu home has unique line-set routing, electrical panel capacity, and zone requirements. We provide a $0 Free In-Home Estimate with an itemized quote by a licensed technician (CT-36775) before any work begins."
            }
        },
        {
            "@type": "Question",
            "name": "Do you lay floor drop cloths during installation?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Our licensed technicians always lay clean protective drop cloths beneath all indoor units and ensure your home is left cleaner than when we arrived."
            }
        }
    ]
};

const hvacServiceSchema = {
    "@context": "https://schema.org",
    "@type": "HVACService",
    "name": "Ductless Mini Split Heat Pump Installation",
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
    "description": "High-efficiency ductless mini-split heat pump installation, multi-zone engineering, and clean jobsite guarantee across Oahu."
};

export default function DuctlessMiniSplitInstallationOahuLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(miniSplitFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacServiceSchema) }}
            />
            {children}
        </>
    );
}
