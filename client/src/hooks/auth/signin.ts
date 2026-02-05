import {supabase} from '../../client'

export const useSignin = async(email: string, password: string) => {    
    try{
        const { data, error: signinUserError } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if(signinUserError){
            return {error: signinUserError.message, data: null};
        }
        return {error: null, data: data}
    }
    catch(error){
        return {error: "Unexpected error", data: null}
    }
}