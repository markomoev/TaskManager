import { NavLink } from "react-router-dom"
import { User, Settings } from "lucide-react"

type openStateProp = {
    setIsOpen: (value: boolean) => void;
}

export default function ProfileMenu({setIsOpen}: openStateProp){

return(
    <div 
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className='w-56 p-2 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl flex flex-col gap-1 backdrop-blur-sm'
    >
        <NavLink
            className={({isActive}) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}
            `}
            to={'/profile'}
        >
            <User className="w-4 h-4" />
            <span className="text-sm font-medium">Profile</span>
        </NavLink>

        <NavLink
            className={({isActive}) => `
                flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200
                ${isActive ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}
            `}
            to=""
        >
            <Settings className="w-4 h-4" />
            <span className="text-sm font-medium">Settings</span>
        </NavLink>
    </div>
)
}