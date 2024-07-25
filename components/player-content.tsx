import { Song } from "@/types";
import MediaItem from "./media-item";
import { BsPauseFill, BsPlayFill } from "react-icons/bs"
import LikeButton from "./like-button";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";
import { HiSpeakerXMark, HiSpeakerWave } from "react-icons/hi2";
import Slider from "./slider";
import usePlayer from "@/hooks/usePlayer";
import { useEffect, useState } from "react";
import useSound from "use-sound"

interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps>= ({
    song,
    songUrl
}) => {
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume===0 ? HiSpeakerXMark : HiSpeakerWave;

    const onPlayerNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1]

        if(!nextSong) {
            return player.setId(player.ids[0])
        }

        player.setId(nextSong);
    }

    const onPlayerPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1]

        if(!previousSong) {
            return player.setId(player.ids[player.ids.length - 1])
        }

        player.setId(previousSong);
    }

    const [play, { pause, sound}] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayerNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );
/*
    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    const handlePlay = () => {
        if(!isPlaying) {
            play();
        } else {
            pause();
        }
    }
*/
    const toggleMute = () => {
        if(volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    }

    return (
        <div className="flex h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} onClick={() => {}}/>
                    <LikeButton songId={song.id} />
                </div>
            </div>
            <div className="flex md:hidden w-full justify-end items-center ml-4">
                <div>
                    <audio className=" bg-purple-400 rounded-full" src={songUrl} onEnded={onPlayerNext} controls onPlay={() => setIsPlaying(true)}></audio>
                </div>
            </div>
            <div className="hidden md:flex">
                <audio className=" bg-purple-400 rounded-full" src={songUrl} onEnded={onPlayerNext} controls autoPlay onPlay={() => setIsPlaying(true)}></audio>
            </div>
            <div className="hidden md:flex items-center max-w-2xl justify-end h-full w-full gap-x-4">
                <AiFillStepBackward onClick={onPlayerPrevious} className="text-neutral-400 hover:text-white hover:scale-105 h-5 w-5 cursor-pointer transition" />
                <AiFillStepForward onClick={onPlayerNext} className="text-neutral-400 hover:text-white hover:scale-105 h-5 w-5 cursor-pointer transition mr-6" />
            </div>
        </div>
    );
}
 
export default PlayerContent;