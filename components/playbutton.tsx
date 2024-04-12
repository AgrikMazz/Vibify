import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
    return (
        <div>
            <button className="absolute transition opacity-0 rounded-full flex bg-green-500 p-2 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110">
                <FaPlay size={15} className="text-black" />
            </button>
        </div>
    );
}
 
export default PlayButton;