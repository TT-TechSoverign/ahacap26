import { Metadata } from 'next';
import Link from 'next/link';
import { ReviewsPavilion } from '@/components/ReviewsPavilion';
import { BackToTop } from '@/components/BackToTop';
import { getReviewStats, getAllReviews } from '@/lib/product-reviews';
import { ShieldCheck, Star, MapPin, ChevronRight, Home } from 'lucide-react';

export const metadata: Metadata = {
    title: '142+ Five-Star Reviews | Affordable Home A/C Oahu | (808) 488-1111',
    description: 'Read 142+ verified 5-star customer reviews for Affordable Home A/C. Oahu homeowners praise our whisper-quiet LG dual inverters, $0 free estimates, and Waipahu warehouse pickup.',
    alternates: {
        canonical: 'https://www.affordablehome-ac.com/reviews',
    },
    openGraph: {
        title: '142+ Verified 5-Star Reviews | Affordable Home A/C Oahu',
        description: 'Read authentic reviews from homeowners across Honolulu, Waipahu, Kailua, Ewa Beach, and Mililani. Licensed Hawaii Contractor CT-36775.',
        url: 'https://www.affordablehome-ac.com/reviews',
        siteName: 'Affordable Home A/C',
        type: 'website',
    }
};

export default function ReviewsPage() {
    const stats = getReviewStats();
    const topReviews = getAllReviews().slice(0, 10);

    // Schema.org Structured Data: Single Clean HVACBusiness with AggregateRating
    const hvacBusinessSchema = {
        "@context": "https://schema.org",
        "@type": "HVACBusiness",
        "@id": "https://www.affordablehome-ac.com/#hvacbusiness",
        "name": "Affordable Home A/C",
        "image": "https://www.affordablehome-ac.com/assets/logo.svg",
        "telephone": "(808) 488-1111",
        "email": "office@affordablehome-ac.com",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "94-529 Ukee St",
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
        "license": "CT-36775",
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

            <main className="pt-[130px] md:pt-[150px] lg:pt-[160px] pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
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
                        Read unedited feedback from homeowners across Oahu. From prompt Waipahu warehouse pickups to full ductless mini-split installations, see why Hawaii families trust Affordable Home A/C.
                    </p>
                </div>

                {/* Full Pavilion */}
                <ReviewsPavilion variant="full" />
            </main>

            <BackToTop visible={true} />
        </div>
    );
}
