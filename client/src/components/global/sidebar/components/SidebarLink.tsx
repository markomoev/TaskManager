import {NavLink} from 'react-router-dom'

import { House, FolderClosed, SquareActivity } from 'lucide-react';

// retractable sidebar prop
type SidebarState = {
    isOpen: boolean;
}


export default function SidebarLink({isOpen}: SidebarState){
    // array for all links info
    const links = [
        {to: '/', label: "Home", icon: House},
        {to: '/my-hustles', label: "My Hustles", icon: FolderClosed},
        {to: '/progress', label: "Progress", icon: SquareActivity},
    ]

    const linksDisplay = links.map((l) => {
        const Icon = l.icon;
        return (
            <NavLink
                key={l.label}
                to={l.to}
                className={({ isActive }) =>
                    `group ${isOpen ? 'md:px-3 md:pr-5 md:py-3 md:justify-start' : 'md:px-3.5 md:py-2.5 md:justify-center'}
                    p-2 justify-center
                    w-full whitespace-nowrap flex flex-row items-center gap-4 text-white text-md rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 backdrop-blur-md overflow-hidden
                    ${isActive ? 'border md:border-amber-700 shadow-lg md:bg-zinc-900 text-amber-500 md:text-white' : 'border-2 border-transparent md:hover:bg-zinc-800/30 text-zinc-400 md:text-white'}`
                }
            >
                {typeof l.icon === 'string' ? (
                    <img src={l.icon} alt={l.label} className="w-6 h-6 shrink-0 transition-transform duration-300 md:group-hover:rotate-[-20deg] md:group-hover:scale-125" />
                ) : (
                    <Icon className="w-6 h-6 shrink-0 transition-transform duration-300 md:group-hover:rotate-[-20deg] md:group-hover:scale-125" />
                )}
                <span className={`hidden ${isOpen ? 'md:block md:opacity-100' : 'md:hidden md:opacity-0'} transition-opacity duration-300`}>{l.label}</span>
            </NavLink>
        );
    });

    return (
        <div className="flex flex-row md:flex-col gap-1 w-full justify-evenly md:justify-start">
            {linksDisplay}
        </div>
    )
}