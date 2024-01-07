import RenderComics from "@/components/RenderComics";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { Suspense } from "react";

export default async function Index() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.from("comics").select(
    `
    title,
    thumbnail,
    description,
    chapters (
      chapter_no
    )
  `
  );

  if (error) {
    console.error(error);
  }



  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center mt-2">
      <div className="animate-in flex-1 flex gap-20 opacity-0 px-3 mt-2">
        <main>
          <Suspense fallback={<div>Loading...</div>}>
            <RenderComics comics={data!} />
          </Suspense>
        </main>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
        <p>
          Powered by{" "}
          <a
            href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
            target="_blank"
            className="font-bold hover:underline"
            rel="noreferrer"
          >
            Supabase
          </a>
        </p>
      </footer>
    </div>
  );
}
