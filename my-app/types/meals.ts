export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';

export interface Meal {
    id: string;
    user_id: string;
    name: string;
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    meal_type: MealType;
    eaten_at: string;
    created_at: string;
}

export interface MealFormData {
    name: string;
    calories: number;
    protein_g: number;
    carbs_g: number;
    fat_g: number;
    meal_type: MealType;
    eaten_at: string;
}
