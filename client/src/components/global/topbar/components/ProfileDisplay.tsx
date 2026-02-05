import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import ProfileMenu from './ProileMenu'

type nicknameString = {
    nickname: string
}

export default function ProfileDisplay({nickname}: nicknameString){
// state for opened menu
const [isOpen, setIsOpen] = useState(false)

return(
    <div 
        className="w-auto flex flex-col relative z-50"
    >
        <button // on hover open the menu
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className={`
                flex flex-row items-center justify-between px-4 py-2 gap-3
                bg-zinc-900 text-zinc-300 rounded-full text-sm font-medium 
                transition-all duration-300 shadow-md ml-auto border
                ${isOpen ? 'border-amber-700/50 bg-zinc-800' : 'border-zinc-800 hover:border-zinc-700'}
            `}
        >
            <span className="tracking-wide cursor-default">{nickname}</span>
            <ChevronDown 
                className={`w-4 h-4 transition-transform duration-300 text-zinc-500 ${isOpen ? 'rotate-180 text-amber-500' : ''}`}
            />
        </button>
        {/* menu open */}        
        <div 
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            className={`
                absolute right-0 top-full pt-2 transition-all duration-200 origin-top-right
                ${isOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible pointer-events-none'}
            `}
        >
            <ProfileMenu setIsOpen={setIsOpen}/>
        </div>
    </div>
)
}