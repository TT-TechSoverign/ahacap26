import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Try multiple paths to handle local vs docker contexts
        const possiblePaths = [
            path.join(process.cwd(), 'apps/web/lib/content/content.json'), // Docker/Root
            path.join(process.cwd(), 'lib/content/content.json')           // App Dir
        ];

        const filePath = possiblePaths.find(p => fs.existsSync(p));

        if (!filePath) {
            console.error('Content file not found in paths:', possiblePaths);
            return NextResponse.json({ error: 'Content file not found' }, { status: 404 });
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const content = JSON.parse(fileContent);

        return NextResponse.json(content);
    } catch (error) {
        console.error('Failed to fetch content:', error);
        return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
    }
}
