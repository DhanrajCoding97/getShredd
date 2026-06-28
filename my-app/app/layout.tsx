import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';

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
            <body className='flex min-h-full flex-col'>{children}</body>
        </html>
    );
}
