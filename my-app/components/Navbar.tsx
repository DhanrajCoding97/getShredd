'use client'
import Link from 'next/link'
import { Suspense } from 'react'
import { usePathname } from 'next/navigation'
import AuthButtons from './AuthButtons'

const Navbar = () => {
  const pathname = usePathname()
  const isAuthPage = pathname === '/login' || pathname == '/signup'
  return (
    <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16 bg-transparent'>
        <div className='w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm'>
            <div className='flex gap-5 items-center font-semibold'>
                <Link href={"/"}>GetShredd</Link>
            </div>
            {!isAuthPage && (
            <Suspense>
                <AuthButtons/>
            </Suspense>
            )}
        </div>
    </nav>
  )
}

export default Navbar