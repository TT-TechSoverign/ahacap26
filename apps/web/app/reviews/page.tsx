import { Metadata } from 'next';
import Link from 'next/link';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { WindowAcQuickShop } from '@/components/WindowAcQuickShop';
import { OahuEEATAuthorityBar } from '@/components/OahuEEATAuthorityBar';
import { BackToTop } from '@/components/BackToTop';
import { getReviewStats, getAllReviews } from '@/lib/product-reviews';
import { ShieldCheck, Star, MapPin, ChevronRight, Home } from 'lucide-react';

export const metadata: Metadata = {
    title: {
        absolute: '142+ Oahu 5-Star Reviews (4.9★) | $395+ Window ACs & $0 Est.'
    },
    description: 'Read 142+ verified 5-star Oahu reviews (4.9★) for Affordable Home A/C: LG & GE Window ACs ($395–$1,200), jalousie install & cleaning • (808) 488-1111.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/reviews',
    },
    openGraph: {
        title: '142+ Oahu 5-Star Reviews (4.9★) | $395+ Window ACs & $0 Est.',
        description: 'Read 142+ verified 5-star Oahu reviews (4.9★) for Affordable Home A/C: LG & GE Window ACs ($395–$1,200), jalousie install & cleaning • (808) 488-1111.',
        url: 'https://www.affordablehome-ac.com/reviews',
        siteName: 'Affordable Home A/C',
        locale: 'en_US',
        type: 'website',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: '142+ Five-Star Oahu Customer Reviews — Affordable Home A/C',
            }
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: '142+ Oahu 5-Star Reviews (4.9★) | $395+ Window ACs & $0 Est.',
        description: 'Read 142+ verified 5-star Oahu reviews (4.9★) for Affordable Home A/C: LG & GE Window ACs ($395–$1,200), jalousie install & cleaning • (808) 488-1111.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
    },
};

export default function ReviewsPage() {
    const stats = getReviewStats();
    const topReviews = getAllReviews().slice(0, 10);

    // Schema.org Structured Data: Single Clean HVACBusiness with AggregateRating
    const hvacBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/reviews#localbusiness",
        "parentOrganization": { "@id": "https://www.affordablehome-ac.com/#hvacbusiness" },
        "name": "Affordable Home A/C",
        "image": [
            "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp",
            "https://www.affordablehome-ac.com/assets/window-unit-images/ge-units/ge-performance-series-unit-photos-1600x1000/ge-AJCQ12AXXWA-115V-Front-1600x1000.webp",
            "https://www.affordablehome-ac.com/assets/window-unit-images/3d-fit/product_4_fit_cutaway.webp",
            "https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/window-ac-maintenance-hero-bg-1.webp"
        ],
        "logo": "https://www.affordablehome-ac.com/assets/AFORDABLE_LOGO_2026_500x500_blkblugrn.png",
        "telephone": "(808) 488-1111",
        "email": "office@affordablehome-ac.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "94-150 Leoleo St #203",
            "addressLocality": "Waipahu",
            "addressRegion": "HI",
            "postalCode": "96797",
            "addressCountry": "US"
        },
        "geo": {
            "@type": "GeoCoordinates",
            "latitude": 21.3965,
            "longitude": -158.0084
        },
        "url": "https://www.affordablehome-ac.com",
        "priceRange": "$$",
        "areaServed": [
            { "@type": "AdministrativeArea", "name": "Oahu" },
            { "@type": "City", "name": "Waipahu" },
            { "@type": "City", "name": "Honolulu" },
            { "@type": "City", "name": "Kailua" },
            { "@type": "City", "name": "Ewa Beach" },
            { "@type": "City", "name": "Mililani" },
            { "@type": "City", "name": "Pearl City" }
        ],
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "reviewCount": stats.total_reviews.toString(),
            "bestRating": "5",
            "worstRating": "1"
        },
        "review": topReviews.map(r => ({
            "@type": "Review",
            "author": {
                "@type": "Person",
                "name": r.author
            },
            "reviewRating": {
                "@type": "Rating",
                "ratingValue": r.rating.toString(),
                "bestRating": "5",
                "worstRating": "1"
            },
            "reviewBody": r.sanitized_text
        }))
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
                "name": "Verified Customer Reviews",
                "item": "https://www.affordablehome-ac.com/reviews"
            }
        ]
    };

    const reviewsFaqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is Affordable Home A/C's customer rating on Oahu?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Affordable Home A/C maintains a 4.9-star rating across 142+ verified Oahu homeowner reviews for in-stock LG Dual Inverter and GE Window AC sales ($395–$1,200), custom jalousie and 26-inch wall sleeve installations, and deep coil cleaning."
                }
            },
            {
                "@type": "Question",
                "name": "Are your Window AC units backed by a local warranty?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. Every factory-sealed LG and GE Window AC purchased from our Waipahu warehouse includes a full 1-year manufacturer parts and labor warranty (and 2-year full / 5-year sealed system on the GE AJCQ12AXXWA), supported directly by our local Oahu team since 2005."
                }
            },
        {
            "@type": "Question",
            "name": "How do I book a $0 Free In-Home Window AC Estimate or buy an in-stock unit?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "You can purchase any of our 16 in-stock LG Dual Inverter or GE 26-inch Built-In Window ACs ($395–$1,200) directly online at affordablehome-ac.com/shop, or request a By-Appointment-First $0 Free In-Home Estimate for jalousie installation, 26-inch wall sleeve replacement, or deep coil cleaning by calling (808) 488-1111."
            }
        }
    ]
    };

    return (
        <div className="bg-[#05070a] min-h-screen text-slate-200">
            {/* Structured Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(hvacBusinessSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsFaqSchema) }}
            />

            <main className="pt-[96px] md:pt-[180px] pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                {/* Breadcrumbs Sequence */}
                <nav className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-8 overflow-x-auto whitespace-nowrap" aria-label="Breadcrumb">
                    <Link href="/" className="hover:text-cyan-400 transition-colors flex items-center gap-1">
                        <Home className="size-3" />
                        <span>Home</span>
                    </Link>
                    <ChevronRight className="size-3 text-slate-600 shrink-0" />
                    <span className="text-cyan-400 font-bold">Verified Island Reviews</span>
                </nav>

                {/* Page Title & Header */}
                <div className="text-center md:text-left mb-10 space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                        <Star className="size-3.5 fill-cyan-400" />
                        <span>4.9 / 5.0 Star Rating • 142+ Real Oahu Customers</span>
                    </div>

                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-header font-black uppercase tracking-tight text-white drop-shadow-[0_0_20px_rgba(0,174,239,0.3)]">
                        Island Customer Reviews
                    </h1>

                    <p className="text-slate-400 max-w-2xl text-xs sm:text-sm md:text-base font-medium leading-relaxed">
                        Read unedited feedback from homeowners across Oahu. From prompt Waipahu warehouse pickups to custom jalousie window AC installations and antimicrobial cleaning, see why Hawaii families trust Affordable Home A/C.
                    </p>
                </div>

                {/* Full Pavilion */}
                <ReviewsPavilion variant="full" />

                <div className="mt-16">
                    <WindowAcQuickShop
                        title="Shop the LG & GE Window Air Conditioners Oahu Homeowners Love ($395–$1,200)"
                        subheading="In-stock at our Waipahu warehouse (94-150 Leoleo St #203). Buy online with 1-click checkout or request a $0 Free In-Home Estimate."
                    />
                </div>

                <div className="mt-12">
                    <OahuEEATAuthorityBar topicTitle="142+ Verified Oahu Homeowner Reviews — LG & GE Window AC Sales, Installation & Cleaning" />
                </div>
            </main>

            <BackToTop visible={true} />
        </div>
    );
}
