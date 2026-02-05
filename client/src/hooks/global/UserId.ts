import {supabase} from "../../client"

export const useUserId = async () => {

    try{
        const { data: {session}, error: errorGettingSession } = await supabase.auth.getSession()

        if(errorGettingSession){
            return {error: errorGettingSession.message, data: null}
        }

        const user = session?.user;
        const user_id = user?.id;
        const user_email = user?.email;

        if(!user_id){
            return {error: "No active session!", data: null}
        }

        return {error: null, data: [user_id, user_email]}
    }

    catch(error){
        return {erorr: "An unexpected error occurred", data: null}
    }
}