import { FC } from "react";
import Card from "./Card";

export type RenderComicsProps = {
  comics: {
    title: string;
    thumbnail: string | null;
    description: string;
    chapters: {
      chapter_no: number;
    }[];
  }[]
};

const RenderComics: FC<RenderComicsProps> = ({ comics }) => {
  return (
    <div className="grid place-content-center lg:grid-cols-5 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 w-full">
      {comics ? comics.map((comic, idx) => (
        <Card key={idx} comic={comic} />
      )) : <div>
        <h1 className="text-2xl">No comics found</h1>
      </div>}
    </div>
  );
};

export default RenderComics;
