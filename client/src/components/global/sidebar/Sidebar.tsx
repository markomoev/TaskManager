import { useState } from 'react'

import SidebarLink from './components/SidebarLink'
import SidebarLogout from './components/SidebarLogout'

export default function Sidebar(){
    // retractable sidebar
    const [isOpen, setIsOpen] = useState(false)


return (
    <div
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        className={`
            md:h-screen md:shrink-0 md:flex md:flex-col shadow-xl transition-all duration-500 bg-[oklch(16.5%_0_0)] z-50
            fixed bottom-0 left-0 right-0 w-full h-16 flex flex-row items-center justify-between px-6 md:px-0 md:static border-t border-zinc-800 md:border-t-0
            ${isOpen ? 'md:w-48' : 'md:w-26'}
        `}
    >
        <div className="hidden md:flex w-full flex-col items-center justify-center pt-8 pb-4">
            <div className="flex w-full items-center justify-center" style={{paddingLeft: 0}}>
                <p className=' text-white text-4xl font-bold mb-2 text-center' style={{marginLeft: 0}}>
                    <span className = 'text-amber-700'>H</span>
                    <span className = {`${isOpen ? 'visible' : 'hidden'}`}>ustly</span>
                </p>
            </div>
            <hr className="border-zinc-800 w-3/4 mt-2" />
        </div>

        <div className="flex-1 flex flex-row md:flex-col justify-between w-full md:w-auto items-center md:items-stretch overflow-hidden">
            <div className={`w-full ${isOpen ? 'md:px-3' : 'md:px-4'} pt-0 md:pt-8 flex flex-row md:flex-col gap-2 transition-all duration-300 justify-evenly md:justify-start`}>
                <div className = 'w-full h-auto md:bg-zinc-900/50 rounded-3xl flex justify-center'>
                    <SidebarLink isOpen={isOpen} />
                </div>
            </div>
            <div className={`hidden md:block w-full pb-8 ${isOpen ? 'px-3' : 'px-5'} items-cented justify-center`}>
                <SidebarLogout isOpen={isOpen}/>
            </div>
        </div>
    </div>
)
}