'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function signOut() {
  const supabase = await createClient()

  // Sign out from Supabase auth
  const { error } = await supabase.auth.signOut()

  if (error) {
    redirect('/error')
  }

  // Clear cache for protected pages and redirect
  revalidatePath('/', 'layout')
  redirect('/login')
}