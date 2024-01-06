import { FC } from "react";
import Card from "./Card";

export type RenderComicsProps = {
  comics: {
    title: string;
    thumbnail: string;
    description: string;
    chapters: {
      chapter_no: number;
    }[];
  }[];
};

const RenderComics: FC<RenderComicsProps> = ({ comics }) => {
  return (
    <div className="flex  gap-5">
      {comics.map((comic, idx) => (
        <Card key={idx} comic={comic} />
      ))}
    </div>
  );
};

export default RenderComics;
