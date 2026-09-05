import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const secret = body?.secret;
        const path = body?.path || '/shop';

        const VALID_SECRET = process.env.REVALIDATE_SECRET || "internal_ahac_revalidate_777";
        if (!secret || secret !== VALID_SECRET) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        revalidatePath(path, 'page');
        
        return NextResponse.json({ revalidated: true, path, now: Date.now() });
    } catch (err: any) {
        console.error("Revalidation error:", err);
        return NextResponse.json({ error: "Failed to revalidate", message: err?.message || String(err) }, { status: 500 });
    }
}
