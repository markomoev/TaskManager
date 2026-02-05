import AuthLink from "./components/AuthLink"

export default function Topbar(){
return(
    <div className="w-full h-fit flex items-center justify-end px-4 md:px-8 py-4 bg-transparent">
        <AuthLink />
    </div>
)
}