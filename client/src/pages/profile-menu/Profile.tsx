import Sidebar from "../../components/global/sidebar/Sidebar"
import Topbar from "../../components/global/topbar/Topbar"

import ProfilePopup from "../../components/profile/ProfilePopup"

export default function ProfilePage(){
return(
    <div className = 'w-full h-screen flex flex-col-reverse md:flex-row overflow-hidden'> 
        <Sidebar/>

        <div className = 'flex-1 h-full flex flex-col overflow-y-auto md:overflow-hidden pb-20 md:pb-0'>
            <div>
                <Topbar/>
            </div>

            <div className="flex-1">
                <ProfilePopup/>
            </div>
        </div>
    </div>
)
}