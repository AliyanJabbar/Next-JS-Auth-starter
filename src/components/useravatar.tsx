import { auth, signOut } from "@/auth"
 
export default async function UserAvatar() {
  const session = await auth()
 
  if (!session?.user) return null
 
  return (
    <div>
      <img src={session.user.image ?? ""} alt="User Avatar" width={50} height={50} style={{borderRadius: '50%'}} />
      <p>Signed in as {session.user.name}</p>
      <form
        action={async () => {
          "use server"
          await signOut()
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  )
}