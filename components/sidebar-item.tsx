import Link from "next/link";
import { IconType } from "react-icons";
import { twMerge } from "tailwind-merge";

interface SidebarItemProps {
    icon: IconType;
    label: string;
    active?: boolean;
    href: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
    return (
        <Link
            href={href}
            className={twMerge(`flex flex-row h-auto items-center w-full gap-x-4 font-medium cursor-pointer text-neutral-400 hover:text-white hover:bg-gray-700 rounded-lg py-1 px-2`, 
            active && "text-white")}
        >
            <Icon size={25} />
            <p>{label}</p>
        </Link>
    );
}
 
export default SidebarItem;