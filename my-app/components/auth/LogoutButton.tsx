import { Button } from "@/components/ui/button";
import { signOut } from "@/app/auth/actions";

const LogoutButton = () => {
  return (
    <form action={signOut}>
      <Button type="submit" variant="secondary">
        Log Out
      </Button>
    </form>
  );
};

export default LogoutButton;