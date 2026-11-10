import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Jalousie Window AC Installation Oahu ($0 Estimate) | Custom Louver Fit | (808) 488-1111'
    },
    description: '$0 Free Estimate • (808) 488-1111. Custom Hawaiian jalousie glass louver Window AC installation, weatherproof panels, brackets & in-stock LG/GE ACs ($395+).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/jalousie-window-ac-installation-oahu',
    },
    openGraph: {
        title: 'Jalousie Window AC Installation Oahu ($0 Estimate) | Custom Louver Fit | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Custom Hawaiian jalousie glass louver Window AC installation, weatherproof panels, brackets & in-stock LG/GE ACs ($395+).',
        url: 'https://www.affordablehome-ac.com/jalousie-window-ac-installation-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp',
                width: 1600,
                height: 1000,
                alt: 'Jalousie Window AC Installation Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Jalousie Window AC Installation Oahu ($0 Estimate) | Custom Louver Fit | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Custom Hawaiian jalousie glass louver Window AC installation, weatherproof panels, brackets & in-stock LG/GE ACs ($395+).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp'],
    }
};

const jalousieFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "Can you install a window AC in jalousie louver windows in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Jalousie installations are our specialty. Our experienced technicians remove only the necessary glass slats, install custom-cut marine-grade acrylic baffles and weather seals, and ensure zero mechanical weight is placed on the delicate louver tracks."
            }
        },
        {
            "@type": "Question",
            "name": "Are custom fabrication options and security brackets available?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Custom fabrication options and security brackets are available for an additional cost with installation. During installation, our technician inspects your sill and framing to ensure your installation is safe, secure, and weatherproof."
            }
        },
        {
            "@type": "Question",
            "name": "What is your floor drop-cloth guarantee?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our technicians lay clean protective drop cloths directly under the window workspace to catch glass dust, acrylic shavings, or debris. We vacuum the work area and ensure your home is left cleaner than when we arrived."
            }
        }
    ]
};

const hvacServiceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Jalousie Window AC Installation",
    "name": "Jalousie Window AC Installation & Custom Fabrication",
    "provider": {
        "@type": "HVACBusiness",
        "name": "Affordable Home A/C",
        "telephone": "+1-808-488-1111",
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
    "description": "Specialized LG & GE window air conditioner installation in Hawaiian jalousie louver windows, custom acrylic fabrication, and exterior security mounting across Oahu."
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
            "name": "Jalousie Louver Window AC Installation",
            "item": "https://www.affordablehome-ac.com/jalousie-window-ac-installation-oahu"
        }
    ]
};

export default function JalousieWindowAcInstallationLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jalousieFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacServiceSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            {children}
        </>
    );
}
