import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized: ({ req, token }) => {
            const protectedPaths = ["/seeker", "/employee", "/admin", "/profile"];
            const isProtected = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));
            if (isProtected && token === null) {
                return false
            }
            return true
        }
    }
})

export const config = { matcher: ["/seeker/:path*", "/employee/:path*", "/admin/:path*", "/profile/:path*"] }
