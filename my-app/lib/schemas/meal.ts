import { z } from 'zod';

export const mealSchema = z.object({
    name: z.string().min(1, 'Name is required').max(100),
});
