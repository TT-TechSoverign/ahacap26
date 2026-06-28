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
                url: '/assets/logo.png',
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
        images: ['/assets/logo.png'],
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
                            "image": "https://www.affordablehome-ac.com/assets/logo-new.png",
                            "url": "https://www.affordablehome-ac.com",
                            "logo": "https://www.affordablehome-ac.com/assets/logo.svg",
                            "telephone": "+1-808-488-1111",
                            "email": "office@affordablehome-ac.com",
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
                                    "telephone": "+1-808-425-4554",
                                    "contactType": "warehouse preorder",
                                    "areaServed": "US-HI",
                                    "availableLanguage": "English"
                                }
                            ],
                            "areaServed": [
                                {
                                    "@type": "State",
                                    "name": "Hawaii"
                                }
                            ],
                            "priceRange": "$$"
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
