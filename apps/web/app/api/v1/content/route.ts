import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const filePath = path.join(process.cwd(), 'lib/content/content.json');

        if (!fs.existsSync(filePath)) {
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
