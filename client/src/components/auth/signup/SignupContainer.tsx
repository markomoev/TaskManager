import SignupForm from "./SignupForm"

export default function SignupContainer(){
return(
    <div className='h-full text-white flex flex-col gap-7'>
        <p className = 'text-3xl'>
            Sign Up
        </p>
        <SignupForm/>
    </div>
)
}