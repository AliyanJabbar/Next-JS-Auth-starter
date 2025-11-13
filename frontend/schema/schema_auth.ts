import { z } from "zod";

// Mirrors the backend schema in src/app/api/auth/signup/route.ts
export const ServerSignUpSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required").max(50),
  lastName: z.string().trim().min(1, "Last name is required").max(50),
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[a-z]/, "Must include a lowercase letter")
    .regex(/[A-Z]/, "Must include an uppercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include a symbol"),
  planTier: z.enum(["FREE", "PRO"]).default("FREE"),
});

// Client-side schema adds confirm password and checks equality
export const ClientSignUpSchema = ServerSignUpSchema.extend({
  confirm: z.string(),
})
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match.",
  });

export type ServerSignUpInput = z.infer<typeof ServerSignUpSchema>;
export type ClientSignUpInput = z.infer<typeof ClientSignUpSchema>;

// Sign-in schema for frontend validation
export const ClientSignInSchema = z.object({
  email: z.string().trim().toLowerCase().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
  remember: z.boolean().optional().default(false),
});
export type ClientSignInInput = z.infer<typeof ClientSignInSchema>;


