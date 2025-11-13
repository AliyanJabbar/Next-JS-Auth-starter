// In-memory limiter: fine for dev/single instance. Use Redis in prod multi-instances.
const BUCKET = new Map<string, { count: number; resetAt: number }>();

export function rateLimit(key: string, windowMs: number, max: number) {
  const now = Date.now();
  const b = BUCKET.get(key);
  if (!b || b.resetAt < now) {
    BUCKET.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (b.count >= max) return false;
  b.count++;
  return true;
}

/** Build a consistent key per route/user/ip */
export function rateKey(route: string, userId: string | undefined, ip: string | null) {
  return `${route}:${userId ?? "nouser"}:${ip ?? "noip"}`;
}
