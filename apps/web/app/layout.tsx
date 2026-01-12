import './globals.css';
import type { Metadata } from 'next';
import { CartProvider } from '../context/CartContext';
import CartDrawer from '../components/CartDrawer';

export const metadata: Metadata = {
    title: 'Affordable Home A/C | Precision HVAC Oahu',
    description: 'Premium window and portable air conditioning units for Oahu. Local inventory, expert service, unbeatable prices.',
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
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
                {/* Fallback Font CDN if needed, or rely on system fonts/tailwind config */}
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Oswald:wght@400;700&display=swap" rel="stylesheet" />
            </head>
            <body className={`font-sans bg-background-light dark:bg-background-dark text-charcoal dark:text-white`}>
                <CartProvider>
                    {children}
                    <CartDrawer />
                </CartProvider>
            </body>
        </html>
    );
}
