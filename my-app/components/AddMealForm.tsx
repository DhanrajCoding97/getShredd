'use client';

import { useState } from 'react';
import z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { CiWarning } from 'react-icons/ci';
import { toast } from 'sonner';
import { zodResolver } from '@hookform/resolvers/zod';
import { mealSchema } from '@/lib/schemas/meal';
import { DatePicker } from '@/components/ui/date-picker';
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
import { Button } from './ui/button';

const MEAL_TYPES = ['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK'];

function AddMealForm() {
    const [error, setError] = useState<string | null>(null);

    //add meal form default values
    const form = useForm<z.infer<typeof mealSchema>>({
        resolver: zodResolver(mealSchema),
        defaultValues: {
            name: '',
            calories: '' as unknown as number,
            protein_g: '' as unknown as number,
            carbs_g: '' as unknown as number,
            fat_g: '' as unknown as number,
            meal_type: undefined,
            eaten_at: new Date(),
        },
    });

    //getting isSubmitting state for loadign from formstate
    const {
        formState: { isSubmitting },
    } = form;

    //OnSubmit Handler
    async function onSubmit(data: z.infer<typeof mealSchema>) {
        setError(null);
        console.log(data.eaten_at);
        console.log(data.eaten_at instanceof Date);
        console.log(data);
    }

    return (
        <div className='max-w-sm'>
            <form onSubmit={form.handleSubmit(onSubmit)}>
                <FieldGroup className='gap-0'>
                    {/* meal name input */}
                    <Controller
                        name='name'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor={field.name}>
                                    Meal name
                                </FieldLabel>
                                <Input
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder='Chicken Breast'
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
                    {/* Calories input */}
                    <Controller
                        name='calories'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                className='mt-1'
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel htmlFor={field.name}>
                                    Calories
                                </FieldLabel>
                                <Input
                                    type='number'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder='120'
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
                    {/* Protein input */}
                    <Controller
                        name='protein_g'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                className='mt-1'
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel htmlFor={field.name}>
                                    Protein
                                </FieldLabel>
                                <Input
                                    type='number'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder='30'
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
                    {/* Carbs input */}
                    <Controller
                        name='carbs_g'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                className='mt-1'
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel htmlFor={field.name}>
                                    Carbohydrate
                                </FieldLabel>
                                <Input
                                    type='number'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder='60'
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
                    {/* Fat input */}
                    <Controller
                        name='fat_g'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                className='mt-1'
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel htmlFor={field.name}>
                                    Fat
                                </FieldLabel>
                                <Input
                                    type='number'
                                    {...field}
                                    id={field.name}
                                    aria-invalid={fieldState.invalid}
                                    placeholder='10'
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
                    {/* select meal type */}
                    <Controller
                        name='meal_type'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field
                                className='mt-1'
                                data-invalid={fieldState.invalid}
                            >
                                <FieldLabel htmlFor={field.name}>
                                    Meal type
                                </FieldLabel>
                                <Select
                                    value={field.value ?? ''}
                                    onValueChange={field.onChange}
                                >
                                    <SelectTrigger
                                        aria-invalid={fieldState.invalid}
                                    >
                                        <SelectValue placeholder='Select meal type' />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {MEAL_TYPES.map((mealType) => (
                                                <SelectItem
                                                    key={mealType}
                                                    value={mealType}
                                                >
                                                    {mealType.toLocaleLowerCase()}
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
                    {/* Date picker */}
                    <Controller
                        name='eaten_at'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Date</FieldLabel>

                                <DatePicker
                                    value={field.value}
                                    onChange={field.onChange}
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
                    {/* <Controller
                        name='eaten_at'
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel>Select Date</FieldLabel>
                                <DatePicker
                                    value={field.value}
                                    onChange={field.onChange}
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
                    /> */}
                </FieldGroup>
                <Button type='submit' disabled={isSubmitting}>
                    {isSubmitting && (
                        <span className='ml-2 h-4 w-4 animate-spin rounded-full border-2 border-white' />
                    )}
                    {isSubmitting ? 'Saving...' : 'Add Meal'}
                </Button>
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

export default AddMealForm;
