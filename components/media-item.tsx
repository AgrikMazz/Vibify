"use client";

import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import Image from "next/image";

interface MediaItemProps {
    data: Song;
    onClick: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
    data,
    onClick
}) => {
    const imageUrl = useLoadImage(data);

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }
        //TODO: Default turn on player
    }
    return (
        <div
            onClick={handleClick}
            className="flex items-center gap-x-3 cursor-pointer hover:bg-neutral-700/50 py-2 px-3 rounded-md w-full"
        >
            <div className="relative rounded-md overflow-hidden min-h-[48px] min-w-[48px]">
                <Image
                    className="object-cover"
                    fill
                    src={imageUrl || "/images/liked.png"}
                    alt="Media item"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{data.title}</p>
                <p className="text-neutral-400 text-sm truncate">{data.author}</p>
            </div>
        </div>
    );
}
 
export default MediaItem;