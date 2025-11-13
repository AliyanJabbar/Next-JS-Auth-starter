// src/lib/profileImage.ts
import { promises as fs } from "fs";
import path from "path";
import { createHash } from "node:crypto";

/**
 * Profile image upload directory: var/uploads/ProfileImages
 */
export const PROFILE_UPLOAD_ROOT = path.join(process.cwd(), "var", "uploads", "ProfileImages");

/** Ensure the profile upload directory exists. */
export async function ensureProfileUploadDir() {
  await fs.mkdir(PROFILE_UPLOAD_ROOT, { recursive: true });
}

/** Keep filenames predictable and filesystem-safe. */
export function sanitizeName(name: string) {
  const cleaned = (name || "image").replace(/[^a-zA-Z0-9._-]+/g, "_").slice(0, 128);
  return cleaned.length ? cleaned : "image";
}

/** sha256 hex of a byte array. */
export function sha256Of(arr: Uint8Array) {
  return createHash("sha256").update(arr).digest("hex");
}

/**
 * Save a profile image to local disk.
 * Returns the relative path that will be stored in database.
 */
export async function saveProfileImage(userId: string, file: File) {
  await ensureProfileUploadDir();

  const arr = new Uint8Array(await file.arrayBuffer());
  const digest = sha256Of(arr);
  const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const safeExtension = ["jpg", "jpeg", "png", "webp", "gif"].includes(extension) ? extension : "jpg";
  const fileName = `${userId}_${digest.slice(0, 16)}.${safeExtension}`;

  const absPath = path.join(PROFILE_UPLOAD_ROOT, fileName);
  await fs.writeFile(absPath, arr);

  // Return relative path for database storage
  return `/var/uploads/ProfileImages/${fileName}`;
}

/**
 * Delete a profile image from local disk.
 * Takes the path from database (e.g., /var/uploads/ProfileImages/filename.jpg)
 */
export async function deleteProfileImage(imagePath: string) {
  // Handle both new and old path formats
  if (!imagePath || (!imagePath.startsWith("/var/uploads/ProfileImages/") && !imagePath.startsWith("/var/upload/"))) {
    return; // Invalid path or not a local upload
  }

  const fileName = path.basename(imagePath);
  // Use new path location even if old path is in database
  const absPath = path.join(PROFILE_UPLOAD_ROOT, fileName);

  // Verify the path is inside the upload directory (security)
  const resolved = path.resolve(absPath);
  const rootResolved = path.resolve(PROFILE_UPLOAD_ROOT);
  if (!resolved.startsWith(rootResolved)) {
    throw new Error("Unsafe path resolution");
  }

  await fs.rm(absPath, { force: true });
  
  // Also try to delete from old location if it exists
  if (imagePath.startsWith("/var/upload/")) {
    const oldPath = path.join(process.cwd(), "var", "upload", fileName);
    await fs.rm(oldPath, { force: true }).catch(() => {
      // Ignore errors if old path doesn't exist
    });
  }
}

/**
 * Get absolute path from database path
 */
export function getProfileImagePath(dbPath: string): string | null {
  // Handle both new and old path formats
  if (!dbPath || (!dbPath.startsWith("/var/uploads/ProfileImages/") && !dbPath.startsWith("/var/upload/"))) {
    return null;
  }
  const fileName = path.basename(dbPath);
  // Always use new location
  return path.join(PROFILE_UPLOAD_ROOT, fileName);
}
