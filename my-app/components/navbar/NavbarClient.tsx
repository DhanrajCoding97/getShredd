'use client'

import { usePathname } from 'next/navigation'

export default function NavbarClient({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  const isAuthPage =
    pathname === '/login' ||
    pathname === '/signup'

  if (isAuthPage) return null

  return <>{children}</>
}