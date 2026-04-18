
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

        // 1. Resolve Current State (Read Priority: Factory Default -> Persistence)
        const defaultPath = defaultPaths.find(p => fs.existsSync(p));
        if (!defaultPath) {
            console.error('[API] Critical: Factory default missing.');
            return NextResponse.json({ error: 'Factory default missing' }, { status: 500 });
        }
        let currentContent = JSON.parse(fs.readFileSync(defaultPath, 'utf8'));

        // Overlay existing persistence if it exists (so we don't lose other fields if they exist)
        if (fs.existsSync(persistencePath)) {
            try {
                const persistenceContent = JSON.parse(fs.readFileSync(persistencePath, 'utf8'));
                if (persistenceContent.footer_schedule) {
                    currentContent.footer_schedule = persistenceContent.footer_schedule;
                }
            } catch (err) {
                console.error('[API] Failed to parse existing persistence layer:', err);
            }
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

        // 4. Write ONLY the dynamic data to the Persistence Layer
        // This prevents the persistence file from turning into an ancient, bloated snapshot of the entire site structure.
        const persistenceData = {
            footer_schedule: currentContent.footer_schedule
        };
        fs.writeFileSync(persistencePath, JSON.stringify(persistenceData, null, 4));
        console.log('[API] Write confirmed to persistence layer:', persistencePath);

        return NextResponse.json({ success: true, data: currentContent, debug_path: persistencePath });
    } catch (error) {
        console.error('[API] Failed to update schedule:', error);
        return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
    }
}
