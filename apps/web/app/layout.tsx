import type { Metadata, Viewport } from 'next';
import TickerWrapper from '../components/TickerWrapper';
import { CartProvider } from '../context/CartContext';
import { ContentProvider } from '../lib/context/ContentContext';
import Footer from '../components/Footer';
import NavbarV2 from '../components/NavbarV2';
import MobileStickyHeader from '../components/MobileStickyHeader';
import { DeferredGoogleTags } from '../components/DeferredGoogleTags';
import { GTMRouteTracker } from '../components/GTMRouteTracker';
import { LazyCartDrawerHost } from '../components/LazyCartDrawerHost';
import { GlobalBusinessJsonLd } from '../components/CoreJsonLd';
import './globals.css';
import dynamic from 'next/dynamic';

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
        ],
        shortcut: ['/favicon.ico'],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
    title: {
        template: '%s | Affordable Home A/C',
        default: 'LG & GE Window ACs Oahu ($395+) & AC Cleaning | (808) 488-1111',
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
                            gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-MYJZTZFXQV'}');
                            gtag('config', '${process.env.NEXT_PUBLIC_GT_ID || 'GT-PLTZM3FV'}');
                        `
                    }}
                />
            </head>
            <body className="font-sans bg-background-light dark:bg-background-dark text-charcoal dark:text-white">
                <DeferredGoogleTags
                    gtmId={process.env.NEXT_PUBLIC_GTM_ID || 'GTM-KTZ58FJX'}
                    gaIds={[
                        process.env.NEXT_PUBLIC_GA_ID || 'G-MYJZTZFXQV',
                        process.env.NEXT_PUBLIC_GT_ID || 'GT-PLTZM3FV',
                    ]}
                />
                <GTMRouteTracker />
                <noscript>
                    <iframe 
                        title="Google Tag Manager"
                        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID || 'GTM-KTZ58FJX'}`}
                        height="0" 
                        width="0" 
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                {/* <TickerWrapper /> */}
                <ContentProvider>
                    <CartProvider>
                        <MobileStickyHeader />
                        {children}
                        <NavbarV2 />
                        <LazyCartDrawerHost />
                        <Footer />
                        <MobileStickyBottomBar />
                    </CartProvider>
                </ContentProvider>
                <GlobalBusinessJsonLd />
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            // Activate full stylesheet cleanly after first paint settles or on first interaction
                            (function() {
                                var activated = false;
                                function enableFullCss() {
                                    if (activated) return;
                                    activated = true;
                                    var links = document.querySelectorAll('link[data-precedence="next"][media="print"]');
                                    for (var i = 0; i < links.length; i++) links[i].media = 'all';
                                }
                                var evts = ['pointerdown', 'touchstart', 'scroll', 'keydown', 'mousemove'];
                                for (var j = 0; j < evts.length; j++) {
                                    window.addEventListener(evts[j], enableFullCss, { once: true, passive: true });
                                }
                                setTimeout(enableFullCss, 5500);
                            })();
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
