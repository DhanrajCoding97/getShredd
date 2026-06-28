import Link from 'next/link';
import { Button } from '@/components/ui/button';

const LoginButtons = () => {
    return (
        <>
            <Button variant='outline' asChild>
                <Link href='/login'>Log In</Link>
            </Button>

            <Button variant='secondary' asChild>
                <Link href='/signup'>Sign Up</Link>
            </Button>
        </>
    );
};

export default LoginButtons;
