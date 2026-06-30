import { z } from 'zod';

const requiredNumber = (field: string) =>
    z.preprocess(
        (value) => {
            if (
                value === '' ||
                value === undefined ||
                value === null ||
                (typeof value === 'number' && Number.isNaN(value))
            ) {
                return undefined;
            }

            return Number(value);
        },
        z
            .number({
                required_error: `${field} is required`,
                invalid_type_error: `${field} is required`,
            })
            .min(1, `${field} must be greater than 0`),
    );
export const mealSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),

    calories: requiredNumber('Calories'),

    protein_g: requiredNumber('Protein'),

    carbs_g: requiredNumber('Carbs'),

    fat_g: requiredNumber('Fat'),

    meal_type: z.enum(['BREAKFAST', 'LUNCH', 'DINNER', 'SNACK']),

    eaten_at: z.date({
        required_error: 'Please select a date',
    }),
});
