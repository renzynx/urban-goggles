"use client";

import { createClient } from "@/utils/supabase/client";
import { FC, Fragment, useEffect, useState } from "react";
import { ManageComicsTableProps } from "./ManageComicsTable";
import { IconCheck, IconChevronDown, IconX } from "@tabler/icons-react";
import { Listbox, Transition } from "@headlessui/react";

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

  useEffect(() => {
    supabase
      .from("comics")
      .select("*")
      .eq("id", id)
      .single()
      .then(({ data }) => setData(data!));
  }, []);

  return (
    <div className="lg:max-w-xl max-w-lg w-full absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 flex flex-col place-content-center bg-zinc-900 p-5">
      <div className="flex justify-between w-full mb-8">
        <button className="bg-emerald-500 hover:bg-emerald-400 px-6 py-2">
          Save
        </button>
        <button
          className="bg-red-500 p-2 hover:bg-red-600"
          onClick={() => setSelectedId(null)}
        >
          <IconX />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex-col flex gap-2 lg:col-span-1 col-span-2">
          <label className="text-md mr-4" htmlFor="ID">
            ID
          </label>
          {data?.id ? (
            <input
              className="rounded-md px-4 py-2 bg-inherit dark:text-gray-500 border cursor-not-allowed"
              name="ID"
              placeholder="you@example.com"
              value={data?.id}
              disabled
            />
          ) : (
            <div className="rounded-md px-4 py-5 bg-zinc-800 border cursor-not-allowed animate-pulse" />
          )}
        </div>

        <div className="flex flex-col gap-2 lg:col-span-1 col-span-2">
          <label className="text-md mr-4" htmlFor="title">
            Title
          </label>

          {data?.title ? (
            <input
              className="rounded-md px-4 py-2 bg-inherit border"
              name="title"
              value={data.title}
            />
          ) : (
            <div className="rounded-md px-4 py-5 bg-zinc-800 border cursor-not-allowed animate-pulse" />
          )}
        </div>

        <div className="flex flex-col gap-2 lg:col-span-1 col-span-2">
          <label className="text-md mr-4" htmlFor="modified">
            Modified
          </label>

          {data?.modified ? (
            <input
              type="datetime-local"
              className="rounded-md px-4 py-2 bg-inherit border"
              name="modified"
              defaultValue={new Date(data.modified!).toISOString().slice(0, 16)}
            />
          ) : (
            <div className="rounded-md px-4 py-5 bg-zinc-800 border cursor-not-allowed animate-pulse" />
          )}
        </div>

        <div className="flex flex-col gap-2 lg:col-span-1 col-span-2">
          <label className="text-md mr-4" htmlFor="status">
            Status
          </label>
          {data?.status ? (
            // <input
            //   className="rounded-md px-4 py-2 bg-inherit border"
            //   name="status"
            //   value={data.status!}
            // />
            <StatusSelect status={data.status} />
          ) : (
            <div className="rounded-md px-4 py-5 bg-zinc-800 border cursor-not-allowed animate-pulse" />
          )}
        </div>
        <div className="flex flex-col gap-2 col-span-2">
          <label className="text-md mr-4" htmlFor="desc">
            Description
          </label>
          {data?.description ? (
            <textarea
              className="rounded-md px-4 py-2 bg-inherit border resize-y max-h-40"
              name="desc"
              value={data.description}
            />
          ) : (
            <div className="rounded-md px-4 py-10 bg-zinc-800 border cursor-not-allowed animate-pulse" />
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
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {options.map((option, idx) => (
              <Listbox.Option
                key={idx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? "bg-amber-100 text-amber-900" : "text-gray-900"
                  }`
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? "font-medium" : "font-normal"
                      }`}
                    >
                      {option.label}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
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
