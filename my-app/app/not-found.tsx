import Link from 'next/link';

export default function NotFound() {
    return (
        <main className='grid min-h-screen place-content-center'>
            <div className='flex flex-col'>
                <span className='text-4xl leading-snug font-bold text-white'>
                    ERROR 404
                </span>
                <span className='text-4xl leading-snug font-bold text-white'>
                    LOST IN SPACE?
                </span>
            </div>
        </main>
    );
}
