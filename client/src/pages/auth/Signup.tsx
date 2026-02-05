// import the components
import SignupContainer from "../../components/auth/signup/SignupContainer"
import Sidebar from "../../components/global/sidebar/Sidebar"
import Topbar from "../../components/global/topbar/Topbar"

export default function SignupPage(){
return(
    <div className = 'flex flex-row'>
            <Sidebar/>
        <div className="flex flex-col items-center h-screen w-14/15">
            <Topbar/>
            <div className = 'flex items-center justify-center md:mt-40'>
                <SignupContainer/>
            </div>
        </div>
    </div>
)
}