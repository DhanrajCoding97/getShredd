'use client'
import { createClient } from '@/lib/supabase/client'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import ShaderBackground from '@/components/ShaderBackground';




export default function LoginPage() {
  const supabase = createClient()

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/api/auth/callback`,
      },
    })
  }

  const formSchema = z.object({
   email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[a-z]/, "Must contain at least one lowercase letter")
    .regex(/[0-9]/, "Must contain at least one number"),
})

  //form default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  return (
    <>
    <ShaderBackground/>
    <main className='min-h-screen grid place-content-center'>
      <div className='px-6 py-4 h-full w-full bg-white-700 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10 border border-gray-100
'>
        <div className='flex flex-col gap-1 items-start justify-start w-full'>
          <h1 className='text-2xl font-bold text-white'>Login to your account </h1>
          <p className='text-[#A1A1A1]'>Enter your email below to login to your account</p>
          </div>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    </main>
    </>
  )
}