import { Activity, useEffect, useState } from 'react';
import HustlePopup from '../my-hustle-popups/HustlePopup';

import {PackageOpen, GitCommit} from "lucide-react"
import useLoadMilestone from '@/hooks/my-hustles/my-hustle-load/useLoadMilestone';

export default function MyHustlesCard({hustle}: any) {
    // format date and get specific color
    const formattedDate : any = new Date(hustle.created_at).toDateString().split(' ').slice(1).join().replace(",", " ")
    const getStatusColor = (status: string) => {
        switch(status){
            case 'completed': return 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10';
            case 'paused': return 'text-zinc-400 bg-zinc-800/50 border border-zinc-700';
            default: return 'text-amber-400 border-amber-400/20 bg-amber-400/10';
        }
    }

    // state for existing individual hustle popup
    const [activeHustle, setActiveHustle] = useState<boolean>(false)
    // dividing the array for the tags
    const tagsToDisplay : Array<string> = hustle.tags.flatMap((tag: string) => tag.split(' '))

    // last milestone info
    const [milestone, setMilestone] = useState<any>(null)

    useEffect(() => {
        const load = async() => {
            const response : any = await useLoadMilestone(hustle.id)

            if (response && !response.error && response.data && response.data.length > 0){
                setMilestone(response.data[response.data.length - 1]) 
            }
        }
        load()
    }, [hustle.id])

    return (
    <>
        <Activity mode = {activeHustle ? "visible" : "hidden"}>
            <HustlePopup
                isActive = {setActiveHustle}
                hustle = {hustle}/>
        </Activity>

        <div className="group relative flex flex-col gap-4 p-6 bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/5 hover:-translate-y-1 cursor-pointer">
            {/* Header: Title and Status */}
            <div className="flex justify-between items-start">
                <div className="flex flex-col gap-1">
                    <h3 className="text-xl font-bold text-white group-hover:text-amber-500 transition-colors">  
                        {hustle.title}
                    </h3>
                    <span className="text-xs text-zinc-500 font-medium">{formattedDate}</span>
                </div>
                <span className={`px-3 py-1 text-xs font-medium border rounded-full capitalize ${getStatusColor(hustle.status)}`}>
                    {hustle.status}
                </span>
            </div>

            {/* Description */}
            <p className="text-sm text-zinc-400 line-clamp-2">
                {hustle.description}
            </p>

            {/* Progress Section */}
            <div className="flex flex-col gap-2 mt-2">
                <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-400">Progress</span>
                    <span className="text-white font-medium">{hustle.initial_progress}%</span>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                        className="h-full bg-amber-600 rounded-full" 
                        style={{ width: `${hustle.initial_progress}%` }}
                    ></div>
                </div>
            </div>

            {/* Last Milestone */}
            {milestone && (
               <div className="mt-4 pt-4 border-t border-zinc-800/50">
                   <div className="flex items-center gap-2 mb-2">
                       <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-500">Latest Update</span>
                   </div>
                   <div className="relative pl-6 border-l border-zinc-800 ml-1">
                        <div className="absolute -left-[9px] top-0.5 bg-zinc-900 rounded-full border border-zinc-700 p-1 text-zinc-500 group-hover:border-amber-500 group-hover:text-amber-500 transition-colors shadow-sm">
                            <GitCommit size={10} />
                        </div>
                        <div className="flex flex-col">
                             <p className="text-sm text-zinc-300 font-medium leading-tight group-hover:text-amber-400 transition-colors line-clamp-1">
                                {milestone.title}
                            </p>
                            <span className="text-[10px] text-zinc-600 font-mono mt-0.5">
                                {new Date(milestone.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                        </div>
                   </div>
               </div>
            )}

            {/* Footer: Tags/Meta */}
            <div className="flex flex-col gap-2 mt-2 pt-4 border-t border-zinc-800/50">
                <div className="flex items-center gap-2">
                    <span className="border border-amber-700 px-2.5 py-1 text-xs text-amber-700 bg-zinc-800 rounded-md">
                        {hustle.category}
                    </span>
                </div>
                
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                        {tagsToDisplay.map((tag: string, index: number) => (
                            <span
                                key={index}
                                className={`px-2.5 py-1 text-xs text-zinc-400 bg-zinc-800 rounded-md`}>
                                {tag}
                            </span>
                        ))
                        }
                    </div>

                    {/* Open Hustle Popup Button */}
                    <button 
                        className="cursor-pointer p-1 hover:bg-zinc-800/50 rounded-lg transition-all shrink-0"
                        onClick={(e) => {
                            e.preventDefault();
                            setActiveHustle(true)
                        }}
                    >
                        <PackageOpen
                            className="w-5 h-5 opacity-60 hover:opacity-100 transition-opacity"/>
                    </button>
                </div>
            </div>
        </div>
    </>
    )
}