// // src/lib/security/secret-hash.ts
// import argon2 from "argon2";
// import bcrypt from "bcryptjs";

// function isArgonHash(hash?: string | null): boolean {
//   return !!hash && hash.startsWith("$argon2");
// }
// function isBcryptHash(hash?: string | null): boolean {
//   return !!hash && (hash.startsWith("$2a$") || hash.startsWith("$2b$") || hash.startsWith("$2y$"));
// }

// /** Verify against argon2id or bcrypt (no write). */
// export async function verifyHash(plaintext: string, hash?: string | null): Promise<boolean> {
//   if (!hash) return false;
//   if (isArgonHash(hash)) return argon2.verify(hash, plaintext);
//   if (isBcryptHash(hash)) return bcrypt.compare(plaintext, hash);
//   return false;
// }

// /** Verify and, if the stored hash is bcrypt and verification succeeds, upgrade to argon2id. */
// export async function verifyAndMaybeUpgrade(
//   plaintext: string,
//   existingHash: string | null | undefined,
//   onUpgrade: (newHash: string) => Promise<void>
// ): Promise<boolean> {
//   const ok = await verifyHash(plaintext, existingHash);
//   if (!ok) return false;

//   if (isBcryptHash(existingHash)) {
//     const newHash = await argon2.hash(plaintext, { type: argon2.argon2id });
//     try {
//       await onUpgrade(newHash);
//     } catch {
//       // don't block the request if upgrade fails
//     }
//   }
//   return true;
// }

// /** Always hash new secrets with argon2id. */
// export function hashArgon2id(plaintext: string): Promise<string> {
//   return argon2.hash(plaintext, { type: argon2.argon2id });
// }