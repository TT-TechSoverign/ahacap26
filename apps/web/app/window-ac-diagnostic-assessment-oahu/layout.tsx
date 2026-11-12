import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Window AC Diagnostic Oahu ($0 Estimate) | (808) 488-1111',
    },
    description: '$0 Free Estimate • (808) 488-1111. Honest Oahu Window AC troubleshooting & clean-vs-replace evaluation. Compare deep coil cleaning vs in-stock LG/GE ACs ($395+).',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/window-ac-diagnostic-assessment-oahu',
    },
    openGraph: {
        title: 'Window AC Diagnostic Oahu ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Honest Oahu Window AC troubleshooting & clean-vs-replace evaluation. Compare deep coil cleaning vs in-stock LG/GE ACs ($395+).',
        url: 'https://www.affordablehome-ac.com/window-ac-diagnostic-assessment-oahu',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
                width: 1600,
                height: 1000,
                alt: 'Window AC Diagnostic & Clean-vs-Replace Assessment Oahu Hawaii',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Window AC Diagnostic Oahu ($0 Estimate) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Honest Oahu Window AC troubleshooting & clean-vs-replace evaluation. Compare deep coil cleaning vs in-stock LG/GE ACs ($395+).',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp'],
    },
};

const diagnosticFaqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What is included in your $0 Window AC Diagnostic & Clean-vs-Replace Assessment?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Our on-site window AC evaluation covers complete electrical and thermal troubleshooting: dual-run capacitor microfarad testing, compressor running-load amp (RLA) analysis, LG/GE inverter CH error code diagnostics, supply-to-return Delta-T temperature split verification, and evaporator/condenser biofilm inspection.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do you require any upfront payment to schedule a Window AC diagnostic visit?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'No. We operate strictly By Appointment First with a $0 Free In-Home Estimate and zero upfront booking payment barriers. Dispatch contacts you by phone to confirm your symptom and window setup before any technician rolls.',
            },
        },
        {
            '@type': 'Question',
            name: 'When does cleaning or repairing beat replacing a window air conditioner in Hawaii?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'If your LG or GE window AC is under 5–6 years old with healthy compressor windings and intact copper U-bends, deep coil sanitization or a capacitor/thermistor swap typically restores 18°F–22°F Delta-T cooling. If the sealed refrigerant circuit has leaked or salt-air has rusted through the basepan, replacing it with a brand-new Waipahu warehouse unit ($395–$1,200) is far more economical.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do your technicians protect interior floors during troubleshooting and service?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. Every technician lays clean protective drop cloths on the floor directly beneath your window or 26-inch wall sleeve before removing the front grille or sliding out the chassis.',
            },
        },
    ],
};

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.affordablehome-ac.com' },
        { '@type': 'ListItem', position: 2, name: 'Window AC Repair & Assessment', item: 'https://www.affordablehome-ac.com/ac-repair-oahu' },
        { '@type': 'ListItem', position: 3, name: 'Window AC Diagnostic & Clean-vs-Replace Assessment', item: 'https://www.affordablehome-ac.com/window-ac-diagnostic-assessment-oahu' },
    ],
};

const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': 'https://www.affordablehome-ac.com/window-ac-diagnostic-assessment-oahu#service',
    name: 'Window AC Diagnostic & Clean-vs-Replace Assessment Oahu ($0 Free Estimate)',
    serviceType: 'Window Air Conditioner Troubleshooting & Clean-vs-Replace Assessment',
    url: 'https://www.affordablehome-ac.com/window-ac-diagnostic-assessment-oahu',
    image: [
        'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp',
        'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
    ],
    description: '$0 Free In-Home Estimate • (808) 488-1111. Honest Oahu Window AC electrical, thermal Delta-T, and clean-vs-replace evaluation across all 22 Oahu communities.',
    provider: {
        '@type': 'HVACBusiness',
        '@id': 'https://www.affordablehome-ac.com/window-ac-diagnostic-assessment-oahu#localbusiness',
        parentOrganization: { '@id': 'https://www.affordablehome-ac.com/#hvacbusiness' },
        name: 'Affordable Home A/C',
        image: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '142',
            bestRating: '5',
            worstRating: '1',
        },
        url: 'https://www.affordablehome-ac.com',
        telephone: '+1-808-488-1111',
        priceRange: '$395 - $1,200',
        slogan: 'Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005',
        address: {
            '@type': 'PostalAddress',
            streetAddress: '94-150 Leoleo St. #203',
            addressLocality: 'Waipahu',
            addressRegion: 'HI',
            postalCode: '96797',
            addressCountry: 'US',
        },
    },
    areaServed: { '@type': 'AdministrativeArea', name: 'Oahu, Hawaii' },
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Oahu Window AC Diagnostic & Replacement Options',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: '$0 Free In-Home Window AC Estimate & Clean-vs-Replace Assessment (By Appointment First)',
                },
                price: '0.00',
                priceCurrency: 'USD',
            },
        ],
    },
};

export default function WindowAcDiagnosticAssessmentLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(diagnosticFaqSchema).replace(/</g, '\\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema).replace(/</g, '\\u003c') }}
            />
            {children}
        </>
    );
}
