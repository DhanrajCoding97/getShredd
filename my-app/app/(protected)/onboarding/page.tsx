import { getProfile } from '@/lib/actions/onboarding';
import { redirect } from 'next/navigation';
import OnboardingForm from '@/components/OnboardingForm';
// import GradientAnimationCard from '@/components/GradientAnimationCard';

export default async function OnboardingPage() {
    const profile = await getProfile();
    if (profile?.onboarded) redirect('/dashboard');

    return (
        <div className='flex min-w-125 flex-col rounded-xl border-2 p-5'>
            <div className='space-y-1'>
                <h1 className='text-2xl font-bold'>Set up your profile</h1>
                <p className='text-muted-foreground text-sm'>
                    Help us calculate your daily calorie and macro goals.
                </p>
            </div>
            <OnboardingForm />
        </div>
    );
}
