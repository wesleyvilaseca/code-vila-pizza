import { NextRequest, NextResponse } from "next/server";
import { myMiddlewares } from "./middlewares";

export async function middleware(request: NextRequest) {
    return myMiddlewares(request);
}