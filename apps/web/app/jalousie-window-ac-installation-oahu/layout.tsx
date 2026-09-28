import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Jalousie Window AC Installation Oahu | Custom Fabrication & Brackets | Affordable Home A/C'
    },
    description: 'Expert window AC installation in Hawaiian jalousie louver windows. Custom fabrication options and security brackets available for an additional cost with installation. Clean drop-cloth guarantee. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/jalousie-window-ac-installation-oahu',
    },
    openGraph: {
        title: 'Jalousie Window AC Installation Oahu | Custom Fabrication & Brackets | Affordable Home A/C',
        description: 'Expert window AC installation in Hawaiian jalousie louver windows. Custom fabrication options and security brackets available for an additional cost with installation. Clean drop-cloth guarantee. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/jalousie-window-ac-installation-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Jalousie Window AC Installation Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Jalousie Window AC Installation Oahu | Custom Fabrication & Brackets | Affordable Home A/C',
        description: 'Expert window AC installation in Hawaiian jalousie louver windows. Custom fabrication options and security brackets available for an additional cost with installation. Clean drop-cloth guarantee. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/logo-new.png'],
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
                "text": "Yes! Jalousie installations are our specialty. Our CT-36775 licensed technicians remove only the necessary glass slats, install custom-cut marine-grade acrylic baffles and weather seals, and ensure zero mechanical weight is placed on the delicate louver tracks."
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
    "@type": "HVACService",
    "name": "Jalousie Window AC Installation & Custom Fabrication",
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
    "description": "Specialized window air conditioner installation in Hawaiian jalousie louver windows, custom acrylic fabrication, and exterior security mounting across Oahu."
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
            {children}
        </>
    );
}
