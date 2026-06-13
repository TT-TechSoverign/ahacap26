import fs from 'fs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import path from 'path';

export async function POST(request: Request) {
  try {
    // 1. Authenticate Request
    const cookieStore = cookies();
    const adminSession = cookieStore.get('admin_session')?.value;

    if (!adminSession) {
      return NextResponse.json({ error: 'Unauthorized: Missing session token' }, { status: 401 });
    }

    const apiInternalUrl = process.env.API_INTERNAL_URL || 'http://localhost:8000';
    
    // Verify token with backend
    try {
      const verifyRes = await fetch(`${apiInternalUrl}/api/v1/admin/verify`, {
        method: 'POST',
        headers: {
          'Authorization': adminSession.startsWith('Bearer ') ? adminSession : `Bearer ${adminSession}`,
        },
        cache: 'no-store'
      });

      if (!verifyRes.ok) {
        return NextResponse.json({ error: 'Unauthorized: Invalid session token' }, { status: 401 });
      }
    } catch (err) {
      console.error('[Save Content Auth Error] Verification service unavailable:', err);
      return NextResponse.json({ error: 'Authentication service unavailable' }, { status: 503 });
    }

    // 2. Process Content Update
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
