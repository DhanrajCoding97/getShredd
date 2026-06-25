import { Button } from "./ui/button";
import Link from "next/link";
const AuthButtons = () => {
  return (
    <div className="flex items-center gap-3">
        <Button variant="outline">
            <Link href={"/login"}>Log In</Link>
        </Button>
        <Button variant="secondary">
            <Link href={"/signup"}>Sign up</Link>
        </Button>
    </div>
  )
}

export default AuthButtons