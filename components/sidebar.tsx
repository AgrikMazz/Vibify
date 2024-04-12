"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import Box from "./box";
import SidebarItem from "./sidebar-item";
import Library from "./library";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import { twMerge } from "tailwind-merge";
 
interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}

const Sidebar: React.FC<SidebarProps> = ({
    children,
    songs
}) => {
    const pathname = usePathname();
    const player = usePlayer();

    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: "Home",
            active: pathname !== "/search",
            href: "/",
        },
        {
            icon: BiSearch,
            label: "Search",
            active: pathname === "/search",
            href: "/search",
        }
    ], [pathname])

    return (
        <div className={twMerge("flex h-full", player.activeId && "h-[calc(100%-80px)]")}>
            <div className="p-2 hidden md:flex flex-col h-full w-[300px] gap-y-2">
                <Box>
                    <div className="flex flex-col">
                        {routes.map((item) =>
                            <SidebarItem
                                key={item.label}
                                {...item}
                            />
                        )}
                    </div>
                </Box>
                <Box className="flex flex-col overflow-y-auto h-full">
                    <Library songs={songs} />
                </Box>
            </div>
            <main className="p-2 w-full">
                {children}
            </main>
        </div>
    );
}
 
export default Sidebar
