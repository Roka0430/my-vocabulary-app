import { NextResponse } from "next/server";

export function middleware(request) {
  const path = request.nextUrl.pathname;
  const isProtectedPath = path.startsWith("/main.html");
  const token = request.cookies.get("login_token")?.value;
  if (isProtectedPath && token !== "success") {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
