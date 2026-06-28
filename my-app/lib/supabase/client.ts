import { createBrowserClient } from '@supabase/ssr';

export function createClient() {
    return createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL! ||
            'https://ifxvdskxjnlzzngfdciy.supabase.co',
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! ||
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmeHZkc2t4am5senpuZ2ZkY2l5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE2OTI5MTgsImV4cCI6MjA5NzI2ODkxOH0.TLwV-Qm_bCTU_VQc0S4e-QFlM1YPZR6TukB0n4m5CR4',
    );
}
