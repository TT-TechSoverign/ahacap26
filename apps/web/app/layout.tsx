import type { Metadata, Viewport } from 'next';
import { Inter, Oswald } from 'next/font/google';
import Script from 'next/script';
import { GoogleAnalytics } from '@next/third-parties/google';
import TickerWrapper from '../components/TickerWrapper';
import CartDrawer from '../components/CartDrawer';
import { CartProvider } from '../context/CartContext';
import { ContentProvider } from '../lib/context/ContentContext';
import Footer from '../components/Footer';
import NavbarV2 from '../components/NavbarV2';
import MobileStickyHeader from '../components/MobileStickyHeader';
import MobileStickyBottomBar from '../components/MobileStickyBottomBar';
import PromoStickyBar from '../components/PromoStickyBar';
import './globals.css';

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
                {/* Material Symbols for UI Icons */}
                {/* eslint-disable-next-line @next/next/no-page-custom-font */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
                <Script id="gtm" strategy="afterInteractive">
                    {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-KTZ58FJX');
                    `}
                </Script>
            </head>
            <body className={`${inter.variable} ${oswald.variable} font-sans bg-background-light dark:bg-background-dark text-charcoal dark:text-white`}>
                <GoogleAnalytics gaId="G-MYJZTZFXQV" />
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
