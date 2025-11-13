// src/app/api/auth/heartbeat/route.ts
export const runtime = "nodejs";

import { NextRequest, NextResponse } from "next/server";
import { requireAuthApi, UnauthorizedError } from "@/lib/auth/requireAuthApi";
import { assertSameOrigin } from "@/lib/security/csrf";
import { rateKey, rateLimit } from "@/lib/security/rateLimiter";
import { noStore } from "@/lib/security/cache";

export async function POST(req: NextRequest) {
  try {
    assertSameOrigin(req);
    const userId = await requireAuthApi(req);

    const ip = req.headers.get("x-forwarded-for") || "0.0.0.0";

    if (!rateLimit(rateKey("auth:heartbeat", userId, ip), 5 * 60_000, 60)) {
      return noStore(NextResponse.json({ ok: false }, { status: 429 }));
    }

    return noStore(NextResponse.json({ ok: true }));
  } catch (e) {
    const status = e instanceof UnauthorizedError ? 401 : 500;
    return noStore(NextResponse.json({ ok: false }, { status }));
  }
}
