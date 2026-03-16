import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const hostname = req.headers.get("host") ?? "";

  // Route shop.bookease.co subdomain to /shop
  const isShopSubdomain =
    hostname === "shop.bookease.co" ||
    hostname.startsWith("shop.bookease.co:") ||
    hostname === "shop.localhost" ||
    hostname.startsWith("shop.localhost:");
  if (isShopSubdomain && pathname === "/") {
    return NextResponse.rewrite(new URL("/shop", req.url));
  }

  // Protect merchant routes
  if (pathname.startsWith("/merchant/") && pathname !== "/merchant/onboarding") {
    if (!req.auth) {
      const loginUrl = new URL("/auth/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/",
    "/merchant/:path*",
    "/account/:path*",
  ],
};
