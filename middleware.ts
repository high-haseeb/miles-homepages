// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // Clone the request headers and set a new header `x-token`
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-token", token || "");

  // You can also verify the token here if needed

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: "/:path*",
};
