// src/lib/security/csrf.ts
import type { NextRequest } from "next/server";

export class CsrfError extends Error {
  status = 403 as const;
  constructor(message = "Bad origin") {
    super(message);
    this.name = "CsrfError";
  }
}

export function assertSameOrigin(req: NextRequest) {
  const host = req.headers.get("host");
  const origin = req.headers.get("origin");
  const referer = req.headers.get("referer");
  const url = req.nextUrl; // e.g., http://localhost:3000/api/...

  const originOk =
    (origin && host && origin.includes(host)) ||
    (referer && host && referer.includes(host)) ||
    // final fallback: exact same origin
    (url && `${url.protocol}//${url.host}` === origin);

  if (!originOk) {
    throw new CsrfError();
  }
}
