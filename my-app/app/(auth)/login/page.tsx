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
    <div className='min-h-screen grid place-content-center bg-black'>
      <div className='py-6 px-8 flex flex-col items-center border border-gray-500 rounded-md min-w-125 bg-[#171717]'>
        <div className='flex flex-col gap-1 items-start justify-start w-full'>
          <h1 className='text-2xl font-bold text-white'>Login to your account </h1>
          <p className='text-[#A1A1A1]'>Enter your email below to login to your account</p>
          </div>
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      </div>
    </div>
  )
}