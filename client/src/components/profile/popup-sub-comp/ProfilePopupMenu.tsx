import { NavLink } from "react-router-dom"
import { User, Heart } from "lucide-react"

export default function ProfilePopupMenu(){
return(
    <div className='bg-[oklch(16.5%_0_0)] md:w-64 rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none flex flex-row md:flex-col overflow-x-auto border-b md:border-b-0 md:border-r border-zinc-800 p-2 gap-1'>
        <NavLink
            to={'/profile'}
            end
            className={({isActive}) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap
                ${isActive 
                    ? 'bg-amber-500/10 text-amber-700 font-medium' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }
            `}>
            <User className="w-5 h-5" />
            <span>View Profile</span>
        </NavLink>

        <NavLink
            to='/saved'
            className={({isActive}) => `
                flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 whitespace-nowrap
                ${isActive 
                    ? 'bg-amber-500/10 text-amber-500 font-medium' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                }
            `}>
            <Heart className="w-5 h-5" />
            <span>Favourite</span>
        </NavLink>
    </div>
)
}