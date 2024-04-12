"use client";

import LikeButton from "@/components/like-button";
import MediaItem from "@/components/media-item";
import useOnPlay from "@/hooks/useOnPlay";
import { Song } from "@/types";

interface SearchContentProps {
    songs: Song[];
}

const SearchContent: React.FC<SearchContentProps> = ({
    songs
}) => {
    const onPlay = useOnPlay(songs);

    if(songs.length === 0) {
        return (
            <div className="px-6 gap-y-2 flex flex-col text-sm text-neutral-400">
                No songs found
            </div>
        );
    }

    return (
        <div className="px-6 gap-y-2 flex flex-col text-neutral-400">
            {songs.map((item) => (
                <div key={item.id} className="flex items-center w-full gap-x-4">
                    <div className="flex-1">
                        <MediaItem data={item} onClick={onPlay} />
                    </div>
                    <LikeButton songId={item.id} />
                </div>
            ))}
        </div>
    );
}
 
export default SearchContent;