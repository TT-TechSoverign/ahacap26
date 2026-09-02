import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const filename = request.nextUrl.searchParams.get('file');
    const authHeader = request.headers.get('Authorization');
    const cookieToken = request.cookies.get('admin_session')?.value;
    const token = authHeader || cookieToken;

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized: Authentication required' }, { status: 401 });
    }

    if (!filename || filename.includes('..') || filename.includes('/') || filename.includes('\\') || !filename.endsWith('.csv')) {
        return NextResponse.json({ error: 'Invalid filename' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'lib/content/seo-drafts', filename);
    
    // Check monorepo-safe path fallbacks
    const resolvedPath = fs.existsSync(filePath)
        ? filePath
        : path.join(process.cwd(), 'apps/web/lib/content/seo-drafts', filename);

    if (!fs.existsSync(resolvedPath)) {
        return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    try {
        const text = fs.readFileSync(resolvedPath, 'utf8');
        return new NextResponse(text, {
            status: 200,
            headers: {
                'Content-Type': 'text/csv; charset=utf-8',
                'Cache-Control': 'private, no-cache, no-store',
                'X-Robots-Tag': 'noindex, nofollow'
            }
        });
    } catch (e) {
        return NextResponse.json({ error: 'Failed to read file' }, { status: 500 });
    }
}
