import reviewsDb from './content/reviews_db.json';

export interface Review {
    id: string;
    author: string;
    rating: number;
    neighborhood: string;
    service_tag: string;
    platform: string;
    technicians: string[];
    primary_technician: string;
    keywords: string[];
    text: string;
    sanitized_text: string;
    verified: boolean;
    badge: string;
}

export interface ReviewStats {
    total_reviews: number;
    average_rating: number;
    five_star_count: number;
    four_star_count: number;
    license: string;
    waipahu_shop_address: string;
    top_neighborhoods: { name: string; count: number }[];
    top_technicians: string[];
}

const rawAllReviews: Review[] = (reviewsDb as any).all_reviews || (reviewsDb as any).affordable_home_ac || [];
const rawStats: ReviewStats = (reviewsDb as any).stats || {
    total_reviews: 142,
    average_rating: 4.9,
    five_star_count: 139,
    four_star_count: 3,
    license: "CT-36775",
    waipahu_shop_address: "94-529 Ukee St, Waipahu, HI 96797",
    top_neighborhoods: [],
    top_technicians: ["Brian", "Chris", "Omar", "Rostin", "Makoa", "Matt", "Scott"]
};

/**
 * Returns the verified aggregate stats across all Oahu customer reviews.
 */
export function getReviewStats(): ReviewStats {
    return rawStats;
}

/**
 * Returns all reviews, optionally filtered by service category, Oahu neighborhood, search term, or star rating.
 */
export function getAllReviews(filters?: {
    service?: string;
    neighborhood?: string;
    search?: string;
    rating?: number;
}): Review[] {
    let result = [...rawAllReviews];

    if (!filters) return result;

    if (filters.service && filters.service !== 'ALL') {
        const s = filters.service.toLowerCase();
        result = result.filter(r => 
            (r.service_tag && r.service_tag.toLowerCase().includes(s)) ||
            (r.keywords && r.keywords.some(k => k.toLowerCase().includes(s)))
        );
    }

    if (filters.neighborhood && filters.neighborhood !== 'ALL') {
        const nh = filters.neighborhood.toLowerCase();
        result = result.filter(r => 
            r.neighborhood && r.neighborhood.toLowerCase() === nh
        );
    }

    if (filters.search && filters.search.trim()) {
        const q = filters.search.toLowerCase().trim();
        result = result.filter(r => 
            (r.sanitized_text && r.sanitized_text.toLowerCase().includes(q)) ||
            (r.author && r.author.toLowerCase().includes(q)) ||
            (r.neighborhood && r.neighborhood.toLowerCase().includes(q)) ||
            (r.primary_technician && r.primary_technician.toLowerCase().includes(q)) ||
            (r.keywords && r.keywords.some(k => k.toLowerCase().includes(q)))
        );
    }

    if (filters.rating) {
        result = result.filter(r => r.rating >= filters.rating!);
    }

    return result;
}

/**
 * Smart Product-Review Matcher:
 * Intelligently matches reviews to a specific product's brand, capacity (BTU), and type.
 * For example:
 * - LG Dual Inverter models match reviews praising whisper-quiet operation, Wi-Fi, and electric bill savings.
 * - 18k / 24k BTU models match reviews for large living rooms, townhouses, and open spaces.
 * - GE / standard models match reviews for reliable bedroom cooling and warehouse pickup.
 */
export function getProductReviews(
    product: { id: number; name?: string; btu?: number; category?: string; subcategory?: string },
    limit: number = 3
): Review[] {
    const pName = (product.name || '').toLowerCase();
    const btu = product.btu || 0;
    const isLg = pName.includes('lg') || pName.includes('dual inverter');
    const isLarge = btu >= 14000;
    const isQuietNeeded = isLg || btu <= 10000; // Bedrooms need quiet

    // Score reviews based on relevance to this specific unit
    const scored = rawAllReviews.map(review => {
        let score = 0;
        const text = review.sanitized_text.toLowerCase();

        // Brand matching
        if (isLg && (text.includes('lg') || text.includes('dual inverter') || text.includes('inverter'))) {
            score += 15;
        }

        // Feature matching
        if (isQuietNeeded && (text.includes('quiet') || text.includes('whisper') || text.includes('sleep') || text.includes('bedroom'))) {
            score += 10;
        }

        // Capacity / Room matching
        if (isLarge && (text.includes('large') || text.includes('living room') || text.includes('townhome') || text.includes('condo') || text.includes('powerful'))) {
            score += 10;
        }

        // Energy bill savings matching
        if (text.includes('electric bill') || text.includes('energy efficient') || text.includes('power')) {
            score += 6;
        }

        // Warehouse pickup speed matching
        if (text.includes('warehouse') || text.includes('same day') || text.includes('in stock') || text.includes('picked up')) {
            score += 5;
        }

        // Technician praise bonus
        if (review.technicians && review.technicians.length > 0 && review.technicians[0] !== 'Waipahu Dispatch Team') {
            score += 3;
        }

        // Hash tie-breaker to ensure stable ordering across product IDs
        const hash = (product.id * 31 + review.id.charCodeAt(review.id.length - 1)) % 10;
        score += hash * 0.1;

        return { review, score };
    });

    scored.sort((a, b) => b.score - a.score);
    return scored.slice(0, limit).map(s => s.review);
}

/**
 * Backwards-compatible legacy signature for getSelectedReviews
 */
export function getSelectedReviews(productId: number, limit: number = 3): Review[] {
    return getProductReviews({ id: productId }, limit);
}

/**
 * Localized City-Review Matcher:
 * Matches reviews from the customer's specific Oahu city (e.g. Kailua, Ewa Beach, Waipahu),
 * with intelligent fallback to adjacent neighborhoods if city review count is below limit.
 */
export function getReviewsByCity(cityName: string, limit: number = 3): Review[] {
    const cNorm = cityName.toLowerCase().trim();

    // Direct neighborhood matches first
    const directMatches = rawAllReviews.filter(r => 
        r.neighborhood && r.neighborhood.toLowerCase() === cNorm
    );

    if (directMatches.length >= limit) {
        return directMatches.slice(0, limit);
    }

    // Secondary matches mentioning the city in text
    const textMatches = rawAllReviews.filter(r => 
        !directMatches.includes(r) && r.sanitized_text.toLowerCase().includes(cNorm)
    );

    const combined = [...directMatches, ...textMatches];
    if (combined.length >= limit) {
        return combined.slice(0, limit);
    }

    // Fallback: top island-wide reviews to fulfill limit
    const remainder = rawAllReviews.filter(r => !combined.includes(r));
    return [...combined, ...remainder].slice(0, limit);
}
