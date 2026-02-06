
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

// ... imports

export async function PATCH(request: Request) {
    try {
        const updates = await request.json();

        console.log('[API] PATCH /admin/schedule - Twin-Path Write');
        console.log('[API] CWD:', process.cwd());

        // Paths
        const persistenceDir = path.join(process.cwd(), 'apps/web/storage');
        const persistencePath = path.join(persistenceDir, 'content.json');

        const defaultPaths = [
            path.join(process.cwd(), 'apps/web/lib/content/content.json'), // Docker/Root
            path.join(process.cwd(), 'lib/content/content.json')           // App Dir
        ];

        // 1. Resolve Current State (Read Priority: Persistence -> Default)
        let currentContent;
        if (fs.existsSync(persistencePath)) {
            console.log('[API] Reading existing persistence:', persistencePath);
            currentContent = JSON.parse(fs.readFileSync(persistencePath, 'utf8'));
        } else {
            console.log('[API] No persistence found. Reading factory default to seed.');
            const defaultPath = defaultPaths.find(p => fs.existsSync(p));
            if (!defaultPath) {
                console.error('[API] Critical: Factory default missing.');
                return NextResponse.json({ error: 'Factory default missing' }, { status: 500 });
            }
            currentContent = JSON.parse(fs.readFileSync(defaultPath, 'utf8'));
        }

        // 2. Apply Updates
        currentContent.footer_schedule = {
            ...currentContent.footer_schedule,
            ...updates
        };

        // 3. Ensure Persistence Directory Exists
        if (!fs.existsSync(persistenceDir)) {
            console.log('[API] Creating persistence directory:', persistenceDir);
            fs.mkdirSync(persistenceDir, { recursive: true });
        }

        // 4. Write to Persistence Layer
        fs.writeFileSync(persistencePath, JSON.stringify(currentContent, null, 4));
        console.log('[API] Write confirmed to persistence layer:', persistencePath);

        return NextResponse.json({ success: true, data: currentContent, debug_path: persistencePath });
    } catch (error) {
        console.error('[API] Failed to update schedule:', error);
        return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
    }
}
