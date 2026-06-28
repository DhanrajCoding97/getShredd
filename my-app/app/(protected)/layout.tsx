import React from 'react';
import Navbar from '@/components/navbar/Navbar';
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main className='grid min-h-screen place-content-center bg-black px-4'>
                {children}
            </main>
        </>
    );
};

export default ProtectedLayout;
