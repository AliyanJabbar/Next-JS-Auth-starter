export { auth as middleware } from "@/auth"

// import { auth } from "@/auth";

// export default auth((req) => {
//   const isLoggedIn = !!req.auth;
//   const { nextUrl } = req;

//   // 1. Define routes
//   const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
//   const isAuthRoute = 
//     nextUrl.pathname.startsWith("/login") || 
//     nextUrl.pathname.startsWith("/register") || 
//     nextUrl.pathname.startsWith("/forgot-password");
  
//   // You can add more public routes here if needed
//   const isPublicRoute = nextUrl.pathname === "/";

//   // 2. Always allow API Auth routes (internal use)
//   if (isApiAuthRoute) {
//     return;
//   }

//   // 3. Logic: If user is on an Auth page (Login/Register) but is ALREADY logged in
//   if (isAuthRoute) {
//     if (isLoggedIn) {
//       // Redirect them to home (or /dashboard)
//       return Response.redirect(new URL("/", nextUrl));
//     }
//     return;
//   }

//   // 4. Logic: If user is not logged in and trying to access a protected route
//   // (In this simple example, we allow "/" as public, but you can change this)
//   if (!isLoggedIn && !isPublicRoute) {
//     return Response.redirect(new URL("/login", nextUrl));
//   }

//   return;
// });

// // 5. Config: Matcher prevents middleware from running on static files (images, css, etc.)
// export const config = {
//   matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };