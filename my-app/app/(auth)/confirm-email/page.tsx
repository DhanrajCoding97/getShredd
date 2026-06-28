import Link from 'next/link';

export default function ConfirmEmailPage() {
    return (
        <main className='flex min-h-screen items-center justify-center bg-black px-6 text-white'>
            <div className='w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-8 shadow-xl'>
                <div className='mb-6 flex justify-center'>
                    <div className='flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10 text-4xl'>
                        📧
                    </div>
                </div>

                <h1 className='mb-3 text-center text-3xl font-bold'>
                    Check your email
                </h1>

                <p className='mb-2 text-center text-zinc-300'>
                    We've sent you a confirmation email.
                </p>

                <p className='mb-8 text-center text-sm text-zinc-500'>
                    Click the verification link in the email to activate your
                    account. Once confirmed, you'll be signed in and redirected
                    automatically.
                </p>

                <div className='space-y-4'>
                    <div className='rounded-lg border border-zinc-800 bg-zinc-950 p-4 text-sm text-zinc-400'>
                        <p>✓ Check your Inbox</p>
                        <p>✓ Check your Spam/Junk folder</p>
                        <p>✓ The email may take a minute or two to arrive</p>
                    </div>

                    <Link
                        href='/login'
                        className='block w-full rounded-lg bg-white py-3 text-center font-medium text-black transition hover:bg-zinc-200'
                    >
                        Back to Login
                    </Link>
                </div>
            </div>
        </main>
    );
}
