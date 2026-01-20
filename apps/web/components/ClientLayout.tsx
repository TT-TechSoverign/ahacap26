'use client';

import { useContent } from '../lib/context/ContentContext';
import { Inter, Oswald } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const oswald = Oswald({ subsets: ['latin'], variable: '--font-oswald', display: 'swap' });

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const { isEditMode } = useContent();

    return (
        <body
            data-edit-mode={isEditMode}
            className={`${inter.variable} ${oswald.variable} font-sans bg-background-light dark:bg-background-dark text-charcoal dark:text-white transition-colors duration-500`}
        >
            {children}
        </body>
    );
}
