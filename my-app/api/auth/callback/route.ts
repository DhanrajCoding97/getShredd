// import { NextResponse } from "next/server";
// import { createClient } from "@/lib/supabase/server";

// export async function GET (request: Request) {
//     const {searchParams, origin} = new URL (request.url)
//     const code = searchParams.get('code')

//     if(code) {
//         const supabase = await createClient()
//         const {data, error} = await supabase.auth.exchangeCodeForSession(code)
    
//         if(!error && data.user) {
//             // upsert profile row on first login
//             await supabase.from('profiles').upsert({
//                 id: data.user.id,
//                 daily_calorie_goal : 2000,
//             }, { onConflict: 'id', ignoreDuplicates: true})
//             return NextResponse.redirect(`${origin}/dashboard`)
//     }
// }
// return NextResponse.redirect(`${origin}/login?error=auth_failed`)
// }



import { NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
    console.log('code:', code)
    console.log('all params:', Object.fromEntries(searchParams))
  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=no_code`)
  }

    

  const cookieStore = await cookies()

  const response = NextResponse.redirect(`${origin}/dashboard`)

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          // write cookies onto the RESPONSE, not the request cookieStore
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.user) {
    console.error('Auth error:', error)
    return NextResponse.redirect(`${origin}/login?error=auth_failed`)
  }

  await supabase.from('profiles').upsert({
    id: data.user.id,
    daily_calorie_goal: 2000,
  }, { onConflict: 'id', ignoreDuplicates: true })

  return response
}