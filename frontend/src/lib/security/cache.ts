import { NextResponse } from "next/server";

/** Force responses not to be cached anywhere. */
export function noStore<T extends NextResponse>(res: T): T {
  res.headers.set("Cache-Control", "no-store");
  return res;
}
