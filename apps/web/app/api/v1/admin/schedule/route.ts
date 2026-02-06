
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

// ... imports

export async function PATCH(request: Request) {
    try {
        const updates = await request.json();

        console.log('[API] PATCH /admin/schedule - Start');
        console.log('[API] CWD:', process.cwd());

        // Try multiple paths to handle local vs docker contexts
        const possiblePaths = [
            path.join(process.cwd(), 'apps/web/lib/content/content.json'), // Docker/Root
            path.join(process.cwd(), 'lib/content/content.json')           // App Dir
        ];

        console.log('[API] Checking paths:', possiblePaths);

        const filePath = possiblePaths.find(p => fs.existsSync(p));

        if (!filePath) {
            console.error('[API] Content file not found in paths:', possiblePaths);
            return NextResponse.json({ error: 'Content file not found', checkedPaths: possiblePaths }, { status: 404 });
        }

        console.log('[API] Selected File Path:', filePath);

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const content = JSON.parse(fileContent);

        // Update footer_schedule
        content.footer_schedule = {
            ...content.footer_schedule,
            ...updates
        };

        // Write back to file
        fs.writeFileSync(filePath, JSON.stringify(content, null, 4));
        console.log('[API] Write successful to:', filePath);

        return NextResponse.json({ success: true, data: content, debug_path: filePath });
    } catch (error) {
        console.error('[API] Failed to update schedule:', error);
        return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
    }
}
