'use client';

const GLOBAL_HVAC_BUSINESS_JSON = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "HVACBusiness",
    "@id": "https://www.affordablehome-ac.com/#hvacbusiness",
    "name": "Affordable Home A/C",
    "legalName": "Affordable Home A/C LLC",
    "alternateName": "Affordable Home Air Conditioning",
    "foundingDate": "2005",
    "slogan": "Waipahu Warehouse Direct • Insured Oahu Cooling Specialists • Est. 2005",
    "image": [
        "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
        "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
        "https://www.affordablehome-ac.com/assets/hero-cards/ahac-hero-background-2.webp"
    ],
    "url": "https://www.affordablehome-ac.com",
    "logo": "https://www.affordablehome-ac.com/assets/AFORDABLE_LOGO_2026_500x500_blkblugrn.png",
    "telephone": "+1-808-488-1111",
    "email": "office@affordablehome-ac.com",
    "hasMap": "https://www.google.com/maps/search/?api=1&query=Waipahu+Commercial+Center+94-150+Leoleo+St+%23203+Waipahu+HI+96797",
    "sameAs": [
        "https://www.yelp.com/biz/affordable-home-air-conditioning-waipahu",
        "https://www.google.com/maps/search/?api=1&query=Waipahu+Commercial+Center+94-150+Leoleo+St+%23203+Waipahu+HI+96797"
    ],
    "brand": [
        { "@type": "Brand", "name": "LG" },
        { "@type": "Brand", "name": "GE Appliances" }
    ],
    "address": {
        "@type": "PostalAddress",
        "streetAddress": "94-150 Leoleo St. #203",
        "addressLocality": "Waipahu",
        "addressRegion": "HI",
        "postalCode": "96797",
        "addressCountry": "US"
    },
    "geo": {
        "@type": "GeoCoordinates",
        "latitude": 21.3868,
        "longitude": -158.0092
    },
    "openingHoursSpecification": [
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
            "opens": "08:00",
            "closes": "17:00"
        },
        {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Saturday"],
            "opens": "09:00",
            "closes": "14:00"
        }
    ],
    "paymentAccepted": "Cash, Credit Card, Debit Card, Visa, Mastercard, American Express, Discover, Apple Pay, Google Pay",
    "currenciesAccepted": "USD",
    "priceRange": "$395 - $1,200",
    "knowsAbout": [
        "LG Dual Inverter Window Air Conditioners",
        "GE 26-Inch Built-In Thru-The-Wall Air Conditioners",
        "Window AC & Hawaiian Jalousie Louver Installation",
        "Window AC Deep Cleaning & Mold Sanitization",
        "Window AC Clean-vs-Replace Evaluations",
        "Hawaii Energy $45 Window AC Cash Rebates",
        "Oahu Single-Wall Redwood Heat-Load Sizing"
    ],
    "potentialAction": [
        {
            "@type": "OrderAction",
            "name": "Order In-Stock LG & GE Window AC Units Online ($395–$1,200)",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.affordablehome-ac.com/shop",
                "inLanguage": "en-US",
                "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                ]
            }
        },
        {
            "@type": "ReserveAction",
            "name": "Schedule Oahu Window AC Deep Cleaning & Coil Sanitization",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.affordablehome-ac.com/ac-cleaning-oahu",
                "inLanguage": "en-US",
                "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                ]
            }
        },
        {
            "@type": "ReserveAction",
            "name": "Request $0 Free In-Home Window AC Installation Estimate",
            "target": {
                "@type": "EntryPoint",
                "urlTemplate": "https://www.affordablehome-ac.com/window-ac-installation",
                "inLanguage": "en-US",
                "actionPlatform": [
                    "http://schema.org/DesktopWebPlatform",
                    "http://schema.org/MobileWebPlatform"
                ]
            }
        }
    ],
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Oahu Window Air Conditioning Sales, Installation & Cleaning",
        "itemListElement": [
            { "@type": "Service", "name": "In-Stock LG Dual Inverter & GE Window AC Sales ($395–$1,200)", "url": "https://www.affordablehome-ac.com/shop", "description": "Factory-sealed LG Dual Inverter and GE 26-inch Built-In window air conditioners ($395–$1,200) for Free Waipahu Warehouse Pickup by appointment or $50 flat Oahu delivery." },
            { "@type": "Service", "name": "Window AC Deep Cleaning, Coil Sanitization & Antimicrobial Pan Treatment", "url": "https://www.affordablehome-ac.com/ac-cleaning-oahu", "description": "On-site Oahu window AC evaporator and condenser coil cleaning, mold sanitization, condensate drain clearing, and floor drop-cloth protection." },
            { "@type": "Service", "name": "Window AC & Hawaiian Jalousie Louver Installation ($0 Free In-Home Estimate)", "url": "https://www.affordablehome-ac.com/window-ac-installation", "description": "Professional Oahu window AC installation, custom jalousie glass louver retrofits, and exterior support bracket mounting." },
            { "@type": "Service", "name": "GE 26-Inch Through-the-Wall Built-In Sleeve AC Replacement", "url": "https://www.affordablehome-ac.com/shop/ge-built-in-wall-ac-oahu", "description": "True 26-inch GE AJCQ built-in wall air conditioners and RAB26A galvanized steel wall sleeves for Honolulu condos and townhomes." },
            { "@type": "Service", "name": "Window AC Clean-vs-Replace Assessment ($0 Free In-Home Estimate)", "url": "https://www.affordablehome-ac.com/clean-vs-replace-window-ac", "description": "Honest on-site diagnostic evaluation comparing deep coil cleaning against upgrading to an ENERGY STAR LG Dual Inverter or GE R-32 Inverter." }
        ]
    },
    "contactPoint": [
        {
            "@type": "ContactPoint",
            "telephone": "+1-808-488-1111",
            "contactType": "customer service",
            "areaServed": "US-HI",
            "availableLanguage": "English"
        },
        {
            "@type": "ContactPoint",
            "telephone": "+1-808-488-1111",
            "contactType": "sales",
            "areaServed": "US-HI",
            "availableLanguage": "English"
        }
    ],
    "areaServed": [
        { "@type": "AdministrativeArea", "name": "Honolulu County" },
        { "@type": "City", "name": "Honolulu" },
        { "@type": "City", "name": "Waipahu" },
        { "@type": "City", "name": "Kapolei" },
        { "@type": "City", "name": "Ewa Beach" },
        { "@type": "City", "name": "Pearl City" },
        { "@type": "City", "name": "Aiea" },
        { "@type": "City", "name": "Mililani" },
        { "@type": "City", "name": "Kailua" },
        { "@type": "City", "name": "Kaneohe" },
        { "@type": "City", "name": "Hawaii Kai" },
        { "@type": "City", "name": "Kaimuki" },
        { "@type": "City", "name": "Manoa" },
        { "@type": "City", "name": "Waikiki" },
        { "@type": "City", "name": "Salt Lake" },
        { "@type": "City", "name": "Kunia" },
        { "@type": "City", "name": "Wahiawa" },
        { "@type": "City", "name": "Waianae" },
        { "@type": "City", "name": "Nanakuli" },
        { "@type": "City", "name": "Waimanalo" },
        { "@type": "City", "name": "Haleiwa" },
        { "@type": "City", "name": "Waialua" },
        { "@type": "City", "name": "Hauula" },
        { "@type": "State", "name": "Hawaii" }
    ]
});

const HOME_GRAPH_JSON = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
        {
            "@type": "WebSite",
            "@id": "https://www.affordablehome-ac.com/#website",
            "url": "https://www.affordablehome-ac.com",
            "name": "Affordable Home A/C",
            "alternateName": [
                "Affordable Home AC",
                "Affordable Home Air Conditioning",
                "affordablehome-ac.com"
            ],
            "description": "In-stock LG Dual Inverter & GE Window ACs ($395–$1,200), custom jalousie window AC installation, deep cleaning, and repair across Oahu, Hawaii.",
            "publisher": {
                "@type": "Organization",
                "name": "Affordable Home A/C",
                "url": "https://www.affordablehome-ac.com",
                "logo": {
                    "@type": "ImageObject",
                    "url": "https://www.affordablehome-ac.com/assets/AFORDABLE_LOGO_2026_500x500_blkblugrn.png",
                    "width": 500,
                    "height": 500
                }
            },
            "potentialAction": {
                "@type": "SearchAction",
                "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://www.affordablehome-ac.com/shop?q={search_term_string}"
                },
                "query-input": "required name=search_term_string"
            }
        },
        {
            "@type": "HVACBusiness",
            "@id": "https://www.affordablehome-ac.com/#localbusiness",
            "name": "Affordable Home A/C",
            "url": "https://www.affordablehome-ac.com",
            "image": "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
            "telephone": "+1-808-488-1111",
            "priceRange": "$395 - $1,200",
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
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": "Where can I buy an LG Dual Inverter or GE 26-inch Built-In Window AC in stock on Oahu?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Affordable Home A/C stocks 16 LG Dual Inverter, LG Cool+Heat, and GE 26-inch Built-In Through-the-Wall air conditioners ($395 to $1,200) at our central Waipahu warehouse (94-150 Leoleo St. #203, Waipahu, HI 96797). Order online for free Waipahu warehouse pickup by appointment or $50 flat-rate Oahu delivery."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do you install Window ACs in Hawaiian jalousie louver windows and 26-inch condo wall sleeves?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes. Our insured Oahu cooling specialists custom-fit LG and GE window air conditioners into Hawaiian jalousie glass louver windows, standard sliders, double-hung windows, and 26-inch through-the-wall condo sleeves with floor drop-cloth protection and a $0 Free In-Home Estimate."
                    }
                },
                {
                    "@type": "Question",
                    "name": "Do your in-stock Window ACs qualify for the $45 Hawaii Energy cash rebate?",
                    "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes! Qualifying ENERGY STAR® LG Dual Inverter and GE R-32 Inverter window air conditioners include our official Hawaii Energy $45 cash rebate form PDF and reduce HECO cooling electricity use by up to 40% (~$424/yr)."
                    }
                }
            ]
        }
    ]
});

export function GlobalBusinessJsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: GLOBAL_HVAC_BUSINESS_JSON }}
        />
    );
}

export function HomeJsonLd() {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: HOME_GRAPH_JSON }}
        />
    );
}
