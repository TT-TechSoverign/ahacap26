import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Product } from '@/types/inventory';
import { generateProductSlug } from '@/lib/utils';

// We must use force-dynamic because this depends on the backend API being up,
// and we don't want the build to fail if the API container is restarting.
export const dynamic = 'force-dynamic';

interface Props {
    params: { slug: string };
    children: React.ReactNode;
}

// Robust API URL resolution
function getApiUrl() {
    let apiUrl = process.env.API_INTERNAL_URL || 'http://prod-api:8000';
    if (!apiUrl.endsWith('/api/v1')) {
        apiUrl = `${apiUrl}/api/v1`;
    }
    return apiUrl;
}

async function getProduct(slug: string): Promise<Product | null> {
    try {
        const res = await fetch(`${getApiUrl()}/products`, {
            next: { revalidate: 3600 }, // Cache for 1 hour to prevent TTFB latency and backend crash
        });
        if (!res.ok) return null;
        
        const products: Product[] = await res.json();
        // Find the product matching the slug
        const product = products.find(p => generateProductSlug(p.id, p.name) === slug);
        return product || null;
    } catch (e) {
        console.error('[SEO Layout] Failed to fetch products:', e);
        return null;
    }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = await getProduct(params.slug);
    
    if (!product) {
        return {
            title: 'Product Not Found',
        };
    }

    const title = `${product.name} | Affordable Home A/C`;
    const description = `Buy the ${product.name} at Affordable Home A/C. Professional installation and affordable prices in Oahu, Hawaii.`;
    
    return {
        title,
        description,
        alternates: {
            canonical: `/shop/${params.slug}`,
        },
        openGraph: {
            title,
            description,
            url: `/shop/${params.slug}`,
            siteName: 'Affordable Home A/C',
            images: product.image_url ? [
                {
                    url: product.image_url,
                    width: 800,
                    height: 600,
                    alt: product.name,
                },
            ] : undefined,
            type: 'website', 
        },
    };
}

export default async function ProductLayout({ params, children }: Props) {
    const product = await getProduct(params.slug);

    if (!product) {
        notFound();
    }

    // Prepare JSON-LD Product Schema
    // CRITICAL FIX: Database stores price in DOLLARS, not cents. Do not divide by 100.
    const priceInDollars = product.price.toFixed(2);
    const domain = process.env.NEXT_PUBLIC_URL || 'https://www.affordablehome-ac.com';
    const absoluteImageUrl = product.image_url ? `${domain}${product.image_url}` : `${domain}/assets/logo.png`;
    
    const schema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.name,
        "image": [absoluteImageUrl],
        "description": `Buy the ${product.name} at Affordable Home A/C.`,
        "sku": product.id,
        "brand": {
            "@type": "Brand",
            "name": "Affordable Home A/C"
        },
        "offers": {
            "@type": "Offer",
            "url": `https://www.affordablehome-ac.com/shop/${params.slug}`,
            "priceCurrency": "USD",
            "price": priceInDollars,
            "itemCondition": "https://schema.org/NewCondition",
            "availability": product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
            "seller": {
                "@type": "Organization",
                "name": "Affordable Home A/C"
            }
        }
    };

    return (
        <>
            {/* Inject JSON-LD Schema */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />
            {/* Render the Client Component Page */}
            {children}
        </>
    );
}
