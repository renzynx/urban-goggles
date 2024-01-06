import { FC } from "react";
import Image from "next/image";
import { RenderComicsProps } from "./RenderComics";

type CardProps = {
  comic: RenderComicsProps["comics"][number];
};

const Card: FC<CardProps> = ({ comic }) => {
  let chapter_no = 0;

  if (comic.chapters.length === 0) {
    chapter_no = 0;
  } else {
    chapter_no = comic.chapters.reduce((prev, current) => {
      if (!prev) return current;

      return prev?.chapter_no > current?.chapter_no ? prev : current;
    }).chapter_no;
  }

  return (
    <a className="relative block aspect-auto h-full w-full cursor-pointer">
      <div className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border bg-white hover:border-blue-600 dark:bg-black relative border-neutral-200 dark:border-neutral-800">
        <Image
          className="relative object-center transition duration-300 ease-in-out group-hover:scale-105"
          src={comic.thumbnail}
          alt={comic.title!}
          width={250}
          height={70}
        />
      </div>
      <div className="absolute top-0 left-0 flex w-full pt-4 @container/label px-2 cursor-default">
        <div className="flex items-center rounded-full border bg-white/70 p-1 text-black backdrop-blur-md dark:border-neutral-800 dark:bg-black/70 dark:text-white">
          <h3 className="flex-grow pl-2 leading-none tracking-tight px-3 py-2">
            {comic.title}
          </h3>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label lg:px-20 ">
        <div className="flex items-center rounded-full p-1 text-xs font-semibold text-black dark:text-white">
          <p className="flex-none rounded-full bg-blue-600 p-2 text-white">
            Chapter {chapter_no}
          </p>
        </div>
      </div>
    </a>
  );
};

export default Card;
