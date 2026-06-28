// import { EmailOtpType } from '@supabase/supabase-js';
// import { type NextRequest, NextResponse } from 'next/server';
// import { createClient } from '@/lib/supabase/server';

// // GET request handler for /auth/confirm route
// export async function GET(request: NextRequest) {
//     const { searchParams } = new URL(request.url);
//     const token_hash = searchParams.get('token_hash');
//     const type = searchParams.get('type') as EmailOtpType | null;
//     const next = '/';

//     // redirect link without secret token
//     const redirectTo = request.nextUrl.clone();
//     redirectTo.pathname = next;
//     redirectTo.searchParams.delete('token_hash');
//     redirectTo.searchParams.delete('type');

//     if (token_hash && type) {
//         const supabase = await createClient();
//         const { error } = await supabase.auth.verifyOtp({
//             type,
//             token_hash,
//         });
//         if (!error) {
//             redirectTo.searchParams.delete('next');
//             return NextResponse.redirect(redirectTo);
//         }
//     }

//     // return the user to error page
//     redirectTo.pathname = '/error';
//     return NextResponse.redirect(redirectTo);
// }

import { EmailOtpType } from '@supabase/supabase-js';
import { type NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type') as EmailOtpType | null;
    const code = searchParams.get('code');

    const supabase = await createClient();

    // handle PKCE flow (OAuth + email confirmation sends ?code=)
    if (code) {
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    // handle token_hash flow (magic link, OTP)
    if (token_hash && type) {
        const { error } = await supabase.auth.verifyOtp({
            type,
            token_hash,
        });
        if (!error) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }
    }

    // both failed
    return NextResponse.redirect(new URL('/error', request.url));
}
