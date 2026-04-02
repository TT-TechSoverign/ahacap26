import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import Script from 'next/script';
import TickerWrapper from '../components/TickerWrapper';
import CartDrawer from '../components/CartDrawer';
import { CartProvider } from '../context/CartContext';
import { ContentProvider } from '../lib/context/ContentContext';
import Footer from '../components/Footer';
import NavbarV2 from '../components/NavbarV2';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <head>
                {/* Material Symbols for UI Icons */}
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
            </head>
            <body className={`${inter.variable} ${oswald.variable} font-sans bg-background-light dark:bg-background-dark text-charcoal dark:text-white`}>
                <Script id="gtm" strategy="afterInteractive">
                    {`
                    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                    })(window,document,'script','dataLayer','GTM-KTZ58FJX');
                    `}
                </Script>
                <Script src="https://www.googletagmanager.com/gtag/js?id=G-MYJZTZFXQV" strategy="afterInteractive" />
                <Script id="ga4" strategy="afterInteractive">
                    {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());
                    gtag('config', 'G-MYJZTZFXQV');
                    `}
                </Script>
                {/* <TickerWrapper /> */}
                <ContentProvider>
                    <CartProvider>
                        <NavbarV2 />
                        {children}
                        <CartDrawer />
                        <Footer />
                    </CartProvider>
                </ContentProvider>
            </body>
        </html>
    );
}
