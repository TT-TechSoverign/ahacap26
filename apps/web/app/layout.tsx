import type { Metadata, Viewport } from 'next';
import TickerWrapper from '../components/TickerWrapper';
import { CartProvider } from '../context/CartContext';
import { ContentProvider } from '../lib/context/ContentContext';
import Footer from '../components/Footer';
import NavbarV2 from '../components/NavbarV2';
import MobileStickyHeader from '../components/MobileStickyHeader';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import { GTMRouteTracker } from '../components/GTMRouteTracker';
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
    applicationName: 'Affordable Home A/C',
    manifest: '/manifest.json',
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: '48x48' },
            { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
            { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
            { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
            { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
        ],
        shortcut: ['/favicon.ico'],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
    title: {
        template: '%s | Affordable Home A/C',
        default: 'LG & GE Window ACs & AC Cleaning Oahu ($395+ In-Stock) | (808) 488-1111',
    },
    description: '$0 Free Estimate • (808) 488-1111. Shop in-stock LG Dual Inverter & GE Built-In Window ACs ($395–$1,200, Waipahu Pickup / $50 Delivery), Install & Cleaning.',
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.affordablehome-ac.com',
        siteName: 'Affordable Home A/C',
        images: [
            {
                url: 'https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp',
                width: 1600,
                height: 1000,
                alt: 'Affordable Home A/C — In-Stock LG Dual Inverter & GE Window ACs Oahu ($395–$1,200)',
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LG & GE Window ACs & AC Cleaning Oahu ($395+ In-Stock) | (808) 488-1111',
        description: '$0 Free Estimate • (808) 488-1111. Shop in-stock LG Dual Inverter & GE Built-In Window ACs ($395–$1,200, Waipahu Pickup / $50 Delivery), Install & Cleaning.',
        images: ['https://www.affordablehome-ac.com/assets/window-unit-images/lg-units/lg-dual-inverter-unit-photos-1600x1000/lg-dual-inverter-thinq-front-1600x1000.webp'],
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
                {/* Global GA/GTM queueing stub & Google Consent Mode V2 */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){window.dataLayer.push(arguments);}
                            window.gtag = gtag;
                            gtag('consent', 'default', {
                                'ad_storage': 'granted',
                                'analytics_storage': 'granted',
                                'ad_user_data': 'granted',
                                'ad_personalization': 'granted'
                            });
                            gtag('js', new Date());
                        `
                    }}
                />
            </head>
            <body className="font-sans bg-background-light dark:bg-background-dark text-charcoal dark:text-white">
                <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-KTZ58FJX'} />
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || 'G-MYJZTZFXQV'} />
                <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GT_ID || 'GT-PLTZM3FV'} />
                <GTMRouteTracker />
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
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            // Universal Live Freshness & BFCache Sync
                            window.addEventListener('pageshow', function(event) {
                                if (event && event.persisted) {
                                    window.location.reload();
                                }
                            });
                            // Universal ChunkLoadError recovery across asset bundle updates
                            window.addEventListener('error', function(event) {
                                if (event && event.message && (event.message.indexOf('ChunkLoadError') !== -1 || event.message.indexOf('Loading chunk') !== -1)) {
                                    window.location.reload();
                                }
                            });
                        `
                    }}
                />
            </body>
        </html>
    );
}
