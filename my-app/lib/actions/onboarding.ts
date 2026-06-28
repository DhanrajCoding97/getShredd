'use server';

import { prisma } from '@/lib/prisma';
import { createClient } from '../supabase/server';
import { onboardingSchema } from '../schemas/onboarding';
import { redirect } from 'next/navigation';
import { calculatorProps } from '@/types/onboarding';
import { error } from 'console';

//TDEE calculator
function calculateGoals(data: calculatorProps) {
    //convert to metric
    const weightKg =
        data.weightUnit === 'lbs' ? data.weight * 0.453592 : data.weight;
    const heightCm =
        data.heightUnit === 'ft' ? data.height * 30.48 : data.height;

    //Mifflin-St Jeor BMR ( BMR calculation logic)
    const bmr =
        data.gender === 'male'
            ? 10 * weightKg + 6.25 * heightCm - 5 * data.age + 5
            : 10 * weightKg + 6.25 * heightCm - 5 * data.age - 161;

    const activityMultipliers: Record<string, number> = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9,
    };

    const tdee = bmr * (activityMultipliers[data.activityLevel] ?? 1.55);

    const goalAdjustments: Record<string, number> = {
        lose: -500,
        maintain: 0,
        gain: 300,
    };

    const dailyCalorieGoal = Math.round(
        tdee + (goalAdjustments[data.goal] ?? 0),
    );

    // macro split: 30% protein, 40% carbs, 30% fat
    const dailyProteinGoal = Math.round((dailyCalorieGoal * 0.3) / 4);
    const dailyCarbsGoal = Math.round((dailyCalorieGoal * 0.4) / 4);
    const dailyFatGoal = Math.round((dailyCalorieGoal * 0.3) / 9);

    return { dailyCalorieGoal, dailyProteinGoal, dailyCarbsGoal, dailyFatGoal };
}

export async function completeOnboarding(formData: unknown) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return { error: 'Unauthorized' };

    const parsed = onboardingSchema.safeParse(formData);

    if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };

    const goals = calculateGoals(parsed.data);

    await prisma.profile.update({
        where: { id: user.id },
        data: {
            ...parsed.data,
            ...goals,
            onboarded: true,
        },
    });
    redirect('/dashboard');
}

export async function getProfile() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    return prisma.profile.findUnique({
        where: { id: user.id },
    });
}
