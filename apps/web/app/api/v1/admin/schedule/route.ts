
import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function PATCH(request: Request) {
    try {
        const updates = await request.json();
        const filePath = path.join(process.cwd(), 'lib/content/content.json');

        if (!fs.existsSync(filePath)) {
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
