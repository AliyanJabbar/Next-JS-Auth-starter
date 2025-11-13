import crypto from "crypto";

export function generateToken() {
  return crypto.randomBytes(32).toString("hex"); // 64 hex chars
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function minutesFromNow(mins: number) {
  const d = new Date();
  d.setMinutes(d.getMinutes() + mins);
  return d;
}
