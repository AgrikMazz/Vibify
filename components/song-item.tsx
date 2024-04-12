"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";
import PlayButton from "./playbutton";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({
    data,
    onClick
}) => {
    const imagePath = useLoadImage(data);

    return (
        <div
            onClick={() => onClick(data.id)}
            className="relative group flex flex-col items-center gap-x-4 gap-y-2 justify-between bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3 rounded-md"
        >
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                <Image
                    className="object-cover"
                    fill
                    src={imagePath || "/images/liked.png"}
                    alt="Image"
                />
            </div>
            <div className="flex flex-col w-full gap-y-1 items-start justify-center">
                <p className="w-full truncate font-semibold">
                    {data.title}
                </p>
                <p className="w-full truncate text-neutral-400 text-sm pb-2">
                    By {data.author}
                </p>
                <div className="absolute top-4 -right-1">
                    <PlayButton />
                </div>
            </div>
        </div>
    );
}
 
export default SongItem;