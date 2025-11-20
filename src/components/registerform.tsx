import { registerUser } from "@/actions/register";

export default function RegisterForm() {
  return (
    <div className="border p-4 rounded shadow-md w-96 bg-white text-black">
      <h2 className="text-xl mb-4 font-bold">Create Account</h2>
      
      {/* The action prop connects this form to your server function */}
      <form action={registerUser} className="flex flex-col gap-4">
        
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="border p-2 rounded"
          required
        />
        
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          required
        />
        
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 rounded"
          required
        />
        
        <button 
          type="submit" 
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}