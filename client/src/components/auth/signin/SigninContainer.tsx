import SigninForm from "./SigninForm"

export default function SigninContainer(){
return(
    <div className='h-full text-white flex flex-col gap-7'>
        <p className = 'text-3xl'>
            Sign In
        </p>
        <SigninForm/>
    </div>
)
}
