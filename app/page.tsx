"use client";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const { data: session } = authClient.useSession();

  const signOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          toast.success("Signed out successfully");
        },
      },
    });
  };

  return (
    <div>
      Hello there this is next.js
      <ThemeToggle />
      {session?.user ? (
        <div>
          <p>Hello {session.user.name}</p>
          <Button onClick={signOut}>Logout</Button>
        </div>
      ) : (
        <div>
          <p>You are not logged in</p>
        </div>
      )}
    </div>
  );
}
