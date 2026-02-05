import { LogOut } from 'lucide-react';

import {supabase} from '../../../../client'
import { useNavigate } from 'react-router-dom'

type SidebarState = {
    isOpen: boolean;
}

export default function SidebarLogout({isOpen} : SidebarState){
// for nacigating to login after the sign out
const navigate = useNavigate();


const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if(error){
        console.error("Unexpected error occurred, while signing out!" + error);
        return;
    }

    navigate('/signin')
}

return(
    <div>
        <button
            onClick={signOut}
            className={
                `cursor-pointer whitespace-nowrap w-full px-3.5 py-2.5 bg-zinc-900 text-zinc-300 rounded-full text-md font-medium transition-colors duration-300 hover:border-red-500 border border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center gap-3 group
                ${isOpen ? 'items-center' : 'justify-center'}`}   
        >         
            <LogOut className="w-5 h-5 transition-transform duration-300 group-hover:rotate-[-20deg] group-hover:scale-125" />
            <span className={isOpen ? 'visible' : 'hidden'}>Sign out</span>
        </button>
    </div>
)
}