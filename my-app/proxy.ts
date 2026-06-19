import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
    let supabaseResponse = NextResponse.next({request}) 

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL! || 'https://ifxvdskxjnlzzngfdciy.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmeHZkc2t4am5senpuZ2ZkY2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2OTI5MTgsImV4cCI6MjA5NzI2ODkxOH0.TLwV-Qm_bCTU_VQc0S4e-QFlM1YPZR6TukB0n4m5CR4",
        {
        cookies: {
            getAll() { return request.cookies.getAll() },
            setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
            )
            },
        },
        }
    )

    const {data : { user } } = await supabase.auth.getUser()

    // redirect unauthenticated users away from protected routes
    if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // redirect logged-in users away from login page
    if (user && request.nextUrl.pathname === '/login') {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    return supabaseResponse
}

export const config = {
  matcher: ['/dashboard/:path*', '/login'],
}