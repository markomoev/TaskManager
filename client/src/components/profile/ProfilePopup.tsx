import ProfilePopupMenu from './popup-sub-comp/ProfilePopupMenu'
import ProfilePopupContent from './popup-sub-comp/ProfilePopupContent'

export default function ProfilePopup(){
return(
    <div className='w-full h-auto md:h-full flex flex-col md:flex-row gap-0 justify-start md:justify-center pt-4 md:pt-15 px-4 md:px-0 md:overflow-y-hidden'>
        {/* menu for other sub pages */}
        <div className='w-full md:w-auto h-auto'>
            <ProfilePopupMenu/>
        </div>
        {/* main content */}
        <div className="w-full md:w-auto">
            <ProfilePopupContent/>
        </div>
    </div>
)
}