import { Button } from "./ui/button";
import Link from "next/link";
import { signOut } from "@/app/auth/actions";
type AuthButtons = {
  isLogout: boolean
}

const AuthButtons = ({isLogout} : AuthButtons) => {
  return (
    <div className="flex items-center gap-3">
        <Button variant="outline">
            <Link href={"/login"}>Log In</Link>
        </Button>
        <Button variant="secondary">
            <Link href={"/signup"}>Sign up</Link>
        </Button>
        {isLogout && <form action={signOut}>
      <Button 
        type="submit" 
        variant="secondary"
      >
        Log Out
      </Button>
    </form>}
    </div>
  )
}

export default AuthButtons