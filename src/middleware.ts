import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
const protectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/personal-room',
    '/meeting/(.*)'
])

// The createRouteMatcher function takes as parameter all the protectedRoutes 

export default clerkMiddleware((auth, req) => {
if(protectedRoutes(req))
auth().protect();
});
// this will not allow to visit the protected routes without authentication

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};