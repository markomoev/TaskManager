import {supabase} from '../../client'
// hook for fetching user id
import { useUserId } from '../global/UserId';

type dbProps = {
    username: string,
    firstName: string,
    lastName: string,
    bio: string
}

export default async function useSaveCancel({username, firstName, lastName, bio} : dbProps){
try{
    // geting user id
    const userDataResponse = await useUserId();

    if (userDataResponse.error || !userDataResponse.data){
        return { error: userDataResponse.error || "User not found", data: null };
    }

    const user_id = userDataResponse.data[0];

    // updating the table, when there are changes
    const { error: updateError } = await supabase
    .from('users')
    .update({ 
        username: username,
        firstName: firstName,
        lastName: lastName,
        bio: bio
     })
    .eq('id', user_id)

    // checking if there's an error when updating the table
    if(updateError){
        return {error: updateError.message, data: null}
    }

}
catch(error){
    return {error: error || "An unexpected error occurred", data: null}
}
}