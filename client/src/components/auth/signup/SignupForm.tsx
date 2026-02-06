import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import Error from '../../alerts-loaders/Error'

export default function SignupForm() {
    // for navigating
    const navigate = useNavigate()
    
    // state
    const [inputs, setInputs] = useState({
        username: "",
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });
    
    // error state and display
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState<boolean>(false)

    useEffect(() => {
        setTimeout(() => {
            setIsError(false)
            setErrorMessage('')
        }, 5000)
    },[isError])

    // for the inputs change
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // We extract name and value to make it cleaner
        const { name, value } = e.target;

        setInputs(prev => ({
            ...prev,
            // We tell TypeScript: "Trust me, the name matches a key in inputs"
            [name]: value
        }));
    };

    // handling signup
        const handleSignup = async () => {
        try {
            const response = await fetch("http://localhost:3001/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputs)
            });

            // DEBUGGING: Read raw text first
            const textResponse = await response.text();
            console.log("Raw Server Response:", textResponse); // <--- Check your browser console for this!

            let parseRes;
            try {
                parseRes = JSON.parse(textResponse);
            } catch (e) {
                setErrorMessage("Server Error: " + textResponse);
                setIsError(true);
                return;
            }

            if (response.ok) {
                localStorage.setItem("token", parseRes.token);
                navigate("/");
            } else {
                setIsError(true);
                // Handle case where server sends plain text or object
                setErrorMessage(parseRes.message || parseRes || "Registration failed");
            }
        } catch (err: any) {
            console.error(err);
            setIsError(true);
            setErrorMessage("Connection failed");
        }
    };

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
                    onSubmit={(e) => { e.preventDefault(); handleSignup(); }}
                >
                    {/* Inputs */}
                    <div className="flex gap-4 w-full">
                        <input
                            type="text"
                            name="firstName" 
                            placeholder="First name"
                            value={inputs.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder:text-zinc-400 transition"
                        />
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last name"
                            value={inputs.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder:text-zinc-400 transition"
                        />
                    </div>

                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        value={inputs.username}
                        onChange={handleChange}
                        className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder:text-zinc-400 transition"
                    />

                    <div className="flex gap-4 w-full">
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={inputs.email}
                            onChange={handleChange}
                            className="w-full px-4 py-2 bg-zinc-900 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700 placeholder:text-zinc-400 transition"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={inputs.password}
                            onChange={handleChange}
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