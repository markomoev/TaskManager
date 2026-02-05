import {supabase} from '../../../client'

// import the user id
import { useUserId } from '../../global/UserId'

export default async function useDeleteHustle(hustleId: any) {
    try{
        const userResponse: any = await useUserId();
        const userId: any = userResponse.data[0];

        const response = await supabase
        .from('hustles')
        .delete()
        .eq('user_id', userId)
        .eq('id', hustleId)

        return {error: null, data: response}
    }
    catch(error){
        return {error: "An unexpected error occurred!", data: null}
    }
}