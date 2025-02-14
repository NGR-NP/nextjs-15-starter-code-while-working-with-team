import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(request: NextRequest) {
  const ua = userAgent(request);
  // if (ua.isBot) return NextResponse.redirect(new URL("https://google.com"));

  console.log("ua", ua.isBot);
  return NextResponse.next();
}
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)"
  ]
};
