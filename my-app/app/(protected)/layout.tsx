import React from 'react'
import Navbar from '@/components/navbar/Navbar'
const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
    <Navbar/>
    <main className='px-4'>{children}</main>
    </>
  )
}

export default DashboardLayout