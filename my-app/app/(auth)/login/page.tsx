'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { CiWarning } from 'react-icons/ci';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import SocialAuthButtons from '@/components/SocialAuthButtons';
import { Separator } from '@/components/ui/separator';
import GradientAnimationCard from '@/components/GradientAnimationCard';
import MotionLink from '@/components/MotionLink';
import { signIn } from '@/app/auth/actions';
export default function LoginPage() {
    const [error, SetError] = useState<string | null>(null);

    const supabase = createClient();
    const router = useRouter();

    const formSchema = z.object({
        email: z
            .string()
            .min(1, 'Email is required')
            .email('Please enter a valid email address'),

        password: z
            .string()
            .min(8, 'Password must be at least 8 characters')
            .regex(/[A-Z]/, 'Must contain at least one uppercase letter')
            .regex(/[a-z]/, 'Must contain at least one lowercase letter')
            .regex(/[0-9]/, 'Must contain at least one number'),
    });

    //form default values
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    async function onSubmit(data: z.infer<typeof formSchema>) {
        SetError(null);
        const res = await signIn(data);
        if (res.success) {
            router.push('/dashboard');
            toast.success(res.message);
        } else {
            SetError(res.message);
            toast.error(res.message);
        }
    }

    return (
        <GradientAnimationCard>
            <div className='flex h-full min-h-96 w-full flex-col justify-center space-y-4 rounded-xl bg-neutral-950 px-6 py-4'>
                <div className='flex w-full flex-col items-start justify-start gap-1'>
                    <h1 className='text-2xl font-bold text-white'>
                        Login to your account{' '}
                    </h1>
                    <p className='text-[#A1A1A1]'>
                        Enter your email below to login to your account
                    </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className='gap-0'>
                        <Controller
                            name='email'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder='johndoe@gmail.com'
                                        className='text-white'
                                    />
                                    <div className='min-h-5'>
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </div>
                                </Field>
                            )}
                        />
                        <Controller
                            name='password'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    className='mt-1'
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor={field.name}>
                                        Password
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder='********'
                                        className='text-white'
                                    />
                                    <div className='min-h-5'>
                                        {fieldState.invalid && (
                                            <FieldError
                                                errors={[fieldState.error]}
                                            />
                                        )}
                                    </div>
                                </Field>
                            )}
                        />
                        <Button variant='outline' className='mt-1 w-full'>
                            Log in
                        </Button>
                    </FieldGroup>
                </form>
                {error && (
                    <div className='flex w-full items-center justify-center gap-2 rounded-lg bg-[#4D0218] py-1.5'>
                        <CiWarning color='white' />
                        <p className='flex text-sm font-semibold text-[#FFA1AD]'>
                            {error}
                        </p>
                    </div>
                )}
                <Separator label='or' />
                <SocialAuthButtons />
                <MotionLink
                    href='/signup'
                    className='rounded-lg px-2 py-1.5 text-center text-white'
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Don't have an account? Sign up
                </MotionLink>
            </div>
        </GradientAnimationCard>
    );
}
