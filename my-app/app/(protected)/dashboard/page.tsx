import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import MealCard from '@/components/MealCard';
export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
        error,
    } = await supabase.auth.getUser();

    //redirect to login if user not authenticated
    if (error || !user) {
        redirect('/login');
    }

    //redirect to onboarding if user is authenticated but has not completed onboarding
    const profile = await prisma.profile.findUnique({
        where: {
            id: user.id,
        },
    });

    //get meals for the user
    const meals = await prisma.meal.findMany({
        where: {
            userId: user.id,
        },
    });

    console.log(meals);
    if (!profile?.onboarded) {
        redirect('/onboarding');
    }

    return (
        <div className='flex min-h-screen flex-col py-2'>
            <p>{user?.email}</p>
            {meals.length > 0 ? (
                <ul>
                    {meals.map((meal, index) => (
                        // <div className='flex gap-2 rounded-md border border-gray-400 p-2'>
                        //     <li key={index}>{meal.name}</li>
                        //     <li key={index}>{meal.calories}</li>
                        //     <li key={index}>{meal.proteinG}</li>
                        //     <li key={index}>{meal.carbsG}</li>
                        //     <li key={index}>{meal.fatG}</li>
                        // </div>
                        <MealCard
                            key={index}
                            name={meal.name}
                            calories={meal.calories}
                            proteinG={meal.proteinG}
                            carbsG={meal.carbsG}
                            fatG={meal.fatG}
                            eatenAt={meal.eatenAt}
                            mealType={meal.mealType}
                        />
                    ))}
                </ul>
            ) : (
                // <p>No meals found.</p>
                <Link href={'/add-meal'} className=''>
                    No meals found Add your first meal
                </Link>
            )}
        </div>
    );
}
