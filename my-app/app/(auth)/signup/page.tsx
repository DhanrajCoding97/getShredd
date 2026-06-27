'use client'
import Link from 'next/link';
import SocialAuthButtons from '@/components/SocialAuthButtons';
import { createClient } from '@/lib/supabase/client'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Separator } from '@/components/ui/separator';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import GradientAnimationCard from '@/components/GradientAnimationCard';
import MotionLink from '@/components/MotionLink';
export default function SignUpPage() {
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

  //onSubmit function
  // async function onSubmit(data: z.infer<typeof formSchema>) {
  //   const res = await login
  //   if (res.success) {
  //     form.reset()
  //     toast.success("logged in successfully", {
  //       description: JSON.stringify(data,null,2),
  //       className:"whitespace-pre-wrap font-mono"
  //     })
  //   } else {
  //     toast.error("Failed to log in")
  //   }
  // }

  async function onSubmit(data: z.infer<typeof formSchema>) {
  // const res = await (data);

  // if (res.success) {
  //   form.reset();
  //   toast.success("Logged in successfully");
  // } else {
  //   toast.error(res.error ?? "Failed to log in");
  // }
}

  return (
    <>
    {/* <ShaderBackground/> */}
    <main className='min-h-screen grid place-content-center bg-black'>
      <GradientAnimationCard>
      <div className='min-h-96 min-w-92 px-6 bg-neutral-950 space-y-3 py-4 h-full w-full flex flex-col justify-center rounded-xl '>
        <div className='flex flex-col gap-1 items-start justify-start w-full'>
          <h1 className='text-2xl font-bold text-white'>Sign Up </h1>
          <p className='text-[#A1A1A1]'>Create a new aaccount</p>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
              <Controller
                name='email'
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className='text-white' htmlFor={field.name}>Email</FieldLabel>
                    <Input 
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='johndoe@gmail.com'
                    />
                    {fieldState.invalid && (
                      <FieldError errors= {[fieldState.error]}/>
                    )}
                  </Field>
                )}
              />
              <Controller
                name='password'
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel className='text-white' htmlFor={field.name}>Password</FieldLabel>
                    <Input 
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      placeholder='********'
                    />
                    {fieldState.invalid && (
                      <FieldError errors= {[fieldState.error]}/>
                    )}
                  </Field>
                )}
              />
            <Button variant="outline" className='w-full'>Sign Up</Button>
            </FieldGroup>
        </form>
        <Separator/>
        <SocialAuthButtons />
        {/* <Link href={"/signup"} className='text-white'>Have an account? Log in</Link> */}
        <MotionLink 
          href="/login"
          className="rounded-lg px-6 py-3 text-white text-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        > 
          Have an account? Log in
        </MotionLink>
      </div>
      </GradientAnimationCard>
    </main>
    </>
  )
}