import fs from 'fs';
import { NextResponse } from 'next/server';
import path from 'path';

export async function POST(request: Request) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    const content = await request.json();

    // Basic validation
    if (!content || typeof content !== 'object') {
      return NextResponse.json({ error: 'Invalid content structure' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'lib/content/content.json');
    const backupPath = `${filePath}.bak`;

    // Create backup before overwrite
    if (fs.existsSync(filePath)) {
      fs.copyFileSync(filePath, backupPath);
    }

    fs.writeFileSync(filePath, JSON.stringify(content, null, 2), 'utf8');

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
