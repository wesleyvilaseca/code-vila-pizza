import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    let authCookie = request.cookies.get('@nextauth.token');
    if(authCookie) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url)); 
}

export const config = {
    matcher: ['/admin/:dashboard*']
}