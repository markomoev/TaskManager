import {supabase} from "../../../client"

// import the user id
import { useUserId } from '../../global/UserId'

export default async function useUpdateHustle(hustleId : any, inputs : any){
    try{
        const userResponse: any = await useUserId();
        const userId: any = userResponse.data[0];

        const { error: updateError } = await supabase
        .from('hustles')
        .update({ 
            title: inputs.title,
            description: inputs.description,
            status: inputs.status,
            category: inputs.category,
            tags: typeof inputs.tags === 'string' ? inputs.tags.split(' ') : inputs.tags,
            visibility: inputs.visibility,
            initial_progress: inputs.initialProgress === '' ? 0 : parseInt(inputs.initialProgress),
        })
        .eq('user_id', userId)
        .eq('id', hustleId)

        if (updateError) {
            return {error: updateError.message, data: null}
        }

        return {error: null, data: "Update Successful!"}
    }
    catch(error){
        return{error: "An unexpected error occured!", data: null}
    }
}