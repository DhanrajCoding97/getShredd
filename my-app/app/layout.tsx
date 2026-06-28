import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const outfit = Outfit({
    variable: '--font-outfit',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'GetShredd',
    description: 'Calorie tracker app to get lean',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en' className={`${outfit.className} h-full antialiased`}>
            <body className='flex min-h-full flex-col'>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
