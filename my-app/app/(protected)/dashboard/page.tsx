import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export default async function DashboardPage() {
    const supabase = await createClient();
    const {data, error} = await supabase.auth.getUser()

    if(error || !data?.user) {
        redirect('/login')
    }

    return <div>Welcome {data?.user?.email}</div>;
}
