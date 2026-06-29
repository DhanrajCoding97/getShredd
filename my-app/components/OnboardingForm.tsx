'use client';
import { useState } from 'react';
import { z } from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { CiWarning } from 'react-icons/ci';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { completeOnboarding } from '@/lib/actions/onboarding';
import { onboardingSchema } from '@/lib/schemas/onboarding';
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
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from './ui/select';

const GENDERS = ['male', 'female', 'other'];

const WEIGHT_UNITS = ['kg', 'lbs'];

const HEIGHT_UNITS = ['ft', 'cm'];

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
    const [error, setError] = useState<string | null>(null);

    //form default values
    const form = useForm<z.infer<typeof onboardingSchema>>({
        resolver: zodResolver(onboardingSchema),
        defaultValues: {
            name: '',
            age: '' as unknown as number,
            gender: undefined,
            weight: '' as unknown as number,
            weightUnit: 'kg',
            height: '' as unknown as number,
            heightUnit: 'cm',
            activityLevel: undefined,
            goal: undefined,
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    async function onSubmit(data: z.infer<typeof onboardingSchema>) {
        setError(null);
        const res = await completeOnboarding(data);
        if (res?.error) {
            setError('Something went wrong. Please try again.');
            toast.error('Something went wrong. Please try again.');
        }
        // redirect happens server-side on success
    }

    return (
        <div className='w-full'>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className='gap-0'>
                    {/* Name and Age group */}

                    <div className='flex items-center gap-4'>
                        {/* name input */}
                        <Controller
                            name='name'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={field.name}>
                                        Name
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder='john'
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
                                    <FieldLabel htmlFor={field.name}>
                                        Age
                                    </FieldLabel>
                                    <Input
                                        type='number'
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder='18'
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
                    </div>
                    {/* select gender */}
                    <Controller
                        name='gender'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                className='mt-1'
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel htmlFor={field.name}>
                                    Gender
                                </FieldLabel>
                                <Select
                                    value={field.value ?? ''}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        aria-invalid={fieldState.invalid}
                                    >
                                        <SelectValue placeholder='Select a gender' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {GENDERS.map((gender) => (
                                                <SelectItem
                                                    key={gender}
                                                    value={gender}
                                                >
                                                    {gender}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
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
                    {/* weight group */}
                    <div className='flex items-center gap-4'>
                        {/* weight input */}
                        <Controller
                            name='weight'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    className='mt-1'
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor={field.name}>
                                        Weight
                                    </FieldLabel>
                                    <Input
                                        type='number'
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder='67'
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
                        {/* select weight unit */}
                        <Controller
                            name='weightUnit'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    className='mt-1'
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor={field.name}>
                                        Weight unit
                                    </FieldLabel>
                                    <Select
                                        value={field.value ?? ''}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder='Select unit' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {WEIGHT_UNITS.map((unit) => (
                                                    <SelectItem
                                                        key={unit}
                                                        value={unit}
                                                    >
                                                        {unit}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
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
                    </div>
                    {/* Height group */}
                    <div className='flex items-center gap-4'>
                        {/* Height input */}
                        <Controller
                            name='height'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    className='mt-1'
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor={field.name}>
                                        Height
                                    </FieldLabel>
                                    <Input
                                        type='number'
                                        {...field}
                                        id={field.name}
                                        aria-invalid={fieldState.invalid}
                                        placeholder='178'
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
                        {/* select Height unit */}
                        <Controller
                            name='heightUnit'
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field
                                    className='mt-1'
                                    data-invalid={fieldState.invalid}
                                >
                                    <FieldLabel htmlFor={field.name}>
                                        Height unit
                                    </FieldLabel>
                                    <Select
                                        value={field.value ?? ''}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger
                                            aria-invalid={fieldState.invalid}
                                        >
                                            <SelectValue placeholder='Select unit' />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {HEIGHT_UNITS.map((unit) => (
                                                    <SelectItem
                                                        key={unit}
                                                        value={unit}
                                                    >
                                                        {unit}
                                                    </SelectItem>
                                                ))}
                                            </SelectGroup>
                                        </SelectContent>
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
                    </div>
                    {/* Activity Level */}
                    <Controller
                        name='activityLevel'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                className='mt-1'
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel>Activity level</FieldLabel>
                                <Select
                                    value={field.value ?? ''}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        aria-invalid={fieldState.invalid}
                                    >
                                        <SelectValue placeholder='Select activity level' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {ACTIVITY_LEVELS.map((level) => (
                                            <SelectItem
                                                key={level.value}
                                                value={level.value}
                                            >
                                                {level.label} — {level.desc}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
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

                    {/* Goal */}
                    <Controller
                        name='goal'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                className='mt-1'
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel>Your goal</FieldLabel>
                                <Select
                                    value={field.value ?? ''}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        aria-invalid={fieldState.invalid}
                                    >
                                        <SelectValue placeholder='Select your goal' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {GOALS.map((goal) => (
                                            <SelectItem
                                                key={goal.value}
                                                value={goal.value}
                                            >
                                                {goal.label} — {goal.desc}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
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
                    {/* <button
                        type='submit'
                        disabled={loading}
                        className='bg-primary text-primary-foreground w-full rounded-lg py-2 text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50'
                    >
                        {loading ? 'Saving...' : 'Calculate my goals'}
                    </button> */}
                    <Button type='submit' disabled={isSubmitting}>
                        {isSubmitting ? 'Saving...' : 'Calculate my goals'}
                        <span className='ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white'></span>
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
        </div>
    );
}
