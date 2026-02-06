// ... imports
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        console.log('[API] GET /content - Persistence Check');

        // Twin-Path Persistence:
        // 1. Persistence Layer (User Edits)
        // 2. Factory Default (Source Code)

        const persistencePath = path.join(process.cwd(), 'apps/web/storage/content.json');
        const defaultPaths = [
            path.join(process.cwd(), 'apps/web/lib/content/content.json'), // Docker/Root
            path.join(process.cwd(), 'lib/content/content.json')           // App Dir
        ];

        // 1. Check Persistence
        if (fs.existsSync(persistencePath)) {
            console.log('[API] Serving from Persistence:', persistencePath);
            const fileContent = fs.readFileSync(persistencePath, 'utf8');
            return NextResponse.json(JSON.parse(fileContent));
        }

        // 2. Fallback to Default
        const defaultPath = defaultPaths.find(p => fs.existsSync(p));

        if (!defaultPath) {
            console.error('[API] Critical: No content file found in any layer.', { persistencePath, defaultPaths });
            return NextResponse.json({ error: 'Content file not found' }, { status: 404 });
        }

        console.log('[API] Serving from Factory Default:', defaultPath);
        const fileContent = fs.readFileSync(defaultPath, 'utf8');
        return NextResponse.json(JSON.parse(fileContent));

    } catch (error) {
        console.error('[API] Failed to fetch content:', error);
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}
