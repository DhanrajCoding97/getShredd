import Link from 'next/link';

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <nav className='flex min-h-14 w-full flex-col items-center justify-center px-4'>
                <Link href='/' className=''>
                    GetShredd
                </Link>
            </nav>
            <main className='grid min-h-screen place-content-center px-4'>
                {children}
            </main>
        </>
    );
}
