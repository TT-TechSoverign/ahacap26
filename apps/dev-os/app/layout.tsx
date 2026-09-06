import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
    title: 'Dev OS • Master Eagle Eye Mission Control | Affordable Home A/C',
    description: 'Airtight Master Developer OS, Infinite Multi-Tasking Spatial Cockpit, and 8-Agent Swarm Orchestrator.',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
        },
    },
};

export const viewport: Viewport = {
    themeColor: '#020617',
    width: 'device-width',
    initialScale: 1,
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 overflow-hidden">
                {children}
            </body>
        </html>
    );
}
