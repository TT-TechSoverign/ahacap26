import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Mini Split AC Installation Oahu | In-Stock in Waipahu | Free $250 Sizing Survey | Affordable Home A/C'
    },
    description: 'Beat the Oahu heat with premium ductless mini-split AC systems in-stock in our Waipahu warehouse. Mitsubishi, Fujitsu, Daikin. Free $250 in-home sizing & electrical survey. 10–12 yr warranty. Call (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/mini_split_ac',
    },
    openGraph: {
        title: 'Mini Split AC Installation Oahu | In-Stock in Waipahu | Free $250 Sizing Survey | Affordable Home A/C',
        description: 'Beat the Oahu heat with premium ductless mini-split AC systems in-stock in our Waipahu warehouse. Mitsubishi, Fujitsu, Daikin. Free $250 in-home sizing & electrical survey. 10–12 yr warranty. Call (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/mini_split_ac',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/minisplitacphotos/mini-split-mitsubishi-air-handler.png',
                width: 800,
                height: 600,
                alt: 'Mitsubishi Ductless Mini Split AC Installation Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Mini Split AC Installation Oahu | In-Stock in Waipahu | Free $250 Sizing Survey | Affordable Home A/C',
        description: 'Beat the Oahu heat with premium ductless mini-split AC systems in-stock in our Waipahu warehouse. Mitsubishi, Fujitsu, Daikin. Free $250 in-home sizing & electrical survey. 10–12 yr warranty. Call (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/minisplitacphotos/mini-split-mitsubishi-air-handler.png'],
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
            "name": "Mini Split AC Installation",
            "item": "https://www.affordablehome-ac.com/mini_split_ac"
        }
    ]
};

const faqs = [
    {
        q: "How fast can you install a mini-split on Oahu?",
        a: "Because we maintain local inventory in our Waipahu warehouse, we do not make homeowners wait 4 to 8 weeks for mainland container shipping. Once your free in-home sizing survey is completed and equipment is selected, installation is typically completed within 3 to 5 business days (subject to scheduling and crew availability)."
    },
    {
        q: "What is Blue Fin coastal protection and why is it essential in Hawaii?",
        a: "Oahu's continuous trade winds carry microscopic ocean salt particles that quickly corrode and pit uncoated aluminum cooling fins within 2 to 4 years. Factory Blue Fin treatment applies a durable acrylic resin and hydrophilic film to the condenser coils, preventing galvanic corrosion, shedding salt spray, and extending system lifespan."
    },
    {
        q: "Will a mini-split work with my older Oahu home's electrical panel?",
        a: "Yes. Many older homes in Kailua, Kaneohe, Pearl City, and Kaimuki have 60A or 100A main panels. During your free $250 in-home survey, our licensed CT-36775 technicians calculate your breaker load and identify subpanel capacity to ensure your installation proceeds smoothly with zero surprise electrician bills."
    },
    {
        q: "Can I install mini-splits in an Oahu townhouse or condo with strict HOA rules?",
        a: "Yes, subject to detailed scope of work, property inspection, and management approval to accept. We specialize in HOA-compliant installations across planned communities like Mililani Mauka, Ewa Beach, Kapolei, and Hawaii Kai. We install color-matched, UV-resistant architectural line-hide conduits that neatly enclose all refrigerant pipes, wiring, and drain lines flush against your exterior walls to pass HOA architectural review."
    },
    {
        q: "Do your mini-splits comply with Honolulu residential noise ordinances?",
        a: "Yes. In dense Oahu neighborhoods and zero-lot-line communities, neighbor noise complaints can be an issue. Our Mitsubishi Electric and Fujitsu inverter systems operate as low as 19 dBA indoors and under 50 dBA outdoors, comfortably surpassing Honolulu Department of Health Title 11 boundary noise standards."
    }
];

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": f.a
        }
    }))
};

const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "HVACService",
    "name": "Ductless Mini Split AC Installation Oahu",
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
    "description": "Professional ductless mini-split AC installation in Oahu. In-stock units in Waipahu warehouse with 10-12 year warranties and factory Blue Fin coastal salt protection."
};

export default function MiniSplitsLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />
            {children}
        </>
    );
}
