import React from 'react';
import Navbar from '@/components/navbar/Navbar';
const ProtectedLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            <main className='min-h-screen px-4'>{children}</main>
        </>
    );
};

export default ProtectedLayout;
