import { NextRequest, NextResponse } from "next/server";

export default async function checkAuth(request: NextRequest) {
    let authCookie = request.cookies.get('@nextauth.token');
    if(authCookie) {
        return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/", request.url)); 
}