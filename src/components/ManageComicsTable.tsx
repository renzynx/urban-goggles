"use client";

import { IconEdit, IconTrash, IconUpload } from "@tabler/icons-react";
import { useState } from "react";
import EditComic from "./EditComic";

export type ManageComicsTableProps = {
  author_id: number | null;
  description: string;
  id: number;
  modified: string | null;
  status: "ONGOING" | "COMPLETED" | "DROPPED" | null;
  thumbnail: string;
  title: string;
}[];

const ManageComicsTable = ({ data }: { data: ManageComicsTableProps }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const iSetSelectedId = (id: number | null) => {
    setSelectedId(id);
  };

  return (
    <>
      {selectedId && (
        <EditComic id={selectedId} setSelectedId={iSetSelectedId} />
      )}
      <div className="p-5 flex flex-col place-content-center mx-auto mt-4 overflow-x-auto max-w-[99vw]">
        <div className="sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left font-light">
                <thead className="border-b font-medium">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Thumbnail
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Modified
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data?.map((comic) => (
                    <tr
                      key={comic.id}
                      className="border-b transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-zinc-900"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        {comic.id}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <img
                          src={comic.thumbnail}
                          alt={comic.title}
                          className="h-20"
                        />
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {comic.title.length > 10
                          ? comic.title.substring(0, 10) + "..."
                          : comic.title}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {comic.description.length > 50
                          ? comic.description.substring(0, 50) + "..."
                          : comic.description}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div
                          className={`
                        px-2 py-1 rounded-full text-xs font-medium flex items-center justify-center
                        ${
                          comic.status === "COMPLETED"
                            ? "bg-green-500 text-white"
                            : comic.status === "ONGOING"
                            ? "bg-blue-500 text-white"
                            : comic.status === "DROPPED"
                            ? "bg-red-500 text-white"
                            : "bg-yellow-500 text-black"
                        } 
                        `}
                        >
                          {comic.status}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {new Date(comic.modified!).toLocaleDateString() +
                          " " +
                          new Date(comic.modified!).toLocaleTimeString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold p-2 rounded"
                            onClick={() => setSelectedId(comic.id)}
                          >
                            <IconEdit />
                          </button>
                          <button className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded">
                            <IconTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageComicsTable;
