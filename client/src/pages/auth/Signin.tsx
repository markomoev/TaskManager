import SigninContainer from "../../components/auth/signin/SigninContainer"
import Sidebar from "../../components/global/sidebar/Sidebar"
import Topbar from "../../components/global/topbar/Topbar"

export default function SigninPage(){
  return(
    <div className="flex flex-row overflow-x-hidden">
      <Sidebar />

      <div className="flex flex-col h-screen w-14/15"> 
        <Topbar />

        <div className="flex items-center justify-center md:mt-40">
          <SigninContainer />
        </div>
      </div>
    </div>
)
}
