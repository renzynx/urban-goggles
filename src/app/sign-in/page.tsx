"use client";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { IconBrandDiscord, IconMail } from "@tabler/icons-react";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";

export default function SignIn() {
  const [verror, setError] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [{ email, password }, setData] = useState({
    email: "",
    password: "",
  });

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((data) => ({ ...data, email: e.target.value }));
    setError({ ...verror, email: "" });
  };

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((data) => ({ ...data, password: e.target.value }));
    setError({ ...verror, password: "" });
  };

  const signIn = async () => {
    if (!email) {
      setError({ ...verror, email: "Email is required" });
      return;
    }

    if (!password) {
      setError({ ...verror, password: "Password is required" });
      return;
    }

    const supabase = createClient();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return setMessage(error.message);
    }

    return (window.location.href = "/");
  };

  const signInWithDiscord = async () => {
    const supabase = createClient();

    const { error, data } = await supabase.auth.signInWithOAuth({
      provider: "discord",
      options: { redirectTo: `${location.origin}/auth/callback` },
    });

    if (error) {
      return setMessage("Could not authenticate user");
    }

    return redirect(data.url);
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
        action={signIn}
      >
        <label className="text-md" htmlFor="email">
          Email / Username <span className="text-red-500">*</span>
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={handleEmail}
        />
        {verror.email && (
          <p className="text-red-500 ml-2 text-xs">{verror.email}*</p>
        )}

        <label className="text-md mt-6" htmlFor="password">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border"
          type="password"
          name="password"
          placeholder="••••••••"
          value={password}
          onChange={handlePassword}
        />
        {verror.password && (
          <p className="text-red-500 text-xs">{verror.password}*</p>
        )}

        <button
          className="bg-[#3498db] rounded-md px-4 py-2 text-foreground mt-6 mb-2"
          style={{ color: "rgb(243 244 246)" }}
        >
          {loading ? <PulseLoader /> : "Sign In"}
        </button>

        <div className="flex justify-between mt-2">
          <Link
            href="/forgot-password"
            className="text-sm text-foreground hover:underline"
          >
            Forgot password?
          </Link>

          <Link
            href="/sign-up"
            className="text-sm text-foreground hover:underline"
          >
            Don&apos;t have an account?
          </Link>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />

        <Link
          href="/magic-link"
          className="btn bg-[#8A2BE2] hover:bg-opacity-80 flex items-center justify-center gap-2"
          style={{ color: "rgb(243 244 246)" }}
        >
          Sign In With Magic Link
          <span>
            <IconMail />
          </span>
        </Link>

        <button
          formAction={signInWithDiscord}
          className="btn-discord hover:bg-discord-hover flex items-center justify-center gap-2"
          style={{ color: "rgb(243 244 246)" }}
        >
          Sign In With Discord
          <span>
            <IconBrandDiscord />
          </span>
        </button>

        {message && (
          <p className="mt-4 p-4 bg-red-500 text-foreground text-center animate-in">
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
