"use client";

import { IconEdit, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import EditComic from "./EditComic";
import Image from "next/image";
import DeleteComic from "./DeleteComic";

export type ManageComicsTableProps = {
  author_id: number | null;
  description: string;
  id: number;
  modified: string | null;
  status: "ONGOING" | "COMPLETED" | "DROPPED" | null;
  thumbnail: string | null;
  title: string;
}[];

const columns = [
  "ID",
  "Thumbnail",
  "Title",
  "Description",
  "Status",
  "Modified",
  "Actions",
]

const ManageComicsTable = ({ data }: { data: ManageComicsTableProps }) => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [deleteData, setDeleteData] = useState<{ id: number; title: string } | null>(null);

  const iSetSelectedId = (id: number | null) => {
    setSelectedId(id);
  };

  const openDeleteModal = ({ id, title }: { id: number; title: string }) => {
    setDeleteData({ id, title });
  }

  const closeModal = () => {
    setDeleteData(null);
  }

  return (
    <>
      {selectedId && (
        <EditComic id={selectedId} setSelectedId={iSetSelectedId} />
      )}
      {deleteData && (
        <DeleteComic deleteData={deleteData} closeModal={closeModal} />
      )}


      <div className="overflow-x-auto px-5 my-10 mx-auto w-full max-w-[99vw]">
        <table className="min-w-full text-left font-light">
          <thead className="border-b font-medium">
            <tr>
              {columns.map((column) => (
                <th scope="col" className="px-6 py-4">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.map((comic) => (
              <tr
                onDoubleClick={() => setSelectedId(comic.id)}
                key={comic.id}
                className="border-b transition duration-300 ease-in-out hover:bg-gray-200 dark:hover:bg-zinc-900 cursor-pointer"
              >
                <td className="whitespace-nowrap px-6 py-4">
                  {comic.id}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <Image
                    src={comic.thumbnail || "/images/placeholder.png"}
                    alt={comic.title}
                    className="h-20"
                    width={80}
                    height={120}
                  />
                </td>
                <td className="px-6 py-4">
                  {comic.title}
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
                        ${comic.status === "COMPLETED"
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
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold p-2 rounded"
                      onClick={openDeleteModal.bind(null, { id: comic.id, title: comic.title })}
                    >
                      <IconTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManageComicsTable;
