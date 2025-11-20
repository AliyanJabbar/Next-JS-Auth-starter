import SignIn from "@/components/signin";
import UserAvatar from "@/components/useravatar";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-4">
      <h1 className="text-2xl font-bold">Next.js 16 + Neon + Auth.js</h1>
      
      {session ? (
        <UserAvatar />
      ) : (
        <SignIn />
      )}
    </main>
  );
}