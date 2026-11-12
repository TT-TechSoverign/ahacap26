import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import crypto from "crypto";

function safeCompare(a: string, b: string): boolean {
    const bufA = Buffer.from(a, "utf8");
    const bufB = Buffer.from(b, "utf8");
    if (bufA.length === 0 || bufA.length !== bufB.length) {
        return false;
    }
    return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json().catch(() => ({}));
        const secret = body?.secret;
        const rawPath = typeof body?.path === "string" ? body.path : "/shop";
        const path = /^\/[A-Za-z0-9/_-]*$/.test(rawPath) && rawPath.length <= 200 ? rawPath : "/shop";

        const VALID_SECRET = (process.env.REVALIDATE_SECRET || "").trim();
        const incomingSecret = typeof secret === "string" ? secret.trim() : "";
        if (!VALID_SECRET || !incomingSecret || !safeCompare(incomingSecret, VALID_SECRET)) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        revalidatePath(path, "page");

        return NextResponse.json({ revalidated: true, path, now: Date.now() });
    } catch (err: any) {
        console.error("Revalidation error:", err?.message || err);
        return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
    }
}
