import type { Metadata, Viewport } from 'next';
import { Inter, Oswald } from 'next/font/google';
import TickerWrapper from '../components/TickerWrapper';
import { CartProvider } from '../context/CartContext';
import { ContentProvider } from '../lib/context/ContentContext';
import Footer from '../components/Footer';
import NavbarV2 from '../components/NavbarV2';
import MobileStickyHeader from '../components/MobileStickyHeader';
import PromoStickyBar from '../components/PromoStickyBar';
import DeferredAnalytics from '../components/DeferredAnalytics';
import './globals.css';
import dynamic from 'next/dynamic';

const CartDrawer = dynamic(() => import('../components/CartDrawer'), { ssr: false });
const MobileStickyBottomBar = dynamic(() => import('../components/MobileStickyBottomBar'), { ssr: false });
const PatrioticBackgroundGlow = dynamic(() => import('../components/PatrioticBackgroundGlow'), { ssr: false });

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' });

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
    },
    alternates: {
        canonical: '/',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <head>
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
            <body className={`${inter.variable} ${oswald.variable} font-sans bg-background-light dark:bg-background-dark text-charcoal dark:text-white`}>
                <DeferredAnalytics />
                {/* <TickerWrapper /> */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": ["LocalBusiness", "HVACBusiness", "Organization"],
                            "name": "Affordable Home A/C",
                            "image": "https://www.affordablehome-ac.com/assets/logo.png",
                            "url": "https://www.affordablehome-ac.com",
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
                        <PatrioticBackgroundGlow />
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
