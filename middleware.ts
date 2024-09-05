import { clerkClient } from "@clerk/nextjs/server";
import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/", "/sign-in", "/sign-up"],
  signInUrl: "/sign-in",
  signUpUrl: "/sign-up",
  secretKey: process.env.CLERK_SECRET_KEY,
  async beforeAuth(req) {
    // Use clerkClient as a function
    const client = clerkClient();
    // ... rest of your code ...
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};