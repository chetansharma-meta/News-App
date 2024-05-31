import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
  });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/login") ||
      url.pathname.startsWith("/register") ||
      url.pathname.startsWith("/api")
    )
  ) {
    return NextResponse.redirect(new URL("/profile", request.url));
  } else if (!token && 
    (url.pathname.startsWith("/profile") ||
      url.pathname.startsWith("/upload") ||
      url.pathname.startsWith("/api"))
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
}

export const config = {
  matcher: ["/login", "/register","/upload","/api", "/profile/:path*"],
};
