import React from 'react';
import Navbar from '@/components/navbar/Navbar';
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main className='bpx-4 grid min-h-screen place-content-center'>
                {children}
            </main>
        </>
    );
};

export default ProtectedLayout;
