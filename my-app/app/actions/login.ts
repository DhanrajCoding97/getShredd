'use server';

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation"

// import { createClient } from "@/lib/supabase/server-client";

// export async function login (data: {
//     email:string,
//     password: string
// }) {
//     const supabase = await createClient();

//     const {error} = await supabase.auth.signInWithPassword({
//         email: data.email,
//         password: data.password,
//     })

//     if(error) {
//         return {
//             success: false,
//             error: error.message,
//         }
//     }
//     return {
//         success: true,
//     }
// }
export type FormDataProps= {
    email: 'string'
    password: 'string'
}
//signup action
export async function signup(formData: FormDataProps){
    const supabase = await createClient()

    const data = {
        email : formData.email,
        password: formData.password
    }

    const { error } = await supabase.auth.signUp(data)

    if(error) {
        redirect('/error')
    }
    revalidatePath('/', 'layout')
    redirect('/dashboard')
}

