import { z } from 'zod';

export const onboardingSchema = z.object({
    name: z.string().min(1, 'Name is required').max(50),
    age: z.coerce.number().min(13).max(120),
    gender: z.enum(['male', 'female', 'other']),
    weight: z.coerce.number().min(20).max(500),
    weightUnit: z.enum(['kg', 'lbs']),
    height: z.coerce.number().min(50).max(300),
    heightUnit: z.enum(['cm', 'ft']),
    activityLevel: z.enum([
        'sedentary',
        'light',
        'moderate',
        'active',
        'very_active',
    ]),
    goal: z.enum(['lose', 'maintain', 'gain']),
});

export type OnboardingSchema = z.infer<typeof onboardingSchema>;
