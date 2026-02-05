import { useEffect, useRef, useState } from "react"
import { Camera, Save, X, Pencil } from "lucide-react"

// fetching data
import useData from "../../../hooks/profile/DataLoader"
import useProfileUpload from '../../../hooks/profile/ProfileImageUpload'
import useSaveCancel from '../../../hooks/profile/SaveCancel'

// for no profile page users
import UserImage from './icons/user.jpg'
// error message
import Error from "../../alerts-loaders/Error"
//for loading
import Loader from "../../alerts-loaders/Loader"

export default function ProfilePopupContent(){
// edit mode state
const [isEditMode, setIsEditMode] = useState<boolean>(false)

// variables for details
const [username, setUsername] = useState<string>('')
const [email, setEmail] = useState<string>('')
const [firstName, setFirstName] = useState<string>('')
const [lastName, setLastName] = useState<string>('')
const [bio, setBio] = useState<string>('')

// for error display and state if there is an error
const [errorMessage, setErrorMessage] = useState<string>('')
const [isError , setIsError] = useState<boolean>(false)

// state for loader
const [isLoading, setIsLoading] = useState(false)

// getting the data from the loading function
const handleLoadingData = async () => {
    setIsLoading(true)
    const res : any = await useData()

    setUsername(res.data[0][0]?.username || "");
    setEmail(res.data[1] || "");
    setFirstName(res.data[0][0]?.firstName || "");
    setLastName(res.data[0][0]?.lastName || "");
    setBio(res.data[0][0]?.bio || "");
    setAvatarUrl(res.data[0][0]?.avatar_url || null);

    if(res && res.error){
        setIsError(true)
        setErrorMessage(res.error)
        return;
    }

    setIsLoading(false)
}

useEffect(() => {
    if (isError) {
        const timer = setTimeout(() => {
            setIsError(false);
            setErrorMessage('');
        }, 5000);
        return () => clearTimeout(timer);
    }
}, [isError]);

useEffect(() => {
    handleLoadingData();
}, [])

// edit mode
const fileInputRef = useRef<HTMLInputElement>(null)

const handleImageClick = () => {
  if (isEditMode && fileInputRef.current) {
    fileInputRef.current.click();
  }
};

const handleSaving = async() => {
    if(isEditMode === true){
        const res: any = await useSaveCancel({username, firstName, lastName, bio})

        if(res && res.error){
            setIsError(true)
            setErrorMessage(res.error)
            return;
        }

        setErrorMessage('') 
        setIsEditMode(false)
    }
    return;
}

const Reload = () => {
    setIsEditMode(false)
    handleLoadingData();
}

// image state
const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

const changeAvatar = async (e:any) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url : any = await useProfileUpload(file)
    setAvatarUrl(url);

    if(url && url.error){
        setIsError(true)
        setErrorMessage(url.error)
        return;
    }

    setErrorMessage('') 
}
return(
<>
    {isError && (
    <div className="text-black fixed left-13 top-0 w-full flex justify-center z-50 pt-5 overflow-x-hidden">
        <Error message={errorMessage} />
    </div>
)}
    <div className="flex flex-col gap-8 p-6 md:p-10 bg-[oklch(16.5%_0_0)] rounded-b-2xl md:rounded-bl-none md:rounded-r-2xl relative w-full border-t md:border-t-0 md:border-l border-zinc-900/50">
        { isLoading && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-900/50 backdrop-blur-sm rounded-lg cursor-wait">
                <Loader/>
            </div>
        )}
        
        {/* Profile Image and Basic Info */}
        <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left">
            <div
                onClick = {handleImageClick} 
                className="relative group w-32 h-32 rounded-full overflow-hidden shrink-0 ring-4 ring-zinc-800 cursor-pointer shadow-xl transition-transform hover:scale-105"
            >
                <input 
                    type="file"
                    accept = 'image/*'
                    ref = {fileInputRef}
                    onChange = {changeAvatar}
                    style = {{display: 'none'}}
                    className = "z-0"
                />
                <img 
                    src={avatarUrl || UserImage} 
                    alt="Profile Picture" 
                    className="w-full h-full object-cover z-10"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-20">
                    <Camera className="w-8 h-8 text-white" />
                </div>
            </div>
            
            <div className="flex flex-col gap-5 flex-1 w-full max-w-lg">
                <div className="space-y-1.5">
                    <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider ml-1">Username</label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)} 
                        readOnly={!isEditMode}
                        type="text" 
                        placeholder="Enter username"
                        className={`w-full px-4 py-3 bg-zinc-900/50 text-white rounded-xl border border-zinc-800/50 focus:outline-none transition-all
                            ${isEditMode ? 'focus:border-amber-500/50 focus:bg-zinc-900 focus:ring-2 focus:ring-amber-500/10' : 'cursor-default opacity-90'}`}
                    />
                </div>
                
                <div className="space-y-1.5">
                    <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider ml-1">Email</label>
                    <input 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={!isEditMode}
                        type="email"
                        placeholder="Enter email"
                        className={`w-full px-4 py-3 bg-zinc-900/50 text-white rounded-xl border border-zinc-800/50 focus:outline-none transition-all
                            ${isEditMode ? 'focus:border-amber-500/50 focus:bg-zinc-900 focus:ring-2 focus:ring-amber-500/10' : 'cursor-default opacity-90'}`}
                    />
                </div>
            </div>
        </div>

        <hr className="border-zinc-800/80" />

        {/* Profile Info Form */}
        <form
            onSubmit={e => { e.preventDefault(); handleSaving(); }}
            className="flex flex-col gap-6"
        >

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                    <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider ml-1">First name</label>
                    <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        readOnly={!isEditMode}
                        type="text" 
                        placeholder="Enter your first name"
                        className={`w-full px-4 py-3 bg-zinc-900/50 text-white rounded-xl border border-zinc-800/50 focus:outline-none transition-all
                            ${isEditMode ? 'focus:border-amber-500/50 focus:bg-zinc-900 focus:ring-2 focus:ring-amber-500/10' : 'cursor-default opacity-90'}`}
                    />
                </div>

                <div className="space-y-1.5">
                    <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider ml-1">Last name</label>
                    <input 
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        readOnly={!isEditMode}
                        type="text" 
                        placeholder="Enter your last name"
                        className={`w-full px-4 py-3 bg-zinc-900/50 text-white rounded-xl border border-zinc-800/50 focus:outline-none transition-all
                            ${isEditMode ? 'focus:border-amber-500/50 focus:bg-zinc-900 focus:ring-2 focus:ring-amber-500/10' : 'cursor-default opacity-90'}`}
                    />
                </div>
            </div>

            <div className="space-y-1.5">
                <label className="text-zinc-400 text-xs font-semibold uppercase tracking-wider ml-1">Bio</label>
                <textarea
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    readOnly={!isEditMode}
                    placeholder="Tell us about yourself"
                    rows={4}
                    className={`w-full px-4 py-3 bg-zinc-900/50 text-white rounded-xl border border-zinc-800/50 focus:outline-none transition-all resize-none
                        ${isEditMode ? 'focus:border-amber-500/50 focus:bg-zinc-900 focus:ring-2 focus:ring-amber-500/10' : 'cursor-default opacity-90'}`}
                />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end items-center pt-4">
                {!isEditMode ? (
                    <button
                        onClick={() => setIsEditMode(true)}
                        type="button"
                        className="flex items-center gap-2 px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 hover:text-white text-zinc-300 font-medium rounded-full border border-zinc-700/50 transition-all active:scale-95"
                    >
                        <Pencil className="w-4 h-4" />
                        <span>Edit Profile</span>
                    </button>
                ) : (
                    <div className="flex items-center gap-3 animate-in fade-in slide-in-from-right-4 duration-200">
                        <button
                            onClick={Reload}
                            type="button"
                            className="flex items-center gap-2 px-4 py-2.5 bg-transparent hover:bg-zinc-800 text-zinc-400 hover:text-white font-medium md:text-md text-sm rounded-full border border-transparent hover:border-zinc-700 transition-all"
                        > 
                            <X className="w-4 h-4" />
                            <span>Cancel</span>
                        </button>

                        <button 
                            type="submit"
                            className="flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-medium md:text-md text-sm rounded-full shadow-lg shadow-amber-900/20 transition-all hover:scale-105 active:scale-95"
                        >
                            <Save className="w-4 h-4" />
                            <span>Save Changes</span>
                        </button>
                    </div>
                )}
            </div>
        </form>
    </div>
</>
)
}