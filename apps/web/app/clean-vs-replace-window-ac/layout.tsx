import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: 'Clean vs Replace Window AC Oahu | Diagnostic Decision Guide | Affordable Home A/C'
    },
    description: 'Should you clean or replace your window AC on Oahu? Compare DIY filter maintenance vs upgrading to an in-stock LG Dual Inverter with $45 Hawaii Energy rebate.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/clean-vs-replace-window-ac',
    },
    openGraph: {
        title: 'Clean vs Replace Window AC Oahu | Diagnostic Decision Guide | Affordable Home A/C',
        description: 'Should you clean or replace your window AC on Oahu? Compare DIY filter maintenance vs upgrading to an in-stock LG Dual Inverter with $45 Hawaii Energy rebate.',
        url: 'https://www.affordablehome-ac.com/clean-vs-replace-window-ac',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Clean vs Replace Window AC Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Clean vs Replace Window AC Oahu | Diagnostic Decision Guide | Affordable Home A/C',
        description: 'Should you clean or replace your window AC on Oahu? Compare DIY filter maintenance vs upgrading to an in-stock LG Dual Inverter with $45 Hawaii Energy rebate.',
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
            "name": "Clean vs Replace Guide",
            "item": "https://www.affordablehome-ac.com/clean-vs-replace-window-ac"
        }
    ]
};

const cleanVsReplaceFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I know if my window AC is worth cleaning or replacing on Oahu?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "If your unit is relatively new (under 3 years old), cools well, and the coils have no rust, washing the removable nylon filter with mild dish soap every 2 weeks will maintain peak airflow and keep mold away. However, if your unit is 4+ years old, smells sour inside, has crumbling aluminum fins from salt air, or is an older single-speed model, spending money to repair it is uneconomical. Upgrading to a brand-new LG Dual Inverter starts at just $504 with a $45 Hawaii Energy cash rebate and saves up to $424/year on your HECO bill."
            }
        },
        {
            "@type": "Question",
            "name": "Is it worth paying to overhaul or chemically teardown an old window AC in Hawaii?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Almost never. Window air conditioners are factory-sealed appliances. Disassembling and cleaning internal fans and coils can cost hundreds in technician labor—nearly the cost of a brand-new, ultra-quiet Energy Star inverter unit with a fresh 1-year factory warranty. We recommend replacing old or heavily molded window units rather than paying for uneconomical off-site repairs."
            }
        },
        {
            "@type": "Question",
            "name": "Does Affordable Home AC participate in Hawaii Energy rebates for window ACs?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Every qualifying Energy Star LG Dual Inverter window AC purchased from our shop qualifies for a $45 Hawaii Energy cash rebate. We provide our own pre-approved official Hawaii Energy application form PDF with your purchase."
            }
        }
    ]
};

export default function CleanVsReplaceLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanVsReplaceFaqSchema) }}
            />
            {children}
        </>
    );
}
