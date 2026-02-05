import { useState, Activity, useContext } from "react"
import { SearchContext } from "./SearchContext"
// popup for adding hustle
import NewHustlePopup from "./my-hustle-popups/NewHustlePopup"

import {Plus} from "lucide-react"

export default function MyHustlesTopbar(){
    // show hustle
    const [showPopup, setShowPopup] = useState<boolean>(false)
    // search bar 
    const {search, setSearch} : any = useContext(SearchContext)

return(
    <div className="w-full flex flex-col gap-6">
        <Activity mode = {showPopup ? 'visible' : 'hidden'}>
            <NewHustlePopup setShowPopup = {setShowPopup}/>
        </Activity>

        <div className="flex flex-row justify-between items-center gap-4">
            <h1 className="text-2xl md:text-3xl text-white font-bold tracking-tight">
                My Hustles
            </h1>
            <button 
                onClick = {() => setShowPopup(true)}
                className="cursor-pointer px-4 py-2 md:px-5 md:py-2.5 bg-amber-700 hover:bg-amber-600 text-white text-sm md:text-base font-medium rounded-xl transition-colors duration-200 flex items-center gap-2 shadow-lg shadow-amber-900/20 whitespace-nowrap">
                <Plus className = "w-4 h-4"/>
                Add Hustle
            </button>
        </div>

        <div className="w-full relative">
            <input 
                onChange={(e) => setSearch(e.target.value)}
                value = {search}
                type="text" 
                placeholder="Search hustles..."
                className="w-full bg-zinc-900/50 border border-zinc-800 text-white placeholder-zinc-500 rounded-xl px-5 py-3 focus:outline-none focus:border-amber-700 focus:ring-amber-700 transition-all duration-200"
            />
        </div>
    </div>
)
}