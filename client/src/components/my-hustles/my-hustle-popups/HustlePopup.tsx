import editIcon from '../icons/hustle-popup/edit.svg'
import closeIcon from '../icons/hustle-popup/close.svg'

import { useEffect, useState, Activity } from 'react'
import { Plus, X, GitCommit } from 'lucide-react'

import useDeleteHustle from '../../../hooks/my-hustles/my-hustles-edit/useDeleteHustle'
import useUpdateHustle from '../../../hooks/my-hustles/my-hustles-edit/useUpdateHustle'
import useCreateMilestone from '@/hooks/my-hustles/my-hustle-create/useCreateMilestone'
import useLoadMilestone from '@/hooks/my-hustles/my-hustle-load/useLoadMilestone'
import useUpdateMilestone from '@/hooks/my-hustles/my-hustles-edit/useUpdateMilestone'


export default function HustlePopup({isActive, hustle} : any) {
    // states for all the hustle and milestone inputs
    const [hustleInputs, setHustleInputs] = useState({
        title: hustle.title,
        description: hustle.description,
        status: hustle.status,
        category: hustle.category,
        tags: Array.isArray(hustle.tags) ? hustle.tags.join(' ') : hustle.tags,
        visibility: 'public',
        initialProgress: hustle.initial_progress
    })
    const [milestoneInput, setMilestoneInput] = useState<string>("")
    const [milestones, setMilestones] = useState<any[]>([])

    // modes
    const [isEditMode, setIsEditMode] = useState<boolean>(false)
    const [addMilestone, setAddMilestone] = useState<boolean>(false)


    // formatting and coloring
    const formattedDate : any = new Date(hustle.created_at).toDateString().split(' ').slice(1).join().replace(",", " ")
    const getStatusColor = (status: string) => {
        switch(status){
            case 'completed': return 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10';
            case 'paused': return 'text-zinc-400 bg-zinc-800/50 border border-zinc-700';
            default: return 'text-amber-400 border-amber-400/20 bg-amber-400/10';
        }
    }


    // handles
    const handleDeleteHustle = async() => {
        const response : any = await useDeleteHustle(hustle.id)
        return {error: null, data: response}
    }

    const handleUpdateHustle = async () => {
        const response : any = await useUpdateHustle(hustle.id, hustleInputs)  
        
        // Update milestones
        const milestonesResponse : any = await useUpdateMilestone(milestones)      
        if (milestonesResponse.error) {
            return {data: null, error: milestonesResponse.error}
        }

        setIsEditMode(false)
        return {error: null, data: {hustle: response, milestones: milestonesResponse}}
    }

    const handleCreateMilestone = async () => {
        const response : any = await useCreateMilestone(hustle.id, milestoneInput)
        
        if (response && !response.error) {
             setMilestoneInput("")
             setAddMilestone(false)
             // reload milestones after create
             const loaded : any = await useLoadMilestone(hustle.id)
             if(loaded && !loaded.error) setMilestones(loaded.data || [])
        } 
        else{
            return{data: null, error: "Error creating a milestone!"}
        }
    }

    // load milestones on mount
    useEffect(() => {
        const load = async () => {
            const response : any = await useLoadMilestone(hustle.id)
            if (response && !response.error) {
                setMilestones(response.data || [])
            } else {
                return{data: null, error: response.error}
            }
        }
        load()
    }, [hustle.id])
    
    
      
    return (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="relative w-full h-[90vh] md:h-auto md:max-w-2xl mx-0 md:mx-4 bg-zinc-900 border-t md:border border-zinc-800 rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col">
                
                {/* Header */}
                <div className="flex justify-between items-start px-6 md:px-8 py-5 border-b border-zinc-800 bg-zinc-900 md:rounded-t-2xl sticky top-0 z-10">
                    <div className="flex flex-col gap-1 w-full mr-8">
                        <Activity mode={isEditMode ? "visible" : "hidden"}>
                            <input 
                                type="text"
                                value={hustleInputs.title}
                                onChange={(e) => setHustleInputs({...hustleInputs, title: e.target.value})}
                                className="text-2xl font-bold text-white bg-transparent border-0 border-b border-zinc-800 focus:border-amber-500 focus:ring-0 px-0 py-1 w-full transition-colors placeholder:text-zinc-800 focus:outline-none"
                                placeholder="Hustle Title"
                            />
                        </Activity>
                        <Activity mode={!isEditMode ? "visible" : "hidden"}>
                            <h2 className="text-2xl font-bold text-white">
                                {hustle.title}
                            </h2>
                        </Activity>
                        <span className="text-sm text-zinc-500">
                            {formattedDate}
                        </span>
                    </div>
                    <button
                        type="button"
                        onClick={() => isActive(false)}
                        className="cursor-pointer p-1.5 rounded-lg hover:bg-zinc-800 transition-all duration-200 opacity-60 hover:opacity-100 shrink-0">
                        <img src={closeIcon} alt="" className = '' />
                    </button>
                </div>

                {/* Content */}
                <form className="px-6 md:px-8 py-6 h-full overflow-y-auto flex flex-col gap-8 overscroll-contain pb-0 md:pb-6">
                    
                    {/* Status & Category Row */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-zinc-400 text-sm">Status:</span>
                            <Activity mode={isEditMode ? "visible" : "hidden"}>
                                <select 
                                    value={hustleInputs.status}
                                    onChange={(e) => setHustleInputs({...hustleInputs, status: e.target.value})}
                                    className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:border-amber-500">
                                    <option value="active">Active</option>
                                    <option value="paused">Paused</option>
                                    <option value="completed">Completed</option>
                                </select>
                            </Activity>
                            <Activity mode={!isEditMode ? "visible" : "hidden"}>
                                <span className={`px-3 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(hustle.status)}`}>
                                    {hustle.status}
                                </span>
                            </Activity>
                        </div>
                        <div className="hidden sm:block w-px h-6 bg-zinc-800"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-zinc-400 text-sm">Category:</span>
                            <Activity mode={isEditMode ? "visible" : "hidden"}>
                                <input 
                                    type="text"
                                    value={hustleInputs.category}
                                    onChange={(e) => setHustleInputs({...hustleInputs, category: e.target.value})}
                                    className="text-sm font-medium bg-zinc-800 text-white border border-zinc-700 rounded px-2 py-0.5 focus:outline-none focus:border-amber-500 w-32"
                                />
                            </Activity>
                            <Activity mode={!isEditMode ? "visible" : "hidden"}>
                                <span className="text-amber-500 text-sm font-medium">{hustle.category}</span>
                            </Activity>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-2">
                        <h3 className="text-sm font-medium tracking-wider text-zinc-500">Description</h3>
                        <Activity mode={isEditMode ? "visible" : "hidden"}>
                            <textarea 
                                value={hustleInputs.description}
                                onChange={(e) => setHustleInputs({...hustleInputs, description: e.target.value})}
                                rows={4}
                                className="text-zinc-300 leading-relaxed bg-zinc-800 border border-zinc-700 rounded-lg p-3 focus:outline-none focus:border-amber-500 w-full resize-none"
                            />
                        </Activity>
                        <Activity mode={!isEditMode ? "visible" : "hidden"}>
                            <p className="text-zinc-300 leading-relaxed">
                                {hustle.description}
                            </p>
                        </Activity>
                    </div>

                    {/* Progress */}
                    <div className="flex flex-col gap-3">
                        <div className="flex justify-between items-center">
                            <h3 className="text-sm font-medium tracking-wider text-zinc-500">Progress</h3>
                            <Activity mode={isEditMode ? "visible" : "hidden"}>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="number" 
                                        min="0" 
                                        max="100"
                                        value={hustleInputs.initialProgress}
                                        onChange={(e) => setHustleInputs({...hustleInputs, initialProgress: e.target.value})}
                                        className="w-16 bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-white text-right focus:outline-none focus:border-amber-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <span className="text-zinc-400">%</span>
                                </div>
                            </Activity>
                            <Activity mode={!isEditMode ? "visible" : "hidden"}>
                                <span className="text-white font-bold">{hustle.initial_progress}%</span>
                            </Activity>
                        </div>
                        <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-amber-600 rounded-full" 
                                style={{ width: `${hustle.initial_progress}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* New Milestone Input */}
                    <div className={`${addMilestone ? 'block' : 'hidden'} py-2 animate-in fade-in slide-in-from-top-2 duration-200`}>
                        <div className="flex flex-col gap-2 p-3 bg-zinc-800/40 border border-zinc-800 rounded-xl">
                            <div className="flex justify-between items-center px-1">
                                <span className="text-xs uppercase tracking-wider font-semibold text-amber-500">New Milestone</span>
                            </div>
                            
                            <div className="flex items-center gap-2">
                                <input 
                                    type="text" 
                                    placeholder="What have you achieved?"
                                    className="flex-1 bg-zinc-900 border border-zinc-700/50 rounded-lg px-3 py-2 text-sm text-zinc-200 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/20 transition-all placeholder:text-zinc-600"
                                    autoFocus
                                    value = {milestoneInput}
                                    onChange = {(e) => setMilestoneInput(e.target.value)}
                                />
                                <div className="flex gap-1.5">
                                    <button
                                        type="button" 
                                        onClick={() => setAddMilestone(false)}
                                        className="p-2 rounded-lg text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                     <button
                                        type="button"
                                        onClick = {() => handleCreateMilestone()} 
                                        className="p-2 rounded-lg text-zinc-900 bg-amber-500 hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Milestones Container */}
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                            <h3 className="text-sm font-medium tracking-wider text-zinc-500">Milestones</h3>
                        </div>
                        
                        {/* Milestone Item Structure - Repeated for each milestone */}
                        <div className="flex flex-col gap-2">
                            {milestones.length === 0 && (
                                <p className="text-zinc-500 text-sm italic px-2">No milestones yet.</p>
                            )}
                            <div className="relative ml-2 border-l border-zinc-800 space-y-5 pb-2 pt-1">
                                {milestones.map((ms: any, index: number) => (
                                    <div key={ms.id} className="group relative pl-6">
                                        {/* Timeline Node */}
                                        <div className="absolute -left-[9px] top-0.5 bg-zinc-900 rounded-full border border-zinc-700 p-1 text-zinc-500 group-hover:border-amber-500 group-hover:text-amber-500 transition-colors shadow-sm">
                                            <GitCommit size={10} />
                                        </div>
                                        
                                        {/* Content */}
                                        <div className="flex flex-col w-full gap-1">
                                            <Activity mode={isEditMode ? "visible" : "hidden"}>
                                                <input 
                                                    type="text"
                                                    value={ms.title}
                                                    onChange={(e) => {
                                                        const newMilestones = [...milestones];
                                                        newMilestones[index] = { ...newMilestones[index], title: e.target.value };
                                                        setMilestones(newMilestones);
                                                    }}
                                                    className="w-full bg-transparent border-0 border-b border-zinc-700 px-0 py-1 text-sm text-zinc-200 focus:outline-none focus:border-amber-500 focus:ring-0 transition-colors placeholder:text-zinc-600"
                                                />
                                            </Activity>
                                            <Activity mode={!isEditMode ? "visible" : "hidden"}>
                                                <p className="text-sm text-zinc-300 font-medium leading-tight group-hover:text-amber-400 transition-colors">
                                                    {ms.title}
                                                </p>
                                            </Activity>
                                            
                                            <span className="text-[10px] text-zinc-600 font-mono">
                                                {new Date(ms.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-col gap-3">
                        <h3 className="text-sm font-medium tracking-wider text-zinc-500">Tags</h3>
                        <Activity mode={isEditMode ? "visible" : "hidden"}>
                            <input 
                                type="text"
                                value={hustleInputs.tags}
                                onChange={(e) => setHustleInputs({...hustleInputs, tags: e.target.value})}
                                className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-zinc-300 focus:outline-none focus:border-amber-500"
                                placeholder="Separate tags with spaces"
                            />
                        </Activity>
                        <Activity mode={!isEditMode ? "visible" : "hidden"}>
                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 text-sm text-zinc-400 bg-zinc-800 rounded-lg border border-zinc-700/50">
                                    {hustle.tags}
                                </span>
                            </div>
                        </Activity>
                    </div>
                    {/* Footer / Actions */}
                    <div className="pt-5 mt-auto border-t border-zinc-800 flex flex-col-reverse sm:flex-row justify-end gap-3 sticky bottom-0 bg-zinc-900 pb-10">
                        <Activity mode={isEditMode ? "visible" : "hidden"}>
                            <div className="w-full flex flex-col-reverse sm:flex-row items-center justify-between gap-3">
                                <button 
                                    type="button"
                                    onClick = {() =>  handleDeleteHustle()}
                                    className="cursor-pointer w-full sm:w-auto px-4 py-3 sm:py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-xl transition-colors">
                                    Delete
                                </button>
                                <div className="flex flex-col-reverse sm:flex-row items-center gap-3 w-full sm:w-auto">
                                    <button 
                                        type="button"
                                        onClick={() => setIsEditMode(false)}
                                        className="cursor-pointer w-full sm:w-auto px-4 py-3 sm:py-2 text-sm font-medium text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-xl transition-colors">
                                        Cancel
                                    </button>
                                    <button 
                                        onClick={(e) => {
                                            e.preventDefault()
                                            handleUpdateHustle()
                                        }}
                                        type="button"
                                        className="cursor-pointer w-full sm:w-auto px-4 py-3 sm:py-2 text-sm font-medium text-zinc-900 bg-amber-500 hover:bg-amber-400 rounded-xl transition-colors shadow-lg shadow-amber-500/20">
                                        Save
                                    </button>
                                </div>
                            </div>
                        </Activity>
                        
                        <Activity mode={!isEditMode ? "visible" : "hidden"}>
                            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                                <button
                                    type = "button"
                                    onClick = {() => setAddMilestone(true)}
                                    className="cursor-pointer group flex items-center justify-center gap-2 px-4 py-3 sm:py-2 text-sm font-medium text-zinc-900 bg-amber-600 hover:bg-amber-700 hover:text-black hover:border-zinc-600 rounded-xl transition-all duration-200 w-full sm:w-auto">
                                    Add Milestone
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setIsEditMode(true)} 
                                    className="cursor-pointer group flex items-center justify-center gap-2 px-4 py-3 sm:py-2 text-sm font-medium text-zinc-400 bg-zinc-800/50 hover:bg-zinc-800 hover:text-white border border-zinc-700/50 hover:border-zinc-600 rounded-xl transition-all duration-200 w-full sm:w-auto">
                                    <img src={editIcon} alt="Edit Icon" className=''/>
                                    Edit Details
                                </button>
                            </div>
                        </Activity>
                    </div>

                </form>
            </div>
        </div>
    )
}
