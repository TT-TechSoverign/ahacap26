import { NextRequest, NextResponse } from 'next/server';
import sitemap from '@/app/sitemap';

export const dynamic = 'force-dynamic';

const INDEXNOW_KEY = 'b8e4f9a2c1d74e6b9a0f3c5d8e1a2b4c';
const HOST = 'www.affordablehome-ac.com';
const COOLDOWN_MS = 5 * 60 * 1000; // 5-minute outbound amplification guard
let lastSubmissionEpochMs = 0;

function hasAdminBypass(req: NextRequest): boolean {
    const revalidateSecret = (process.env.REVALIDATE_SECRET || '').trim();
    const devOsKey = (process.env.DEV_OS_MASTER_PASSWORD || '').trim();
    const headerSecret = (req.headers.get('x-indexnow-secret') || req.headers.get('x-dev-os-key') || '').trim();
    return Boolean(
        headerSecret &&
        ((revalidateSecret && headerSecret === revalidateSecret) || (devOsKey && headerSecret === devOsKey))
    );
}

async function pushAllUrlsToIndexNow(req: NextRequest) {
    const now = Date.now();
    if (!hasAdminBypass(req) && now - lastSubmissionEpochMs < COOLDOWN_MS) {
        return {
            status: 429,
            ok: false,
            throttled: true,
            retryAfterSeconds: Math.ceil((COOLDOWN_MS - (now - lastSubmissionEpochMs)) / 1000),
        };
    }
    lastSubmissionEpochMs = now;

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
    } catch {
        return {
            status: 500,
            ok: false,
            submittedCount: urlList.length,
            error: 'IndexNow submission temporarily unavailable',
        };
    }
}

export async function GET(req: NextRequest) {
    const result = await pushAllUrlsToIndexNow(req);
    return NextResponse.json(result, { status: result.throttled ? 429 : 200 });
}

export async function POST(req: NextRequest) {
    const result = await pushAllUrlsToIndexNow(req);
    return NextResponse.json(result, { status: result.throttled ? 429 : 200 });
}
