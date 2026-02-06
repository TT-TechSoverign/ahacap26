
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function PATCH(request: Request) {
    const updates = await request.json();

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

    // Update footer_schedule
    content.footer_schedule = {
        ...content.footer_schedule,
        ...updates
    };

    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(content, null, 4));

    return NextResponse.json({ success: true, data: content });
} catch (error) {
    console.error('Failed to update schedule:', error);
    return NextResponse.json({ error: 'Failed to update schedule' }, { status: 500 });
}
}
