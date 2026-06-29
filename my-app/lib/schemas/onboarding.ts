import { z } from 'zod';

const requiredNumber = (
    requiredMessage: string,
    min: number,
    minMessage: string,
    max: number,
    maxMessage: string,
) =>
    z.preprocess(
        (value) => {
            if (value === '') return undefined;
            return Number(value);
        },
        z
            .number({
                required_error: requiredMessage,
                invalid_type_error: requiredMessage,
            })
            .min(min, minMessage)
            .max(max, maxMessage),
    );

export const onboardingSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50),
    age: requiredNumber(
        'Age is required',
        13,
        'Age must be at least 13',
        120,
        'Age cannot exceed 120',
    ),
    gender: z.enum(['male', 'female', 'other'], {
        required_error: 'Please select a gender',
    }),
    weight: requiredNumber(
        'Weight is required',
        20,
        'Weight must be greater than 20 kg',
        500,
        'Weight cannot exceed 500 kg',
    ),
    weightUnit: z.enum(['kg', 'lbs']),
    height: requiredNumber(
        'Height is required',
        50,
        'Height must be greater than 50 cm',
        300,
        'Height cannot exceed 300 cm',
    ),
    heightUnit: z.enum(['cm', 'ft']),
    activityLevel: z.enum(
        ['sedentary', 'light', 'moderate', 'active', 'very_active'],
        {
            required_error: 'Please select an activity level',
        },
    ),
    goal: z.enum(['lose', 'maintain', 'gain'], {
        required_error: 'Please select a goal',
    }),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
