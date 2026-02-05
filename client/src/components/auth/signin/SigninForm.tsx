import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {useSignin} from '../../../hooks/auth/signin'

import Error from '../../alerts-loaders/Error';

export default function SigninForm() {
  // for navigating after successful signin
  const navigate = useNavigate()

  // variables for the form inputs
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // for error message display and state 
  const [errorMessage, setErrorMessage] = useState('')
  const [isError, setIsError] = useState<boolean>(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const result = await useSignin(email, password)

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


return(
<>
{isError && (
  <div className="text-black fixed left-13 top-0 w-full flex justify-center z-50 pt-5 overflow-x-hidden">
    <Error message={errorMessage} />
  </div>
)}
  
  <div className="overflow-x-hidden flex flex-col gap-6 items-center justify-center bg-zinc-900/50 rounded-xl p-8 ">
    <form 
      className="flex flex-col gap-6 w-full"
      onSubmit={handleSignIn}
    >
      {/* Inputs */}
      <div className="flex flex-col gap-6 w-full">
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder:text-zinc-400 transition"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder:text-zinc-400 transition"
        />
      </div>

      <button
        type="submit"
        className="pt-2 pb-2 bg-zinc-900/20 hover:bg-zinc-800 text-white text-xl rounded-3xl cursor-pointer w-1/2 border-2 border-amber-700 transition-colors duration-300"
      >
        Sign in
      </button>
    </form>
  </div>
</>
);
}
