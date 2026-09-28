import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
    name: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
    className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
    const baseUrl = 'https://www.affordablehome-ac.com';

    // Full breadcrumb array always rooted at Home
    const allItems: BreadcrumbItem[] = [
        { name: 'Home', href: '/' },
        ...items
    ];

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': allItems.map((item, index) => {
            const entry: any = {
                '@type': 'ListItem',
                'position': index + 1,
                'name': item.name,
            };
            if (item.href) {
                entry.item = item.href.startsWith('http') ? item.href : `${baseUrl}${item.href}`;
            }
            return entry;
        })
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <nav 
                aria-label="Breadcrumb" 
                className={`flex items-center text-xs font-mono tracking-wide text-slate-400 overflow-x-auto whitespace-nowrap py-2 ${className}`}
            >
                <ol className="flex items-center gap-1.5 sm:gap-2">
                    {allItems.map((item, index) => {
                        const isLast = index === allItems.length - 1;
                        return (
                            <li key={index} className="flex items-center gap-1.5 sm:gap-2">
                                {index > 0 && (
                                    <ChevronRight className="size-3 text-slate-600 shrink-0" aria-hidden="true" />
                                )}
                                {index === 0 ? (
                                    <Link 
                                        href="/" 
                                        className="flex items-center gap-1 text-slate-400 hover:text-primary transition-colors"
                                        title="Affordable Home A/C Home"
                                    >
                                        <Home className="size-3.5" />
                                        <span className="sr-only">Home</span>
                                    </Link>
                                ) : isLast || !item.href ? (
                                    <span 
                                        className="text-slate-200 font-semibold truncate max-w-[200px] sm:max-w-none" 
                                        aria-current={isLast ? 'page' : undefined}
                                    >
                                        {item.name}
                                    </span>
                                ) : (
                                    <Link 
                                        href={item.href} 
                                        className="text-slate-400 hover:text-primary transition-colors truncate max-w-[160px] sm:max-w-none"
                                    >
                                        {item.name}
                                    </Link>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </nav>
        </>
    );
}

export default Breadcrumb;
