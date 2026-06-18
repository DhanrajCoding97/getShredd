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
import { login } from '@/app/actions/login';
import { FcGoogle } from "react-icons/fc";

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
  const res = await login(data);

  if (res.success) {
    form.reset();
    toast.success("Logged in successfully");
  } else {
    toast.error(res.error ?? "Failed to log in");
  }
}

  return (
    <>
    {/* <ShaderBackground/> */}
    <main className='min-h-screen grid place-content-center bg-black'>
      <div className='px-6 py-4 h-full w-full rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-gray-100'>
        <div className='flex flex-col gap-1 items-start justify-start w-full'>
          <h1 className='text-2xl font-bold text-white'>Login to your account </h1>
          <p className='text-[#A1A1A1]'>Enter your email below to login to your account</p>
        </div>
        
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FieldGroup>
              <Controller
                name='email'
                control={form.control}
                render={({field, fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input 
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
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
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input 
                      {...field}
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid && (
                      <FieldError errors= {[fieldState.error]}/>
                    )}
                  </Field>
                )}
              />
            <Button variant="outline" className='w-full'>Log in</Button>
            </FieldGroup>
        </form>
            <Button variant="default" onClick={signInWithGoogle}>Sign in with Google <FcGoogle/> </Button>
      
      </div>
    </main>
    </>
  )
}