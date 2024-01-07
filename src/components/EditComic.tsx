"use client";

import { createClient } from "@/utils/supabase/client";
import { FC, Fragment, useEffect, useState } from "react";
import { ManageComicsTableProps } from "./ManageComicsTable";
import {
  IconCheck,
  IconChevronDown,
  IconUpload,
  IconX,
} from "@tabler/icons-react";
import { Listbox, Transition } from "@headlessui/react";
import Image from "next/image";

type EditComicProps = {
  id: number;
  setSelectedId: (id: number | null) => void;
};

const options = [
  { value: "ONGOING", label: "Ongoing" },
  { value: "COMPLETED", label: "Completed" },
  { value: "DROPPED", label: "Dropped" },
];

const EditComic: FC<EditComicProps> = ({ id, setSelectedId }) => {
  const [data, setData] = useState<ManageComicsTableProps[number]>();
  const supabase = createClient();

  const setTitle = (title: string) => {
    setData((prev) => ({ ...prev!, title }));
  };


  const uploadThumbnail = async (file: File): Promise<void> => {
    if (!file) return;

    try {
      const ob = data?.thumbnail?.split("/")!;

      console.log(ob);

      const key = `/${ob[ob.length - 2]}/${ob[ob.length - 1]}`

      const { data: existingThumbnail } = await supabase.storage.from("comics").download(key);

      const { error: uploadError } = existingThumbnail
        ? await supabase.storage.from("comics").update(key, file, {
          cacheControl: "3600",
          upsert: true,
        })
        : await supabase.storage.from("comics").upload(key, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        console.error(uploadError);
        return;
      }

      const { data: { publicUrl } } = await supabase.storage
        .from("comics")
        .getPublicUrl(key);


      setData((prev) => ({ ...prev!, thumbnail: publicUrl }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    supabase
      .from("comics")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => setData(data!));
  }, []);

  return (
    <div className="lg:max-h-full md:max-h-full sm:max-h-[80%] max-h-[80%] lg:max-w-3xl md:max-w-3xl max-w-lg w-full fixed top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col place-content-center bg-gray-100 dark:bg-zinc-900 p-5 border border-foreground/10">
      <div className="flex justify-between w-full mb-2">
        <button className="bg-emerald-500 hover:bg-emerald-400 px-6 py-2 text-gray-100">
          Save
        </button>
        <button
          className="bg-red-500 p-2 hover:bg-red-600 text-gray-100"
          onClick={() => setSelectedId(null)}
        >
          <IconX />
        </button>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-4 grid-cols-1 gap-4 my-10 scrollbar overflow-y-scroll no-scrollbar">
        <div className="flex-col flex gap-2 lg:col-span-1 md:col-span-2 order-1">
          <label className="text-md mr-4" htmlFor="ID">
            ID
          </label>
          {data?.id ? (
            <input
              className="rounded-md px-4 py-2 bg-inherit dark:text-gray-500 text-zinc-600 border shadow-md cursor-not-allowed"
              name="ID"
              placeholder="you@example.com"
              value={data?.id}
              disabled
            />
          ) : (
            <div className="rounded-md px-4 py-5 dark:bg-zinc-800 bg-gray-200 border cursor-not-allowed animate-pulse" />
          )}
        </div>

        <div className="flex flex-col gap-2 lg:col-span-1 md:col-span-2 order-2">
          <label className="text-md mr-4" htmlFor="title">
            Title
          </label>

          {data?.title ? (
            <input
              className="rounded-md px-4 py-2 bg-inherit border shadow-md"
              name="title"
              value={data.title}
            />
          ) : (
            <div className="rounded-md px-4 py-5 dark:bg-zinc-800 bg-gray-200 border cursor-not-allowed animate-pulse" />
          )}
        </div>

        <div className="flex flex-col gap-2 lg:col-span-1 lg:order-3 order-7 md:col-span-4 lg:row-span-3">
          <label
            className="w-2/3 mx-auto text-sm cursor-pointer bg-blue-500 hover:bg-blue-700 text-white text-center font-bold py-2 px-4 rounded"
            htmlFor="file-input"
          >
            <IconUpload className="mr-2 inline-block" />
            <p className="inline-block">Upload</p>
          </label>
          <input type="file" className="hidden" id="file-input" multiple={false} onChange={(e) => uploadThumbnail(e.target.files![0])} />

          {data?.thumbnail ? (
            <Image
              src={data.thumbnail}
              alt={data.title}
              width={220}
              height={120}
              className="rounded-md max-h-72 mx-auto my-auto"
            />
          ) : (
            <div className="rounded-md px-4 py-5 lg:row-span-3 h-full dark:bg-zinc-800 bg-gray-200 border cursor-not-allowed animate-pulse" />
          )}
        </div>

        <div className="flex flex-col gap-2 lg:col-span-1 md:col-span-2 lg:order-4 order-3">
          <label className="text-md mr-4" htmlFor="modified">
            Modified
          </label>

          {data?.modified ? (
            <input
              type="datetime-local"
              className="rounded-md px-4 py-2 bg-inherit border shadow-md"
              name="modified"
              defaultValue={new Date(data.modified!).toISOString().slice(0, 16)}
            />
          ) : (
            <div className="rounded-md px-4 py-5 dark:bg-zinc-800 bg-gray-200 border cursor-not-allowed animate-pulse" />
          )}
        </div>

        <div className="flex flex-col gap-2 lg:col-span-1 md:col-span-2 lg:order-5 order-4">
          <label className="text-md mr-4" htmlFor="status">
            Status
          </label>
          {data?.status ? (
            <StatusSelect status={data.status} />
          ) : (
            <div className="rounded-md px-4 py-5 dark:bg-zinc-800 bg-gray-200 border cursor-not-allowed animate-pulse" />
          )}
        </div>
        <div className="flex flex-col gap-2 lg:col-span-2 md:col-span-4 lg:order-6 order-5">
          <label className="text-md mr-4" htmlFor="desc">
            Description
          </label>
          {data?.description ? (
            <textarea
              className="rounded-md px-4 py-2 bg-inherit border resize-y max-h-40 shadow-md"
              name="desc"
              value={data.description}
            />
          ) : (
            <div className="rounded-md px-4 py-10 dark:bg-zinc-800 bg-gray-200 border cursor-not-allowed animate-pulse" />
          )}
        </div>
      </div>
    </div>
  );
};

const StatusSelect: FC<{
  status: ManageComicsTableProps[number]["status"];
}> = ({ status }) => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <Listbox
      value={selected}
      onChange={setSelected}
      defaultValue={{
        label: options.find((o) => o.value === status)?.label!,
        value: status!,
      }}
    >
      <div className="relative">
        <Listbox.Button className="relative w-full cursor-default rounded-lg py-[9px] px-4 border text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
          <span className="block truncate">{selected.label}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <IconChevronDown
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white dark:bg-zinc-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options.map((option, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? "bg-amber-100 text-amber-900 dark:bg-violet-500 dark:text-white" : "text-gray-900"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate dark:text-white ${selected ? "font-medium" : "font-normal"
                        }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600 dark:text-emerald-400">
                        <IconCheck className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
};

export default EditComic;
