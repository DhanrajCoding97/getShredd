'use server';
import type { MealFormData } from '@/types/meals';
import { mealSchema } from '../schemas/meal';
import { createClient } from '../supabase/server';
import { prisma } from '@/lib/prisma';

import { revalidatePath } from 'next/cache';

export async function addMeal(formData: MealFormData) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return {
            success: false,
            message: 'Unauthorized',
        };
    }
    const parsed = mealSchema.safeParse(formData);

    if (!parsed.success) {
        return {
            success: false,
            message: 'Invalid form data',
            errors: parsed.error.flatten().fieldErrors,
        };
    }

    try {
        await prisma.meal.create({
            data: {
                userId: user.id,
                name: parsed.data.name,
                calories: parsed.data.calories,
                proteinG: parsed.data.protein_g,
                carbsG: parsed.data.carbs_g,
                fatG: parsed.data.fat_g,
                // mealType: parsed.data.meal_type.toUpperCase() as
                //     | 'BREAKFAST'
                //     | 'LUNCH'
                //     | 'DINNER'
                //     | 'SNACK',
                mealType: parsed.data.meal_type,
                eatenAt: parsed.data.eaten_at,
            },
        });

        revalidatePath('/dashboard');

        return {
            success: true,
            message: 'Meal added successfully',
        };
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: 'Something went wrong while adding the meal.',
        };
    }
}
