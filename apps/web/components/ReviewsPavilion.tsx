'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { 
    Star, 
    ShieldCheck, 
    MapPin, 
    Wrench, 
    Sparkles, 
    CheckCircle2, 
    Search, 
    ExternalLink, 
    MessageSquareQuote,
    Filter,
    ArrowRight,
    X,
    UserCheck,
    ThumbsUp
} from 'lucide-react';
import { Review, ReviewStats, getAllReviews, getReviewStats } from '@/lib/product-reviews';
import { cn } from '@/lib/utils';

interface ReviewsPavilionProps {
    variant?: 'full' | 'compact' | 'marquee';
    reviews?: Review[];
    initialFilter?: string;
    cityFilter?: string;
    title?: string;
    subtitle?: string;
    showFlywheel?: boolean;
}

// Polynesian geometric gradient palettes for authentic avatar initials
const AVATAR_GRADIENTS = [
    'from-cyan-500 via-blue-600 to-indigo-700',
    'from-emerald-400 via-teal-600 to-cyan-800',
    'from-amber-400 via-orange-500 to-rose-600',
    'from-teal-400 via-cyan-600 to-blue-800',
    'from-blue-500 via-indigo-600 to-purple-800',
    'from-sky-400 via-blue-500 to-emerald-600'
];

function getAvatarGradient(name: string): string {
    const hash = Array.from(name).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return AVATAR_GRADIENTS[hash % AVATAR_GRADIENTS.length];
}

function StarRating({ rating = 5, size = 'md' }: { rating?: number; size?: 'sm' | 'md' | 'lg' }) {
    const sizeClasses = {
        sm: 'size-3',
        md: 'size-4',
        lg: 'size-5'
    };

    return (
        <div className="flex items-center gap-0.5 text-amber-400" aria-label={`${rating} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, i) => (
                <Star 
                    key={i} 
                    className={cn(
                        sizeClasses[size], 
                        i < rating 
                            ? 'fill-amber-400 text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]' 
                            : 'text-slate-700 fill-slate-800'
                    )} 
                />
            ))}
        </div>
    );
}

function ReviewCard({ 
    review, 
    onOpenStory, 
    compact = false 
}: { 
    review: Review; 
    onOpenStory?: (r: Review) => void; 
    compact?: boolean;
}) {
    const initials = review.author
        .split(' ')
        .map(n => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    const isLongText = review.sanitized_text.length > (compact ? 160 : 260);
    const displayText = isLongText && compact
        ? `${review.sanitized_text.slice(0, 160)}...`
        : isLongText && !compact
        ? `${review.sanitized_text.slice(0, 260)}...`
        : review.sanitized_text;

    return (
        <div className={cn(
            "group relative rounded-2xl border transition-all duration-300 flex flex-col justify-between overflow-hidden",
            "bg-[#0B1120]/80 backdrop-blur-md border-slate-800/80 hover:border-cyan-500/40 hover:shadow-[0_10px_35px_rgba(0,174,239,0.12)]",
            compact ? "p-5" : "p-6"
        )}>
            {/* Ambient inner glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl group-hover:bg-cyan-500/10 transition-colors pointer-events-none" />

            <div className="space-y-4 relative z-10">
                {/* Header: Avatar, Author, Neighborhood & Platform */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                        {/* Polynesian Gradient Avatar */}
                        <div className={cn(
                            "w-11 h-11 rounded-xl bg-gradient-to-br flex items-center justify-center text-white font-header font-black text-sm shadow-md border border-white/10 shrink-0",
                            getAvatarGradient(review.author)
                        )}>
                            <span>{initials}</span>
                        </div>

                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-header font-bold text-white text-sm tracking-wide">
                                    {review.author}
                                </h4>
                                <span className="inline-flex items-center gap-1 text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full border border-emerald-500/20">
                                    <CheckCircle2 className="size-2.5" />
                                    Verified
                                </span>
                            </div>

                            <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                                <MapPin className="size-3 text-cyan-400 shrink-0" />
                                <span className="font-medium">{review.neighborhood || 'Oahu, HI'}</span>
                                <span className="text-slate-600">•</span>
                                <span className="text-[10px] text-slate-400">{review.platform}</span>
                            </div>
                        </div>
                    </div>

                    {/* Star Rating */}
                    <div className="shrink-0">
                        <StarRating rating={review.rating} size="sm" />
                    </div>
                </div>

                {/* Service Tag & Aloha Technician Badge */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {review.service_tag && (
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-slate-800/90 text-cyan-300 border border-slate-700/80">
                            {review.service_tag}
                        </span>
                    )}
                    {review.primary_technician && review.primary_technician !== 'Waipahu Dispatch Team' && (
                        <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/25 inline-flex items-center gap-1">
                            <Sparkles className="size-2.5 text-amber-400" />
                            Tech: {review.primary_technician}
                        </span>
                    )}
                </div>

                {/* Review Body */}
                <p className="text-slate-300 text-xs sm:text-sm font-sans leading-relaxed italic break-words">
                    &ldquo;{displayText}&rdquo;
                </p>

                {isLongText && onOpenStory && (
                    <button
                        onClick={() => onOpenStory(review)}
                        className="text-[11px] font-bold text-cyan-400 hover:text-cyan-300 underline underline-offset-4 cursor-pointer inline-flex items-center gap-1 transition-colors"
                    >
                        <span>Read full aloha story</span>
                        <ArrowRight className="size-3" />
                    </button>
                )}
            </div>

            {/* Footer Trust Guarantee */}
            <div className="pt-4 mt-4 border-t border-slate-800/70 flex items-center justify-between text-[10px] text-slate-400 relative z-10">
                <span className="inline-flex items-center gap-1 text-slate-400">
                    <ShieldCheck className="size-3 text-cyan-400" />
                    <span>{review.badge || 'Waipahu Warehouse Verified'}</span>
                </span>
                <span className="text-slate-400 font-mono">CT-36775</span>
            </div>
        </div>
    );
}

export function ReviewsPavilionContent({
    variant = 'full',
    reviews: customReviews,
    initialFilter = 'ALL',
    cityFilter = 'ALL',
    title,
    subtitle,
    showFlywheel = true
}: ReviewsPavilionProps) {
    const stats: ReviewStats = useMemo(() => getReviewStats(), []);
    const baseReviews: Review[] = useMemo(() => {
        if (customReviews && customReviews.length > 0) return customReviews;
        return getAllReviews();
    }, [customReviews]);

    // Filtering states
    const [selectedService, setSelectedService] = useState<string>(initialFilter);
    const [selectedCity, setSelectedCity] = useState<string>(cityFilter);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [activeStory, setActiveStory] = useState<Review | null>(null);

    const filteredReviews = useMemo(() => {
        return baseReviews.filter(r => {
            if (selectedService !== 'ALL') {
                const s = selectedService.toLowerCase();
                const matchService = (r.service_tag && r.service_tag.toLowerCase().includes(s)) ||
                                     (r.keywords && r.keywords.some(k => k.toLowerCase().includes(s)));
                if (!matchService) return false;
            }
            if (selectedCity !== 'ALL') {
                const c = selectedCity.toLowerCase();
                const matchCity = r.neighborhood && r.neighborhood.toLowerCase() === c;
                if (!matchCity) return false;
            }
            if (searchQuery.trim()) {
                const q = searchQuery.toLowerCase().trim();
                const matchQuery = (r.sanitized_text && r.sanitized_text.toLowerCase().includes(q)) ||
                                   (r.author && r.author.toLowerCase().includes(q)) ||
                                   (r.neighborhood && r.neighborhood.toLowerCase().includes(q)) ||
                                   (r.primary_technician && r.primary_technician.toLowerCase().includes(q)) ||
                                   (r.keywords && r.keywords.some(k => k.toLowerCase().includes(q)));
                if (!matchQuery) return false;
            }
            return true;
        });
    }, [baseReviews, selectedService, selectedCity, searchQuery]);

    // Distinct Oahu cities found in reviews
    const availableCities = useMemo(() => {
        const set = new Set<string>();
        baseReviews.forEach(r => {
            if (r.neighborhood) set.add(r.neighborhood);
        });
        return Array.from(set).sort();
    }, [baseReviews]);

    // -------------------------------------------------------------------------
    // VARIANT: MARQUEE (Catalog / Homepage)
    // -------------------------------------------------------------------------
    if (variant === 'marquee') {
        const marqueeReviews = baseReviews.slice(0, 8);
        return (
            <section className="relative py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-[10px] font-mono font-bold uppercase tracking-wider mb-2">
                            <Star className="size-3 fill-cyan-400" />
                            <span>⭐ 4.9/5 Rating (142+ Verified Reviews)</span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-header font-black uppercase tracking-tight text-white">
                            {title || "Island Verified Social Proof"}
                        </h2>
                        <p className="text-slate-400 text-xs sm:text-sm max-w-xl mt-1">
                            {subtitle || "Read real feedback from homeowners across Honolulu, Waipahu, Kailua, Ewa Beach, and Mililani."}
                        </p>
                    </div>

                    <Link 
                        href="/reviews"
                        prefetch={false}
                        className="inline-flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 uppercase tracking-wider group transition-colors self-start sm:self-auto"
                    >
                        <span>Explore All 142+ Reviews</span>
                        <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Horizontal Snap Scroll Track */}
                <div className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none touch-pan-x">
                    {marqueeReviews.map(r => (
                        <div key={r.id} className="w-[300px] sm:w-[350px] shrink-0 snap-start">
                            <ReviewCard review={r} compact={true} onOpenStory={setActiveStory} />
                        </div>
                    ))}
                </div>

                {/* Full Story Modal */}
                {activeStory && (
                    <StoryModal review={activeStory} onClose={() => setActiveStory(null)} />
                )}
            </section>
        );
    }

    // -------------------------------------------------------------------------
    // VARIANT: COMPACT (Product Pages / City Landing Pages)
    // -------------------------------------------------------------------------
    if (variant === 'compact') {
        const compactList = filteredReviews.slice(0, 3);
        return (
            <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center">
                                <Star className="size-4 text-amber-400 fill-amber-400" />
                            </div>
                            <div>
                                <h3 className="font-header font-black uppercase text-base text-white leading-none tracking-wide">
                                    {title || "VERIFIED ISLAND REVIEWS"}
                                </h3>
                                <p className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mt-1">
                                    {subtitle || "Oahu Homeowners • Waipahu Warehouse Service"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/reviews"
                            prefetch={false}
                            className="px-3 py-1.5 bg-slate-900 border border-slate-700/80 rounded-xl flex items-center gap-2 hover:border-cyan-500/50 transition-all text-xs font-bold text-cyan-400 hover:text-white"
                        >
                            <span>4.9 / 5.0 Rating (142+ Reviews)</span>
                            <ExternalLink className="size-3" />
                        </Link>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {compactList.map((r) => (
                        <ReviewCard key={r.id} review={r} compact={true} onOpenStory={setActiveStory} />
                    ))}
                </div>

                <div className="flex justify-center pt-2">
                    <Link
                        href="/reviews"
                        prefetch={false}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/20 text-xs font-header font-bold uppercase tracking-wider transition-all"
                    >
                        <span>View All 142+ Oahu Customer Stories</span>
                        <ArrowRight className="size-3.5" />
                    </Link>
                </div>

                {/* Full Story Modal */}
                {activeStory && (
                    <StoryModal review={activeStory} onClose={() => setActiveStory(null)} />
                )}
            </div>
        );
    }

    // -------------------------------------------------------------------------
    // VARIANT: FULL (Dedicated /reviews Page)
    // -------------------------------------------------------------------------
    return (
        <div className="space-y-8">
            {/* Hero Trust & Scoreboard Banner */}
            <div className="relative rounded-3xl p-6 sm:p-8 md:p-10 border border-slate-800/90 bg-gradient-to-br from-[#0B1120] via-slate-950 to-[#0A0E17] shadow-2xl overflow-hidden">
                {/* Background decorative ocean ambient */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                    {/* Score summary */}
                    <div className="lg:col-span-5 space-y-3 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono font-bold uppercase tracking-wider">
                            <ShieldCheck className="size-3.5" />
                            <span>Hawaii Licensed HVAC CT-36775</span>
                        </div>

                        <div className="flex items-baseline justify-center lg:justify-start gap-3">
                            <span className="text-5xl sm:text-6xl font-header font-black text-white tracking-tighter drop-shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                                4.9
                            </span>
                            <div className="space-y-1">
                                <StarRating rating={5} size="md" />
                                <p className="text-xs font-mono text-slate-400 font-bold uppercase tracking-wider">
                                    Based on 142+ Oahu Reviews
                                </p>
                            </div>
                        </div>

                        <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                            Verified customer stories across Honolulu, Waipahu, Ewa Beach, Kailua, and Pearl City. Honest cooling recommendations, zero high-pressure sales, and prompt local warehouse service.
                        </p>
                    </div>

                    {/* Breakdown bars & Trust Badges */}
                    <div className="lg:col-span-7 space-y-4">
                        <div className="bg-slate-900/70 backdrop-blur-md p-5 rounded-2xl border border-slate-800/80 space-y-2.5">
                            <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                                <span className="w-12 font-mono">5 Stars</span>
                                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full w-[96%]" />
                                </div>
                                <span className="w-10 text-right font-mono font-bold text-amber-400">96%</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                                <span className="w-12 font-mono">4 Stars</span>
                                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-amber-400/60 rounded-full w-[4%]" />
                                </div>
                                <span className="w-10 text-right font-mono text-slate-400">4%</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-slate-400 font-medium opacity-60">
                                <span className="w-12 font-mono">3 Stars</span>
                                <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-slate-700 rounded-full w-[0%]" />
                                </div>
                                <span className="w-10 text-right font-mono">0%</span>
                            </div>
                        </div>

                        {/* Review Generation Flywheel CTAs */}
                        {showFlywheel && (
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
                                <a
                                    href="https://www.yelp.com/biz/affordable-home-air-conditioning-waipahu"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2.5 bg-red-600/10 hover:bg-red-600/20 border border-red-500/30 hover:border-red-500/60 rounded-xl text-white font-header font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 active:scale-95"
                                >
                                    <Star className="size-3.5 text-red-500 fill-red-500" />
                                    <span>Review on Yelp</span>
                                    <ExternalLink className="size-3 text-slate-400" />
                                </a>

                                <a
                                    href="https://maps.google.com/?q=Affordable+Home+Air+Conditioning+Waipahu+HI"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-4 py-2.5 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/30 hover:border-blue-500/60 rounded-xl text-white font-header font-bold text-xs uppercase tracking-wider transition-all inline-flex items-center gap-2 active:scale-95"
                                >
                                    <ThumbsUp className="size-3.5 text-blue-400" />
                                    <span>Review on Google Maps</span>
                                    <ExternalLink className="size-3 text-slate-400" />
                                </a>

                                <span className="text-[11px] font-mono text-slate-400 self-center">
                                    Direct Dispatch: (808) 488-1111
                                </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Interactive Filters & Instant Search */}
            <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                    {/* Filter Track Tabs */}
                    <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
                        {[
                            { id: 'ALL', label: `All Reviews (${baseReviews.length})` },
                            { id: 'Window AC', label: 'Window AC' },
                            { id: 'Mini-Split', label: 'Mini Split' },
                            { id: 'Cleaning', label: 'Deep Cleaning' },
                            { id: 'Warehouse', label: 'Waipahu Warehouse' },
                        ].map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedService(tab.id)}
                                className={cn(
                                    "px-3 py-1.5 rounded-xl text-xs font-header font-bold uppercase tracking-wider transition-all whitespace-nowrap active:scale-95",
                                    selectedService === tab.id
                                        ? "bg-cyan-500 text-slate-950 shadow-[0_0_15px_rgba(0,174,239,0.4)]"
                                        : "bg-slate-900/90 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Controls: Search and City Selector */}
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        {/* City Dropdown */}
                        <div className="relative shrink-0">
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="appearance-none bg-slate-900 border border-slate-800 text-slate-200 text-xs rounded-xl px-3 py-2 pr-8 focus:outline-none focus:border-cyan-500 font-medium cursor-pointer"
                                aria-label="Filter by Oahu Neighborhood"
                            >
                                <option value="ALL">All Oahu Neighborhoods</option>
                                {availableCities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                            <MapPin className="size-3 text-cyan-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Search Input */}
                        <div className="relative flex-1 md:w-64">
                            <Search className="size-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search quiet, Chris, condo..."
                                className="w-full bg-slate-900 border border-slate-800 text-slate-200 placeholder-slate-500 text-xs rounded-xl pl-8 pr-3 py-2 focus:outline-none focus:border-cyan-500 font-sans"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                                    aria-label="Clear search"
                                >
                                    <X className="size-3" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Active Filter Indicator */}
                {(selectedService !== 'ALL' || selectedCity !== 'ALL' || searchQuery) && (
                    <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                        <span>Showing {filteredReviews.length} results</span>
                        <span className="text-slate-600">•</span>
                        <button
                            onClick={() => {
                                setSelectedService('ALL');
                                setSelectedCity('ALL');
                                setSearchQuery('');
                            }}
                            className="text-cyan-400 hover:underline font-bold"
                        >
                            Reset filters
                        </button>
                    </div>
                )}
            </div>

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredReviews.map(review => (
                    <ReviewCard
                        key={review.id}
                        review={review}
                        onOpenStory={setActiveStory}
                    />
                ))}
            </div>

            {filteredReviews.length === 0 && (
                <div className="text-center py-16 bg-slate-900/50 rounded-2xl border border-slate-800 space-y-3">
                    <MessageSquareQuote className="size-10 text-slate-600 mx-auto" />
                    <h3 className="text-white font-header font-bold text-base uppercase">No reviews matched your filters</h3>
                    <p className="text-slate-400 text-xs max-w-sm mx-auto">
                        Try searching for &quot;quiet&quot;, &quot;Brian&quot;, &quot;clean&quot;, or clearing the neighborhood filter.
                    </p>
                    <button
                        onClick={() => {
                            setSelectedService('ALL');
                            setSelectedCity('ALL');
                            setSearchQuery('');
                        }}
                        className="px-4 py-2 bg-cyan-500 text-slate-950 font-header font-bold text-xs uppercase rounded-xl"
                    >
                        Reset All Filters
                    </button>
                </div>
            )}

            {/* Full Story Modal Drawer */}
            {activeStory && (
                <StoryModal review={activeStory} onClose={() => setActiveStory(null)} />
            )}
        </div>
    );
}

// Suspense-wrapped export for Next.js App Router static compliance
export function ReviewsPavilion(props: ReviewsPavilionProps) {
    return (
        <Suspense fallback={
            <div className="p-8 text-center text-slate-400 font-mono text-xs animate-pulse">
                Loading Island Social Proof Pavilion...
            </div>
        }>
            <ReviewsPavilionContent {...props} />
        </Suspense>
    );
}

// Expandable Story Modal for reading full text
function StoryModal({ review, onClose }: { review: Review; onClose: () => void }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#0B1120] border border-slate-700/80 rounded-3xl max-w-lg w-full p-6 sm:p-8 space-y-5 shadow-2xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-5 right-5 text-slate-400 hover:text-white p-1 rounded-lg bg-slate-800/60 transition-colors"
                    aria-label="Close story"
                >
                    <X className="size-5" />
                </button>

                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-12 h-12 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white font-header font-black text-base shadow-md border border-white/10 shrink-0",
                        getAvatarGradient(review.author)
                    )}>
                        <span>{review.author.slice(0, 2).toUpperCase()}</span>
                    </div>

                    <div>
                        <div className="flex items-center gap-2">
                            <h3 className="font-header font-bold text-white text-base">
                                {review.author}
                            </h3>
                            <span className="text-[9px] font-black uppercase text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                                Verified Customer
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                            <MapPin className="size-3 text-cyan-400" />
                            <span>{review.neighborhood || 'Oahu, Hawaii'}</span>
                            <span className="text-slate-600">•</span>
                            <span>{review.platform}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between py-2 border-y border-slate-800/80">
                    <StarRating rating={review.rating} size="md" />
                    {review.primary_technician && review.primary_technician !== 'Waipahu Dispatch Team' && (
                        <span className="text-xs font-mono font-bold text-amber-300">
                            Assigned Tech: {review.primary_technician}
                        </span>
                    )}
                </div>

                <div className="max-h-[50vh] overflow-y-auto pr-2 space-y-3">
                    <p className="text-slate-200 text-sm font-sans leading-relaxed whitespace-pre-line italic">
                        &ldquo;{review.sanitized_text}&rdquo;
                    </p>
                </div>

                <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                        Licensed Contractor CT-36775
                    </span>
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-header font-bold text-xs uppercase rounded-xl transition-colors"
                    >
                        Close Story
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ReviewsPavilion;
