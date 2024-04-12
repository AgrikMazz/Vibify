"use client";

import { TbPlaylist } from "react-icons/tb"
import { AiOutlinePlus } from "react-icons/ai"
import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import useUploadModal from "@/hooks/useUploadModal";
import MediaItem from "./media-item";
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";

interface LibraryProps {
    songs: Song[];
}

const Library: React.FC<LibraryProps> = ({
    songs
}) => {
    const authModal = useAuthModal();
    const uploadModal = useUploadModal();
    const { user } = useUser();
    const onPlay = useOnPlay(songs);

    const onclick = () => {
       if(!user) {
        return authModal.onOpen();
       }
       //Check for subscription
       return uploadModal.onOpen();
    }

    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" />
                    <p className="text-neutral-400 font-medium">My Library</p>
                </div>
                <AiOutlinePlus onClick={onclick} size={20} className="text-neutral-400 hover:text-white cursor-pointer" />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item) => (
                    <MediaItem
                        key={item.id}
                        onClick={onPlay}
                        data={item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Library;