import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import AccountMenu from "./AccountMenu";

export default async function AuthButton() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    await supabase.auth.signOut();
    return redirect("/");
  };

  return user ? (
    <div className="flex justify-center items-start h-full">
      <AccountMenu
        user={user}
        signOut={
          <form action={signOut}>
            <button>Sign Out</button>
          </form>
        }
      />
    </div>
  ) : (
    <div className="py-2 px-3 flex rounded-md no-underline bg-btn-background">
      <div className="flex">
        <Link href="/sign-in" className="text-sm hover:underline">
          Sign In
        </Link>
        <p className="px-3">/</p>

        <Link href="/sign-up" className="text-sm hover:underline">
          Sign Up
        </Link>
      </div>
    </div>
  );
}
