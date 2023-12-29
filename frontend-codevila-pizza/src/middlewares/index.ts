import { NextRequest } from "next/server";
import checkAuth from "./checkAuthMiddleware/checkAuth.middleware";

export async function myMiddlewares(request: NextRequest) {
    switch (true) {
        case request.url.includes('/admin/'):
            return checkAuth(request);
    }
}
