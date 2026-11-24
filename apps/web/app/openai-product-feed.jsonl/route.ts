import { NextRequest } from 'next/server';
import { GET as getOpenAiFeed } from '@/app/api/openai-feed/route';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    const url = new URL(request.url);
    url.searchParams.set('format', 'jsonl');
    const jsonlReq = new NextRequest(url, { headers: request.headers });
    return getOpenAiFeed(jsonlReq);
}
