import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) {
    const loginUrl = `${req.nextUrl.origin}/login`;

    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/about",
    "/",
    "/contact",
    "/imagegallery",
    "/post/:path*",
    "/dashboard",
    "/dashboard/:page*",
  ],
};
