import ManageComicsTable from "@/components/ManageComicsTable";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ManageComics() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/sign-in");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (!profile) {
    return redirect("/sign-in");
  }

  if (profile.role !== "ADMIN") {
    return redirect("/");
  }

  const { data } = await supabase.from("comics").select("*");

  return <div className="mb-20 w-full no-scrollbar">

    <ManageComicsTable data={data!} />
  </div>
}
