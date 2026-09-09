import type { Metadata, Viewport } from 'next';
import TickerWrapper from '../components/TickerWrapper';
import { CartProvider } from '../context/CartContext';
import { ContentProvider } from '../lib/context/ContentContext';
import Footer from '../components/Footer';
import NavbarV2 from '../components/NavbarV2';
import MobileStickyHeader from '../components/MobileStickyHeader';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import dynamic from 'next/dynamic';

const CartDrawer = dynamic(() => import('../components/CartDrawer'), { ssr: false });
const MobileStickyBottomBar = dynamic(() => import('../components/MobileStickyBottomBar'), { ssr: false });


export const viewport: Viewport = {
    themeColor: '#0F172A',
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_URL || 'https://www.affordablehome-ac.com'),
    title: {
        template: '%s | Affordable Home A/C',
        default: 'Affordable Home A/C | Ductless Mini Split & Air Conditioning Hawaii',
    },
    description: 'We provide affordable air conditioning, ductless mini split installation, and window AC cleaning services across Oahu, Hawaii.',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: '/',
        siteName: 'Affordable Home A/C',
        images: [
            {
                url: '/assets/logo-new.png',
                width: 800,
                height: 600,
                alt: 'Affordable Home A/C Logo',
            }
        ]
    },
    alternates: {
        canonical: '/',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Affordable Home A/C | Ductless Mini Split & Air Conditioning Hawaii',
        description: 'We provide affordable air conditioning, ductless mini split installation, and window AC cleaning services across Oahu, Hawaii.',
        images: ['/assets/logo-new.png'],
    }
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <head>
                <link
                    rel="preload"
                    href="/assets/fonts/inter.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                <link
                    rel="preload"
                    href="/assets/fonts/oswald.woff2"
                    as="font"
                    type="font/woff2"
                    crossOrigin="anonymous"
                />
                {/* Global GA/GTM queueing stub to capture events before scripts load */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            window.gtag = window.gtag || function() { window.dataLayer.push(arguments); };
                        `
                    }}
                />
            </head>
            <body className="font-sans bg-background-light dark:bg-background-dark text-charcoal dark:text-white">
                <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-KTZ58FJX'} />
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-MYJZTZFXQV'} />
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GT_ID || 'GT-PLTZM3FV'} />
                <noscript>
                    <iframe 
                        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-KTZ58FJX'}`}
                        height="0" 
                        width="0" 
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                {/* <TickerWrapper /> */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "HVACBusiness",
                            "@id": "https://www.affordablehome-ac.com/#hvacbusiness",
                            "name": "Affordable Home A/C",
                            "alternateName": "Affordable Home Air Conditioning",
                            "image": "https://www.affordablehome-ac.com/assets/logo-new.png",
                            "url": "https://www.affordablehome-ac.com",
                            "logo": "https://www.affordablehome-ac.com/assets/logo.svg",
                            "telephone": "+1-808-488-1111",
                            "email": "office@affordablehome-ac.com",
                            "hasMap": "https://www.google.com/maps/search/?api=1&query=Waipahu+Commercial+Center+94-150+Leoleo+St+%23203+Waipahu+HI+96797",
                            "sameAs": [
                                "https://www.yelp.com/biz/affordable-home-air-conditioning-waipahu",
                                "https://www.google.com/maps/search/?api=1&query=Waipahu+Commercial+Center+94-150+Leoleo+St+%23203+Waipahu+HI+96797"
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
                                "latitude": "21.3855",
                                "longitude": "-158.0076"
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
                            "aggregateRating": {
                                "@type": "AggregateRating",
                                "ratingValue": "4.9",
                                "reviewCount": "142",
                                "bestRating": "5",
                                "worstRating": "1"
                            },
                            "paymentAccepted": "Cash, Credit Card, Debit Card, Visa, Mastercard, American Express, Discover",
                            "currenciesAccepted": "USD",
                            "priceRange": "$$",
                            "license": "CT-36775",
                            "knowsAbout": [
                                "Window Air Conditioners",
                                "LG Dual Inverter AC",
                                "Ductless Mini Split Installation",
                                "Window AC Cleaning",
                                "AC Deep Cleaning",
                                "AC Maintenance",
                                "AC Repair",
                                "Hawaii Energy Cash Rebates",
                                "Oahu Air Conditioning"
                            ],
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
                                    "contactType": "warehouse preorder",
                                    "areaServed": "US-HI",
                                    "availableLanguage": "English"
                                }
                            ],
                            "areaServed": [
                                { "@type": "AdministrativeArea", "name": "Honolulu County" },
                                { "@type": "City", "name": "Waipahu" },
                                { "@type": "City", "name": "Honolulu" },
                                { "@type": "City", "name": "Pearl City" },
                                { "@type": "City", "name": "Aiea" },
                                { "@type": "City", "name": "Kapolei" },
                                { "@type": "City", "name": "Ewa Beach" },
                                { "@type": "City", "name": "Mililani" },
                                { "@type": "City", "name": "Kailua" },
                                { "@type": "City", "name": "Kaneohe" },
                                { "@type": "State", "name": "Hawaii" }
                            ]
                        })
                    }}
                />
                <ContentProvider>
                    <CartProvider>
                        <MobileStickyHeader />
                        <NavbarV2 />
                        {children}
                        <CartDrawer />
                        <Footer />
                        <MobileStickyBottomBar />
                    </CartProvider>
                </ContentProvider>
            </body>
        </html>
    );
}
