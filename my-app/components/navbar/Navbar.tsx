// 'use client'
// import Link from 'next/link'
// import { Suspense } from 'react'
// import { usePathname } from 'next/navigation'
// import AuthButtons from '../auth/AuthButtons'


// const Navbar = () => {
//   const pathname = usePathname()
//   const isAuthPage = pathname === '/login' || pathname == '/signup' 
//   return (
//     <nav className='w-full flex justify-center border-b border-b-foreground/10 h-16 bg-transparent'>
//         <div className='w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm'>
//             <div className='flex gap-5 items-center font-semibold'>
//                 <Link href={"/"}>GetShredd</Link>
//             </div>
//             {!isAuthPage && (
//             <Suspense>
//                 <AuthButtons is={false}/>
//             </Suspense>
//             )}
//         </div>
//     </nav>
//   )
// }

// export default Navbar

import Link from 'next/link'
import AuthButtons from '../auth/AuthButtons'
import { createClient } from '@/lib/supabase/server'
import NavbarClient from './NavbarClient'

const Navbar = async () => {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <NavbarClient>
      <nav className='px-4 min-h-14 w-full flex items-center justify-between border-b border-b-foreground/10 bg-white'>
        <Link href="/" >GetShredd</Link>

        <AuthButtons
          isAuthenticated={!!user}
        />
      </nav>
    </NavbarClient>
  )
}

export default Navbar