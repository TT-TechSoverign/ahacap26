import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Installation Oahu | Jalousie & Standard Mounting | Affordable Home A/C'
    },
    description: 'Expert window AC installation on Oahu. Specializing in jalousie louvers, slider windows, and heavy-duty security brackets. Drop cloth protection guaranteed. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-installation',
    },
    openGraph: {
        title: 'Window AC Installation Oahu | Jalousie & Standard Mounting | Affordable Home A/C',
        description: 'Expert window AC installation on Oahu. Specializing in jalousie louvers, slider windows, and heavy-duty security brackets. Drop cloth protection guaranteed. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/window-ac-installation',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Window AC Installation Oahu Jalousie Mounting',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Installation Oahu | Jalousie & Standard Mounting | Affordable Home A/C',
        description: 'Expert window AC installation on Oahu. Specializing in jalousie louvers, slider windows, and heavy-duty security brackets. Drop cloth protection guaranteed. Call (808) 488-1111.',
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
            "name": "Window AC Installation",
            "item": "https://www.affordablehome-ac.com/window-ac-installation"
        }
    ]
};

const windowAcInstallFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How does Affordable Home AC safely install window ACs in Oahu jalousie windows?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Over 60% of homes across Oahu feature jalousie louver windows. Our licensed CT-36775 technicians safely remove only the necessary glass louvers, precision-fit marine-grade clear acrylic baffles with anti-vibration gaskets, and anchor the installation so zero mechanical stress is placed on the fragile aluminum tracks."
            }
        },
        {
            "@type": "Question",
            "name": "Are custom fabrication options and security brackets available?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Custom fabrication options and security brackets are available for an additional cost with installation. Our technicians assess your window sill and wall framing during installation to recommend the optimal support."
            }
        },
        {
            "@type": "Question",
            "name": "Why is 3/8-inch leveling pitch critical in Hawaii's climate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Oahu's high 74%+ relative humidity causes high-efficiency window ACs to pull 1.5 to 2.5 gallons of moisture from the air daily. If an AC is installed flat or tilted inward, condensate pools inside and overflows into interior drywall. Our technicians calibrate an exact 3/8-inch backward pitch so all drainage discharges cleanly outside."
            }
        },
        {
            "@type": "Question",
            "name": "Can I bundle an in-stock LG Dual Inverter with installation?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! You can purchase any in-stock LG Dual Inverter directly through our online Shop. You can select Free Waipahu Warehouse Pickup (by appointment) or $50 Flat Island-Wide Delivery. Every qualifying Energy Star unit includes our pre-approved official Hawaii Energy $45 cash rebate application form PDF."
            }
        }
    ]
};

const hvacServiceSchema = {
    "@context": "https://schema.org",
    "@type": "HVACService",
    "name": "Window Air Conditioner Installation",
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
    "description": "Professional window air conditioner installation, jalousie louver custom fabrication, security brackets, and clean drop-cloth protection across Oahu.",
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Window AC Installation Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "name": "Window AC Installation (By Appointment)",
                "price": "275.00",
                "priceCurrency": "USD",
                "description": "Professional installation with laser-leveling, weatherproof sealing, floor drop cloth protection, and cold airflow operational check."
            }
        ]
    }
};

export default function WindowAcInstallationLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(windowAcInstallFaqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacServiceSchema) }}
            />
            {children}
        </>
    );
}
