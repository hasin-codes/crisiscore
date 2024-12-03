import { withClerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default withClerkMiddleware((req: NextRequest) => {
  const { userId } = getAuth(req);
  
  // If the user is not signed in and the route is not public, redirect to sign-in
  if (!userId && !isPublicRoute(req.url)) {
    const signInUrl = new URL('/sign-in', req.url);
    signInUrl.searchParams.set('redirect_url', req.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
});

// Define public routes
function isPublicRoute(url: string): boolean {
  const publicRoutes = ['/', '/sign-in', '/sign-up'];
  const path = new URL(url).pathname;
  return publicRoutes.includes(path);
}

// Stop Middleware running on static files
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next
     * - static (static files)
     * - favicon.ico (favicon file)
     */
    "/((?!static|.*\\..*|_next|favicon.ico).*)",
    "/",
  ],
}; 