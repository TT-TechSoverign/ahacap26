import { NextResponse } from 'next/server';
import sitemap from '@/app/sitemap';

export const dynamic = 'force-dynamic';

const INDEXNOW_KEY = 'b8e4f9a2c1d74e6b9a0f3c5d8e1a2b4c';
const HOST = 'www.affordablehome-ac.com';

async function pushAllUrlsToIndexNow() {
    const entries = await sitemap();
    const urlList = entries.map((e) => e.url);

    const payload = {
        host: HOST,
        key: INDEXNOW_KEY,
        keyLocation: `https://${HOST}/${INDEXNOW_KEY}.txt`,
        urlList,
    };

    try {
        const res = await fetch('https://api.indexnow.org/indexnow', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify(payload),
        });

        return {
            status: res.status,
            ok: res.ok || res.status === 202,
            submittedCount: urlList.length,
            sampleUrls: urlList.slice(0, 10),
        };
    } catch (err: any) {
        return {
            status: 500,
            ok: false,
            submittedCount: urlList.length,
            error: err?.message || 'IndexNow request failed',
        };
    }
}

export async function GET() {
    const result = await pushAllUrlsToIndexNow();
    return NextResponse.json(result);
}

export async function POST() {
    const result = await pushAllUrlsToIndexNow();
    return NextResponse.json(result);
}
