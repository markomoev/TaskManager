import {supabase} from '../../client'

export const useSignup = async (email: string,
                                 username: string,
                                 password: string,
                                 firstName:string,
                                 lastName:string, ) => {
    // supabase signup function
    try{
        const { data, error:createUserError } = await supabase.auth.signUp({
            email,
            password,
        })
    
        if(createUserError){
            return {error: createUserError.message, data: data}
        }
        // if there is no error update the table for the users too
        if(data){
            const user_id : any = data?.user?.id

            const {error: tableError} = await supabase
            .from('users')
            .upsert({
                id: user_id,
                username: username,
                firstName: firstName,
                lastName: lastName,
            })
            .eq('id', user_id)
            
            if(tableError){
                return {error: tableError.message, data: data}
            }

            return {error: null, data: data}
        }
    }catch(error){
        return {error: "An unexpected error occured!", data: null}
    }
}
