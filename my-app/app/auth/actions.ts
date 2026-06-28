'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { SignupDataProps, SignUpResponse, SignInResponse } from '../types/auth';
export async function signOut() {
    const supabase = await createClient();

    // Sign out from Supabase auth
    const { error } = await supabase.auth.signOut();

    if (error) {
        redirect('/error');
    }

    // Clear cache for protected pages and redirect
    revalidatePath('/', 'layout');
    redirect('/login');
}

//signup action
export async function signUp(
    formData: SignupDataProps,
): Promise<SignUpResponse> {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
        },
    });

    if (error) {
        return {
            success: false,
            message: error.message,
            user: null,
        };
    }

    if (!data.user) {
        return {
            success: false,
            message: 'Something went wrong. Please try again.',
            user: null,
        };
    }

    // User already exists
    if (data.user.identities?.length === 0) {
        return {
            success: false,
            message: 'User with this email already exists. Please log in.',
            user: null,
        };
    }

    revalidatePath('/', 'layout');

    return {
        success: true,
        message: 'Check your email to confirm your account.',
        user: {
            id: data.user.id,
            email: data.user.email ?? null, // undefined → null
        },
    };
}

//SignIn action
export async function signIn(
    formData: SignupDataProps,
): Promise<SignInResponse> {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
    });

    if (error) {
        return {
            success: false,
            message: error.message,
            user: null,
        };
    }

    if (!data.user) {
        return {
            success: false,
            message: 'Something went wrong. Please try again.',
            user: null,
        };
    }

    revalidatePath('/', 'layout');

    return {
        success: true,
        message: 'Logged in successfully.',
        user: data.user,
    };
}
