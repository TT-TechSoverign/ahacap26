import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import Ticker from '../components/Ticker';
import CartDrawer from '../components/CartDrawer';
import { CartProvider } from '../context/CartContext';
import { ContentProvider } from '../lib/context/ContentContext';
import Footer from '../components/Footer';
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
                <Ticker />
                <ContentProvider>
                    <CartProvider>
                        {children}
                        <CartDrawer />
                        <Footer />
                    </CartProvider>
                </ContentProvider>
            </body>
        </html>
    );
}
