"use client";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { redirect } from "next/navigation";
import { IconBrandDiscord } from "@tabler/icons-react";

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [{ email, username, password }, setData] = useState({
    email: "",
    username: "",
    password: "",
  });

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

  const signUp = async () => {
    const supabase = createClient();

    if (!email || !password) {
      setLoading(false);
      return setMessage("Email and password are required");
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/auth/callback`,
        data: { username },
      },
    });

    setLoading(false);

    if (error) {
      return setMessage("Could not create user");
    }

    return setMessage("Check email to continue sign in process");
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
        onSubmit={(e) => {
          e.preventDefault();
          signUp();
        }}
        className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
      >
        <label className="text-md" htmlFor="email">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) =>
            setData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
        />

        <label className="text-md" htmlFor="username">
          Username
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          name="username"
          placeholder="you"
          value={username}
          onChange={(e) =>
            setData((prev) => ({ ...prev, username: e.target.value }))
          }
        />

        <label className="text-md" htmlFor="password">
          Password <span className="text-red-500">*</span>
        </label>
        <input
          className="rounded-md px-4 py-2 bg-inherit border mb-6"
          type="password"
          name="password"
          placeholder="••••••••"
          value={password}
          onChange={(e) =>
            setData((prev) => ({ ...prev, password: e.target.value }))
          }
          required
        />
        <button
          type="submit"
          className="bg-[#27ae60] hover:bg-opacity-80 rounded-md px-4 py-2 text-foreground mb-2 flex items-center justify-center gap-5"
          style={{ color: "rgb(243 244 246)" }}
        >
          {loading ? <PulseLoader color="#fff" size={12} /> : "Sign Up"}
        </button>

        <div className="flex justify-end mt-2">
          <Link
            href="/sign-in"
            className="text-sm text-foreground hover:underline"
          >
            Already have an account?
          </Link>
        </div>

        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />

        <button
          onClick={signInWithDiscord}
          className="btn-discord hover:bg-discord-hover flex items-center justify-center gap-2"
          style={{ color: "rgb(243 244 246)" }}
        >
          Sign up With Discord
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
