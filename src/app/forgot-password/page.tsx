import Link from "next/link";
import { headers, cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function ForgotPassword({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signInWithMagicLink = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);

    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  const resetPassword = async (formData: FormData) => {
    "use server";

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const email = formData.get("email") as string;

    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      return redirect("/forgot-password?message=Could not reset password");
    }

    return redirect(
      "/forgot-password?message=Check email to continue reset password process"
    );
  };

  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Link
        href="/"
        className="absolute left-8 top-20 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
        >
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
        action={resetPassword}
      >
        <label className="text-md" htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          required
        />

        <button
          className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2 bg-[#3498db] hover:bg-opacity-80 flex items-center justify-center"
          style={{ color: "rgb(243 244 246)" }}
        >
          Reset Password
        </button>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
