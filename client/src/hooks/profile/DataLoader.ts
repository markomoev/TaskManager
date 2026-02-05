import {supabase} from '../../client'
// import the user id
import { useUserId } from '../global/UserId';

export default async function useData() {
    
try{
    // user id and email
    const userDataResponse = await useUserId();
    
    if (userDataResponse.error || !userDataResponse.data) {
        return { error: userDataResponse.error || "User not found", data: null };
    }

    const [user_id, user_email] = userDataResponse.data;

    // all other user deatails
    const {data: fetchingUserDetails, error: fetchingError} = await supabase
            .from('users')
            .select('*')
            .eq('id', user_id)

    if(fetchingError){
        return{error: fetchingError.message, data: null}
    }
    // all the data from this hook
    const result = [fetchingUserDetails, user_email]
    return {error: null, data: result}
}
catch(error){
    return {error: "An unexpected error occured", data: null}
}

}