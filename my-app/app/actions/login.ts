'use server';

import { createClient } from "@/lib/supabase/server-client";

export async function login (data: {
    email:string,
    password: string
}) {
    const supabase = await createClient();

    const {error} = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
    })

    if(error) {
        return {
            success: false,
            error: error.message,
        }
    }
    return {
        success: true,
    }
}