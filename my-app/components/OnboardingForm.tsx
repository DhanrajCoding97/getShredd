'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { CiWarning } from 'react-icons/ci';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { completeOnboarding } from '@/lib/actions/onboarding';
import {
    onboardingSchema,
    type OnboardingSchema,
} from '@/lib/schemas/onboarding';
import { Button } from '@/components/ui/button';
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

const GENDERS = ['male', 'female', 'other'];

const ACTIVITY_LEVELS = [
    { value: 'sedentary', label: 'Sedentary', desc: 'Little or no exercise' },
    { value: 'light', label: 'Light', desc: '1-3 days/week' },
    { value: 'moderate', label: 'Moderate', desc: '3-5 days/week' },
    { value: 'active', label: 'Active', desc: '6-7 days/week' },
    {
        value: 'very_active',
        label: 'Very active',
        desc: 'Physical job or 2x/day',
    },
];

const GOALS = [
    { value: 'lose', label: 'Lose weight', desc: '-500 kcal/day' },
    {
        value: 'maintain',
        label: 'Maintain weight',
        desc: 'Stay at current weight',
    },
    { value: 'gain', label: 'Gain muscle', desc: '+300 kcal/day' },
];

export default function OnboardingForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    //form default values
    const form = useForm<z.infer<typeof onboardingSchema>>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            name: '',
            age: 18,
            gender: 'male',
            weight: 67,
            weightUnit: 'kg',
            height: 178,
            heightUnit: 'cm',
            activityLevel: 'very_active',
            goal: 'maintain',
        },
    });

    async function onSubmit(data: z.infer<typeof onboardingSchema>) {
        setLoading(true);
        setError(null);
        const res = await completeOnboarding(data);
        if (res?.error) {
            setError('Something went wrong. Please try again.');
            setLoading(false);
            toast.error('Something went wrong. Please try again.');
        }
        // redirect happens server-side on success
    }

    return (
        <div>
            {' '}
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className='gap-0'>
                    <Controller
                        name='name'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel
                                    className='text-white'
                                    htmlFor={field.name}
                                >
                                    Email
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder='john'
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
                    {/* age input */}
                    <Controller
                        name='age'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                className='mt-1'
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel
                                    className='text-white'
                                    htmlFor={field.name}
                                >
                                    Age
                                </FieldLabel>
                                <Input
                                    type='number'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder='18'
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
                    {/* select gender */}
                    <Controller
                        name='age'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                className='mt-1'
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel
                                    className='text-white'
                                    htmlFor={field.name}
                                >
                                    Gender
                                </FieldLabel>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue>
                                            <SelectContent>
                                                {GENDERS.map((gender) => (
                                                    <SelectItem
                                                        key={gender}
                                                        value={gender}
                                                    >
                                                        {gender}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </SelectValue>
                                    </SelectTrigger>
                                </Select>
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
                    {/* <Button variant='outline' className='mt-1 w-full'>
                        Log in
                    </Button> */}
                    <button
                        type='submit'
                        disabled={loading}
                        className='bg-primary text-primary-foreground w-full rounded-lg py-2 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50'
                    >
                        {loading ? 'Saving...' : 'Calculate my goals'}
                    </button>
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
        </div>
    );
}
