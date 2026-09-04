import fs from 'fs';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
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
    const liveFilePath = path.join(process.cwd(), 'lib/content/content.json.LIVE');
    const contentString = JSON.stringify(content, null, 2);

    fs.writeFileSync(filePath, contentString, 'utf8');
    if (fs.existsSync(liveFilePath)) {
      fs.writeFileSync(liveFilePath, contentString, 'utf8');
    }

    // Trigger on-demand ISR cache invalidation across the site
    try {
      revalidatePath('/', 'layout');
    } catch (revalErr) {
      console.warn('[Save Content] Warning: revalidatePath failed:', revalErr);
    }

    return NextResponse.json({ success: true, revalidated: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save content' }, { status: 500 });
  }
}
