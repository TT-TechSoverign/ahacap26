import { NextRequest, NextResponse } from 'next/server';

const API_INTERNAL_URL = process.env.API_INTERNAL_URL || 'http://localhost:8000';
const SAFE_PUCK_PATH_RE = /^\/[A-Za-z0-9/_-]*$/;

function sanitizeContentPath(rawPath: unknown): string | null {
    if (typeof rawPath !== 'string') return null;
    const normalized = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;
    if (
        normalized.length > 200 ||
        normalized.includes('..') ||
        normalized.includes('//') ||
        !SAFE_PUCK_PATH_RE.test(normalized)
    ) {
        return null;
    }
    return normalized;
}

// Common function for fetching from FastAPI
async function proxyToApi(req: NextRequest, safePathWithQuery: string, method: string, body?: any) {
    const url = `${API_INTERNAL_URL}/api/v1/content${safePathWithQuery}`;
    console.log(`[Puck Proxy] ${method} ${safePathWithQuery}`);

    const authHeader = req.headers.get('Authorization');
    const adminSessionCookie = req.cookies.get('admin_session')?.value;

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (authHeader) {
        headers['Authorization'] = authHeader;
    } else if (adminSessionCookie) {
        headers['Authorization'] = adminSessionCookie.startsWith('Bearer ') ? adminSessionCookie : `Bearer ${adminSessionCookie}`;
    }

    try {
        const res = await fetch(url, {
            method,
            headers,
            body: body ? JSON.stringify(body) : undefined,
            cache: 'no-store'
        });

        if (!res.ok) {
            return NextResponse.json({ error: 'Upstream content request failed' }, { status: res.status });
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (e) {
        console.error(`[Puck Proxy] Connection Refused: ${(e as Error).message}`);
        return NextResponse.json({ error: 'Backend Unavailable' }, { status: 503 });
    }
}

export async function GET(req: NextRequest) {
    const safePath = sanitizeContentPath(req.nextUrl.searchParams.get('path') || '/');
    if (!safePath) {
        return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }
    const draft = req.nextUrl.searchParams.get('draft') === 'true';
    const query = draft ? '?draft=true' : '';

    return proxyToApi(req, `${safePath}${query}`, 'GET');
}

export async function POST(req: NextRequest) {
    const body = await req.json().catch(() => ({}));
    const safePath = sanitizeContentPath(body?.path);
    if (!safePath) {
        return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }
    return proxyToApi(req, safePath, 'POST', { data: body?.data });
}

export async function PUT(req: NextRequest) {
    const body = await req.json().catch(() => ({}));
    const safePath = sanitizeContentPath(body?.path);
    if (!safePath) {
        return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }
    return proxyToApi(req, `${safePath === '/' ? '' : safePath}/publish`, 'PUT');
}
