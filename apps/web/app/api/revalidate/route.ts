import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const secret = body.secret;
        const path = body.path || '/shop';

        const VALID_SECRET = process.env.REVALIDATE_SECRET;
        if (!VALID_SECRET || secret !== VALID_SECRET) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        revalidatePath(path);
        
        return NextResponse.json({ revalidated: true, path, now: Date.now() });
    } catch (err) {
        return NextResponse.json({ error: "Failed to revalidate" }, { status: 500 });
    }
}
