import { NextRequest, NextResponse } from 'next/server';

const API_INTERNAL_URL = process.env.API_INTERNAL_URL || 'http://localhost:8000'; // Default to localhost if internal not set

// Common function for fetching from FastAPI
async function proxyToApi(path: string, method: string, body?: any) {
    const url = `${API_INTERNAL_URL}/api/v1/content${path}`;
    console.log(`[Puck Proxy] ${method} ${url}`);

    // Pass draft/publish params
    try {
        const res = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : undefined,
            cache: 'no-store'
        });

        if (!res.ok) {
            const error = await res.text();
            console.error(`[Puck Proxy] Error: ${res.status} - ${error}`);
            return NextResponse.json({ error }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (e) {
        console.error(`[Puck Proxy] Connection Refused: ${(e as Error).message}`);
        return NextResponse.json({ error: "Backend Unavailable", details: (e as Error).message }, { status: 503 });
    }
}

export async function GET(req: NextRequest) {
    const path = req.nextUrl.searchParams.get('path') || '/';
    // Puck sends ?path=/puck/[...], but we want to store it as the actual route it represents.
    // Actually, Puck editor loads data for the path being edited.
    // If we edit `/`, path is `/`.
    // The query param `puckPath` from the editor might be passed.

    // Wait, the standard Puck `usePuck` hook calls `onPublish` and `onChange` manually, but `data` prop is initial data.
    // We usually fetch initial data on the server page.

    // However, for the editor specifically, we might want an API to dynamic load.
    // Let's assume standard usage: `apps/web/app/api/puck/route.ts` handles generic requests.

    // If the request comes from the editor client to `load` data:
    // It's convenient to simply proxy.

    // Draft query param
    const draft = req.nextUrl.searchParams.get('draft') === 'true';
    const query = draft ? '?draft=true' : '';

    return proxyToApi(`${path}${query}`, 'GET');
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { path, data } = body;
    // Puck `onPublish` sends payload. We need to structure what we send.
    // Standard Puck `onPublish` (data) => void.
    // We will wrap it to send path.

    return proxyToApi(path, 'POST', { data });
}

export async function PUT(req: NextRequest) {
    const body = await req.json();
    const { path } = body;
    // For manual "Publish" action
    return proxyToApi(`${path}/publish`, 'PUT');
}
