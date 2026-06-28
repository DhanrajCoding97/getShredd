import Link from 'next/link';
import AuthButtons from '../auth/AuthButtons';
import { createClient } from '@/lib/supabase/server';
import NavbarClient from './NavbarClient';
import ThemeToggle from '../ThemeToggle';

const Navbar = async () => {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <NavbarClient>
            <nav className='border-b-foreground/10 bg-background/70 flex min-h-14 w-full items-center justify-between border-b px-4 backdrop-blur-md'>
                <Link href='/' className='font-bold text-green-700'>
                    GetShredd
                </Link>
                <div className='flex'>
                    <AuthButtons isAuthenticated={!!user} />
                    <ThemeToggle />
                </div>
            </nav>
        </NavbarClient>
    );
};

export default Navbar;
