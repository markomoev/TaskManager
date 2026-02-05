import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {useSignup} from '../../../hooks/auth/signup'

import Error from '../../alerts-loaders/Error'

export default function SignupForm() {
    // for navigating after successful signin
    const navigate = useNavigate()

    // state management of the signup credentials
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    
    // for error message display and state
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState<boolean>(false)

    const handleSignUp = async (e: React.FormEvent) =>  {
        e.preventDefault()
        const result : any = await useSignup(email, username, password, firstName, lastName)

        if(result && result.error){
            setIsError(true)
            setErrorMessage(result.error)
        return;
        }

        navigate('/')
        setErrorMessage('') 
    }

    useEffect(() => {
        setTimeout(() => {
            setIsError(false)
            setErrorMessage('')
        }, 5000)
    },[isError])


    return (
    <>
        {isError && (
        <div className="text-black fixed left-13 top-0 w-full flex justify-center z-50 pt-5 overflow-x-hidden">
            <Error message={errorMessage} />
        </div>
        )}
        <div className="flex flex-col gap-6 items-center justify-center bg-zinc-900/40 rounded-xl p-8">
            <form 
                className="flex flex-col gap-6 w-full"
                onSubmit={handleSignUp}
            >
                {/* Inputs */}
                <div className="flex gap-4 w-full">
                    <input
                        type="text"
                        placeholder="First name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder:text-zinc-400 transition"
                    />
                    <input
                        type="text"
                        placeholder="Last name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder:text-zinc-400 transition"
                    />
                </div>

                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder:text-zinc-400 transition"
                />

                <div className="flex gap-4 w-full">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder:text-zinc-400 transition"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder:text-zinc-400 transition"
                    />
                </div>

                <button
                    type="submit"
                    className="pt-2 pb-2 bg-zinc-900/20 hover:bg-zinc-800 text-white text-xl rounded-3xl cursor-pointer w-1/2 border-2 border-amber-700 transition-colors duration-300"
                >
                    Sign up
                </button>
            </form>
        </div>
    </>
    );
}