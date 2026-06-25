import { createClient } from '@/lib/supabase/client'
import { redirect } from 'next/navigation';
// import { redirect } from 'next/dist/server/api-utils';
import { Suspense } from 'react'
// import redirect

// async function userDetails() {

// }

async function UserDetails()  {
    const supabase = await createClient();
    const {data, error} = await supabase.auth.getClaims();
    
    if(error || !data?.claims) {
        redirect("/auth/login")
    }

    return JSON.stringify(data.claims, null, 2)
}

const ProtectedPage = () => {
  return (
    <div>ProtectedPage</div>
  )
}

export default ProtectedPage