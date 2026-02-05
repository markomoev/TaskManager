import { useEffect, useEffectEvent, useState } from "react"
import { NavLink } from "react-router-dom"
import { LogIn, UserPlus } from "lucide-react"

import {supabase} from '../../../../client'

// displaying username and avatar
import ProfileDisplay from "./ProfileDisplay"
import ProfileAvatar from "./ProfileAvatar"
// for loading username
import Loader from '../../../alerts-loaders/Loader'


export default function AuthLink(){
// username variables
const [nickname, setNickname] = useState('')
const [isLoggedIn, setIsLoggedIn] = useState(false)

// state for loading gif
const [isLoading, setIsLoading] = useState(false)

// taking the username
const handleLogin = useEffectEvent( async () => {
    const { data: { user } } = await supabase.auth.getUser()
    const user_id : any = user?.id;

    try{
        if(user_id){
            setIsLoading(true)
            const {data:fetchedUsername, error: fetchingUsernameError} = await supabase
                .from('users')
                .select('username')
                .eq('id', user_id)

            if(fetchingUsernameError){
                console.error("Error in fetching username: " + fetchingUsernameError.message);
                return;
            }
            setNickname(fetchedUsername[0]?.username)
            setIsLoggedIn(true)
            setIsLoading(false)
            return nickname;
        }
    }
    catch(error){
        console.error('An unexpected error occurred! ' + error )
    }
});

useEffect(() => {
    handleLogin();
}, []);

return(
<div className="flex flex-row gap-4 w-full justify-end items-center">
    { isLoading ? (
        <div className = '-mt-6.5'>
            <Loader />
        </div>
    ) 
    :
    isLoggedIn ? 
    ( <div className = 'w-full flex flex-row items-center justify-end gap-3'> 
            <div className = 'mt-2'>
                <ProfileDisplay
                    nickname = {nickname}/>
            </div>
                <div className = "">            
                    <ProfileAvatar />
                </div>
        </div>
        )
    : 
    ( <div className="flex gap-3">
            <NavLink
                to={'/signup'}
                className="group flex items-center gap-2 px-5 py-2 bg-transparent text-zinc-400 hover:text-white rounded-full text-sm font-medium transition-all duration-200"
            >
                <UserPlus className="w-4 h-4 transition-transform group-hover:scale-110" />
                Sign up
            </NavLink>
            <NavLink
                to={'/signin'}
                className="group flex items-center gap-2 px-5 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-full text-sm font-medium transition-all duration-200 hover:bg-amber-900/20 hover:text-amber-500 hover:border-amber-900/50 shadow-sm"
            >
                <LogIn className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                Sign in
            </NavLink>
        </div> )
    }
</div>
)
}