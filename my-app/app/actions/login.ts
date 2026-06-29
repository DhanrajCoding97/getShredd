'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export type FormDataProps = {
    email: 'string';
    password: 'string';
};

//signup action
export async function signup(formData: FormDataProps) {
    const supabase = await createClient();

    const data = {
        email: formData.email,
        password: formData.password,
    };

    const { error } = await supabase.auth.signUp(data);

    if (error) {
        redirect('/error');
    }
    revalidatePath('/', 'layout');
    redirect('/dashboard');
}
