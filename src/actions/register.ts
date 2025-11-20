"use server"; // This marks the file as server-side only

import bcrypt from "bcryptjs";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function registerUser(formData: FormData) {
  // 1. Extract data from the form
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  // 2. Basic validation
  if (!email || !password || !name) {
    throw new Error("Missing required fields");
  }

  // 3. Check if user already exists
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUser.length > 0) {
    // In a real app, you'd return an error message to the UI
    console.error("User already exists"); 
    return;
  }

  // 4. Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // 5. Insert into DB (The snippet you provided goes here)
  await db.insert(users).values({
    name,
    email,
    password: hashedPassword,
  });

  // 6. Redirect to login page or home
  redirect("/");
}