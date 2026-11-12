import { Metadata } from 'next';

export const metadata: Metadata = {
    title: {
        absolute: '$45 Hawaii Energy Window AC Rebate PDF (2026) | Oahu In-Stock'
    },
    description: 'Instant $45 Hawaii Energy Window AC Rebate PDF Download! Eligible LG Dual Inverter & GE ACs ($560+, $515 net) in stock in Waipahu • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/hawaii-energy-rebate',
    },
    openGraph: {
        title: '$45 Hawaii Energy Window AC Rebate PDF (2026) | Oahu In-Stock',
        description: 'Instant $45 Hawaii Energy Window AC Rebate PDF Download! Eligible LG Dual Inverter & GE ACs ($560+, $515 net) in stock in Waipahu • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/hawaii-energy-rebate',
        siteName: 'Affordable Home A/C',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Hawaii Energy Window AC $45 Rebate Oahu',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: '$45 Hawaii Energy Window AC Rebate PDF (2026) | Oahu In-Stock',
        description: 'Instant $45 Hawaii Energy Window AC Rebate PDF Download! Eligible LG Dual Inverter & GE ACs ($560+, $515 net) in stock in Waipahu • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    }
};

const rebateFaqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "What is the exact amount of the Hawaii Energy window AC rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The Hawaii Energy rebate is exactly $45 for qualifying Energy Star certified room window air conditioners. It comes as a direct cash rebate check mailed to your Oahu address or credited via your HECO account."
            }
        },
        {
            "@type": "Question",
            "name": "Which window air conditioners are eligible for this rebate?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "This program applies to qualifying Energy Star certified room window AC units, including our 6,000 BTU to 23,500 BTU LG Dual Inverter & GE models stocked in Waipahu. At Affordable Home A/C, we provide honest direct warehouse pricing plus your official $45 rebate application."
            }
        },
        {
            "@type": "Question",
            "name": "Do I get the official pre-approved rebate application with my purchase?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Affordable Home A/C provides our official pre-approved Hawaii Energy Rebate Application (Version 4) with every eligible in-stock window unit purchase. You can also download the application form right here on this page."
            }
        },
        {
            "@type": "Question",
            "name": "What documentation do I need to submit with the rebate form?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "You simply need: (1) Your completed Hawaii Energy application form with your HECO electric account number, and (2) Your itemized purchase receipt from Affordable Home A/C showing the qualifying Energy Star model number and purchase date."
            }
        },
        {
            "@type": "Question",
            "name": "How can I purchase an eligible unit today?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can purchase directly online through our Shop. Select Free Waipahu Warehouse Pickup (by appointment at 94-150 Leoleo St #203) or flat-rate $50 delivery across Honolulu, Metro, Central, Windward, and West Oahu."
            }
        }
    ]
};

const rebateHowToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Claim Your $45 Hawaii Energy Window AC Rebate on Oahu",
    "description": "3-step guide to claiming your $45 cash rebate from Hawaii Energy when purchasing an ENERGY STAR LG Dual Inverter or GE Inverter Window AC in Oahu.",
    "totalTime": "PT5M",
    "step": [
        {
            "@type": "HowToStep",
            "position": 1,
            "name": "Purchase an ENERGY STAR Qualifying Window AC",
            "text": "Order an eligible LG Dual Inverter (6,000–23,500 BTU) or GE Variable Speed Inverter (AJCQ12AXXWA) online at affordablehome-ac.com/shop ($560–$1,200) for Free Waipahu Pickup or $50 Oahu Delivery.",
            "url": "https://www.affordablehome-ac.com/shop#dual_inverter"
        },
        {
            "@type": "HowToStep",
            "position": 2,
            "name": "Download the Official Pre-Approved AHAC Rebate PDF",
            "text": "Download the official Affordable Home A/C Hawaii Energy Window AC Purchase Application (Version 4 PDF) and enter your 12-digit Hawaiian Electric (HECO) residential account number.",
            "url": "https://www.affordablehome-ac.com/assets/he-rebate-form/Affordable-Home-AC-WINDOW-AC-PURCHASE-APP-V4-12.24.24.pdf"
        },
        {
            "@type": "HowToStep",
            "position": 3,
            "name": "Submit Receipt & Form for Your $45 Check",
            "text": "Submit your completed application alongside your itemized Affordable Home A/C purchase receipt to Hawaii Energy online or by mail to receive your $45 cash rebate check.",
            "url": "https://www.affordablehome-ac.com/hawaii-energy-rebate"
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
            "name": "Oahu Window AC Shop",
            "item": "https://www.affordablehome-ac.com/shop"
        },
        {
            "@type": "ListItem",
            "position": 3,
            "name": "$45 Hawaii Energy Window AC Rebate",
            "item": "https://www.affordablehome-ac.com/hawaii-energy-rebate"
        }
    ]
};

const pass5RichSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://www.affordablehome-ac.com/hawaii-energy-rebate#service",
    "name": "$45 Hawaii Energy Window AC Rebate Program & Pre-Approved PDF Oahu",
    "serviceType": "$45 Hawaii Energy Window AC Rebate Program & Pre-Approved PDF Oahu",
    "url": "https://www.affordablehome-ac.com/hawaii-energy-rebate",
    "description": "Official $45 Hawaii Energy cash rebate guidance and pre-approved V4 application PDF for qualifying ENERGY STAR LG Dual Inverter & GE R-32 Inverter Window ACs in Waipahu, Oahu.",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp"
    ],
    "provider": {
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/hawaii-energy-rebate#localbusiness",
        "parentOrganization": {
            "@id": "https://www.affordablehome-ac.com/#hvacbusiness"
        },
        "name": "Affordable Home A/C",
        "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
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
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": "142",
            "bestRating": "5",
            "worstRating": "1"
        }
    },
    "areaServed": {
        "@type": "AdministrativeArea",
        "name": "Oahu, Hawaii"
    }
};

export default function HawaiiEnergyRebateLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(rebateFaqSchema).replace(/</g, '\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(rebateHowToSchema).replace(/</g, '\u003c') }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(pass5RichSchema).replace(/</g, '\u003c') }}
            />
            {children}
        </>
    );
}
