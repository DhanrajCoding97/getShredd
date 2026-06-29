import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
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
                    {meals.map((meal) => (
                        <li key={meal.id}>{meal.name}</li>
                    ))}
                </ul>
            ) : (
                // <p>No meals found.</p>
                <Link href={'/add-meal'}>
                    No meals found Add your first meal
                </Link>
            )}
        </div>
    );
}
