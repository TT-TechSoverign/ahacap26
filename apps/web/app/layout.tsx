import type { Metadata } from 'next';
import { Inter, Oswald } from 'next/font/google';
import CartDrawer from '../components/CartDrawer';
import { CartProvider } from '../context/CartContext';
import { ContentProvider } from '../lib/context/ContentContext';
import Footer from '../components/Footer';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' });

export const metadata: Metadata = {
    title: 'Affordable Home A/C',
    description: 'Premium window and portable air conditioning units for Oahu. Local inventory, expert service, unbeatable prices.',
    icons: {
        icon: '/assets/ahac-logo-faviconv1.svg',
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
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap" />
            </head>
            <body className={`${inter.variable} ${oswald.variable} font-sans bg-background-light dark:bg-background-dark text-charcoal dark:text-white`}>
                {/* Temporary Ticker */}
                {/* Temporary Ticker */}
                <div className="fixed top-0 w-full z-[60] bg-primary text-white text-xs font-bold py-2 tracking-widest uppercase h-9 shadow-[0_0_20px_rgba(0,174,239,0.5)] overflow-hidden flex items-center">
                    <div className="animate-marquee whitespace-nowrap flex items-center gap-12">
                        {Array(10).fill("⚠️ SYSTEM STATUS: Affordable Home A/C IS CALIBRATING A NEW DIGITAL EXPERIENCE • RECHARGING REFRIGERANT • OPTIMIZING USER AIRFLOW • PRECISION COMFORT LOADING SOON ⚠️").map((text, i) => (
                            <span key={i} className="flex items-center gap-2">
                                {text}
                            </span>
                        ))}
                    </div>
                </div>
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
