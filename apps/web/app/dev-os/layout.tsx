import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dev OS • Master Mission Control | Affordable Home A/C',
    description: 'Airtight Master Developer OS and Real-Time Infinite Canvas Workspace.',
    robots: {
        index: false,
        follow: false,
    },
};

export default function DevOsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950">
            {children}
        </div>
    );
}
