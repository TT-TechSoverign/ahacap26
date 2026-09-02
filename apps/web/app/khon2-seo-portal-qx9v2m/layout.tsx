import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Agency Review Terminal',
    robots: {
        index: false,
        follow: false,
        nocache: true,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    },
};

export default function Khon2Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
