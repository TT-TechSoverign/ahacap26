import { PuckEditor } from "../client";
import ProtectedLayout from "@/components/auth/ProtectedLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sovereign CMS Editor",
    robots: "noindex"
};

type Props = {
    params: { path: string[] };
    searchParams: { [key: string]: string | string[] | undefined };
};

// Ensure path is revalidated on visit
export const dynamic = 'force-dynamic';

export default async function Page({ params }: Props) {
    const path = `/${(params.path || []).join("/")}`;

    // Fetch initial data from our own API (Draft Mode)
    // Since we are server-side, we could call DB directly or fetch API.
    // For consistency with "Data Sovereignty", we fetch the draft.

    const API_INTERNAL_URL = process.env.API_INTERNAL_URL || 'http://localhost:8000';
    let initialData = {};

    try {
        const res = await fetch(`${API_INTERNAL_URL}/api/v1/content/${path}?draft=true`, {
            cache: 'no-store'
        });
        if (res.ok) {
            const json = await res.json();
            initialData = json.data || {};
        }
    } catch (e) {
        console.error("Failed to load generic content:", e);
    }

    // Default empty data structure if new
    if (!initialData || Object.keys(initialData).length === 0) {
        initialData = {
            content: [],
            root: { props: { title: "New Page" } }
        };
    }

    return (
        <ProtectedLayout>
            <PuckEditor path={path} initialData={initialData as any} />
        </ProtectedLayout>
    );
}
