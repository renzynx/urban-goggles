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
    <div className="relative w-[200px] h-[300px] group cursor-pointer">
      <Image
        src={comic.thumbnail || "/images/placeholder.png"}
        alt={comic.title}
        layout="fill"
        objectFit="cover"
        className="opacity-80 rounded-md group-hover:opacity-50 transition-opacity duration-300"
      />
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background to-transparent rounded-b-md p-2 shadow-lg">
        <h1 className="text-white font-bold">{comic.title}</h1>
        <p className="text-white text-sm">
          {comic.chapters.length} Chapter{comic.chapters.length > 1 && "s"}
        </p>

      </div>
    </div>
  );
};

export default Card;
